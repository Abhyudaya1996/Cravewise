# PRD v1.2: CraveWise

**Status:** Active PRD for Milestone 1 static prototype.

**Current implementation scope:** Build only the static prototype using dummy/sample data. Do not add AI, backend, database, live restaurant data, ordering, payments, or delivery integrations.

## 1. Product Summary

**Product name:** CraveWise

**Product type:** AI-native food decision assistant

**One-line pitch:**

CraveWise helps urban food delivery users decide what to order by using their taste profile, sample order history, current craving, budget, and regret patterns to recommend **one specific dish from one specific restaurant**, with a clear reason.

---

## 2. Product Positioning

CraveWise is not a food delivery app.

It does not replace Swiggy or Zomato.

It acts as a **decision layer before ordering**.

Existing food apps help users browse. CraveWise helps users decide.

The product should feel less like:

> "Here are 500 options."

And more like:

> "Given what you usually enjoy, what you regretted before, and what you're craving tonight, this is the one thing I'd recommend."

---

## 3. Problem Statement

Urban food delivery users often know they are hungry and have a rough craving, but still struggle to decide what to order.

Food apps show too many options, often sorted by discounts, sponsored listings, delivery logistics, or generic ratings. These signals do not necessarily reflect the user's personal taste.

The result is a repeated loop:

1. User opens Swiggy/Zomato.
2. User scrolls for 10-15 minutes.
3. User feels overwhelmed.
4. User picks something random, familiar, or discounted.
5. Food arrives.
6. User is often disappointed.
7. The app does not learn from that regret.
8. The same cycle repeats later.

The core problem is not lack of food options.

The core problem is **low-confidence decision-making**.

---

## 4. User Segment

### Primary User

Urban working professionals in Indian metros who order food delivery regularly and experience decision fatigue.

### Initial Segment

For MVP, focus on:

```text
Urban professionals aged 25-35 in Delhi NCR / Gurugram who order food delivery 3-5 times per week, especially on weekends, and care about food quality more than just discounts.
```

### Behavioral Traits

They usually:

- spend 10+ minutes deciding what to order
- distrust generic ratings
- find sponsored listings unhelpful
- repeatedly order from familiar places
- occasionally want to explore something new
- regret some food choices after ordering
- trust friend recommendations more than app rankings

### MVP User Mode

CraveWise will focus first on:

```text
Weekend evening food decisions.
```

Reason:

Weekend ordering has sharper pain:

- higher expectations
- more willingness to explore
- more disappointment when food is bad
- stronger need for taste-based judgment

Weekday fast reorder can be handled later.

---

## 5. Job To Be Done

```text
When I am hungry on a weekend evening with a specific craving but no clear restaurant in mind,

I want one trusted dish + restaurant recommendation that fits my taste, budget, and past food preferences,

so I can order quickly, feel confident, and avoid wasting money or appetite on disappointing food.
```

---

## 6. Current Alternatives

Users currently solve this by:

- scrolling Swiggy/Zomato endlessly
- choosing from sponsored or discounted listings
- reordering the same safe meals
- checking ratings and reviews
- texting friends for recommendations
- searching by cuisine
- giving up and ordering something random

### Why Current Alternatives Fail

| Alternative | Problem |
|---|---|
| Swiggy/Zomato browsing | Too many options, low personal relevance |
| Ratings | Reflect average public taste, not individual taste |
| Discounts | Optimize price, not satisfaction |
| Sponsored listings | Reduce trust in discovery |
| Friend recommendations | High trust but not always available |
| Reordering | Safe but repetitive |
| Search/filtering | Still leaves the user to decide |

---

## 7. Product Hypothesis

```text
If CraveWise uses a user's taste profile, sample order history, current craving, budget, and regret memory to recommend one specific dish from one specific restaurant,

then users will make faster and more satisfying food decisions,

because CraveWise reduces option overload and gives a recommendation that feels personally reasoned rather than generically ranked.
```

---

## 8. MVP Strategy

### Important MVP Decision

The MVP will **not** integrate with Swiggy/Zomato directly.

Instead, it will use:

```text
An anonymized sample order-history dataset based on real personal ordering patterns.
```

This allows the product to simulate future Swiggy/Zomato history import without depending on live integrations, private data, browser scraping, or unavailable APIs.

### Why This Is The Right MVP

The MVP should prove:

```text
Does one taste-aware recommendation feel more useful than browsing hundreds of options?
```

It should not yet prove:

```text
Can we technically integrate with Swiggy/Zomato?
```

That is a later feasibility problem.

---

## 9. MVP Scope

### MVP Must Have

#### 1. Sample Taste Profile

The app should start with sample user personas.

Each persona should have:

