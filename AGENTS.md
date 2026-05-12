# AGENTS.md - AI PM Portfolio OS

This repo is a portfolio operating system for building serious AI Product Manager proof of work. Every agent or LLM session must protect product clarity, scope control, and durable memory.

## Role Split

The human owns product judgment, priority, acceptance decisions, tradeoffs, final review, and public portfolio narrative.

The AI agent owns scoped execution, verification, reporting, and updating durable memory after work.

## Startup Ritual

Before working on any milestone, read:

1. `.ai/memory/README.md`
2. `.ai/memory/session-handoff-current.md`
3. `.ai/memory/blockers.md`
4. relevant `.ai/memory/features/<feature>.md` if present
5. relevant project PRD
6. relevant milestone prompt under `codex/prompts/`

Do not load the whole repo into context unless necessary. Use the smallest set of files that can answer the task.

## Product Standards

Every project must answer:

1. What painful user decision or workflow are we improving?
2. Why is AI useful here?
3. Where should AI be constrained?
4. How do we know the output is good?
5. What tradeoffs did we make?

Build workflows, not generic chatbots. Every screen should have one primary user job. Every AI output should be structured, explainable, and reviewable.

## Technical Standards

- Use Next.js App Router, TypeScript, and Tailwind when app work begins.
- Use Zod or equivalent schema validation for LLM outputs.
- Keep prompts separate from UI components.
- Keep AI orchestration in `packages/ai-core` only after repeated patterns exist.
- Do not add dependencies without explaining why.
- Do not expose secrets or hard-code API keys.
- Prefer local mock data before external services.

## AI Guardrails

- Validate structured outputs before rendering.
- Add fallback states for invalid or incomplete model responses.
- Make uncertainty visible when data is incomplete.
- Avoid unsupported medical, financial, legal, or career certainty.
- Do not expose private chain-of-thought.
- Show concise reasons, assumptions, and tradeoffs instead of hidden reasoning.

## Execution Discipline

Before changes: identify current milestone, state scope and out-of-scope, inspect relevant docs, and avoid touching unrelated files.

After changes: summarize changed files, explain how to run or verify, update milestone tracker and memory files, report assumptions and risks, and do not claim completion unless verification ran or the reason it could not run is explicit.

## Done Means

A task is done only when it supports a documented product requirement, milestone state is updated, relevant memory files are updated, build/lint/test status is reported when code changed, no secrets are exposed, and case study notes capture meaningful product decisions.
