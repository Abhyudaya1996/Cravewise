# CraveWise Sample Data Requirements

This file translates the active PRD v1.2 into sample data requirements for the static prototype. It is not a separate product spec. If this file conflicts with `PRD.md`, follow `PRD.md`.

## Static Prototype Data Rule

Use realistic but dummy/anonymized data only.

Do not use:

- real order IDs
- real addresses
- phone numbers
- private account data
- scraped Swiggy/Zomato data
- live restaurant availability
- live pricing

## Required Static Datasets

### 1. `sample-user-personas.json` or local TypeScript equivalent

Minimum: 6 personas.

Required visible personas:

- Abhyudaya - Urban Weekend Foodie
- Simran - Budget-Conscious Office Worker
- Kartik - Health-Aware But Inconsistent
- Kushagra - Reorder-First Power User
- Piyush - Deal-Led Explorer
- Pransih - Group-Ordering Negotiator

Each persona should include:

- id
- name
- city
- primary mode
- budget range and budget behavior
- top cuisines
- comfort foods
- top regret pattern
- regret patterns
- exploration tendency
- behavioral buckets
- example past orders
- persona-specific insights

### 2. `sample-order-history.json` or local TypeScript equivalent

Minimum target for richer datasets: 40 sample orders.

Each order should include persona, meal time, day type, restaurant, dish, cuisine, price, craving, spice level, heaviness, personal rating, regret level, reorder intent, and feedback reason.

### 3. `sample-menu-catalog.json` or local TypeScript equivalent

Minimum target for richer datasets:

- 20 restaurants
- 60 dishes

Each menu item should include:

- restaurant_id
- restaurant_name
- city_area
- cuisine
- dish_name
- price
- tags
- spice_level
- heaviness
- best_for
- estimated_delivery_min
- estimated_delivery_max
- delivery_reliability_score
- weekday_lunch_fit
- meeting_safe

Required Weekday Rush dummy item:

```json
{
  "dish_name": "Classic Chicken Burrito",
  "restaurant_name": "Baja Bowl Co.",
  "cuisine": "Mexican",
  "estimated_delivery_min": 18,
  "estimated_delivery_max": 22,
  "delivery_reliability_score": 94,
  "weekday_lunch_fit": true,
  "meeting_safe": true
}
```

### 4. `regret-patterns.json` or local TypeScript equivalent

Minimum target: 8 regret patterns.

Each pattern should include pattern, regret risk, reason, avoid conditions, and trigger tags.

## Required Static Controls

- persona selection
- taste profile preview
- craving text input
- messy craving example chips
- budget chips and custom budget field
- occasion selector including Weekday Rush
- exploration intent selector
- heaviness selector
- Weekday Rush available time chips
- Weekday Rush upcoming constraint chips
- feedback sentiment buttons
- feedback reason chips
- custom feedback text box

## Required Recommendation Shapes

The static prototype should show:

1. one primary recommendation
2. one safer backup
3. one exploratory backup
4. fallback state for vague craving
5. fallback state for low budget
6. fallback state for high regret risk
7. fallback state for no strong match

## Required Local Functions

Static/local deterministic utilities may include:

- `interpretCravingStatic()`
- `scoreRecommendationStatic()`
- `classifyFeedbackStatic()`
- `generateInsightsStatic()`

No AI, MCP, backend, or database calls are allowed in Milestone 1.
