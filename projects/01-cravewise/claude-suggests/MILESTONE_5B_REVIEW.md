# CraveWise Milestone 5B — Claude Review

**Date:** 2026-05-14
**Reviewer role:** Senior PM + Engineer
**Scope:** AI vs Static Interpretation Comparison. Verify that comparison is fair, useful, honest, and does not weaken deterministic scoring or one-recommendation UX.

All findings verified against actual code.

---

## Critical Question Review

### Q1: Does 5B actually help evaluate whether AI interpretation adds value?

**Verdict: Yes. Strong, fair comparison.**

`compareInterpretations()` holds constant:
- Same `persona`
- Same `context` (craving, budget, occasion, etc.)
- Same `feedbackMemory`
- Same `catalog`
- Same `scoreRecommendationStatic()` scorer
- Same deterministic ranking algorithm

Only variable: the `interpretation` object (static regex vs AI).

**Result:** A controlled experiment showing whether AI-extracted signals lead to a different top recommendation and which signals differ. This directly answers "Does AI interpretation add value?"

**Example output:**
```
Interpretation changed 2 signal fields.
AI interpretation added: pizza (to cuisineIntents)
AI interpretation missed: comfort (from preferenceSignals)
Deterministic top changed from: Dal Makhani to Thin Crust Veggie Pizza
```

This is genuinely useful for evaluating whether AI is an improvement over static rules.

---

### Q2: Does it preserve deterministic scoring as the source of truth?

**Verdict: Yes. Scoring is never touched.**

Both paths call identical code:
```typescript
const staticRecommendations = scoreRecommendationStatic(persona, context, feedbackMemory, staticInterpretation);
const aiRecommendations = aiInterpretation
  ? scoreRecommendationStatic(persona, context, feedbackMemory, aiInterpretation)
  : [];
```

Same scorer, same rules, same ranking algorithm. The only input that differs is `interpretation`. The comparison shows what *the deterministic scorer decides* when given different signal inputs. It does not replace or second-guess the scorer.

The recommendation shown to the user is always from the deterministic scorer, never from AI. The comparison panel is debug/QA only — it does not affect the primary recommendation.

---

### Q3: Does the comparison avoid implying AI recommends food?

**Verdict: Yes. Scrupulously careful labeling.**

**Prohibited copy not found:**
- ❌ "AI recommended" — Not present
- ❌ "AI pick" — Not present
- ❌ "AI top" — Not present
- ❌ "AI suggests" — Not present

**Actual copy used:**
- ✓ `"Deterministic top from AI-interpreted signals"` — Clear: deterministic scorer applied to AI signals
- ✓ `"Signals found by AI but not static rules"` — Factual: signal comparison, not recommendation
- ✓ `"Signals found by static rules but not AI"` — Factual: signal comparison
- ✓ `"Prototype QA: static vs AI interpretation"` — Honest framing: this is QA, not the recommendation

**Key honesty:** The label "Deterministic top from AI-interpreted signals" makes clear that the scorer, not AI, selected the recommendation. The two recommendations are *results of the same deterministic function* applied to different signal inputs. AI did not choose — it only provided signals.

---

### Q4: Is the debug panel useful without weakening the one-recommendation UX?

**Verdict: Yes. Collapsible, optional, non-disruptive.**

**Implementation:**
```typescript
<details className="interpretation-comparison-panel">
  <summary>Prototype QA: static vs AI interpretation</summary>
  <div className="comparison-body">
    {/* comparison details */}
  </div>
</details>
```

**Behavior:**
- Panel is hidden by default (`<details>` element)
- Click header to expand — user controls visibility
- Does not distract from primary recommendation
- Label clearly marks it as "Prototype QA" — not a primary feature
- Closed by default, so casual users never see it

**UX impact:** Minimal. Power users and PMs can expand to debug. Casual users see only the primary recommendation. The one-recommendation thesis is preserved.

---

### Q5: Are "signals found by AI but not static rules" / "signals found by static rules but not AI" framed carefully?

**Verdict: Yes. Neutral, factual framing.**

**Labels avoid:**
- ❌ "AI found signals static missed" — Implies AI is better
- ❌ "AI overclaimed signals" — Implies AI is wrong
- ❌ "Static missed signals AI caught" — Implies static is incomplete

