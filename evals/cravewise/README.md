# CraveWise Evals

These are lightweight manual eval documents for the static CraveWise prototype. They are not a test runner.

Milestone 4E adds a tiny local static eval runner for selected machine-readable cases:

```bash
node evals/cravewise/run_static_evals.js
```

The runner uses no backend or live integrations. It checks only cases marked with `machineCheck: true` in `sample_cases.json`.

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

Local feedback memory checks must verify that data is stored only under `cravewise.localFeedbackMemory.v1` in the current browser and can be cleared with "Clear local demo memory".
