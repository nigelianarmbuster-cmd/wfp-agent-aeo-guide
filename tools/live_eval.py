"""Generic, config-driven live answer-engine evaluation runner.

This is the OPTIONAL advanced toolchain for an agent-facing AEO guide. It is
subject-agnostic: every subject-specific value (who is being tracked, which
domains count, which competitors are scored, and the exact query set) lives in
``aeo-config.json`` next to this script. Nothing about any particular person,
company or market is hardcoded here.

It queries four answer-engine APIs (OpenAI Responses, Anthropic Messages,
Perplexity chat/completions, Gemini generateContent) with the queries from the
config and scores the subject's presence, rank and citation footprint per
response.

Python 3.12, standard library only.

SENSITIVE-DATA POLICY
* The question set comes ONLY from ``aeo-config.json``. There is no free-form
  input and no flag that can inject arbitrary text into a prompt.
* The prompt template is FIXED and minimal: one config-supplied neutral line +
  the query (or the bare query with --no-preamble). It NEVER contains API keys,
  auth.json contents, file paths, internal hostnames, private documents, PII,
  or any cross-provider data.
* HTTP requests are built from only: URL, prompt, model name, max_tokens /
  citation settings, and temperature 0.
* Secrets are redacted everywhere: request headers are never printed; whenever
  an exception or a response body is printed, key=/token= query parameters and
  Authorization / x-api-key values are stripped (see _redact()).
* --dry-run prints exactly what would be sent (URL, method, model, body) with
  secrets redacted - it is the audit artifact proving sanitization.
* Note: provider API policies differ on data use. This runner treats every
  engine as potentially train-risk and sends only public, neutral query text.

AUTH (key values are never printed)
Resolution order: (1) env vars OPENAI_API_KEY / ANTHROPIC_API_KEY /
PERPLEXITY_API_KEY / GOOGLE_GENERATIVE_AI_API_KEY; (2) the opencode auth
store at ~/.local/share/opencode/auth.json (JSON entries of the form
{provider: {type, key}}; providers openai / anthropic / perplexity / google).
If a key is missing for an engine, that engine is skipped with a clear message;
the exit code stays 0 as long as at least one engine ran.

Output: records JSON (default: live-results/<date>.json); --snapshot
additionally emits a dashboard-shaped snapshot object built from the MERGED
records. Records and snapshots both use the engine ids from the config.

Scoring conventions (unit-tested via --selftest):
* Entity matching uses ONE regex compiled from config ``aliases``. Every
  scoring function (presence, rank, excerpt) uses this same pattern, so
  presence and rank cannot disagree.
  Presence also counts when a citation domain is one of config ``domains``.
* subjectRank = 1-based position of the subject's first text mention among the
  tracked brands' first mentions; URL mentions are ignored for rank; null if
  the subject has no text mention (so citation-only presence has a null rank).
* There is NO recommendation field. The query set is recommendation-primed
  ("Best...", "Top...", "rankings"), so appearing in the answer IS the
  endorsement; a separate keyword-detected flag was redundant and noisy.
  Recommendation is defined downstream as "appeared AND ranked in the top 3",
  which needs only subjectPresent + subjectRank.
* subjectCited = True iff any citation URL's domain is one of config
  ``domains``. A per-answer yes/no; emitted on every record (None on the error
  path) and carried into the snapshot.
* Citation domain = hostname with "www." stripped; totalCitations caps at 10.
* responseExcerpt is always a verbatim slice of the answer, never paraphrased.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import statistics
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCRIPT_DIR = Path(__file__).resolve().parent
CONFIG_PATH = SCRIPT_DIR / "aeo-config.json"
RESULTS_DIR = SCRIPT_DIR / "live-results"


# ---------------------------------------------------------------- config
class ConfigError(Exception):
    """Raised when aeo-config.json is missing, unreadable or malformed."""


def load_config(path: Path = CONFIG_PATH) -> dict:
    """Load and minimally validate the config. No network, no writes."""
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as exc:
        raise ConfigError(f"cannot read config {path}: {exc}") from exc
    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise ConfigError(f"config {path} is not valid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise ConfigError(f"config {path} must be a JSON object")

    for key in ("subject", "aliases", "domains", "engines", "competitors", "queries"):
        if key not in data:
            raise ConfigError(f"config {path} is missing required key {key!r}")

    if not isinstance(data["subject"], dict) or not data["subject"].get("name"):
        raise ConfigError("config subject must be an object with a non-empty 'name'")
    if not isinstance(data["aliases"], str) or not data["aliases"].strip():
        raise ConfigError("config 'aliases' must be a non-empty regex string")
    try:
        re.compile(data["aliases"])
    except re.error as exc:
        raise ConfigError(f"config 'aliases' is not a valid regex: {exc}") from exc
    if not isinstance(data["domains"], list) or not data["domains"]:
        raise ConfigError("config 'domains' must be a non-empty list")
    if not isinstance(data["preamble"], str):
        raise ConfigError("config 'preamble' must be a string (use \"\" for bare mode)")

    queries = data["queries"]
    if not isinstance(queries, list) or not queries:
        raise ConfigError("config 'queries' must be a non-empty list")
    seen_qids: set[str] = set()
    for entry in queries:
        if not isinstance(entry, dict) or not entry.get("id") or not entry.get("text"):
            raise ConfigError("each query needs an 'id' and a 'text'")
        if entry["id"] in seen_qids:
            raise ConfigError(f"duplicate query id {entry['id']!r}")
        seen_qids.add(entry["id"])

    engines = data["engines"]
    if not isinstance(engines, list) or not engines:
        raise ConfigError("config 'engines' must be a non-empty list")
    for entry in engines:
        if not isinstance(entry, dict) or not entry.get("id"):
            raise ConfigError("each engine needs an 'id'")

    competitors = data["competitors"]
    if not isinstance(competitors, list):
        raise ConfigError("config 'competitors' must be a list")

    return data


class Settings:
    """Resolved, read-only view over the config for the run."""

    def __init__(self, config: dict) -> None:
        self.raw = config
        self.site: str = config.get("site", "")
        self.subject: dict = config["subject"]
        self.dataset_label: str = config.get("datasetLabel", "")
        self.preamble: str = config["preamble"]
        self.aliases: re.Pattern[str] = re.compile(config["aliases"])
        self.domains: tuple[str, ...] = tuple(
            d.strip().lower().removeprefix("www.") for d in config["domains"] if d.strip()
        )
        self.engines: list[dict] = config["engines"]
        self.engine_ids: list[str] = [e["id"] for e in config["engines"]]
        self.competitors: list[dict] = config["competitors"]
        self.competitor_ids: list[str] = [c["id"] for c in config["competitors"]]
        self.queries: list[dict] = config["queries"]
        self.query_by_id: dict[str, str] = {q["id"]: q["text"] for q in config["queries"]}
        self.query_category: dict[str, str] = {
            q["id"]: q.get("category", "") for q in config["queries"]
        }
        self.all_query_ids: list[str] = [q["id"] for q in config["queries"]]

        # Per-competitor regexes built from the competitor names. Matching is
        # case-insensitive on the literal name so ids never need to be regexes.
        self.competitor_regexes: dict[str, re.Pattern[str]] = {
            c["id"]: re.compile(re.escape(c.get("name", c["id"])), re.I)
            for c in config["competitors"]
        }

        # Model overrides: a config engine may carry a "model"; the matching
        # OPENAI_MODEL / ANTHROPIC_MODEL / ... / GEMINI_MODEL env var wins.
        self.engine_model: dict[str, str] = {
            e["id"]: (e.get("model") or "") for e in config["engines"]
        }
        self.engine_name: dict[str, str] = {
            e["id"]: (e.get("name") or e["id"]) for e in config["engines"]
        }

    def prompt_for(self, query_id: str, use_preamble: bool = True) -> str:
        """The FIXED minimal prompt: one neutral config line + the query.

        With use_preamble=False (--no-preamble) the bare query is returned with
        no preamble and no leading newline. An empty config preamble is treated
        as bare mode as well.
        """
        text = self.query_by_id[query_id]
        if not use_preamble or not self.preamble.strip():
            return text
        return f"{self.preamble}\n\n{text}"


# ---------------------------------------------------------------- scoring
def _redact(text: str) -> str:
    """Strip secret-looking material before any text is printed or stored."""
    if not isinstance(text, str):
        return text
    text = re.sub(r"(?i)(authorization\s*[:=]\s*bearer\s+)[^\s\"',;]+", r"\1REDACTED", text)
    text = re.sub(r"(?i)(x-api-key\s*[:=]\s*)[^\s\"',;]+", r"\1REDACTED", text)
    text = re.sub(r"(?i)([?&](?:key|api_?key|token|access_token|auth)=)[^&\s\"']*", r"\1REDACTED", text)
    text = re.sub(r"\bsk-[A-Za-z0-9_-]{6,}", "sk-***REDACTED***", text)
    text = re.sub(r"\bAIza[0-9A-Za-z_-]{8,}", "AIza***REDACTED***", text)
    text = re.sub(r"\bpplx-[A-Za-z0-9_-]{6,}", "pplx-***REDACTED***", text)
    return text


# ---------------------------------------------------------------- URL helpers
def _is_http(value: str) -> bool:
    return value.strip().lower().startswith(("http://", "https://", "www."))


def _collect_urls(obj: Any, strings_ok: bool = False) -> list[str]:
    """Recursively collect citation URLs from a JSON response.

    Tolerates structural differences: url_citation annotations (OpenAI),
    web_search_result / web_search_result_location blocks (Anthropic), plain
    URL strings under "citations" (Perplexity), groundingChunks[].web.uri
    (Gemini), and any dict carrying a "url"/"uri"/"link" key.
    """
    urls: list[str] = []
    if isinstance(obj, str):
        if strings_ok and _is_http(obj):
            urls.append(obj.strip())
    elif isinstance(obj, dict):
        for key in ("url", "uri", "link"):
            value = obj.get(key)
            if isinstance(value, str) and _is_http(value):
                urls.append(value.strip())
        for key, value in obj.items():
            urls.extend(_collect_urls(value, strings_ok=strings_ok or key == "citations"))
    elif isinstance(obj, list):
        for value in obj:
            urls.extend(_collect_urls(value, strings_ok=strings_ok))
    return urls


def _dedupe(items: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for item in items:
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out


def extract_domain(url: str) -> str | None:
    """Hostname of a URL with 'www.' stripped (best-effort, no TLD list)."""
    cleaned = (url or "").strip()
    if not cleaned:
        return None
    if "://" not in cleaned:
        cleaned = "https://" + cleaned.lstrip("/")
    try:
        host = urllib.parse.urlsplit(cleaned).netloc.lower()
    except ValueError:
        return None
    host = host.split("@")[-1]
    if host.startswith("www."):
        host = host[4:]
    host = host.split(":")[0]
    if not host or "." not in host or any(c in host for c in " /?#"):
        return None
    return host


# ---------------------------------------------------------------- scoring
def _subject_text_windows(settings: Settings, text: str, radius: int = 60) -> list[tuple[int, int]]:
    """Character ranges spanning radius chars around each subject mention."""
    windows: list[tuple[int, int]] = []
    for match in settings.aliases.finditer(text):
        start = max(0, match.start() - radius)
        end = min(len(text), match.end() + radius)
        windows.append((start, end))
    return windows


def score_presence(settings: Settings, text: str, urls: list[str]) -> bool:
    """True iff a subject alias appears in the text OR a citation domain
    is one of the subject's own (settings.domains)."""
    if settings.aliases.search(text):
        return True
    return any(extract_domain(url) in settings.domains for url in urls)