- preferred cuisines
- disliked cuisines or dishes
- budget range
- spice preference
- comfort foods
- avoided foods
- regret patterns
- past order history

#### 2. Sample Order History

The app should include anonymized sample past orders.

Each order should include:

- dish name
- restaurant name
- cuisine
- price
- meal time
- day type
- craving
- rating
- regret level
- reorder intent
- feedback reason

#### 3. Craving Input

User enters:

- what they are craving
- budget
- occasion
- hunger level or mood

Example:

```text
I want something spicy and satisfying but not too oily.
Budget: Rs.400-500.
Occasion: weekend dinner.
```

#### 4. One Primary Recommendation

The app should show one main recommendation:

- dish name
- restaurant name
- estimated price
- cuisine
- why this fits
- confidence signal
- regret risk
- taste match explanation

#### 5. Optional Backup Recommendations

The app should include two optional alternatives, hidden behind a "Show backups" or "Not feeling this?" action.

This protects the core wedge of one answer while giving users control.

#### 6. Post-Meal Feedback

User gives simple feedback:

- Loved it
- Meh
- Disappointing

Optional reason chips:

- Too oily
- Too bland
- Too expensive
- Portion issue
- Not fresh
- Wrong craving match
- Would reorder
- Would not reorder

#### 7. Regret Memory

The app should store or simulate regret learning.

Example:

```text
You previously marked late-night fried snacks as disappointing, so CraveWise avoided similar options tonight.
```

#### 8. Insights Screen

Dummy insights should show how CraveWise improves over time.

Example insights:

- "You usually enjoy spicy Asian meals on weekends."
- "You often regret oily snacks after 10 PM."
- "Your highest-rated orders are between Rs.300-500."
- "You are more likely to reorder from restaurants with medium-spice comfort meals."

---

## 10. Out Of Scope

The MVP will not include:

- live Swiggy/Zomato integration
- real restaurant availability
- real-time pricing
- food ordering
- payments
- delivery tracking
- calorie counting
- medical or nutrition advice
- social features
- friend networks
- multi-city restaurant database
- browser extension
- production database
- complex autonomous agents
- full personalization engine

---

## 11. Static Prototype Goal

The static prototype should answer:

```text
Does the flow of craving input -> one confident dish + restaurant recommendation -> reason -> feedback feel useful and trustworthy?
```

It should specifically test:

1. Does one recommendation feel better than a long list?
2. Does the reason increase trust?
3. Does referencing past taste/regret make the recommendation feel personal?
4. Is the feedback loop simple enough?
5. Does the product feel meaningfully different from Swiggy/Zomato browsing?

---

## 12. Static Prototype Screens

### Screen 1: Home

Purpose:

Introduce CraveWise as a food decision assistant.

Primary CTA:

```text
Find what to order tonight
```

Secondary message:

```text
One recommendation based on your taste, craving, budget, and past regrets.
```

---

### Screen 2: Taste Profile

Purpose:

Show that CraveWise knows the user's food behavior.

For static prototype, use sample personas.

Show:

- preferred cuisines
- usual budget
- favorite dishes
- regret patterns
- reorder favorites

CTA:

```text
Use this taste profile
```

---

### Screen 3: Craving Input

Purpose:

Capture the current decision context.

Inputs:

- craving text
- budget range
- occasion
- hunger level
- mood/heaviness preference

Example placeholder:

```text
Something spicy, satisfying, not too oily.
```

---

### Screen 4: Recommendation

Purpose:

Show one confident dish + restaurant recommendation.

Recommendation card should include:

- dish
- restaurant
- estimated price
- match score
- regret risk
- reason
- "why not other options?" note
- CTA: "I'll order this"
- secondary CTA: "Show backup options"

Example:

```text
Order: Chilli Garlic Noodles from Urban Wok House

Why this fits:
You usually rate spicy Asian dinners highly on weekends, and this stays within your Rs.400 budget. CraveWise avoided fried snacks because you previously marked similar late-night orders as oily and disappointing.

Regret risk: Low
Taste match: High
```

---

### Screen 5: Backup Options

Purpose:

Give control without overwhelming the user.

Show two cards:

1. Safer familiar option
2. Exploratory option

Each should include:

- dish
- restaurant
- price
- reason
- tradeoff

---

### Screen 6: Feedback

Purpose:

Capture post-meal signal.

Feedback options:

```text
Loved it / Meh / Disappointing
```

Optional reason chips:

```text
Too oily / Too bland / Too expensive / Portion issue / Wrong craving match / Would reorder
```

CTA:

```text
Save feedback
```

---

### Screen 7: Insights

Purpose:

Show the long-term value of regret-aware taste memory.

Dummy insights:

