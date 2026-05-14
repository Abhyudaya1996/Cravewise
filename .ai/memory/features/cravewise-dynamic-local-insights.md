# Feature Memory: CraveWise Dynamic Local Insights

## Project

CraveWise

## Milestone

Milestone 4C: Dynamic local insights from feedback memory.

## Goal

Make the Insights screen more specific to the current browser's saved demo feedback while keeping CraveWise fully local/static.

## Scope

- Kept persona static insights from `getPersonaInsightsStatic()`.
- Added active-persona local demo pattern summaries in the Insights local memory panel.
- Derived summaries from saved feedback under `cravewise.localFeedbackMemory.v1`.
- Used normalized failure reason codes plus reorder intent.
- Covered `too_oily`, `wrong_craving_match`, `would_reorder`, `would_not_reorder`, `delivery_issue`, `reliability_issue`, and `not_fresh`.
- Added honest copy: "Based on feedback saved in this browser" and "Local demo memory".
- Updated evals, README, project state, milestone tracker, session handoff, and learning log.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No auth.
- No API routes.
- No live restaurant integrations.
- No ordering, payment, delivery tracking, or real availability claims.
- No cross-device memory.
- No broad UI redesign.

## Product Decisions

- Static persona insights remain as durable persona-level context.
- Dynamic insights are separate, browser-local, and active-persona only.
- A single saved signal can be shown, but repeated signals get more specific copy.
- Clearing local demo memory removes both scoring influence and dynamic local insight summaries.
- Copy does not claim AI memory, permanent learning, or production personalization.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed.

## Status

IMPLEMENTED
