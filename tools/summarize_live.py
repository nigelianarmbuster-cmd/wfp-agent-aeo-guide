"""Summarize a live-run snapshot: per-engine ok/present/avgRank/rec + overall.

Usage:  python summarize_live.py [path/to/-snapshot.json]

Defaults to the newest `live-results/*-snapshot.json` relative to this script.
`rec` = subjectPresent AND subjectRank == 1, honoring a legacy
`subjectRecommended` field when one is present. Excerpt detection uses the
alias regex from `aeo-config.json` (never a hardcoded name). Stdlib only.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
CONFIG_PATH = SCRIPT_DIR / "aeo-config.json"
LIVE_DIR = SCRIPT_DIR / "live-results"

EXCERPT_PREVIEW = 180


def resolve_input() -> Path:
    """Return the CLI-provided input path, or the newest *-snapshot.json."""
    if len(sys.argv) > 1:
        return Path(sys.argv[1])
    candidates = sorted(LIVE_DIR.glob("*-snapshot.json"))
    if not candidates:
        raise SystemExit(f"ERROR: no *-snapshot.json files found in {LIVE_DIR}")
    return candidates[-1]


def load_alias_pattern() -> re.Pattern:
    """Compile the config's alias regex for excerpt detection.

    Falls back to a never-matching pattern if the config has no usable alias,
    so the summary still runs (excerpt section simply stays empty).
    """
    try:
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return re.compile(r"(?!)")
    alias = config.get("aliases") if isinstance(config, dict) else None
    if not isinstance(alias, str) or not alias.strip():
        return re.compile(r"(?!)")
    try:
        return re.compile(alias)
    except re.error:
        return re.compile(r"(?!)")


def is_recommended(row: dict) -> bool:
    """Recommended = subject present AND ranked first.

    Older snapshots carry an explicit subjectRecommended flag; the current
    schema dropped it, so derive it from subjectPresent/subjectRank.
    """
    if "subjectRecommended" in row:
        return bool(row.get("subjectRecommended"))
    return bool(row.get("subjectPresent")) and row.get("subjectRank") == 1


def main() -> int:
    path = resolve_input()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SystemExit(f"ERROR: cannot read {path}: {exc}")

    records = data["results"]
    print(
        f"id={data['id']} label={data['label']} method={data['method']} "
        f"total_records={len(records)}"
    )

    by_engine: dict[str, dict] = {}
    for row in records:
        bucket = by_engine.setdefault(
            row["engine"], {"ok": 0, "present": 0, "ranks": [], "rec": 0}
        )
        bucket["ok"] += 1
        if row.get("subjectPresent"):
            bucket["present"] += 1
        if row.get("subjectRank") is not None:
            bucket["ranks"].append(row["subjectRank"])
        if is_recommended(row):
            bucket["rec"] += 1

    for eng, bucket in by_engine.items():
        avg = sum(bucket["ranks"]) / len(bucket["ranks"]) if bucket["ranks"] else 0.0
        print(
            f"{eng}: ok={bucket['ok']} present={bucket['present']}/{bucket['ok']} "
            f"avgRank={avg:.2f} rec={bucket['rec']}/{bucket['ok']}"
        )

    # overall across successful responses
    ok = records
    present = sum(1 for row in ok if row.get("subjectPresent"))
    rec = sum(1 for row in ok if is_recommended(row))
    ranks = [row["subjectRank"] for row in ok if row.get("subjectRank") is not None]
    total = len(ok)
    present_pct = 100 * present / total if total else 0.0
    rec_pct = 100 * rec / total if total else 0.0
    avg_rank = sum(ranks) / len(ranks) if ranks else 0.0
    print(
        f"\nOVERALL: present {present}/{total} ({present_pct:.1f}%), "
        f"avg rank {avg_rank:.2f}, recommended {rec}/{total} ({rec_pct:.1f}%)"
    )

    # Verbatim excerpts whose text matches the config alias regex.
    pattern = load_alias_pattern()
    print("\nverbatim excerpts (first 3 subject mention windows):")
    shown = 0
    for row in ok:
        if shown >= 3:
            break
        excerpt = (row.get("responseExcerpt") or "").strip()
        if excerpt and pattern.search(excerpt):
            print(f"  [{row['engine']} {row['queryId']}] {excerpt[:EXCERPT_PREVIEW]}")
            shown += 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
