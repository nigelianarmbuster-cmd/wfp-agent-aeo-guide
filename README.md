# WFP AEO Guide

A beginner's guide to Answer Engine Optimization (AEO) for Washington Fine Properties (WFP) agents. It explains, in plain language, what AEO is, how AI answer engines such as ChatGPT, Gemini, Perplexity, Claude, and Google AI Overviews decide who to name, cite, or recommend, and how to measure whether you appear in those answers today. The guide is published as a static site via GitHub Pages and includes a step-by-step setup guide, a fictional sample dashboard, and an LLM-agnostic setup document you can hand to your AI assistant to build your own dashboard.

## Start here

- Main guide: https://nigelianarmbuster-cmd.github.io/wfp-aeo-guide/
- Setup guide: https://nigelianarmbuster-cmd.github.io/wfp-aeo-guide/setup.html
- Sample dashboard: https://nigelianarmbuster-cmd.github.io/wfp-aeo-guide/dashboard/
- State doc (raw): https://raw.githubusercontent.com/nigelianarmbuster-cmd/wfp-aeo-guide/main/AGENT-AEO-SETUP.md
- Download the dashboard template: https://github.com/nigelianarmbuster-cmd/wfp-aeo-guide/releases/latest/download/dashboard.zip

## How the agent workflow works

Download the dashboard template and unzip it somewhere you can find it, then hand the state doc to your AI assistant and ask it to follow the document to build your dashboard. The assistant collects a short intake, runs the query set across the answer engines you can access, and produces a `data.js` file. Save that file next to `index.html`, overwriting the sample, and open `index.html` in your browser. Re-run the process monthly so you can track trends across snapshots rather than reading a single result.

## What's in the repo

| Item | Description |
|---|---|
| `index.html` | The main guide. Self-contained content that links the shared stylesheet in `assets/`. |
| `setup.html` | The "Set up your own dashboard" how-to, from download through the recurring monthly run. |
| `dashboard/` | The sample dashboard: `index.html` (a parameterized clone), `data.js` (fictional sample dataset), plus vendored `assets/` and local `fonts/` so it works offline. |
| `AGENT-AEO-SETUP.md` | The state doc. LLM-agnostic instructions your AI assistant follows to run the process and generate your own `data.js`. |
| `assets/` | Shared brand design system for the two guide pages: `guide.css` and `WFP-Logo-Blue-HiRes.png`. |
| `fonts/` | The five WFP brand fonts (Chiswick Headline Light/Semibold, Gotham HTF Book/Medium/Bold). |

## Version and changelog

- v1.0.0 - 2026-09-10 - Initial release.

## Notice

© Washington Fine Properties. Provided for WFP agent use. The sample dashboard contains fictional data for illustration only.

The state doc and dashboard are provided as-is. Results are directional, reflect a manual and LLM-assisted capture, and no ranking outcome is guaranteed.

## License and usage

All rights reserved. Contact WFP marketing for reuse or distribution.