def score_subject_cited(settings: Settings, urls: list[str]) -> bool:
    """True iff any citation URL's domain is one of the subject's own
    (settings.domains). A per-answer yes/no signal, independent of any text
    mention."""
    return any(extract_domain(url) in settings.domains for url in urls)


def score_rank(settings: Settings, text: str) -> int | None:
    """1-based position of the subject's first text mention among the tracked
    brands' first mentions; None when the subject has no text mention (URLs
    are ignored).

    The subject is keyed as ``__subject__`` in the combined first-mention map
    so it can never collide with a competitor id.
    """
    subject_key = "__subject__"
    positions: dict[str, int] = {}
    subject_match = settings.aliases.search(text)
    if subject_match:
        positions[subject_key] = subject_match.start()
    for competitor_id, regex in settings.competitor_regexes.items():
        match = regex.search(text)
        if match:
            positions[competitor_id] = match.start()
    if subject_key not in positions:
        return None
    order = sorted(positions, key=lambda brand: positions[brand])
    return order.index(subject_key) + 1


def score_total_citations(urls: list[str]) -> int:
    """Distinct citation domains, capped at 10."""
    domains = {extract_domain(url) for url in urls}
    domains.discard(None)
    return min(len(domains), 10)


def score_competitor_mentions(settings: Settings, text: str) -> dict[str, int]:
    """Count of each tracked competitor's mentions in the text."""
    return {
        competitor_id: len(list(settings.competitor_regexes[competitor_id].finditer(text)))
        for competitor_id in settings.competitor_ids
    }


def make_excerpt(settings: Settings, text: str) -> str:
    """Verbatim slice of the answer: +/-100 chars around the start of the
    first subject mention, else the first 200 chars. Never paraphrased."""
    match = settings.aliases.search(text)
    if match:
        start = max(0, match.start() - 100)
        return text[start:min(len(text), match.start() + 100)]
    return text[:200]


# ---------------------------------------------------------------- http
class APIError(Exception):
    """Engine call failure; the message is already secret-redacted."""


def _snippet(text: str, limit: int = 300) -> str:
    text = text if isinstance(text, str) else str(text)
    return text[:limit] + ("..." if len(text) > limit else "")


