# CraveWise Static Logic Eval Report

## Summary

The current static logic appears partially aligned with CraveWise product intent. It supports the main prototype behavior: messy craving interpretation, persona-aware scoring, low-regret recommendation selection, Weekday Rush weighting, lightweight feedback classification, and persona-specific static insights.

The logic is intentionally simple and deterministic, which fits Milestone 1. The main risks are that some product-intent cases are more nuanced than the current schema: free-text feedback is limited, fallback states are string summaries rather than full decision branches, unsupported-catalog handling is weak, and some scoring/explanation behavior may feel arbitrary without more transparent score breakdowns.

No static logic was changed for this eval package.

## 2026-05-14 Update

Milestone 4C adds dynamic local insight summaries to the Insights screen while keeping `getPersonaInsightsStatic(persona)` unchanged. The summaries are derived from browser-local feedback memory for the active persona and use normalized failure reason codes plus reorder intent. Manual evals should now verify that repeated or single saved signals such as `too_oily`, `wrong_craving_match`, `delivery_issue`, `reliability_issue`, `would_not_reorder`, and `not_fresh` appear as honest local demo patterns, and that clearing `cravewise.localFeedbackMemory.v1` removes those dynamic summaries.

## 2026-05-14 Milestone 4D Update

Milestone 4D adds a local dish taxonomy layer and refactors static craving interpretation away from mixed craving/context flags. Manual evals should now inspect `explicitDishIntents`, `cuisineIntents`, `contextSignals`, `preferenceSignals`, `negativeConstraints`, and `budgetSignal`, plus catalog fields such as `dishType`, `preferenceTags`, `contextFit`, `regretRiskFlags`, `reliabilityTags`, `avoidIf`, and `budgetTier`.

Known regression checks remain mandatory: Simran asking for `pizza but not cheese overloaded` must not receive Dal Makhani, Weekday Rush should favor reliable fast options, and browser-local `too_oily` memory should still penalize oily/fried future recommendations.

## 2026-05-14 Milestone 4E Update

Milestone 4E audits taxonomy separation, standardizes negative constraints on the `avoid_*` convention, removes `not_oily` from positive `preferenceSignals`, and adds internal score breakdowns to recommendations.

The local static eval runner is:

```bash
node evals/cravewise/run_static_evals.js
```

Latest run: `CraveWise static evals passed: 8/8`.

The runner validates selected machine-readable cases for structured signals, avoid flags, expected top recommendation, memory-influenced behavior, and `scoreBreakdown.finalScore === recommendation.score`.

## 2026-05-14 Milestone 4F Update

Claude's Milestone 4E review identified two required pre-AI cleanup items and one eval gap. Milestone 4F resolves them:

- `heavy_late_night` is no longer used as a context-free catalog flag; heavy items use `heavy_meal`.
- Negative constraints remain hard user boundaries and are enforced by filtering returned recommendations.
- The dead `-90` `negativeConstraintPenalty` path was removed from normal scoring.
- The too-oily memory machine-check case includes `mustAvoidFlags` for `avoid_oily` and `fried_oily`, proving the new top recommendation avoids oily/fried flags.
- Code comments now document scoring weight principles and why `sleepy` maps to `avoid_heavy`.

## 2026-05-14 Milestone 5A Update

Milestone 5A adds optional AI structured craving interpretation while preserving deterministic recommendation scoring.

- New server boundary: `apps/cravewise/app/api/interpret-craving/route.ts`.
- Default model: `gpt-4.1-mini`, override with `OPENAI_MODEL`.
- Missing `OPENAI_API_KEY` returns `interpretationSource = static_fallback` and `fallbackReason = missing_api_key`.
- The route uses OpenAI Responses API structured outputs with `text.format.type = json_schema`, `strict = true`, and `store = false`.
- AI output is validated against local taxonomy in `apps/cravewise/data/cravingInterpretationValidation.ts`.
- Validation rejects invalid enums, missing fields, raw input mismatch, low-quality empty output, and forbidden recommendation/ranking fields.
- `scoreRecommendationStatic()` can accept a prevalidated `CravingInterpretation`, but remains the only ranking layer.
- The UI adds small status copy: `AI interpreted your craving`, `Using local rules`, or `AI unavailable, using local rules`.
- Static evals remain offline and deterministic; the runner now adds four local AI-output validation checks.

Latest local run:

```text
CraveWise static evals passed: 8/8
CraveWise AI interpretation validation checks passed: 4/4
```

## 2026-05-14 Milestone 5B Update

Milestone 5B adds `apps/cravewise/data/interpretationComparison.ts` for internal static-vs-AI interpretation QA.

- Compares static and AI interpretations across dish intent, cuisine, context, preferences, negative constraints, budget, heaviness, exploration intent, confidence, and clarification need.
- Scores the same decision twice for comparison only: once with static interpretation and once with AI interpretation when available.
- Reports changed fields, signals found by AI but not static rules, signals found by static rules but not AI, matched fields, static top result, deterministic top from AI-interpreted signals, and whether deterministic scoring changed the top pick.
- Adds a small collapsible recommendation-screen debug panel.
- Keeps static evals offline with mock comparison checks.

