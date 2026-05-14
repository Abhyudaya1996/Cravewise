# Feature Memory: CraveWise Feedback-Influenced Scoring

## Project

CraveWise

## Milestone

Milestone 4A: Local feedback-influenced scoring.

## Goal

Move from feedback saved and shown in Insights to feedback saved, normalized, and used to adjust future static recommendations in the same browser.

## Scope

- Normalized feedback failure reasons into stable internal codes.
- Added safe normalization for old localStorage records that stored display labels such as `Too oily`.
- Passed active-persona local feedback memory into `scoreRecommendationStatic()`.
- Added simple scoring adjustments for `too_oily`, `too_heavy`, `too_expensive`, `wrong_craving_match`, `delivery_issue`, `reliability_issue`, `would_reorder`, `would_not_reorder`, and `not_fresh`.
- Added deterministic late-night and fried/snack context detection.
- Added local demo memory influence copy in the recommendation hero when memory affects scoring.
- Updated evals, project state, milestone tracker, README, session handoff, and learning log.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No auth.
- No API routes.
- No live restaurant integrations.
- No cross-device memory.

## Product Decisions

- Feedback influence is local-only and transparent.
- Memory boosts are modest so they do not override explicit current cravings.
- Negative feedback penalties are stronger when the current context resembles the saved regret context.
- Clear local demo memory removes all scoring influence.
- Selected feedback chips should never be silently dropped from normalized memory; the Milestone 4A patch explicitly covers `would_not_reorder` and `not_fresh`.
- `craving_type` currently carries both craving signals and context flags such as `fried_snack` and `late_night`; clean this up before replacing interpretation with AI.

## Verification

- Direct static logic check confirmed old `Too oily` labels normalize to `too_oily`.
- Direct static logic check confirmed old `Would not reorder` and `Not fresh` labels normalize to `would_not_reorder` and `not_fresh`.
- Abhyudaya late-night oily feedback penalized the later spicy fried late-night recommendation and added a memory note.
- Simran pizza regression still returns Thin Crust Veggie Pizza.
- Kushagra delivery/reliability scoring rule exists for Weekday Rush contexts and penalizes low-reliability/high-ETA options when present.
- Simran reorder memory modestly boosted Rajma Rice Bowl.
- `npm run lint`: passed.
- `npm run build`: passed.

## Status

IMPLEMENTED

## Follow-Up

Milestone 4B expanded the dummy catalog to 30 items. The `too_oily` memory case can now visibly change Abhyudaya's late-night fried-snack primary recommendation from an oily fried snack to a lower-oil spicy alternative.
