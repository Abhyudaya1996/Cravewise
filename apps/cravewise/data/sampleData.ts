import {
  BudgetFitSignal,
  BudgetSignal,
  ContextSignal,
  Cuisine,
  DishType,
  NegativeConstraint,
  PreferenceSignal,
  RegretRiskFlag,
  ReliabilityFlag,
} from "./dishTaxonomy";

export type ExplorationIntent = "safe" | "somewhat_new" | "surprise_me";
export type Heaviness = "light" | "medium" | "heavy";
export type BudgetBand = "Under Rs.250" | "Rs.250-400" | "Rs.400-600" | "Rs.600+" | "Custom";
export type Occasion = "Weekend dinner" | "Weekday lunch" | "Late night" | "Post-work" | "Group order" | "Weekday Rush";

export type Persona = {
  id: string;
  name: string;
  title: string;
  city: string;
  budgetRange: string;
  budgetMin: number;
  budgetMax: number;
  topCuisines: string[];
  comfortFoods: string[];
  primaryMode: string;
  topRegretPattern: string;
  regretPatterns: string[];
  explorationTendency: string;
  behavioralBuckets: string[];
  tasteSummary: string;
  exampleOrders: Array<{
    dish: string;
    restaurant: string;
    rating: number;
    regret: "low" | "medium" | "high";
    reason: string;
  }>;
  insights: Record<"taste" | "regret" | "budget" | "exploration" | "reorder" | "quality", string>;
};

export type MenuItem = {
  id: string;
  restaurantName: string;
  dishName: string;
  cuisine: Cuisine;
  price: number;
  tags: string[];
  dishType: DishType;
  preferenceTags: PreferenceSignal[];
  contextFit: ContextSignal[];
  regretRiskFlags: RegretRiskFlag[];
  reliabilityTags: ReliabilityFlag[];
  avoidIf: NegativeConstraint[];
  budgetTier: BudgetFitSignal;
  priceComfortBand: BudgetFitSignal;
  spiceLevel: "low" | "medium" | "high";
  heaviness: Heaviness;
  bestFor: Occasion[];
  personaFit: string[];
  regretRisk: "low" | "medium" | "high";
  reorderSignal: "low" | "medium" | "high";
  novelty: "familiar" | "somewhat_new" | "surprising";
  estimatedDeliveryMin: number;
  estimatedDeliveryMax: number;
  deliveryReliabilityScore: number;
  weekdayLunchFit: boolean;
  meetingSafe: boolean;
};

export type DecisionContext = {
  cravingText: string;
  budgetBand: BudgetBand;
  customBudget: string;
  occasion: Occasion;
  explorationIntent: ExplorationIntent;
  heaviness: "Light" | "Medium" | "Filling";
  availableTime: "Under 20 min" | "20-30 min" | "30-45 min" | "No rush";
  upcomingConstraint: "Meeting soon" | "Need light meal" | "Can't feel sleepy" | "No constraint";
};

export type CravingInterpretation = {
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
};

type RawMenuItem = Omit<
  MenuItem,
  "dishType" | "preferenceTags" | "contextFit" | "regretRiskFlags" | "reliabilityTags" | "avoidIf" | "budgetTier" | "priceComfortBand"
>;

export type Recommendation = {
  item: MenuItem;
  score: number;
  type: "primary" | "safe" | "explore";
  confidence: "limited" | "medium" | "high";
  budgetFit: string;
  reason: string;
  avoidedNote: string;
  tradeoff: string;
  memoryNotes: string[];
  scoreBreakdown: ScoreBreakdown;
};

export type ScoreBreakdown = {
  explicitDishIntentScore: number;
  cuisineIntentScore: number;
  contextFitScore: number;
  preferenceMatchScore: number;
  negativeConstraintPenalty: number;
  personaPreferenceScore: number;
  feedbackMemoryScore: number;
  reliabilityScore: number;
  budgetScore: number;
  explorationScore: number;
  heavinessScore: number;
  regretRiskPenalty: number;
  finalScore: number;
};

export type FallbackState = {
  type: "clarification_needed" | "budget_too_low" | "limited_match" | "high_regret_avoided" | "static_data_limitation" | "none";
  severity: "info" | "warning" | "blocking";
  title: string;
  message: string;
  shouldSuppressPrimaryRecommendation: boolean;
  suggestedActions?: string[];
};

export type FeedbackClassification = {
  sentiment: "positive" | "mixed" | "negative";
  taste_rating: number | null;
  value_rating: number | null;
  heaviness: Heaviness | null;
  regret_level: "low" | "medium" | "high";
  reorder_intent: "yes" | "maybe" | "no";
  failure_reasons: FailureReasonCode[];
  learning: string;
};

export type FailureReasonCode =
  | "too_oily"
  | "too_bland"
  | "too_expensive"
  | "portion_issue"
  | "too_heavy"
  | "delivery_issue"
  | "reliability_issue"
  | "wrong_craving_match"
  | "bad_personalization"
  | "would_reorder"
  | "would_not_reorder"
  | "not_fresh"
  | "static_data_limitation";

export type ScoringFeedbackMemory = {
  personaId: string;
  decisionContext: {
    rawCraving: string;
    occasion: string;
    availableTime?: string;
    upcomingConstraint?: string;
  };
  selectedRecommendation: {
    dishName: string;
    restaurantName: string;
    price: number;
  };
  feedback: {
    sentiment: "loved" | "meh" | "disappointing" | "skipped";
  };
  classification: {
    sentiment: "positive" | "mixed" | "negative";
    regretLevel: "low" | "medium" | "high";
    failureReasons: string[];
    reorderIntent: "yes" | "maybe" | "no";
  };
};

export const feedbackReasonLabels: Record<FailureReasonCode, string> = {
  too_oily: "Too oily",
  too_bland: "Too bland",
  too_expensive: "Too expensive",
  portion_issue: "Portion issue",
  too_heavy: "Too heavy",
  delivery_issue: "Delivery issue",
  reliability_issue: "Reliability issue",
  wrong_craving_match: "Ignored my craving",
  bad_personalization: "Bad personalization",
  would_reorder: "Would reorder",
  would_not_reorder: "Would not reorder",
  not_fresh: "Not fresh",
  static_data_limitation: "Static data limitation",
};

export const cravingExamples = [
  "spicyy but not too oily",
  "Italian mood",
  "kuch accha",
  "pizza but not cheese overloaded",
];

export const budgetBands: BudgetBand[] = ["Under Rs.250", "Rs.250-400", "Rs.400-600", "Rs.600+", "Custom"];
export const occasions: Occasion[] = ["Weekend dinner", "Weekday lunch", "Late night", "Post-work", "Group order", "Weekday Rush"];
export const explorationOptions = [
  { label: "Safe pick", value: "safe" },
  { label: "Somewhat new", value: "somewhat_new" },
  { label: "Surprise me", value: "surprise_me" },
] as const;
export const heavinessOptions = ["Light", "Medium", "Filling"] as const;
export const timeOptions = ["Under 20 min", "20-30 min", "30-45 min", "No rush"] as const;
export const constraintOptions = ["Meeting soon", "Need light meal", "Can't feel sleepy", "No constraint"] as const;
export const feedbackReasons = [
  "Too oily",
  "Too bland",
  "Too expensive",
  "Portion issue",
  "Not fresh",
  "Wrong craving match",
  "Ignored my craving",
  "Delivery issue",
  "Reliability issue",
  "Too heavy",
  "Would reorder",
  "Would not reorder",
];

