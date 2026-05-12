# Tech Stack

## Default Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui only when it speeds up polished UI without adding clutter
- Zod for schemas and AI output validation
- OpenAI API for AI workflows after static prototypes work
- Supabase only after local persistence needs are proven
- Vercel for deployment

## Repo Shape

This repo intentionally avoids a monorepo framework for now.

- `apps/`: deployable apps
- `packages/ui`: shared UI only after duplication appears
- `packages/ai-core`: shared AI schemas, prompt helpers, eval utilities only after patterns repeat
- `projects/`: product docs and decision records
- `evals/`: sample inputs and expected behaviors

## Dependency Rule

Do not add dependencies during documentation work. During app work, add a dependency only if it clearly reduces complexity or improves quality. Mention every new dependency in the final report.

## AI Workflow Pattern

1. Collect structured user input.
2. Convert to typed request object.
3. Call model with narrow task prompt.
4. Validate response with Zod.
5. Render user-facing summary, tradeoffs, confidence, and safe next step.
6. Log eval examples when outputs fail or surprise us.
