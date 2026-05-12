# Build Guardrails

## Prime Directive

Build proof of product judgment, not demos that merely call an API.

## Scope Rules

- One active app milestone at a time.
- Static prototype before AI workflow.
- Local mock data before external integrations.
- Shared packages only after repeated patterns emerge.
- No Supabase until local/static flows prove value.
- No auth until a feature requires identity or persistence.

## AI Rules

- Do not build generic chatbots.
- Use structured outputs for AI workflows.
- Validate model output before rendering.
- Add fallback behavior for malformed, unsafe, or incomplete output.
- Make assumptions visible.
- Never reveal private chain-of-thought.
- Do not claim medical, financial, legal, or career certainty.

## Project-Specific Safety

- CraveWise can reason about preference, budget, timing, and regret risk. It must not make medical nutrition claims.
- Financial Copilot can explain terms, compare tradeoffs, and flag missing information. It must not give personalized financial advice.
- PM Simulator can provide practice feedback. It must not guarantee hiring, promotion, or career outcomes.

## Verification Rules

Before calling work complete:

1. Check changed files.
2. Confirm scope did not expand.
3. Run relevant build/lint/test commands when code exists.
4. Update milestone trackers.
5. Update `.ai/memory/session-handoff-current.md`.
6. Update feature memory when a feature exists.
7. Add case study notes for meaningful product decisions.
