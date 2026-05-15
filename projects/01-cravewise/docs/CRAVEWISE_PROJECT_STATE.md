# CraveWise Project State

Last updated: 2026-05-15
Current milestone: CraveWise case study draft
Current status: Static prototype, local feedback memory, Simran pizza regression fix, integrity cleanup, browser-only feedback-influenced scoring, feedback reason normalization patch, 30-item dummy catalog expansion, dynamic local insight summaries, local dish taxonomy cleanup, taxonomy QA, score explainability, lightweight static eval harness, Claude review packet, pre-AI guardrail cleanup, optional AI structured craving interpretation, AI-vs-static interpretation comparison, AI evaluation evidence scaffolding, live-key fallback evidence, live route diagnosis, Gemini alternate-provider support, combined live Gemini evidence, and a polished case study draft are implemented.

---

## 1. Product Thesis

CraveWise is a mobile-first food decision assistant.

It is designed for users who do not need another food browsing app. They need one trusted, taste-aware recommendation based on their current craving, budget, context, past satisfaction, and regret patterns.

CraveWise gives one primary recommendation, with optional backups only when the user asks. It is not a delivery marketplace, not a restaurant feed, and not an ordering product.

The current implementation uses deterministic scoring and optional server-side AI only for structured craving-signal extraction. It does not use backend databases, live restaurant data, real availability, ordering, or delivery tracking.

---

## 2. Current Build Status

Completed milestones:

- Static prototype
- Local feedback memory
- Simran pizza regression fix
- Integrity cleanup
- Local feedback-influenced scoring
- Feedback reason normalization patch
- Catalog expansion
- Dynamic local insights
- Local dish taxonomy and signal cleanup
- Taxonomy QA, static eval harness, and score explainability
- Claude review packet 4E
- Pre-AI guardrail cleanup
- AI structured craving interpretation
- AI vs static interpretation comparison
- AI evaluation pack and case study outline
- Live-key fallback evidence pass
- Live AI route diagnosis
- Gemini alternate provider for live evidence
- Combined Gemini live evidence collection
- Portfolio case study draft

Current working features:

- Static mobile-first Next.js prototype
- Full clickable app flow
- Six demo personas
- Taste profile preview
- Craving input with budget, occasion, heaviness, exploration, and Weekday Rush controls
- Local/static recommendation scoring
- Local dish taxonomy with structured craving signals
- Internal score breakdowns for recommendation QA
- Primary recommendation plus optional backups
- Typed fallback states
- Qualitative confidence labels
- Feedback classification
- Browser-only local feedback memory
- Browser-only local feedback-influenced scoring
- Expanded 30-item dummy catalog across pizza/Italian, Mexican, North Indian, Asian/Chinese, South Indian, healthy/light, fried/oily regret, group-safe, and Weekday Rush scenarios
- Local demo memory display in Insights
- Dynamic local insight summaries derived from browser-only saved feedback for the active persona
- Clear local demo memory action
- Lightweight eval documentation
- Claude review packet for Milestone 4E
- Optional server-side AI interpretation route for structured craving signals
- Local taxonomy validation for AI output
- Static fallback when AI is unavailable, invalid, slow, or unconfigured
- Internal static-vs-AI interpretation comparison for QA
- Manual AI evaluation evidence pack
- Live-key fallback evidence recorded in the evaluation pack
- Safe live route diagnostics for fallback investigation
- Provider selection with OpenAI or Gemini
- Portfolio case study outline
- Portfolio case study draft from combined AI evidence

Not yet built:

- backend
- database
- MCP
- Supabase
- auth
- Swiggy/Zomato integration
- live restaurant data
- real-time availability
- ordering/payment
- delivery tracking
- cross-device memory
- medical/nutrition advice

Current limitation:

Feedback now influences future static scoring locally and also creates local demo insight summaries. Static craving interpretation remains the fallback. Optional AI can now fill the same structured interpretation fields, but deterministic local scoring still chooses the recommendation. Selected taxonomy regressions and malformed AI-output validation checks run through the local eval harness.

