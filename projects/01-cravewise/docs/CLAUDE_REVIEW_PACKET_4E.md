# Claude Review Packet: CraveWise Milestone 4E

Last updated: 2026-05-14

## Product Thesis

CraveWise is a mobile-first food decision assistant, not a food delivery marketplace.

Users do not need another browsing feed. They need one trusted, taste-aware recommendation based on current craving, budget, context, past satisfaction, and regret patterns.

The product should recommend one primary meal, with backups only as an escape hatch. It should be honest about uncertainty, dummy data, local-only memory, and the absence of live availability.

## Current Constraints

- No AI yet.
- No backend.
- No database.
- No Supabase.
- No API routes.
- No MCP.
- No auth.
- No live restaurant data.
- No Swiggy/Zomato integration.
- No ordering, payment, or delivery tracking.
- No cross-device memory.
- No medical or nutrition advice.
- Local feedback memory must stay browser-only under `cravewise.localFeedbackMemory.v1`.

## Completed Milestones Through 4E

- Static mobile-first prototype.
- Local feedback memory.
- Simran non-cheese-heavy pizza regression fix.
- Integrity cleanup: qualitative confidence, typed fallbacks, distinct backups.
- Local feedback-influenced scoring.
- Feedback reason normalization patch.
- Dummy catalog expansion to 30 items.
- Dynamic local insights from browser feedback memory.
- Local dish taxonomy and structured signal cleanup.
- Taxonomy QA, internal score explainability, and lightweight static eval harness.

## Architecture Flow

```text
user craving
  -> interpretCravingStatic()
  -> structured signals
     - explicitDishIntents
     - cuisineIntents
     - contextSignals
     - preferenceSignals
     - negativeConstraints
     - budgetSignal
  -> local taxonomy validation / catalog fields
     - dishType
     - cuisine
     - preferenceTags
     - contextFit
     - regretRiskFlags
     - reliabilityTags
     - avoidIf
     - budgetTier / priceComfortBand
  -> deterministic scoring
  -> active-persona browser feedback memory adjustment
  -> one primary recommendation + optional backups
  -> feedback save under cravewise.localFeedbackMemory.v1
  -> browser-local dynamic insights
```

## Important Files To Inspect

- `apps/cravewise/data/dishTaxonomy.ts`
- `apps/cravewise/data/sampleData.ts`
- `apps/cravewise/app/page.tsx`
- `apps/cravewise/README.md`
- `evals/cravewise/sample_cases.json`
- `evals/cravewise/run_static_evals.js`
- `evals/cravewise/README.md`
- `evals/cravewise/STATIC_LOGIC_EVAL_SPEC.md`
- `evals/cravewise/STATIC_LOGIC_EVAL_REPORT.md`
- `projects/01-cravewise/docs/CRAVEWISE_PROJECT_STATE.md`
- `projects/01-cravewise/docs/MILESTONE_TRACKER.md`

## Known Regression Cases

- Simran + `pizza but not cheese overloaded` + custom Rs.800 should return a pizza/Italian option that is not cheese-heavy, currently `Thin Crust Veggie Pizza`; it must not return `Dal Makhani Rice Bowl`.
- `spicy but not oily` should keep `spicy` as a positive preference and `avoid_oily` as a negative constraint; it should not duplicate `not_oily` as a positive preference.
- `late night but light` should include `late_night`, `light`, and `avoid_heavy`, and avoid heavy items.
- `healthy but filling` should prefer healthy/filling options without medical or nutrition claims.
- Weekday Rush before a meeting should favor fast, reliable options, currently `Classic Chicken Burrito`.
- Prior `too_oily` feedback should change later fried-snack-style recommendations and show a local memory note.
- Clearing local demo memory should remove feedback influence and dynamic local insight summaries.

## Eval Runner

Run from repo root:

```bash
node evals/cravewise/run_static_evals.js
```

The runner reads `evals/cravewise/sample_cases.json` and executes only cases marked with `machineCheck: true`.

It checks selected cases for:

- `mustIncludeDishType`
- `mustIncludeCuisine`
- `mustNotIncludeDishType`
- `mustAvoidFlags`
- `expectedTopRecommendation`
- structured signal expectations
- memory-influenced behavior
- `scoreBreakdown.finalScore === recommendation.score`

## Latest Verification Results

Latest local run on 2026-05-14:

```text
npm run lint: passed
npm run build: passed
node evals/cravewise/run_static_evals.js: passed 8/8
evals/cravewise/sample_cases.json: valid JSON
```

## Score Breakdown Fields

Each recommendation now carries an internal `scoreBreakdown`:

- `explicitDishIntentScore`
- `cuisineIntentScore`
- `contextFitScore`
- `preferenceMatchScore`
- `negativeConstraintPenalty`
- `personaPreferenceScore`
- `feedbackMemoryScore`
- `reliabilityScore`
- `budgetScore`
- `explorationScore`
- `heavinessScore`
- `regretRiskPenalty`
- `finalScore`

This is for QA and explainability. It is not shown in the product UI and should not be treated as a calibrated probability.

## Intentionally Not Built

- AI craving interpretation.
- OpenAI API integration.
- Backend persistence.
- Database or Supabase.
- API routes.
- MCP.
- Auth or accounts.
- Cross-device memory.
- Live restaurant availability.
- Swiggy/Zomato integration.
- Ordering, payment, or delivery tracking.
- Medical or nutrition guidance.
- Broad UI redesign.

## Open Questions For Claude

1. Is the dish taxonomy clean or overengineered for this stage?
2. Are signal classes properly separated?
3. Are `avoid_*` negative constraints consistent across taxonomy, interpretation, scoring, evals, and docs?
4. Is scoring explainable enough for a one-recommendation product?
5. Are eval cases strong enough before AI?
6. Is feedback memory honest and useful, or does it overstate learning?
7. Is CraveWise ready for AI structured craving interpretation?
8. What must be fixed before replacing `interpretCravingStatic()` with AI?
9. Does the product still feel like a decision assistant rather than a disguised marketplace?
10. What additional regression cases would materially improve trust before AI?

## Review Stance Requested

Please review critically for product clarity, taxonomy design, scoring trust, eval coverage, and readiness for AI structured craving interpretation. Do not assume any backend, AI, real restaurant supply, ordering, or production personalization exists.
