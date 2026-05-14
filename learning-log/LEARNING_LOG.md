# Learning Log

Update after every meaningful task.

## 2026-05-12 - Portfolio OS Documentation Pass

- Milestone: documentation and orchestration scaffold.
- Changed: tightened repo operating rules, memory workflow, milestone expectations, and project docs.
- Product tradeoff: prioritized durable clarity over starting app code immediately.
- Technical tradeoff: kept repo framework-free until app scaffolding begins.
- Next action: start CraveWise static prototype.

## 2026-05-12 - CraveWise Static Prototype

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: built a mobile-first Next.js clickable flow with Home, Taste Profile, Craving Input, Recommendation, Backup Options, Feedback, and Insights.
- Product tradeoff: kept the core wedge as one primary recommendation, with backups hidden behind an explicit escape hatch.
- Technical tradeoff: used plain CSS and local TypeScript sample data instead of Tailwind/shadcn to keep the first prototype lightweight.
- Verification: `npm run build`, `npm run lint`, and `npm audit --json` passed.
- Next action: review the local prototype, then decide whether to add a transparent rule-based scoring layer before the AI workflow.

## 2026-05-12 - CraveWise v1.2 Static Prototype Expansion

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: added PRD v1.2 logic for persona selection, multi-label personalization model, craving interpretation, budget chips, exploration intent, Weekday Rush, local scoring, feedback classification, and persona-specific insights.
- Product tradeoff: added richer decision logic while keeping the prototype static and avoiding AI/MCP/live supply-side integrations.
- Technical tradeoff: kept all logic in local deterministic TypeScript utilities instead of introducing backend routes or shared packages.
- Verification: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: review the v1.2 static prototype, then decide between local feedback persistence/evals and AI workflow with schema validation.

## 2026-05-12 - CraveWise Portfolio UI Polish

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: upgraded the prototype into a warmer, more premium mobile web product and componentized the UI around the requested product components.
- Product tradeoff: made the recommendation screen the strongest visual moment while keeping backups hidden as a secondary path.
- Technical tradeoff: continued using plain CSS and local React components instead of adding UI dependencies.
- Verification: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: review the polished prototype in browser, then move to local feedback persistence and eval cases.

## 2026-05-13 - CraveWise Local Feedback Memory

- Milestone: CraveWise Milestone 3A local feedback memory.
- Changed: added browser-only `localStorage` persistence for submitted feedback and surfaced saved feedback in an Insights section labeled "Local demo memory from this browser".
- Product tradeoff: made the learning loop visible without claiming real personalization, cross-device memory, AI memory, or backend persistence.
- Technical tradeoff: kept memory in the client page and reused existing static feedback classification instead of adding dependencies or API routes.
- Verification: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: manually verify persistence after refresh, then tighten structured fallbacks and feedback classification before AI.

## 2026-05-13 - CraveWise Static Logic Tightening