def http_request(
    url: str,
    *,
    method: str = "GET",
    headers: dict[str, str] | None = None,
    body: bytes | None = None,
    timeout: float = 120.0,
    retries: int = 1,
) -> str:
    """Stdlib HTTP call. Single retry (8s backoff) on 429/5xx/network errors;
    quota/billing errors fail fast. Never prints headers; error text is
    redacted."""
    backoff_seconds = (8, 16, 32)
    attempt = 0
    while True:
        try:
            request = urllib.request.Request(url, data=body, headers=headers or {}, method=method)
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return response.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as exc:
            raw = exc.read().decode("utf-8", "replace")
            # Quota/billing 429s cannot be fixed by waiting; fail fast instead
            # of burning the backoff schedule on a known-dead account state.
            quota_markers = ("insufficient_quota", "credit_balance_exhausted",
                             "billing", "no credits")
            is_quota = any(marker in raw.lower() for marker in quota_markers)
            if (exc.code == 429 or exc.code >= 500) and attempt < retries and not is_quota:
                attempt += 1
                wait = backoff_seconds[min(attempt - 1, len(backoff_seconds) - 1)]
                print(f"      retry {attempt}/{retries} in {wait}s (HTTP {exc.code})")
                time.sleep(wait)
                continue
            raise APIError(f"HTTP {exc.code}: {_redact(_snippet(raw))}") from exc
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            if attempt < retries:
                attempt += 1
                wait = backoff_seconds[min(attempt - 1, len(backoff_seconds) - 1)]
                print(f"      retry {attempt}/{retries} in {wait}s (network error)")
                time.sleep(wait)
                continue
            reason = getattr(exc, "reason", None) or exc
            raise APIError(f"network error: {_redact(str(reason))}") from exc


def _parse_json(raw: str, url: str) -> dict:
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise APIError(f"invalid JSON from {_redact(url)}: {_redact(_snippet(raw))}") from exc


def _collect_typed(obj: Any, type_name: str, text_key: str = "text") -> list[str]:
    """Recursively collect text fields of dicts whose 'type' == type_name."""
    out: list[str] = []
    if isinstance(obj, dict):
        if obj.get("type") == type_name and isinstance(obj.get(text_key), str):
            out.append(obj[text_key])
        for value in obj.values():
            out.extend(_collect_typed(value, type_name, text_key))
    elif isinstance(obj, list):
        for value in obj:
            out.extend(_collect_typed(value, type_name, text_key))
    return out


# ---------------------------------------------------------------- engines
# Engine specs are keyed by the four canonical engine ids. Default models are
# fallbacks; a config engine "model", an env var override, or (OpenAI) runtime
# discovery via GET /v1/models can all supersede them.
_openai_model_cache: str | None = None
# OpenAI reasoning models reject the "temperature" parameter; once a model is
# known to reject it, subsequent calls for that model omit the field.
_openai_temp_unsupported: set[str] = set()

OPENAI_MODEL_PREFERENCE = ["gpt-5.6-luna", "gpt-5-mini", "gpt-5-search-api", "gpt-4o-mini"]

DEFAULT_MODELS: dict[str, str] = {
    "chatgpt": "",  # resolved at runtime via GET /v1/models
    "claude": "claude-sonnet-4-6",
    "perplexity": "sonar",
    "gemini": "gemini-3.5-flash",
}


def _discover_openai_model(key: str) -> str:
    """GET /v1/models and pick the first available id from the preference list."""
    global _openai_model_cache
    if _openai_model_cache:
        return _openai_model_cache
    url = "https://api.openai.com/v1/models"
    raw = http_request(url, method="GET", headers={"Authorization": f"Bearer {key}"}, timeout=60)
    data = _parse_json(raw, url)
    ids = [entry.get("id", "") for entry in data.get("data", []) if isinstance(entry, dict)]
    available = [mid for mid in OPENAI_MODEL_PREFERENCE if mid in ids]
    if not available:
        available = [mid for mid in ids if mid.startswith("gpt-")]
    if not available:
        raise APIError("no usable model found in GET /v1/models response")
    _openai_model_cache = available[0]
    return available[0]


def call_openai(prompt: str, key: str, model_hint: str = "") -> dict:
    env_model = os.environ.get("OPENAI_MODEL")
    model = env_model or model_hint or _discover_openai_model(key)
    note = ("model from OPENAI_MODEL env" if env_model
            else "model from config" if model_hint
            else "model auto-selected via GET /v1/models (first available from preference list)")
    url = "https://api.openai.com/v1/responses"
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    body: dict[str, Any] = {"model": model, "input": prompt, "tools": [{"type": "web_search"}]}
    include_temp = "temperature" not in _openai_temp_unsupported
    if include_temp:
        body["temperature"] = 0
    try:
        raw = http_request(url, method="POST", headers=headers,
                           body=json.dumps(body).encode("utf-8"), timeout=120)
    except APIError as exc:
        message = str(exc).lower()
        if include_temp and "temperature" in message and ("unsupported" in message or "not supported" in message):
            # Some reasoning models reject temperature; resend without it.
            # The request still contains only URL, prompt, model, tools.
            _openai_temp_unsupported.add(model)
            body.pop("temperature", None)
            note += "; temperature 0 rejected by model, resent without the temperature field"
            raw = http_request(url, method="POST", headers=headers,
                               body=json.dumps(body).encode("utf-8"), timeout=120)
        else:
            raise
    data = _parse_json(raw, url)
    text = " ".join(_collect_typed(data, "output_text")).strip()
    if not text and isinstance(data.get("output_text"), str):
        text = data["output_text"].strip()
    urls = _dedupe(_collect_urls(data))
    return {"text": text, "urls": urls, "model": model, "note": note, "surface": url}


def call_anthropic(prompt: str, key: str, model_hint: str = "") -> dict:
    env_model = os.environ.get("ANTHROPIC_MODEL")
    model = env_model or model_hint or DEFAULT_MODELS["claude"]
    note = ("model from ANTHROPIC_MODEL env" if env_model
            else "model from config" if model_hint else "")
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    body = {
        "model": model,
        "max_tokens": 1024,
        "temperature": 0,
        "tools": [{"type": "web_search_20250305", "name": "web_search", "max_uses": 3}],
        "messages": [{"role": "user", "content": prompt}],
    }
    raw = http_request(url, method="POST", headers=headers,
                       body=json.dumps(body).encode("utf-8"), timeout=120)
    data = _parse_json(raw, url)
    text = " ".join(_collect_typed(data, "text")).strip()
    urls = _dedupe(_collect_urls(data))
    return {"text": text, "urls": urls, "model": model, "note": note, "surface": url}


def call_perplexity(prompt: str, key: str, model_hint: str = "") -> dict:
    env_model = os.environ.get("PERPLEXITY_MODEL")
    model = env_model or model_hint or DEFAULT_MODELS["perplexity"]
    note = ("model from PERPLEXITY_MODEL env" if env_model
            else "model from config" if model_hint else "")
    url = "https://api.perplexity.ai/chat/completions"
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}
    body = {"model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0}
    raw = http_request(url, method="POST", headers=headers,
                       body=json.dumps(body).encode("utf-8"), timeout=120)
    data = _parse_json(raw, url)
    text = ""
    choices = data.get("choices") or []
    if choices and isinstance(choices[0], dict):
        message = choices[0].get("message") or {}
        if isinstance(message.get("content"), str):
            text = message["content"].strip()
    urls = _dedupe(_collect_urls(data))
    return {"text": text, "urls": urls, "model": model, "note": note, "surface": url}


def call_gemini(prompt: str, key: str, model_hint: str = "") -> dict:
    env_model = os.environ.get("GEMINI_MODEL")
    model = env_model or model_hint or DEFAULT_MODELS["gemini"]
    note = ("model from GEMINI_MODEL env" if env_model
            else "model from config" if model_hint else "")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0},
        "tools": [{"googleSearch": {}}],
    }
    raw = http_request(url, method="POST", headers={"Content-Type": "application/json"},
                       body=json.dumps(body).encode("utf-8"), timeout=120)
    data = _parse_json(raw, url)
    parts: list[str] = []
    for candidate in data.get("candidates") or []:
        content = candidate.get("content") or {}
        for part in content.get("parts") or []:
            if isinstance(part, dict) and isinstance(part.get("text"), str):
                parts.append(part["text"])
    text = " ".join(part for part in parts if part).strip()
    urls = _dedupe(_collect_urls(data))
    surface = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    return {"text": text, "urls": urls, "model": model, "note": note, "surface": surface}


