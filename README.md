# AI PM Portfolio OS

A local portfolio operating system for building three AI-native product demos and the case studies around them. The goal is to prove product judgment, AI workflow design, technical fluency, guardrail thinking, and the ability to ship.

## Portfolio Thesis

I build AI decision products that help users make better choices under ambiguity. Each project turns a messy real-world decision into a structured workflow with clear inputs, constrained AI behavior, reviewable outputs, feedback loops, and evals.

## Flagship Projects

| Project | Product | Core Proof |
|---|---|---|
| CraveWise | Food decision engine | Turns craving, budget, health intent, timing, and regret history into explainable meal recommendations. |
| AI Financial Copilot | Trust-aware financial assistant | Helps users compare offers and identify tradeoffs without pretending to be a financial advisor. |
| AI PM Simulator | Product judgment simulator | Lets aspiring PMs practice scenarios with stakeholder agents, prioritization pressure, and structured feedback. |

## Current Build Phase

Documentation and operating-system scaffold. Do not implement app code until the docs, memory layer, and milestone trackers are ready.

Next milestone: CraveWise static prototype.

## How To Work With Codex Or Any LLM

At the start of every session, read only what is needed:

1. `AGENTS.md`
2. `.ai/memory/session-handoff-current.md`
3. `.ai/memory/blockers.md`
4. relevant `.ai/memory/features/<feature>.md` if it exists
5. relevant project `docs/PRD.md`
6. relevant prompt in `codex/prompts/`

After every task, update:

- `.ai/memory/session-handoff-current.md`
- relevant project `docs/MILESTONE_TRACKER.md`
- root `docs/MILESTONE_TRACKER.md`
- `learning-log/LEARNING_LOG.md`
- case study notes if the task changes product narrative or tradeoffs

## Build Order

1. Repo structure and docs
2. Portfolio site scaffold
3. CraveWise static prototype
4. CraveWise AI recommendation workflow
5. CraveWise feedback loop and evals
6. Financial Copilot static prototype
7. Financial Copilot AI analysis workflow and guardrails
8. PM Simulator static prototype
9. PM Simulator multi-agent scenario workflow
10. Final portfolio case studies

## Non-Negotiables

- Do not build generic chatbots.
- Do not add live integrations before local/static value works.
- Do not expose secrets.
- Do not make unsupported financial, medical, nutrition, or career guarantees.
- Validate AI outputs before rendering them.
- Keep one active app milestone at a time.
