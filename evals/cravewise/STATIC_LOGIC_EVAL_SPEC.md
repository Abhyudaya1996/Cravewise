# CraveWise Static Logic Eval Spec

## Purpose

This spec defines manual product-intent evals for the current deterministic CraveWise static logic before adding local feedback persistence or AI.

This is not a test runner. It is a review checklist for judging whether the static prototype logic behaves like a premium food decision assistant rather than a generic restaurant feed.

## Scope

Evaluate:

- `interpretCravingStatic()`
- `scoreRecommendationStatic()`
- `classifyFeedbackStatic()`
- `generateInsightsStatic()`
- `getFallbackState()`

Out of scope:

- AI calls
- backend routes
- databases
- MCP
- Swiggy/Zomato integration
- real availability checks
- automated eval runner

## Eval Cases

### Category 1: Craving Interpretation

#### CW-INT-001: Spicy but not oily

- Persona: Abhyudaya
- User input/context: `spicyy but not too oily`
- Function or flow: `interpretCravingStatic()`
- Expected output/behavior:
  - `craving_type` includes `spicy`
  - `avoid` includes `oily`
  - `heaviness` should not be `heavy`
  - `confidence` should be `medium` or `high`
  - `needs_clarification` should be `false` unless budget/occasion is mandatory
- Pass criteria: The interpretation captures both the positive craving and avoid signal without treating the meal as heavy.
- Failure examples:
  - Misses `oily`
  - Marks the craving as low confidence
  - Forces a heavy recommendation path
- Manual review notes: Confirm the UI explanation reflects both the craving and avoidance signal.

#### CW-INT-002: Italian mood

- Persona: Abhyudaya
- User input/context: `Italian mood`
- Function or flow: `interpretCravingStatic()`
- Expected output/behavior:
  - `cuisine_hint = "Italian"`
  - `craving_type` may include `comfort` or `continental`
  - `confidence` should be `medium`
  - `needs_clarification` may be `true` if budget/heaviness is missing
  - Should not force Asian/North Indian just because persona prefers those cuisines
- Pass criteria: Italian intent remains visible and is not overwritten by persona defaults.
- Failure examples:
  - Cuisine hint is null
  - Recommendation explanation ignores Italian mood entirely
  - System forces Asian/North Indian based only on persona history
- Manual review notes: Static catalog may not have a strong Italian item; that should produce limited confidence or fallback, not hallucinated coverage.

#### CW-INT-003: Vague Hinglish craving

- Persona: Abhyudaya
- User input/context: `kuch accha`
- Function or flow: `interpretCravingStatic()` and `getFallbackState()`
- Expected output/behavior:
  - `confidence = low`
  - `needs_clarification = true`
  - Fallback asks for one more signal
  - Quick chips include options like Spicy, Comforting, Light, Surprise me
- Pass criteria: The flow does not pretend to have enough signal for a confident primary recommendation.
- Failure examples:
  - Generates high confidence
  - Produces a confident primary recommendation without clarification
  - No clarification chips or guidance
- Manual review notes: This should test the core trust behavior for ambiguity.

#### CW-INT-004: Light comfort ambiguity

- Persona: Kartik
- User input/context: `idk kuch mast but lighttt`
- Function or flow: `interpretCravingStatic()` and `scoreRecommendationStatic()`
- Expected output/behavior:
  - `craving_type` includes `comforting` or `satisfying`
  - `heaviness = "light"`
  - `confidence = low` or `medium`
  - `needs_clarification = true`
  - Should not recommend heavy creamy meals as primary
- Pass criteria: Lightness is preserved and heavy regret patterns are avoided.
- Failure examples:
  - Misses lightness
  - Treats the input as high confidence
  - Recommends heavy creamy food as primary
- Manual review notes: Current schema uses `comfort`, not `comforting`; either can be acceptable if behavior is aligned.

#### CW-INT-005: Pizza but not cheese overloaded

- Persona: Piyush
- User input/context: `pizza but not cheese overloaded`
- Function or flow: `interpretCravingStatic()` and `scoreRecommendationStatic()`
- Expected output/behavior:
  - `cuisine_hint` or `dish_hint` identifies pizza
  - `avoid` includes `cheese overloaded` or `too cheesy`
  - `heaviness` should be `medium` or not-heavy
  - Should not recommend cheese-heavy pizza as primary
- Pass criteria: The parser captures both pizza intent and the cheese overload constraint.
- Failure examples:
  - Recommends cheese burst pizza as confident primary
  - Ignores `not cheese overloaded`
  - Treats cheese overload as a positive tag
- Manual review notes: Current dummy catalog may have limited pizza variety; fallback may be better than a false confident pick.

#### CW-INT-006: Weekday Rush burrito

