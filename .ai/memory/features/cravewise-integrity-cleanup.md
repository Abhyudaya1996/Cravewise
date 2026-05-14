# Feature Memory: CraveWise Integrity Cleanup

## Project

CraveWise

## Milestone

Milestone 3C: Integrity cleanup.

## Goal

Fix trust issues in the static prototype before expanding the catalog or adding AI.

## Scope

- Replaced clamped fake match percentages with qualitative confidence labels.
- Added typed fallback state objects with severity, title, message, suppression flag, and suggested actions.
- Updated fallback evaluation to use the active persona instead of `personas[0]`.
- Blocking fallbacks now suppress the full recommendation hero and show a fallback card.
- Recommendation arrays now avoid duplicate primary/backup cards.
- Renamed `generateInsightsStatic()` to `getPersonaInsightsStatic()` to avoid implying generated insights.
- Updated local feedback memory copy so it does not claim feedback affects scoring yet.
- Added eval cases for duplicate backups, active-persona fallback behavior, limited confidence, and qualitative confidence labels.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No live food integrations.
- No catalog expansion.
- No broad UI redesign.

## Product Decisions

- Raw heuristic scores are not shown as calibrated percentages.
- Weak or blocked matches should make uncertainty visible instead of presenting a confident hero card.
- Local feedback remains review memory only until feedback-influenced scoring is explicitly implemented.

## Verification

- Direct static logic check: Simran + `pizza but not cheese overloaded` returns Thin Crust Veggie Pizza with no duplicate backups.
- Direct fallback check: low custom budget for Simran returns a typed `budget_too_low` blocking fallback using Simran, not the default persona.
- `npm run lint`: passed.
- `npm run build`: passed.

## Status

IMPLEMENTED