export const personas: Persona[] = [
  {
    id: "persona_abhyudaya_weekend_foodie",
    name: "Abhyudaya",
    title: "Urban Weekend Foodie",
    city: "Gurugram",
    budgetRange: "Rs.350-700",
    budgetMin: 350,
    budgetMax: 700,
    topCuisines: ["Asian", "North Indian", "Street Food"],
    comfortFoods: ["chilli garlic noodles", "butter chicken", "kathi rolls"],
    primaryMode: "weekend discovery",
    topRegretPattern: "oily late-night snacks",
    regretPatterns: ["oily late-night snacks", "overpriced biryani", "bland pan-Asian food"],
    explorationTendency: "likes controlled novelty when quality signal is strong",
    behavioralBuckets: ["Weekend Explorer", "Quality Seeker", "Late-Night Regret-Prone Snacker"],
    tasteSummary: "Likes spicy, satisfying weekend dinners but avoids very oily late-night food.",
    exampleOrders: [
      { dish: "Chilli Garlic Noodles", restaurant: "Urban Wok House", rating: 5, regret: "low", reason: "matched spicy weekend craving" },
      { dish: "Fried Momos", restaurant: "Crispy Corner", rating: 2, regret: "high", reason: "too oily late at night" },
      { dish: "Butter Chicken Combo", restaurant: "Mock Dhaba Co.", rating: 4, regret: "medium", reason: "tasty but too heavy after 10 PM" },
    ],
    insights: {
      taste: "Abhyudaya usually rates spicy Asian dinners highly on weekends, especially noodle-based dishes under Rs.400.",
      regret: "Abhyudaya marked late-night fried snacks as disappointing when they felt oily or heavy.",
      budget: "Abhyudaya's strongest low-regret zone is Rs.350-500 for weekend dinner.",
      exploration: "Abhyudaya likes new Asian restaurants when the dish is familiar and not fried-heavy.",
      reorder: "Chilli garlic noodles and kathi rolls are strong reorder patterns for Abhyudaya.",
      quality: "Recommendations earn trust when they explain which oily options CraveWise avoided.",
    },
  },
  {
    id: "persona_simran_budget_office",
    name: "Simran",
    title: "Budget-Conscious Office Worker",
    city: "Bengaluru",
    budgetRange: "Rs.180-350",
    budgetMin: 180,
    budgetMax: 350,
    topCuisines: ["North Indian", "South Indian", "Chinese"],
    comfortFoods: ["rajma rice", "dosa", "veg fried rice"],
    primaryMode: "weekday lunch",
    topRegretPattern: "small portions",
    regretPatterns: ["small portions", "expensive bowls", "too much oil during work lunch"],
    explorationTendency: "explores only when value and portion reliability are clear",
    behavioralBuckets: ["Budget Filler", "Reorder Loyalist"],
    tasteSummary: "Wants filling, reliable lunch under budget and dislikes poor value.",
    exampleOrders: [
      { dish: "Rajma Rice Bowl", restaurant: "Homely Bowls", rating: 5, regret: "low", reason: "filling and good value" },
      { dish: "Premium Protein Bowl", restaurant: "Fit Bowl Co.", rating: 3, regret: "medium", reason: "too expensive for portion size" },
      { dish: "Masala Dosa", restaurant: "South Tiffin House", rating: 4, regret: "low", reason: "reliable weekday lunch" },
    ],
    insights: {
      taste: "Simran rates North Indian and South Indian lunch bowls highest when portions feel filling.",
      regret: "Simran often regrets expensive bowls when portion size feels weak.",
      budget: "Simran's best weekday lunch outcomes sit between Rs.180-320.",
      exploration: "Simran explores safely when a new option resembles rajma rice or dosa patterns.",
      reorder: "Rajma rice and masala dosa are strong reorder anchors for Simran.",
      quality: "Recommendations should mention value and portion reliability to feel trustworthy for Simran.",
    },
  },
  {
    id: "persona_kartik_health_inconsistent",
    name: "Kartik",
    title: "Health-Aware But Inconsistent",
    city: "Delhi",
    budgetRange: "Rs.300-600",
    budgetMin: 300,
    budgetMax: 600,
    topCuisines: ["Healthy Bowls", "Mediterranean", "North Indian"],
    comfortFoods: ["paneer bowl", "grilled chicken wrap", "dal rice"],
    primaryMode: "post-work dinner",
    topRegretPattern: "heavy creamy meals",
    regretPatterns: ["heavy creamy meals", "late-night desserts", "fried snacks after gym"],
    explorationTendency: "likes lighter versions of comfort meals",
    behavioralBuckets: ["Health-Intent User", "Reorder Loyalist"],
    tasteSummary: "Wants lighter dinners but still needs comfort and satiety after work.",
    exampleOrders: [
      { dish: "Paneer Protein Bowl", restaurant: "Bowl Theory", rating: 5, regret: "low", reason: "light but satisfying" },
      { dish: "Loaded Cheese Fries", restaurant: "Snack Garage", rating: 2, regret: "high", reason: "felt heavy after gym" },
      { dish: "Grilled Chicken Wrap", restaurant: "Lean Bites", rating: 4, regret: "low", reason: "balanced taste and lightness" },
    ],
    insights: {
      taste: "Kartik rates paneer bowls and wraps well when they feel light but satisfying.",
      regret: "Kartik regrets creamy or fried meals most after gym or late post-work dinners.",
      budget: "Kartik's useful range is Rs.300-550 when lightness and satiety both show up.",
      exploration: "Kartik explores best through lighter versions of known comfort foods.",
      reorder: "Paneer protein bowls and grilled wraps are high-reorder patterns for Kartik.",
      quality: "Recommendations should explain lightness without making medical or nutrition claims.",
    },
  },
  {
    id: "persona_kushagra_reorder_power_user",
    name: "Kushagra",
    title: "Reorder-First Power User",
    city: "Gurugram",
    budgetRange: "Rs.250-500",
    budgetMin: 250,
    budgetMax: 500,
    topCuisines: ["North Indian", "Burgers", "Chinese", "Mexican"],
    comfortFoods: ["dal makhani rice", "chicken burger", "hakka noodles", "chicken burrito"],
    primaryMode: "fast weekday reorder",
    topRegretPattern: "trying new places during work calls",
    regretPatterns: ["trying new places during work calls", "cold burgers", "high delivery-time orders"],
    explorationTendency: "prefers safe repeats when time pressure is high",
    behavioralBuckets: ["Weekday Reorder Loyalist", "Budget Filler"],
    tasteSummary: "Needs reliable weekday meals that arrive fast and do not disrupt work.",
    exampleOrders: [
      { dish: "Dal Makhani Rice Bowl", restaurant: "Comfort Curry Co.", rating: 5, regret: "low", reason: "reliable and filling during work" },
      { dish: "Classic Chicken Burrito", restaurant: "Baja Bowl Co.", rating: 5, regret: "low", reason: "fast comfort lunch before a meeting" },
      { dish: "Experimental Thai Curry", restaurant: "New Thai Box", rating: 2, regret: "high", reason: "bad fit for weekday quick lunch" },
    ],
    insights: {
      taste: "Kushagra rates comfort lunches highest when they are familiar, filling, and not messy before meetings.",
      regret: "Kushagra regrets novelty during work calls, especially when ETA is unreliable.",
      budget: "Kushagra's weekday comfort range is Rs.250-450.",
      exploration: "Kushagra explores better on weekends than during weekday rush moments.",
      reorder: "Classic Chicken Burrito and dal makhani rice are strong comfort reorder patterns.",
      quality: "Recommendations for Kushagra should prioritize ETA reliability before novelty in Weekday Rush.",
    },
  },
  {
    id: "persona_piyush_deal_led_explorer",
    name: "Piyush",
    title: "Deal-Led Explorer",
    city: "Noida",
    budgetRange: "Rs.200-450",
    budgetMin: 200,
    budgetMax: 450,
    topCuisines: ["Pizza", "Street Food", "Chinese"],
    comfortFoods: ["cheese burst pizza", "momos", "chilli potato"],
    primaryMode: "discount-led exploration",
    topRegretPattern: "lowest-price deals",
    regretPatterns: ["choosing lowest-price deals", "low-rated restaurants", "greasy snacks"],
    explorationTendency: "high novelty appetite but needs quality guardrails",
    behavioralBuckets: ["Deal Chaser", "Weekend Explorer"],
    tasteSummary: "Likes discovery and deals, but often regrets low-quality oily snacks.",
    exampleOrders: [
      { dish: "Cheese Burst Pizza", restaurant: "Slice Street", rating: 4, regret: "low", reason: "good deal and satisfying" },
      { dish: "Discount Combo Momos", restaurant: "Budget Bites", rating: 2, regret: "high", reason: "cheap but greasy" },
      { dish: "Chilli Potato", restaurant: "Wok Express Lane", rating: 3, regret: "medium", reason: "good craving match but too oily" },
    ],
    insights: {
      taste: "Piyush enjoys pizza and Chinese snacks when the deal does not compromise quality.",
      regret: "Piyush regrets the lowest-price deal when it maps to greasy or low-quality food.",
      budget: "Piyush's better outcomes sit near Rs.250-420, not always the cheapest option.",
      exploration: "Piyush likes novelty, but CraveWise should filter out low-quality discount traps.",
      reorder: "Cheese burst pizza is a safer reorder anchor than random combo snacks.",
      quality: "Recommendations should explain why they are not simply the cheapest deal.",
    },
  },
  {
    id: "persona_pransih_group_ordering",
    name: "Pransih",
    title: "Group-Ordering Negotiator",
    city: "Delhi",
    budgetRange: "Rs.400-900",
    budgetMin: 400,
    budgetMax: 900,
    topCuisines: ["North Indian", "Italian", "Asian"],
    comfortFoods: ["biryani", "pasta", "dim sums"],
    primaryMode: "group weekend ordering",
    topRegretPattern: "too many group compromises",
    regretPatterns: ["too many group compromises", "expensive average meals", "inconsistent restaurants"],
    explorationTendency: "moderate novelty if it satisfies most people",
    behavioralBuckets: ["Group Decider", "Quality Seeker"],
    tasteSummary: "Often orders for groups and wants a confident option that avoids bland compromise.",
    exampleOrders: [
      { dish: "Chicken Biryani", restaurant: "Nawab Box", rating: 5, regret: "low", reason: "worked well for a group dinner" },
      { dish: "Creamy Alfredo Pasta", restaurant: "Pasta Patio", rating: 3, regret: "medium", reason: "expensive and too heavy" },
      { dish: "Assorted Dim Sums", restaurant: "Steam House", rating: 4, regret: "low", reason: "safe exploratory option for group" },
    ],
    insights: {
      taste: "Pransih gets better group outcomes with North Indian or Asian dishes that feel familiar but not boring.",
      regret: "Pransih regrets expensive group orders when the meal feels average or compromised.",
      budget: "Pransih's useful group range is Rs.500-850 when quality signals are clear.",
      exploration: "Pransih can explore when the choice still satisfies most people in the group.",
      reorder: "Biryani and dim sums are reliable group reorder anchors.",
      quality: "Recommendations should explain why the pick avoids generic group compromise.",
    },
  },
];

