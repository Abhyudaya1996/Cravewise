# CraveWise Milestone Tracker

| Milestone | Status | Evidence | Last Updated |
|---|---|---|---|
| PRD complete | DONE | `PRD.md` v1.2 | 2026-05-12 |
| Sample data requirements added | DONE | `DUMMY_DATA.md` | 2026-05-12 |
| Static prototype complete | REVIEW | `apps/cravewise`; polished mobile UI, persona selection, Weekday Rush, build and typecheck pass | 2026-05-12 |
| Static local logic complete | REVIEW | `apps/cravewise/data/sampleData.ts`; craving interpretation, scoring, feedback classification, insights | 2026-05-12 |
| Local feedback memory complete | DONE | `apps/cravewise/app/page.tsx`; browser-only `localStorage` memory under `cravewise.localFeedbackMemory.v1`, Insights local demo memory panel, clear action | 2026-05-13 |
| Static logic tightening complete | DONE | Explicit dish/cuisine intent now outranks persona defaults; non-cheese-heavy pizza regression covered in `evals/cravewise/sample_cases.json` | 2026-05-13 |
| Integrity cleanup complete | DONE | Qualitative confidence labels, typed fallback objects, active-persona fallback checks, blocking fallback hero suppression, distinct backups | 2026-05-13 |
| Project state handoff created | DONE | `CRAVEWISE_PROJECT_STATE.md`; primary Claude/Codex handoff and review entrypoint | 2026-05-13 |
| Local feedback-influenced scoring complete | DONE | Normalized failure reason codes including `would_not_reorder` and `not_fresh`, browser-local feedback scoring adjustments, memory influence UI note, clear-memory reset behavior | 2026-05-13 |
| Catalog expansion complete | DONE | Dummy menu catalog expanded from 9 to 30 items across persona scenarios; Abhyudaya oily-memory case can now change the primary recommendation | 2026-05-13 |
| Dynamic local insights complete | DONE | Insights keep static persona cards and add active-persona browser-local pattern summaries derived from normalized feedback reasons and reorder intent | 2026-05-14 |
| Local dish taxonomy and signal cleanup complete | DONE | Added local taxonomy types, normalized catalog fields, and structured interpretation signals for dish, cuisine, context, preference, negative constraints, and budget | 2026-05-14 |
| Taxonomy QA, static eval harness, and score explainability complete | DONE | Removed taxonomy leakage, standardized `avoid_*` constraints, added internal score breakdowns, and added `node evals/cravewise/run_static_evals.js` with 8 passing machine checks | 2026-05-14 |
| Claude review packet 4E complete | DONE | `projects/01-cravewise/docs/CLAUDE_REVIEW_PACKET_4E.md`; reviewer entrypoint after Milestone 4E with thesis, constraints, architecture, evals, regressions, and review questions | 2026-05-14 |
| Pre-AI guardrail cleanup complete | DONE | Claude 4E review suggestions applied: `heavy_meal`, hard-filter-only negative constraints, stronger too-oily memory eval, and comments for scoring principles / sleepy-to-heavy mapping | 2026-05-14 |
| AI structured craving interpretation | REVIEW | Optional server-side `app/api/interpret-craving` route, strict structured output schema, taxonomy validation, static fallback metadata, small UI status copy, and offline malformed-output validation checks | 2026-05-14 |
| AI vs static interpretation comparison | REVIEW | Internal comparison helper, deterministic static-vs-AI top-result comparison, small debug panel, and offline mock comparison checks | 2026-05-14 |
| AI evaluation pack and case study evidence | REVIEW | `AI_EVALUATION_PACK_5C.md` and `CASE_STUDY_OUTLINE.md`; live-key evidence template, AI scope boundaries, product tradeoffs, and case study outline | 2026-05-14 |
| Live-key AI evidence pass | REVIEW | Curated cases A-H exercised with server-side key loaded; all cases fell back through timeout/API-error guardrails and deterministic static scoring continued to work | 2026-05-15 |
| Live AI route diagnosis | REVIEW | Env file corrected to `apps/cravewise/.env.local`, safe route diagnostics added, no-key fallback retested, and minimal OpenAI diagnostic returned `insufficient_quota` | 2026-05-15 |
| Gemini alternate provider | REVIEW | `AI_PROVIDER=openai | gemini`, Gemini server-side route path, shared validation, safe diagnostics, and partial Gemini live evidence across curated cases | 2026-05-15 |
| Combined Gemini live evidence | REVIEW | Missing cases rerun: G/H accepted, F invalid-output fallback retained, full rerun hit Gemini HTTP 429 limits; no accepted Gemini case changed deterministic top result | 2026-05-15 |
| Feedback/scoring loop complete | DONE | local persistence and local feedback-influenced scoring complete; still browser-only and deterministic | 2026-05-13 |
| Evals complete | REVIEW | `evals/cravewise/STATIC_LOGIC_EVAL_SPEC.md`, `evals/cravewise/STATIC_LOGIC_EVAL_REPORT.md`, expanded `evals/cravewise/sample_cases.json` | 2026-05-13 |
| Case study draft complete | REVIEW | `projects/01-cravewise/docs/CASE_STUDY_DRAFT.md`; polished portfolio narrative from combined Milestone 5D-C evidence | 2026-05-15 |
| Deployed demo | TODO | URL | - |

## Current Note

The CraveWise case study draft now turns the combined Milestone 5D-C evidence into a portfolio-ready narrative. It frames AI as useful but bounded, documents OpenAI quota fallback and Gemini partial evidence, includes Case G AI-noise learning, and preserves the conclusion that deterministic scoring remains final recommendation authority. Static evals remain offline. No backend database, MCP, auth, live restaurant data, ordering, payments, medical/nutrition advice, cross-device memory, or delivery tracking were added.
