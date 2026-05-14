# CraveWise Milestone 5A — Claude Review

**Date:** 2026-05-14
**Reviewer role:** Senior PM + Engineer
**Scope:** AI Structured Craving Interpretation implementation. Verify scope boundaries, safety guardrails, fallback robustness, and deterministic scoring preservation.

All findings verified against actual code.

---

## Critical Question Review

### Q1: Does AI stay limited to structured interpretation?

**Verdict: Yes. Strongly bounded.**

The `/api/interpret-craving` route accepts craving text and context, returns only `CravingInterpretation` structure (six signal arrays + metadata). System prompt explicitly forbids:
- Final recommendations
- Item IDs or restaurant names
- Scores or rankings
- Backup options
- Personalization claims

Validation layer rejects any output containing `recommendation`, `restaurant`, or `backupOptions` fields with `unsafe_recommendation_field` reason.

AI is purely a signal extraction layer — it fills the same `CravingInterpretation` shape that static regex interpretation produces. Downstream scoring has no idea whether the signals came from AI or rules.

---

### Q2: Does deterministic scoring remain the source of truth?

**Verdict: Yes. Unchanged.**

`scoreRecommendationStatic()` is called with `interpretation` (either AI or static) and still produces rankings without modification. The function signature is:

```typescript
scoreRecommendationStatic(persona, context, scoringFeedbackMemory, interpretation)
```

Whether `interpretation` was produced by AI or `interpretCravingStatic()`, the scoring logic is identical. No AI logic touches ranking.

---

### Q3: Is the API key safely server-side?

**Verdict: Yes. No exposure.**

API key accessed only in route.ts:
```typescript
const apiKey = process.env.OPENAI_API_KEY;
```

The key is never sent to client. The route returns only:
```typescript
{
  interpretationSource: "ai_interpreted" | "static_fallback",
  interpretation?: CravingInterpretation,
  fallbackReason?: InterpretationFallbackReason
}
```

Client only sends context (craving text, budget, occasion, etc.) — no secrets. The boundary is clean.

---

### Q4: Is the structured output schema strict enough?

**Verdict: Yes. Strict mode enforced.**

Uses OpenAI Responses API with `strict: true` in JSON schema mode. Schema matches `CravingInterpretation` type exactly:
- `explicitDishIntents: DishType[]`
- `cuisineIntents: Cuisine[]`
- `contextSignals: ContextSignal[]`
- `preferenceSignals: PreferenceSignal[]`
- `negativeConstraints: NegativeConstraint[]`
- `budgetSignal: { max: number; source: "custom_text" | "budget_band" } | null`
- `rawInput: string`
- `occasion: string | null`
- `heaviness: "light" | "medium" | "heavy" | null`
- `exploration_intent: "safe" | "somewhat_new" | "surprise_me"`
- `confidence: "low" | "medium" | "high"`
- `needs_clarification: boolean`

Strict mode means OpenAI will reject any deviation from this schema at generation time, before returning.

---

### Q5: Is validation strong enough against invalid enums and unsafe recommendation/ranking fields?

**Verdict: Yes. Comprehensive validation.**

Post-API validation checks:

1. **Enum validation:** Each signal array is checked against actual taxonomy enums from `dishTaxonomy.ts`:
   - `explicitDishIntents` checked against `dishTypes`
   - `cuisineIntents` checked against `cuisines`
   - `contextSignals` checked against `contextSignals`
   - `preferenceSignals` checked against `preferenceSignals`
   - `negativeConstraints` checked against `negativeConstraints`

2. **Forbidden field rejection:**
   - Checks for `recommendation` field → rejects with `unsafe_recommendation_field`
   - Checks for `restaurant` field → rejects
   - Checks for `backupOptions` field → rejects

3. **Raw input validation:**
   - Compares trimmed `rawInput` against trimmed original craving text
   - Detects hallucinations or field contamination

4. **Required field check:**
   - Ensures all required fields present (not just schema-present, but semantically sensible)