- top cuisines
- most satisfying price range
- regret patterns
- reorder-worthy meals
- avoided disappointing patterns

---

## 12A. Screen Transition Map

The prototype should follow this navigation flow:

```text
Home
  -> Taste Profile
  -> Craving Input
  -> Recommendation
```

From the Recommendation screen:

```text
Recommendation
  -> Primary CTA: "I'll order this"
  -> Feedback
  -> Insights
```

Secondary path:

```text
Recommendation
  -> Secondary CTA: "Not feeling this?"
  -> Backup Options
  -> Select backup option
  -> Feedback
  -> Insights
```

Feedback path:

```text
Feedback
  -> Submit feedback
  -> Insights

Feedback
  -> Skip feedback
  -> Insights
```

Insights path:

```text
Insights
  -> Start another recommendation
  -> Craving Input
```

### Navigation Rules

- The user should always be able to move forward.
- The user should not be forced to give feedback.
- Backup options should be hidden by default.
- The product should lead with one recommendation, but give the user an escape hatch.

---

## 13. Sample Data Plan

The static MVP will use realistic but anonymized sample data based on actual food-ordering behavior patterns.

No real personal addresses, phone numbers, real order IDs, or private account data should be used.

### Dataset 1: User Personas

File:

```text
sample-user-personas.json
```

Minimum:

- 6 personas

### Persona 1: Abhyudaya - Urban Weekend Foodie

```json
{
  "id": "persona_abhyudaya_weekend_foodie",
  "name": "Abhyudaya",
  "age": 29,
  "city": "Gurugram",
  "ordering_frequency": "3-5 times/week",
  "primary_mode": "weekend discovery",
  "budget_range": "Rs.350-700",
  "top_cuisines": ["Asian", "North Indian", "Street Food"],
  "comfort_foods": ["chilli garlic noodles", "butter chicken", "kathi rolls"],
  "top_regrets": ["oily late-night snacks", "overpriced biryani", "bland pan-Asian food"],
  "taste_notes": "Likes spicy, satisfying food but regrets very oily meals late at night.",
  "example_orders": [
    {
      "dish": "Chilli Garlic Noodles",
      "restaurant": "Urban Wok House",
      "rating": 5,
      "regret": "low",
      "reason": "matched spicy weekend craving"
    },
    {
      "dish": "Fried Momos",
      "restaurant": "Crispy Corner",
      "rating": 2,
      "regret": "high",
      "reason": "too oily late at night"
    },
    {
      "dish": "Butter Chicken Combo",
      "restaurant": "Mock Dhaba Co.",
      "rating": 4,
      "regret": "medium",
      "reason": "tasty but too heavy after 10 PM"
    }
  ]
}
```

### Persona 2: Simran - Budget-Conscious Office Worker

```json
{
  "id": "persona_simran_budget_office",
  "name": "Simran",
  "age": 27,
  "city": "Bengaluru",
  "ordering_frequency": "4-6 times/week",
  "primary_mode": "weekday lunch",
  "budget_range": "Rs.180-350",
  "top_cuisines": ["North Indian", "South Indian", "Chinese"],
  "comfort_foods": ["rajma rice", "dosa", "veg fried rice"],
  "top_regrets": ["small portions", "expensive bowls", "too much oil during work lunch"],
  "taste_notes": "Wants filling meals under budget and dislikes meals that feel poor value.",
  "example_orders": [
    {
      "dish": "Rajma Rice Bowl",
      "restaurant": "Homely Bowls",
      "rating": 5,
      "regret": "low",
      "reason": "filling and good value"
    },
    {
      "dish": "Premium Protein Bowl",
      "restaurant": "Fit Bowl Co.",
      "rating": 3,
      "regret": "medium",
      "reason": "too expensive for portion size"
    },
    {
      "dish": "Masala Dosa",
      "restaurant": "South Tiffin House",
      "rating": 4,
      "regret": "low",
      "reason": "reliable weekday lunch"
    }
  ]
}
```

### Persona 3: Kartik - Health-Aware But Inconsistent

```json
{
  "id": "persona_kartik_health_inconsistent",
  "name": "Kartik",
  "age": 31,
  "city": "Delhi",
  "ordering_frequency": "2-4 times/week",
  "primary_mode": "post-work dinner",
  "budget_range": "Rs.300-600",
  "top_cuisines": ["Healthy Bowls", "Mediterranean", "North Indian"],
  "comfort_foods": ["paneer bowl", "grilled chicken wrap", "dal rice"],
  "top_regrets": ["heavy creamy meals", "late-night desserts", "fried snacks after gym"],
  "taste_notes": "Wants to eat lighter but often gives in to comfort cravings.",
  "example_orders": [
    {
      "dish": "Paneer Protein Bowl",
      "restaurant": "Bowl Theory",
      "rating": 5,
      "regret": "low",
      "reason": "light but satisfying"
    },
    {
      "dish": "Loaded Cheese Fries",
      "restaurant": "Snack Garage",
      "rating": 2,
      "regret": "high",
      "reason": "felt heavy after gym"
    },
    {
      "dish": "Grilled Chicken Wrap",
      "restaurant": "Lean Bites",
      "rating": 4,
      "regret": "low",
      "reason": "good balance of taste and lightness"
    }
  ]
}
```

