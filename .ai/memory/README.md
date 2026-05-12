# AI Memory

This folder is durable memory for LLM handoffs. It exists so each session can start with a small amount of context and still understand the repo state.

## Read Order

1. `AGENTS.md`
2. `.ai/memory/session-handoff-current.md`
3. `.ai/memory/blockers.md`
4. relevant `.ai/memory/features/<feature>.md`
5. relevant project PRD
6. relevant milestone prompt

## Files

- `session-handoff-current.md`: current state, active milestone, latest decisions, next action.
- `blockers.md`: blocked work with owner/action needed.
- `RELEASES.md`: demo-ready milestones and notable shipped changes.
- `deployments.log`: deployment history once apps exist.
- `features/`: one file per active feature or milestone.
- `features/archive/`: completed feature memories.

## Rule

If a task changes what should happen next, update this folder before ending the task.
