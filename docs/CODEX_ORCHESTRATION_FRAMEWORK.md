# Codex Orchestration Framework

## Purpose

This repo will be touched by multiple LLMs. The orchestration layer prevents context loss, repeated explanations, scope creep, and stale milestone state.

## Durable Memory

Important decisions live in files, not chat history.

```text
.ai/memory/
  README.md
  session-handoff-current.md
  blockers.md
  RELEASES.md
  deployments.log
  features/
    <feature>.md
    archive/
```

## Startup Order

Every agent starts with `AGENTS.md`, `.ai/memory/README.md`, current handoff, blockers, relevant feature memory, relevant project PRD, and relevant Codex prompt.

## Feature Memory Rule

Create a feature memory file before app work starts. Update it after each task with scope changes, acceptance status, product decisions, technical decisions, verification results, and lessons learned.

## Milestone Update Rule

After each task, update both root `docs/MILESTONE_TRACKER.md` and the relevant project `docs/MILESTONE_TRACKER.md`. Use evidence links, not vibes.

## Prompt Format

```text
WHERE:
CONTEXT:
TASK:
OUT OF SCOPE:
VERIFY:
UPDATE AFTER:
REPORT:
```

## Failure Modes To Prevent

| Failure | Prevention |
|---|---|
| LLM repeats context gathering | Use README, AGENTS, memory, feature files. |
| LLM expands scope | Put explicit out-of-scope in every prompt. |
| Docs drift from product | Update trackers and case notes after each task. |
| AI becomes generic chatbot | Enforce PRD flows and structured outputs. |
| Claims without verification | Require verify section in every final report. |