### Persona 4: Kushagra - Reorder-First Power User

```json
{
  "id": "persona_kushagra_reorder_power_user",
  "name": "Kushagra",
  "age": 28,
  "city": "Gurugram",
  "ordering_frequency": "5-7 times/week",
  "primary_mode": "fast weekday reorder",
  "budget_range": "Rs.250-500",
  "top_cuisines": ["North Indian", "Burgers", "Chinese"],
  "comfort_foods": ["dal makhani rice", "chicken burger", "hakka noodles"],
  "top_regrets": ["trying new places during work calls", "cold burgers", "high delivery-time orders"],
  "taste_notes": "Prefers reliable repeat meals during weekdays and experiments only when decision pressure is low.",
  "example_orders": [
    {
      "dish": "Dal Makhani Rice Bowl",
      "restaurant": "Comfort Curry Co.",
      "rating": 5,
      "regret": "low",
      "reason": "reliable and filling during work"
    },
    {
      "dish": "Classic Chicken Burger",
      "restaurant": "Burger Bay",
      "rating": 4,
      "regret": "medium",
      "reason": "good taste but sometimes arrives cold"
    },
    {
      "dish": "Experimental Thai Curry",
      "restaurant": "New Thai Box",
      "rating": 2,
      "regret": "high",
      "reason": "bad fit for weekday quick lunch"
    }
  ]
}
```

### Persona 5: Piyush - Deal-Led Explorer

```json
{
  "id": "persona_piyush_deal_led_explorer",
  "name": "Piyush",
  "age": 26,
  "city": "Noida",
  "ordering_frequency": "3-4 times/week",
  "primary_mode": "discount-led exploration",
  "budget_range": "Rs.200-450",
  "top_cuisines": ["Pizza", "Street Food", "Chinese"],
  "comfort_foods": ["cheese burst pizza", "momos", "chilli potato"],
  "top_regrets": ["choosing lowest-price deals", "low-rated restaurants", "greasy snacks"],
  "taste_notes": "Likes discovering new places but often overweights discounts and later regrets quality.",
  "example_orders": [
    {
      "dish": "Cheese Burst Pizza",
      "restaurant": "Slice Street",
      "rating": 4,
      "regret": "low",
      "reason": "good deal and satisfying"
    },
    {
      "dish": "Discount Combo Momos",
      "restaurant": "Budget Bites",
      "rating": 2,
      "regret": "high",
      "reason": "cheap but greasy and disappointing"
    },
    {
      "dish": "Chilli Potato",
      "restaurant": "Wok Express Lane",
      "rating": 3,
      "regret": "medium",
      "reason": "good craving match but too oily"
    }
  ]
}
```

### Persona 6: Pranish - Group-Ordering Negotiator

```json
{
  "id": "persona_pranish_group_ordering",
  "name": "Pranish",
  "age": 30,
  "city": "Delhi",
  "ordering_frequency": "2-3 times/week",
  "primary_mode": "group weekend ordering",
  "budget_range": "Rs.400-900",
  "top_cuisines": ["North Indian", "Italian", "Asian"],
  "comfort_foods": ["biryani", "pasta", "dim sums"],
  "top_regrets": ["group orders with too many compromises", "expensive meals that feel average", "restaurants with inconsistent quality"],
  "taste_notes": "Often orders with friends and wants a confident option that satisfies most people without becoming generic.",
  "example_orders": [
    {
      "dish": "Chicken Biryani",
      "restaurant": "Nawab Box",
      "rating": 5,
      "regret": "low",
      "reason": "worked well for a group dinner"
    },
    {
      "dish": "Creamy Alfredo Pasta",
      "restaurant": "Pasta Patio",
      "rating": 3,
      "regret": "medium",
      "reason": "expensive and too heavy"
    },
    {
      "dish": "Assorted Dim Sums",
      "restaurant": "Steam House",
      "rating": 4,
      "regret": "low",
      "reason": "safe exploratory option for group"
    }
  ]
}
```

### Static Prototype Default Persona

The first static prototype should use:

```text
Abhyudaya - Urban Weekend Foodie
```