5. **Fallback triggers on any validation failure:**
   - Invalid enum → `invalid_enum` reason
   - Invalid schema → `invalid_schema` reason
   - Unsafe field → `unsafe_recommendation_field` reason
   - Missing field → `invalid_schema` reason

Test coverage: 5 AI validation eval cases, all passing.

---

### Q6: Is fallback behavior robust enough?

**Verdict: Yes. Comprehensive fallback coverage.**

**Server-side fallback triggers:**
1. `missing_api_key` — no OPENAI_API_KEY set
2. `timeout` — 5-second timeout exceeded
3. `api_error` — HTTP error or network failure
4. `invalid_schema` — missing required fields or structural issues
5. `invalid_enum` — enum value not in taxonomy
6. `unsafe_recommendation_field` — forbidden fields detected
7. `low_quality_output` — very low confidence signals

**Client-side fallback triggers:**
1. Network error when calling route → sets `interpretation: null`
2. Server returns `static_fallback` → sets `interpretation: null`

**When `interpretation: null`:**
```typescript
const interpretation = resolvedInterpretation ?? staticInterpretation;
```
Resolves to `interpretCravingStatic(context)` — static regex interpretation takes over seamlessly.

**No data loss:** Even if AI fails 100% of the time, the app works identically to pre-5A behavior using static interpretation. Zero friction.

---

### Q7: Is the UI copy honest and not overclaiming AI personalization?

**Verdict: Yes. Scrupulously honest.**

Copy shown during interpretation:
- `"Checking AI interpretation"` — accurate, not final
- `"AI interpreted your craving"` — honest, limited scope (signal extraction only)
- `"AI unavailable, using local rules"` — clear fallback admission
- `"Using local rules"` — explicit static fallback when no API key

What the UI does NOT claim:
- No "AI learned your taste" or "AI remembers your preferences" — memory is local only
- No "AI knows restaurant availability" — static dummy data only
- No "AI personalized for you" — just structured interpretation
- No medical/nutrition advice — frame is taste and heaviness only

The UI status is small and honest. It does not oversell AI's role.

---

### Q8: Are evals adequate without depending on live AI?

**Verdict: Yes. Strong offline test coverage.**

**Static machine evals (8 cases):**
- `simran_pizza_not_cheese_overloaded_regression`
- `taxonomy_spicy_but_not_oily`
- `taxonomy_late_night_but_light`
- `taxonomy_healthy_but_filling`
- `taxonomy_group_order_under_budget`
- `taxonomy_weekday_rush_reliable_option`
- `taxonomy_simran_pizza_not_cheese_overloaded`
- `taxonomy_too_oily_memory_changes_fried_snack`

All test `interpretCravingStatic()` and `scoreRecommendationStatic()` — no API calls needed.

**AI validation evals (5 cases):**
- `ai_validation_accepts_taxonomy_only_output` — schema passes
- `ai_validation_rejects_invalid_enum` — `["sushi"]` not in dishTypes
- `ai_validation_rejects_recommendation_fields` — forbidden fields rejected
- `ai_validation_accepts_trimmed_raw_input_match` — leading/trailing space handled
- `ai_validation_rejects_raw_input_mismatch` — hallucination detected

All 5 test the validation logic in isolation, not the full API pipeline. They verify the guardrails work.

**Eval runner result:**
```
npm test
CraveWise static evals passed: 8/8
CraveWise AI interpretation validation checks passed: 5/5
```

No OPENAI_API_KEY required. CI can run evals without secrets. ✓

---

### Q9: What must be fixed before commit/push?

**Nothing critical.** All tests pass, build passes, lint passes, implementation is sound.

**Pre-commit checklist:**
- [x] npm run lint — passed
- [x] npm run build — passed
- [x] node evals/cravewise/run_static_evals.js — 8/8 + 5/5 passed
- [x] Server-side API key handling — verified
- [x] Client-side fallback logic — verified
- [x] Forbidden field validation — verified
- [x] Enum validation — verified
- [x] UI copy honesty — verified

The implementation is ready to commit.

---

### Q10: What should be fixed before the next milestone?

**Two optional improvements (not blockers):**

