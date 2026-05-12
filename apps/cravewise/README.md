# CraveWise App

Status: Milestone 1 static prototype implemented and updated to PRD v1.2.

This is a mobile-first clickable prototype using dummy/sample data only. It does not use AI, MCP, backend routes, database, auth, live restaurant data, Swiggy/Zomato integrations, payments, or delivery tracking.

The latest UI pass makes the product feel more premium, calm, personal, and food-intelligent while keeping one recommendation as the core focus. It adds a stronger mobile app shell, richer persona cards, a clearer taste-memory panel, a hero recommendation screen, visible trust reasoning, secondary backup options, lightweight feedback, and specific insight cards.

## Run Locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
npm run lint
```

## Current Flow

- Home
- Persona Selection
- Taste Profile Preview
- Craving Input
- Recommendation
- Backup Options
- Feedback
- Insights

## Static Logic

- `interpretCravingStatic()`
- `scoreRecommendationStatic()`
- `classifyFeedbackStatic()`
- `generateInsightsStatic()`

All logic is local and deterministic.

## Key UI Components

- `MobileShell`
- `ProgressStepper`
- `PersonaCard`
- `TasteMemoryPanel`
- `CravingInputPanel`
- `BudgetChipGroup`
- `OccasionSelector`
- `ExplorationSelector`
- `RecommendationHeroCard`
- `TrustReasonBlock`
- `AvoidedPatternsBlock`
- `BackupOptionCard`
- `FeedbackButtonGroup`
- `FeedbackReasonChips`
- `InsightCard`

## Latest UI Polish

- Warm off-white shell with cream cards, soft borders, and restrained food-inspired accents.
- One-screen-one-decision flow with backups hidden behind "Not feeling this?"
- Recommendation hero emphasizes taste match, regret risk, budget fit, exploration mode, and dummy ETA.
- Trust blocks explain why the pick fits and what CraveWise avoided.
- Feedback remains lightweight with emotional buttons, reason chips, and optional text.

## Guardrails

- no OpenAI API in static prototype
- no restaurant integrations
- no MCP yet
- no medical nutrition claims
- no auth or database yet
- dummy data is clearly labeled in the UI
