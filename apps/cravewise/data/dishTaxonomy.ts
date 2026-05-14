export const dishTypes = [
  "biryani",
  "bowl",
  "burger",
  "burrito",
  "curry",
  "dim_sum",
  "dosa",
  "momos",
  "noodles",
  "pasta",
  "pizza",
  "platter",
  "roll",
  "salad",
  "snack",
  "wrap",
] as const;

export const cuisines = [
  "Asian",
  "Burgers",
  "Chinese",
  "Healthy Bowls",
  "Italian",
  "Mediterranean",
  "Mexican",
  "North Indian",
  "Pizza",
  "South Indian",
  "Street Food",
] as const;

export const contextSignals = [
  "group_order",
  "late_night",
  "meeting_soon",
  "post_work",
  "weekday_lunch",
  "weekday_rush",
  "weekend_dinner",
] as const;

export const preferenceSignals = [
  "comfort",
  "deal",
  "exploratory",
  "familiar",
  "filling",
  "fresh",
  "group_safe",
  "healthy",
  "light",
  "meeting_safe",
  "reorder",
  "spicy",
  "value",
] as const;

export const negativeConstraints = [
  "avoid_cheese_heavy",
  "avoid_creamy",
  "avoid_expensive",
  "avoid_heavy",
  "avoid_oily",
  "avoid_slow_delivery",
] as const;

export const regretRiskFlags = [
  "cheese_heavy",
  "creamy_heavy",
  "deal_trap",
  "expensive_average",
  "fried_oily",
  "heavy_meal",
  "low_quality",
  "portion_risk",
] as const;

export const reliabilityFlags = [
  "fast_eta",
  "freshness_sensitive",
  "high_reliability",
  "low_reliability",
  "meeting_safe",
  "slow_eta",
  "weekday_lunch_fit",
] as const;

export const budgetFitSignals = [
  "budget",
  "comfort",
  "premium",
  "splurge",
] as const;

export type DishType = (typeof dishTypes)[number];
export type Cuisine = (typeof cuisines)[number];
export type ContextSignal = (typeof contextSignals)[number];
export type PreferenceSignal = (typeof preferenceSignals)[number];
export type NegativeConstraint = (typeof negativeConstraints)[number];
export type RegretRiskFlag = (typeof regretRiskFlags)[number];
export type ReliabilityFlag = (typeof reliabilityFlags)[number];
export type BudgetFitSignal = (typeof budgetFitSignals)[number];

export type BudgetSignal = {
  max: number;
  source: "custom_text" | "budget_band";
};
