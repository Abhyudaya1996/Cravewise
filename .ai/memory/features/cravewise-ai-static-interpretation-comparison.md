# CraveWise AI vs Static Interpretation Comparison

Date: 2026-05-14

Milestone 5B adds an internal comparison layer for evaluating whether AI structured interpretation improves over static interpretation.

## What Changed

- Added `apps/cravewise/data/interpretationComparison.ts`.
- Compared static and AI interpretation fields.
- Scored static and AI signal sets separately with `scoreRecommendationStatic()` for QA only.
- Added a small collapsible recommendation-screen debug panel.
- Added offline mock comparison checks to `evals/cravewise/run_static_evals.js`.
- Added dev-server log patterns to `.gitignore`.

## Comparison Fields

- `explicitDishIntents`
- `cuisineIntents`
- `contextSignals`
- `preferenceSignals`
- `negativeConstraints`
- `budgetSignal`
- `heaviness`
- `exploration_intent`
- `confidence`
- `needs_clarification`

## Guardrails

- AI still only interprets craving signals.
- AI does not rank or choose the final recommendation.
- Comparison uses deterministic scoring for both static and AI interpretations.
- Static evals remain offline and do not require `OPENAI_API_KEY`.
- The comparison panel is internal/prototype-QA copy, not user-facing confidence.
- Comparison holds persona, craving input, budget/context, local feedback memory, catalog, and deterministic scorer constant. Only the interpretation source differs.

## Manual QA Cases

- Simran + `pizza but not cheese overloaded`
- `spicy but not oily`
- `late night but light`
- `healthy but filling`
- `fried momos late night` after prior `too_oily` memory
- `something nice but not too much`
- nonsense input fallback
- no `OPENAI_API_KEY` fallback
