# CraveWise Milestone 4F — Claude Review

**Date:** 2026-05-14
**Reviewer role:** Senior PM + Engineer
**Scope:** Verify that Milestone 4F correctly resolved the three pre-AI issues flagged in the 4E review, and assess readiness for Milestone 5A: AI Structured Craving Interpretation.

All findings are verified against current code, not just the changelog.

---

## Q1: Did Milestone 4F correctly resolve the required pre-AI issues?

**Verdict: Yes. All three required fixes are implemented and verified.**

### Fix 1: `heavy_late_night` → `heavy_meal`

`dishTaxonomy.ts` `regretRiskFlags` array: `heavy_meal` is present, `heavy_late_night` is gone.

`inferRegretRiskFlags` in `sampleData.ts` line 1104:
```typescript
if (item.heaviness === "heavy") values.push("heavy_meal");
```

The rename is complete and correct. `heavy_meal` is an honest catalog-level property: a heavy item is a heavy item regardless of when it is ordered. No context is implied.

### Fix 2: Double negative constraint enforcement removed

`scoreRecommendationStatic` now enforces negative constraints through one path only — a hard filter at the end of the scoring pipeline:
```typescript
.filter(({ item }) => !interpretation.negativeConstraints.some(
  (constraint) => itemMatchesNegativeConstraint(item, constraint)
))
```

The previous `-90` `negativeConstraintPenalty` is gone. `createEmptyScoreBreakdown()` initializes `negativeConstraintPenalty: 0` and it is never modified. One enforcement path. Clean.

### Fix 3: `mustChangeWithMemory` eval strengthened

The `taxonomy_too_oily_memory_changes_fried_snack` case now includes:
```json
"mustAvoidFlags": ["avoid_oily", "fried_oily"]
```

The eval no longer only checks whether the top item changed — it now verifies the new top item actually avoids the oily/fried flags that triggered the memory penalty.

---

## Q2: Is `heavy_meal` now modeled cleanly?

**Verdict: Yes, with one remaining note that is not a blocker.**

The rename closes the naming debt. Any heavy item — biryani, curry, pasta — carries `heavy_meal` in its `regretRiskFlags`, and `inferAvoidIf` derives `avoid_heavy` from it. The chain is honest:

```
item.heaviness === "heavy"
  → regretRiskFlags: ["heavy_meal"]
  → avoidIf: ["avoid_heavy"]
  → itemMatchesNegativeConstraint(item, "avoid_heavy") → true
  → filtered out when user signals avoid_heavy
```

**Remaining note (not a blocker):** `heavy_meal` as a `RegretRiskFlag` still fires `regretRiskPenalty -= 10` through the general regret risk scoring when `item.regretRisk === "medium"`. This is not a flag-specific penalty — it is the generic regret risk score that applies to all medium-regret items regardless of which flags they carry. No action needed, but worth knowing when debugging score breakdowns: two medium-regret heavy items will both get -10 from the regret risk path, not from `heavy_meal` specifically.

---

## Q3: Are negative constraints now enforced through one clear path?

**Verdict: Yes. Single enforcement path, correctly documented.**

Before 4F: -90 score penalty + hard filter (both running).
After 4F: hard filter only.

The scoring comment documents the design decision:
```typescript
// Negative constraints are hard user boundaries, so matching items are filtered
// instead of receiving a hidden penalty.
```

This is the right choice. Negative constraints are not preferences to be traded off against — they are exclusions. A user saying "not oily" should never see an oily item ranked low; they should see it absent. The hard filter is semantically correct.

`negativeConstraintPenalty` remains in `ScoreBreakdown` as a field but is always 0. This preserves the type shape (no downstream breakage) while accurately reflecting that no penalty was applied. The field is not misleading — a 0 penalty on a returned item is truthful.

---

## Q4: Is `scoreBreakdown` still meaningful after removing the `-90` penalty?

**Verdict: Yes, and it is more meaningful now.**

Before 4F, any returned recommendation could theoretically carry a ghost `negativeConstraintPenalty` only if a bug caused a constraint-matching item to slip through the filter. In practice that never happened, but the -90 was dead code polluting the breakdown type.

Now `negativeConstraintPenalty` is always 0 on returned items (by design: they were filtered before reaching output). The breakdown of a returned recommendation reflects only the signals that actually contributed to its ranking. That is what scoreBreakdown should show.

The 12-component breakdown is still intact: explicit dish intent, cuisine intent, context fit, preference match, persona preference, feedback memory, reliability, budget, exploration, heaviness, regret risk penalty, and now a structurally-honest negative constraint field.

