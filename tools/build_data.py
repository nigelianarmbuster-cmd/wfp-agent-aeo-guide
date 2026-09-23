"""Build dashboard/data.js from tools/data.json (validate first, then emit).

Output: ../dashboard/data.js relative to this script,
content: a single compact statement `window.AEO_DATA = <json>;`

Usage:  python build_data.py [path/to/data.json]
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

import validate_data

SCRIPT_DIR = Path(__file__).resolve().parent
OUT_PATH = SCRIPT_DIR.parent / "dashboard" / "data.js"


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else SCRIPT_DIR / "data.json"
    try:
        dataset = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: cannot read {path}: {exc}")
        return 1

    errors = validate_data.check(dataset)
    if errors:
        print(f"REFUSING TO BUILD - {len(errors)} validation error(s):")
        for message in errors:
            print(f"  - {message}")
        return 1

    # Compact, ASCII-only payload for a portable JS literal. U+2028/U+2029 are
    # legal in JSON but illegal in JS string literals on some parsers, so they
    # are escaped explicitly (ensure_ascii also escapes them, but be explicit).
    payload = json.dumps(dataset, ensure_ascii=True, separators=(",", ":"))
    payload = payload.replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = OUT_PATH.with_suffix(".js.tmp")
    tmp_path.write_text(f"window.AEO_DATA = {payload};", encoding="utf-8")
    tmp_path.replace(OUT_PATH)  # atomic swap
    print(f"OK - wrote {OUT_PATH} ({OUT_PATH.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
