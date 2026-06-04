# Why the strongest decision in CraveWise was "no recommendation"

## The claim

CraveWise is a food decision assistant. Its entire job is to give you one answer instead of a grid to scroll. So the feature I am most confident about is the one where it gives you nothing at all.

When the catalog cannot responsibly satisfy a craving, CraveWise does not return a best-effort guess. It says it does not have a good match and explains why. That refusal was harder to build than any recommendation, and it is the part of the product I would defend first in a review.

This note is about why that decision was right, and how the product was built so it could actually hold the line under pressure.

## The default failure mode

Most recommendation surfaces are built to always answer. An empty result feels like a bug, so teams pad it: relax the filters, drop a constraint, surface "popular near you," anything to avoid a blank screen. The metric being protected is usually engagement or coverage, not whether the answer was any good.

The cost is hidden. A product that always answers teaches users that its confidence is meaningless. Once someone gets one confidently wrong recommendation — the oily dish when they asked for light, the dessert when they asked for "not too sweet" — they stop trusting the next one. The system optimized for never being empty and paid for it in trust.

For a decision product, that trade is backwards. The value is not in producing an answer. It is in producing an answer you can rely on. That means the product has to be willing to say no.

## The decision: when to refuse

CraveWise separates how well it can satisfy a request into explicit `matchQuality` states rather than a single confidence score:

- `strong` — the catalog clearly satisfies the craving and constraints
- `style_match` — the exact dish is not available, but a style-adjacent option is honestly named as a substitute
- `partial` — the request is met with a caveat, and the unmet part is surfaced
- `no_responsible_match` — the catalog cannot satisfy the request without inventing confidence

The last state is the important one. When it triggers, a `shouldSuppressPrimaryRecommendation` flag turns off the recommendation entirely and the product renders an honest empty state instead of a forced pick.

A concrete example: ask CraveWise for "sushi tonight" when the demo catalog has no sushi. It does not hand you the closest noodle dish and pretend. It returns `no_responsible_match` and tells you it cannot responsibly satisfy that craving. The wrong answer here would have been easy. The product is built to not give it.

This matters because the refusal is a product *path*, not an error. Vague input routes to a clarification state. A request the catalog genuinely cannot meet routes to a no-match state. Neither one fabricates a confident recommendation to fill the screen.

## The engineering of restraint

A principle like "refuse weak matches" is worthless if the system can quietly route around it. The decision only holds because the architecture is bounded so that no single layer can manufacture a recommendation it has not earned.

CraveWise uses AI for one job: interpreting the craving into structured signals. It does not choose the recommendation. Deterministic scoring owns the final decision. That boundary is enforced, not just documented — a validation gate rejects any AI output that tries to reach past its role into fields it should never set, such as the recommendation, the restaurant, or the backup options. If the model returns something unsafe or malformed, the request falls back to static rules rather than trusting it.

So the refusal is structural. `assessMatchQuality()` evaluates coverage, budget, time, and constraints and reports what could not be satisfied. `getFallbackState()` maps that assessment to the right path, including `no_responsible_match`. The scoring engine, not the model, decides whether an answer exists. The "no recommendation" outcome is what happens when that deterministic logic concludes there is no honest answer — and nothing downstream is allowed to override it.

This is the part that turns a nice intention into a real product guarantee. The model cannot smuggle in a confident pick. The UI cannot fall back to "popular nearby." The only way to get a recommendation is for the scoring logic to actually find one worth standing behind.

## How you test a refusal

The harder question in review is: how do you know the product refuses when it should, and answers when it should? An assistant that says "no good match" to everything is as useless as one that always answers.

CraveWise treats this as something to verify, not assert. The static eval harness runs the scoring logic against fixed cases with an expected `matchQuality` for each — including cases that must resolve to `no_responsible_match` and cases that must *not*. The current baseline is 33/33 static cases, 5/5 AI-output validation checks, and 3/3 interpretation-comparison checks. The validation checks specifically confirm the AI layer cannot set the fields it is forbidden from setting.

The refusal is covered by tests the same way a recommendation is. That is what makes it a feature instead of a hope.

## The PM lesson

The instinct in a decision product is to maximize answered queries. The more durable instinct is to maximize *trustworthy* answers, which sometimes means returning none.

Saying no is only credible if the product cannot be quietly talked out of it — by a model that overreaches, a UI that backfills, or a metric that rewards coverage. The decision to refuse and the architecture that enforces refusal are the same piece of work. One without the other is a slogan.

The strongest decision in CraveWise was "no recommendation" because it is the decision that makes every other recommendation worth trusting.
