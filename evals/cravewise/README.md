# CraveWise Evals

These are lightweight manual eval documents plus a small local static eval runner for CraveWise.

Milestone 4E adds a tiny local static eval runner for selected machine-readable cases:

```bash
node evals/cravewise/run_static_evals.js
```

The runner uses no backend, live integrations, or live AI calls. It checks only cases marked with `machineCheck: true` in `sample_cases.json`, plus local malformed AI-output validation fixtures.

Checks should cover recommendation relevance, regret-risk explanation, constraint handling, refusal of medical or nutrition claims, feedback classification, and local demo memory persistence.

## Current Lightweight Coverage

- Vague craving clarification
- Budget too low
- High regret risk
- Weekday Rush
- Unsafe nutrition/medical claim
- Feedback classification
- Feedback reason normalization, including legacy labels for "Too oily", "Would not reorder", and "Not fresh"
- Local feedback memory persistence
- Explicit dish intent regression: Simran asking for non-cheese-heavy pizza must not receive Dal Makhani or another unrelated persona-default comfort food.
- Integrity cleanup: no fake match percentages, no duplicate backups, typed fallbacks, active-persona fallback checks, and blocking fallbacks suppressing the recommendation hero.
- Local feedback-influenced scoring: normalized reason codes, browser-only memory scoring adjustments, memory influence notes, `would_not_reorder` / `not_fresh` patch coverage, and clear-memory reset behavior.
- Catalog expansion: 30 dummy menu items, persona coverage, category diversity, visible Abhyudaya too-oily memory ranking change, Weekday Rush Mexican depth, deal-trap guardrails, and group-safe options.
- Dynamic local insights: active-persona browser feedback produces local demo pattern summaries for too-oily feedback, wrong craving match, reorder/non-reorder signals, delivery/reliability issues, and freshness concerns.
- Local dish taxonomy: structured craving signals for explicit dish intent, cuisine intent, context, preference, negative constraints, and budget; catalog items expose normalized dish, context, regret, reliability, and avoid fields.
- Taxonomy QA and score explainability: negative constraints use the `avoid_*` convention, `not_oily` is not duplicated as a positive preference signal, recommendations include internal score breakdowns, and selected static eval cases can run locally.
- Pre-AI guardrail cleanup: heavy items use `heavy_meal`, negative constraints are hard-filtered instead of double-penalized, and the too-oily memory case proves the new top avoids oily/fried flags.
- AI structured interpretation guardrails: malformed mock AI outputs are rejected for invalid taxonomy values, forbidden recommendation fields, and raw-input mismatch without calling OpenAI.
- AI vs static interpretation comparison: mock checks verify changed-field detection, deterministic top-recommendation comparison, and graceful AI-unavailable comparison.
- AI evaluation pack: `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md` provides a manual evidence template for live-key AI vs static review without changing deterministic evals.

Local feedback memory checks must verify that data is stored only under `cravewise.localFeedbackMemory.v1` in the current browser and can be cleared with "Clear local demo memory".

## AI Interpretation Manual Test Cases

Milestone 5A adds optional AI signal extraction through `apps/cravewise/app/api/interpret-craving/route.ts`. Milestone 5D adds provider selection with `AI_PROVIDER=openai | gemini`. These cases should be reviewed manually in the app because the static eval runner must remain deterministic and must not depend on live OpenAI or Gemini calls.

- Simran + `pizza but not cheese overloaded`: AI may extract `pizza`, `Pizza`, and `avoid_cheese_heavy`, but deterministic scoring must still choose a non-cheese-heavy pizza/Italian option or an honest fallback. It must not return Dal Makhani Rice Bowl.
- `spicy but not oily`: AI should put `spicy` in `preferenceSignals` and `avoid_oily` in `negativeConstraints`; returned recommendations must avoid oily/fried flags.
- `late night but light`: AI should include `late_night`, `light`, and `avoid_heavy`; returned recommendations should avoid heavy meals.
- `healthy but filling`: AI should include `healthy` and `filling` without making medical or nutrition claims.
- `fried momos late night` after prior `too_oily` local memory: deterministic scoring should still penalize oily/fried options for the active persona.
- Nonsense or vague input: the app should fall back gracefully to local rules or show clarification behavior, not invent coverage.
- No selected provider key: the UI should show `AI unavailable, using local rules`, and recommendations should still work.
- Timeout or API error: the route should return `static_fallback` metadata and the client should use `interpretCravingStatic()`.
- Invalid enum or forbidden recommendation field: validation should reject the output and use static fallback.

## AI vs Static Comparison Manual Cases

Milestone 5B adds a small prototype QA comparison panel after a recommendation request. Use it to inspect whether AI interpretation changes structured signals and whether deterministic scoring would choose a different top result from those signals.

- Simran + `pizza but not cheese overloaded`
- `spicy but not oily`
- `late night but light`
- `healthy but filling`
- `fried momos late night` after prior `too_oily` browser-local memory
- Ambiguous input: `something nice but not too much`
- Nonsense input fallback
- No `OPENAI_API_KEY` fallback

The panel is for QA only. It holds persona, craving input, budget/context, local feedback memory, catalog, and `scoreRecommendationStatic()` constant. Only the interpretation source differs. It should not be treated as user-facing confidence, AI ranking, or production personalization.

## AI Evaluation Pack

Milestone 5C adds `projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md`.

Use it to collect live-key manual evidence for:

- explicit negative constraints
- preference plus avoid constraints
- context and lightness
- ambiguous health/satiety language
- feedback-memory-sensitive scoring
- ambiguous natural language
- nonsense or low-quality input fallback
- budget-sensitive interpretation

If `OPENAI_API_KEY` is unavailable, keep the live AI rows marked as not run locally. Do not fabricate AI outputs.
