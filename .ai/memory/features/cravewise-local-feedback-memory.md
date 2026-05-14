# Feature Memory: CraveWise Local Feedback Memory

## Project

CraveWise

## Milestone

Milestone 3A: Local Feedback Memory.

## Goal

Persist submitted post-meal feedback in the current browser only and show simple local-demo feedback signals on the Insights screen.

## Scope

- Added browser `localStorage` persistence for submitted feedback.
- Used storage key `cravewise.localFeedbackMemory.v1`.
- Stored persona, decision context, selected recommendation, feedback, static classification, and timestamp.
- Added a visible Insights section titled "Local demo memory from this browser".
- Added a "Clear local demo memory" action that removes only CraveWise local feedback memory.
- Expanded lightweight eval documentation for vague craving, budget too low, high regret risk, Weekday Rush, unsafe nutrition/medical claim, feedback classification, and local feedback memory persistence.

## Out Of Scope

- No AI API.
- No OpenAI integration.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No auth.
- No API routes.
- No live food integrations.
- No Swiggy/Zomato integration.
- No real availability, ordering, payment, delivery, nutrition, or medical claims.

## Product Decisions

- Kept local memory honest by labeling it as browser-only demo memory.
- Did not save skipped feedback, so skipping stays low-friction and does not create noisy memory.
- Left the recommendation engine unchanged; saved feedback affects visible Insights only in this milestone.
- Added clear/reset control to make persistence inspectable and reversible during demos.
- Milestone 4A later added browser-only feedback-influenced scoring, so local memory can now affect future recommendations for the active persona in the same browser.

## Technical Decisions

- Implemented `LocalFeedbackMemory` in the client page because this milestone is UI-local and browser-only.
- Guarded `localStorage` reads to keep the client component resilient to malformed stored data.
- Kept saved memory capped to the 12 newest records.
- Used existing `classifyFeedbackStatic()` output rather than adding a new classifier.

## Verification

- `npm run lint`: passed.
- `npm run build`: passed after rerunning outside sandbox because the first sandboxed build hit a Windows `.next` unlink permission error.

## Status

IMPLEMENTED