- Persona: Kushagra
- User input/context: `lunch in 20 mins meeting after this mexican burrito`
- Function or flow: `interpretCravingStatic()` plus full recommendation context
- Expected output/behavior:
  - Mode should be `weekday_rush`
  - Meal type should be lunch
  - Available time should be 20 minutes
  - Upcoming constraint should be meeting
  - `cuisine_hint = "Mexican"`
  - `dish_hint = "burrito"`
  - `exploration_intent = safe`
  - `needs_fast_delivery = true`
- Pass criteria: The full flow prioritizes Weekday Rush constraints and Mexican burrito intent.
- Failure examples:
  - Parser identifies burrito but misses time/meeting signals
  - Novelty outranks ETA/reliability
  - No Weekday Rush treatment
- Manual review notes: Some expected fields are product-intent targets and may not exist in the current schema.

### Category 2: Recommendation Scoring

#### CW-SCORE-007: Weekend spicy Asian

- Persona: Abhyudaya
- User input/context: Weekend dinner, craving = spicy Asian, budget = Rs.400-600, exploration = somewhat new
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Primary favors spicy Asian dishes with high past satisfaction
  - Primary is not fried/oily if regret pattern exists
  - Explanation mentions weekend spicy Asian preference and avoided oily regret pattern
- Pass criteria: Primary recommendation is taste-aware, low-regret, and clearly reasoned.
- Failure examples:
  - Recommends generic North Indian due to persona preference only
  - Ignores oily regret pattern
  - Explanation is generic popularity copy
- Manual review notes: Verify recommendation text names at least two user-specific signals.

#### CW-SCORE-008: Late-night fried momos regret

- Persona: Abhyudaya
- User input/context: Late night, craving = fried momos, budget = Rs.300, exploration = safe
- Function or flow: `scoreRecommendationStatic()` and `getFallbackState()`
- Expected output/behavior:
  - High-regret fried late-night option should not become primary
  - System may mention it avoided fried late-night snacks
  - Safer lower-regret backup should be shown
- Pass criteria: Regret memory overrules a direct but risky craving match.
- Failure examples:
  - Fried momos are primary with high confidence
  - Avoided-regret explanation is missing
  - Backup path is unavailable
- Manual review notes: This is a core trust case.

#### CW-SCORE-009: Simran budget lunch

- Persona: Simran
- User input/context: Weekday lunch, craving = filling meal, budget = under Rs.250
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Primary prioritizes budget fit and filling/value meals
  - Expensive bowls above budget should not be primary
  - Explanation mentions budget/value fit
- Pass criteria: Budget sensitivity and value are visible in both scoring and explanation.
- Failure examples:
  - Premium bowl above budget is primary
  - Explanation ignores budget
  - Recommendation is light/snacky rather than filling
- Manual review notes: Manual review should inspect both selected item and copy.

#### CW-SCORE-010: Kartik light comfort

- Persona: Kartik
- User input/context: Post-work dinner, craving = comfort food, heaviness = light, exploration = safe
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Primary avoids heavy creamy meals
  - Primary favors lighter comfort options
  - Explanation mentions lightness or avoiding heaviness
- Pass criteria: Health-intent behavior is expressed without medical claims.
- Failure examples:
  - Heavy creamy meal becomes primary
  - Explanation says healthy/medical benefits
  - Lightness is ignored
- Manual review notes: Do not require nutrition precision.

#### CW-SCORE-011: Kushagra Weekday Rush burrito

- Persona: Kushagra
- User input/context: Weekday lunch, available time = 20 mins, upcoming meeting, craving = Mexican burrito
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Primary prioritizes ETA fit and known comfort/reorder item
  - Classic Chicken Burrito from Baja Bowl Co. is selected if present in dummy data
  - Explanation mentions time pressure, meeting, and comfort/reorder behavior
- Pass criteria: Weekday Rush scoring prioritizes reliability before novelty.
- Failure examples:
  - A slower or novel option outranks burrito
  - Explanation omits meeting/time pressure
  - ETA is presented as real-time availability
- Manual review notes: ETA must remain explicitly dummy/static.

#### CW-SCORE-012: Piyush discount exploration

- Persona: Piyush
- User input/context: Discount-led exploration, craving = pizza, exploration = surprise me, budget = Rs.300-450
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Recommendation can allow novelty
  - Avoids very low-quality/low-rated discount trap if regret pattern exists
  - Explanation mentions discount-regret pattern or quality guardrail
- Pass criteria: Exploration is controlled by regret memory, not pure novelty.
- Failure examples:
  - Cheapest deal is primary with no quality caveat
  - Regret pattern is ignored
  - Surprise mode becomes random
- Manual review notes: Current schema does not model discounts directly; report if this remains unclear.

#### CW-SCORE-013: Pransih group-safe order

