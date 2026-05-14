# CraveWise AI Evaluation Pack 5C

Date: 2026-05-14

## Evaluation Goal

Determine whether AI structured interpretation improves craving understanding compared to static rules, while deterministic scoring remains the final decision layer.

CraveWise should use AI only to extract structured craving signals. AI must not choose the final recommendation, rank catalog items, write feedback memory, create catalog truth, or claim live availability.

## Current Evidence Status

Live AI evaluation was not run locally because `OPENAI_API_KEY` was not available in this environment.

Do not fabricate AI outputs. Until a key is available, use this pack as the manual evidence template and rely on the offline checks:

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
| A | Simran | `pizza but not cheese overloaded` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill: AI helped / static was enough / AI added noise / fallback behaved correctly | Check explicit pizza intent and `avoid_cheese_heavy`. |
| B | Abhyudaya | `spicy but not oily` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Check separation of `spicy` and `avoid_oily`. |
| C | Kartik | `late night but light` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Check `late_night`, `light`, and `avoid_heavy`. |
| D | Kartik | `healthy but filling` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Check `healthy` and `filling` without medical claims. |
| E | Abhyudaya | `spicy fried snack late night` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Save prior too-oily memory first; scoring should use browser-local memory only. |
| F | Abhyudaya | `something nice but not too much` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Look for useful ambiguity handling, not overconfident ranking. |
| G | Abhyudaya | `asdf random blah` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Fallback or clarification behavior is a valid success. |
| H | Simran | `something filling under 250` | To fill after manual run | Not run locally - no API key | To fill | To fill | To fill | To fill | To fill | Check `budgetSignal.max` and avoid fake deal/availability claims. |

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
