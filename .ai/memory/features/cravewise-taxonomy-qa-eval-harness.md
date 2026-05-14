# Feature Memory: CraveWise Taxonomy QA + Static Eval Harness + Score Explainability

## Project

CraveWise

## Milestone

Milestone 4E: Taxonomy QA, static eval harness, and score explainability.

## Goal

Audit and harden the local taxonomy layer from Milestone 4D before adding AI, so regressions are easier to catch and score behavior is easier to inspect.

## Scope

- Audited structured signal boundaries.
- Standardized negative constraints on the `avoid_*` naming convention.
- Removed `not_oily` from positive `preferenceSignals`.
- Added internal `scoreBreakdown` to recommendations:
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
- Added `evals/cravewise/run_static_evals.js`.
- Added machine-readable checks to selected `sample_cases.json` cases.
- Updated docs, project state, milestone tracker, session handoff, and learning log.

## Out Of Scope

- No AI.
- No backend.
- No database.
- No Supabase.
- No API routes.
- No MCP.
- No auth.
- No live restaurant data.
- No ordering, payment, or delivery tracking.
- No cross-device memory.
- No UI redesign.

## Verification

- `node evals/cravewise/run_static_evals.js`: passed 8/8.
- `evals/cravewise/sample_cases.json`: valid JSON.
- `npm run lint`: passed.
- `npm run build`: passed.

## Status

IMPLEMENTED