- Persona: Pransih
- User input/context: Group order, craving = North Indian or Asian, budget = Rs.700-900
- Function or flow: `scoreRecommendationStatic()`
- Expected output/behavior:
  - Recommendation favors group-safe options
  - Avoids polarizing or overly experimental meals
  - Explanation mentions group fit or broad acceptability
- Pass criteria: Group-order persona behavior affects item choice and explanation.
- Failure examples:
  - Overly experimental solo dish is primary
  - Explanation ignores group context
  - Budget dominates fit without group reasoning
- Manual review notes: The persona name is intentionally spelled `Pransih` in current data; verify against product naming later.

### Category 3: Fallback States

#### CW-FALLBACK-014: Vague craving fallback

- Persona: Abhyudaya
- User input/context: `kuch accha`
- Function or flow: `interpretCravingStatic()` and `getFallbackState()`
- Expected output/behavior:
  - Ask for one more signal
  - Show clarification chips
  - Do not produce fake confident primary recommendation
- Pass criteria: User sees a low-confidence clarification path.
- Failure examples:
  - High-confidence primary appears
  - Clarification chips missing
  - Fallback text is generic or dead-ended
- Manual review notes: The UI and logic should agree.

#### CW-FALLBACK-015: Budget too low

- Persona: Simran
- User input/context: Budget under Rs.150, craving = premium bowl
- Function or flow: `getFallbackState()` and `scoreRecommendationStatic()`
- Expected output/behavior:
  - Budget too low state
  - Offer budget-safe options or suggest increasing budget
  - Do not recommend expensive primary option as if budget fits
- Pass criteria: Budget limitation is explicit and does not get hidden behind a high-confidence pick.
- Failure examples:
  - Expensive item primary says budget fits
  - No budget fallback
  - User reaches dead end
- Manual review notes: Current budget band minimum may limit precise Rs.150 modeling.

#### CW-FALLBACK-016: High regret primary avoided

- Persona: Abhyudaya
- User input/context: Top score item has high regret risk
- Function or flow: `scoreRecommendationStatic()` and `getFallbackState()`
- Expected output/behavior:
  - Do not show high-regret item as primary
  - Show lower-regret alternative
  - Explanation says CraveWise avoided a strong craving match due to past disappointment
- Pass criteria: High-regret item cannot be the confident primary.
- Failure examples:
  - High regret item is primary
  - Avoidance explanation missing
  - Lower-regret alternative is not available
- Manual review notes: May require a crafted catalog/context to verify precisely.

#### CW-FALLBACK-017: Unsupported catalog craving

- Persona: Kartik
- User input/context: `Peruvian sushi tacos`
- Function or flow: `interpretCravingStatic()`, `scoreRecommendationStatic()`, and `getFallbackState()`
- Expected output/behavior:
  - Static data limitation message
  - Suggest supported categories from dummy catalog
  - Do not pretend to have full restaurant coverage
- Pass criteria: The prototype admits catalog limits.
- Failure examples:
  - Invents Peruvian/sushi/taco coverage
  - Confidently recommends unrelated item without caveat
  - No limitation message
- Manual review notes: Current schema may not distinguish unsupported cuisine from vague comfort fallback.

### Category 4: Feedback Classification

#### CW-FEEDBACK-018: Good taste but too heavy

- Persona: Kartik
- User input/context: Feedback text `taste was good but too heavy`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `sentiment = mixed`
  - `failure_reasons` includes `too_heavy`
  - `regret_level = medium`
  - `reorder_intent = maybe`
  - Learning mentions avoiding heavy options in similar context
- Pass criteria: Heavy signal is captured without turning it into a taste failure.
- Failure examples:
  - Marks as fully positive
  - Misses heavy signal
  - Sets reorder intent to yes
- Manual review notes: Current reason labels are display strings; normalize manually during review.

#### CW-FEEDBACK-019: Too oily and not worth it

- Persona: Abhyudaya
- User input/context: Feedback text `too oily and not worth it`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `sentiment = negative` or `mixed`
  - `failure_reasons` includes `too_oily` and `too_expensive` or `low_value`
  - `regret_level = high`
  - `reorder_intent = no`
- Pass criteria: Oily and value concerns become actionable regret memory.
- Failure examples:
  - Marks regret low
  - Misses oily/value
  - Reorder intent maybe/yes without reason
- Manual review notes: Current implementation may rely more on reason chips than free text.

#### CW-FEEDBACK-020: Tiny portion

- Persona: Simran
- User input/context: Feedback text `portion was tiny`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `failure_reasons` includes `portion_issue`
  - `value_rating` should be low if supported
  - Learning mentions portion/value concern
- Pass criteria: Portion issues connect to Simran's budget/value behavior.
- Failure examples:
  - Treats as neutral
  - No value signal
  - Learning is generic