ENGINE_CALLS: dict[str, Any] = {
    "chatgpt": call_openai,
    "claude": call_anthropic,
    "perplexity": call_perplexity,
    "gemini": call_gemini,
}

ENGINE_AUTH: dict[str, tuple[str, str]] = {
    # engine id -> (env var name, opencode auth store provider key)
    "chatgpt": ("OPENAI_API_KEY", "openai"),
    "claude": ("ANTHROPIC_API_KEY", "anthropic"),
    "perplexity": ("PERPLEXITY_API_KEY", "perplexity"),
    "gemini": ("GOOGLE_GENERATIVE_AI_API_KEY", "google"),
}

ENGINE_ENV_MODEL: dict[str, str] = {
    "chatgpt": "OPENAI_MODEL",
    "claude": "ANTHROPIC_MODEL",
    "perplexity": "PERPLEXITY_MODEL",
    "gemini": "GEMINI_MODEL",
}


def surface_for(engine_id: str, model: str | None) -> str:
    if engine_id == "gemini":
        return f"https://generativelanguage.googleapis.com/v1beta/models/{model or '?'}:generateContent"
    if engine_id == "chatgpt":
        return "https://api.openai.com/v1/responses"
    if engine_id == "claude":
        return "https://api.anthropic.com/v1/messages"
    if engine_id == "perplexity":
        return "https://api.perplexity.ai/chat/completions"
    return ""


# ---------------------------------------------------------------- dry-run
def _dry_entries_chatgpt(prompt: str, model_hint: str) -> list[tuple[str, str, dict | None, str]]:
    entries: list[tuple[str, str, dict | None, str]] = []
    env_model = os.environ.get("OPENAI_MODEL")
    if env_model:
        label = f"model={env_model} (OPENAI_MODEL env)"
        body_model: Any = env_model
    elif model_hint:
        label = f"model={model_hint} (config)"
        body_model = model_hint
    else:
        entries.append(("GET", "https://api.openai.com/v1/models", None,
                        f"once per run: pick first available of {', '.join(OPENAI_MODEL_PREFERENCE)}"))
        label = "model=<first available from preference list>"
        body_model = "<runtime-resolved>"
    body = {"model": body_model, "input": prompt, "tools": [{"type": "web_search"}],
            "temperature": 0}
    entries.append(("POST", "https://api.openai.com/v1/responses", body,
                    label + " (temperature 0; omitted automatically if the selected model rejects it)"))
    return entries


def _dry_entries_claude(prompt: str, model_hint: str) -> list[tuple[str, str, dict | None, str]]:
    model = os.environ.get("ANTHROPIC_MODEL") or model_hint or DEFAULT_MODELS["claude"]
    body = {
        "model": model,
        "max_tokens": 1024,
        "temperature": 0,
        "tools": [{"type": "web_search_20250305", "name": "web_search", "max_uses": 3}],
        "messages": [{"role": "user", "content": prompt}],
    }
    label = "model from ANTHROPIC_MODEL env" if os.environ.get("ANTHROPIC_MODEL") else ""
    return [("POST", "https://api.anthropic.com/v1/messages", body, label)]


def _dry_entries_perplexity(prompt: str, model_hint: str) -> list[tuple[str, str, dict | None, str]]:
    model = os.environ.get("PERPLEXITY_MODEL") or model_hint or DEFAULT_MODELS["perplexity"]
    body = {"model": model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0}
    label = "model from PERPLEXITY_MODEL env" if os.environ.get("PERPLEXITY_MODEL") else ""
    return [("POST", "https://api.perplexity.ai/chat/completions", body, label)]


def _dry_entries_gemini(prompt: str, model_hint: str) -> list[tuple[str, str, dict | None, str]]:
    model = os.environ.get("GEMINI_MODEL") or model_hint or DEFAULT_MODELS["gemini"]
    url = (f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
           "?key=REDACTED")
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0},
        "tools": [{"googleSearch": {}}],
    }
    label = "model from GEMINI_MODEL env" if os.environ.get("GEMINI_MODEL") else ""
    return [("POST", url, body, label)]


ENGINE_DRY: dict[str, Any] = {
    "chatgpt": _dry_entries_chatgpt,
    "claude": _dry_entries_claude,
    "perplexity": _dry_entries_perplexity,
    "gemini": _dry_entries_gemini,
}


def print_dry_run(settings: Settings, engine_id: str, query_ids: list[str],
                  key_source: str | None, use_preamble: bool = True) -> None:
    print(f"\n[DRY RUN] {engine_id}")
    print(f"  auth: {key_source or 'MISSING - engine would be skipped (no API key)'}")
    dry = ENGINE_DRY.get(engine_id)
    if dry is None:
        print(f"  (no dry-run template for engine {engine_id!r})")
        return
    model_hint = settings.engine_model.get(engine_id, "")
    for qid in query_ids:
        print(f"  query {qid}: {settings.query_by_id[qid]}")
        prompt = settings.prompt_for(qid, use_preamble)
        for method, url, body, label in dry(prompt, model_hint):
            suffix = f"   # {label}" if label else ""
            print(f"    {method} {_redact(url)}{suffix}")
            if body is not None:
                print(f"      body: {_redact(json.dumps(body, ensure_ascii=False))}")


# ---------------------------------------------------------------- auth
AUTH_STORE_CANDIDATES: list[Path] = []
_home = Path(os.path.expanduser("~"))
AUTH_STORE_CANDIDATES.append(_home / ".local" / "share" / "opencode" / "auth.json")
if os.environ.get("XDG_DATA_HOME"):
    AUTH_STORE_CANDIDATES.insert(0, Path(os.environ["XDG_DATA_HOME"]) / "opencode" / "auth.json")


def load_key(env_name: str, provider: str) -> tuple[str | None, str | None]:
    """Return (key, source_label). Callers must never print the key value."""
    value = os.environ.get(env_name)
    if value:
        return value, f"env {env_name}"
    for path in AUTH_STORE_CANDIDATES:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        entry = data.get(provider)
        if isinstance(entry, dict) and isinstance(entry.get("key"), str) and entry["key"]:
            return entry["key"], "opencode auth store"
    return None, None


