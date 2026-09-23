# Runbook - Live AEO Evaluation

A generic, agent-level procedure for capturing live answer-engine responses and
folding them into `data.js`. This runbook is engine- and subject-agnostic: it
describes the four default API-queryable engines, the chunked sequential run
rule, the raw-answer audit archive, and the honesty rules. It names no subject.

---

## 1. Purpose

Run the frozen query set against each accessible answer engine, capture the
answers verbatim, score them per the rubric (presence, rank, own-domain cited,
total citations, competitor mentions), and merge the scored rows into the
dashboard's `data.js` as a new snapshot.

A live run is directional, not precise measurement. Answers vary by engine,
model version, user, location, and day. Track trends across snapshots; do not
over-read a single result.

---

## 2. The four engines

The default set is the four engines with an official queryable API:

| Engine | id | Official API documentation |
|---|---|---|
| ChatGPT | `chatgpt` | https://platform.openai.com/docs/api-reference |
| Gemini | `gemini` | https://ai.google.dev/gemini-api/docs |
| Perplexity | `perplexity` | https://docs.perplexity.ai/ |
| Claude | `claude` | https://docs.anthropic.com/en/api/ |

Only evaluate engines you can actually reach. If an engine is not accessible,
**omit its rows entirely** (see section 6) - do not emit placeholder rows.

Google AI Overviews is **not** one of the four engines. It is a Search SERP
feature with no official API and can only ever be captured by hand (see
section 7, manual fallback).

---

## 3. The chunked sequential run rule

A full run across four engines can exceed a per-invocation shell timeout, so a
run is **chunked** - one engine, or one query group, per invocation. Chunked
runs are strictly **sequential**. Follow these rules:

1. **One engine / query-group at a time.** Do not launch overlapping chunks that
   write to the same output.
2. **Reuse the SAME `--out`, `--snapshot`, and `--raw` paths across every chunk
   of the same run.** Each chunk merges into the run's existing artifacts rather
   than starting fresh.
3. **The coverage line must only ever increase.** Each chunk prints a coverage
   line (N of engines x queries, with a complete/incomplete verdict). A given
   chunk must never make coverage go down. If it does, a chunk clobbered prior
   records - stop and investigate.
4. **A `--out` lock guards against races.** The runner takes a lock on the
   `--out` file so two chunks cannot write it at once. If the lock is held,
   wait - do not force it.

Because each chunk merges records keyed by `(engine, queryId)` and scoped to the
run date, a second run on the same day cannot silently overwrite an earlier one.

Merge-on-write is mandatory: a runner that overwrites its output file would let
each chunk destroy the previous one's records.

---

## 4. The `--raw` full-answer audit archive

Scores are derived from answers; the answers themselves must remain auditable.

- Pass `--raw <path>` to write the **full, un-truncated** answer for every
  `(engine, queryId)` to the raw archive.
- The archive is the ground truth behind every score. Any later dispute about a
  presence, rank, or citation value is resolved by reading the raw answer.
- Keep the raw archive per run (the path is typically
  `tools/live-results/raw/`). It is build clutter, not a site asset, so it is
  excluded from the deploy image and from version control.
- The `responseExcerpt` field in `data.js` is a verbatim excerpt of **200
  characters or fewer**; the raw archive holds the complete answer the excerpt
  was cut from.

---

## 5. The honesty rules

These are mandatory. Do not violate them under any circumstance.

1. **Never invent an engine answer.** If you did not receive it, do not write
   it. No reconstruction, no "likely" answer, no filling in from a similar
   query.
2. **If an engine or query cannot be checked, omit its row.** Do not emit rows
   with `null` metric fields. A partial or placeholder row is counted by the
   dashboard as 0% visibility and silently corrupts the metrics. List the
   un-evaluated engines/queries in your plain-language summary and in
   `aeo-state.md` so the omission is explicit, not silent.
3. **Quote verbatim only.** Excerpts are 200 characters or fewer and copied
   exactly. Never paraphrase inside quotation marks.
4. **Mark anything ungrounded as "Unverified."** If a fact has no source you
   actually read, label it.
5. **Do not scrape sites that block automated access.** If a page refuses
   automated access, stop and ask the user to paste the relevant text or
   describe a screenshot.
6. **Do not paste the user's private information into third-party tools** beyond
   what is needed for the task.

---

## 6. Coverage and un-evaluated engines

- `meta.engines` lists the engines being tracked. An engine in the list with
  **no rows** shows as **"pending"** in the dashboard's coverage note - that is
  expected and correct.
- Partial coverage is normal. Simply leave out what was not evaluated.
- After the final chunk, read the coverage line. If it is not complete, say so
  explicitly rather than presenting the run as whole.

---

## 7. Manual fallback

If no engine API is reachable, or if a specific engine cannot be queried, fall
back to manual capture:

1. Hand the user the exact queries to run, **one engine at a time**.
2. The user pastes each answer back. Score only what was pasted.
3. Use the same verbatim, omission, and "Unverified" rules from section 5 - the
   manual path is held to the identical standard as the API path.
4. For the optional Google AI Overviews check: run each query in Google search
   and look for an AI Overview box. Overviews do not appear for every query;
   when there is none, mark that query **"not shown"** and record no row. Only
   add `google_ai_overviews` to `meta.engines` once you are actually capturing
   its rows.
5. Set the snapshot's `method` to `"manual"` and `dataStatus` to `"manual"`.
   (API-driven runs use `method: "live_api"` and `dataStatus: "live"`.)

---

## 8. Run checklist

- [ ] Query set frozen and identical to prior runs.
- [ ] Same `--out`, `--snapshot`, `--raw` paths for every chunk of this run.
- [ ] Chunks run sequentially; coverage line only increases.
- [ ] Raw archive written for every evaluated `(engine, queryId)`.
- [ ] Un-evaluated engines/queries omitted (no null rows).
- [ ] Snapshot merged into `data.js`; `dataStatus` / `method` set correctly.
- [ ] `aeo-state.md` updated with the new snapshot row and action items.
- [ ] `data.js` kept ASCII-only (straight quotes and hyphens).

---

*Results are directional and LLM/API-assisted. No specific answer or ranking
outcome can be guaranteed.*
