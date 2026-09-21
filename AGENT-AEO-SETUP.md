# AEO Dashboard Setup - Agent State Doc

**Version:** 1.0.2
**Date:** 2026-09-10
**Purpose:** Instructions for an AI assistant to set up and maintain a personal Answer Engine Optimization (AEO) dashboard for a Washington Fine Properties agent.

> If you are an AI assistant reading this: follow this document exactly, phase by phase. If a newer version of this document exists in the repository, use that version instead.

**Changelog**
- **1.0.2 (2026-09-10)** - Mode A now has the assistant obtain the dashboard template itself (clone the repo or extract the release zip) so the agentic path is hands-off; Mode B keeps the manual download step.
- **1.0.1 (2026-09-10)** - Clarified that un-evaluated engines/queries must be omitted from `results` (not emitted with null fields); made the query set adapt to the agent's own market via placeholders; added an optional verbatim `excerpt` field; clarified `meta.engines` coverage behavior, manual-vs-dry-run status, and which phases a chat-only assistant can produce as copy blocks.
- **1.0.0 (2026-09-10)** - Initial public release.

---

## What this file is (for the human)

This is a setup doc you hand to your own AI assistant - any provider: Claude, ChatGPT, Gemini, or a command-line coding assistant. It tells the assistant how to check what it can do, ask you a short set of questions, run a small set of fixed search queries across answer engines, score the results, and generate one small data file (`data.js`) that turns on your personal AEO dashboard.

You do **not** need to write code. In the simplest path you answer a few questions, the assistant produces the contents of `data.js`, you save it next to the dashboard's `index.html`, and you open that file in a browser. Re-run it on a regular cadence to track trends - **weekly** and **monthly** are both valid. Pick one and keep it **consistent**: changing cadence mid-series changes how comparable the trend points are.

**How to use it:** give your assistant this entire file (paste the text, attach the file, or share the raw URL), then say: *"Read this setup doc and follow it to build my AEO dashboard."*

---

## Phase 0 - Check your capabilities, then choose a mode

Before doing anything else, determine the answers to these three questions. Be honest - the whole workflow depends on it.

1. **Can you browse the web?** (Can you run a live search/query against a web-connected engine and read the returned answer?)
2. **Can you read files the user attaches?** (PDFs, images of screenshots, pasted text, downloaded HTML.)
3. **Can you write or produce a file the user can save?** (Write to disk, create a downloadable file, produce a Canvas/document the user can export, or at minimum output a complete code block the user can copy.)

Then choose one of two modes and tell the user which you are using and why.

### Mode A - Agentic

Use Mode A if you **can browse the web and can produce a saveable file**.