# ---------------------------------------------------------------- run
def run_evaluation(settings: Settings, engine_ids: list[str], query_ids: list[str],
                   keys: dict[str, str | None],
                   use_preamble: bool = True,
                   raw_handle: Any = None) -> tuple[list[dict], dict]:
    records: list[dict] = []
    stats: dict[str, dict[str, Any]] = {
        eid: {"ok": 0, "err": 0, "ran": 0, "present": 0, "ranks": [],
              "citations": 0}
        for eid in engine_ids
    }
    for eid in engine_ids:
        key = keys.get(eid)
        if not key:
            continue
        call = ENGINE_CALLS.get(eid)
        if call is None:
            print(f"[skip] {eid}: no caller implemented")
            continue
        model_hint = settings.engine_model.get(eid, "")
        print(f"\nengine {eid}: {len(query_ids)} query/queries")
        for qid in query_ids:
            prompt = settings.prompt_for(qid, use_preamble)
            stats[eid]["ran"] += 1
            try:
                result = call(prompt, key, model_hint)
            except APIError as exc:
                err_model = os.environ.get(ENGINE_ENV_MODEL.get(eid, ""), "") or model_hint
                if eid == "chatgpt" and _openai_model_cache:
                    err_model = _openai_model_cache
                record = {
                    "engine": eid,
                    "queryId": qid,
                    "category": settings.query_category.get(qid, ""),
                    "surface": surface_for(eid, err_model),
                    "access": "error",
                    "model": err_model,
                    "responseExcerpt": None,
                    "subjectPresent": None,
                    "subjectRank": None,
                    "totalCitations": None,
                    "subjectCited": None,
                    "competitorMentions": None,
                    "notes": _redact(str(exc)),
                }
                stats[eid]["err"] += 1
                print(f"  {qid}: ERROR  {_redact(str(exc))}")
                if raw_handle is not None:
                    # Error path: same block shape, body replaced by the
                    # already-redacted error message, no citations.
                    raw_handle.write(format_raw_block(
                        settings, record, f"ERROR: {_redact(str(exc))}", []))
                    raw_handle.flush()
            else:
                text, urls = result["text"], result["urls"]
                # Presence first, then rank derived from text presence, so the
                # two can never disagree even if the regexes change separately.
                # Citation-only presence (a config domain, no text mention) is
                # a legitimate case with a null rank.
                text_present = bool(settings.aliases.search(text))
                present = score_presence(settings, text, urls)
                rank = score_rank(settings, text) if text_present else None
                record = {
                    "engine": eid,
                    "queryId": qid,
                    "category": settings.query_category.get(qid, ""),
                    "surface": result["surface"],
                    "access": "ok",
                    "model": result["model"],
                    "responseExcerpt": make_excerpt(settings, text),
                    "subjectPresent": present,
                    "subjectRank": rank,
                    "totalCitations": score_total_citations(urls),
                    "subjectCited": score_subject_cited(settings, urls),
                    "competitorMentions": score_competitor_mentions(settings, text),
                    "notes": result["note"],
                }
                stats[eid]["ok"] += 1
                if record["subjectPresent"]:
                    stats[eid]["present"] += 1
                if record["subjectRank"] is not None:
                    stats[eid]["ranks"].append(record["subjectRank"])
                stats[eid]["citations"] += record["totalCitations"]
                print(f"  {qid}: ok  model={result['model']}  present={record['subjectPresent']}  "
                      f"rank={record['subjectRank']}  "
                      f"citations={record['totalCitations']}")
                if raw_handle is not None:
                    # Full verbatim answer + every citation URL, flushed as each
                    # response arrives so a killed run still leaves what it got.
                    raw_handle.write(format_raw_block(settings, record, text, urls))
                    raw_handle.flush()
            records.append(record)
    return records, stats


def print_summary(settings: Settings, stats: dict, engine_ids: list[str],
                  keys: dict[str, str | None]) -> None:
    print("\n=== SUMMARY ===")
    subject_name = settings.subject.get("name", "subject")
    for eid in engine_ids:
        if not keys.get(eid):
            print(f"{eid:<10} skipped (no API key)")
            continue
        s = stats[eid]
        if s["ran"] == 0:
            continue
        median = f"{statistics.median(s['ranks']):.1f}" if s["ranks"] else "n/a"
        print(f"{eid:<10} calls {s['ok']} ok / {s['err']} error | "
              f"{subject_name} present {s['present']}/{s['ran']} | median rank {median} | "
              f"distinct citation domains (sum) {s['citations']}")


# ---------------------------------------------------------------- records lock
LOCK_STALE_SECONDS = 600


def _lock_path_for(out_path: Path) -> Path:
    """Sibling lock path for a records file: <out_path>.lock."""
    return Path(str(out_path) + ".lock")


def _acquire_records_lock(out_path: Path) -> Path:
    """Create an exclusive <out_path>.lock, or raise ValueError.

    Stdlib os only (os.O_CREAT | os.O_EXCL), so it works on Windows and POSIX
    with no fcntl or msvcrt. The acquiring PID is written into the lock file for
    diagnosability. If the lock already exists, its age is measured from
    st_mtime: older than LOCK_STALE_SECONDS it is removed and the acquisition is
    retried exactly once; otherwise a ValueError naming the output path, the
    lock path and its age is raised. The caller must release the returned path
    in a finally (see release_records_lock).
    """
    lock_path = _lock_path_for(out_path)
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(2):
        try:
            fd = os.open(str(lock_path), os.O_CREAT | os.O_EXCL | os.O_WRONLY)
        except FileExistsError:
            try:
                age = time.time() - lock_path.stat().st_mtime
            except OSError:
                age = 0.0
            if age > LOCK_STALE_SECONDS and attempt == 0:
                print(f"WARNING: lock {lock_path} looks stale (age {age:.0f}s > "
                      f"{LOCK_STALE_SECONDS}s); removing it and retrying once")
                try:
                    lock_path.unlink()
                except OSError:
                    pass
                continue
            raise ValueError(
                f"records file {out_path} is locked by {lock_path} (age {age:.0f}s); "
                f"chunks must run ONE AT A TIME - never in parallel against the "
                f"same paths"
            )
        else:
            try:
                os.write(fd, f"{os.getpid()}\n".encode("ascii"))
            finally:
                os.close(fd)
            return lock_path
    raise ValueError(
        f"records file {out_path} is locked by {lock_path}; chunks must run ONE "
        f"AT A TIME - never in parallel against the same paths"
    )


def release_records_lock(lock_path: Path) -> None:
    """Remove the lock file; safe to call when it is already gone."""
    try:
        lock_path.unlink()
    except OSError:
        pass


# ---------------------------------------------------------------- merge
def merge_records(existing: list[dict], new: list[dict]) -> tuple[list[dict], dict]:
    """Merge new records into existing keyed by (engine, queryId).

    A newly captured record for a key already present REPLACES the existing
    one; existing records whose key is not in the new batch are preserved.
    Existing order is kept with replacements in place; genuinely new keys are
    appended in the order first seen in the new batch.

    Returns (merged_records, stats) where stats has ints newly_captured,
    replaced, preserved and the list of replacement/new key tuples in new_keys.
    Pure function: no I/O, no API calls.
    """
    new_by_key: dict[tuple, dict] = {}
    new_keys: list[tuple] = []
    for record in new:
        if not isinstance(record, dict):
            continue
        key = (record.get("engine"), record.get("queryId"))
        if key not in new_by_key:
            new_keys.append(key)
        new_by_key[key] = record

    existing_keys = {(record.get("engine"), record.get("queryId"))
                     for record in existing if isinstance(record, dict)}

    replaced = sum(1 for key in new_keys if key in existing_keys)
    preserved = sum(1 for record in existing if isinstance(record, dict)
                    and (record.get("engine"), record.get("queryId")) not in new_by_key)

    merged: list[dict] = []
    for record in existing:
        if not isinstance(record, dict):
            merged.append(record)
            continue
        key = (record.get("engine"), record.get("queryId"))
        merged.append(new_by_key[key] if key in new_by_key else record)
    for key in new_keys:
        if key not in existing_keys:
            merged.append(new_by_key[key])

    stats = {
        "newly_captured": len(new_keys),
        "replaced": replaced,
        "preserved": preserved,
        "new_keys": new_keys,
    }
    return merged, stats


