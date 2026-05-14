# CraveWise App

Status: Milestone 4F pre-AI guardrail cleanup added on top of the PRD v1.2 static prototype.

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
- `getPersonaInsightsStatic()`

All logic is local and deterministic.

## Local Dish Taxonomy

Milestone 4D adds `apps/cravewise/data/dishTaxonomy.ts` with normalized local types for dish types, cuisines, context signals, preference signals, negative constraints, regret risk flags, reliability flags, and budget fit signals.

`interpretCravingStatic()` now separates explicit dish intent, cuisine intent, context, preference, negative constraint, and budget signals instead of mixing context flags into one generic craving bucket. `scoreRecommendationStatic()` consumes those structured signals while preserving the existing product rules: explicit current craving beats persona defaults, negative constraints are strong, and browser-local feedback memory only affects the active persona.

Milestone 4E tightens taxonomy boundaries and standardizes negative constraints on the `avoid_*` convention. For example, `spicy but not oily` now keeps `spicy` in `preferenceSignals` and `avoid_oily` in `negativeConstraints`; it does not duplicate `not_oily` as a positive preference.

Recommendations now carry an internal `scoreBreakdown` with named score components for static QA. This is not exposed in the product UI.

Milestone 4F applies Claude's pre-AI guardrail cleanup. Heavy catalog items use the context-free `heavy_meal` regret flag, not `heavy_late_night`. Negative constraints are treated as hard user boundaries: matching items are filtered from returned recommendations instead of also receiving a dead `-90` score penalty. The score breakdown remains for returned recommendations and should not be read as a calibrated probability.

## Static Eval Harness

Run from the repo root:

```bash
node evals/cravewise/run_static_evals.js
```

The runner reads `evals/cravewise/sample_cases.json` and executes machine-readable checks for selected cases, including dish type, cuisine, avoid flags, top recommendation, structured signals, memory-influenced behavior, and score breakdown consistency.

## Local Feedback Memory

Milestone 3A stores submitted feedback in browser `localStorage` only, using the key:

```text
cravewise.localFeedbackMemory.v1
```

This is local demo memory from the current browser. It is not real personalization, backend persistence, AI memory, or cross-device sync.

The Insights screen includes a section titled "Local demo memory from this browser" and a "Clear local demo memory" action. Skipped feedback is not saved.

Milestone 4A passes normalized local feedback memory into static scoring for the active persona. Feedback remains browser-only and can be cleared anytime. No backend, account, AI memory, or cross-device personalization exists.

Milestone 4C keeps persona static insights and adds derived local insight summaries from saved browser feedback. These summaries use normalized failure reason codes such as `too_oily`, `wrong_craving_match`, `delivery_issue`, `reliability_issue`, `would_not_reorder`, and `not_fresh`, plus reorder intent. They are labeled as "Based on feedback saved in this browser" and disappear when local demo memory is cleared.

## Static Logic Tightening

Milestone 3B fixes an explicit-craving regression found during manual testing. If the user asks for `pizza but not cheese overloaded`, CraveWise now prioritizes that dish/cuisine intent before persona defaults and uses the dummy Thin Crust Veggie Pizza option instead of falling back to unrelated comfort food.

## Integrity Cleanup

Milestone 3C removes fake match percentages and uses honest qualitative labels: Strong match, Medium match, and Limited confidence. Fallbacks are typed objects, blocking fallbacks suppress the recommendation hero, and backup cards are only shown when distinct options exist.

## Feedback-Influenced Scoring

Milestone 4A normalizes feedback failure reasons into stable internal codes such as `too_oily`, `too_heavy`, `wrong_craving_match`, `delivery_issue`, `reliability_issue`, `would_reorder`, `would_not_reorder`, and `not_fresh`.

Saved local feedback can now adjust future static scoring for the same persona in this browser. The UI shows "Local demo memory affected this recommendation" when a recommendation was adjusted.

## Catalog Expansion

Milestone 4B expands the dummy menu catalog from 9 to 30 items. The catalog now covers pizza/Italian, Mexican/burrito, North Indian, Asian/Chinese, South Indian, healthy/light, fried/oily regret-prone, group-safe, and Weekday Rush scenarios.

This is still static dummy data. It does not represent live restaurant availability, real offers, delivery status, or orderability.

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
- Insights can show saved local demo feedback from the current browser.
- Explicit dish/cuisine hints now outrank persona defaults in static scoring.
- Local feedback can adjust static scoring for the active persona in this browser only.
- Expanded dummy catalog gives feedback-memory penalties enough alternatives to visibly change recommendations in selected scenarios.
- Insights now include local demo pattern summaries derived from saved browser feedback for the active persona.
- Static craving interpretation now uses local taxonomy signals instead of mixed craving/context flags.
- Static eval harness covers key taxonomy regressions and memory-influenced behavior.

## Guardrails

- no OpenAI API in static prototype
- no restaurant integrations
- no MCP yet
- no medical nutrition claims
- no auth or database yet
- dummy data is clearly labeled in the UI
