# CraveWise Case Study Draft

Date: 2026-05-15
Status: Milestone 6A revised portfolio draft from Milestone 5D-C evidence

## Short Version

Most food apps solve the wrong problem: they get users to more options faster, when the painful moment is the decision itself.

CraveWise is a mobile-first food decision assistant for moments when a user is hungry, constrained, and tired of browsing. Instead of showing another restaurant feed, it gives one trusted recommendation using the user's craving, budget, context, persona, browser-local feedback memory, and deterministic scoring.

The project is intentionally narrow. It does not use live restaurant data, ordering, delivery, auth, database persistence, cross-device memory, or nutrition advice. The core question is simpler and more product-critical:

Can a food assistant make a better decision moment without pretending to be a full delivery marketplace?

The answer so far is yes, with an important caveat: the key PM decision was not to add AI. It was to decide where AI should and should not have authority. In CraveWise, AI is allowed to interpret craving signals, but deterministic local scoring remains the final recommendation authority.

## The Problem

Food ordering apps are good at access, but the painful moment is often not access. It is choosing.

Users know fragments of what they want:

- "spicy but not oily"
- "pizza but not cheese overloaded"
- "late night but light"
- "something filling under 250"

They also know what they regret: meals that are too heavy, too oily, too expensive, stale, unreliable, or wrong for the moment. Delivery apps usually respond by expanding the search space. CraveWise explores the opposite product bet: reduce the decision surface.

## Product Thesis

CraveWise is not a food marketplace. It is a decision layer.

The product gives one primary recommendation and keeps backups secondary. That constraint is the point. A one-recommendation product has to respect tradeoffs, expose why the choice fits, and avoid false certainty. It cannot hide behind an endless list.

The prototype optimizes for:

- decision confidence
- current craving over static persona defaults
- visible regret avoidance
- honest fallback behavior
- explainable local scoring
- bounded AI, not AI authority

## Why One Recommendation

The first product risk was not whether CraveWise could display enough food options. It was whether the app could earn trust while showing fewer options.

One recommendation makes the experience sharper, but it creates a real trust problem: why should a user believe a new product's single answer?

CraveWise earns that trust through the product surface around the recommendation. The app shows visible reasoning, names the constraints it honored, keeps backups available but secondary, lets feedback memory influence future local scoring, uses honest confidence language instead of fake precision, and avoids fake live availability claims. It does not pretend a dummy catalog is real supply or that a heuristic score is a calibrated probability.

That makes the one-recommendation experience defensible:

- The user gets a decision, not a grid.
- The system has to explain why this meal fits now.
- Regret patterns become part of the decision, not buried metadata.
- Backups stay available without turning the product back into browsing.

This also made product quality easier to evaluate. If the top recommendation is wrong, the failure is obvious.

## Static-First Validation

The first version was deliberately static. This was a PM validation strategy, not just an implementation shortcut. Before adding AI, CraveWise needed to prove that the core decision-support thesis worked at all: could a constrained local system turn messy cravings, budget, context, persona, and regret patterns into a recommendation that felt understandable?

The MVP used dummy personas, a static 30-item catalog, local craving interpretation, local feedback classification, and deterministic recommendation scoring.

The main flow:

1. Choose a demo persona.
2. Preview taste preferences and regret patterns.
3. Enter a messy craving plus budget/context.
4. Receive one primary recommendation.
5. Reveal backups only if needed.
6. Submit or skip feedback.
7. Review local browser-only insights.

This let the product experience mature before adding AI. It also created a baseline for later AI comparison: if static rules already handled a case well, AI had to prove it added signal rather than just cost and risk.

The static MVP exposed a key product rule early: explicit current craving must beat persona defaults. A manual test where Simran asked for `pizza but not cheese overloaded` originally returned an unrelated comfort meal. The issue was caught and fixed without AI by prioritizing explicit dish and cuisine intent, adding a non-cheese-heavy pizza option, and covering the case in local evals.

## Local Feedback Memory

CraveWise includes a lightweight learning loop without building a backend. Feedback is stored only in the current browser under the local key `cravewise.localFeedbackMemory.v1`.

The app saves submitted feedback, selected reason chips, reorder intent, and a static feedback classification. That memory can influence future deterministic scoring for the same persona in the same browser.

For example, if Abhyudaya gives disappointing feedback with `too_oily` after a fried late-night meal, future similar recommendations can penalize oily or fried options and choose a lower-oil alternative.

This is intentionally not real account personalization. There is no backend, database, auth, AI memory, or cross-device sync. The UI labels the feature as local demo memory and lets the user clear it.

## Taxonomy And Deterministic Scoring

Before adding AI, CraveWise introduced a local dish taxonomy and structured scoring contract.

Craving interpretation now separates:

- explicit dish intents
- cuisine intents
- context signals
- preference signals
- negative constraints
- budget signals
- heaviness and exploration intent