const rawMenuCatalog: RawMenuItem[] = [
  {
    id: "urban-wok-chilli-garlic-noodles",
    restaurantName: "Urban Wok House",
    dishName: "Chilli Garlic Noodles",
    cuisine: "Asian",
    price: 380,
    tags: ["spicy", "noodles", "comfort", "not oily"],
    spiceLevel: "high",
    heaviness: "medium",
    bestFor: ["Weekend dinner", "Post-work"],
    personaFit: ["persona_abhyudaya_weekend_foodie"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 28,
    estimatedDeliveryMax: 36,
    deliveryReliabilityScore: 82,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "comfort-curry-dal-makhani",
    restaurantName: "Comfort Curry Co.",
    dishName: "Dal Makhani Rice Bowl",
    cuisine: "North Indian",
    price: 340,
    tags: ["comfort", "filling", "reorder"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Weekday lunch", "Post-work"],
    personaFit: ["persona_kushagra_reorder_power_user", "persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 24,
    estimatedDeliveryMax: 32,
    deliveryReliabilityScore: 86,
    weekdayLunchFit: true,
    meetingSafe: false,
  },
  {
    id: "steam-house-dim-sums",
    restaurantName: "Steam House",
    dishName: "Assorted Dim Sums",
    cuisine: "Asian",
    price: 460,
    tags: ["asian", "light", "group", "explore"],
    spiceLevel: "medium",
    heaviness: "light",
    bestFor: ["Group order", "Weekend dinner"],
    personaFit: ["persona_pransih_group_ordering", "persona_abhyudaya_weekend_foodie"],
    regretRisk: "medium",
    reorderSignal: "high",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 32,
    estimatedDeliveryMax: 42,
    deliveryReliabilityScore: 76,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "baja-bowl-classic-chicken-burrito",
    restaurantName: "Baja Bowl Co.",
    dishName: "Classic Chicken Burrito",
    cuisine: "Mexican",
    price: 390,
    tags: ["mexican", "comfort", "weekday rush", "reorder", "meeting safe"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday Rush", "Weekday lunch"],
    personaFit: ["persona_kushagra_reorder_power_user"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 18,
    estimatedDeliveryMax: 22,
    deliveryReliabilityScore: 94,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "slice-street-cheese-pizza",
    restaurantName: "Slice Street",
    dishName: "Cheese Burst Pizza",
    cuisine: "Pizza",
    price: 420,
    tags: ["pizza", "cheese", "deal", "comfort"],
    spiceLevel: "low",
    heaviness: "heavy",
    bestFor: ["Weekend dinner"],
    personaFit: ["persona_piyush_deal_led_explorer"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 34,
    estimatedDeliveryMax: 45,
    deliveryReliabilityScore: 73,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "slice-street-thin-crust-veggie-pizza",
    restaurantName: "Slice Street",
    dishName: "Thin Crust Veggie Pizza",
    cuisine: "Pizza",
    price: 460,
    tags: ["pizza", "italian", "light_cheese", "comfort", "not_too_heavy"],
    spiceLevel: "low",
    heaviness: "medium",
    bestFor: ["Weekend dinner", "Weekday lunch"],
    personaFit: ["persona_piyush_deal_led_explorer", "persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 40,
    deliveryReliabilityScore: 78,
    weekdayLunchFit: true,
    meetingSafe: false,
  },
  {
    id: "homely-bowls-rajma-rice",
    restaurantName: "Homely Bowls",
    dishName: "Rajma Rice Bowl",
    cuisine: "North Indian",
    price: 240,
    tags: ["budget", "filling", "weekday lunch", "comfort"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday lunch", "Weekday Rush"],
    personaFit: ["persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 20,
    estimatedDeliveryMax: 28,
    deliveryReliabilityScore: 88,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "lean-bites-grilled-wrap",
    restaurantName: "Lean Bites",
    dishName: "Grilled Chicken Wrap",
    cuisine: "Mediterranean",
    price: 360,
    tags: ["light", "post-work", "wrap", "not heavy"],
    spiceLevel: "low",
    heaviness: "light",
    bestFor: ["Post-work", "Weekday lunch"],
    personaFit: ["persona_kartik_health_inconsistent"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 26,
    estimatedDeliveryMax: 34,
    deliveryReliabilityScore: 80,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "nawab-box-chicken-biryani",
    restaurantName: "Nawab Box",
    dishName: "Chicken Biryani",
    cuisine: "North Indian",
    price: 620,
    tags: ["group", "biryani", "comfort", "filling"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Group order", "Weekend dinner"],
    personaFit: ["persona_pransih_group_ordering"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 36,
    estimatedDeliveryMax: 48,
    deliveryReliabilityScore: 82,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "steam-house-chilli-garlic-dim-sums",
    restaurantName: "Steam House",
    dishName: "Chilli Garlic Steamed Dim Sums",
    cuisine: "Asian",
    price: 340,
    tags: ["spicy", "asian", "fried_snack", "light", "fresh", "not_too_heavy"],
    spiceLevel: "high",
    heaviness: "light",
    bestFor: ["Late night", "Weekend dinner"],
    personaFit: ["persona_abhyudaya_weekend_foodie"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 22,
    estimatedDeliveryMax: 30,
    deliveryReliabilityScore: 88,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "crispy-corner-fried-momos",
    restaurantName: "Crispy Corner",
    dishName: "Fried Momos",
    cuisine: "Street Food",
    price: 220,
    tags: ["fried", "oily", "greasy", "fried_snack", "deal_trap"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Late night"],
    personaFit: ["persona_abhyudaya_weekend_foodie", "persona_piyush_deal_led_explorer"],
    regretRisk: "high",
    reorderSignal: "low",
    novelty: "familiar",
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 44,
    deliveryReliabilityScore: 66,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "crispy-corner-schezwan-momos",
    restaurantName: "Crispy Corner",
    dishName: "Schezwan Fried Momos",
    cuisine: "Chinese",
    price: 280,
    tags: ["spicy", "fried", "oily", "fried_snack", "late_night"],
    spiceLevel: "high",
    heaviness: "medium",
    bestFor: ["Late night", "Weekend dinner"],
    personaFit: ["persona_abhyudaya_weekend_foodie", "persona_piyush_deal_led_explorer"],
    regretRisk: "medium",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 26,
    estimatedDeliveryMax: 38,
    deliveryReliabilityScore: 72,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "south-tiffin-masala-dosa",
    restaurantName: "South Tiffin House",
    dishName: "Masala Dosa",
    cuisine: "South Indian",
    price: 210,
    tags: ["south indian", "budget", "value", "weekday_rush", "reliable"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday lunch", "Weekday Rush"],
    personaFit: ["persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 18,
    estimatedDeliveryMax: 25,
    deliveryReliabilityScore: 90,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "south-tiffin-idli-sambar",
    restaurantName: "South Tiffin House",
    dishName: "Idli Sambar Combo",
    cuisine: "South Indian",
    price: 180,
    tags: ["south indian", "budget", "light", "value", "fast_delivery", "reliable"],
    spiceLevel: "low",
    heaviness: "light",
    bestFor: ["Weekday lunch", "Weekday Rush"],
    personaFit: ["persona_simran_budget_office", "persona_kartik_health_inconsistent"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 16,
    estimatedDeliveryMax: 24,
    deliveryReliabilityScore: 91,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "homely-bowls-chole-rice",
    restaurantName: "Homely Bowls",
    dishName: "Chole Rice Bowl",
    cuisine: "North Indian",
    price: 260,
    tags: ["budget", "value", "filling", "comfort", "weekday_rush"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday lunch", "Weekday Rush"],
    personaFit: ["persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 22,
    estimatedDeliveryMax: 30,
    deliveryReliabilityScore: 87,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "budget-wok-veg-fried-rice",
    restaurantName: "Budget Wok",
    dishName: "Veg Fried Rice",
    cuisine: "Chinese",
    price: 240,
    tags: ["chinese", "budget", "value", "comfort", "weekday_rush"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday lunch", "Weekday Rush"],
    personaFit: ["persona_simran_budget_office"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 20,
    estimatedDeliveryMax: 31,
    deliveryReliabilityScore: 82,
    weekdayLunchFit: true,
    meetingSafe: false,
  },
  {
    id: "fit-bowl-premium-protein-bowl",
    restaurantName: "Fit Bowl Co.",
    dishName: "Premium Protein Bowl",
    cuisine: "Healthy Bowls",
    price: 560,
    tags: ["healthy", "light", "fresh", "expensive"],
    spiceLevel: "low",
    heaviness: "medium",
    bestFor: ["Weekday lunch", "Post-work"],
    personaFit: ["persona_kartik_health_inconsistent", "persona_simran_budget_office"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 28,
    estimatedDeliveryMax: 38,
    deliveryReliabilityScore: 78,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "bowl-theory-paneer-protein-bowl",
    restaurantName: "Bowl Theory",
    dishName: "Paneer Protein Bowl",
    cuisine: "Healthy Bowls",
    price: 420,
    tags: ["healthy", "light", "fresh", "comfort", "not_too_heavy"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Post-work", "Weekday lunch"],
    personaFit: ["persona_kartik_health_inconsistent"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 24,
    estimatedDeliveryMax: 32,
    deliveryReliabilityScore: 84,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "comfort-curry-creamy-paneer-butter-masala",
    restaurantName: "Comfort Curry Co.",
    dishName: "Creamy Paneer Butter Masala Combo",
    cuisine: "North Indian",
    price: 430,
    tags: ["comfort", "heavy", "creamy", "filling"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Post-work", "Weekend dinner"],
    personaFit: ["persona_kartik_health_inconsistent"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 40,
    deliveryReliabilityScore: 80,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "snack-garage-loaded-cheese-fries",
    restaurantName: "Snack Garage",
    dishName: "Loaded Cheese Fries",
    cuisine: "Street Food",
    price: 290,
    tags: ["fried", "oily", "cheese_heavy", "heavy", "deal_trap"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Late night"],
    personaFit: ["persona_kartik_health_inconsistent", "persona_piyush_deal_led_explorer"],
    regretRisk: "high",
    reorderSignal: "low",
    novelty: "familiar",
    estimatedDeliveryMin: 34,
    estimatedDeliveryMax: 48,
    deliveryReliabilityScore: 63,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "baja-bowl-veggie-burrito-bowl",
    restaurantName: "Baja Bowl Co.",
    dishName: "Veggie Burrito Bowl",
    cuisine: "Mexican",
    price: 360,
    tags: ["mexican", "burrito", "healthy", "fresh", "weekday_rush", "fast_delivery", "reliable"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday Rush", "Weekday lunch"],
    personaFit: ["persona_kushagra_reorder_power_user", "persona_kartik_health_inconsistent"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 17,
    estimatedDeliveryMax: 25,
    deliveryReliabilityScore: 92,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "taco-yard-loaded-burrito",
    restaurantName: "Taco Yard",
    dishName: "Loaded Chicken Burrito",
    cuisine: "Mexican",
    price: 440,
    tags: ["mexican", "burrito", "heavy", "low_reliability"],
    spiceLevel: "high",
    heaviness: "heavy",
    bestFor: ["Weekend dinner"],
    personaFit: ["persona_kushagra_reorder_power_user"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 38,
    estimatedDeliveryMax: 55,
    deliveryReliabilityScore: 64,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "quick-comfort-chicken-kathi-roll",
    restaurantName: "Quick Comfort Co.",
    dishName: "Chicken Kathi Roll",
    cuisine: "North Indian",
    price: 310,
    tags: ["comfort", "weekday_rush", "fast_delivery", "reliable", "spicy", "filling"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekday Rush", "Weekday lunch", "Post-work"],
    personaFit: ["persona_kushagra_reorder_power_user", "persona_abhyudaya_weekend_foodie"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 16,
    estimatedDeliveryMax: 24,
    deliveryReliabilityScore: 90,
    weekdayLunchFit: true,
    meetingSafe: true,
  },
  {
    id: "slice-street-value-margherita",
    restaurantName: "Slice Street",
    dishName: "Value Margherita Pizza",
    cuisine: "Pizza",
    price: 320,
    tags: ["pizza", "italian", "value", "comfort", "light_cheese"],
    spiceLevel: "low",
    heaviness: "medium",
    bestFor: ["Weekend dinner", "Weekday lunch"],
    personaFit: ["persona_piyush_deal_led_explorer", "persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 26,
    estimatedDeliveryMax: 34,
    deliveryReliabilityScore: 84,
    weekdayLunchFit: true,
    meetingSafe: false,
  },
  {
    id: "pasta-patio-arrabbiata-pasta",
    restaurantName: "Pasta Patio",
    dishName: "Arrabbiata Pasta",
    cuisine: "Italian",
    price: 480,
    tags: ["italian", "pasta", "spicy", "comfort", "not_too_heavy"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Weekend dinner", "Group order"],
    personaFit: ["persona_pransih_group_ordering", "persona_piyush_deal_led_explorer"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 40,
    deliveryReliabilityScore: 81,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "budget-bites-discount-momos-combo",
    restaurantName: "Budget Bites",
    dishName: "Discount Momos Combo",
    cuisine: "Street Food",
    price: 190,
    tags: ["fried", "oily", "greasy", "deal_trap", "fried_snack"],
    spiceLevel: "medium",
    heaviness: "heavy",
    bestFor: ["Late night"],
    personaFit: ["persona_piyush_deal_led_explorer"],
    regretRisk: "high",
    reorderSignal: "low",
    novelty: "surprising",
    estimatedDeliveryMin: 35,
    estimatedDeliveryMax: 52,
    deliveryReliabilityScore: 58,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "nawab-box-paneer-tikka-platter",
    restaurantName: "Nawab Box",
    dishName: "Paneer Tikka Platter",
    cuisine: "North Indian",
    price: 560,
    tags: ["group_safe", "group", "comfort", "spicy", "sharing"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Group order", "Weekend dinner"],
    personaFit: ["persona_pransih_group_ordering"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 32,
    estimatedDeliveryMax: 42,
    deliveryReliabilityScore: 84,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "steam-house-asian-sharing-box",
    restaurantName: "Steam House",
    dishName: "Asian Sharing Box",
    cuisine: "Asian",
    price: 740,
    tags: ["group_safe", "group", "asian", "fresh", "sharing", "exploratory"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Group order", "Weekend dinner"],
    personaFit: ["persona_pransih_group_ordering"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 34,
    estimatedDeliveryMax: 44,
    deliveryReliabilityScore: 83,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "new-thai-box-experimental-curry",
    restaurantName: "New Thai Box",
    dishName: "Experimental Thai Curry",
    cuisine: "Asian",
    price: 520,
    tags: ["asian", "exploratory", "polarizing", "low_reliability"],
    spiceLevel: "high",
    heaviness: "medium",
    bestFor: ["Weekend dinner", "Group order"],
    personaFit: ["persona_pransih_group_ordering", "persona_kushagra_reorder_power_user"],
    regretRisk: "high",
    reorderSignal: "low",
    novelty: "surprising",
    estimatedDeliveryMin: 42,
    estimatedDeliveryMax: 58,
    deliveryReliabilityScore: 60,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "family-table-comfort-platter",
    restaurantName: "Family Table",
    dishName: "Comfort Sharing Platter",
    cuisine: "North Indian",
    price: 680,
    tags: ["group_safe", "group", "comfort", "sharing", "value"],
    spiceLevel: "medium",
    heaviness: "medium",
    bestFor: ["Group order", "Weekend dinner"],
    personaFit: ["persona_pransih_group_ordering"],
    regretRisk: "low",
    reorderSignal: "high",
    novelty: "familiar",
    estimatedDeliveryMin: 30,
    estimatedDeliveryMax: 40,
    deliveryReliabilityScore: 86,
    weekdayLunchFit: false,
    meetingSafe: true,
  },
  {
    id: "sweet-house-gulab-jamun-combo",
    restaurantName: "Sweet House",
    dishName: "Gulab Jamun Combo",
    cuisine: "North Indian",
    price: 180,
    tags: ["sweet", "dessert", "comfort", "light"],
    spiceLevel: "low",
    heaviness: "light",
    bestFor: ["Weekend dinner", "Post-work"],
    personaFit: ["persona_abhyudaya_weekend_foodie", "persona_simran_budget_office"],
    regretRisk: "low",
    reorderSignal: "medium",
    novelty: "familiar",
    estimatedDeliveryMin: 20,
    estimatedDeliveryMax: 30,
    deliveryReliabilityScore: 82,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
  {
    id: "dessert-box-chocolate-lava-cake",
    restaurantName: "Dessert Box",
    dishName: "Chocolate Lava Cake",
    cuisine: "Italian",
    price: 320,
    tags: ["sweet", "dessert", "comfort"],
    spiceLevel: "low",
    heaviness: "medium",
    bestFor: ["Weekend dinner"],
    personaFit: ["persona_abhyudaya_weekend_foodie"],
    regretRisk: "medium",
    reorderSignal: "medium",
    novelty: "somewhat_new",
    estimatedDeliveryMin: 25,
    estimatedDeliveryMax: 38,
    deliveryReliabilityScore: 76,
    weekdayLunchFit: false,
    meetingSafe: false,
  },
];

export const menuCatalog: MenuItem[] = rawMenuCatalog.map(enrichMenuItem);

export function getPersona(id: string): Persona {
  return personas.find((persona) => persona.id === id) ?? personas[0];
}

function enrichMenuItem(item: RawMenuItem): MenuItem {
  const dishType = inferDishType(item);
  const preferenceTags = inferPreferenceTags(item);
  const contextFit = inferContextFit(item);
  const regretRiskFlags = inferRegretRiskFlags(item);
  const reliabilityTags = inferReliabilityTags(item);
  const avoidIf = inferAvoidIf(item, regretRiskFlags);
  const budgetTier = inferBudgetTier(item.price);

  return {
    ...item,
    dishType,
    preferenceTags,
    contextFit,
    regretRiskFlags,
    reliabilityTags,
    avoidIf,
    budgetTier,
    priceComfortBand: budgetTier,
  };
}

function inferDishType(item: RawMenuItem): DishType {
  const text = `${item.dishName} ${item.tags.join(" ")}`.toLowerCase();
  if (/biryani/.test(text)) return "biryani";
  if (/burger/.test(text)) return "burger";
  if (/burrito/.test(text)) return "burrito";
  if (/curry|dal|makhani|rajma|butter chicken/.test(text)) return "curry";
  if (/dessert|gulab|halwa|kheer|ice cream|lava cake|brownie|waffle|cake/.test(text)) return "dessert";
  if (/dim sum|dimsum/.test(text)) return "dim_sum";
  if (/dosa/.test(text)) return "dosa";
  if (/momo|momos/.test(text)) return "momos";
  if (/noodle|hakka/.test(text)) return "noodles";
  if (/pasta|alfredo/.test(text)) return "pasta";
  if (/pizza/.test(text)) return "pizza";
  if (/platter/.test(text)) return "platter";
  if (/roll|kathi/.test(text)) return "roll";
  if (/salad/.test(text)) return "salad";
  if (/wrap/.test(text)) return "wrap";
  if (/snack|fries|potato|pakora/.test(text)) return "snack";
  return "bowl";
}

function inferPreferenceTags(item: RawMenuItem): PreferenceSignal[] {
  const tags = item.tags.join(" ").toLowerCase();
  const values: PreferenceSignal[] = [];
  if (item.spiceLevel === "high" || /spicy|chilli|schezwan|chatpata/.test(tags)) values.push("spicy");
  if (/comfort|reorder|homely|filling/.test(tags) || item.reorderSignal === "high") values.push("comfort");
  if (/filling|protein|platter|combo/.test(tags) || item.heaviness === "heavy") values.push("filling");
  if (/light|salad|healthy|lean|not_too_heavy/.test(tags) || item.heaviness === "light") values.push("light");
  if (/meaty|meat|chicken|biryani|kathi|non veg|non-veg/.test(`${item.dishName} ${tags}`.toLowerCase())) values.push("meaty");
  if (/healthy|protein|lean|bowl/.test(tags) || item.cuisine === "Healthy Bowls" || item.cuisine === "Mediterranean") values.push("healthy");
  if (inferDishType(item) === "dessert" || /sweet|dessert|mithai|meetha|gulab|chocolate|ice cream|brownie|lava cake/.test(`${item.dishName} ${tags}`.toLowerCase())) values.push("sweet");
  if (/fresh|not oily|not_oily/.test(tags)) values.push("fresh");
  if (/group|sharing|group_safe/.test(tags) || item.bestFor.includes("Group order")) values.push("group_safe");
  if (/deal|value|budget/.test(tags)) values.push("deal", "value");
  if (/reorder/.test(tags) || item.reorderSignal === "high") values.push("reorder");
  if (/meeting safe|meeting_safe/.test(tags) || item.meetingSafe) values.push("meeting_safe");
  if (item.novelty === "familiar") values.push("familiar");
  if (item.novelty !== "familiar") values.push("exploratory");
  return uniqueSignals(values);
}

function inferContextFit(item: RawMenuItem): ContextSignal[] {
  return uniqueSignals(item.bestFor.flatMap(occasionToContextSignals));
}

function inferRegretRiskFlags(item: RawMenuItem): RegretRiskFlag[] {
  const text = `${item.dishName} ${item.tags.join(" ")}`.toLowerCase();
  const values: RegretRiskFlag[] = [];
  if (/fried|greasy|fries|momo|momos|potato/.test(text) || (/oily/.test(text) && !/not oily/.test(text))) values.push("fried_oily");
  if (/cheese burst|loaded cheese|extra cheese|cheese_overloaded/.test(text)) values.push("cheese_heavy");
  if (/creamy|alfredo/.test(text) || (item.heaviness === "heavy" && item.cuisine === "Italian")) values.push("creamy_heavy");
  if (/deal|discount|budget bites|cheap/.test(text) && item.regretRisk !== "low") values.push("deal_trap");
  if (item.price > 600 && item.regretRisk !== "low") values.push("expensive_average");
  if (item.heaviness === "heavy") values.push("heavy_meal");
  if (/low quality|low-rated/.test(text)) values.push("low_quality");
  if (/portion/.test(text)) values.push("portion_risk");
  return uniqueSignals(values);
}

function inferReliabilityTags(item: RawMenuItem): ReliabilityFlag[] {
  const values: ReliabilityFlag[] = [];
  if (item.estimatedDeliveryMax <= 30) values.push("fast_eta");
  if (item.estimatedDeliveryMax > 35) values.push("slow_eta");
  if (item.deliveryReliabilityScore >= 85) values.push("high_reliability");
  if (item.deliveryReliabilityScore < 78) values.push("low_reliability");
  if (item.weekdayLunchFit) values.push("weekday_lunch_fit");
  if (item.meetingSafe) values.push("meeting_safe");
  if (item.tags.some((tag) => ["fresh", "salad", "wrap"].includes(tag))) values.push("freshness_sensitive");
  return uniqueSignals(values);
}

function inferAvoidIf(item: RawMenuItem, regretRiskFlags: RegretRiskFlag[]): NegativeConstraint[] {
  const values: NegativeConstraint[] = [];
  if (regretRiskFlags.includes("fried_oily")) values.push("avoid_oily");
  if (regretRiskFlags.includes("cheese_heavy")) values.push("avoid_cheese_heavy");
  if (regretRiskFlags.includes("creamy_heavy")) values.push("avoid_creamy", "avoid_heavy");
  if (item.heaviness === "heavy") values.push("avoid_heavy");
  if (item.price > 600) values.push("avoid_expensive");
  if (item.estimatedDeliveryMax > 35 || item.deliveryReliabilityScore < 78) values.push("avoid_slow_delivery");
  if (/\b(meat|chicken|mutton|non.?veg)\b/.test(`${item.dishName} ${item.tags.join(" ")}`.toLowerCase())) values.push("avoid_non_veg");
  return uniqueSignals(values);
}

function inferBudgetTier(price: number): BudgetFitSignal {
  if (price <= 250) return "budget";
  if (price <= 450) return "comfort";
  if (price <= 650) return "premium";
  return "splurge";
}

export function parseBudgetMax(context: DecisionContext, persona: Persona): number {
  if (context.budgetBand === "Under Rs.250") return 250;
  if (context.budgetBand === "Rs.250-400") return 400;
  if (context.budgetBand === "Rs.400-600") return 600;
  if (context.budgetBand === "Rs.600+") return 900;
  const parsed = context.customBudget.match(/\d+/)?.[0];
  return parsed ? Number(parsed) : persona.budgetMax;
}

function matchDishIntents(text: string): DishType[] {
  const values: DishType[] = [];
  if (/biryani/.test(text)) values.push("biryani");
  if (/bowl|rice bowl|protein bowl/.test(text)) values.push("bowl");
  if (/burger/.test(text)) values.push("burger");
  if (/burrito/.test(text)) values.push("burrito");
  if (/curry|dal|rajma|butter chicken/.test(text)) values.push("curry");
  if (hasSweetIntent(text) && /dessert|gulab jamun|mithai|halwa|kheer|ice cream|lava cake|brownie|waffle|cake/.test(text)) values.push("dessert");
  if (/dim sum|dimsum/.test(text)) values.push("dim_sum");
  if (/dosa/.test(text)) values.push("dosa");
  if (/momo|momos/.test(text)) values.push("momos");
  if (/noodle|noodles|hakka/.test(text)) values.push("noodles");
  if (/pasta|alfredo/.test(text)) values.push("pasta");
  if (/pizza/.test(text)) values.push("pizza");
  if (/platter/.test(text)) values.push("platter");
  if (/roll|kathi/.test(text)) values.push("roll");
  if (/salad/.test(text)) values.push("salad");
  if (/snack|fries|pakora|potato/.test(text)) values.push("snack");
  if (/wrap/.test(text)) values.push("wrap");
  return values;
}

function matchCuisineIntents(text: string): Cuisine[] {
  const values: Cuisine[] = [];
  if (/asian|thai|dim sum|dimsum/.test(text)) values.push("Asian");
  if (/burger/.test(text)) values.push("Burgers");
  if (/chinese|noodle|hakka|schezwan|chilli garlic/.test(text)) values.push("Chinese");
  if (/healthy|protein bowl|salad/.test(text)) values.push("Healthy Bowls");
  if (/italian|pasta/.test(text)) values.push("Italian");
  if (/mediterranean/.test(text)) values.push("Mediterranean");
  if (/mexican|burrito/.test(text)) values.push("Mexican");
  if (/north indian|dal|rajma|butter chicken|biryani/.test(text)) values.push("North Indian");
  if (/pizza/.test(text)) values.push("Pizza");
  if (/south indian|dosa/.test(text)) values.push("South Indian");
  if (/street food|momo|momos|roll|snack|pakora/.test(text)) values.push("Street Food");
  return values;
}

function matchContextSignals(text: string): ContextSignal[] {
  const values: ContextSignal[] = [];
  if (/group|team|friends|sharing/.test(text)) values.push("group_order");
  if (/late night|11 pm|midnight|after 10|night/.test(text)) values.push("late_night");
  if (/meeting|call/.test(text)) values.push("meeting_soon");
  if (/post work|after work|after gym/.test(text)) values.push("post_work");
  if (/weekday lunch|lunch/.test(text)) values.push("weekday_lunch");
  if (/rush|20 mins|20 min|quick|fast|asap/.test(text)) values.push("weekday_rush");
  if (/weekend|dinner/.test(text)) values.push("weekend_dinner");
  return values;
}

function hasMeatyIntent(text: string): boolean {
  if (/\b(no|not|without|avoid)\s+(too\s+)?(meat|meaty|chicken|non.?veg)\b/.test(text)) return false;
  return /\b(meaty|meat|chicken|non.?veg|mutton)\b/.test(text);
}

function hasSweetIntent(text: string): boolean {
  if (/\b(not|no|avoid|less|without)\s+(too\s+)?sweet\b/.test(text)) return false;
  return /\bsweet tooth\b|\bsomething sweet\b|\bcraving sweet\b|\bdessert\b|\bmithai\b|\bmeetha\b|\bkuch meetha\b|\bgulab\b|\bgulab jamun\b|\bchocolate\b|\bbrownie\b|\blava cake\b|\bice cream\b|\bcake\b/.test(text);
}

function matchPreferenceSignals(text: string): PreferenceSignal[] {
  const values: PreferenceSignal[] = [];
  if (/spicy|spicyy|chatpata|schezwan|chilli/.test(text)) values.push("spicy");
  if (/comfort|mast|accha|good|satisfying/.test(text)) values.push("comfort");
  if (/deal|discount|cheap/.test(text)) values.push("deal");
  if (/explore|new|surprise/.test(text)) values.push("exploratory");
  if (/familiar|safe|usual/.test(text)) values.push("familiar");
  if (/filling|full|satisfying/.test(text)) values.push("filling");
  if (/fresh/.test(text)) values.push("fresh");
  if (/group safe|safe for group|sharing/.test(text)) values.push("group_safe");
  if (/healthy|balanced/.test(text)) values.push("healthy");
  if (/light|lighttt|not heavy|sleepy/.test(text)) values.push("light");
  if (hasMeatyIntent(text)) values.push("meaty");
  if (/meeting safe|meeting/.test(text)) values.push("meeting_safe");
  if (/reorder|repeat/.test(text)) values.push("reorder");
  if (/value|budget|worth/.test(text)) values.push("value");
  if (hasSweetIntent(text)) values.push("sweet");
  return values;
}

function matchNegativeConstraints(text: string): NegativeConstraint[] {
  const values: NegativeConstraint[] = [];
  // "cheesy" alone is affirmative; constraint requires an explicit negative qualifier or a heavy-cheese phrase.
  if (/cheese overloaded|too much cheese|too cheesy|cheese heavy|loaded cheese|\b(not|no|avoid)\s+(too\s+)?cheese/.test(text)) values.push("avoid_cheese_heavy");
  // "creamy" alone is affirmative; constraint requires a negative qualifier.
  if (/\b(not|no|too|avoid)\s+(too\s+)?(creamy|cream)/.test(text)) values.push("avoid_creamy");
  if (/expensive|overpriced|not worth|under|budget|not above/.test(text)) values.push("avoid_expensive");
  // "sleepy" is treated as a heaviness constraint because the user is asking to avoid a meal that may feel too heavy for the context.
  if (/too heavy|not heavy|sleepy|light/.test(text)) values.push("avoid_heavy");
  // "oily" alone is affirmative; constraint requires a negative qualifier. "greasy" is kept as an implicit aversion.
  if (/\b(not|no|too|avoid)\s+(too\s+)?(oily|oil)|\bgreasy\b/.test(text)) values.push("avoid_oily");
  if (/slow delivery|late delivery|quick|fast|20 mins|20 min/.test(text)) values.push("avoid_slow_delivery");
  // "veg only", "vegetarian", "no meat/chicken/non-veg" signal a dietary constraint against non-vegetarian items.
  if (/\bveg(etarian)?\s+only\b|\bpure\s+veg\b|\b(no|not|without|avoid)\s+(meat|chicken|non.?veg)\b|\bvegetarian\b/.test(text)) values.push("avoid_non_veg");
  return values;
}

function occasionToContextSignals(occasion: Occasion): ContextSignal[] {
  if (occasion === "Group order") return ["group_order"];
  if (occasion === "Late night") return ["late_night"];
  if (occasion === "Post-work") return ["post_work"];
  if (occasion === "Weekday lunch") return ["weekday_lunch"];
  if (occasion === "Weekday Rush") return ["weekday_rush"];
  return ["weekend_dinner"];
}

function uniqueSignals<T extends string>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function createEmptyScoreBreakdown(): ScoreBreakdown {
  return {
    explicitDishIntentScore: 0,
    cuisineIntentScore: 0,
    contextFitScore: 0,
    preferenceMatchScore: 0,
    negativeConstraintPenalty: 0,
    personaPreferenceScore: 0,
    feedbackMemoryScore: 0,
    reliabilityScore: 0,
    budgetScore: 0,
    explorationScore: 0,
    heavinessScore: 0,
    regretRiskPenalty: 0,
    finalScore: 0,
  };
}

function calculateFinalScore(breakdown: ScoreBreakdown): number {
  return breakdown.explicitDishIntentScore +
    breakdown.cuisineIntentScore +
    breakdown.contextFitScore +
    breakdown.preferenceMatchScore +
    breakdown.negativeConstraintPenalty +
    breakdown.personaPreferenceScore +
    breakdown.feedbackMemoryScore +
    breakdown.reliabilityScore +
    breakdown.budgetScore +
    breakdown.explorationScore +
    breakdown.heavinessScore +
    breakdown.regretRiskPenalty;
}

export function interpretCravingStatic(context: DecisionContext): CravingInterpretation {
  const text = context.cravingText.toLowerCase();
  const explicitDishIntents = uniqueSignals<DishType>([
    ...matchDishIntents(text),
  ]);
  const cuisineIntents = uniqueSignals<Cuisine>([
    ...matchCuisineIntents(text),
    ...(explicitDishIntents.includes("pizza") ? ["Pizza" as Cuisine] : []),
    ...(explicitDishIntents.includes("burrito") ? ["Mexican" as Cuisine] : []),
  ]);
  const contextSignals = uniqueSignals<ContextSignal>([
    ...occasionToContextSignals(context.occasion),
    ...matchContextSignals(text),
    ...(context.upcomingConstraint === "Meeting soon" ? ["meeting_soon" as ContextSignal] : []),
  ]);
  const preferenceSignals = uniqueSignals<PreferenceSignal>([
    ...matchPreferenceSignals(text),
    ...(normalizeHeaviness(context.heaviness) === "light" ? ["light" as PreferenceSignal] : []),
    ...(normalizeHeaviness(context.heaviness) === "heavy" ? ["filling" as PreferenceSignal] : []),
  ]);
  const negativeConstraints = uniqueSignals<NegativeConstraint>([
    ...matchNegativeConstraints(text),
    ...(context.upcomingConstraint === "Can't feel sleepy" || context.upcomingConstraint === "Need light meal" ? ["avoid_heavy" as NegativeConstraint] : []),
  ]);
  const parsedBudget = text.match(/\d+/)?.[0];
  const budgetSignal = /not above|under|around|budget/.test(text) && parsedBudget
    ? { max: Number(parsedBudget), source: "custom_text" as const }
    : null;
  if (/not above|under|around|budget/.test(text)) {
    if (budgetSignal) return {
      explicitDishIntents,
      cuisineIntents,
      contextSignals,
      preferenceSignals: preferenceSignals.length ? preferenceSignals : ["comfort"],
      negativeConstraints,
      budgetSignal,
      rawInput: context.cravingText,
      occasion: context.occasion,
      heaviness: normalizeHeaviness(context.heaviness),
      exploration_intent: context.explorationIntent,
      confidence: "medium",
      needs_clarification: false,
    };
  }

  const vague = text.trim().length < 8 || /^(kuch accha|something good|idk)$/i.test(text.trim());
  return {
    explicitDishIntents,
    cuisineIntents,
    contextSignals,
    preferenceSignals: preferenceSignals.length ? preferenceSignals : ["comfort"],
    negativeConstraints,
    budgetSignal,
    rawInput: context.cravingText,
    occasion: context.occasion,
    heaviness: normalizeHeaviness(context.heaviness),
    exploration_intent: context.explorationIntent,
    confidence: vague ? "low" : cuisineIntents.length || explicitDishIntents.length || preferenceSignals.length > 1 ? "high" : "medium",
    needs_clarification: vague,
  };
}

export function scoreRecommendationStatic(
  persona: Persona,
  context: DecisionContext,
  feedbackMemory: ScoringFeedbackMemory[] = [],
  providedInterpretation?: CravingInterpretation,
): Recommendation[] {
  const interpretation = providedInterpretation ?? interpretCravingStatic(context);
  const budgetMax = interpretation.budgetSignal?.max ?? parseBudgetMax(context, persona);
  const isRush = context.occasion === "Weekday Rush";
  const hasExplicitIntent = Boolean(interpretation.explicitDishIntents.length || interpretation.cuisineIntents.length);
  const activeMemory = feedbackMemory.filter((memory) => memory.personaId === persona.id && memory.feedback.sentiment !== "skipped");

  // Scoring weights are raw ranking heuristics, not probabilities:
  // - Explicit dish intent: +70 match / -90 miss; explicit cuisine: +50 match / -70 miss.
  // - Budget: +15 within 110% of max / -20 above; context fit: +12 per fit, +24 group-safe boost.
  // - Persona fit: +25 normally or +12 when explicit intent leads; high reorder signal adds +18 safe / +10 otherwise.
  // - Preference match: +30; exploration: +12 for requested novelty fit; heaviness match: +8.
  // - Regret risk: -35 high / -10 medium; Weekday Rush reliability can add +20 fast ETA, +15 reliable, +12 lunch fit, +10 meeting-safe.
  // - Feedback memory is active-persona-only and applied through feedbackMemoryScore.
  // - Negative constraints are hard user boundaries, so matching items are filtered instead of receiving a hidden penalty.
  const scored = menuCatalog
    .filter((item) => !persona.regretPatterns.some((pattern) => item.tags.some((tag) => pattern.includes(tag) && item.regretRisk === "high")))
    .map((item) => {
      const memoryAdjustment = getLocalMemoryScoreAdjustment(item, persona, context, interpretation, activeMemory);
      const dishMatches = itemMatchesDishIntent(item, interpretation);
      const cuisineMatches = itemMatchesCuisineIntent(item, interpretation);
      const breakdown = createEmptyScoreBreakdown();

      if (interpretation.explicitDishIntents.length) breakdown.explicitDishIntentScore += dishMatches ? 70 : -90;
      if (interpretation.cuisineIntents.length) breakdown.cuisineIntentScore += cuisineMatches ? 50 : -70;
      breakdown.budgetScore += item.price <= budgetMax * 1.1 ? 15 : -20;
      if (item.bestFor.includes(context.occasion)) breakdown.contextFitScore += 12;
      if (item.contextFit.some((signal) => interpretation.contextSignals.includes(signal))) breakdown.contextFitScore += 12;
      if (interpretation.contextSignals.includes("group_order") && item.preferenceTags.includes("group_safe")) breakdown.contextFitScore += 24;
      if (item.personaFit.includes(persona.id)) breakdown.personaPreferenceScore += hasExplicitIntent ? 12 : 25;
      if (item.preferenceTags.some((signal) => interpretation.preferenceSignals.includes(signal))) breakdown.preferenceMatchScore += 30;
      if (interpretation.preferenceSignals.includes("meaty") && !item.preferenceTags.includes("meaty")) breakdown.preferenceMatchScore -= 35;
      if (interpretation.preferenceSignals.includes("sweet") && !item.preferenceTags.includes("sweet")) breakdown.preferenceMatchScore -= 35;
      if (interpretation.preferenceSignals.includes("filling") && !item.preferenceTags.includes("filling") && item.heaviness !== "heavy") breakdown.preferenceMatchScore -= 15;
      if (item.reorderSignal === "high") breakdown.personaPreferenceScore += context.explorationIntent === "safe" ? 18 : 10;
      if (context.explorationIntent === "somewhat_new" && item.novelty === "somewhat_new") breakdown.explorationScore += 12;
      if (context.explorationIntent === "surprise_me" && item.novelty !== "familiar") breakdown.explorationScore += 12;
      if (normalizeHeaviness(context.heaviness) === item.heaviness) breakdown.heavinessScore += 8;
      const timeWindowMax = getAvailableTimeMax(context.availableTime);
      if (timeWindowMax !== null) {
        if (item.estimatedDeliveryMax <= timeWindowMax) breakdown.reliabilityScore += 18;
        else if (item.estimatedDeliveryMin <= timeWindowMax) breakdown.reliabilityScore += 6;
        else if (item.estimatedDeliveryMax > timeWindowMax + 10) breakdown.reliabilityScore -= 28;
        else breakdown.reliabilityScore -= 14;
      }
      if (item.regretRisk === "high") breakdown.regretRiskPenalty -= 35;
      if (item.regretRisk === "medium") breakdown.regretRiskPenalty -= 10;
      if (isRush) {
        if (item.estimatedDeliveryMax <= 30) breakdown.reliabilityScore += 20;
        if (item.deliveryReliabilityScore >= 85) breakdown.reliabilityScore += 15;
        if (item.weekdayLunchFit) breakdown.reliabilityScore += 12;
        if (context.upcomingConstraint === "Meeting soon" && item.meetingSafe) breakdown.reliabilityScore += 10;
        if (item.novelty === "familiar") breakdown.explorationScore += 12;
        if (item.novelty === "surprising") breakdown.explorationScore -= 12;
      }
      breakdown.feedbackMemoryScore += memoryAdjustment.score;
      breakdown.finalScore = calculateFinalScore(breakdown);
      return { item, score: breakdown.finalScore, memoryNotes: memoryAdjustment.notes, scoreBreakdown: breakdown };
    })
    .filter(({ item }) => item.regretRisk !== "high")
    .filter(({ item }) => !hasExplicitIntent || itemMatchesExplicitIntent(item, interpretation))
    .filter(({ item }) => !interpretation.negativeConstraints.some((constraint) => itemMatchesNegativeConstraint(item, constraint)))
    .sort((a, b) => b.score - a.score);

  const fallbackScored = scored.length ? scored : menuCatalog
    .filter((item) => item.regretRisk !== "high")
    .map((item) => {
      const memoryAdjustment = getLocalMemoryScoreAdjustment(item, persona, context, interpretation, activeMemory);
      const breakdown = createEmptyScoreBreakdown();
      breakdown.feedbackMemoryScore = memoryAdjustment.score;
      breakdown.finalScore = -25 + memoryAdjustment.score;
      return { item, score: breakdown.finalScore, memoryNotes: memoryAdjustment.notes, scoreBreakdown: breakdown };
    })
    .sort((a, b) => b.score - a.score);

  const primary = fallbackScored[0];
  const safe = fallbackScored.find(({ item }) => item.novelty === "familiar" && item.id !== primary?.item.id);
  const explore = fallbackScored.find(({ item }) =>
    item.novelty !== "familiar" && item.id !== primary?.item.id && item.id !== safe?.item.id
  );

  return [
    primary ? makeRecommendation(primary.item, primary.score, "primary", persona, context, interpretation, budgetMax, primary.memoryNotes, primary.scoreBreakdown) : null,
    safe ? makeRecommendation(safe.item, safe.score, "safe", persona, context, interpretation, budgetMax, safe.memoryNotes, safe.scoreBreakdown) : null,
    explore ? makeRecommendation(explore.item, explore.score, "explore", persona, context, interpretation, budgetMax, explore.memoryNotes, explore.scoreBreakdown) : null,
  ].filter((recommendation): recommendation is Recommendation => Boolean(recommendation));
}

export function classifyFeedbackStatic(sentiment: "Loved it" | "Meh" | "Disappointing" | "Skipped" | "", reasons: string[], note: string): FeedbackClassification {
  const wrongCravingMatch = reasons.some((reason) => ["Wrong craving match", "Ignored my craving"].includes(reason)) ||
    /wanted|asked|crav|showing me|instead|ignored|not what i wanted|wrong/i.test(note);
  const normalizedReasons = normalizeFailureReasonCodes([
    ...reasons,
    ...(wrongCravingMatch ? ["wrong_craving_match"] : []),
    ...(/delivery|late|cold|arrived/i.test(note) ? ["delivery_issue"] : []),
    ...(/unreliable|eta|too long/i.test(note) ? ["reliability_issue"] : []),
  ]);
  const negativeReasons = normalizedReasons.filter((reason) => reason !== "would_reorder");
  const wouldReorder = reasons.includes("Would reorder");
  const wouldNotReorder = reasons.includes("Would not reorder") || wrongCravingMatch;
  const tooHeavy = reasons.includes("Too heavy") || /heavy|sleepy/i.test(note);
  return {
    sentiment: sentiment === "Loved it" && !wrongCravingMatch ? "positive" : sentiment === "Disappointing" ? "negative" : "mixed",
    taste_rating: sentiment === "Loved it" ? 5 : sentiment === "Disappointing" ? 2 : sentiment ? 3 : null,
    value_rating: normalizedReasons.includes("too_expensive") ? 2 : sentiment ? 4 : null,
    heaviness: tooHeavy ? "heavy" : reasons.includes("Too oily") ? "medium" : null,
    regret_level: sentiment === "Disappointing" || reasons.includes("Would not reorder") ? "high" : sentiment === "Meh" || negativeReasons.length ? "medium" : "low",
    reorder_intent: wouldReorder ? "yes" : wouldNotReorder ? "no" : sentiment === "Loved it" ? "yes" : sentiment === "Disappointing" ? "no" : "maybe",
    failure_reasons: negativeReasons,
    learning: wrongCravingMatch
      ? "Explicit dish or cuisine intent was ignored; future logic should prioritize craving match before persona defaults."
      : negativeReasons.length
      ? `Remember: ${negativeReasons.map((reason) => feedbackReasonLabels[reason]).join(", ")} affected this meal.`
      : wouldReorder
        ? "This meal should strengthen the reorder pattern."
        : "No strong negative learning captured yet.",
  };
}

export function normalizeFailureReasonCodes(reasons: string[]): FailureReasonCode[] {
  const normalized = reasons
    .map((reason) => normalizeFailureReasonCode(reason))
    .filter((reason): reason is FailureReasonCode => Boolean(reason));
  return Array.from(new Set(normalized));
}

export function getPersonaInsightsStatic(persona: Persona): string[] {
  return [
    persona.insights.taste,
    persona.insights.regret,
    persona.insights.budget,
    persona.insights.exploration,
    persona.insights.reorder,
    persona.insights.quality,
  ];
}

export function getFallbackState(persona: Persona, context: DecisionContext, recommendations: Recommendation[], interpretation: CravingInterpretation): FallbackState {
  const budgetMax = parseBudgetMax(context, persona);
  if (interpretation.needs_clarification) {
    return {
      type: "clarification_needed",
      severity: "blocking",
      title: "One more craving signal needed",
      message: "This craving is too vague for a confident recommendation. Add a signal like spicy, comforting, light, or surprise me.",
      shouldSuppressPrimaryRecommendation: true,
      suggestedActions: ["Add a craving detail", "Use a quick chip"],
    };
  }
  if (budgetMax < persona.budgetMin) {
    return {
      type: "budget_too_low",
      severity: "blocking",
      title: "Budget is below this taste profile",
      message: `This budget is below ${persona.name}'s usual low-regret range. Increase budget or choose a budget-safe option before trusting a primary pick.`,
      shouldSuppressPrimaryRecommendation: true,
      suggestedActions: ["Increase budget", "Show budget-safe options"],
    };
  }
  if (interpretation.explicitDishIntents.includes("pizza") && !recommendations.some((recommendation) => recommendation.item.dishType === "pizza" && !recommendation.item.avoidIf.includes("avoid_cheese_heavy"))) {
    return {
      type: "static_data_limitation",
      severity: "blocking",
      title: "No strong non-cheese-heavy pizza match",
      message: "I do not have a strong non-cheese-heavy pizza match in this prototype. Want a lighter Italian option or a budget-safe comfort meal?",
      shouldSuppressPrimaryRecommendation: true,
      suggestedActions: ["Try lighter Italian", "See budget-safe comfort"],
    };
  }
  if (recommendations[0]?.score < 60) {
    return {
      type: "limited_match",
      severity: "warning",
      title: "Limited confidence",
      message: "No strong match is available in the dummy catalog. Treat this as a low-confidence static suggestion, not a trusted primary answer.",
      shouldSuppressPrimaryRecommendation: false,
      suggestedActions: ["Review backups", "Add more context"],
    };
  }
  return {
    type: "high_regret_avoided",
    severity: "info",
    title: "High-regret options avoided",
    message: "High-regret options are filtered out as primary; review what CraveWise avoided before deciding.",
    shouldSuppressPrimaryRecommendation: false,
  };
}

function makeRecommendation(
  item: MenuItem,
  score: number,
  type: Recommendation["type"],
  persona: Persona,
  context: DecisionContext,
  interpretation: CravingInterpretation,
  budgetMax: number,
  memoryNotes: string[],
  scoreBreakdown: ScoreBreakdown,
): Recommendation {
  const isRush = context.occasion === "Weekday Rush";
  const budgetFit = item.price <= budgetMax ? `within ${context.budgetBand}` : `slightly above ${context.budgetBand}`;
  const explicitIntentCopy = getExplicitIntentCopy(interpretation);
  const activeConstraints = interpretation.negativeConstraints;
  const preferenceCopy = formatPreferenceCopy(interpretation.preferenceSignals);
  const caveats = getRecommendationCaveats(item, context, budgetMax);
  const caveatCopy = caveats.length ? ` ${caveats.join(" ")}` : "";
  const reason = isRush && item.id === "baja-bowl-classic-chicken-burrito"
    ? `${item.dishName} fits because ${persona.name} has a comfort reorder pattern for burritos, the dummy ETA is ${item.estimatedDeliveryMin}-${item.estimatedDeliveryMax} mins, and it is meeting-safe for "${context.upcomingConstraint}".${caveatCopy}`
    : explicitIntentCopy
      ? `${item.dishName} fits the explicit ${explicitIntentCopy} craving and stays ${budgetFit}.${activeConstraints.length ? ` It avoids active constraints: ${activeConstraints.map(formatNegativeConstraint).join(", ")}.` : " Persona defaults are secondary for this pick."}${caveatCopy}`
    : `${item.dishName} fits the ${preferenceCopy} ${formatOccasionCopy(context.occasion)} craving and matches ${persona.name}'s ${persona.topCuisines.slice(0, 2).join(" and ")} discovery pattern.${activeConstraints.length ? ` It avoids active constraints: ${activeConstraints.map(formatNegativeConstraint).join(", ")}.` : ""}${caveatCopy}`;
  return {
    item,
    score,
    type,
    confidence: score >= 80 ? "high" : score >= 60 ? "medium" : "limited",
    budgetFit,
    reason,
    avoidedNote: `CraveWise avoided high-regret patterns for ${persona.name}: ${persona.regretPatterns.slice(0, 2).join(", ")}. Static prototype uses dummy supply data only.`,
    tradeoff: type === "safe"
      ? "Safer familiar option with less novelty."
      : type === "explore"
        ? "More exploratory while still avoiding high-regret patterns."
        : item.novelty === "familiar"
          ? "Optimized for reliability over discovery."
          : "Balances craving fit with controlled exploration.",
    memoryNotes,
    scoreBreakdown,
  };
}

function getLocalMemoryScoreAdjustment(
  item: MenuItem,
  persona: Persona,
  context: DecisionContext,
  interpretation: CravingInterpretation,
  memories: ScoringFeedbackMemory[],
): { score: number; notes: string[] } {
  let score = 0;
  const notes = new Set<string>();
  const contextLateNight = isLateNightContext(context, interpretation);
  const friedSnackIntent = hasFriedSnackIntent(context, interpretation);
  const meetingContext = context.upcomingConstraint === "Meeting soon" || /meeting/i.test(context.cravingText);
  const explicitIntent = Boolean(interpretation.explicitDishIntents.length || interpretation.cuisineIntents.length);
  const highCustomBudget = context.budgetBand === "Custom" && parseBudgetMax(context, persona) > persona.budgetMax;

  memories.forEach((memory) => {
    const reasons = normalizeFailureReasonCodes(memory.classification.failureReasons);
    const negative = memory.feedback.sentiment === "disappointing" || memory.classification.sentiment === "negative" || memory.classification.regretLevel !== "low";
    const itemWasRejected = item.dishName === memory.selectedRecommendation.dishName ||
      item.restaurantName === memory.selectedRecommendation.restaurantName;

    if (negative && reasons.includes("too_oily") && (itemWasRejected || itemIsOilyFried(item))) {
      const penalty = contextLateNight || friedSnackIntent ? 34 : 18;
      score -= penalty;
      notes.add("You previously marked oily food as disappointing, so similar oily/fried options were penalized in this browser.");
    }

    if (negative && reasons.includes("too_oily") && friedSnackIntent && !itemIsOilyFried(item) && item.preferenceTags.includes("spicy")) {
      score += 6;
      notes.add("You previously marked oily food as disappointing, so lower-oil spicy options were preferred in this browser.");
    }

    if (negative && reasons.includes("too_heavy") && item.heaviness === "heavy") {
      const penalty = contextLateNight || context.occasion === "Weekday Rush" || meetingContext ? 28 : 16;
      score -= penalty;
      notes.add("You previously marked a meal as too heavy, so heavy options were penalized for this context.");
    }

    if (negative && reasons.includes("too_expensive") && !highCustomBudget && (item.price > memory.selectedRecommendation.price || item.price > persona.budgetMax)) {
      score -= 18;
      notes.add("You previously flagged value or price, so above-comfort-budget items were penalized.");
    }

    if (negative && reasons.includes("wrong_craving_match") && explicitIntent && !itemMatchesExplicitIntent(item, interpretation)) {
      score -= 45;
      notes.add("You previously flagged an ignored craving, so explicit dish/cuisine intent was weighted more strongly.");
    }

    if (negative && (reasons.includes("delivery_issue") || reasons.includes("reliability_issue")) && (item.deliveryReliabilityScore < 82 || item.estimatedDeliveryMax > 35)) {
      const penalty = context.occasion === "Weekday Rush" || meetingContext ? 30 : 16;
      score -= penalty;
      notes.add("You previously flagged delivery or reliability, so slower or lower-reliability options were penalized.");
    }

    if (negative && (reasons.includes("delivery_issue") || reasons.includes("reliability_issue")) && (context.occasion === "Weekday Rush" || meetingContext) && item.deliveryReliabilityScore >= 88 && item.estimatedDeliveryMax <= 30) {
      score += 6;
      notes.add("You previously flagged delivery or reliability, so faster high-reliability options were preferred in this local demo.");
    }

    if (memory.classification.reorderIntent === "yes" || reasons.includes("would_reorder")) {
      if (item.dishName === memory.selectedRecommendation.dishName) {
        score += 18;
        notes.add("A previous local reorder signal modestly boosted this same dish.");
      } else if (item.restaurantName === memory.selectedRecommendation.restaurantName) {
        score += 12;
        notes.add("A previous local reorder signal modestly boosted this restaurant.");
      } else if (!explicitIntent && similarToMemoryContext(item, memory)) {
        score += 8;
        notes.add("A previous local reorder signal modestly boosted similar options.");
      }
    }

    if (negative && (memory.classification.reorderIntent === "no" || reasons.includes("would_not_reorder"))) {
      if (item.dishName === memory.selectedRecommendation.dishName) {
        score -= 16;
        notes.add("You previously said you would not reorder this dish, so it was modestly penalized.");
      } else if (item.restaurantName === memory.selectedRecommendation.restaurantName) {
        score -= 10;
        notes.add("You previously said you would not reorder from this restaurant, so it was modestly penalized.");
      }
    }

    if (negative && reasons.includes("not_fresh")) {
      if (item.restaurantName === memory.selectedRecommendation.restaurantName) {
        score -= 14;
        notes.add("You previously flagged freshness, so the same restaurant was modestly penalized.");
      }
      if ((context.occasion === "Weekday Rush" || meetingContext) && (item.deliveryReliabilityScore < 85 || item.estimatedDeliveryMax > 35)) {
        score -= 10;
        notes.add("You previously flagged freshness, so reliability-sensitive options were treated more cautiously.");
      }
    }
  });

  return { score, notes: Array.from(notes).slice(0, 2) };
}

function normalizeHeaviness(value: DecisionContext["heaviness"]): Heaviness {
  if (value === "Light") return "light";
  if (value === "Filling") return "heavy";
  return "medium";
}

function getExplicitIntentCopy(interpretation: CravingInterpretation): string {
  const dish = interpretation.explicitDishIntents.map((value) => value.replace("_", " "));
  const cuisine = interpretation.cuisineIntents;
  return [...dish, ...cuisine].join(" / ");
}

function formatPreferenceCopy(preferences: PreferenceSignal[]): string {
  if (!preferences.length) return "comfort";
  return preferences.map((preference) => preference.replace("_", " ")).join(", ");
}

function formatOccasionCopy(occasion: Occasion): string {
  return occasion.toLowerCase().replace("weekday rush", "weekday-rush");
}

function getRecommendationCaveats(item: MenuItem, context: DecisionContext, budgetMax: number): string[] {
  const caveats: string[] = [];
  if (item.price > budgetMax) {
    caveats.push(`It is slightly above the selected budget at Rs.${item.price}.`);
  }
  const timeWindowMax = getAvailableTimeMax(context.availableTime);
  if (timeWindowMax !== null && item.estimatedDeliveryMax > timeWindowMax) {
    caveats.push(`The dummy ETA is ${item.estimatedDeliveryMin}-${item.estimatedDeliveryMax} mins, which may take longer than the ${context.availableTime} window.`);
  }
  return caveats;
}

function getAvailableTimeMax(availableTime: DecisionContext["availableTime"]): number | null {
  if (availableTime === "Under 20 min") return 20;
  if (availableTime === "20-30 min") return 30;
  if (availableTime === "30-45 min") return 45;
  return null;
}

function formatNegativeConstraint(constraint: NegativeConstraint): string {
  const labels: Record<NegativeConstraint, string> = {
    avoid_cheese_heavy: "cheese-heavy options",
    avoid_creamy: "creamy-heavy options",
    avoid_expensive: "above-budget options",
    avoid_heavy: "heavy options",
    avoid_non_veg: "non-vegetarian options",
    avoid_oily: "oily/fried options",
    avoid_slow_delivery: "slow or unreliable options",
  };
  return labels[constraint];
}

function itemMatchesExplicitIntent(item: MenuItem, interpretation: CravingInterpretation): boolean {
  const dishMatches = interpretation.explicitDishIntents.length ? itemMatchesDishIntent(item, interpretation) : true;
  const cuisineMatches = interpretation.cuisineIntents.length ? itemMatchesCuisineIntent(item, interpretation) : true;
  return dishMatches || cuisineMatches;
}

function itemMatchesDishIntent(item: MenuItem, interpretation: CravingInterpretation): boolean {
  return interpretation.explicitDishIntents.some((dishType) => {
    if (dishType === "snack") return ["snack", "momos", "roll", "dim_sum"].includes(item.dishType);
    return item.dishType === dishType || item.tags.includes(dishType);
  });
}

function itemMatchesCuisineIntent(item: MenuItem, interpretation: CravingInterpretation): boolean {
  return interpretation.cuisineIntents.includes(item.cuisine);
}

function itemMatchesNegativeConstraint(item: MenuItem, constraint: NegativeConstraint): boolean {
  return item.avoidIf.includes(constraint);
}

function normalizeFailureReasonCode(reason: string): FailureReasonCode | null {
  const normalized = reason.trim().toLowerCase().replace(/['’]/g, "").replace(/[\s-]+/g, "_");
  if (["too_oily", "oily", "greasy", "fried"].includes(normalized)) return "too_oily";
  if (["too_bland", "bland"].includes(normalized)) return "too_bland";
  if (["too_expensive", "expensive", "not_worth_it", "low_value"].includes(normalized)) return "too_expensive";
  if (["portion_issue", "small_portion", "tiny_portion"].includes(normalized)) return "portion_issue";
  if (["too_heavy", "heavy"].includes(normalized)) return "too_heavy";
  if (["delivery_issue", "delivery"].includes(normalized)) return "delivery_issue";
  if (["reliability_issue", "reliability", "late_delivery", "cold_delivery"].includes(normalized)) return "reliability_issue";
  if (["wrong_craving_match", "wrong_craving", "ignored_my_craving", "bad_craving_match"].includes(normalized)) return "wrong_craving_match";
  if (["bad_personalization", "bad_recommendation"].includes(normalized)) return "bad_personalization";
  if (["would_reorder", "reorder"].includes(normalized)) return "would_reorder";
  if (["would_not_reorder", "not_reorder", "do_not_reorder", "wouldnt_reorder", "wont_reorder"].includes(normalized)) return "would_not_reorder";
  if (["not_fresh", "stale", "cold", "not_fresh_enough", "freshness_issue"].includes(normalized)) return "not_fresh";
  if (["static_data_limitation", "missing_catalog"].includes(normalized)) return "static_data_limitation";
  return null;
}

function isLateNightContext(context: DecisionContext, interpretation: CravingInterpretation): boolean {
  return context.occasion === "Late night" ||
    interpretation.contextSignals.includes("late_night") ||
    /late night|11 pm|midnight|after 10|night/i.test(context.cravingText);
}

function hasFriedSnackIntent(context: DecisionContext, interpretation: CravingInterpretation): boolean {
  return interpretation.explicitDishIntents.some((dishType) => ["momos", "snack", "roll"].includes(dishType)) ||
    /fried|fry|momo|momos|snack|greasy|pakora/i.test(context.cravingText);
}

function itemIsOilyFried(item: MenuItem): boolean {
  return item.regretRiskFlags.includes("fried_oily") ||
    item.avoidIf.includes("avoid_oily") ||
    item.tags.some((tag) => ["oily", "fried", "greasy"].includes(tag)) ||
    /fried|fries|momo|momos/i.test(item.dishName);
}

function similarToMemoryContext(item: MenuItem, memory: ScoringFeedbackMemory): boolean {
  const text = `${memory.decisionContext.rawCraving} ${memory.selectedRecommendation.dishName}`.toLowerCase();
  return item.tags.some((tag) => text.includes(tag.toLowerCase())) ||
    text.includes(item.cuisine.toLowerCase());
}