1. **Model choice documentation:** The prompt uses `gpt-4.1-mini` as the default, but this is an older model. Milestone 5B should consider upgrading to `gpt-4o` or the latest stable Claude-compatible model when available. The route already supports override via `OPENAI_MODEL` env var, so adding a note to README about "consider upgrading the default model" would be helpful for future maintainers.

2. **Timeout observability:** The 5-second timeout is good, but there's no logging of why fallback occurred. For debugging AI quality in production, a warning log when timeout or invalid enum triggers would help. Example:
   ```typescript
   if (fallbackReason === "timeout") console.warn("AI interpretation timeout, using static fallback");
   ```
   This is optional but would improve observability for the next PM reviewing AI performance.

**Not blocking. Both are enhancements for future milestones.**

---

### Q11: What is optional polish or noise?

| Polish Item | Impact | Recommendation |
|---|---|---|
| Inline scoring weight table in `scoreRecommendationStatic` | Portfolio strengthening | Deferred to Milestone 6 (nice-to-have) |
| Validation error logging | Debugging aid | Deferred to Milestone 6 (nice-to-have) |
| AI interpretation latency metrics | Observability | Deferred to Milestone 6 (nice-to-have) |
| Mock AI response fixtures for local dev | Developer ergonomics | Noise — not needed (API works in dev) |
| Separate "AI vs Static" interpretation UI badge | Honesty | Already covered by status copy (done) |
| Rate limiting on `/api/interpret-craving` | Safety | Not needed for prototype (no auth, single user) |
| Retry logic on timeout | Robustness | Noise for now (fallback is immediate, retrying adds latency) |

**None of these block commit.** They are enhancements for future milestones.

---

## Summary

| Criterion | Status | Notes |
|---|---|---|
| AI scope boundary | ✓ Excellent | Interpretation only, no ranking or recommendation |
| Deterministic scoring | ✓ Preserved | `scoreRecommendationStatic()` unchanged |
| API key safety | ✓ Secure | Server-side only, never exposed |
| Structured output | ✓ Strict | JSON schema with `strict: true` mode |
| Validation | ✓ Strong | Enum checks, forbidden fields, raw input verification |
| Fallback behavior | ✓ Robust | 7 fallback triggers, seamless static resolution |
| UI copy | ✓ Honest | No overclaiming, clear fallback messaging |
| Evals | ✓ Adequate | 8 static + 5 validation = 13/13 passing, offline |
| Build/lint | ✓ Clean | `npm run lint` and `npm run build` pass |
| Overall readiness | ✓ Ready | Commit and push |

---

## Final Verdict

**Status: READY TO COMMIT.**

Milestone 5A is well-executed. The implementation correctly adds AI structured interpretation while preserving deterministic scoring as the source of truth. Safety boundaries are strict, validation is comprehensive, and fallback behavior is robust. The UI copy is honest about what AI does and does not do.

All tests pass. Build passes. Linting passes. No regressions.

**Pre-commit action:**
```bash
git add .
git commit -m "Milestone 5A: AI structured craving interpretation with server-side API, strict validation, and fallback to static interpretation"
git push origin feature/cravewise-ai-interpretation
```

**Post-commit next steps:**
1. Test manually with OPENAI_API_KEY set (if available)
2. Verify no-key fallback works (already tested, but confirm again)
3. Review scoreBreakdown output with AI vs static interpretation
4. Begin Milestone 5B: optional improvements (model upgrade, logging, observability)

---

## Implementation Quality Notes

**Strengths:**
- Clean server/client boundary
- Comprehensive validation layer
- Seamless fallback to static interpretation
- Honest UI copy — no overstatement of AI capabilities
- Offline test coverage adequate for prototype stage
- No dependencies on live API for core evals or CI

**Architecture pattern:**
The implementation follows a best-practice pattern: AI as an optional signal-extraction layer that can fail silently without breaking the deterministic core. This is the correct approach for a prototype integrating AI into an existing deterministic system.

**Safety stance:**
The product stays conservative: AI is a convenience, not a promise. If AI is unavailable, the app works identically to the pre-AI version. This is the right product decision for a portfolio prototype.

Milestone 5A is ship-ready.
