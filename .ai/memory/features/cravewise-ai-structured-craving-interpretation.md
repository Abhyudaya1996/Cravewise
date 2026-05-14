# CraveWise AI Structured Craving Interpretation

Date: 2026-05-14

Milestone 5A adds optional AI structured craving interpretation while keeping deterministic scoring as the recommendation authority.

## What Changed

- Added `apps/cravewise/app/api/interpret-craving/route.ts`.
- Added `apps/cravewise/data/cravingInterpretationValidation.ts`.
- Reused the existing `CravingInterpretation` shape.
- Let `scoreRecommendationStatic()` accept a prevalidated interpretation while preserving default static behavior.
- Added small UI status copy for AI interpreted, local rules, and AI unavailable states.
- Added offline AI-output validation checks to `evals/cravewise/run_static_evals.js`.

## Guardrails

- AI only extracts structured signals.
- AI cannot choose the final recommendation.
- AI cannot output item IDs, restaurant names, scores, rankings, recommendations, or backups.
- `OPENAI_API_KEY` stays server-side.
- Missing key, timeout, API error, invalid schema, invalid enum, missing fields, low-quality output, or forbidden recommendation fields fall back to `interpretCravingStatic()`.
- Local feedback memory remains browser-only under `cravewise.localFeedbackMemory.v1`.

## Environment

- `OPENAI_API_KEY`: optional, server-side only.
- `OPENAI_MODEL`: optional, defaults to `gpt-4.1-mini`.
- Timeout: 5 seconds.

## Verification

- Static eval runner remains deterministic and does not call OpenAI.
- Validation fixtures cover accepted taxonomy-only output, invalid enum, forbidden recommendation field, and raw-input mismatch.
