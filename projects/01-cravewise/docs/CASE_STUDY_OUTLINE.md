# CraveWise Case Study Outline

Date: 2026-05-14

## 1. Problem

Food ordering is often framed as browsing, but the painful user moment is decision fatigue. Users know roughly what they want, what they regret, and what constraints matter, yet most food apps push them into more lists.

## 2. Product Thesis

CraveWise is a mobile-first food decision assistant, not a food delivery marketplace. The product gives one trusted recommendation using craving, budget, context, past satisfaction, and regret patterns.

## 3. User Pain

- Too many options when hungry
- Hard to express mixed cravings like `spicy but not oily`
- Regret from heavy, oily, overpriced, stale, or unreliable meals
- Persona defaults can conflict with current craving
- Existing delivery apps optimize browsing and ordering, not decision confidence

## 4. Why One Recommendation

The wedge is decision support. One recommendation forces the system to explain tradeoffs, respect constraints, and avoid fake confidence. Backups exist, but they stay secondary so the app does not become another browsing grid.

## 5. Static MVP

The first version used dummy personas, a static catalog, local deterministic craving interpretation, and deterministic scoring. This proved the flow before adding AI or backend complexity.

Key MVP screens:

- Persona selection
- Taste profile preview
- Craving input
- One recommendation
- Backups
- Feedback
- Insights

## 6. Feedback Memory Loop

Browser-local feedback memory under `cravewise.localFeedbackMemory.v1` lets the prototype demonstrate learning without backend persistence or cross-device personalization.

Feedback can influence future deterministic scoring for the same persona in the same browser. It can also create local demo insight summaries, such as repeated too-oily feedback or would-not-reorder signals.

## 7. Taxonomy And Scoring System

Milestones 4D-4F added a local dish taxonomy and pre-AI guardrails:

- Structured craving fields
- Normalized catalog fields
- `avoid_*` negative constraints
- Hard filtering for negative constraints
- Internal `scoreBreakdown`
- Static eval harness

This made the system ready for AI because AI could fill structured fields instead of choosing recommendations.

## 8. AI Interpretation Layer

Milestone 5A added optional server-side AI structured interpretation:

```text
user craving -> server route -> strict schema -> taxonomy validation -> deterministic scoring
```

AI is allowed to extract signals. It is not allowed to recommend dishes, rank items, write memory, or claim live availability.

## 9. AI Vs Static Comparison

Milestone 5B added a comparison layer:

```text
same craving/context/persona/memory/catalog/scorer
-> static interpretation
-> AI interpretation when available
-> deterministic scoring for both
-> compare changed signals and top result
```

The comparison panel is prototype QA, not user-facing confidence.

## 10. Evaluation Learnings

Use `AI_EVALUATION_PACK_5C.md` to collect live-key evidence.

Current evidence status:

- Offline static evals pass.
- AI validation checks pass.
- Mock comparison checks pass.
- Live AI case evidence is not collected locally when `OPENAI_API_KEY` is unavailable.

Potential learning themes to fill after manual evidence:

- Where AI adds useful signal extraction
- Where static rules are enough
- Where AI adds noise
- Where fallback behavior protects the product
- Whether AI changes deterministic top results in meaningful cases

## 11. What Would Come Next

- Run live-key evaluation cases and record evidence.
- Add optional comparison logging or aggregate stats only if useful for case study evidence.
- Tune AI prompt/schema only if evidence shows consistent interpretation failures.
- Consider production persistence later, but keep feedback memory honest until auth/backend exist.
- Expand catalog or connect real supply only after recommendation quality is proven.

## 12. Portfolio Narrative

CraveWise demonstrates AI PM judgment by keeping AI bounded. The product adds AI where language understanding helps, but preserves deterministic scoring for recommendation authority, safety, and explainability.
