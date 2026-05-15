const fs = require("fs");
const path = require("path");
const ts = require("../../apps/cravewise/node_modules/typescript");

const repoRoot = path.resolve(__dirname, "../..");

function loadTsModule(relativePath, mocks = {}) {
  const absolutePath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const module = { exports: {} };
  const localRequire = (id) => mocks[id] ?? require(id);
  new Function("require", "exports", "module", output)(localRequire, module.exports, module);
  return module.exports;
}

const taxonomy = loadTsModule("apps/cravewise/data/dishTaxonomy.ts");
const data = loadTsModule("apps/cravewise/data/sampleData.ts", { "./dishTaxonomy": taxonomy });
const validation = loadTsModule("apps/cravewise/data/cravingInterpretationValidation.ts", {
  "./dishTaxonomy": taxonomy,
});
const comparison = loadTsModule("apps/cravewise/data/interpretationComparison.ts", {
  "./sampleData": data,
});
const cases = JSON.parse(fs.readFileSync(path.join(__dirname, "sample_cases.json"), "utf8"));

const personaIds = {
  Abhyudaya: "persona_abhyudaya_weekend_foodie",
  Simran: "persona_simran_budget_office",
  Kartik: "persona_kartik_health_inconsistent",
  Kushagra: "persona_kushagra_reorder_power_user",
  Piyush: "persona_piyush_deal_led_explorer",
  Pransih: "persona_pransih_group_ordering",
};

const baseContext = {
  cravingText: "spicyy but not too oily",
  budgetBand: "Rs.250-400",
  customBudget: "",
  occasion: "Weekend dinner",
  explorationIntent: "somewhat_new",
  heaviness: "Medium",
  availableTime: "20-30 min",
  upcomingConstraint: "No constraint",
};

function buildContext(testCase, inputKey = "input") {
  return {
    ...baseContext,
    cravingText: testCase[inputKey] ?? testCase.input ?? "",
    ...(testCase.context ?? {}),
  };
}

function buildMemory(testCase, personaId) {
  if (!testCase.memory) return [];
  return [{
    personaId,
    decisionContext: {
      rawCraving: testCase.memory.rawCraving ?? testCase.initial_input ?? "",
      occasion: testCase.memory.occasion ?? "Late night",
    },
    selectedRecommendation: {
      dishName: testCase.memory.dishName,
      restaurantName: testCase.memory.restaurantName,
      price: testCase.memory.price,
    },
    feedback: {
      sentiment: testCase.memory.sentiment ?? "disappointing",
    },
    classification: {
      sentiment: testCase.memory.classificationSentiment ?? "negative",
      regretLevel: testCase.memory.regretLevel ?? "high",
      failureReasons: testCase.memory.failureReasons ?? [],
      reorderIntent: testCase.memory.reorderIntent ?? "no",
    },
  }];
}