Catalog items expose normalized fields such as dish type, preference tags, context fit, regret risk flags, reliability tags, avoid rules, budget tier, and price comfort band.

The deterministic scorer then applies the product rules:

- Explicit craving has priority over persona defaults.
- Negative constraints such as `avoid_oily`, `avoid_heavy`, and `avoid_cheese_heavy` are hard returned-recommendation boundaries.
- Local feedback memory can adjust scoring for the active persona only.
- The returned recommendation includes an internal score breakdown for QA.
- Qualitative labels replace fake match percentages.

This mattered because deterministic scoring is not only a safety mechanism. It is a trust and explainability mechanism. When a recommendation is wrong, the team can inspect rules, constraints, score breakdowns, and failure cases instead of blaming a black-box AI output.

The taxonomy also strengthened the AI boundary. AI would not need to choose a meal. It would only fill structured interpretation fields that local validation and deterministic scoring already understood.

## AI Interpretation Layer

The AI layer was added only at the interpretation boundary. A user craving can be sent to a server-side provider, returned as structured fields, checked against the local schema and taxonomy, and then passed into the same deterministic scorer used by static interpretation.

AI is allowed to extract structured craving signals. It is not allowed to:

- choose the final recommendation
- rank catalog items
- output item IDs or restaurant names
- write feedback memory
- create live availability claims
- make medical or nutrition claims

If AI is missing, slow, quota-blocked, malformed, invalid, or unsafe, the app falls back to local static interpretation. The recommendation flow still works because deterministic scoring remains the final authority.

## Static Vs AI QA

CraveWise includes an internal comparison layer for prototype QA. For the same craving, context, persona, feedback memory, catalog, and scorer, the system compares static interpretation against AI interpretation when AI is available. Both paths are scored by the same deterministic recommendation logic, so the only meaningful difference is the interpreted signal set.

This comparison is not user-facing confidence. It exists to answer a product question:

Does AI improve signal extraction enough to justify the latency, provider dependency, validation complexity, and fallback surface?

## Evidence From Milestone 5D

The evidence is intentionally documented with caveats.

OpenAI was tested first. The route reached the provider, but the account was quota-blocked with HTTP `429` / `insufficient_quota`. The app failed safely through static fallback. This was useful reliability evidence, not AI-quality evidence.

Gemini was added as an alternate provider for live evidence. Gemini produced accepted interpretations for several curated cases, but provider limits and invalid output prevented a clean uninterrupted 8-case pass. The evidence pack combines labeled runs rather than pretending there was one clean pass.

The evaluation design was part of the PM work. Cases A-H were chosen to probe specific failure modes: explicit craving versus persona defaults, negative constraints, budget extraction, vague input, nonsense input, fallback hygiene, and whether AI interpretation changes the final deterministic top recommendation.

Current offline checks pass: static evals 8/8, AI validation checks 5/5, and interpretation comparison checks 3/3.

Key findings:

- Case A, `pizza but not cheese overloaded`: Gemini preserved pizza intent and the cheese-heavy boundary. Deterministic scoring kept the same correct top recommendation.
- Case B, `spicy but not oily`: Gemini separated `spicy` from `avoid_oily`, but static rules already captured the important boundary.
- Case C, `late night but light`: static rules better encoded lightness as `avoid_heavy`, while the deterministic top stayed safe.
- Case D, `healthy but filling`: Gemini captured the health and satiety signals, but did not materially change the recommendation. Deterministic scoring kept the same top result.
- Case E, `spicy fried snack late night` with prior oily feedback: local feedback memory stayed in deterministic scoring; AI did not write or own memory.
- Case F, `something nice but not too much`: Gemini fell back with invalid output JSON. Validation protected the product.
- Case G, `asdf random blah`: Gemini accepted nonsense as high-confidence exploratory intent instead of asking for clarification. This is the clearest AI-noise case.
- Case H, `something filling under 250`: Gemini extracted `budgetSignal.max: 250`, but static rules already captured the useful budget/filling signal.

No accepted Gemini case changed the deterministic top recommendation.

## Product Learning

The most important learning is not "AI is better than static rules." The evidence does not support that claim.

The stronger learning is that the key PM decision was not to add AI. It was to decide where AI should and should not have authority.

> Deterministic scoring is necessary because AI can degrade signal quality.

AI helped preserve some useful signals, especially natural-language boundaries like pizza intent plus not cheese-heavy. But it also missed static taxonomy details, returned malformed output, hit provider limits, and over-interpreted nonsense input.

That makes the architecture feel directionally right. AI can be useful at the language boundary, but it should not control ranking or final recommendation authority in this prototype.

## Conclusion

CraveWise demonstrates a specific kind of PM judgment: deciding where AI should not have authority, not just where it should. The food domain is the vehicle; the transferable skill is knowing when to constrain AI, how to validate its outputs, and how to use evidence to decide whether AI improves the product rather than assuming it does.