Latest local runner expectation after 5B:

```text
CraveWise static evals passed: 8/8
CraveWise AI interpretation validation checks passed: 5/5
CraveWise interpretation comparison checks passed: 3/3
```

## 2026-05-14 Milestone 5C Update

Milestone 5C adds portfolio evidence scaffolding without changing recommendation logic or live eval dependencies.

- `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md` defines the AI-vs-static evaluation goal, curated cases, allowed AI scope, forbidden AI control areas, product tradeoffs, and manual evidence collection instructions.
- `projects/01-cravewise/docs/CASE_STUDY_OUTLINE.md` outlines the CraveWise portfolio case study.
- Live AI evaluation was not run locally because `OPENAI_API_KEY` was unavailable.
- Offline eval behavior remains unchanged: no live OpenAI calls and no API route dependency.

## Static Logic File Paths Found

Expected file:

- `apps/cravewise/src/lib/staticLogic.ts`

Actual status:

- `apps/cravewise/src/lib/staticLogic.ts` was not found.
- Static logic functions are exported from `apps/cravewise/data/sampleData.ts`.
- The UI imports these functions in `apps/cravewise/app/page.tsx`.

## Functions Found

### `interpretCravingStatic()`

- Actual file path: `apps/cravewise/data/sampleData.ts`
- Signature found: `interpretCravingStatic(context: DecisionContext): CravingInterpretation`
- Input shape inferable: `DecisionContext`
  - `cravingText: string`
  - `budgetBand: BudgetBand`
  - `customBudget: string`
  - `occasion: Occasion`
  - `explorationIntent: ExplorationIntent`
  - `heaviness: "Light" | "Medium" | "Filling"`
  - `availableTime: "Under 20 min" | "20-30 min" | "30-45 min" | "No rush"`
  - `upcomingConstraint: "Meeting soon" | "Need light meal" | "Can't feel sleepy" | "No constraint"`
- Output shape inferable: `CravingInterpretation`
  - `craving_type: string[]`
  - `cuisine_hint: string | null`
  - `dish_hint: string | null`
  - `avoid: string[]`
  - `budget_max: number | null`
  - `occasion: string | null`
  - `heaviness: "light" | "medium" | "heavy" | null`
  - `exploration_intent: "safe" | "somewhat_new" | "surprise_me"`
  - `confidence: "low" | "medium" | "high"`
  - `needs_clarification: boolean`
- Unclear contracts:
  - Function contract unclear — needs clarification.
  - Whether `craving_type` values are formally constrained.
  - Whether Weekday Rush fields should be inferred from free text or only from UI controls.
  - Whether unsupported cuisines should trigger static-data limitation separately from vague input.

### `scoreRecommendationStatic()`

- Actual file path: `apps/cravewise/data/sampleData.ts`
- Signature found: `scoreRecommendationStatic(persona: Persona, context: DecisionContext, feedbackMemory?: ScoringFeedbackMemory[]): Recommendation[]`
- Input shape inferable:
  - `Persona`
  - `DecisionContext`
- Output shape inferable: `Recommendation[]`
  - Each recommendation includes:
    - `item: MenuItem`
    - `score: number`
    - `type: "primary" | "safe" | "explore"`
    - `confidence: "limited" | "medium" | "high"`
    - `budgetFit: string`
    - `reason: string`
    - `avoidedNote: string`
    - `tradeoff: string`
- Unclear contracts:
  - Function contract unclear — needs clarification.
  - Whether the returned array is guaranteed to have exactly three items.
  - Whether score is intended to be a raw heuristic score or a user-visible percentage.
  - Whether score thresholds should suppress primary recommendations or only change confidence.
  - What should happen when `scored` is empty.

### `classifyFeedbackStatic()`

- Actual file path: `apps/cravewise/data/sampleData.ts`
- Signature found: `classifyFeedbackStatic(sentiment: "Loved it" | "Meh" | "Disappointing" | "Skipped" | "", reasons: string[], note: string): FeedbackClassification`
- Input shape inferable:
  - `sentiment`: one of `Loved it`, `Meh`, `Disappointing`, `Skipped`, or empty string
  - `reasons`: string array, typically from feedback reason chips
  - `note`: free-text feedback
- Output shape inferable: `FeedbackClassification`
  - `sentiment: "positive" | "mixed" | "negative"`
  - `taste_rating: number | null`
  - `value_rating: number | null`
  - `heaviness: "light" | "medium" | "heavy" | null`
  - `regret_level: "low" | "medium" | "high"`
  - `reorder_intent: "yes" | "maybe" | "no"`
  - `failure_reasons: string[]`
  - `learning: string`
