# CraveWise AI Evaluation Pack 5C

Date: 2026-05-14

## Evaluation Goal

Determine whether AI structured interpretation improves craving understanding compared to static rules, while deterministic scoring remains the final decision layer.

CraveWise should use AI only to extract structured craving signals. AI must not choose the final recommendation, rank catalog items, write feedback memory, create catalog truth, or claim live availability.

## Current Evidence Status

Milestone 5D live-key pass was run locally with `OPENAI_API_KEY` loaded server-side from the app environment file. The app route was exercised through `POST /api/interpret-craving`, but no accepted AI interpretations were returned during this pass:

- Cases A-G returned `interpretationSource: "static_fallback"` with `fallbackReason: "timeout"`.
- Case H returned `interpretationSource: "static_fallback"` with `fallbackReason: "api_error"`.
- The recommendation flow stayed functional because deterministic static interpretation and `scoreRecommendationStatic()` handled every case.
- No AI outputs are fabricated in this document.

Milestone 5D-A diagnosis:

- The local env file was corrected to `apps/cravewise/.env.local`; the previous `.env.local.txt` path is ignored and should not be committed.
- A minimal server-side structured-output diagnostic call reached OpenAI and returned HTTP `429` with safe error metadata: `insufficient_quota`.
- The 5-second route timeout is still intact. It can mask the upstream quota response when the 429 arrives after the timeout window, which explains the timeout-heavy 5D results.
- The no-key path was retested and returned `static_fallback` with `fallbackReason: "missing_api_key"` and no crash.
- Live AI interpretation quality still cannot be claimed until quota is resolved and accepted AI interpretations are recorded.

Milestone 5D-B alternate-provider pass:

- Gemini was added as an alternate server-side interpretation provider, selected by `AI_PROVIDER=gemini`.
- `GEMINI_API_KEY` and `GEMINI_MODEL` stay server-side; default Gemini model is `gemini-2.5-flash`.
- Gemini output uses the same `CravingInterpretation` shape and the same local validation helper before deterministic scoring.
- A Gemini smoke test succeeded for `spicy but not oily` and returned a validated interpretation with `spicy` plus `avoid_oily`.
- A current-code Gemini evidence pass accepted cases A-E, then hit fallback for F-H because of timeout / HTTP 429 provider limits.
- OpenAI provider path was retested and still fails safely through static fallback while quota-blocked.
- Live Gemini evidence is useful but still partial; do not claim complete 8/8 AI quality evidence yet.

Use this pack as live fallback evidence plus the manual evidence template for a future successful AI-response pass. Offline checks remain the deterministic baseline:

```bash
node evals/cravewise/run_static_evals.js
```

Current offline coverage:

- Static machine checks: 8/8
- AI output validation checks: 5/5
- Static vs AI comparison mock checks: 3/3

## Curated Test Matrix

| ID | Persona | Input | Prior memory | What to evaluate |
|---|---|---|---|---|
| A | Simran | `pizza but not cheese overloaded` | None | Does AI preserve pizza intent and avoid cheese-heavy interpretation? |
| B | Abhyudaya | `spicy but not oily` | None | Does AI separate positive preference `spicy` from negative constraint `avoid_oily`? |
| C | Kartik | `late night but light` | None | Does AI extract `late_night` and `avoid_heavy` / `light` correctly? |
| D | Kartik | `healthy but filling` | None | Does AI identify both health and satiety signals? |
| E | Abhyudaya | `spicy fried snack late night` | Disappointing + Too oily after `fried momos late night` | Does scoring still use local memory, not AI memory? |
| F | Abhyudaya | `something nice but not too much` | None | Does AI add useful interpretation beyond static rules? |
| G | Abhyudaya | `asdf random blah` | None | Does AI fallback or mark `needs_clarification` without breaking flow? |
| H | Simran | `something filling under 250` | None | Does AI extract budget signal without creating deal-trap recommendations? |

## Manual Evidence Template

Use the app's `Prototype QA: static vs AI interpretation` panel after each recommendation request.

