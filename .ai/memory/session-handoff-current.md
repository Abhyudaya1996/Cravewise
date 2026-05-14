# Session Handoff Current

## Current Portfolio State

Status: CraveWise Milestone 5C AI evaluation pack and case study evidence implemented for review.

## Active Project

CraveWise.

## Active Milestone

Milestone 5C AI evaluation pack and case study evidence.

## Latest Decisions

- Build order remains: docs, portfolio site scaffold, CraveWise static prototype, CraveWise AI workflow, CraveWise feedback/evals, Financial Copilot, PM Simulator, case studies.
- The repo will use `.ai/memory` for LLM handoffs and milestone continuity.
- CraveWise now has an active PRD for Milestone 1. Use `projects/01-cravewise/docs/PRD.md` as source of truth and `projects/01-cravewise/docs/DUMMY_DATA.md` for sample data requirements.
- `apps/cravewise` now contains a mobile-first static Next.js prototype using dummy/sample data only.
- The static prototype now includes persona selection, taste profile preview, messy craving interpretation, budget chips, exploration intent, Weekday Rush mode, backup options, feedback classification, and persona-specific insights.
- The UI has been upgraded into a polished portfolio-grade mobile web experience with a warm app shell, premium cards, chips, badges, progressive disclosure, visible trust reasoning, and a hero-style recommendation screen.
- Static logic functions were located in `apps/cravewise/data/sampleData.ts`; the expected `apps/cravewise/src/lib/staticLogic.ts` file does not exist.
- Static logic eval documentation now exists under `evals/cravewise/`, covering craving interpretation, recommendation scoring, fallback states, feedback classification, and manual insight specificity review.
- Milestone 3A adds browser-only local feedback memory under `cravewise.localFeedbackMemory.v1`.
- Insights now include a "Local demo memory from this browser" section and a clear/reset action.
- Skipped feedback is not saved.
- Manual feedback exposed a regression: Simran asked for non-cheese-heavy pizza and received Dal Makhani.
- Static scoring now prioritizes explicit dish/cuisine hints and avoid signals before persona defaults.
- Dummy catalog now includes Thin Crust Veggie Pizza from Slice Street for non-cheese-heavy pizza intent.
- Feedback classification maps ignored-craving free text and the "Ignored my craving" chip to `wrong_craving_match`.
- Direct static logic verification confirms the Simran pizza case returns Thin Crust Veggie Pizza, not Dal Makhani.
- Match display now uses qualitative labels rather than clamped fake percentages.
- Fallback state is a typed object and uses the active persona for budget checks.
- Blocking fallbacks suppress the full recommendation hero.
- Backup options are distinct when shown.
- `generateInsightsStatic()` was renamed to `getPersonaInsightsStatic()`.
- Local memory copy no longer claims feedback changes scoring.
- Milestone 4A normalizes feedback failure reasons into stable internal codes.
- Old localStorage labels like "Too oily" are safely interpreted as `too_oily`.
- "Would not reorder" is normalized to `would_not_reorder` and can modestly penalize the same dish or restaurant for the same persona.
- "Not fresh" is normalized to `not_fresh` and can modestly penalize the same restaurant or lower-reliability freshness-sensitive contexts.
- Active-persona browser-local feedback memory now adjusts future static scoring.
- The UI shows a local demo memory influence note when memory affected a recommendation.
- Clearing local demo memory removes scoring influence.
- Current static interpretation still mixes craving signals and context flags such as `fried_snack` and `late_night` inside `craving_type`; clean this up before AI craving interpretation.
- Milestone 4B expands the dummy menu catalog from 9 to 30 items.
- Expanded categories include pizza/Italian, Mexican/burrito, North Indian, Asian/Chinese, South Indian, healthy/light, fried/oily regret-prone, group-safe, and Weekday Rush options.
- Abhyudaya's `too_oily` memory case can now visibly change the primary recommendation from an oily fried snack to a lower-oil spicy alternative.
- Insights now keep static persona insight cards and add active-persona dynamic local summaries from saved browser feedback.
- Dynamic local summaries use normalized failure reason codes and reorder intent for patterns such as too oily, wrong craving match, would reorder, would not reorder, delivery/reliability issue, and not fresh.
- Dynamic local summaries are labeled as based on feedback saved in this browser and clear when `cravewise.localFeedbackMemory.v1` is cleared.
- Milestone 4D adds `apps/cravewise/data/dishTaxonomy.ts`.
- Static craving interpretation now returns structured fields: `explicitDishIntents`, `cuisineIntents`, `contextSignals`, `preferenceSignals`, `negativeConstraints`, `budgetSignal`, and `rawInput`.
- Catalog items now expose derived normalized fields such as `dishType`, `preferenceTags`, `contextFit`, `regretRiskFlags`, `reliabilityTags`, `avoidIf`, `budgetTier`, and `priceComfortBand`.
- `scoreRecommendationStatic()` consumes structured local signals while preserving explicit craving priority, strong negative constraints, active-persona feedback memory, and local demo memory influence.
- Milestone 4E standardized negative constraints on `avoid_*`.
- `not_oily` was removed from positive `preferenceSignals`; `spicy but not oily` now maps to `spicy` plus `avoid_oily`.
- Recommendations now include internal `scoreBreakdown` fields, with `finalScore` matching the recommendation score.
- Added `evals/cravewise/run_static_evals.js`; latest run passed 8/8 machine-readable checks.
- Created `projects/01-cravewise/docs/CLAUDE_REVIEW_PACKET_4E.md` as the Claude review entrypoint after Milestone 4E.
- Claude's 4E review is stored at `projects/01-cravewise/claude-suggests/MILESTONE_4E_REVIEW.md`.
- Milestone 4F applied the required Claude cleanup: `heavy_late_night` is corrected to `heavy_meal`, negative constraints are hard-filtered instead of also receiving a hidden `-90` penalty, and the too-oily memory eval checks the top recommendation avoids oily/fried flags.
- Small code comments now document scoring weight principles and why `sleepy` maps to `avoid_heavy`.
- Direct static logic checks passed; `npm run lint` passed; `npm run build` passed.
- Milestone 5A adds `apps/cravewise/app/api/interpret-craving/route.ts` for optional server-side AI structured craving interpretation.
- `OPENAI_API_KEY` stays server-side; `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`.
- The route uses OpenAI Responses API structured outputs with strict JSON schema, `store: false`, and a 5-second timeout.
- AI output is validated in `apps/cravewise/data/cravingInterpretationValidation.ts` against local taxonomy enum values and the existing `CravingInterpretation` shape.
- Validation rejects missing fields, invalid enum values, raw-input mismatch, low-quality empty output, and forbidden recommendation/ranking fields.
- `scoreRecommendationStatic()` can accept a prevalidated interpretation but remains the only final ranking/recommendation layer.
- The UI adds honest status copy: `AI interpreted your craving`, `Using local rules`, or `AI unavailable, using local rules`.
- The static eval runner remains offline and now includes five mock AI-output validation checks.
- Milestone 5B adds `apps/cravewise/data/interpretationComparison.ts`.
- The comparison helper compares static interpretation vs validated AI interpretation fields, then scores both signal sets with `scoreRecommendationStatic()` for QA only.
- The recommendation screen includes a small collapsible `Static vs AI interpretation` debug panel after a recommendation request.
- Static evals remain offline and include mock comparison checks for changed fields, recommendation-change detection, and AI fallback comparison.
- Milestone 5C adds `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`.
- Milestone 5C adds `projects/01-cravewise/docs/CASE_STUDY_OUTLINE.md`.
- Live AI evaluation was not run locally because `OPENAI_API_KEY` was not set. Do not claim AI improved cases until manual evidence is recorded.
- `projects/01-cravewise/docs/CRAVEWISE_PROJECT_STATE.md` is now the primary Claude/Codex handoff and review entrypoint for CraveWise.
- No backend database, MCP, auth, Supabase, live restaurant data, ordering/payment, delivery tracking, or cross-device memory were added.

## Open Questions

- Whether the portfolio site should be scaffolded before CraveWise static prototype, or whether CraveWise should start first and the portfolio site can consume case study outputs later.
- Whether future app packages should share UI from `packages/ui` immediately or wait until duplication appears.

## Next Recommended Action

For broader CraveWise context, read `projects/01-cravewise/docs/CRAVEWISE_PROJECT_STATE.md`. Next recommended milestone: run the AI evaluation pack with `OPENAI_API_KEY` and write the portfolio case study from recorded evidence.

## Last Updated

2026-05-14