Reason:

This persona best matches the initial wedge: weekend ordering paralysis, quality expectations, and regret-aware recommendations.

### Dataset 2: Sample Order History

File:

```text
sample-order-history.json
```

Minimum:

- 40 sample orders

Fields:

```text
order_id
persona_id
date
day_type
meal_time
city_area
restaurant_name
dish_name
cuisine
price
occasion
craving
spice_level
heaviness
personal_rating
regret_level
reorder_intent
feedback_reason
```

### Dataset 3: Sample Menu Catalog

File:

```text
sample-menu-catalog.json
```

Minimum:

- 20 restaurants
- 60 dishes

Fields:

```text
restaurant_id
restaurant_name
city_area
cuisine
dish_name
price
tags
spice_level
heaviness
best_for
```

### Dataset 4: Regret Patterns

File:

```text
regret-patterns.json
```

Minimum:

- 8 patterns

Example:

```json
{
  "pattern": "fried food late night",
  "regret_risk": "high",
  "reason": "Past late-night fried orders were rated low and marked too oily."
}
```

---

## 14. Recommendation Logic For Static MVP

The static MVP will use rule-based scoring.

This is not the final recommendation engine. It is a transparent heuristic used to simulate how CraveWise might reason once real AI and real user history are added.

### Recommendation Inputs

The scoring engine should consider:

- current craving
- budget
- occasion
- cuisine preference
- dish tags
- past satisfaction
- regret patterns
- heaviness preference
- reorder intent
- weekend fit

### Heuristic Scoring Weights

Approximate scoring weights:

| Signal | Weight |
|---|---:|
| Craving / tag match | +30 |
| Past satisfaction on similar cuisine or dish type | +25 |
| Budget fit | +15 |
| Occasion fit, especially weekend dinner | +10 |
| Reorder intent or known favorite pattern | +10 |
| Recency / freshness signal | +5 |
| Controlled novelty match | +5 |
| Regret risk penalty | -25 |
| Price above budget | -20 |
| Disliked cuisine/dish penalty | -30 |
| Heaviness mismatch penalty | -15 |

### Recommendation Selection

The system should return:

1. **Primary recommendation**  
   Highest total score, provided regret risk is not high.

2. **Safer backup**  
   Familiar option with high satisfaction and low regret risk.

3. **Exploratory backup**  
   Newer or less frequent option that still matches the user's taste profile.

### Minimum Recommendation Threshold

A recommendation should only be shown as the primary option if:

```text
score >= 60
and regret_risk != high
and price <= user_budget_max + 10%
```

If no option meets the threshold, show a fallback state.

### Explanation Requirement

Every recommendation must reference at least two user-specific signals.

Good explanation:

```text
This fits because you usually rate spicy Asian dinners highly on weekends, and you previously liked similar noodle dishes under Rs.400.
```

Bad explanation:

```text
This is popular and tasty.
```

That is too generic.

---

## 14A. Fallback And Error States

The static prototype should handle weak or missing recommendation matches gracefully.

### Case 1: Craving Input Too Vague

Example input:

```text
Something good
```

System response:

```text
I need one more signal to make a confident recommendation.
Are you leaning toward spicy, comforting, light, or something new?
```

UI behavior:

- Show 4 quick chips:
  - Spicy
  - Comforting
  - Light
  - Surprise me

### Case 2: No Recommendation Meets Threshold

System response:

```text
I do not have a strong enough match yet. Here are two safer options based on your past favorites.
```

UI behavior:

- Do not show a fake high-confidence recommendation.
- Show safer backup options.
- Explain that confidence is limited.

### Case 3: Budget Too Low For Matching Options

System response:

```text
The strongest matches are slightly above your budget. Do you want to increase budget by Rs.100 or see simpler options?
```

UI behavior:

- Show:
  - Increase budget
  - Show budget-safe options

### Case 4: High Regret Risk

If the highest-scoring option has high regret risk, do not show it as the primary recommendation.

System response:

```text
I avoided one strong craving match because similar orders disappointed you before.
```

UI behavior:

- Show a lower-regret option as primary.
- Mention avoided pattern in the explanation.

### Case 5: Static Data Limitation

If the user asks for something outside the dummy catalog:

```text
I do not have enough sample data for that craving yet. For this prototype, try spicy, North Indian, Asian, rolls, bowls, or comfort food.
```

This prevents the prototype from pretending to have real restaurant coverage.

---

## 15. AI Role - Future MVP+

AI should eventually help with:

1. interpreting vague cravings
2. converting craving text into structured food signals
3. matching current craving with past taste history
4. explaining why a recommendation fits
5. detecting regret risk
6. learning from post-meal feedback
7. generating taste insights over time

