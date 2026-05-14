# Feature Memory: CraveWise Static Logic Tightening

## Project

CraveWise

## Milestone

Milestone 3B: Static logic tightening after local feedback memory.

## Trigger

A manual localStorage test found that Simran asking for `pizza but not cheese overloaded` with custom budget Rs.800 received Dal Makhani Rice Bowl from Comfort Curry Co. This violated the product promise that explicit current craving should matter before persona defaults.

## Scope

- Tightened `interpretCravingStatic()` cheese-avoid parsing.
- Added Thin Crust Veggie Pizza from Slice Street as a non-cheese-heavy dummy pizza option.
- Updated `scoreRecommendationStatic()` so explicit dish/cuisine hints and avoid signals are hard-priority scoring inputs before persona defaults.
- Filtered unrelated items out of explicit-intent recommendation candidates when a matching dummy item exists.
- Added "Ignored my craving" feedback chip.
- Updated `classifyFeedbackStatic()` to map ignored/wrong craving free text to `wrong_craving_match`.
- Updated local demo memory insights to call out explicit craving misses.
- Added eval coverage for the Simran non-cheese-heavy pizza regression.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No live food integrations.
- No real availability claims.
- No ordering, payments, delivery tracking, medical, or nutrition advice.

## Product Decision

Explicit user intent is now prioritized above persona defaults. Persona history still helps rank matching options, but it should not override a clear dish or cuisine request.

## Verification

- Direct static logic check: Simran + `pizza but not cheese overloaded` + custom Rs.800 returns Thin Crust Veggie Pizza, not Dal Makhani.
- Direct feedback classification check: `I wanted a Pizza you're showing me Dal Makhni . Meh` returns `wrong_craving_match`.
- `npm run lint`: passed.
- `npm run build`: passed after rerunning outside sandbox because the first sandboxed build hit a Windows `.next` unlink permission error.

## Status

IMPLEMENTED
