import type {
  CravingInterpretation,
  DecisionContext,
  Persona,
  Recommendation,
  ScoringFeedbackMemory,
} from "./sampleData";
import { scoreRecommendationStatic } from "./sampleData";

type ComparableField =
  | "explicitDishIntents"
  | "cuisineIntents"
  | "contextSignals"
  | "preferenceSignals"
  | "negativeConstraints"
  | "budgetSignal"
  | "heaviness"
  | "exploration_intent"
  | "confidence"
  | "needs_clarification";

type SignalDiff = Partial<Record<ComparableField, string[]>>;

export type InterpretationComparisonResult = {
  staticInterpretation: CravingInterpretation;
  aiInterpretation: CravingInterpretation | null;
  changedFields: ComparableField[];
  addedByAI: SignalDiff;
  missedByAI: SignalDiff;
  matchedFields: ComparableField[];
  recommendationChanged: boolean;
  staticTopRecommendation: string | null;
  aiTopRecommendation: string | null;
  notes: string[];
};

const comparableFields: ComparableField[] = [
  "explicitDishIntents",
  "cuisineIntents",
  "contextSignals",
  "preferenceSignals",
  "negativeConstraints",
  "budgetSignal",
  "heaviness",
  "exploration_intent",
  "confidence",
  "needs_clarification",
];

export function compareInterpretations({
  persona,
  context,
  feedbackMemory,
  staticInterpretation,
  aiInterpretation,
}: {
  persona: Persona;
  context: DecisionContext;
  feedbackMemory?: ScoringFeedbackMemory[];
  staticInterpretation: CravingInterpretation;
  aiInterpretation: CravingInterpretation | null;
}): InterpretationComparisonResult {
  const staticRecommendations = scoreRecommendationStatic(persona, context, feedbackMemory ?? [], staticInterpretation);
  const aiRecommendations = aiInterpretation
    ? scoreRecommendationStatic(persona, context, feedbackMemory ?? [], aiInterpretation)
    : [];
  const staticTop = getTopRecommendationName(staticRecommendations);
  const aiTop = getTopRecommendationName(aiRecommendations);

  if (!aiInterpretation) {
    return {
      staticInterpretation,
      aiInterpretation: null,
      changedFields: [],
      addedByAI: {},
      missedByAI: {},
      matchedFields: [],
      recommendationChanged: false,
      staticTopRecommendation: staticTop,
      aiTopRecommendation: null,
      notes: ["AI interpretation was unavailable, so QA comparison used static interpretation only."],
    };
  }

  const changedFields: ComparableField[] = [];
  const matchedFields: ComparableField[] = [];
  const addedByAI: SignalDiff = {};
  const missedByAI: SignalDiff = {};

  comparableFields.forEach((field) => {
    const staticValues = normalizeComparableValue(staticInterpretation[field]);
    const aiValues = normalizeComparableValue(aiInterpretation[field]);
    const added = aiValues.filter((value) => !staticValues.includes(value));
    const missed = staticValues.filter((value) => !aiValues.includes(value));

    if (added.length || missed.length) {
      changedFields.push(field);
      if (added.length) addedByAI[field] = added;
      if (missed.length) missedByAI[field] = missed;
    } else {
      matchedFields.push(field);
    }
  });

  const recommendationChanged = Boolean(staticTop && aiTop && staticTop !== aiTop);
  const notes = [
    changedFields.length
      ? `AI interpretation changed ${changedFields.length} signal field${changedFields.length === 1 ? "" : "s"}.`
      : "AI interpretation matched static interpretation on compared fields.",
    recommendationChanged
      ? "Deterministic scoring produced a different top result from the AI-interpreted signals."
      : "Deterministic scoring kept the same top recommendation.",
  ];

  return {
    staticInterpretation,
    aiInterpretation,
    changedFields,
    addedByAI,
    missedByAI,
    matchedFields,
    recommendationChanged,
    staticTopRecommendation: staticTop,
    aiTopRecommendation: aiTop,
    notes,
  };
}

function getTopRecommendationName(recommendations: Recommendation[]): string | null {
  const top = recommendations[0];
  return top ? `${top.item.dishName} from ${top.item.restaurantName}` : null;
}

function normalizeComparableValue(value: CravingInterpretation[ComparableField]): string[] {
  if (Array.isArray(value)) return [...value].sort();
  if (value === null) return [];
  if (typeof value === "object") return [JSON.stringify(value)];
  return [String(value)];
}