Milestone 4F resolved Claude's required pre-AI cleanup items: heavy catalog items use `heavy_meal`, negative constraints are hard returned-recommendation boundaries instead of double-penalized, and the too-oily memory eval proves the new top avoids oily/fried flags.

Milestone 5A adds AI only at the signal extraction boundary: user craving -> server route -> validated `CravingInterpretation` -> deterministic scoring. AI cannot output item IDs, restaurant names, scores, recommendations, rankings, or backups.

Milestone 5B adds a comparison layer for QA: static interpretation and AI interpretation can be scored separately by deterministic scoring to compare changed signals and top recommendation differences. This does not let AI choose the final recommendation.

Milestone 5C adds an evidence pack and case study outline.

Milestone 5D runs the curated live-key pass with `OPENAI_API_KEY` loaded server-side from the app environment file. The route was exercised, but no accepted AI interpretations were returned: cases A-G timed out under the 5-second guardrail and case H returned API-error fallback. The app still produced deterministic recommendations through local static interpretation and scoring, so this is fallback evidence rather than evidence that AI improved interpretation quality.

Milestone 5D-A diagnoses the live route. The env file was corrected to `apps/cravewise/.env.local`, the obsolete `.env.local.txt` path is ignored and removed locally, and safe diagnostics were added to the route. A minimal structured-output OpenAI call returned HTTP 429 with `insufficient_quota`, which explains the API-error result and why slower cases can appear as timeouts before the upstream quota error arrives.

Milestone 5D-B adds Gemini as an alternate provider for live evidence collection without changing the architecture. `AI_PROVIDER=openai | gemini` selects the provider, `GEMINI_MODEL` defaults to `gemini-2.5-flash`, and Gemini output is validated through the same local `CravingInterpretation` validator before deterministic scoring. A Gemini live pass produced accepted interpretations for several curated cases but still hit timeout / HTTP 429 provider limits before completing all 8 cases.

Milestone 5D-C reruns the missing Gemini cases and records combined evidence with explicit run-source annotations. Cases G and H returned accepted Gemini interpretations, while F still fell back due to invalid output JSON. Case G is confirmed AI noise: Gemini treated nonsense as high-confidence exploratory intent instead of setting `needs_clarification: true`. A clean all-8 rerun was attempted but hit Gemini HTTP 429 from case D onward, so the evaluation pack contains combined evidence across runs rather than a single uninterrupted 8-case pass. No recommendation changed in accepted Gemini cases.

The case study draft turns the combined 5D-C evidence into a portfolio narrative. It covers the problem, one-recommendation thesis, static MVP, local feedback memory, taxonomy and deterministic scoring, bounded AI interpretation, OpenAI quota-blocked fallback evidence, Gemini partial evidence, Case G AI-noise learning, and next steps. The draft frames AI as useful but bounded, not broadly better than static rules, and preserves the takeaway: "Deterministic scoring is necessary because AI can degrade signal quality."

---

## 3. Current App Flow

1. Home
2. Persona Selection
3. Taste Profile Preview
4. Craving Input
5. Recommendation
6. Backup Options
7. Feedback
8. Insights

---

## 4. Key Product Decisions

| Decision | Reason | Tradeoff |
|---|---|---|
| One recommendation, not a list | The core thesis is that users want help deciding, not another browsing feed. | A wrong primary pick is more costly, so reasoning, fallback states, and backups matter. |
| Backups are secondary | Optional backups preserve control without turning CraveWise into a restaurant grid. | Some users may want more exploration earlier. |
| Explicit craving beats persona defaults | The user's current stated intent should override historical comfort defaults. | Persona history becomes a secondary ranking signal when the user gives clear dish/cuisine intent. |
| Feedback is local demo memory only | The prototype can show a learning loop without backend or account complexity. | Feedback does not survive across browsers/devices and scoring influence is local-only. |
| No fake confidence | Heuristic scores are not calibrated probabilities, so the UI uses qualitative labels. | Less flashy than percentages, but more trustworthy. |
| No live availability claims | The prototype uses dummy data only and should not imply real supply-side coverage. | The recommendation may not be orderable in the real world. |
| No medical/nutrition advice | Food preference and heaviness are allowed; health claims are out of scope. | Health-aware users get preference framing, not nutrition guidance. |
| AI only extracts structured signals | The product should remain explainable and deterministic while improving messy craving parsing. | AI can improve interpretation but cannot choose the final meal. |

