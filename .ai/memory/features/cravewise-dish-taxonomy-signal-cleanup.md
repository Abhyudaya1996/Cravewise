# Feature Memory: CraveWise Local Dish Taxonomy + Signal Cleanup

## Project

CraveWise

## Milestone

Milestone 4D: Local dish taxonomy and signal cleanup.

## Goal

Clean up local/static craving signals before AI by separating dish, cuisine, context, preference, negative constraint, and budget signals.

## Scope

- Added `apps/cravewise/data/dishTaxonomy.ts`.
- Added taxonomy types/constants for dish types, cuisines, context signals, preference signals, negative constraints, regret risk flags, reliability flags, and budget fit signals.
- Added normalized catalog fields via local derivation:
  - `dishType`
  - `preferenceTags`
  - `contextFit`
  - `regretRiskFlags`
  - `reliabilityTags`
  - `avoidIf`
  - `budgetTier`
  - `priceComfortBand`
- Refactored `interpretCravingStatic()` to return structured local signals.
- Refactored `scoreRecommendationStatic()` to consume structured signals.
- Preserved browser-local feedback memory, dynamic local insights, and clear-memory behavior.
- Updated evals, README, project state, milestone tracker, session handoff, and learning log.

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
- No broad UI redesign.

## Product Decisions

- Explicit dish/cuisine intent still beats persona defaults.
- Negative constraints such as oily, heavy, cheese-heavy, expensive, and slow delivery remain strong.
- Feedback memory remains active-persona only and browser-local.
- Taxonomy inference is still deterministic and regex-based; future AI should fill the same structured fields rather than changing scoring first.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed.
- `evals/cravewise/sample_cases.json` validation: passed.

## Status

IMPLEMENTED
