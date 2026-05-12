# Session Handoff Current

## Current Portfolio State

Status: CraveWise Milestone 1 static prototype updated to PRD v1.2, polished into a portfolio-grade mobile UI, and static logic eval docs are ready for review.

## Active Project

CraveWise.

## Active Milestone

Milestone 1 static prototype review.

## Latest Decisions

- Build order remains: docs, portfolio site scaffold, CraveWise static prototype, CraveWise AI workflow, CraveWise feedback/evals, Financial Copilot, PM Simulator, case studies.
- The repo will use `.ai/memory` for LLM handoffs and milestone continuity.
- CraveWise now has an active PRD for Milestone 1. Use `projects/01-cravewise/docs/PRD.md` as source of truth and `projects/01-cravewise/docs/DUMMY_DATA.md` for sample data requirements.
- `apps/cravewise` now contains a mobile-first static Next.js prototype using dummy/sample data only.
- The static prototype now includes persona selection, taste profile preview, messy craving interpretation, budget chips, exploration intent, Weekday Rush mode, backup options, feedback classification, and persona-specific insights.
- The UI has been upgraded into a polished portfolio-grade mobile web experience with a warm app shell, premium cards, chips, badges, progressive disclosure, visible trust reasoning, and a hero-style recommendation screen.
- Static logic functions were located in `apps/cravewise/data/sampleData.ts`; the expected `apps/cravewise/src/lib/staticLogic.ts` file does not exist.
- Static logic eval documentation now exists under `evals/cravewise/`, covering craving interpretation, recommendation scoring, fallback states, feedback classification, and manual insight specificity review.
- Build and TypeScript verification pass. No AI, MCP, backend, database, or live integrations were added.

## Open Questions

- Whether the portfolio site should be scaffolded before CraveWise static prototype, or whether CraveWise should start first and the portfolio site can consume case study outputs later.
- Whether future app packages should share UI from `packages/ui` immediately or wait until duplication appears.

## Next Recommended Action

Review the CraveWise v1.2 static prototype and static logic eval docs locally. Recommended next milestone: manually run the static logic eval review, then make only targeted static-logic fixes before localStorage feedback persistence.

## Last Updated

2026-05-12