---

## 5. Technical Architecture

CraveWise is currently a Next.js app with one optional server-side API route for AI structured interpretation.

Architecture summary:

- App framework: Next.js App Router
- UI: React components in `apps/cravewise/app/page.tsx`
- Styling: plain CSS in `apps/cravewise/app/globals.css`
- Data and static logic: `apps/cravewise/data/sampleData.ts`
- Local taxonomy: `apps/cravewise/data/dishTaxonomy.ts`
- AI validation: `apps/cravewise/data/cravingInterpretationValidation.ts`
- AI/static comparison: `apps/cravewise/data/interpretationComparison.ts`
- Optional AI route: `apps/cravewise/app/api/interpret-craving/route.ts`
- Persistence: browser `localStorage`
- Current catalog size: 30 menu items
- Target before AI: met for current prototype, with 25-30 dummy menu items
- Long-term PRD target: 20 restaurants and 60 dishes
- Backend/API/database: no database; one server route for optional OpenAI interpretation only
- AI/MCP/live integrations: optional OpenAI interpretation only; no MCP or live restaurant integrations

Milestone 4B catalog coverage:

- 4 pizza/Italian items, including light-cheese pizza, cheese-heavy pizza, and pasta fallback
- 3 Mexican/burrito items with distinct ETA/reliability profiles
- 8 North Indian items
- 7 Asian/Chinese items
- 2 South Indian items
- 7 healthy/light options
- 4 fried/oily regret-prone options
- 5 group-safe/group-order options
- 14 Weekday Rush-friendly or weekday-lunch-fit options

Important files:

- `apps/cravewise/app/page.tsx`
- `apps/cravewise/data/sampleData.ts`
- `apps/cravewise/data/dishTaxonomy.ts`
- `apps/cravewise/data/cravingInterpretationValidation.ts`
- `apps/cravewise/data/interpretationComparison.ts`
- `apps/cravewise/app/api/interpret-craving/route.ts`
- `apps/cravewise/app/globals.css`
- `apps/cravewise/README.md`
- `projects/01-cravewise/docs/PRD.md`
- `projects/01-cravewise/docs/CLAUDE_REVIEW_PACKET_4E.md`
- `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`
- `projects/01-cravewise/docs/CASE_STUDY_OUTLINE.md`
- `projects/01-cravewise/docs/CASE_STUDY_DRAFT.md`
- `projects/01-cravewise/docs/MILESTONE_TRACKER.md`
- `evals/cravewise/README.md`
- `evals/cravewise/sample_cases.json`
- `evals/cravewise/run_static_evals.js`
- `.ai/memory/session-handoff-current.md`
- `learning-log/LEARNING_LOG.md`

Important static logic functions:

- `interpretCravingStatic()`
- `scoreRecommendationStatic()`
- `classifyFeedbackStatic()`
- `getPersonaInsightsStatic()`
- `getFallbackState()`
- `run_static_evals.js`

Milestone 4D taxonomy fields:

- `explicitDishIntents`
- `cuisineIntents`
- `contextSignals`
- `preferenceSignals`
- `negativeConstraints`
- `budgetSignal`
- catalog `dishType`, `preferenceTags`, `contextFit`, `regretRiskFlags`, `reliabilityTags`, `avoidIf`, `budgetTier`, and `priceComfortBand`

Milestone 4E QA additions:

- negative constraints standardized on `avoid_*`
- `not_oily` removed from positive preference signals
- `scoreBreakdown` added to recommendations
- `node evals/cravewise/run_static_evals.js` validates selected machine-readable cases

Milestone 4F guardrail cleanup:

