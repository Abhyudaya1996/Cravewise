# Feature Memory: CraveWise Pre-AI Guardrail Cleanup

## Project

CraveWise

## Milestone

Milestone 4F: Pre-AI guardrail cleanup from Claude's Milestone 4E review.

## Source Review

Claude review source:

`projects/01-cravewise/claude-suggests/MILESTONE_4E_REVIEW.md`

## Scope

- Confirmed `heavy_late_night` is corrected to `heavy_meal` for context-free heavy catalog items.
- Kept negative constraints as hard user boundaries.
- Removed the dead `-90` negative constraint scoring penalty from normal scoring.
- Kept `negativeConstraintPenalty` in `scoreBreakdown` for shape continuity; returned recommendations should now have this as `0`.
- Strengthened the too-oily memory machine eval with oily/fried avoid flags.
- Added comments for scoring weight principles and why `sleepy` maps to `avoid_heavy`.
- Updated app/eval/project docs, milestone tracker, session handoff, and learning log.

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

- `npm run lint`: passed.
- `npm run build`: passed.
- `node evals/cravewise/run_static_evals.js`: passed 8/8.

## Status

IMPLEMENTED
