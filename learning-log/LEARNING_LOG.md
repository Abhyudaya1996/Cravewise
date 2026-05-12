# Learning Log

Update after every meaningful task.

## 2026-05-12 - Portfolio OS Documentation Pass

- Milestone: documentation and orchestration scaffold.
- Changed: tightened repo operating rules, memory workflow, milestone expectations, and project docs.
- Product tradeoff: prioritized durable clarity over starting app code immediately.
- Technical tradeoff: kept repo framework-free until app scaffolding begins.
- Next action: start CraveWise static prototype.

## 2026-05-12 - CraveWise Static Prototype

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: built a mobile-first Next.js clickable flow with Home, Taste Profile, Craving Input, Recommendation, Backup Options, Feedback, and Insights.
- Product tradeoff: kept the core wedge as one primary recommendation, with backups hidden behind an explicit escape hatch.
- Technical tradeoff: used plain CSS and local TypeScript sample data instead of Tailwind/shadcn to keep the first prototype lightweight.
- Verification: `npm run build`, `npm run lint`, and `npm audit --json` passed.
- Next action: review the local prototype, then decide whether to add a transparent rule-based scoring layer before the AI workflow.

## 2026-05-12 - CraveWise v1.2 Static Prototype Expansion

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: added PRD v1.2 logic for persona selection, multi-label personalization model, craving interpretation, budget chips, exploration intent, Weekday Rush, local scoring, feedback classification, and persona-specific insights.
- Product tradeoff: added richer decision logic while keeping the prototype static and avoiding AI/MCP/live supply-side integrations.
- Technical tradeoff: kept all logic in local deterministic TypeScript utilities instead of introducing backend routes or shared packages.
- Verification: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: review the v1.2 static prototype, then decide between local feedback persistence/evals and AI workflow with schema validation.

## 2026-05-12 - CraveWise Portfolio UI Polish

- Milestone: CraveWise Milestone 1 static prototype.
- Changed: upgraded the prototype into a warmer, more premium mobile web product and componentized the UI around the requested product components.
- Product tradeoff: made the recommendation screen the strongest visual moment while keeping backups hidden as a secondary path.
- Technical tradeoff: continued using plain CSS and local React components instead of adding UI dependencies.
- Verification: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox because Windows blocked stale `.next` cleanup.
- Next action: review the polished prototype in browser, then move to local feedback persistence and eval cases.