- `heavy_late_night` corrected to `heavy_meal`
- negative constraints remain hard filters
- dead `-90` negative constraint score penalty removed
- too-oily memory eval checks the new top avoids `avoid_oily` and `fried_oily`
- comments document scoring weight principles and why `sleepy` maps to `avoid_heavy`

Milestone 5A AI interpretation:

- `OPENAI_API_KEY` is optional and must stay server-side
- `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`
- `AI_PROVIDER` selects `openai` or `gemini`
- `GEMINI_API_KEY` is optional and must stay server-side
- `GEMINI_MODEL` is optional and defaults to `gemini-2.5-flash`
- route timeout is 5 seconds
- fallback diagnostics expose only safe metadata: key configured true/false, model, duration, fallback reason, HTTP status, and OpenAI error type/code when available
- route returns `ai_interpreted` only after schema and taxonomy validation
- fallback reasons include `missing_api_key`, `api_error`, `timeout`, `invalid_schema`, `invalid_enum`, `missing_required_field`, `low_quality_output`, and `unsafe_recommendation_field`
- static eval runner remains offline and includes mocked AI-output validation checks

Milestone 5B comparison:

- compares `explicitDishIntents`, `cuisineIntents`, `contextSignals`, `preferenceSignals`, `negativeConstraints`, `budgetSignal`, `heaviness`, `exploration_intent`, `confidence`, and `needs_clarification`
- reports `changedFields`, `addedByAI`, `missedByAI`, `matchedFields`, recommendation change status, static top, deterministic top from AI-interpreted signals, and notes
- adds a small collapsible recommendation-screen debug panel
- static eval runner remains offline and includes mocked comparison checks

Milestone 5C evidence:

- curated manual cases for AI vs static interpretation
- explicit AI allowed/not-allowed scope
- AI product tradeoffs
- manual evidence table for live-key runs
- case study outline for portfolio storytelling
- no live AI results claimed without evidence

Milestone 5D evidence:

- `OPENAI_API_KEY` was available through the app env file and stayed server-side
- curated cases A-H were exercised through the live route
- all cases fell back to static interpretation due to timeout or API error
- deterministic scoring continued to own every recommendation
- no claim is made that AI improved results in this pass

Milestone 5D-A diagnosis:

- Next local env path is now `apps/cravewise/.env.local`
- `.env.local`, `.env*.local`, app env files, live evidence scratch JSON, and dev-server logs are ignored
- minimal live OpenAI call returned `insufficient_quota`
- missing-key route path was retested and returned `missing_api_key`
- the product timeout remains 5 seconds

Milestone 5D-B Gemini evidence:

- Gemini route smoke test returned a validated `ai_interpreted` result for `spicy but not oily`
- current-code evidence pass accepted A-E and fell back for F-H due to timeout / Gemini HTTP 429 provider limits
- deterministic scoring kept final recommendation authority in every case
- static evals remain offline and provider-free

Milestone 5D-C Gemini evidence:

- missing cases F-H were rerun first
- F still fell back with invalid Gemini output JSON
- G returned an accepted interpretation but added confirmed AI noise by treating nonsense as high-confidence exploratory intent
- H returned an accepted interpretation and extracted budget correctly, but missed static `avoid_expensive`
- a later full all-8 rerun hit Gemini HTTP 429 provider limits from D onward
- no accepted Gemini case changed the deterministic top recommendation
- evidence rows now include run-source annotations

Case study draft:

- `CASE_STUDY_DRAFT.md` converts the evidence into a portfolio-ready narrative
- covers problem, product thesis, one-recommendation wedge, static MVP, local feedback memory, taxonomy, deterministic scoring, bounded AI, OpenAI fallback, Gemini partial evidence, and Case G noise
- does not claim AI is broadly better than static rules
- preserves deterministic scoring as final recommendation authority

---

## 6. Local Feedback Memory

localStorage key:

```text
cravewise.localFeedbackMemory.v1
```

What gets saved:

- feedback id
- persona id and name
- decision context
- selected recommendation
- feedback sentiment
- selected reason chips
- optional custom feedback note
- static feedback classification
- timestamp

What dynamic local insights use:

- normalized failure reason codes
- reorder intent
- active persona feedback only
- local browser records under `cravewise.localFeedbackMemory.v1`

What does not get saved:

- skipped feedback
- account data
- real order data
- real restaurant availability
- cross-device state
- backend state
- AI memory

Clear memory behavior:

- The Insights screen includes `Clear local demo memory`.
- It clears only the CraveWise local feedback key.
- It does not affect any other browser storage.

Current limitation:

Feedback-influenced scoring and dynamic insight summaries are implemented locally, but they are rule-based and only use memory saved in the current browser.

Milestone 4A acceptance criteria:

- saved local feedback is passed into scoring
- feedback reason labels are normalized into stable internal codes, including legacy display labels
- `too_oily` feedback penalizes oily/fried items in similar contexts
- `too_heavy` feedback penalizes heavy options in late-night, weekday rush, or meeting contexts
- `too_expensive` feedback affects price sensitivity
- `wrong_craving_match` strengthens explicit dish/cuisine intent
- `delivery_issue` and `reliability_issue` affect Weekday Rush recommendations
- `would_reorder` boosts similar future options
- `would_not_reorder` modestly penalizes the same dish or restaurant
- `not_fresh` modestly penalizes the same restaurant and reliability-sensitive contexts
- UI shows an honest local demo memory influence note
- clearing local memory removes feedback influence
- no AI/backend/database/MCP/live integration added

---

## 7. Milestone History