**Actual labels:**
- ✓ `"Signals found by AI but not static rules"` — Pure set difference, no judgment
- ✓ `"Signals found by static rules but not AI"` — Pure set difference, no judgment

**Framing is symmetric** — neither is presented as superior. Both differences are shown. This lets the reader make their own judgment about whether AI differences are improvements or hallucinations.

The fact that both added and missed signals are shown side-by-side is important. It prevents narrative bias (e.g., emphasizing only what AI adds and hiding what it misses).

---

### Q6: Are evals adequate while staying offline and deterministic?

**Verdict: Yes. Strong coverage, no live API calls.**

**Eval breakdown:**

| Category | Count | Type | Offline? |
|---|---|---|---|
| Static interpretation cases | 25 | `machineCheck: true` | Yes |
| AI validation checks | 5 | Schema/enum validation | Yes |
| Interpretation comparison checks | 3 | Comparison logic | Yes |
| **Total** | **33** | All deterministic | **Yes** |

**New comparison eval cases:**

1. **`comparison_detects_changed_fields`**
   - Validates: When AI adds pizza to cuisineIntents, `changedFields` includes `"cuisineIntents"`
   - Validates: `addedByAI` shows pizza was added
   - Tests: Signal diff detection logic

2. **`comparison_detects_recommendation_change`**
   - Validates: When AI interpretation differs, top recommendation may change
   - Tests: Deterministic scoring applied to both interpretations

3. **`comparison_handles_ai_fallback`**
   - Validates: When AI is null, comparison returns `aiInterpretation: null` with graceful note
   - Validates: `aiTopRecommendation` is null, comparison doesn't falsely mark `recommendationChanged`
   - Tests: Null handling and fallback logic

**No live API calls:** Evals use static interpretation object shapes and mocked comparison results. CI can run without OPENAI_API_KEY.

**Result:** `33/33 evals passing` — all deterministic, all offline.

---

### Q7: Is this useful for the final portfolio case study?

**Verdict: Yes. Strong case study material.**

The comparison directly demonstrates:

1. **System design thinking:** CraveWise is built as layers (signal extraction, validation, deterministic scoring, fallback). Milestone 5B shows this layering working correctly — AI and static interpretation plug into the same deterministic scorer.

2. **AI integration discipline:** AI is optional and well-bounded. When it fails, the system falls back silently. When it succeeds, you can measure its impact precisely using the comparison.

3. **Product honesty:** The UI never claims AI chose the recommendation. The copy is careful. The debug panel is clearly marked QA, not a user feature.

4. **Evaluability:** The comparison makes it easy to show reviewers that AI interpretation does or does not improve recommendations. Quantifiable signals added/missed. Fair comparison (same scorer, same context).

**For the case study, you can show:**
- Before 5A: Only static regex interpretation → recommendation X
- After 5A: AI interpretation available, now can show static vs AI side-by-side
- After 5B: Can measure whether AI changes the recommendation and in what ways
- Example: "In 6 of 10 test cases, AI interpretation added context_signals that static rules missed, resulting in more context-aware recommendations. In 2 cases, AI hallucinated unnecessary cuisine intents that slightly changed ranking but did not alter the top recommendation."

This is strong portfolio evidence that you understand AI integration, measurement, and honesty.

---

### Q8: What must be fixed before commit/push?

**Nothing critical.** All tests pass, build passes, lint passes.

**Pre-commit checklist:**
- [x] npm run lint — passed
- [x] npm run build — passed
- [x] node evals/cravewise/run_static_evals.js — 33/33 passed (25 static + 5 validation + 3 comparison)
- [x] compareInterpretations() logic verified
- [x] UI copy avoids prohibited phrases
- [x] Panel is collapsible and non-disruptive
- [x] Null/unavailable AI handled gracefully
- [x] Fair comparison (same scorer, context, persona)

The implementation is ready to commit.

---

### Q9: What should be fixed before the next milestone?

**Two optional improvements (not blockers):**

1. **Comparison result logging:** Add optional debug logging of comparison results to help measure AI effectiveness. Example:
   ```typescript
   if (comparison.recommendationChanged) {
     console.debug("Interpretation comparison: recommendation changed", {
       from: comparison.staticTopRecommendation,
       to: comparison.aiTopRecommendation,
       fieldsChanged: comparison.changedFields,
     });
   }
   ```
   This would help you analyze patterns in how often AI changes recommendations and in which signal dimensions.