def load_records_envelope(path: Path, date_str: str) -> tuple[list[dict], dict]:
    """Read an existing records envelope, enforcing the same-run-date scope.

    Returns (existing_records, existing_envelope). Raises ValueError if the
    file is unreadable, malformed, lacks a records list, has a different
    ``date`` than this invocation (never merge across dates), or its date is
    missing (an unversioned file that cannot be proven same-date). No write.
    """
    try:
        existing_env = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(
            f"existing records file {path} is unreadable ({exc}); refusing to "
            f"overwrite it"
        ) from exc
    if not isinstance(existing_env, dict):
        raise ValueError(
            f"existing records file {path} is malformed (not a JSON object); "
            f"refusing to overwrite it"
        )
    existing_date = existing_env.get("date")
    if existing_date != date_str:
        raise ValueError(
            f"existing records file {path} is for date {existing_date!r} but "
            f"this run is for date {date_str!r}; refusing to merge across "
            f"dates - use --fresh to start over"
        )
    existing_records = existing_env.get("records")
    if not isinstance(existing_records, list):
        raise ValueError(
            f"existing records file {path} has no records list; refusing to "
            f"overwrite it"
        )
    return existing_records, existing_env


def coverage_summary(settings: Settings, records: list[dict]) -> tuple[int, int, list[tuple[str, int]]]:
    """Return (distinct pairs, full-grid size, per-engine (id, count) in the
    config engine order) for the given record set. Pure function, no I/O."""
    pairs = {(record.get("engine"), record.get("queryId"))
             for record in records if isinstance(record, dict)}
    total = len(settings.engine_ids) * len(settings.all_query_ids)
    per_engine = []
    for eid in settings.engine_ids:
        count = sum(1 for record in records if isinstance(record, dict)
                    and record.get("engine") == eid
                    and record.get("queryId") in settings.query_by_id)
        per_engine.append((eid, count))
    return len(pairs), total, per_engine


def print_merge_summary(settings: Settings, stats: dict, records: list[dict]) -> None:
    """Merge/coverage report for the written (merged) record set."""
    n_queries = len(settings.all_query_ids)
    covered, total, per_engine = coverage_summary(settings, records)
    print("\n=== MERGE SUMMARY ===")
    print(f"newly captured: {stats['newly_captured']} | "
          f"replaced: {stats['replaced']} | "
          f"preserved (this run): {stats['preserved']}")
    per_engine_txt = ", ".join(f"{eid} {n}/{n_queries}" for eid, n in per_engine)
    print(f"coverage: {covered}/{total} (engine, queryId) pairs now present")
    if covered == total:
        print("coverage: complete")
    else:
        short = [f"{eid} {n}/{n_queries}" for eid, n in per_engine if n < n_queries]
        print(f"coverage: INCOMPLETE - still short: {', '.join(short)}")
    print(f"per-engine: {per_engine_txt}")


def write_records(settings: Settings, out_path: Path, date_str: str, records: list[dict],
                  fresh: bool = False) -> tuple[list[dict], dict]:
    """Write or merge the records envelope with merge-on-write semantics.

    When the file exists, is not being replaced fresh, and carries the same
    ``date``, the new records are merged into it keyed by (engine, queryId)
    and the file is rewritten with a refreshed captured_at. When --fresh is
    set, or the file does not exist, it is written from only this batch.
    A same-path file whose ``date`` differs raises ValueError (no write).

    The read-modify-write is guarded by an exclusive <out_path>.lock so two
    chunks can never race the same records file; the lock is acquired here,
    immediately before the merge/read, and released in a finally immediately
    after the write. It is NOT held across engine evaluation.

    Returns (merged_records, merge_stats). Writing is the only I/O.
    Raises ValueError when the lock cannot be acquired or the merge scope
    check fails (no write).
    """
    lock_path = _acquire_records_lock(out_path)
    try:
        if out_path.exists() and not fresh:
            existing_records, _ = load_records_envelope(out_path, date_str)
            merged, merge_stats = merge_records(existing_records, records)
        else:
            merged = [record for record in records if isinstance(record, dict)]
            merge_stats = {
                "newly_captured": len(merged),
                "replaced": 0,
                "preserved": 0,
                "new_keys": [(record.get("engine"), record.get("queryId"))
                             for record in merged],
            }
        envelope = {
            "captured_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "date": date_str,
            "method": "live_api",
            "environment": "stdlib runner",
            "subject": settings.subject.get("name", ""),
            "site": settings.site,
            "records": merged,
        }
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(envelope, ensure_ascii=False, indent=2), encoding="utf-8")
        return merged, merge_stats
    finally:
        release_records_lock(lock_path)


def build_snapshot(settings: Settings, date_str: str, label: str, records: list[dict]) -> dict:
    """Dashboard-shaped snapshot object (errored rows skipped) for later
    merging into data.json."""
    results = []
    for record in records:
        if record["access"] != "ok":
            continue
        results.append({
            "engine": record["engine"],
            "queryId": record["queryId"],
            "subjectPresent": record["subjectPresent"],
            "subjectRank": record["subjectRank"],
            "totalCitations": record["totalCitations"],
            "subjectCited": record["subjectCited"],
            "competitorMentions": record["competitorMentions"],
            "responseExcerpt": record["responseExcerpt"],
        })
    return {
        "id": date_str,
        "label": label,
        "method": "live_api",
        "datasetLabel": settings.dataset_label,
        "engines": [{"id": e["id"], "name": settings.engine_name.get(e["id"], e["id"])}
                    for e in settings.engines],
        "results": results,
    }


# ---------------------------------------------------------------- raw archive
# --raw writes the FULL verbatim engine answers to a plain text audit file.
# This is deliberately separate from the records/snapshot path: the dashboard
# dataset keeps only a 200-char responseExcerpt (make_excerpt) because that is
# what ships inline in data.js. The raw archive is the untruncated audit trail.
RAW_RULE = "=" * 80
RAW_THIN_RULE = "-" * 80


def format_raw_block(settings: Settings, record: dict, response_text: str, urls: list[str]) -> str:
    """Render one engine-answer block for the --raw archive.

    The response text is written verbatim (no truncation, no paraphrase, no
    stripping). Error records pass an already-redacted body and no URLs.
    Returns the block text including a trailing newline.
    """
    captured = datetime.now(timezone.utc).isoformat(timespec="seconds")
    engine = record.get("engine")
    qid = record.get("queryId")
    model = record.get("model")
    question = settings.query_by_id.get(qid, "") if isinstance(qid, str) else ""
    lines = [
        RAW_RULE,
        f"engine: {engine} | query: {qid} | model: {model}",
        f"captured: {captured} | citations: {len(urls)}",
        f"question: {question}",
        RAW_THIN_RULE,
        response_text,
        RAW_THIN_RULE,
    ]
    if urls:
        lines.append("citations:")
        lines.extend(f"  {url}" for url in urls)
    else:
        lines.append("citations: (none)")
    return "\n".join(lines) + "\n"


