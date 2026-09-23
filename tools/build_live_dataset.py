"""Build the live AEO dataset (data.json) from live-results snapshot files.

Usage:  python build_live_dataset.py

Reads `aeo-config.json` (next to this script) for the dataset's identity -
site, subject, engines, competitors, queries, and dataset label - so nothing
about the subject is hardcoded here. Then scans `live-results/*-snapshot.json`
(relative to this script) and merges every snapshot into one dashboard dataset
written to `data.json`.

Each snapshot's result rows are copied verbatim (deep-copied; order and values
untouched) except for legacy normalization applied to the rows:
  * engine ids:      anthropic -> claude, openai -> chatgpt
  * subject metrics: wfpPresent -> subjectPresent,
                     wfpRank -> subjectRank,
                     wfpRecommended -> subjectRecommended

The meta block is built entirely from aeo-config.json (dataStatus is forced to
"live"; the dataset label comes from the config). Each snapshot keeps its own
"method". Any legacy key that gets normalized is reported per row, and each
file's raw engine-id distribution is reported so the ids it used are visible.
"""

from __future__ import annotations

import copy
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
CONFIG_PATH = SCRIPT_DIR / "aeo-config.json"
SNAPSHOT_DIR = SCRIPT_DIR / "live-results"
OUT_PATH = SCRIPT_DIR / "data.json"

LEGACY_ENGINE_IDS = {"anthropic": "claude", "openai": "chatgpt"}
LEGACY_SUBJECT_KEYS = {
    "wfpPresent": "subjectPresent",
    "wfpRank": "subjectRank",
    "wfpRecommended": "subjectRecommended",
}


def load_config() -> dict:
    """Load and minimally validate aeo-config.json."""
    try:
        config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except OSError as exc:
        raise SystemExit(f"ERROR: cannot read {CONFIG_PATH}: {exc}")
    except json.JSONDecodeError as exc:
        raise SystemExit(f"ERROR: invalid JSON in {CONFIG_PATH}: {exc}")
    if not isinstance(config, dict):
        raise SystemExit(f"ERROR: {CONFIG_PATH} is not a JSON object")
    for field in ("site", "subject", "engines", "competitors", "queries", "datasetLabel"):
        if field not in config:
            raise SystemExit(f"ERROR: {CONFIG_PATH} is missing required key {field!r}")
    return config


def build_meta(config: dict) -> dict:
    """Build the dataset meta block from aeo-config.json (no hardcoded subject)."""
    return {
        "site": config["site"],
        "subject": config["subject"],
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "dataStatus": "live",
        "datasetLabel": config["datasetLabel"],
        "engines": config["engines"],
        "competitors": config["competitors"],
        "queries": config["queries"],
        "methodologyNote": (
            "Live evaluation: each answer engine queried via its official API with the same "
            f"{len(config['queries'])} non-branded, market-specific questions (no query names "
            "the subject); metrics derived from response scoring (presence, position among "
            "tracked agents, citations, explicit recommendation). Rank convention: "
            "rank-when-present (absent = null)."
        ),
    }


def load_snapshot_files() -> list[tuple[Path, dict]]:
    """Parse every live-results/*-snapshot.json; exit 1 on unreadable/malformed input."""
    files: list[tuple[Path, dict]] = []
    for path in sorted(SNAPSHOT_DIR.glob("*-snapshot.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            raise SystemExit(f"ERROR: cannot read {path}: {exc}")
        if not isinstance(data, dict):
            raise SystemExit(f"ERROR: {path} is not a JSON object")
        if not isinstance(data.get("id"), str) or not data["id"].strip():
            raise SystemExit(f"ERROR: {path} has no string 'id' field")
        if not isinstance(data.get("results"), list):
            raise SystemExit(f"ERROR: {path} has no 'results' list")
        files.append((path, data))
    return files


def normalize_rows(rows: list) -> tuple[list, list[str]]:
    """Deep-copy rows and normalize legacy key names.

    Normalizes legacy engine ids on the 'engine' field, and legacy subject
    metric field names (wfp* -> subject*). Returns (rows_copy, mappings) where
    mappings describes every row/field that had a legacy name rewritten as
    "old->new".
    """
    rows_copy = copy.deepcopy(rows)
    mappings: list[str] = []
    for index, row in enumerate(rows_copy, 1):
        if not isinstance(row, dict):
            continue
        engine = row.get("engine")
        if engine in LEGACY_ENGINE_IDS:
            mapped = LEGACY_ENGINE_IDS[engine]
            row["engine"] = mapped
            mappings.append(f"row {index}: engine {engine}->{mapped}")
        for old_key, new_key in LEGACY_SUBJECT_KEYS.items():
            if old_key in row and new_key not in row:
                row[new_key] = row.pop(old_key)
                mappings.append(f"row {index}: {old_key}->{new_key}")
    return rows_copy, mappings


def build_snapshot(path: Path, data: dict) -> tuple[dict, Counter, list[str]]:
    """Build one snapshot object from a parsed file.

    Returns (snapshot, engine_distribution, mappings). Result rows are
    deep-copied verbatim via normalize_rows; the optional "notes" key is
    carried over only when the file has one.
    """
    raw_rows = data["results"]
    distribution: Counter = Counter(
        str(row.get("engine")) for row in raw_rows if isinstance(row, dict)
    )
    rows, mappings = normalize_rows(raw_rows)
    snapshot = {
        "id": data["id"],
        "label": data.get("label") or data["id"],
        "method": data.get("method", "live_api"),
        "results": rows,
    }
    if "notes" in data:
        snapshot["notes"] = data["notes"]
    return snapshot, distribution, mappings


def main() -> int:
    config = load_config()
    meta = build_meta(config)

    files = load_snapshot_files()
    if not files:
        print(f"ERROR: no *-snapshot.json files found in {SNAPSHOT_DIR}")
        return 1

    ids = [data["id"] for _, data in files]
    if len(set(ids)) != len(ids):
        dupes = sorted({sid for sid in ids if ids.count(sid) > 1})
        print(f"ERROR: duplicate snapshot ids {dupes} across live-results files")
        return 1

    files.sort(key=lambda pair: pair[1]["id"])

    snapshots: list[dict] = []
    total_rows = 0
    total_mappings = 0
    print(f"Config: {CONFIG_PATH}")
    print(f"Subject: {meta['subject'].get('name')} ({meta['subject'].get('shortName')})")
    print(f"Found {len(files)} snapshot file(s) in {SNAPSHOT_DIR}")
    for number, (path, data) in enumerate(files, 1):
        snapshot, distribution, mappings = build_snapshot(path, data)
        snapshots.append(snapshot)
        total_rows += len(snapshot["results"])
        total_mappings += len(mappings)

        dist_text = ", ".join(f"{key}={count}" for key, count in sorted(distribution.items()))
        print(f"\n[{number}] {path.name}")
        print(f"    id: {snapshot['id']}")
        print(f"    label: {snapshot['label']}")
        print(f"    method: {snapshot['method']}")
        print(f"    rows: {len(snapshot['results'])}")
        print(f"    engine distribution: {dist_text or '(no rows)'}")
        print(f"    key mappings applied: {', '.join(mappings) if mappings else 'none'}")

    dataset = {"meta": meta, "snapshots": snapshots}
    OUT_PATH.write_text(json.dumps(dataset, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(
        f"\nTotals: {len(snapshots)} snapshot(s), {total_rows} result row(s), "
        f"{total_mappings} key mapping(s) applied"
    )
    print(f"Wrote: {OUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