AI should not:

1. invent real restaurant availability
2. invent current prices
3. provide medical nutrition advice
4. make unsupported claims
5. hide uncertainty
6. overwhelm users with long ranked lists

---

## 16. Future Agentic Layer

Agents are not needed in the static prototype.

Later, CraveWise can use narrow agent-like modules.

### Context Interpreter Agent

Converts messy user craving into structured signals.

Input:

```text
I want something spicy but not oily.
```

Output:

```json
{
  "craving": "spicy",
  "avoid": ["oily"],
  "heaviness": "medium",
  "meal_type": "dinner"
}
```

### Recommendation Agent

Matches structured context against menu catalog and taste memory.

### Regret Prediction Agent

Checks recommendation against known regret patterns.

### Feedback Learning Agent

Updates taste memory based on post-meal feedback.

### Insights Agent

Generates weekly/monthly taste insights.

---

## 17. Feedback Policy

Feedback is optional.

The user should be able to skip feedback and still reach the Insights screen.

Reason:

Mandatory feedback creates friction and may block the demo flow.

However, the UI should make feedback feel lightweight and valuable.

Primary feedback options:

```text
Loved it / Meh / Disappointing
```

Optional reason chips:

```text
Too oily
Too bland
Too expensive
Portion issue
Not fresh
Wrong craving match
Would reorder
Would not reorder
```

If the user skips feedback, show this message:

```text
No worries. CraveWise gets smarter when you rate meals, but you can skip for now.
```

---

## 18. Success Metrics

### MVP Experience Metrics

1. Time to decision  
   Target: under 2 minutes.

2. Recommendation acceptance rate  
   Did the user choose the primary recommendation?

3. Reason trust score  
   Did the explanation make the recommendation feel credible?

4. Feedback completion rate  
   Did the user give post-meal feedback?

5. User preference for one answer vs list  
   Did the user prefer one confident recommendation over browsing?

### Long-Term Product Metrics

1. Post-meal satisfaction rate
2. Regret rate over time
3. Repeat weekend usage
4. Reorder intent
5. Backup option usage
6. Taste profile accuracy
7. NPS after repeated use

---

## 19. Insight Specificity Rule

Dummy insights must feel personal to the selected sample persona.

Bad insight:

```text
You like spicy food.
```

Good insight:

```text
You usually rate spicy Asian dinners highly on weekends, especially noodle-based dishes under Rs.400.
```

Bad insight:

```text
You sometimes regret unhealthy food.
```

Good insight:

```text
You marked 3 late-night fried snack orders as disappointing because they felt too oily or heavy.
```

Each dummy insight should reference:

- cuisine or dish type
- time/context
- satisfaction or regret signal
- specific behavioral pattern

---

## 20. Key Risks

### Risk 1: Cold Start

New users may not have usable history.

Mitigation:

- sample persona for prototype
- lightweight taste onboarding
- manual past-meal input later

### Risk 2: One Recommendation Is Wrong

One bad confident answer can break trust.

Mitigation:

- show reasoning
- show regret risk
- offer optional backups
- allow feedback correction

### Risk 3: No Real Availability

A recommended restaurant may be closed or unavailable.

Mitigation:

- static prototype uses dummy data
- clearly position as decision prototype
- real availability is future integration

### Risk 4: Feedback Is Too Weak

One-tap feedback may not explain why a meal failed.

Mitigation:

- add optional reason chips

### Risk 5: Product Feels Like A Generic Food Bot

If recommendations are not grounded in taste history, the wedge fails.

Mitigation:

- every recommendation must reference at least one user-specific signal

### Risk 6: Overbuilding Discovery

The product may drift into restaurant search.

Mitigation:

- lead with one recommendation
- avoid filters-heavy UI
- keep backups optional

---

## 21. Build Milestones

### Milestone 1: Static Prototype

Goal:

Build clickable UI using dummy data only.

Includes:

- home
- taste profile
- craving input
- recommendation
- backup options
- feedback
- insights

No AI.  
No backend.  
No database.

### Milestone 2: Rule-Based Recommendation

Goal:

Use sample data and scoring logic to select recommendations.

Includes:

- menu catalog
- order history
- regret patterns
- recommendation scoring

### Milestone 3: Feedback Loop

Goal:

Capture feedback and update local regret memory.

Includes:

- one-tap feedback
- optional reason chips
- local storage
- insights update

### Milestone 4: AI-Assisted Recommendation

Goal:

Use AI to interpret craving and generate explanation.

Includes:

- structured output
- Zod validation
- fallback response
- no hallucinated availability

### Milestone 5: Case Study + Portfolio Demo

Goal:

Package CraveWise as a public portfolio artifact.

