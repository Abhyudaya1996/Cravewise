# CraveWise Milestone 4E — Claude Review

**Date:** 2026-05-14
**Reviewer role:** Senior PM + Engineer
**Scope:** Taxonomy design, signal separation, scoring explainability, eval strength, feedback memory, AI readiness. No backend, database, Supabase, MCP, live data, or UI redesign suggestions.

---

## Q1: Is the dish taxonomy clean or overengineered?

**Verdict: Clean, with one real naming bug.**

`dishTaxonomy.ts` is appropriately scoped — 16 dish types, 11 cuisines, 7 context signals, 13 preference signals, 6 negative constraints, 8 regret risk flags, 7 reliability flags. Not bloated. The enum-as-const pattern lets TypeScript catch invalid strings at compile time.

**Real bug — `heavy_late_night` is a context-free catalog flag.**

In `inferRegretRiskFlags` (`sampleData.ts` line 1104):
```typescript
if (item.heaviness === "heavy") values.push("heavy_late_night");
```
This fires on every heavy item regardless of context. A heavy biryani recommended for a weekend dinner gets tagged `heavy_late_night`. The name implies context-awareness that does not exist — it is a catalog property masquerading as a context signal.

Fix options:
- Rename to `heavy_meal` (accurate, no context implied)
- Or only push `heavy_late_night` during scoring when `late_night` is in active `contextSignals`

**Minor smell — `exploratory` is near-universal.**

`inferPreferenceTags` assigns `exploratory` to every non-familiar item. With 30 catalog items most carry this tag, making it a weak discriminator. Not urgent pre-AI — AI interpretation will produce richer novelty signals.

---

## Q2: Are signal classes properly separated?

**Verdict: Yes. The 4D/4E refactor fully fixed the original `craving_type` mixing problem.**

Before Milestone 4D, `CravingInterpretation.craving_type[]` mixed dish-matching signals (`spicy`, `comfort`) with context flags (`fried_snack`, `late_night`). Post-4E the four classes are structurally separate and each is used in a distinct part of `scoreRecommendationStatic`:

| Signal class | Type | Role |
|---|---|---|
| `explicitDishIntents` | `DishType[]` | What the user wants to eat |
| `contextSignals` | `ContextSignal[]` | Situation and time signals |
| `preferenceSignals` | `PreferenceSignal[]` | Taste quality signals |
| `negativeConstraints` | `NegativeConstraint[]` | What to avoid |

No cross-contamination. This is the most important structural improvement in the milestone set.

**One non-obvious mapping worth a comment:**

`matchNegativeConstraints` fires `avoid_heavy` on the regex `/too heavy|not heavy|sleepy|light/`. "Sleepy" → `avoid_heavy` is technically correct but is the least obvious mapping in the codebase. A one-line comment would prevent future confusion (and help the AI replacement understand the intent).

---

## Q3: Are `avoid_*` negative constraints handled consistently?

**Verdict: Mostly yes, with one real redundancy.**

The derivation chain is clean and single-source:
```
regretRiskFlags → inferAvoidIf() → item.avoidIf[] → itemMatchesNegativeConstraint()
```
No scattered string matching. The `avoid_*` naming convention makes grep-ability trivial.

**Real redundancy — double application in `scoreRecommendationStatic`.**

Negative constraints are enforced twice:
1. Score penalty: `breakdown.negativeConstraintPenalty -= 90` (line 1353)
2. Hard filter: removes items from results entirely (line 1380)

Items matching a negative constraint get score demolished (-90) **and** then removed from output anyway. The -90 is dead weight — no end-user or eval ever sees a penalized item survive. The breakdown shows -90 for items that are never returned, which pollutes any aggregate score analysis.

**Recommended fix:** Remove the -90 penalty and keep only the hard filter. Or remove the hard filter and let the -90 handle ranking. Pick one mechanism and delete the other before the AI milestone — with AI producing `negativeConstraints`, you want one clear enforcement path.

---

## Q4: Is scoring explainable enough for a one-recommendation product?

**Verdict: Yes for correctness, with one portfolio legibility gap.**

`ScoreBreakdown` covers 12 components with a single `calculateFinalScore()` aggregation. The eval harness verifies `breakdown.finalScore === score` for all 8 machine cases. A reviewer can trace exactly why any item ranked first.

**Gap:** The weights are not documented. A reader sees `-90` for negative constraints, `+20` for explicit dish intent, `+15` for cuisine match, etc., but there is no table explaining the rationale. For a portfolio project arguing "AI PM who thinks carefully about system design," a brief weights comment block would strengthen that argument.

This is a portfolio legibility issue, not a correctness issue.

---

## Q5: Are eval cases strong enough to protect regressions?

**Verdict: 7 of 8 cases are solid. One case has a gap.**

The `mustChangeWithMemory` check (case: `taxonomy_too_oily_memory_changes_fried_snack`) only verifies:
- Top item changed vs. no-memory baseline
- `memoryNotes.length > 0`

