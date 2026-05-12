# CraveWise Prompt 01: Static Prototype

## WHERE

Repo: `ai-pm-portfolio-os`
App path: `apps/cravewise`
Project docs: `projects/01-cravewise/docs`

## CONTEXT

Read first:

- `AGENTS.md`
- `.ai/memory/session-handoff-current.md`
- `.ai/memory/features/cravewise-static-prototype.md`
- `projects/01-cravewise/docs/PRD.md`
- `projects/01-cravewise/docs/DUMMY_DATA.md`

The CraveWise PRD v1.2 is the active source of truth for Milestone 1.

## TASK

Build only `Milestone 1: Static Prototype` from the PRD.

Required screens:

1. Home
2. Persona Selection
3. Taste Profile Preview
4. Craving Input
5. Recommendation
6. Backup Options
7. Feedback
8. Insights

Use dummy/sample data only, following `DUMMY_DATA.md`. Include Weekday Rush mode with dummy ETA data only.

## OUT OF SCOPE

- OpenAI API
- backend
- database
- auth
- Swiggy/Zomato integration
- scraping
- MCP
- payments
- delivery tracking
- live restaurant availability
- medical or nutrition advice

## VERIFY

- User can complete the full clickable flow.
- Six named personas are visible.
- Craving input supports messy examples.
- Budget, occasion, exploration, heaviness, Weekday Rush time, and Weekday Rush constraint controls exist.
- One primary recommendation is shown before backup options.
- Backup options are hidden until requested.
- Feedback includes chips, skip, and custom text box.
- Insights are persona-specific.
- Fallback states exist for vague craving, low budget, high regret risk, and no strong match.
- No AI/API/MCP/backend/database code exists.
- App runs locally.

## UPDATE AFTER

- `.ai/memory/session-handoff-current.md`
- `.ai/memory/features/cravewise-static-prototype.md`
- `docs/MILESTONE_TRACKER.md`
- `projects/01-cravewise/docs/MILESTONE_TRACKER.md`
- `learning-log/LEARNING_LOG.md`
- `projects/01-cravewise/docs/CASE_STUDY_NOTES.md`

## REPORT

Report files changed, run command, verification result, assumptions, and next milestone.
