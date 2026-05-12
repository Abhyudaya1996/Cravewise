# Architecture: CraveWise

## Default Architecture

```text
User Input
  ↓
Structured Form / Scenario Flow
  ↓
API Route
  ↓
Load Context + Memory
  ↓
AI Workflow / Agent Modules
  ↓
Schema Validation
  ↓
User-Facing Cards / Report
  ↓
Feedback / Scoring
  ↓
Memory + Insights
```

## Engineering Rules

- Keep UI separate from AI logic.
- Keep prompts in `lib/ai/prompts`.
- Keep schemas in `lib/ai/schemas`.
- Validate every model output.
- Add fallback output.
- Add tests for deterministic scoring utilities.

## Suggested App Folders

```text
app/
  page.tsx
  api/
components/
lib/
  ai/
    prompts.ts
    schemas.ts
    workflow.ts
  data/
  scoring/
docs/
```