2. **Comparison statistics export:** Add optional function to aggregate comparison results across multiple test runs, producing stats like:
   - "AI added new signals in X% of cases"
   - "Top recommendation changed in Y% of cases"
   - "Average fields changed per comparison"

   This would be useful for the case study (e.g., "Across 20 test cases, AI interpretation changed 3.2 signal fields on average and altered the top recommendation in 45% of cases").

**Not blocking. These are nice-to-haves for Milestone 6.**

---

### Q10: What is optional polish or noise?

| Item | Impact | Recommendation |
|---|---|---|
| Visual styling of comparison panel (colors, spacing) | UX polish | Nice-to-have for Milestone 6 |
| Animated expand/collapse transition | UX polish | Noise — not needed for prototype |
| Detailed explanation of why recommendation changed (e.g., which signal caused it?) | Analysis depth | Nice-to-have for case study, not needed now |
| Export comparison results as JSON | Dev workflow | Nice-to-have, not needed now |
| Keyboard shortcut to expand/collapse panel | Accessibility | Noise — not needed for prototype |
| Side-by-side visual diff of signal arrays | Visual clarity | Nice-to-have for Milestone 6 |

**None of these block commit.** They are enhancements for future milestones.

---

## Summary

| Criterion | Status | Notes |
|---|---|---|
| Compares AI vs static fairly? | ✓ Excellent | Same scorer, context, persona — only interpretation differs |
| Deterministic scoring preserved? | ✓ Preserved | Both paths call identical `scoreRecommendationStatic()` |
| Avoids implying AI recommends? | ✓ Careful | "Deterministic top from AI-interpreted signals" — scorer is clear authority |
| Debug panel non-disruptive? | ✓ Good | Collapsible `<details>`, hidden by default, QA-labeled |
| Signal diff labels neutral? | ✓ Symmetric | Both added/missed shown equally, no bias |
| Evals adequate offline? | ✓ Strong | 33/33 passing (25 static + 5 validation + 3 comparison), no API calls |
| Case study useful? | ✓ Strong | Shows AI integration discipline, measurable impact, honesty |
| Build/lint | ✓ Clean | All pass |
| Overall readiness | ✓ Ready | Commit and push |

---

## Final Verdict

**Status: READY TO COMMIT.**

Milestone 5B correctly adds measurement and transparency to AI interpretation without weakening the product or the deterministic core. The comparison is fair, the labels are honest, the debug panel is unobtrusive, and the evals are adequate.

This is strong portfolio material. You can now show reviewers a controlled experiment: "Here are the same craving and context. Static rules produce X. AI interpretation produces Y. These are the signals that differ. The deterministic scorer evaluated both fairly."

**Pre-commit action:**
```bash
git add .
git commit -m "Milestone 5B: AI vs static interpretation comparison for QA and portfolio case study"
git push origin feature/cravewise-ai-interpretation
```

**Post-commit next steps:**
1. Review comparison results with several manual test cases (once OPENAI_API_KEY is available)
2. Document case study findings: In what dimensions does AI interpretation differ from static? How often does it change the recommendation?
3. Begin Milestone 6: optional improvements (logging, statistics export, visual polish, detailed diff)

---

## Implementation Quality Notes

**Strengths:**
- Honest framing: "Deterministic top from AI-interpreted signals" clearly attributes recommendation to the scorer, not AI
- Fair comparison: All variables held constant except interpretation
- Non-disruptive UX: Collapsible panel, QA-labeled, hidden by default
- Comprehensive eval coverage: Signal diff detection, recommendation change detection, null handling
- Symmetric presentation: Both added and missed signals shown equally

**Architecture insight:**
The comparison validates that your layered architecture (signals → validation → deterministic scoring) works correctly. You can swap the interpretation layer (AI or static) and the rest of the pipeline is agnostic. This is correct system design.

**Portfolio strength:**
This milestone shows disciplined AI integration — not just adding AI for its own sake, but building measurement and transparency into the system so you (and future reviewers) can evaluate whether AI is actually improving recommendations. That is sophisticated product thinking.

Milestone 5B is ship-ready.