Includes:

- demo video
- screenshots
- case study
- architecture diagram
- metrics
- tradeoffs
- README

---

## 22. Codex Build Instructions

Codex should follow this PRD exactly.

### First Build Task

Build only:

```text
Milestone 1: Static Prototype
```

### Codex Constraints

- Do not add AI.
- Do not add backend.
- Do not add database.
- Do not integrate Swiggy/Zomato.
- Do not scrape restaurant data.
- Do not build payments.
- Do not build delivery tracking.
- Do not finalize future agent architecture in code.
- Use dummy data only.
- Keep UI mobile-first.
- Make the full flow clickable.
- Update milestone tracker and feature memory.

### Acceptance Criteria

The static prototype is complete when:

1. User can start from home.
2. User can view/select a sample taste profile.
3. User can enter craving, budget, and occasion.
4. User sees one primary dish + restaurant recommendation.
5. User can reveal two backup options.
6. User can submit or skip post-meal feedback.
7. User can view dummy insights.
8. Fallback states exist for vague craving, low budget, high regret risk, and no strong match.
9. No AI/API/backend/database code exists.
10. The project runs locally.
11. Documentation is updated.

---

## 23. Final MVP Definition

The MVP of CraveWise is a mobile-first food decision prototype for urban Indian food delivery users who face weekend ordering paralysis.

It uses anonymized sample food-ordering data based on real personal patterns to simulate a future taste-memory engine.

The MVP helps users:

1. choose what to order faster
2. receive one specific dish + restaurant recommendation
3. understand why the recommendation fits their taste
4. avoid known regret patterns
5. give simple post-meal feedback
6. see how CraveWise learns over time

The MVP deliberately does not include live integrations, ordering, payments, delivery tracking, medical nutrition advice, or a real restaurant database.

The purpose of this MVP is to validate the core product thesis:

```text
A user may prefer one trusted, taste-aware recommendation over browsing hundreds of generic food options.
```

---

## 24. PRD v1.2 Addendum: Static Prototype Product Logic

This section supersedes any narrower v1.1 static prototype details where there is a conflict. The task is still Milestone 1: static prototype only.

### 24.1 Persona System

Personas in the static prototype are simulation profiles, not permanent user buckets. They exist so the prototype can demonstrate how CraveWise might use taste history, regret memory, budget behavior, and exploration tendency before real user data exists.

Clicking Start should let the user choose a persona:

- Abhyudaya - Urban Weekend Foodie
- Simran - Budget-Conscious Office Worker
- Kartik - Health-Aware But Inconsistent
- Kushagra - Reorder-First Power User
- Piyush - Deal-Led Explorer
- Pransih - Group-Ordering Negotiator

Each persona should load taste profile, budget behavior, order history, regret patterns, comfort foods, exploration tendency, and insight examples.

### 24.2 Million-User Personalization Model

At scale, users should not be locked into one persona. CraveWise should use multi-label behavioral profiling that changes by context.

Example behavioral buckets:

- Reorder Loyalist
- Weekend Explorer
- Deal Chaser
- Late-Night Regret-Prone Snacker
- Health-Intent User
- Group Decider
- Budget Filler
- Quality Seeker

A user can belong to multiple buckets depending on the situation.

Example:

```text
Weekday Reorder Loyalist + Weekend Explorer + Late-night Regret-Prone
```

### 24.3 Craving Interpretation Logic

Messy user text should be converted into structured food decision signals.

Input examples:

- `spicyy but not too oily`
- `italian mood`
- `kuch accha`
- `idk kuch mast but lighttt`
- `pizza but not cheese overloaded`

Static output schema:

```json
{
  "craving_type": ["spicy"],
  "cuisine_hint": "Asian",
  "dish_hint": null,
  "avoid": ["oily"],
  "budget_max": null,
  "occasion": "Weekend dinner",
  "heaviness": "medium",
  "exploration_intent": "somewhat_new",
  "confidence": "medium",
  "needs_clarification": false
}
```

Field contract:

```text
craving_type: string[]
cuisine_hint: string | null
dish_hint: string | null
avoid: string[]
budget_max: number | null
occasion: string | null
heaviness: "light" | "medium" | "heavy" | null
exploration_intent: "safe" | "somewhat_new" | "surprise_me"
confidence: "low" | "medium" | "high"
needs_clarification: boolean
```

Gibberish, spelling errors, Hinglish, and vague inputs should not fail silently. If confidence is low, show clarification chips: Spicy, Comforting, Light, Surprise me.

### 24.4 Budget Selection And Parsing

Budget UI should include:

- Under Rs.250
- Rs.250-400
- Rs.400-600
- Rs.600+
- Custom