- Manual review notes: Current reason chip supports `Portion issue`; free-text parsing may be weak.

#### CW-FEEDBACK-021: Loved it would reorder

- Persona: Piyush
- User input/context: Feedback text `loved it would reorder`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `sentiment = positive`
  - `regret_level = low`
  - `reorder_intent = yes`
  - Learning boosts similar item/restaurant
- Pass criteria: Positive reorder signal is preserved.
- Failure examples:
  - Reorder intent maybe
  - No positive learning
  - Treats as mixed due to missing chips
- Manual review notes: Current implementation likely needs explicit sentiment/reason input, not text only.

#### CW-FEEDBACK-022: Good but too expensive

- Persona: Pransih
- User input/context: Feedback text `good but too expensive`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `sentiment = mixed`
  - `failure_reasons` includes `too_expensive`
  - `value_rating` should be low or medium if supported
  - `reorder_intent = maybe`
- Pass criteria: Value concern is distinct from taste dislike.
- Failure examples:
  - Marks as negative taste failure
  - Value rating remains high
  - Reorder intent no without nuance
- Manual review notes: Current schema supports value rating but may need chip input.

#### CW-FEEDBACK-023: Delivery ruined it

- Persona: Kushagra
- User input/context: Feedback text `delivery ruined it`
- Function or flow: `classifyFeedbackStatic()`
- Expected output/behavior:
  - `failure_reasons` includes `delivery_issue` or `reliability_issue`
  - Should not incorrectly classify as taste failure
  - Learning mentions delivery/reliability concern
- Pass criteria: Delivery reliability is captured as its own failure mode.
- Failure examples:
  - Treats as taste failure
  - No reliability signal
  - Recommends same slow/reliability-risk pattern later
- Manual review notes: Current feedback reason list may not include delivery/reliability.

### Category 5: Insight Specificity

This category is manual review only. Do not pretend this can be fully automated without AI judgment.

For each persona, manually review `generateInsightsStatic(persona)`.

#### CW-INSIGHT-024: Abhyudaya insights

- Persona: Abhyudaya
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions persona-specific behavior
  - References cuisine/dish type
  - References context such as weekend or late night
  - References satisfaction, regret, reorder, budget, or delivery pattern
- Pass criteria: Insights feel specific to Abhyudaya rather than generic.
- Failure examples:
  - `You like spicy food.`
  - `You enjoy good meals.`
  - `You sometimes regret unhealthy food.`
- Manual review notes: Good example: `Abhyudaya usually rates spicy Asian dinners highly on weekends, especially noodle-based dishes under Rs.400.`

#### CW-INSIGHT-025: Simran insights

- Persona: Simran
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions weekday lunch, budget/value, portion, or filling meals
  - Avoids generic food preference copy
- Pass criteria: Insights reflect Simran's budget-conscious weekday lunch pattern.
- Failure examples:
  - `You like lunch.`
  - `You should save money.`
- Manual review notes: Good example: `Simran's highest satisfaction weekday lunches are filling meals under Rs.300.`

#### CW-INSIGHT-026: Kartik insights

- Persona: Kartik
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions light comfort, post-work dinner, heaviness regret, or reorder patterns
  - Avoids medical/nutrition claims
- Pass criteria: Insights support health-intent behavior without unsafe claims.
- Failure examples:
  - `You should eat better.`
  - `This is healthier for you.`
- Manual review notes: This is also a safety/guardrail check.

#### CW-INSIGHT-027: Kushagra insights

- Persona: Kushagra
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions weekday rush, meetings, ETA reliability, comfort reorder, or avoiding novelty under pressure
- Pass criteria: Insights capture time-pressure decision logic.
- Failure examples:
  - `You like burgers.`
  - `Fast food is best for you.`
- Manual review notes: Good example: `Kushagra avoids new restaurants during workday lunch when meeting pressure is high.`

#### CW-INSIGHT-028: Piyush insights

- Persona: Piyush
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions discount-led exploration, quality guardrails, lowest-price regret, or snack combos
- Pass criteria: Insights explain why not all deals are good recommendations.
- Failure examples:
  - `You like deals.`
  - `Cheap food is good.`
- Manual review notes: Good example: `Piyush often regrets lowest-price snack combos when quality is poor.`

#### CW-INSIGHT-029: Pransih insights

- Persona: Pransih
- User input/context: Selected persona insight view
- Function or flow: `generateInsightsStatic()`
- Expected output/behavior:
  - Mentions group-safe meals, broad acceptability, group order compromise, or budget/quality fit
- Pass criteria: Insights reflect group-order negotiation behavior.
- Failure examples:
  - `You like group orders.`
  - `Everyone likes this.`
- Manual review notes: Good example: `Pransih prefers group-safe meals that work across multiple tastes.`

