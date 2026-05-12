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
  cuisine: string;
  price: number;
  tags: string[];
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
  craving_type: string[];
  cuisine_hint: string | null;
  dish_hint: string | null;
  avoid: string[];
  budget_max: number | null;
  occasion: string | null;
  heaviness: Heaviness | null;
  exploration_intent: ExplorationIntent;
  confidence: "low" | "medium" | "high";
  needs_clarification: boolean;
};

export type Recommendation = {
  item: MenuItem;
  score: number;
  type: "primary" | "safe" | "explore";
  confidence: "limited" | "medium" | "high";
  budgetFit: string;
  reason: string;
  avoidedNote: string;
  tradeoff: string;
};

export type FeedbackClassification = {
  sentiment: "positive" | "mixed" | "negative";
  taste_rating: number | null;
  value_rating: number | null;
  heaviness: Heaviness | null;
  regret_level: "low" | "medium" | "high";
  reorder_intent: "yes" | "maybe" | "no";
  failure_reasons: string[];
  learning: string;
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

export const menuCatalog: MenuItem[] = [
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
    reorderSignal: "high",
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
    reorderSignal: "medium",
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
];

export function getPersona(id: string): Persona {
  return personas.find((persona) => persona.id === id) ?? personas[0];
}

export function parseBudgetMax(context: DecisionContext, persona: Persona): number {
  if (context.budgetBand === "Under Rs.250") return 250;
  if (context.budgetBand === "Rs.250-400") return 400;
  if (context.budgetBand === "Rs.400-600") return 600;
  if (context.budgetBand === "Rs.600+") return 900;
  const parsed = context.customBudget.match(/\d+/)?.[0];
  return parsed ? Number(parsed) : persona.budgetMax;
}

export function interpretCravingStatic(context: DecisionContext): CravingInterpretation {
  const text = context.cravingText.toLowerCase();
  const craving_type: string[] = [];
  const avoid: string[] = [];
  let cuisine_hint: string | null = null;
  let dish_hint: string | null = null;

  if (/spicy|spicyy|mast|chatpata/.test(text)) craving_type.push("spicy");
  if (/comfort|mast|accha|good/.test(text)) craving_type.push("comfort");
  if (/light|lighttt|sleepy/.test(text)) craving_type.push("light");
  if (/italian/.test(text)) cuisine_hint = "Italian";
  if (/pizza/.test(text)) {
    cuisine_hint = "Pizza";
    dish_hint = "pizza";
  }
  if (/mexican|burrito/.test(text)) {
    cuisine_hint = "Mexican";
    dish_hint = "burrito";
  }
  if (/oily|oil/.test(text)) avoid.push("oily");
  if (/cheese overloaded|too much cheese/.test(text)) avoid.push("cheese overloaded");
  if (/not above|under|around|budget/.test(text)) {
    const amount = text.match(/\d+/)?.[0];
    if (amount) return {
      craving_type: craving_type.length ? craving_type : ["comfort"],
      cuisine_hint,
      dish_hint,
      avoid,
      budget_max: Number(amount),
      occasion: context.occasion,
      heaviness: normalizeHeaviness(context.heaviness),
      exploration_intent: context.explorationIntent,
      confidence: "medium",
      needs_clarification: false,
    };
  }

  const vague = text.trim().length < 8 || /^(kuch accha|something good|idk)$/i.test(text.trim());
  return {
    craving_type: craving_type.length ? craving_type : ["comfort"],
    cuisine_hint,
    dish_hint,
    avoid,
    budget_max: null,
    occasion: context.occasion,
    heaviness: normalizeHeaviness(context.heaviness),
    exploration_intent: context.explorationIntent,
    confidence: vague ? "low" : cuisine_hint || craving_type.length > 1 ? "high" : "medium",
    needs_clarification: vague,
  };
}

export function scoreRecommendationStatic(persona: Persona, context: DecisionContext): Recommendation[] {
  const interpretation = interpretCravingStatic(context);
  const budgetMax = interpretation.budget_max ?? parseBudgetMax(context, persona);
  const isRush = context.occasion === "Weekday Rush";

  const scored = menuCatalog
    .filter((item) => !persona.regretPatterns.some((pattern) => item.tags.some((tag) => pattern.includes(tag) && item.regretRisk === "high")))
    .map((item) => {
      let score = 0;
      if (item.personaFit.includes(persona.id)) score += 25;
      if (item.price <= budgetMax * 1.1) score += 15;
      else score -= 20;
      if (item.bestFor.includes(context.occasion)) score += 12;
      if (interpretation.cuisine_hint && item.cuisine.toLowerCase().includes(interpretation.cuisine_hint.toLowerCase())) score += 16;
      if (interpretation.dish_hint && item.dishName.toLowerCase().includes(interpretation.dish_hint)) score += 18;
      if (interpretation.craving_type.some((craving) => item.tags.includes(craving))) score += 30;
      if (item.reorderSignal === "high") score += context.explorationIntent === "safe" ? 18 : 10;
      if (context.explorationIntent === "somewhat_new" && item.novelty === "somewhat_new") score += 12;
      if (context.explorationIntent === "surprise_me" && item.novelty !== "familiar") score += 12;
      if (normalizeHeaviness(context.heaviness) === item.heaviness) score += 8;
      if (item.regretRisk === "high") score -= 35;
      if (item.regretRisk === "medium") score -= 10;
      if (isRush) {
        if (item.estimatedDeliveryMax <= 30) score += 20;
        if (item.deliveryReliabilityScore >= 85) score += 15;
        if (item.weekdayLunchFit) score += 12;
        if (context.upcomingConstraint === "Meeting soon" && item.meetingSafe) score += 10;
        if (item.novelty === "familiar") score += 12;
        if (item.novelty === "surprising") score -= 12;
      }
      return { item, score };
    })
    .filter(({ item }) => item.regretRisk !== "high")
    .sort((a, b) => b.score - a.score);

  const primary = scored[0];
  const safe = scored.find(({ item }) => item.novelty === "familiar" && item.id !== primary?.item.id) ?? scored[1];
  const explore = scored.find(({ item }) => item.novelty !== "familiar" && item.id !== primary?.item.id) ?? scored[2] ?? scored[1];

  return [
    makeRecommendation(primary.item, primary.score, "primary", persona, context, interpretation, budgetMax),
    makeRecommendation(safe.item, safe.score, "safe", persona, context, interpretation, budgetMax),
    makeRecommendation(explore.item, explore.score, "explore", persona, context, interpretation, budgetMax),
  ];
}

export function classifyFeedbackStatic(sentiment: "Loved it" | "Meh" | "Disappointing" | "Skipped" | "", reasons: string[], note: string): FeedbackClassification {
  const negativeReasons = reasons.filter((reason) => !["Would reorder"].includes(reason));
  const wouldReorder = reasons.includes("Would reorder");
  const wouldNotReorder = reasons.includes("Would not reorder");
  const tooHeavy = reasons.includes("Too heavy") || /heavy|sleepy/i.test(note);
  return {
    sentiment: sentiment === "Loved it" ? "positive" : sentiment === "Disappointing" ? "negative" : "mixed",
    taste_rating: sentiment === "Loved it" ? 5 : sentiment === "Disappointing" ? 2 : sentiment ? 3 : null,
    value_rating: reasons.includes("Too expensive") ? 2 : sentiment ? 4 : null,
    heaviness: tooHeavy ? "heavy" : reasons.includes("Too oily") ? "medium" : null,
    regret_level: sentiment === "Disappointing" || reasons.includes("Would not reorder") ? "high" : sentiment === "Meh" || negativeReasons.length ? "medium" : "low",
    reorder_intent: wouldReorder ? "yes" : wouldNotReorder ? "no" : sentiment === "Loved it" ? "yes" : sentiment === "Disappointing" ? "no" : "maybe",
    failure_reasons: negativeReasons,
    learning: negativeReasons.length
      ? `Remember: ${negativeReasons.join(", ")} affected this meal.`
      : wouldReorder
        ? "This meal should strengthen the reorder pattern."
        : "No strong negative learning captured yet.",
  };
}

export function generateInsightsStatic(persona: Persona): string[] {
  return [
    persona.insights.taste,
    persona.insights.regret,
    persona.insights.budget,
    persona.insights.exploration,
    persona.insights.reorder,
    persona.insights.quality,
  ];
}

export function getFallbackState(context: DecisionContext, recommendations: Recommendation[], interpretation: CravingInterpretation): string {
  if (interpretation.needs_clarification) return "Vague craving: show clarification chips before pretending confidence.";
  if (parseBudgetMax(context, personas[0]) < 250) return "Budget too low: offer budget-safe options or ask to increase budget.";
  if (recommendations[0]?.score < 60) return "No strong match: show safer backups with limited-confidence copy.";
  return "High-regret options are filtered out as primary; show what CraveWise avoided.";
}

function makeRecommendation(
  item: MenuItem,
  score: number,
  type: Recommendation["type"],
  persona: Persona,
  context: DecisionContext,
  interpretation: CravingInterpretation,
  budgetMax: number,
): Recommendation {
  const isRush = context.occasion === "Weekday Rush";
  const budgetFit = item.price <= budgetMax ? `within ${context.budgetBand}` : `slightly above ${context.budgetBand}`;
  const reason = isRush && item.id === "baja-bowl-classic-chicken-burrito"
    ? `${item.dishName} fits because ${persona.name} has a comfort reorder pattern for burritos, the dummy ETA is ${item.estimatedDeliveryMin}-${item.estimatedDeliveryMax} mins, and it is meeting-safe for "${context.upcomingConstraint}".`
    : `${item.dishName} fits because ${persona.name} has ${persona.primaryMode} behavior, likes ${persona.topCuisines.slice(0, 2).join(" and ")}, and this matches ${interpretation.craving_type.join(", ")} without triggering ${persona.topRegretPattern}.`;
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
  };
}

function normalizeHeaviness(value: DecisionContext["heaviness"]): Heaviness {
  if (value === "Light") return "light";
  if (value === "Filling") return "heavy";
  return "medium";
}