def open_raw_archive(raw_path: Path, fresh: bool = False) -> Any:
    """Open the raw archive for UTF-8 append, creating parents; truncate on fresh.

    Appends by default so chunked runs accumulate into one file. With
    fresh=True the file is truncated first (start the archive over).
    """
    raw_path.parent.mkdir(parents=True, exist_ok=True)
    mode = "w" if fresh else "a"
    return open(raw_path, mode, encoding="utf-8", newline="\n")


# ---------------------------------------------------------------- selftest
def run_selftest(settings: Settings) -> int:
    failures = 0

    def check(name: str, condition: bool) -> None:
        nonlocal failures
        if condition:
            print(f"PASS  {name}")
        else:
            failures += 1
            print(f"FAIL  {name}")

    subject_name = settings.subject.get("name", "Alexandra Rivera")

    # presence
    check("presence: full subject name in text",
          score_presence(settings, f"{subject_name} is a luxury agent in Georgetown.", []) is True)
    check("presence: short surname form in text",
          score_presence(settings, "Rivera ranks among the top agents in DC.", []) is True)
    check("presence: own-domain citation counts as present",
          score_presence(settings, "Nothing here.", ["https://www.alexrivera.example.com/agents"]) is True)

    first_competitor = settings.competitors[0] if settings.competitors else None
    if first_competitor is not None:
        comp_name = first_competitor.get("name", first_competitor["id"])
        comp_domain = f"https://{first_competitor['id']}.example.com"
        check("presence: absent when only a competitor is mentioned",
              score_presence(settings, f"{comp_name} is a top agent.", [comp_domain]) is False)

        # competitor mentions
        mentions = score_competitor_mentions(settings, comp_name + " leads the field.")
        check(f"mentions: {first_competitor['id']} x1", mentions.get(first_competitor["id"]) == 1)
        check("mentions: covers exactly the config competitor ids",
              sorted(mentions) == sorted(settings.competitor_ids))

    # rank
    rank_text = f"{subject_name} is also notable; others appear too."
    check("rank: subject first when alone in the text", score_rank(settings, rank_text) == 1)
    check("rank: null when subject absent",
          score_rank(settings, "No tracked brand appears in this sentence.") is None)
    if first_competitor is not None:
        comp_name = first_competitor.get("name", first_competitor["id"])
        check("rank: subject second after first competitor",
              score_rank(settings, f"{comp_name} leads, ahead of {subject_name}.") == 2)

    # citation-only presence has null rank
    check("presence: citation-only presence has null rank",
          (score_presence(settings, "See the listing site for details.",
                          ["https://www.alexrivera.example.com/"]) is True)
          and score_rank(settings, "See the listing site for details.") is None)

    # citations
    urls = ["https://www.alexrivera.example.com", "https://alexrivera.example.com/about",
            "https://competitor-one.example.com/x", "https://www.competitor-one.example.com/y",
            "https://en.wikipedia.org/wiki/Alexandra_Rivera"]
    check("citations: distinct domains", score_total_citations(urls) == 3)
    check("citations: cap at 10",
          score_total_citations([f"https://d{i}.example.com" for i in range(12)]) == 10)
    check("citations: zero for no urls", score_total_citations([]) == 0)

    # subjectCited (was the subject's own domain cited in this answer?)
    check("subjectCited: true for the own domain",
          score_subject_cited(settings, ["https://alexrivera.example.com/about"]) is True)
    check("subjectCited: true for www.-prefixed form",
          score_subject_cited(settings, ["https://www.alexrivera.example.com"]) is True)
    check("subjectCited: true for deep path under the domain",
          score_subject_cited(settings, ["https://www.alexrivera.example.com/agents/alexandra-rivera"]) is True)
    check("subjectCited: true when mixed with other domains",
          score_subject_cited(settings, ["https://competitor-one.example.com", "https://www.alexrivera.example.com/x"]) is True)
    check("subjectCited: false when absent",
          score_subject_cited(settings, []) is False)
    check("subjectCited: false for a lookalike domain",
          score_subject_cited(settings, ["https://notalexrivera.example.com"]) is False)

    # excerpt
    long_text = "A" * 150 + subject_name + "B" * 150
    excerpt = make_excerpt(settings, long_text)
    check("excerpt: verbatim window contains subject and <=200 chars",
          subject_name in excerpt and len(excerpt) <= 200)
    check("excerpt: falls back to first 200 chars", make_excerpt(settings, "Q" * 500) == "Q" * 200)

    # raw archive block formatter (full verbatim text + all citation URLs)
    _raw_rec = {"engine": "chatgpt", "queryId": settings.all_query_ids[0], "model": "gpt-5-mini"}
    _raw_text = "X" * 300 + "\nsecond line of the answer\n" + "Y" * 50
    _raw_urls = ["https://example.com/a", "https://example.org/b"]
    _block = format_raw_block(settings, _raw_rec, _raw_text, _raw_urls)
    check("raw: block names engine, query id and model",
          "engine: chatgpt" in _block and f"query: {settings.all_query_ids[0]}" in _block
          and "model: gpt-5-mini" in _block)
    check("raw: block carries the FULL verbatim response (not truncated)",
          _raw_text in _block and len(_raw_text) > 200)
    check("raw: block lists every citation URL",
          "  https://example.com/a" in _block and "  https://example.org/b" in _block
          and "citations: 2" in _block)
    _err_block = format_raw_block(settings, _raw_rec, "ERROR: HTTP 500: boom", [])
    check("raw: error block writes ERROR body and (none) citations",
          "ERROR: HTTP 500: boom" in _err_block and "citations: (none)" in _err_block)

    # redaction (sanitization proof)
    check("redact: strips key= query param",
          "AIzaSyAbcdefgh12345" not in _redact("https://x/v1?key=AIzaSyAbcdefgh12345&q=1"))
    check("redact: strips Bearer header",
          "sk-abcdef1234567890" not in _redact("Authorization: Bearer sk-abcdef1234567890"))

    # merge-on-write helper (same-key replacement + preservation)
    def _rec(engine: str, qid: str, citations: int) -> dict:
        return {"engine": engine, "queryId": qid, "access": "ok",
                "totalCitations": citations}

    q0, q1, q2 = settings.all_query_ids[0], settings.all_query_ids[1], settings.all_query_ids[2]
    base = [_rec("chatgpt", q0, 1), _rec("chatgpt", q1, 2)]
    batch = [_rec("chatgpt", q1, 99), _rec("chatgpt", q2, 3)]
    merged, mstats = merge_records(base, batch)
    merged_by_key = {(r["engine"], r["queryId"]): r for r in merged}
    check("merge: same-key record is replaced",
          merged_by_key[("chatgpt", q1)]["totalCitations"] == 99
          and mstats["replaced"] == 1)
    check("merge: keys not in the new batch are preserved",
          merged_by_key[("chatgpt", q0)]["totalCitations"] == 1
          and mstats["preserved"] == 1
          and len(merged) == 3)
    check("merge: coverage counts distinct (engine, queryId) pairs",
          coverage_summary(settings, merged)[0] == 3)

    # records lock helper (exclusive, stale-override, held-lock rejection)
    import tempfile

    with tempfile.TemporaryDirectory() as _tmpdir:
        _lock_target = Path(_tmpdir) / "records.json"
        _lock_path = _acquire_records_lock(_lock_target)
        check("lock: acquire succeeds and <out>.lock exists",
              _lock_path == _lock_path_for(_lock_target) and _lock_path.exists())
        _held_message = ""
        try:
            _acquire_records_lock(_lock_target)
        except ValueError as exc:
            _held_message = str(exc)
        check("lock: second acquire while held raises with ONE AT A TIME wording",
              "ONE AT A TIME" in _held_message)
        release_records_lock(_lock_path)
        check("lock: release removes the .lock file", not _lock_path.exists())

        # stale override: a lock older than the threshold is removed and retried
        _stale_target = Path(_tmpdir) / "stale.json"
        _stale_path = _lock_path_for(_stale_target)
        _stale_path.write_text("99999\n", encoding="ascii")
        _old = time.time() - (LOCK_STALE_SECONDS + 60)
        os.utime(str(_stale_path), (_old, _old))
        _stale_acquired = _acquire_records_lock(_stale_target)
        check("lock: stale lock is overridden and reacquired",
              _stale_acquired.exists())
        release_records_lock(_stale_acquired)

    # coverage grid is engines x queries from the config
    same = coverage_summary(settings, [_rec("chatgpt", q0, 1)])
    check("coverage: full grid is config engines x config queries",
          same[1] == len(settings.engine_ids) * len(settings.all_query_ids))

    print(f"\nSELFTEST: {failures} failure(s)")
    return 1 if failures else 0