function runMachineCase(testCase) {
  const personaId = personaIds[testCase.persona] ?? personaIds.Abhyudaya;
  const persona = data.getPersona(personaId);
  const context = buildContext(testCase, testCase.next_input ? "next_input" : "input");
  const memory = buildMemory(testCase, personaId);
  const interpretation = data.interpretCravingStatic(context);
  const recommendations = data.scoreRecommendationStatic(persona, context, memory);
  const top = recommendations[0];
  const failures = [];

  if (!top) {
    failures.push("No top recommendation returned.");
    return { id: testCase.id, failures };
  }

  if (testCase.mustIncludeDishType && top.item.dishType !== testCase.mustIncludeDishType) {
    failures.push(`Expected top dishType ${testCase.mustIncludeDishType}, got ${top.item.dishType}.`);
  }

  if (testCase.mustIncludeCuisine && top.item.cuisine !== testCase.mustIncludeCuisine) {
    failures.push(`Expected top cuisine ${testCase.mustIncludeCuisine}, got ${top.item.cuisine}.`);
  }

  if (testCase.mustNotIncludeDishType && top.item.dishType === testCase.mustNotIncludeDishType) {
    failures.push(`Top dishType must not be ${testCase.mustNotIncludeDishType}.`);
  }

  if (testCase.mustNotRecommendDishName && top.item.dishName === testCase.mustNotRecommendDishName) {
    failures.push(`Top recommendation must not be ${testCase.mustNotRecommendDishName}.`);
  }

  for (const flag of testCase.mustAvoidFlags ?? []) {
    if (top.item.avoidIf.includes(flag) || top.item.regretRiskFlags.includes(flag)) {
      failures.push(`Top recommendation includes avoided flag ${flag}.`);
    }
  }

  for (const tag of testCase.topMustIncludePreferenceTags ?? []) {
    if (!top.item.preferenceTags.includes(tag)) {
      failures.push(`Top recommendation missing preference tag ${tag}.`);
    }
  }

  if (testCase.topEstimatedDeliveryMaxAtMost && top.item.estimatedDeliveryMax > testCase.topEstimatedDeliveryMaxAtMost) {
    failures.push(`Top recommendation ETA max ${top.item.estimatedDeliveryMax} exceeds ${testCase.topEstimatedDeliveryMaxAtMost}.`);
  }

  if (testCase.topPriceAtMost && top.item.price > testCase.topPriceAtMost) {
    failures.push(`Top recommendation price ${top.item.price} exceeds ${testCase.topPriceAtMost}.`);
  }

  for (const text of testCase.reasonMustInclude ?? []) {
    if (!top.reason.toLowerCase().includes(text.toLowerCase())) {
      failures.push(`Top recommendation reason must include "${text}".`);
    }
  }

  for (const text of testCase.reasonMustNotInclude ?? []) {
    if (top.reason.toLowerCase().includes(text.toLowerCase())) {
      failures.push(`Top recommendation reason must not include "${text}".`);
    }
  }

  for (const tag of testCase.topMustIncludeReliabilityTags ?? []) {
    if (!top.item.reliabilityTags.includes(tag)) {
      failures.push(`Top recommendation missing reliability tag ${tag}.`);
    }
  }

  if (testCase.expectedTopRecommendation && top.item.dishName !== testCase.expectedTopRecommendation) {
    failures.push(`Expected top recommendation ${testCase.expectedTopRecommendation}, got ${top.item.dishName}.`);
  }

  for (const signal of testCase.mustIncludePreferenceSignals ?? []) {
    if (!interpretation.preferenceSignals.includes(signal)) {
      failures.push(`Expected preference signal ${signal}.`);
    }
  }

  for (const signal of testCase.mustNotIncludePreferenceSignals ?? []) {
    if (interpretation.preferenceSignals.includes(signal)) {
      failures.push(`Preference signal must not include ${signal}.`);
    }
  }

  for (const signal of testCase.mustIncludeNegativeConstraints ?? []) {
    if (!interpretation.negativeConstraints.includes(signal)) {
      failures.push(`Expected negative constraint ${signal}.`);
    }
  }

  for (const signal of testCase.mustNotIncludeNegativeConstraints ?? []) {
    if (interpretation.negativeConstraints.includes(signal)) {
      failures.push(`Negative constraint must not include ${signal}.`);
    }
  }

  for (const signal of testCase.mustIncludeContextSignals ?? []) {
    if (!interpretation.contextSignals.includes(signal)) {
      failures.push(`Expected context signal ${signal}.`);
    }
  }

  if (testCase.mustChangeWithMemory) {
    const noMemoryTop = data.scoreRecommendationStatic(persona, context, [])[0];
    if (!noMemoryTop || noMemoryTop.item.dishName === top.item.dishName) {
      failures.push("Expected memory to change the top recommendation.");
    }
    if (!top.memoryNotes.length) {
      failures.push("Expected memory influence note on top recommendation.");
    }
  }

  const breakdown = top.scoreBreakdown;
  if (!breakdown || breakdown.finalScore !== top.score) {
    failures.push("Top recommendation scoreBreakdown.finalScore must match score.");
  }

  return { id: testCase.id, failures };
}

const machineCases = cases.filter((testCase) => testCase.machineCheck);
const results = machineCases.map(runMachineCase);
const validationResults = runValidationCases();
const comparisonResults = runComparisonCases();
const failed = results.filter((result) => result.failures.length > 0);
const failedValidation = validationResults.filter((result) => result.failures.length > 0);
const failedComparison = comparisonResults.filter((result) => result.failures.length > 0);

if (failed.length || failedValidation.length || failedComparison.length) {
  console.error(`CraveWise static evals failed: ${failed.length}/${machineCases.length}`);
  failed.forEach((result) => {
    console.error(`- ${result.id}`);
    result.failures.forEach((failure) => console.error(`  - ${failure}`));
  });
  failedValidation.forEach((result) => {
    console.error(`- ${result.id}`);
    result.failures.forEach((failure) => console.error(`  - ${failure}`));
  });
  failedComparison.forEach((result) => {
    console.error(`- ${result.id}`);
    result.failures.forEach((failure) => console.error(`  - ${failure}`));
  });
  process.exit(1);
}

console.log(`CraveWise static evals passed: ${machineCases.length}/${machineCases.length}`);
console.log(`CraveWise AI interpretation validation checks passed: ${validationResults.length}/${validationResults.length}`);
console.log(`CraveWise interpretation comparison checks passed: ${comparisonResults.length}/${comparisonResults.length}`);