In Mode A, *you* run each query yourself against every engine the user has access to, capture the answer verbatim, score it, and write the finished `data.js` file directly (or output it as one copy-ready block if you cannot write to the user's disk).

**Obtain the dashboard template yourself (Mode A).** If your environment can run shell commands or write files, do not ask the user to download anything by hand. Get the template into a working folder of the user's choosing yourself, either by:

- **Cloning the public repository:** `https://github.com/nigelianarmbuster-cmd/wfp-agent-aeo-guide` - this gives you both the dashboard template (in `dashboard/`) **and** this instruction file, so no separate download step is needed; then read this document from that clone and proceed; or
- **Downloading and extracting the release zip:** `https://github.com/nigelianarmbuster-cmd/wfp-agent-aeo-guide/releases/latest/download/dashboard.zip` into a working folder of the user's choosing, then proceeding from there.

In Mode A, never tell the user to download the template manually.

### Mode B - Chat

Use Mode B if you **cannot browse the web**, or cannot reliably produce a saveable file.

In Mode B, *you* hand the user the exact queries to run (one engine at a time), the user pastes each answer back to you, and you score them and output the complete contents of `data.js` for the user to save. You never invent an answer you did not receive.

**In Mode B, the user downloads the dashboard template themselves.** Because you cannot run shell commands or write files to their disk, the user downloads the release zip (`https://github.com/nigelianarmbuster-cmd/wfp-agent-aeo-guide/releases/latest/download/dashboard.zip`), extracts it, and saves the `data.js` you output next to the dashboard's `index.html`.

If you are unsure whether you can browse, test it once with a simple query before committing. If the test fails, use Mode B.

Both modes produce the **same** `data.js`. The only difference is who runs the queries.

**What a chat-only assistant (Mode B) can still produce:** even if you cannot write files to disk, you can output complete files as **copy blocks** the user saves themselves. Specifically:

- **Phase 4** - output the full `data.js` contents as one code block.
- **Phase 6** - output the full `aeo-state.md` contents as one code block.
- **Phases 1, 3** work entirely in chat.

**Phase 5 is the exception:** it requires either web access (Mode A) or the user pasting their page content / describing screenshots (Mode B). If neither is available, say so and mark Phase 5 "not evaluated" rather than guessing.

---

## Phase 1 - Intake

Ask the user the following, **one at a time**, and confirm each answer before moving on. Do not batch all questions into one wall of text.

1. **Full name** - exactly as it should appear in an answer (include how they want a common name disambiguated, if relevant).
2. **Company / brokerage** - for WFP agents this is usually "Washington Fine Properties".
3. **Do you have your own website?** If yes, the URL.
4. **Where do your testimonials / reviews live?** (Google Business Profile, Zillow, Realtor.com, personal site, other - list all that apply.)
5. **Service areas / neighborhoods** - the specific places they want to be known for (e.g., Georgetown, Kalorama, Cleveland Park).
6. **Main competitors** - 2 to 5, ideally other individual agents or teams competing for the same listings in the same neighborhoods. (These become the tracked competitors in the dashboard.)
7. **Which answer engines can you access?** The default set is the four API-queryable engines: ChatGPT, Gemini, Perplexity, Claude. You will only evaluate engines the user can actually reach. Google AI Overviews is **not** one of those four - it is an **optional manual addition** the user may choose to observe separately (see Phase 2). Only include it if the user actually wants to run the manual check.
8. **Do you have a wfp.com agent bio URL?** If yes, capture it. If not, note "none" - the user may still have other profiles.

Record all of this. You will reuse it every run.

---

## Phase 2 - Run the query set

Run the frozen 10-query set below. The queries below are **templates**, shown with Washington DC examples as illustrations. You **must adapt them to the agent's actual market** by substituting their name, service areas, neighborhoods, and company (from Phase 1). Keep the **10-question structure and categories stable** across runs so trends stay comparable.

| id | Query (template) | Category | DC example (illustration) |
|---|---|---|---|
| q01 | Who is `{Full Name}`? | profile | Who is Alexandra Rivera? |
| q02 | Best real estate agent in `{Neighborhood}` | ranking | Best real estate agent in Georgetown DC |
| q03 | Top luxury real estate agents in `{Service Area}` | ranking | Top luxury real estate agents in Washington DC |
| q04 | `{Full Name}` vs `{Competitor 1}` | comparison | Alexandra Rivera vs Dana Okonkwo |
| q05 | Top real estate agents in `{Service Area}` | ranking | Top real estate agents in Northwest Washington DC |
| q06 | `{Full Name}` real estate reviews | reputation | Alexandra Rivera real estate reviews |
| q07 | Best real estate agent in `{Service Area}` for luxury homes | ranking | Best real estate agent in DC for luxury homes |
| q08 | Who is the top selling agent in `{Neighborhood}`? | ranking | Who is the top selling agent in Georgetown? |
| q09 | `{Service Area}` luxury real estate agent rankings | ranking | Washington DC luxury real estate agent rankings |
| q10 | `{Full Name}` `{Company}` profile | profile | Alexandra Rivera Washington Fine Properties profile |

On the first run, fill in every placeholder: `{Full Name}`, `{Company}`, `{Service Area}`, and `{Neighborhood}` (the specific place the agent wants to be known for). `{Competitor 1}` is the first tracked competitor. The user may add or change **a few** queries on the first run, but once chosen, **keep the set stable across every subsequent run**.

### Query-syntax guidance

How a query is worded changes what the engine returns, so a few rules keep the set clean and comparable across runs.

- **Do not use `/` as an "or" separator.** In English a slash is ambiguous (it can mean "or" *and* "and"), it is **not** a search operator, and it tokenises badly - measured with `tiktoken`, `Logan/Dupont` becomes `['Log','an','/D','up','ont']`, fusing the slash onto the next word. Write the word **or**.
- **Avoid elliptical qualifiers.** A query like `Best realtor in DC for over $5M` leaves the noun implied. Spell it out - `Best realtor in DC for homes over $5 million` - so the price band has something to attach to.
- **Qualify ambiguous place names.** Names like `Georgetown`, `Kent`, and `Chevy Chase` collide with places elsewhere. A location qualifier helps the engine resolve which one you mean. Trade-off: a qualifier makes the query slightly less like what a real user types. Either qualify the query itself, or supply the geography once in the shared preamble (see below).
- **Keep the wording frozen.** Once a query's wording is chosen, do not reword it between runs.
- **One sample is noisy.** A change of a few presence events between runs may be variance, not signal. Do not over-read small movements.

### The optional shared preamble

A **preamble** is text prepended to every query in the set. Using one, and what goes in it, is a **methodological choice** - a bare query is closer to what a real user types. Whichever way the user chooses, keep it **fixed across runs**; the only way to settle which is better for a given stack is an A/B test.

If a preamble is used:

- It **may supply geographic context**, so ambiguous place names resolve correctly. That is its one defensible job.
- **Never ask the engine to "recommend"** anything. It primes the very recommendation metric the rubric later scores, making the result partly self-fulfilling.
- **Never name the wrong entity type.** If the subject is a team, do not instruct the engine to list "brokerages" - it will name firms and the subject will score absent.

For **each accessible engine**, and **each query**, record:

- The answer **verbatim** as an excerpt of **200 characters or fewer** (store it in the optional `excerpt` field - see Phase 4). Never paraphrase inside quotation marks.
- Whether the agent **appears** in the answer (yes/no).
- The agent's **rank** among the tracked competitors (1 = named first; `null` if absent).
- Whether the agent is **explicitly recommended** (yes/no).
- The **number of distinct cited domains** in the answer (an integer).
- How many times each tracked **competitor** is mentioned.

**If an engine or query was NOT evaluated, omit its row entirely from `results`.** If an engine cannot be checked for any reason, do not emit a row for it, and do not emit rows with `null` metric fields - a partial or placeholder row would be counted by the dashboard as 0% visibility and silently corrupt the metrics. Simply leave the engine's rows out; the dashboard shows un-evaluated engines as **"pending"/missing via its coverage note**, so the omission is visible and correct. Do not guess.

### Manual Google AI Overviews check (optional)

This check is **optional** and **not one of the four API-queryable engines**. Google AI Overviews has no official API - it is a Search SERP feature - so it can only ever be captured by hand. Treat it as an **optional manual addition** the user enables deliberately: run it only if the user chooses to, and only then should `google_ai_overviews` appear in `meta.engines` (see Phase 4). If the user does not want it, skip this section entirely and track the four API engines only.

Google AI Overviews must be checked **manually** in a normal Google search - it is not the same as asking Gemini.

- Run each query in Google search and look for an AI Overview box at the top.
- **AI Overviews do not appear for every query.** When there is no AI Overview, mark that query **"not shown"** - do **not** record a row for it.
- This is why Google AI Overviews will have fewer rows than the other engines, especially in early snapshots. That is expected and correct.

---

## Honesty rules (mandatory - do not violate these)

1. **Never invent an engine answer.** If you did not receive it, do not write it.
2. **If an engine or query cannot be checked, omit its row** from `results` and do not emit rows with `null` metric fields. Say which engines/queries were **"not evaluated"** in your plain-language summary (and in `aeo-state.md`), so the omission is explicit rather than silent.
3. **Quote verbatim only.** Excerpts must be 200 characters or fewer and must be copied exactly.
4. **Mark anything ungrounded as "Unverified."** If a fact has no source you actually read, label it.
5. **Do not scrape sites that block automated access.** If a page refuses automated access, stop and ask the user to paste the relevant text or describe a screenshot.
6. **Do not paste the user's private information into third-party tools** beyond what is needed for the task.

---

## Phase 3 - Score

Derive every dashboard metric from the raw answers using this rubric. Rank convention throughout: **rank-when-present** (absent = `null`).

Only score rows that were actually evaluated. Un-evaluated engines/queries have **no rows** in `results` (see Phase 2), so they are naturally excluded from the denominator. Do not substitute zeros for them.

- **Presence** - treat as 1 if the agent is named in the answer, else 0.
- **Rank** - position of the agent among the tracked competitors named in the answer (1 = first). `null` if absent.
- **Recommendation** - 1 if the answer explicitly recommends the agent (not merely mentions them), else 0.
- **Citations** - count of **distinct cited domains** in the answer.

From these, the dashboard computes:

| Metric | Meaning |
|---|---|
| **Visibility** | Share of evaluated answers where the agent is present. |
| **Average Rank** | Mean rank across answers where the agent is present (`null` rows excluded). |
| **Citation Share** | The agent's share of citations relative to tracked competitors. |
| **Recommendation Rate** | Share of answers where the agent is explicitly recommended. |
| **Share of Voice** | The agent's mentions as a share of all tracked mentions. |

---

## Phase 4 - Generate `data.js`

Produce a file named **`data.js`** containing a single `window.AEO_DATA` object with the exact schema below. Use the frozen schema verbatim - do not rename keys.

```js
window.AEO_DATA = {
  "meta": {
    "site": "{{USER SITE OR wfp.com BIO URL}}",
    "subject": {
      "name": "{{FULL NAME}}",
      "shortName": "{{LAST NAME}}",
      "company": "{{COMPANY / BROKERAGE}}",
      "site": "{{USER SITE}}"
    },
    "generatedAt": "{{YYYY-MM-DD}}",
    "dataStatus": "manual",              // "manual" => no SAMPLE badge on a real run
    "datasetLabel": "{{Short description of this run}}",
    "engines": [
      {"id":"chatgpt","name":"ChatGPT","model":""},
      {"id":"gemini","name":"Gemini","model":""},
      {"id":"perplexity","name":"Perplexity","model":""},
      {"id":"claude","name":"Claude","model":""}
    ],
    "competitors": [
      {"id":"{{id}}","name":"{{COMPETITOR NAME}}"}
    ],
    "queries": [
      {"id":"q01","text":"{{query text}}","category":"{{category}}"}
    ],
    "methodologyNote": "Manual, LLM-assisted capture. Metrics derived from response scoring (presence, position among tracked competitors, citations, explicit recommendation). Rank convention: rank-when-present (absent = null)."
  },
  "snapshots": [
    {"id":"{{YYYY-MM-DD}}","label":"{{Mon YYYY}}","method":"manual","results":[
      {"engine":"chatgpt","queryId":"q01","subjectPresent":true,"subjectRank":2,"subjectRecommended":false,"totalCitations":7,"competitorMentions":{"{{id}}":1},"excerpt":"verbatim quote of 200 characters or fewer"}
    ]}
  ]
}
```

**`meta.engines` lists the four API engines by default.** The example above matches the template: `chatgpt`, `gemini`, `perplexity`, `claude`. Google AI Overviews has no official API, so it is **not** in the default set. A user who intends to run the manual Google AI Overviews check (Phase 2) may **add** `{"id":"google_ai_overviews","name":"Google AI Overviews","model":""}` to `meta.engines` themselves. Only do this once the user is actually capturing AIO rows - adding it makes the dashboard expect AIO rows, and an engine in the list with no rows shows as "pending". Do not add it by default.

**Result row shape** (the keys the dashboard reads):

```js
{"engine":"chatgpt","queryId":"q01","subjectPresent":true,"subjectRank":2,"subjectRecommended":false,"totalCitations":7,"competitorMentions":{"{{competitorId}}":1},"excerpt":"verbatim quote of 200 characters or fewer"}
```

- `subjectPresent` (bool), `subjectRank` (int or null; `null` when absent), `subjectRecommended` (bool), `totalCitations` (int), `competitorMentions` (object keyed by competitor id).
- `excerpt` (**OPTIONAL**, string, 200 characters or fewer, **verbatim**). The dashboard ignores extra fields, so adding `excerpt` does not break it - but it preserves **auditability**: anyone can later see the exact answer a score came from. You may instead (or also) collect these excerpts in `aeo-state.md`. Do not make `excerpt` required.
- **Omit un-evaluated rows.** For any engine or query that was **not evaluated**, emit **no row at all**. Do not emit rows with `null` metric fields. The dashboard treats a missing engine as "pending" via its coverage note; a row with null/zero metrics would instead be counted as 0% visibility and corrupt the numbers.
- `meta.engines` should list the engines the agent is **tracking**. The default set is the four API engines (`chatgpt`, `gemini`, `perplexity`, `claude`). An engine in the list with **no rows** simply appears as **"pending"** in the dashboard's coverage note - that is expected and correct.
- Every engine you evaluated should have 10 rows. The one exception is `google_ai_overviews` **if the user has opted into the optional manual check** (see Phase 2 and the `meta.engines` note above): it has only as many rows as queries where an overview actually appeared.
- Partial coverage is normal and expected.

**Critical settings:**

- Set `dataStatus` to `"manual"` for a **real run** - one where you actually captured engine answers. (The value `"model"` triggers the SAMPLE badge and watermarks - do **not** use it for a real run.)
- **There is no separate "dry-run" status.** If you are producing a file only to test the structure (a dry run, with no real captured answers), do **not** present it as captured data. Say so plainly in `datasetLabel` (for example, "Structural test file - no answers captured") and in the snapshot `notes`, and tell the user it is a layout test only. Never let a dry run read as real results.
- Save `data.js` **next to `index.html`**, **overwriting the sample `data.js`** that ships with the dashboard. If a real run is saved correctly, the SAMPLE banner disappears.
- **Remove the template's illustrative snapshots - do not mix them with real data.** The template ships fabricated snapshots purely to demonstrate the layout and metrics. A fabricated point left on the same trend line as real data corrupts the series. When real data arrives, **remove** the demo snapshots rather than leaving them in place. The dashboard shows a **SAMPLE** badge while `dataStatus` is `"model"`; that badge disappearing is the signal that real data has replaced the demo.
- Keep `data.js` **ASCII-only**: straight quotes and hyphens, no smart quotes, no em-dashes.

**Dashboard download:**
`https://github.com/nigelianarmbuster-cmd/wfp-agent-aeo-guide/releases/latest/download/dashboard.zip`
**Repository:**
`https://github.com/nigelianarmbuster-cmd/wfp-agent-aeo-guide`

**How the template is obtained depends on mode:**

- **Mode A (you can run shell commands or write files):** obtain the template yourself - clone the repository above (which also gives you this instruction file) or download and extract the release zip into a working folder of the user's choosing. Do **not** ask the user to download it manually.
- **Mode B (chat only):** the user downloads the release zip and extracts it themselves, then saves your `data.js` next to the dashboard's `index.html`.

---

## Phase 5 - Review the agent's source materials

This phase **requires either web access (Mode A) or content the user pastes in (Mode B)**. You cannot review a page you can neither fetch nor see. If neither is available, say so and mark the review **"not evaluated"** - do not guess at what a page probably says.

Fetch what you can access and evaluate it against the 8 principles and the profile-consistency checklist below. The materials to review:

- Personal website (if any)
- wfp.com agent bio
- Google Business Profile
- Zillow profile
- LinkedIn profile
- Testimonials / reviews pages

**If a page blocks access**, do not scrape it. Ask the user to paste the relevant text or describe a screenshot instead, and mark the review of that surface **"Unverified - user-supplied"**.

### The 8 principles

1. **Be crawlable by the bots that feed answers.** Allow Googlebot, OAI-SearchBot, Claude-SearchBot, and PerplexityBot; check robots.txt and any web application firewall. *(Required for eligibility.)*
2. **Answer the question directly.** Use question-style headings and put a concise answer up top. *(Practice.)*
3. **Make your facts machine-readable.** Use schema.org `RealEstateAgent` / `Person` / `FAQPage` via JSON-LD. *(Helps; not required for AI features.)*
4. **Keep your entity facts consistent everywhere.** Name, title, brokerage, license, service areas, and phone must match across wfp.com bio, personal site, Google Business Profile, Zillow, and LinkedIn.
5. **Earn mentions, citations, and reviews** from other sources.
6. **Show first-hand expertise** - original neighborhood knowledge, market data, sold/listing history.
7. **Keep it fresh and accurate.**
8. **Measure and iterate** - run your query set on a schedule and track trends.

### Profile-consistency checklist

Check each fact below is stated the **same way** on every surface: name, title, brokerage, license number, service areas, phone, photo, and reviews.

| Surface | Name | Title | Brokerage | License | Areas | Phone | Photo | Reviews |
|---|---|---|---|---|---|---|---|---|
| wfp.com bio | | | | | | | | |
| Personal site | | | | | | | | |
| Google Business Profile | | | | | | | | |
| Zillow | | | | | | | | |
| Realtor.com | | | | | | | | |
| LinkedIn | | | | | | | | |

### Output

Produce a **prioritized 30 / 60 / 90-day action plan**: what to fix in the next 30 days (highest impact, lowest effort), 60 days, and 90 days. **No guarantees** - you cannot promise any ranking outcome. Label each recommendation as **official guidance** (grounded in the sources in the Appendix) or **common practice** (widely used but not formally documented).

---

## Phase 6 - Save state and set up the recurring run

Write or update a file named **`aeo-state.md`** next to `data.js`. It is the memory of every run and must contain:

- **Agent profile** - name, company, site, service areas.
- **Query set** - the fixed 10 queries (with any user changes noted).
- **Competitors** - the tracked list.
- **Snapshot history** - for each run: date plus headline metrics (Visibility, Average Rank, Citation Share, Recommendation Rate, Share of Voice).
- **Sources reviewed** - which surfaces were checked and which were unverified.
- **Open action items** - from the 30/60/90-day plan, with status.
- **Verbatim excerpts (optional)** - if you collected answer excerpts here instead of (or in addition to) the `excerpt` field in `data.js`, keep them tagged by engine and query id so they remain auditable.
- **Snapshot history starts clean.** The template's illustrative snapshots exist only to show the layout. Once real data is saved, the demo snapshots must be **removed**, not kept alongside real ones - a fabricated point on the same trend line corrupts the series. The dashboard's **SAMPLE** badge (shown while `dataStatus` is `"model"`) disappearing is the signal that real data has replaced the demo.

### The recurring run prompt

Give the user the prompt below. It works for either cadence - say "weekly" or "monthly" (whichever they chose) in the first line. Reusing it (in a saved prompt, a custom command, or pasted at the start of a new chat) reproduces the same run on the chosen schedule.

```
Run my weekly AEO check.
1. Read the current aeo-state.md and data.js in this folder.
2. Using my existing query set and competitor list, run each query on every
   answer engine I can access, capturing answers verbatim (<=200 characters).
3. If I opted into the manual Google AI Overviews check, do it; mark "not shown"
   where absent. Otherwise skip this step.
4. Score the results per the rubric.
5. Append a new snapshot to data.js (dataStatus: "manual") and overwrite the file.
6. Update aeo-state.md with the new snapshot row and refreshed action items.
Do not invent any answer I did not provide or that you did not receive.
```

If the user chose a **monthly** cadence, change the first line to "Run my monthly AEO check." Keep the rest of the block unchanged.

Tell the user how to reuse it: save it as a reusable prompt or custom command in whichever assistant they use, and re-attach both `aeo-state.md` and `data.js` at the start of each run so the assistant has continuity.

---

## Appendix

### A. Dashboard metric definitions

| Metric | Meaning |
|---|---|
| **Visibility** | Share of evaluated answers where the agent is present. |
| **Average Rank** | Mean rank across answers where the agent is present (`null` excluded). |
| **Citation Share** | The agent's share of citations relative to tracked competitors. |
| **Recommendation Rate** | Share of answers where the agent is explicitly recommended. |
| **Share of Voice** | The agent's mentions as a share of all tracked mentions. |
| **Presence** (raw) | 1 if named in the answer, else 0. |
| **Rank** (raw) | Position among tracked competitors named in the answer (1 = first); `null` if absent. |

### B. The query table

Fill placeholders from Phase 1 (`{Full Name}`, `{Company}`, `{Service Area}`, `{Neighborhood}`, `{Competitor 1}`). Keep the structure and categories stable across runs. The DC column is an illustration only.

| id | Query (template) | Category | DC example |
|---|---|---|---|
| q01 | Who is `{Full Name}`? | profile | Who is Alexandra Rivera? |
| q02 | Best real estate agent in `{Neighborhood}` | ranking | Best real estate agent in Georgetown DC |
| q03 | Top luxury real estate agents in `{Service Area}` | ranking | Top luxury real estate agents in Washington DC |
| q04 | `{Full Name}` vs `{Competitor 1}` | comparison | Alexandra Rivera vs Dana Okonkwo |
| q05 | Top real estate agents in `{Service Area}` | ranking | Top real estate agents in Northwest Washington DC |
| q06 | `{Full Name}` real estate reviews | reputation | Alexandra Rivera real estate reviews |
| q07 | Best real estate agent in `{Service Area}` for luxury homes | ranking | Best real estate agent in DC for luxury homes |
| q08 | Who is the top selling agent in `{Neighborhood}`? | ranking | Who is the top selling agent in Georgetown? |
| q09 | `{Service Area}` luxury real estate agent rankings | ranking | Washington DC luxury real estate agent rankings |
| q10 | `{Full Name}` `{Company}` profile | profile | Alexandra Rivera Washington Fine Properties profile |

### C. Source links

Use only these. Label **official guidance** vs **common practice** where relevant. Where a source is a product or help doc rather than site-owner guidance, say so.

1. **Google Search Central - AI features and your website** - https://developers.google.com/search/docs/appearance/ai-overviews
   No additional requirements to appear in AI Overviews / AI Mode; standard SEO and technical eligibility govern; no special files or schema needed.
2. **Google Search Central - Optimizing your website for generative AI features on Google Search** - https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
   SEO remains the foundation; explains retrieval-augmented generation (RAG) and query fan-out; states AEO/GEO is still SEO; no special schema markup required.
3. **Google Search Central - Creating helpful, reliable, people-first content** - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
   E-E-A-T framing (trust most important), YMYL, who/how/why; automation to manipulate rankings violates spam policies.
4. **Google Search Central - Introduction to structured data markup in Google Search** - https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
   Structured data (JSON-LD recommended) helps search engines understand page content and enables rich results.
5. **Google Search Central Blog - Top ways to ensure your content performs well in Google's AI experiences on Search (May 2025)** - https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
6. **OpenAI - Overview of OpenAI Crawlers** - https://platform.openai.com/docs/gptbot
   OAI-SearchBot surfaces sites in ChatGPT search; GPTBot is training; controls are independent robots.txt rules.
7. **OpenAI Help Center - Searching the web with ChatGPT** - https://help.openai.com/en/articles/9237897-chatgpt-search
   To be eligible for ChatGPT search, allow OAI-SearchBot.
8. **Anthropic - Does Anthropic crawl data from the web, and how can site owners block the crawler?** - https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
   ClaudeBot (training), Claude-User (user-initiated), Claude-SearchBot (search indexing); disabling the search bot may reduce visibility.
9. **Perplexity - Perplexity Crawlers** - https://docs.perplexity.ai/guides/bots
   PerplexityBot surfaces / links sites in Perplexity results; Perplexity-User is user-initiated and generally ignores robots.txt.
10. **Schema.org - RealEstateAgent** - https://schema.org/RealEstateAgent
    A subtype of LocalBusiness / Organization; lists relevant properties (address, telephone, areaServed, sameAs, etc.).

### D. Note on results

All results in this workflow are **manual and LLM-assisted**. They are **directional**, not precise measurement. Answers vary by engine, model version, user, location, and day. Ten queries is a smoke test, not a measurement - track trends across snapshots and do not over-read a single result. **No one can guarantee a specific answer or ranking outcome.**

### E. Notes for tool builders

This section is for whoever writes the runner and validator that produce and check `data.js`. It is not for the end user.

- **Use ONE alias regex for the subject.** If presence, rank, recommendation, and excerpt each use a different name pattern they will disagree, and a validator that enforces agreement will reject rows. A multi-name subject (for example a team known both by a principal's name and by a team brand) needs every form in **one** regex used by **every** scoring path.
- **The validator's invariant is "a rank requires presence", not "presence requires a rank".** A subject can legitimately be present with a `null` rank when presence comes from a **cited domain** rather than a text mention. Keep the dangerous direction rejected: **absent-but-ranked** and **absent-but-recommended** must stay invalid.
- **Chunked runs need merge-on-write.** A full run across four engines can exceed a per-invocation shell timeout, so runs get chunked per engine or per query group. If the runner overwrites its output file, each chunk destroys the previous one. Instead, **merge records keyed by `(engine, queryId)`**; **scope the merge to the run date** so a new run cannot clobber an old one; and **print a coverage line** (N of engines x queries, with a complete/incomplete verdict) so the operator can gate on completeness.
- **Google AI Overviews is not API-queryable.** It is a Search SERP feature with no official API. A template that declares it as a fifth engine creates a permanent, uncloseable "missing engine" state. Either track the four API engines, or treat AI Overviews as an explicit **optional manual addition** the user enables themselves.

---

*Sources cited in this document follow official Google, OpenAI, Anthropic, Perplexity, and Schema.org guidance. Results from running this workflow are illustrative and directional only.*