| Milestone | What changed | Product decision | Files touched | Status |
|---|---|---|---|---|
| Static prototype | Built mobile-first clickable flow with personas, taste profile, craving input, recommendation, backups, feedback, and insights. | Prove the one-recommendation decision experience before AI or integrations. | `apps/cravewise/app/page.tsx`, `apps/cravewise/data/sampleData.ts`, `apps/cravewise/app/globals.css`, docs/memory files | Complete / Review |
| Local feedback memory | Saved submitted feedback to browser `localStorage`, skipped feedback is not saved, local demo memory appears in Insights, clear memory action added. | Make the learning loop visible while staying local-only. | `apps/cravewise/app/page.tsx`, `apps/cravewise/app/globals.css`, `apps/cravewise/README.md`, `.ai/memory/features/cravewise-local-feedback-memory.md` | Complete |
| Simran pizza regression fix | Fixed case where `pizza but not cheese overloaded` returned Dal Makhani. Added Thin Crust Veggie Pizza and explicit-intent scoring priority. | Current explicit craving must beat persona defaults. | `apps/cravewise/data/sampleData.ts`, `apps/cravewise/app/page.tsx`, `evals/cravewise/sample_cases.json`, memory/docs | Complete |
| Integrity cleanup | Removed fake match percentage clamp, added qualitative confidence labels, typed fallback states, active-persona fallback logic, blocking fallback hero suppression, distinct backups, renamed persona insight function, corrected local memory copy. | Trust and honesty matter before expanding catalog or adding AI. | `apps/cravewise/data/sampleData.ts`, `apps/cravewise/app/page.tsx`, `apps/cravewise/app/globals.css`, evals/docs/memory files | Complete |
| Local feedback-influenced scoring | Normalized feedback reasons into internal codes and passed browser-local feedback memory into static scoring. Added local memory influence notes. Patch covered `would_not_reorder` and `not_fresh` chips so selected chips are not silently dropped. | The prototype can now demonstrate feedback changing future recommendations without backend or AI. | `apps/cravewise/data/sampleData.ts`, `apps/cravewise/app/page.tsx`, `apps/cravewise/app/globals.css`, evals/docs/memory files | Complete |
| Catalog expansion | Expanded dummy menu catalog from 9 to 30 items across core persona scenarios. Added enough alternative items for local feedback penalties to visibly change ranking behavior. | A memory-aware scoring demo needs enough local supply to choose a better alternative after a penalty. | `apps/cravewise/data/sampleData.ts`, evals/docs/memory files | Complete |
| Dynamic local insights | Kept static persona insights and added active-persona local demo pattern summaries derived from saved browser feedback. | Insights should reflect local demo feedback without claiming AI, backend persistence, or cross-device personalization. | `apps/cravewise/app/page.tsx`, `apps/cravewise/app/globals.css`, evals/docs/memory files | Complete |
| Local dish taxonomy and signal cleanup | Added a local taxonomy file, derived normalized catalog fields, and refactored static interpretation/scoring to use structured dish, cuisine, context, preference, constraint, and budget signals. | Clean up local signal contracts before AI interpretation so AI can later fill structured fields instead of inheriting mixed craving/context flags. | `apps/cravewise/data/dishTaxonomy.ts`, `apps/cravewise/data/sampleData.ts`, `apps/cravewise/app/page.tsx`, evals/docs/memory files | Complete |
| Taxonomy QA and eval harness | Audited taxonomy boundaries, removed `not_oily` preference leakage, added internal score breakdowns, and added a local static eval runner. | Build confidence in deterministic scoring before AI by making regressions machine-checkable and score components inspectable. | `apps/cravewise/data/dishTaxonomy.ts`, `apps/cravewise/data/sampleData.ts`, `evals/cravewise/run_static_evals.js`, evals/docs/memory files | Complete |
| Claude review packet 4E | Created a reviewer entrypoint summarizing product thesis, constraints, architecture, regressions, evals, score breakdowns, and review questions. | Make external critique easier before deciding whether to move to AI craving interpretation. | `projects/01-cravewise/docs/CLAUDE_REVIEW_PACKET_4E.md`, state/tracker/handoff files | Complete |
| Pre-AI guardrail cleanup | Applied Claude's 4E review suggestions: corrected heavy flag naming, removed double negative-constraint enforcement, strengthened oily-memory eval coverage, and added small scoring/mapping comments. | Keep AI handoff contracts clean before replacing static interpretation. | `apps/cravewise/data/dishTaxonomy.ts`, `apps/cravewise/data/sampleData.ts`, evals/docs/memory files | Complete |
| AI structured craving interpretation | Added an optional server-side OpenAI interpretation route, strict schema output, taxonomy validation, static fallback metadata, small UI status copy, and offline malformed-output validation checks. | Let AI improve messy craving parsing while deterministic scoring remains the recommendation authority. | `apps/cravewise/app/api/interpret-craving/route.ts`, `apps/cravewise/data/cravingInterpretationValidation.ts`, `apps/cravewise/app/page.tsx`, `apps/cravewise/data/sampleData.ts`, evals/docs/memory files | Review |
| AI vs static interpretation comparison | Added internal comparison of static interpretation vs validated AI interpretation, deterministic top-result comparison, a small debug panel, and offline mock comparison checks. | Evaluate whether AI improves signal extraction without giving AI ranking authority. | `apps/cravewise/data/interpretationComparison.ts`, `apps/cravewise/app/page.tsx`, `apps/cravewise/app/globals.css`, evals/docs/memory files | Review |
| AI evaluation pack and case study evidence | Added a structured AI evaluation pack and case study outline for portfolio evidence collection. | Prepare honest AI-vs-static evidence without fabricating live AI results or changing product behavior. | `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`, `projects/01-cravewise/docs/CASE_STUDY_OUTLINE.md`, evals/docs/memory files | Review |
| Live-key AI evidence pass | Ran the curated AI evaluation pack cases with a server-side key loaded. Recorded timeout/API-error fallback evidence and confirmed deterministic static scoring handled every case. | Treat AI reliability and latency as product evidence, not just success cases. | `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`, `projects/01-cravewise/docs/CASE_STUDY_OUTLINE.md`, state/tracker/handoff/log files | Review |
| Live AI route diagnosis | Corrected env-file hygiene, added safe fallback diagnostics, confirmed no-key fallback, and diagnosed the live OpenAI failure as `insufficient_quota`. | Keep AI evaluation honest by separating product fallback health from upstream account/quota readiness. | `.gitignore`, `apps/cravewise/app/api/interpret-craving/route.ts`, docs/memory files | Review |
| Gemini alternate provider | Added `AI_PROVIDER` selection, kept OpenAI path, added Gemini `generateContent` path, and recorded partial Gemini live evidence. | Collect portfolio evidence without spending on OpenAI while keeping AI bounded to structured signal extraction. | `apps/cravewise/app/api/interpret-craving/route.ts`, docs/memory files | Review |
| Combined Gemini live evidence | Reran missing Gemini cases, recorded accepted G/H interpretations, retained F fallback, and documented provider-limit behavior during a full rerun. | Use live evidence honestly, including noise and fallback, instead of claiming AI is universally better. | `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`, docs/memory files | Review |
| Case study draft | Wrote a polished portfolio case study draft from the combined evidence, including the problem, product thesis, local memory loop, deterministic scoring, bounded AI interpretation, provider failure evidence, Gemini partial evidence, and next steps. | Convert evidence into an honest portfolio narrative without adding unsupported AI claims or new product scope. | `projects/01-cravewise/docs/CASE_STUDY_DRAFT.md`, tracker/log/handoff/state files | Review |
| Future milestone | TBD | TBD | TBD | Planned |

