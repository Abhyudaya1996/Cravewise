import {
  contextSignals,
  cuisines,
  dishTypes,
  negativeConstraints,
  preferenceSignals,
} from "./dishTaxonomy";
import type { CravingInterpretation } from "./sampleData";

export type InterpretationFallbackReason =
  | "missing_api_key"
  | "api_error"
  | "timeout"
  | "invalid_schema"
  | "invalid_enum"
  | "missing_required_field"
  | "low_quality_output"
  | "unsafe_recommendation_field";

export type InterpretationSource = "ai_interpreted" | "static_fallback";

export type InterpretationValidationResult =
  | { valid: true; interpretation: CravingInterpretation }
  | { valid: false; reason: InterpretationFallbackReason };

const requiredFields = [
  "explicitDishIntents",
  "cuisineIntents",
  "contextSignals",
  "preferenceSignals",
  "negativeConstraints",
  "budgetSignal",
  "rawInput",
  "occasion",
  "heaviness",
  "exploration_intent",
  "confidence",
  "needs_clarification",
] as const;

const allowedFields = new Set<string>(requiredFields);
const forbiddenRecommendationFields = new Set([
  "itemId",
  "itemIds",
  "restaurant",
  "restaurantName",
  "restaurantNames",
  "score",
  "scores",
  "recommendation",
  "recommendations",
  "recommendedItem",
  "backup",
  "backupOptions",
  "backups",
  "ranking",
  "rankings",
]);

export const cravingInterpretationJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [...requiredFields],
  properties: {
    explicitDishIntents: {
      type: "array",
      items: { type: "string", enum: [...dishTypes] },
    },
    cuisineIntents: {
      type: "array",
      items: { type: "string", enum: [...cuisines] },
    },
    contextSignals: {
      type: "array",
      items: { type: "string", enum: [...contextSignals] },
    },
    preferenceSignals: {
      type: "array",
      items: { type: "string", enum: [...preferenceSignals] },
    },
    negativeConstraints: {
      type: "array",
      items: { type: "string", enum: [...negativeConstraints] },
    },
    budgetSignal: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          additionalProperties: false,
          required: ["max", "source"],
          properties: {
            max: { type: "number" },
            source: { type: "string", enum: ["custom_text", "budget_band"] },
          },
        },
      ],
    },
    rawInput: { type: "string" },
    occasion: {
      anyOf: [{ type: "string" }, { type: "null" }],
    },
    heaviness: {
      anyOf: [{ type: "string", enum: ["light", "medium", "heavy"] }, { type: "null" }],
    },
    exploration_intent: {
      type: "string",
      enum: ["safe", "somewhat_new", "surprise_me"],
    },
    confidence: {
      type: "string",
      enum: ["low", "medium", "high"],
    },
    needs_clarification: { type: "boolean" },
  },
} as const;

export function validateCravingInterpretation(value: unknown, rawInput: string): InterpretationValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { valid: false, reason: "invalid_schema" };
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);

  if (keys.some((key) => forbiddenRecommendationFields.has(key))) {
    return { valid: false, reason: "unsafe_recommendation_field" };
  }

  if (keys.some((key) => !allowedFields.has(key))) {
    return { valid: false, reason: "invalid_schema" };
  }

  if (requiredFields.some((field) => !(field in record))) {
    return { valid: false, reason: "missing_required_field" };
  }

  if (typeof record.rawInput !== "string" || record.rawInput.trim() !== rawInput.trim()) {
    return { valid: false, reason: "invalid_schema" };
  }

  if (!isEnumArray(record.explicitDishIntents, dishTypes) ||
    !isEnumArray(record.cuisineIntents, cuisines) ||
    !isEnumArray(record.contextSignals, contextSignals) ||
    !isEnumArray(record.preferenceSignals, preferenceSignals) ||
    !isEnumArray(record.negativeConstraints, negativeConstraints)) {
    return { valid: false, reason: "invalid_enum" };
  }

  if (!isValidBudgetSignal(record.budgetSignal)) {
    return { valid: false, reason: "invalid_schema" };
  }

  if (!(typeof record.occasion === "string" || record.occasion === null) ||
    !isNullableEnum(record.heaviness, ["light", "medium", "heavy"] as const) ||
    !isEnum(record.exploration_intent, ["safe", "somewhat_new", "surprise_me"] as const) ||
    !isEnum(record.confidence, ["low", "medium", "high"] as const) ||
    typeof record.needs_clarification !== "boolean") {
    return { valid: false, reason: "invalid_schema" };
  }

  const signalCount = [
    ...(record.explicitDishIntents as unknown[]),
    ...(record.cuisineIntents as unknown[]),
    ...(record.contextSignals as unknown[]),
    ...(record.preferenceSignals as unknown[]),
    ...(record.negativeConstraints as unknown[]),
  ].length;
  const hasContext = Boolean(record.budgetSignal || record.occasion || record.heaviness);
  if (signalCount === 0 && !hasContext && record.needs_clarification !== true) {
    return { valid: false, reason: "low_quality_output" };
  }

  return {
    valid: true,
    interpretation: {
      explicitDishIntents: record.explicitDishIntents as CravingInterpretation["explicitDishIntents"],
      cuisineIntents: record.cuisineIntents as CravingInterpretation["cuisineIntents"],
      contextSignals: record.contextSignals as CravingInterpretation["contextSignals"],
      preferenceSignals: record.preferenceSignals as CravingInterpretation["preferenceSignals"],
      negativeConstraints: record.negativeConstraints as CravingInterpretation["negativeConstraints"],
      budgetSignal: record.budgetSignal as CravingInterpretation["budgetSignal"],
      rawInput: record.rawInput,
      occasion: record.occasion,
      heaviness: record.heaviness,
      exploration_intent: record.exploration_intent,
      confidence: record.confidence,
      needs_clarification: record.needs_clarification,
    },
  };
}

function isEnumArray<T extends readonly string[]>(value: unknown, allowed: T): value is T[number][] {
  return Array.isArray(value) && value.every((item) => isEnum(item, allowed));
}

function isEnum<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function isNullableEnum<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] | null {
  return value === null || isEnum(value, allowed);
}

function isValidBudgetSignal(value: unknown): value is CravingInterpretation["budgetSignal"] {
  if (value === null) return true;
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const budget = value as Record<string, unknown>;
  return Object.keys(budget).length === 2 &&
    typeof budget.max === "number" &&
    Number.isFinite(budget.max) &&
    budget.max > 0 &&
    isEnum(budget.source, ["custom_text", "budget_band"] as const);
}