The eval harness still verifies `breakdown.finalScore === score` for all 8 machine cases. This invariant holds.

---

## Q5: Is the `too_oily` memory eval now strong enough?

**Verdict: Yes. The case is now correctly structured.**

Before 4F the case only verified:
- Top item changed vs. no-memory baseline
- `memoryNotes.length > 0`

After 4F it also verifies:
- `mustAvoidFlags: ["avoid_oily", "fried_oily"]` — the new top item must not carry either flag

This closes the gap. A refactor that changes which memory signal fires the swap, but accidentally swaps to another oily item, would now fail. The eval tests the outcome, not just the change.

The case structure is clean: `machineCheck: true`, `mustChangeWithMemory: true`, `mustAvoidFlags`, `memory` object with `failureReasons: ["too_oily"]`. The harness verifies all three assertions independently.

---

## Q6: Is CraveWise ready for Milestone 5A: AI Structured Craving Interpretation?

**Verdict: Yes.**

The output contract for `interpretCravingStatic()` is `CravingInterpretation` — a fully typed structured object:

```typescript
{
  explicitDishIntents: DishType[];
  cuisineIntents: Cuisine[];
  contextSignals: ContextSignal[];
  preferenceSignals: PreferenceSignal[];
  negativeConstraints: NegativeConstraint[];
  budgetSignal: BudgetSignal | null;
  rawInput: string;
  occasion: string | null;
  heaviness: Heaviness | null;
  exploration_intent: ExplorationIntent;
  confidence: "low" | "medium" | "high";
  needs_clarification: boolean;
}
```

An AI replacement (`interpretCravingAI()`) would:
1. Receive the same `DecisionContext` input
2. Return the same `CravingInterpretation` shape (validated by Zod)
3. Slot into `scoreRecommendationStatic` without any scorer changes

The taxonomy enums in `dishTaxonomy.ts` are the exact allowed-value sets for Zod schema constraints. The scorer does not know or care how the interpretation was produced. The AI integration is a drop-in.

The 8 machine eval cases run on the same pipeline. After replacing interpretation, running `node evals/cravewise/run_static_evals.js` immediately flags any regression in structured output quality.

---

## Q7: What, if anything, must still be fixed before AI?

**Nothing is blocking.**

| Finding | Status |
|---|---|
| `heavy_late_night` context-free flag | Fixed in 4F |
| Double negative constraint enforcement | Fixed in 4F |
| `mustChangeWithMemory` eval gap | Fixed in 4F |
| `heavy_meal` regret risk penalty path | Not a bug — general regret risk scoring, not flag-specific |
| `negativeConstraintPenalty` always 0 in breakdown | Accurate representation, not misleading |
| `exploratory` near-universal in catalog | Noise — AI interpretation supersedes this |
| Scoring weights undocumented | Partially addressed by 4F comments; full weight table still optional |

**One optional improvement before AI (not blocking):**

The scoring weight comment documents principles but not magnitudes. A short inline weight table (e.g., `+70 explicit dish match, -90 explicit dish miss, +50 cuisine match`) would make it easier to QA AI interpretation quality — if an AI-interpreted `explicitDishIntents` is subtly wrong, the weight table helps debug whether a wrong item ranked first due to interpretation error or scoring imbalance. Useful, not required.

---

## Overall Assessment

Milestone 4F executed the 4E pre-AI checklist correctly. All three required fixes are in, all 8 evals pass, the negative constraint architecture is now semantically clean, and `scoreBreakdown` is more honest than before.

CraveWise is ready for Milestone 5A.

The AI integration surface is well-defined: one function (`interpretCravingStatic`), one typed output contract (`CravingInterpretation`), one validation layer (Zod against taxonomy enums), one downstream consumer (`scoreRecommendationStatic`) that needs no changes. The eval harness is in place to catch structured output regressions immediately.

---

## Pre-5A Checklist

- [x] `heavy_late_night` → `heavy_meal` rename complete
- [x] Negative constraints: single hard filter, no hidden penalty
- [x] `scoreBreakdown.negativeConstraintPenalty` is always 0 on returned items
- [x] `too_oily` memory eval verifies avoided flags, not just ranking change
- [x] Scoring principles and "sleepy" → `avoid_heavy` mapping documented
- [x] 8/8 static evals pass
- [ ] (Optional) Add inline scoring weight table as comment in `scoreRecommendationStatic`
- [ ] Begin Milestone 5A: replace `interpretCravingStatic()` with AI structured output + Zod validation