- Unclear contracts:
  - Function contract unclear — needs clarification.
  - Whether free-text note should classify oily, value, portion, or delivery issues.
  - Whether skipped feedback should produce low regret or no classification.
  - Whether failure reasons should use display strings or normalized ids.

### `getPersonaInsightsStatic()`

- Actual file path: `apps/cravewise/data/sampleData.ts`
- Signature found: `getPersonaInsightsStatic(persona: Persona): string[]`
- Input shape inferable: `Persona`
- Output shape inferable: `string[]`
- Unclear contracts:
  - Function contract unclear — needs clarification.
  - Whether the output must always include exactly six insights.
  - Whether insight categories must map 1:1 to taste, regret, budget, exploration, reorder, and quality.
  - How future local feedback persistence should merge with static persona insights.

### `getFallbackState()`

- Actual file path: `apps/cravewise/data/sampleData.ts`
- Signature found: `getFallbackState(context: DecisionContext, recommendations: Recommendation[], interpretation: CravingInterpretation): string`
- Input shape inferable:
  - `DecisionContext`
  - `Recommendation[]`
  - `CravingInterpretation`
- Output shape inferable: `string`
- Unclear contracts:
  - Function contract unclear — needs clarification.
  - Whether fallback state should be a string or structured object.
  - Whether fallback should block recommendation display or only annotate it.
  - Whether unsupported catalog coverage has a distinct fallback state.

## Category Readiness

| Eval Category | Status | Rationale |
|---|---|---|
| Craving interpretation | Partially ready | Handles common keywords, vague input, cuisine hints for Italian/Pizza/Mexican, avoid signals for oily/cheese overloaded. Does not infer Weekday Rush time/meeting from free text into structured fields. |
| Recommendation scoring | Partially ready | Persona fit, budget, occasion, craving tags, novelty, regret risk, and Weekday Rush ETA/reliability are represented. Score transparency and empty/no-match behavior are weak. |
| Fallback states | Weak | Vague, low budget, low score, and high-regret notes exist as strings, but fallback behavior is not yet a structured decision contract. Unsupported catalog handling appears weak. |
| Feedback classification | Partially ready | Sentiment, chip reasons, heaviness, regret, reorder, and value rating are represented. Free-text classification is limited and may create false confidence. |
| Insight specificity | Ready for manual review | Persona-specific static insights exist and generally mention context, cuisine/dish type, budget/regret/reorder patterns. This should remain a manual review category. |

## Likely Weak Spots

### Craving Interpretation Consistency

The parser is regex-based and useful for demo cases, but it may behave inconsistently for product-intent phrases. It recognizes `spicy`, `mast`, `light`, `Italian`, `pizza`, `Mexican`, `burrito`, `oily`, and `cheese overloaded`, but it does not appear to map all desired concepts into stable normalized values.

Risk examples:

- `comforting` vs `comfort`
- `too cheesy` vs `cheese overloaded`
- `lunch in 20 mins meeting after this` not becoming structured Weekday Rush fields
- Unsupported cuisines becoming generic comfort rather than static-data limitation

### Scoring Weight Transparency

The scoring logic is deterministic and readable in code, but the UI-facing recommendation does not expose the score breakdown. This can make recommendations feel arbitrary when the primary pick is surprising.

Risk examples:

- User cannot tell whether budget, persona fit, craving match, ETA, or regret avoidance dominated.
- Raw score is displayed like a percentage after clamping in UI, but the underlying score is not necessarily calibrated as a percentage.

### Feedback Classification False Confidence

Feedback classification is chip-led with limited free-text parsing. It handles heaviness from note text, but other feedback phrases may not classify correctly without matching reason chips.

Risk examples:

- `portion was tiny` may not map to `Portion issue` unless chip is selected.
- `delivery ruined it` may not map to reliability issue because that reason is not currently in the chip list.
- `too oily and not worth it` may not infer both oily and value from text alone.

### Insight Repetition/Staleness

Insights are static persona strings. They are strong for Milestone 1, but once local feedback is added, static-only insights may feel stale if they do not reflect recent saved feedback.

Risk examples:

- User submits negative feedback, but insights remain unchanged.
- Repeated demo runs show identical insights regardless of choices.

### Fallback Dead Ends

Fallback state currently returns copy, not a structured action plan. The UI can display a note, but there is no enforced behavior such as blocking primary recommendation, showing only backups, or prompting for specific clarification.

Risk examples:

- Vague input still allows a confident recommendation screen.
- Low budget can still show an option above budget with insufficient action.
- Unsupported catalog input may produce an unrelated recommendation.

## Current Alignment With Product Intent

The current logic supports the prototype's main wedge: one reasoned recommendation grounded in dummy taste memory, budget, context, and regret patterns. It is strong enough for a static Milestone 1 demo.

Before adding AI or persistence, the next best step is to use this eval spec to manually score behavior, then make only the smallest targeted static-logic improvements needed for trust: structured fallbacks, clearer scoring explanations, and safer feedback classification.