---

## 8. Important Regression Lessons

### Simran Pizza Regression

Input:

```text
pizza but not cheese overloaded
```

Bad result:

```text
Dal Makhani Rice Bowl
```

Lesson:

Explicit user intent must override persona defaults.

Fix:

Recommendation logic now prioritizes explicit dish/cuisine intent before persona preferences and history.

Expected result:

```text
Thin Crust Veggie Pizza from Slice Street
```

### Feedback Memory Example

Persona:

```text
Abhyudaya
```

Input:

```text
fried momos late night
```

Feedback:

```text
Disappointing + Too oily
```

Lesson:

Local feedback-influenced scoring now penalizes oily/fried late-night options for similar contexts in the current browser. With the expanded catalog, an oily fried snack can lose to a lower-oil spicy alternative after `too_oily` memory is saved.

---

## 9. Current Known Weaknesses

1. Dynamic insights are still simple aggregate summaries, not deep behavioral analysis.
2. Static logic uses hardcoded scoring rules, though score components are now inspectable and documented at a high level.
3. Feedback scoring influence is local-only and deterministic.
4. Catalog is broader but still dummy data, not real supply.
5. AI interpretation has combined Gemini live evidence but still lacks a single clean uninterrupted 8-case pass; OpenAI is blocked by `insufficient_quota`, and Gemini hit provider limits during a full rerun.
6. AI only extracts signals; comparison is internal QA, not user-facing confidence.
7. No real restaurant availability.
8. Case study is drafted in Markdown but not yet converted into a portfolio page with screenshots.

---

## 10. Recommended Next Milestones

### Next: Portfolio Case Study Page

Goal:

Convert `CASE_STUDY_DRAFT.md` into a polished portfolio page with screenshots and a concise demo script. Rerun Gemini during a stable quota window only if a single clean 8-case evidence pass is required.

---

## 11. Claude Review Instructions

Claude should read `projects/01-cravewise/docs/CLAUDE_REVIEW_PACKET_4E.md` first for the Milestone 4E review packet.

This project state file remains the broader handoff source of truth.

For quick status review:
Claude can rely mainly on the review packet plus this file.

For serious product or technical review:
Claude should read this file first, then inspect:
- apps/cravewise/app/page.tsx
- apps/cravewise/data/sampleData.ts
- apps/cravewise/README.md
- projects/01-cravewise/docs/PRD.md
- projects/01-cravewise/docs/MILESTONE_TRACKER.md
- evals/cravewise/sample_cases.json

Claude should review critically and focus on:
- product thesis
- recommendation quality
- decision logic
- feedback loop
- eval coverage
- portfolio strength
- risks before AI

Claude should not assume AI, backend, database, MCP, Supabase, or live integrations exist.

---

## 12. Update Rule

After every completed milestone, update this file.

Each milestone update should include:
- date
- milestone name
- what changed
- product decision made
- files changed
- what was intentionally not built
- new known weaknesses
- recommended next milestone

This file is the primary handoff document for CraveWise.