- Milestone: CraveWise Milestone 3B static logic tightening.
- Changed: fixed the Simran pizza regression so explicit dish/cuisine intent and avoid signals outrank persona defaults, added a non-cheese-heavy pizza dummy item, and classified ignored-craving feedback as `wrong_craving_match`.
- Product tradeoff: favored respecting the user's current stated craving over reusing persona comfort-food defaults.
- Technical tradeoff: kept the fix in deterministic scoring and dummy data instead of adding AI, backend memory, or a broader recommendation rewrite.
- Verification: direct static logic check passed; `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: move fallback strings into structured fallback objects so the UI can block unrelated recommendation cards when the static catalog has no valid match.

## 2026-05-13 - CraveWise Integrity Cleanup

- Milestone: CraveWise Milestone 3C integrity cleanup.
- Changed: replaced fake match percentages with qualitative labels, converted fallbacks into typed objects, used the active persona in fallback checks, suppressed the hero for blocking fallbacks, deduped backups, renamed persona insight retrieval, and corrected local memory copy.
- Product tradeoff: made uncertainty more visible even when that makes the prototype feel less magically confident.
- Technical tradeoff: kept the cleanup in deterministic local code instead of expanding the catalog or adding AI.
- Verification: direct static logic checks passed; `npm run lint` passed; `npm run build` passed.
- Next action: add local feedback-influenced scoring once the integrity baseline is stable.

## 2026-05-13 - CraveWise Local Feedback-Influenced Scoring

- Milestone: CraveWise Milestone 4A local feedback-influenced scoring.
- Changed: normalized feedback failure reasons, passed active-persona browser-local memory into static scoring, added memory-based penalties/boosts, showed a local demo memory influence note, and patched `Would not reorder` / `Not fresh` so selected chips are stored and usable.
- Product tradeoff: made the learning loop real within the local demo while keeping it clearly browser-only and deterministic.
- Technical tradeoff: kept scoring rules simple and explainable instead of adding AI, backend state, or a larger catalog. Noted that `craving_type` mixes craving signals and context flags and should be cleaned up before AI interpretation.
- Verification: direct static logic checks passed; `npm run lint` passed; `npm run build` passed.
- Next action: expand the dummy catalog to 25-30 items before AI craving interpretation.

## 2026-05-13 - CraveWise Catalog Expansion

- Milestone: CraveWise Milestone 4B catalog expansion.
- Changed: expanded the dummy menu catalog from 9 to 30 items across pizza/Italian, Mexican/burrito, North Indian, Asian/Chinese, South Indian, healthy/light, fried/oily regret-prone, group-safe, and Weekday Rush scenarios.
- Product tradeoff: improved visible recommendation differentiation without pretending to have live restaurant supply.
- Technical tradeoff: kept expansion as static TypeScript data and one targeted oily-memory scoring refinement instead of adding dependencies, backend routes, or AI.
- Verification: direct static logic checks passed; `npm run lint` passed; `npm run build` passed.
- Next action: build dynamic local insights from feedback memory before AI craving interpretation.

## 2026-05-14 - CraveWise Dynamic Local Insights

- Milestone: CraveWise Milestone 4C dynamic local insights.
- Changed: kept static persona insights and added active-persona local demo pattern summaries derived from saved browser feedback.
- Product tradeoff: made Insights feel more responsive to feedback while keeping copy honest about browser-only demo memory.
- Technical tradeoff: kept the derivation in local React/TypeScript using normalized reason codes instead of adding backend memory, AI, or dependencies.
- Verification: `npm run lint` passed; `npm run build` passed.
- Next action: replace only `interpretCravingStatic()` with AI structured output while keeping scoring deterministic.

## 2026-05-14 - CraveWise Local Dish Taxonomy + Signal Cleanup

- Milestone: CraveWise Milestone 4D local dish taxonomy and signal cleanup.
- Changed: added a local taxonomy module, derived normalized catalog fields, and refactored static interpretation/scoring around structured dish, cuisine, context, preference, negative constraint, and budget signals.
- Product tradeoff: cleaned up the signal contract before AI so future model output can be constrained without changing recommendation scoring.
- Technical tradeoff: kept taxonomy inference deterministic and local instead of adding AI, backend validation, or dependencies.
- Verification: `npm run lint` passed; `npm run build` passed; `evals/cravewise/sample_cases.json` parsed successfully.
- Next action: replace only structured signal extraction in `interpretCravingStatic()` with AI output while keeping scoring deterministic.

## 2026-05-14 - CraveWise Taxonomy QA + Static Eval Harness

- Milestone: CraveWise Milestone 4E taxonomy QA, static eval harness, and score explainability.
- Changed: removed `not_oily` preference leakage, standardized negative constraints on `avoid_*`, added recommendation score breakdowns, and added a local static eval runner for selected machine-readable cases.
- Product tradeoff: improved trust and regression visibility without exposing debug score math in the UI.
- Technical tradeoff: used a small local Node script with TypeScript transpilation instead of adding dependencies or a test framework.
- Verification: `node evals/cravewise/run_static_evals.js` passed 8/8; `npm run lint` passed; `npm run build` passed.
- Next action: either write the portfolio-facing case study from the now-stable static prototype or replace only structured signal extraction with AI while keeping deterministic scoring.

## 2026-05-14 - CraveWise Pre-AI Guardrail Cleanup

- Milestone: CraveWise Milestone 4F pre-AI guardrail cleanup.
- Changed: applied Claude's 4E review suggestions by using `heavy_meal`, removing the dead negative-constraint score penalty, keeping negative constraints as hard filters, strengthening the too-oily memory eval, and adding small comments for scoring principles and sleepy-to-heavy mapping.
- Product tradeoff: made the AI handoff contract clearer before adding AI, without changing the visible product experience.
- Technical tradeoff: kept the score breakdown shape stable while making `negativeConstraintPenalty` stay zero for returned recommendations.
- Verification: `npm run lint` passed; `npm run build` passed; `node evals/cravewise/run_static_evals.js` passed 8/8.
- Next action: replace only structured signal extraction in `interpretCravingStatic()` with AI output while keeping taxonomy validation and deterministic scoring.

## 2026-05-14 - CraveWise AI Structured Craving Interpretation

- Milestone: CraveWise Milestone 5A AI structured craving interpretation.
- Changed: added an optional server-side OpenAI interpretation route, strict structured output schema, local taxonomy validation, fallback metadata, UI status copy, and offline malformed AI-output validation checks.
- Product tradeoff: allowed AI to improve messy craving understanding while keeping deterministic scoring as the only final recommendation authority.
- Technical tradeoff: used the Responses API with `fetch` instead of adding an SDK dependency; the app still works without `OPENAI_API_KEY`.
- Verification: `npm run lint` passed; `node evals/cravewise/run_static_evals.js` passed 8/8 static checks plus 4/4 AI validation checks. Build result should be checked before accepting the milestone.
- Next action: run live-key AI QA if an API key is available; otherwise review no-key fallback and keep prompt/schema tuning scoped to interpretation only.

## 2026-05-14 - CraveWise AI vs Static Interpretation Comparison

- Milestone: CraveWise Milestone 5B AI vs static interpretation comparison.
- Changed: added an internal comparison helper, deterministic static-vs-AI top-result comparison, a small collapsible recommendation-screen debug panel, and offline mock comparison checks.
- Product tradeoff: made AI interpretation quality easier to evaluate without turning the feature into user-facing confidence or AI ranking.
- Technical tradeoff: reused `scoreRecommendationStatic()` for both comparison paths instead of adding another ranking layer.
- Verification: pending final `npm run lint`, `npm run build`, and `node evals/cravewise/run_static_evals.js`.
- Next action: run manual comparison cases with `OPENAI_API_KEY` set, then decide whether prompt/schema tuning is needed.
