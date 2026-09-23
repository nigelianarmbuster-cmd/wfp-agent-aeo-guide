"""Schema + consistency validator for an AEO dashboard dataset (data.json).

Generic by design: the engine / competitor / query id sets are **derived from
the dataset's own `meta`** rather than hardcoded here, so the same validator
works for any subject's dataset.

Subject invariants:
* subjectRank may be non-null only when subjectPresent is true (the dangerous
  direction). Presence with a null rank is legitimate: it can come from an
  own-domain citation with no text mention of the subject.
* subjectRecommended is OPTIONAL-LEGACY and never required: older published
  snapshots carry it, so it must still validate when present, but new
  snapshots do not emit it (recommendation is now defined downstream as
  "appeared AND ranked first", which needs no field of its own). When it is
  present the value must be a bool or null, and a legacy `true` requires the
  subject to be present.
* subjectCited is OPTIONAL: when present it must be a bool (or null for an
  error row).
* responseExcerpt is OPTIONAL: when present it must be a string of at most 200
  characters (verbatim slice of the answer), or null for an error row.

Usage:  python validate_data.py [path/to/data.json]   (default: tools/data.json)
Exit code 0 = valid, 1 = errors found. Errors print in readable form.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

# Accepted values for the dataset-level status.
VALID_DATA_STATUS = {"live", "manual", "model"}
# Accepted values for a snapshot's capture method.
VALID_METHODS = {"manual", "live_api"}


def _ids(items: object) -> list:
    """Return the list of `id` values from a meta list of objects."""
    if not isinstance(items, list):
        return []
    return [item.get("id") for item in items if isinstance(item, dict)]


def check(dataset: dict) -> list[str]:
    """Validate a parsed dataset object; return a list of error strings."""
    errors: list[str] = []

    def err(msg: str) -> None:
        errors.append(msg)

    if not isinstance(dataset, dict):
        return ["top-level value is not an object"]

    meta = dataset.get("meta")
    snapshots = dataset.get("snapshots")
    if not isinstance(meta, dict):
        err("meta missing or not an object")
        meta = {}
    if not isinstance(snapshots, list):
        err("snapshots missing or not a list")
        snapshots = []

    # --- meta -----------------------------------------------------------------
    if not isinstance(meta.get("site"), str) or not meta["site"].strip():
        err("meta.site must be a non-empty string")
    if meta.get("dataStatus") not in VALID_DATA_STATUS:
        err(
            "meta.dataStatus must be one of "
            f"{sorted(VALID_DATA_STATUS)}, got {meta.get('dataStatus')!r}"
        )
    if not isinstance(meta.get("datasetLabel"), str) or not meta["datasetLabel"].strip():
        err("meta.datasetLabel must be a non-empty string")
    subject = meta.get("subject")
    if not isinstance(subject, dict):
        err("meta.subject missing or not an object")
    else:
        for field in ("name", "shortName", "company", "site"):
            if not isinstance(subject.get(field), str) or not subject[field].strip():
                err(f"meta.subject.{field} must be a non-empty string")

    # Derive the id sets from meta (do NOT hardcode them here).
    engines = meta.get("engines")
    competitors = meta.get("competitors")
    queries = meta.get("queries")
    for field, items in (("engines", engines), ("competitors", competitors), ("queries", queries)):
        if not isinstance(items, list):
            err(f"meta.{field} missing or not a list")
            continue
        for item in items:
            if not isinstance(item, dict):
                err(f"meta.{field} contains non-object entry")
                continue
            if not isinstance(item.get("id"), str) or not item["id"].strip():
                err(f"meta.{field} entry {item.get('id')!r} has empty id")
            if field != "queries":
                if not isinstance(item.get("name"), str) or not item["name"].strip():
                    err(f"meta.{field} entry {item.get('id')!r} has empty name")
            else:
                if not isinstance(item.get("text"), str) or not item["text"].strip():
                    err(f"meta.queries entry {item.get('id')!r} has empty text")
                if not isinstance(item.get("category"), str) or not item["category"].strip():
                    err(f"meta.queries entry {item.get('id')!r} has empty category")

    engine_ids = set(_ids(engines))
    competitor_ids = set(_ids(competitors))
    query_ids = set(_ids(queries))
    max_cells = len(engine_ids) * len(query_ids)

    # --- snapshots ------------------------------------------------------------
    if not snapshots:
        err("snapshots must be non-empty")

    ids = [s.get("id") for s in snapshots if isinstance(s, dict)]
    if len(set(ids)) != len(ids):
        err("duplicate snapshot ids")
    if ids != sorted(ids, key=str):
        err("snapshot ids must be chronological (sortable string order)")

    for snap in snapshots:
        if not isinstance(snap, dict):
            err("snapshots contains non-object entry")
            continue
        sid = snap.get("id", "?")
        if snap.get("method") not in VALID_METHODS:
            err(
                f"snapshot {sid}: method must be one of {sorted(VALID_METHODS)}, "
                f"got {snap.get('method')!r}"
            )
        if "notes" in snap and not isinstance(snap["notes"], str):
            err(f"snapshot {sid}: snapshot notes must be a string")
        results = snap.get("results")
        if not isinstance(results, list):
            err(f"snapshot {sid}: results missing or not a list")
            continue
        if max_cells and len(results) > max_cells:
            err(
                f"snapshot {sid}: {len(results)} rows, more rows than the engine x query "
                f"grid allows (max {max_cells})"
            )
        seen = set()
        for row in results:
            if not isinstance(row, dict):
                err(f"snapshot {sid}: non-object result row")
                continue
            key = (row.get("engine"), row.get("queryId"))
            if key in seen:
                err(f"snapshot {sid}: duplicate row for {key}")
            seen.add(key)
            if row.get("engine") not in engine_ids:
                err(f"snapshot {sid}: unknown engine {row.get('engine')!r}")
            if row.get("queryId") not in query_ids:
                err(f"snapshot {sid}: unknown queryId {row.get('queryId')!r}")

            present = row.get("subjectPresent")
            rank = row.get("subjectRank")
            if not isinstance(present, bool):
                err(f"snapshot {sid} {key}: subjectPresent must be bool, got {present!r}")
            # A rank requires presence (rank is only meaningful when the
            # subject is present). The converse does NOT hold: presence may
            # come from an own-domain citation with no text mention, in which
            # case rank is correctly null.
            if rank is not None and present is not True:
                err(
                    f"snapshot {sid} {key}: subjectRank is {rank!r} but subjectPresent "
                    f"is {present!r} (rank requires presence)"
                )
            if rank is not None and (type(rank) is not int or not 1 <= rank <= 7):
                err(
                    f"snapshot {sid} {key}: subjectRank must be int in 1..7 or null, "
                    f"got {rank!r}"
                )

            # subjectRecommended is OPTIONAL-LEGACY: older snapshots carry it
            # and must keep validating; it is NEVER required. When present it
            # must be a bool (None accepted for an error row), and a legacy
            # True requires presence.
            if "subjectRecommended" in row:
                recommended = row["subjectRecommended"]
                if not isinstance(recommended, bool) and recommended is not None:
                    err(
                        f"snapshot {sid} {key}: subjectRecommended must be bool or null, "
                        f"got {recommended!r}"
                    )
                if recommended is True and present is not True:
                    err(
                        f"snapshot {sid} {key}: subjectRecommended is true but "
                        f"subjectPresent is {present!r}"
                    )

            total = row.get("totalCitations")
            if type(total) is not int or total < 1:
                err(f"snapshot {sid} {key}: totalCitations must be int >= 1, got {total!r}")

            # subjectCited is OPTIONAL: when present it must be a bool (None
            # accepted for an error row).
            if "subjectCited" in row:
                cited = row["subjectCited"]
                if not isinstance(cited, bool) and cited is not None:
                    err(f"snapshot {sid} {key}: subjectCited must be bool or null, got {cited!r}")

            # responseExcerpt is OPTIONAL: when present it must be a verbatim
            # string of at most 200 characters (or null for an error row).
            if "responseExcerpt" in row:
                excerpt = row["responseExcerpt"]
                if excerpt is not None and not isinstance(excerpt, str):
                    err(
                        f"snapshot {sid} {key}: responseExcerpt must be str or null, "
                        f"got {excerpt!r}"
                    )
                elif isinstance(excerpt, str) and len(excerpt) > 200:
                    err(
                        f"snapshot {sid} {key}: responseExcerpt must be <= 200 characters, "
                        f"got {len(excerpt)}"
                    )

            mentions = row.get("competitorMentions")
            if not isinstance(mentions, dict):
                err(f"snapshot {sid} {key}: competitorMentions missing or not an object")
                continue
            if set(mentions) != competitor_ids:
                err(
                    f"snapshot {sid} {key}: competitorMentions keys "
                    f"{sorted(mentions)} != meta competitor ids {sorted(competitor_ids)}"
                )
            for cid, count in mentions.items():
                if not isinstance(count, int) or isinstance(count, bool) or count < 0:
                    err(
                        f"snapshot {sid} {key}: competitorMentions[{cid}] = {count!r}, "
                        f"must be int >= 0"
                    )

    return errors


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("data.json")
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as exc:
        print(f"ERROR: cannot read {path}: {exc}")
        return 1
    try:
        dataset = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {path}: {exc}")
        return 1
    errors = check(dataset)
    if errors:
        print(f"VALIDATION FAILED - {len(errors)} error(s):")
        for message in errors:
            print(f"  - {message}")
        return 1
    rows = sum(len(s["results"]) for s in dataset["snapshots"])
    print(
        f"VALIDATION OK - {len(dataset['snapshots'])} snapshots, {rows} result rows, "
        f"{len(dataset['meta']['engines'])} engines, {len(dataset['meta']['queries'])} queries"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
