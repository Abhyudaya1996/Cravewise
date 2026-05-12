# Feature Memory: CraveWise Static Logic Evals

## Project

CraveWise

## Milestone

Static logic evaluation package.

## Goal

Create a manual eval specification and report for the current deterministic CraveWise logic before adding local feedback persistence or AI.

## Scope

- Located existing static logic functions.
- Documented actual static logic file paths.
- Documented inferable function input and output shapes.
- Marked unclear function contracts where behavior is not explicit.
- Added product-intent eval cases for craving interpretation, recommendation scoring, fallback states, feedback classification, and insight specificity.
- Kept insight specificity as manual review.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No live food integrations.
- No test runner.
- No npm eval command.
- No static logic changes.
- No UI rewrite.

## Files Added

- `evals/cravewise/STATIC_LOGIC_EVAL_SPEC.md`
- `evals/cravewise/STATIC_LOGIC_EVAL_REPORT.md`

## Static Logic Location

Expected path `apps/cravewise/src/lib/staticLogic.ts` does not exist.

Actual functions are in:

- `apps/cravewise/data/sampleData.ts`

Functions found:

- `interpretCravingStatic()`
- `scoreRecommendationStatic()`
- `classifyFeedbackStatic()`
- `generateInsightsStatic()`
- `getFallbackState()`

## Eval Coverage

- 29 total documented eval cases.
- 23 functional eval cases across interpretation, scoring, fallback, and feedback.
- 6 manual insight-specificity persona reviews.

## Readiness Summary

- Craving interpretation: partially ready.
- Recommendation scoring: partially ready.
- Fallback states: weak.
- Feedback classification: partially ready.
- Insight specificity: ready for manual review.

## Key Risks

- Craving interpretation is regex-based and may miss nuanced Hinglish or contextual signals.
- Weekday Rush free-text parsing is not fully structured.
- Score values are not transparently explained as a breakdown.
- Feedback classification may over-trust chip inputs and under-parse free text.
- Fallback states are strings rather than structured decision states.
- Insights are static and may become stale after persistence is added.

## Verification

No build or lint was run because only markdown documentation and memory files changed.

## Status

REVIEW

