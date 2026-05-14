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
| Feedback/scoring loop complete | DONE | local persistence and local feedback-influenced scoring complete; still browser-only and deterministic | 2026-05-13 |
| Evals complete | REVIEW | `evals/cravewise/STATIC_LOGIC_EVAL_SPEC.md`, `evals/cravewise/STATIC_LOGIC_EVAL_REPORT.md`, expanded `evals/cravewise/sample_cases.json` | 2026-05-13 |
| Case study complete | TODO | case-studies file | - |
| Deployed demo | TODO | URL | - |

## Current Note

Milestone 5A adds AI only as optional server-side structured craving interpretation. The API route keeps `OPENAI_API_KEY` server-side, defaults `OPENAI_MODEL` to `gpt-4.1-mini`, uses a 5-second timeout, validates output against the local taxonomy, and falls back to `interpretCravingStatic()` when AI is missing, invalid, slow, or unavailable. Deterministic scoring still chooses the final recommendation. No backend database, MCP, auth, live restaurant data, ordering, payments, medical/nutrition advice, cross-device memory, or delivery tracking were added.