# ---------------------------------------------------------------- main
def main(argv: list[str] | None = None) -> int:
    try:
        config = load_config()
    except ConfigError as exc:
        print(f"ERROR: {exc}")
        return 1
    settings = Settings(config)

    parser = argparse.ArgumentParser(
        description="Config-driven live answer-engine AEO evaluation runner "
                    "(stdlib only; all subject/query data comes from aeo-config.json)")
    parser.add_argument("--engines", default=",".join(settings.engine_ids),
                        help=f"comma-separated engines (default: {','.join(settings.engine_ids)})")
    parser.add_argument("--queries", default=",".join(settings.all_query_ids),
                        help="comma-separated query ids from aeo-config.json "
                             f"(default: all {len(settings.all_query_ids)})")
    parser.add_argument("--out", default=None,
                        help="records JSON path (default: live-results/<date>.json); "
                             "if the file already exists for the same date its records "
                             "are merged with this run's, keyed by (engine, queryId)")
    parser.add_argument("--snapshot", nargs="?", const="__default__", default=None,
                        help="also write a dashboard-shaped snapshot object "
                             "(default: live-results/<date>-snapshot.json); built from "
                             "the MERGED record set so chunks accumulate")
    parser.add_argument("--raw", default=None,
                        help="also archive the FULL verbatim engine answers (plus every "
                             "citation URL) to this plain text path; UTF-8 append so "
                             "chunks accumulate, truncated only with --fresh. The 200-char "
                             "responseExcerpt in the records/snapshot is a separate, "
                             "deliberately shorter inline snippet")
    parser.add_argument("--fresh", action="store_true",
                        help="ignore and overwrite any existing --out file instead of "
                             "merging (explicit start-over for this run); default is "
                             "merge-on-write")
    parser.add_argument("--dry-run", action="store_true",
                        help="print exactly what would be sent (secrets redacted); no HTTP calls")
    parser.add_argument("--no-preamble", action="store_true",
                        help="send the bare query with no config preamble (bare variant); "
                             "default is framed (preamble + query)")
    parser.add_argument("--selftest", action="store_true",
                        help="run scoring unit fixtures and exit")
    args = parser.parse_args(argv)

    if args.selftest:
        return run_selftest(settings)

    engine_ids = [e.strip() for e in args.engines.split(",") if e.strip()]
    query_ids = [q.strip() for q in args.queries.split(",") if q.strip()]
    if not engine_ids:
        parser.error("--engines produced an empty list")
    if not query_ids:
        parser.error("--queries produced an empty list")
    for eid in engine_ids:
        if eid not in settings.engine_ids:
            parser.error(f"unknown engine {eid!r} (choose from {', '.join(settings.engine_ids)})")
    for qid in query_ids:
        if qid not in settings.query_by_id:
            parser.error(f"unknown query id {qid!r} (choose from {', '.join(settings.all_query_ids)})")

    keys: dict[str, str | None] = {}
    sources: dict[str, str | None] = {}
    for eid in engine_ids:
        env_name, provider = ENGINE_AUTH.get(eid, ("", ""))
        if not env_name:
            keys[eid], sources[eid] = None, None
            continue
        key, source = load_key(env_name, provider)
        keys[eid] = key
        sources[eid] = source

    use_preamble = not args.no_preamble
    variant = "framed" if (use_preamble and settings.preamble.strip()) else "bare"

    if args.dry_run:
        print("DRY RUN - no HTTP requests will be made; nothing below is sent anywhere.")
        print(f"Variant: {variant} ({'preamble + query' if variant == 'framed' else 'query only'})")
        print("Sanitization: Authorization / x-api-key header values and any key=/token="
              "query parameters are redacted from this output.")
        print("What would be sent is exactly: URL, method, model, and the body shown "
              "(public query text + one fixed config preamble line).")
        for eid in engine_ids:
            print_dry_run(settings, eid, query_ids, sources[eid], use_preamble)
        return 0

    for eid in engine_ids:
        if not keys[eid]:
            env_name, provider = ENGINE_AUTH.get(eid, ("", ""))
            print(f"[skip] {eid}: no API key found ({env_name} unset and provider "
                  f"{provider!r} missing from the opencode auth store)")

    if not any(keys.values()):
        print("ERROR: no API keys available for the selected engines; nothing ran.")
        return 1

    raw_handle = None
    if args.raw:
        raw_path = Path(args.raw)
        try:
            raw_handle = open_raw_archive(raw_path, fresh=args.fresh)
        except OSError as exc:
            print(f"ERROR: cannot open --raw archive {raw_path}: {_redact(str(exc))}")
            return 1
        print(f"raw archive: {raw_path} ({'truncated' if args.fresh else 'append'})")

    try:
        records, stats = run_evaluation(settings, engine_ids, query_ids, keys, use_preamble,
                                        raw_handle=raw_handle)
    finally:
        if raw_handle is not None:
            raw_handle.close()

    now = datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    out_path = Path(args.out) if args.out else RESULTS_DIR / f"{date_str}.json"
    try:
        merged_records, merge_stats = write_records(
            settings, out_path, date_str, records, fresh=args.fresh)
    except ValueError as exc:
        print(f"ERROR: {exc}")
        return 1
    print(f"\nwrote records: {out_path}")

    if args.snapshot is not None:
        snap_path = (Path(args.snapshot) if args.snapshot != "__default__"
                     else RESULTS_DIR / f"{date_str}-snapshot.json")
        snap_path.parent.mkdir(parents=True, exist_ok=True)
        snapshot = build_snapshot(settings, date_str, now.strftime("%b %Y"), merged_records)
        if "notes" not in snapshot:
            n_ok = sum(1 for r in snapshot["results"])
            snapshot["notes"] = (
                f"Run {date_str}. {n_ok} rows captured via official engine APIs.")
        snap_path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"wrote snapshot: {snap_path}")

    print_summary(settings, stats, engine_ids, keys)
    print_merge_summary(settings, merge_stats, merged_records)
    return 0


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        try:
            _selftest_settings = Settings(load_config())
        except ConfigError as exc:
            print(f"ERROR: {exc}")
            raise SystemExit(1)
        raise SystemExit(run_selftest(_selftest_settings))
    raise SystemExit(main())