Static text parsing should handle `under 300`, `around 500`, `not above 400`, and `budget 350`.

If no budget is provided, use the selected persona's usual budget range and show that assumption in the UI.

### 24.5 Exploration Intent

The CraveWise static prototype should include an exploration control:

- Safe pick
- Somewhat new
- Surprise me

Logic:

- Safe pick: prioritize high past satisfaction and reorder intent.
- Somewhat new: recommend a new dish or restaurant similar to known preferences.
- Surprise me: allow more novelty while still avoiding high-regret patterns.

### 24.6 Weekday Rush Mode

Weekday Rush is a static mode for fast, lower-regret lunch decisions under time pressure.

Add `Weekday Rush` as an occasion/mode option.

Available time chips:

- Under 20 min
- 20-30 min
- 30-45 min
- No rush

Upcoming constraint chips:

- Meeting soon
- Need light meal
- Can't feel sleepy
- No constraint

Static prototype must include one dummy Mexican comfort recommendation:

```text
Classic Chicken Burrito from Baja Bowl Co.
ETA: 18-22 mins
Delivery reliability: high
Regret risk: low
```

The reason should mention time pressure, meeting constraint, and comfort reorder pattern.

Menu catalog fields for Weekday Rush:

- estimated_delivery_min
- estimated_delivery_max
- delivery_reliability_score
- weekday_lunch_fit
- meeting_safe

Weekday Rush scoring should prioritize delivery ETA and known comfort orders over novelty.

Use dummy ETA data only. Do not claim real-time delivery availability.

### 24.7 Recommendation System Layers

Layer 1: hard filters.

- avoid disliked cuisine/dish
- avoid high regret risk as primary
- respect budget tolerance
- avoid unavailable data claims in static prototype

Layer 2: scoring.

Use the v1.1 heuristic weights and add:

| Signal | Weight |
|---|---:|
| Exploration fit | +12 |
| Weekday Rush ETA fit | +20 |
| Delivery reliability in Weekday Rush | +15 |
| Meeting-safe fit | +10 |

Layer 3: explanation.

Every recommendation must reference at least two user-specific signals.

### 24.8 Custom Feedback Classification

Feedback UI should include sentiment buttons, reason chips, and a custom text box.

Sentiment buttons:

- Loved it
- Meh
- Disappointing
- Skip

Reason chips:

- Too oily
- Too bland
- Too expensive
- Portion issue
- Not fresh
- Wrong craving match
- Too heavy
- Would reorder
- Would not reorder

Custom prompt:

```text
Tell CraveWise what happened.
```

Static classification schema:

```json
{
  "sentiment": "mixed",
  "taste_rating": 3,
  "value_rating": 4,
  "heaviness": "heavy",
  "regret_level": "medium",
  "reorder_intent": "maybe",
  "failure_reasons": ["Too heavy"],
  "learning": "Avoid heavy options before meetings."
}
```

### 24.9 Insights Engine

Insights should answer: `What has CraveWise learned about my food decisions?`

Insight types:

- taste insights
- regret insights
- budget insights
- exploration insights
- reorder insights
- recommendation quality insights

Each insight must be persona-specific and reference context.

Bad: `You like spicy food.`

Good: `Abhyudaya usually rates spicy Asian dinners highly on weekends, especially noodle-based dishes under Rs.400.`

### 24.10 Future MCP Integration

Swiggy/Zomato MCP may be explored later for supply-side data like menu lookup, restaurant discovery, price validation, and availability.

MCP is not part of Milestone 1.

CraveWise's core differentiation is demand-side intelligence: personal taste memory, regret learning, craving interpretation, and one confident recommendation.

### 24.11 Updated Static Prototype Scope

The v1.2 static prototype includes:

- persona selection
- taste profile preview
- craving input with messy text examples
- budget chips + custom budget
- occasion selector including Weekday Rush
- available time chips for Weekday Rush
- upcoming constraint chips for Weekday Rush
- exploration intent selector
- heaviness selector
- primary recommendation
- backup options
- fallback states
- feedback chips + custom feedback text
- persona-specific insights

Required user flow:

```text
Home
-> Persona Selection
-> Taste Profile Preview
-> Craving Input
-> Recommendation
-> Backup Options
-> Feedback
-> Insights
```
## 25. Open Questions For Later

1. Should real order history import happen through CSV upload, manual entry, email parsing, or browser extension?
2. What is the minimum order history needed for useful personalization?
3. Should weekday fast reorder become a separate mode?
4. How should CraveWise handle group ordering?
5. Should recommendations eventually include restaurant availability and delivery time?
6. Should feedback remain one-tap or become richer over time?
7. What is the safest way to introduce AI without hallucinating restaurant facts?