It does **not** verify:
- That `too_oily` specifically triggered the change
- That the new top item avoids `fried_oily` / `avoid_oily` flags

A future refactor could change which memory signal fires without breaking this eval. The eval harness already supports `mustAvoidFlags` — it just is not used in this case.

**Fix:** Add `mustAvoidFlags: ["fried_oily"]` to that eval case in `sample_cases.json`.

The remaining 7 cases are well-designed. The pizza regression case, taxonomy signal separation cases, and weekday rush reliability case all check specific typed outputs rather than vague outcomes. This is above-average eval discipline for a prototype at this stage.

---

## Q6: Does feedback memory improve recommendations without becoming fake personalization?

**Verdict: Yes. The implementation is honest and the boundary is clearly held.**

`getLocalMemoryScoreAdjustment` applies context-sensitive penalties: `too_oily` subtracts 18–34 depending on context (higher in late-night and fried-snack contexts), `too_heavy` subtracts 16–28, `would_reorder` adds 12. Magnitudes are calibrated — one negative feedback does not permanently block a category, and penalties are large enough to affect ranking in a 30-item catalog.

The `ScoringFeedbackMemory[]` adapter type decouples localStorage shape from the scorer. The UI shows an explicit local demo memory influence note. Clearing memory removes influence.

No fake confidence claims. No "based on your history" copy. No cross-device or AI memory implied. This is a well-contained demo feedback loop.

---

## Q7: Is the product ready for AI structured craving interpretation?

**Verdict: Yes. The output contract is clean.**

`interpretCravingStatic()` returns `CravingInterpretation` — a fully typed structured object with six named signal arrays and three metadata fields. An AI replacement would:
1. Receive the same `DecisionContext` input
2. Return the same `CravingInterpretation` shape
3. Slot directly into the existing `scoreRecommendationStatic` call

The taxonomy enums in `dishTaxonomy.ts` become the allowed-values constraints in a Zod schema for AI output validation. No glue code or adapter changes needed in the scorer. This is the correct architecture for a staged AI introduction.

---

## Q8: What must be fixed before replacing `interpretCravingStatic()` with AI?

**Two fixes required. Everything else is optional.**

**Fix 1 (required): Rename or correct `heavy_late_night`.**

The catalog flag must mean what it says. `heavy_late_night` appearing in score breakdowns for afternoon or weekend recommendations will confuse AI integration debugging. Fix before dropping AI in.

**Fix 2 (required): Remove double negative constraint enforcement.**

With AI producing `negativeConstraints`, you want exactly one enforcement path. Currently -90 penalty + hard filter both run. If the hard filter is ever removed during an AI refactor, the -90 penalty alone may not reliably suppress avoided items in all ranking scenarios. The two mechanisms are silently coupled. Decide on one and delete the other.

**Optional (not blocking):**
- Add `mustAvoidFlags` to the memory eval case — 2-minute fix
- Document scoring weights — portfolio strengthening, not a correctness fix
- `exploratory` signal discrimination — AI interpretation supersedes this anyway

---

## Q9: Important critique vs. noise

| Finding | Status |
|---|---|
| `heavy_late_night` is context-free | **Fix pre-AI (required)** |
| Double negative constraint enforcement | **Fix pre-AI (required)** |
| `mustChangeWithMemory` eval gap | **Fix pre-AI (low effort)** |
| Scoring weights undocumented | Portfolio suggestion (not a blocker) |
| "sleepy" → `avoid_heavy` undocumented | One comment if desired |
| `exploratory` near-universal | Noise — AI replaces this |
| Budget early return skips confidence calc | Noise — AI replaces this |
| Dynamic insights are simple aggregates | Known weakness, not pre-AI scope |
| 30-item catalog is dummy data | Known, out of scope |

---

## Overall Assessment

CraveWise after Milestone 4E is in a legitimate pre-AI state. The taxonomy is clean, signal separation is correct, the `NegativeConstraint → avoidIf → itemMatchesNegativeConstraint` chain is the best-architected part of the codebase, and the `CravingInterpretation` output contract is exactly what an AI handoff requires.

Two real bugs need fixing before the AI milestone. One eval gap is a 2-minute fix. Everything else is either already known or will be superseded by AI interpretation.

---

## Recommended Pre-AI Checklist

- [ ] Rename `heavy_late_night` → `heavy_meal` in `dishTaxonomy.ts` and `sampleData.ts`
- [ ] Remove the `-90` `negativeConstraintPenalty` from `scoreRecommendationStatic` (keep the hard filter)
- [ ] Add `mustAvoidFlags: ["fried_oily"]` to `taxonomy_too_oily_memory_changes_fried_snack` in `sample_cases.json`
- [ ] Run `node evals/cravewise/run_static_evals.js` — confirm 8/8 pass
- [ ] Begin AI milestone: replace `interpretCravingStatic()` only, keep `scoreRecommendationStatic` deterministic