| Case | Persona | Input | Static interpretation | AI interpretation | Changed fields | Static deterministic top | Deterministic top from AI-interpreted signals | Recommendation changed? | PM judgment | Case study notes |
|---|---|---|---|---|---|---|---|---|---|---|
| A | Simran | `pizza but not cheese overloaded` | `pizza`, `Pizza`, `avoid_cheese_heavy`; static also inferred `comfort` | Gemini accepted: `pizza`, `Pizza`, `avoid_cheese_heavy`, `budgetSignal.max: 800` | `preferenceSignals`, `budgetSignal` | Thin Crust Veggie Pizza from Slice Street | Thin Crust Veggie Pizza from Slice Street | No | AI helped | Gemini preserved pizza intent and cheese boundary; deterministic scoring kept the same correct top result. |
| B | Abhyudaya | `spicy but not oily` | `spicy`, `avoid_oily`, `weekend_dinner` | Gemini accepted: `spicy`, `avoid_oily`, `budgetSignal.max: 400`; sometimes adds `exploratory` | `preferenceSignals`, `budgetSignal`, `confidence` | Chilli Garlic Noodles from Urban Wok House | Chilli Garlic Noodles from Urban Wok House | No | static was enough | Gemini separated positive and negative signals correctly; static already covered the important boundary. |
| C | Kartik | `late night but light` | `late_night`, `light`, `avoid_heavy` | Gemini accepted: `late_night`, `light`, budget signal; missed `avoid_heavy` in latest run | `negativeConstraints`, `budgetSignal`, `confidence` | Chilli Garlic Steamed Dim Sums from Steam House | Chilli Garlic Steamed Dim Sums from Steam House | No | static was enough | Static better encoded light-as-avoid-heavy, though deterministic top stayed safe. |
| D | Kartik | `healthy but filling` | `Healthy Bowls`, `post_work`, `healthy`, `filling`, `heaviness: heavy` | Gemini accepted: `post_work`, `healthy`, `filling`, `heaviness: medium`, budget signal | `cuisineIntents`, `budgetSignal`, `heaviness` | Paneer Protein Bowl from Bowl Theory | Paneer Protein Bowl from Bowl Theory | No | static was enough | Gemini captured health and satiety but did not add a better outcome than static. |
| E | Abhyudaya | `spicy fried snack late night` | `snack`, `Street Food`, `late_night`, `spicy` | Gemini accepted: `snack`, `late_night`, `spicy`, budget signal; missed `Street Food` | `cuisineIntents`, `budgetSignal` | Chicken Kathi Roll from Quick Comfort Co. | Chicken Kathi Roll from Quick Comfort Co. | No | static was enough | Local too-oily memory stayed in deterministic scoring; AI did not write or use memory. |
| F | Abhyudaya | `something nice but not too much` | `weekend_dinner`, `comfort` | Gemini fallback in latest run: `timeout` | None, AI interpretation unavailable | Chilli Garlic Noodles from Urban Wok House | Not available | No | fallback behaved correctly | Vague input remains a useful future test after provider limits are stable. |
| G | Abhyudaya | `asdf random blah` | `weekend_dinner`, `comfort` | Gemini fallback in latest run: `api_error`, HTTP 429 | None, AI interpretation unavailable | Chilli Garlic Noodles from Urban Wok House | Not available | No | fallback behaved correctly | Provider limit did not break the flow; no fabricated clarification result. |
| H | Simran | `something filling under 250` | `filling`, `avoid_expensive`, `budgetSignal.max: 250` | Gemini fallback in latest run: `api_error`, HTTP 429 | None, AI interpretation unavailable | Rajma Rice Bowl from Homely Bowls | Not available | No | fallback behaved correctly | Earlier Gemini smoke/evidence calls showed budget extraction can work, but latest current-code pass hit provider limits. |

## Milestone 5D Live-Key Evidence Summary

The live-key pass did not produce accepted AI interpretations, so it cannot support a claim that AI improved any case yet.

Observed learnings:

- AI helped: Gemini preserved the important pizza and cheese-boundary signals in case A.
- Static was enough: B-E produced the same deterministic top result, and static was often equally strong or stronger on local taxonomy details.
- AI added noise: Gemini sometimes added budget signals from UI context and missed static-only taxonomy signals such as `avoid_heavy` or `Street Food`.
- Fallback behavior: confirmed across OpenAI quota/timeout, Gemini timeout, and Gemini HTTP 429 paths.
- Product implication: alternate providers can collect some live evidence without changing scoring authority, but a complete 8-case AI-quality claim still needs a stable provider quota window.

## What AI Is Allowed To Improve

- Messy natural language parsing
- Negative constraint extraction
- Ambiguous craving interpretation
- Context inference
- Clarification detection

## What AI Is Not Allowed To Control

- Final recommendation
- Ranking
- Feedback memory
- Catalog truth
- Live availability claims
- Nutrition or medical advice
- Pricing, ordering, or delivery

## AI Product Tradeoffs

AI may improve CraveWise by understanding messy language that static rules miss, especially in ambiguous phrases, mixed positive/negative constraints, context hints, and clarification needs.

The tradeoffs are real:

- Latency cost: every AI interpretation can add waiting time before recommendation.
- API dependency: the app needs a server-side key for live AI, so fallback must remain strong.
- Validation complexity: every output must be checked against local taxonomy before scoring.
- Fallback requirements: missing key, timeout, invalid schema, unsafe fields, and low-quality output must not break the flow.
- Deterministic scoring remains safer at this stage because it keeps ranking explainable, testable, local to the dummy catalog, and insulated from hallucinated restaurant or availability claims.

## Manual Evidence Collection Instructions

If `OPENAI_API_KEY` is available:

1. Start the app.
2. Run each curated test case.
3. Open the `Prototype QA: static vs AI interpretation` panel.
4. Copy the observed static interpretation, AI interpretation, changed fields, static deterministic top, deterministic top from AI-interpreted signals, and recommendation-changed status into this document.
5. Add a PM judgment for each case:
   - AI helped
   - static was enough
   - AI added noise
   - fallback behaved correctly

If `OPENAI_API_KEY` is not available:

1. Document that live AI evaluation was not run locally.
2. Keep offline validation and comparison checks intact.
3. Do not fabricate AI outputs or case-study claims.

## Case Study Evidence Notes

Use this pack to support the portfolio case study with grounded claims only:

- Strong claim allowed now: CraveWise has a controlled evaluation mechanism for comparing AI interpretation against static rules.
- Strong claim allowed now: AI is bounded to signal extraction and deterministic scoring remains the final decision layer.
- Claim not allowed yet: AI improved X% of cases, unless manual live-key evidence is collected and recorded.