function runValidationCases() {
  const validOutput = {
    explicitDishIntents: ["pizza"],
    cuisineIntents: ["Pizza"],
    contextSignals: ["weekend_dinner"],
    preferenceSignals: ["comfort"],
    negativeConstraints: ["avoid_cheese_heavy"],
    budgetSignal: null,
    rawInput: "pizza but not cheese overloaded",
    occasion: "Weekend dinner",
    heaviness: "medium",
    exploration_intent: "safe",
    confidence: "high",
    needs_clarification: false,
  };

  const cases = [
    {
      id: "ai_validation_accepts_taxonomy_only_output",
      value: validOutput,
      rawInput: "pizza but not cheese overloaded",
      expectedValid: true,
    },
    {
      id: "ai_validation_rejects_invalid_enum",
      value: { ...validOutput, explicitDishIntents: ["sushi"] },
      rawInput: "pizza but not cheese overloaded",
      expectedValid: false,
      expectedReason: "invalid_enum",
    },
    {
      id: "ai_validation_rejects_recommendation_fields",
      value: { ...validOutput, recommendation: "Thin Crust Veggie Pizza", restaurant: "Slice Street", backupOptions: [] },
      rawInput: "pizza but not cheese overloaded",
      expectedValid: false,
      expectedReason: "unsafe_recommendation_field",
    },
    {
      id: "ai_validation_accepts_trimmed_raw_input_match",
      value: { ...validOutput, rawInput: " pizza but not cheese overloaded " },
      rawInput: "pizza but not cheese overloaded",
      expectedValid: true,
    },
    {
      id: "ai_validation_rejects_raw_input_mismatch",
      value: { ...validOutput, rawInput: "different craving" },
      rawInput: "pizza but not cheese overloaded",
      expectedValid: false,
      expectedReason: "invalid_schema",
    },
  ];

  return cases.map((testCase) => {
    const result = validation.validateCravingInterpretation(testCase.value, testCase.rawInput);
    const failures = [];
    if (result.valid !== testCase.expectedValid) {
      failures.push(`Expected valid=${testCase.expectedValid}, got valid=${result.valid}.`);
    }
    if (!result.valid && testCase.expectedReason && result.reason !== testCase.expectedReason) {
      failures.push(`Expected reason ${testCase.expectedReason}, got ${result.reason}.`);
    }
    return { id: testCase.id, failures };
  });
}

function runComparisonCases() {
  const persona = data.getPersona(personaIds.Abhyudaya);
  const context = {
    ...baseContext,
    cravingText: "something nice but not too much",
    budgetBand: "Custom",
    customBudget: "800",
  };
  const staticInterpretation = data.interpretCravingStatic(context);
  const aiInterpretation = {
    ...staticInterpretation,
    explicitDishIntents: ["pizza"],
    cuisineIntents: ["Pizza"],
    negativeConstraints: ["avoid_cheese_heavy", "avoid_heavy"],
    preferenceSignals: ["comfort", "light"],
    confidence: "high",
  };
  const changedResult = comparison.compareInterpretations({
    persona,
    context,
    feedbackMemory: [],
    staticInterpretation,
    aiInterpretation,
  });
  const fallbackResult = comparison.compareInterpretations({
    persona,
    context,
    feedbackMemory: [],
    staticInterpretation,
    aiInterpretation: null,
  });

  const cases = [
    {
      id: "comparison_detects_changed_fields",
      failures: [
        !changedResult.changedFields.includes("explicitDishIntents") ? "Expected explicitDishIntents to be marked changed." : null,
        !(changedResult.addedByAI.explicitDishIntents ?? []).includes("pizza") ? "Expected pizza to be listed as added by AI." : null,
      ].filter(Boolean),
    },
    {
      id: "comparison_detects_recommendation_change",
      failures: [
        !changedResult.recommendationChanged ? "Expected deterministic top recommendation to change under AI interpretation signals." : null,
        changedResult.staticTopRecommendation === changedResult.aiTopRecommendation ? "Expected static top and deterministic top from AI-interpreted signals to differ." : null,
      ].filter(Boolean),
    },
    {
      id: "comparison_handles_ai_fallback",
      failures: [
        fallbackResult.aiInterpretation !== null ? "Expected null AI interpretation in fallback result." : null,
        fallbackResult.aiTopRecommendation !== null ? "Expected no deterministic top from AI-interpreted signals when AI interpretation is null." : null,
        fallbackResult.recommendationChanged ? "Fallback comparison should not mark recommendationChanged." : null,
      ].filter(Boolean),
    },
  ];

  return cases;
}
