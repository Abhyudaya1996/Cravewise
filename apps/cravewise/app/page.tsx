"use client";

import { useEffect, useMemo, useState } from "react";
import {
  budgetBands,
  BudgetBand,
  classifyFeedbackStatic,
  constraintOptions,
  cravingExamples,
  CravingInterpretation,
  DecisionContext,
  FallbackState,
  FailureReasonCode,
  feedbackReasonLabels,
  explorationOptions,
  feedbackReasons,
  getPersonaInsightsStatic,
  getFallbackState,
  getPersona,
  heavinessOptions,
  interpretCravingStatic,
  menuCatalog,
  normalizeFailureReasonCodes,
  occasions,
  personas,
  Recommendation,
  ScoringFeedbackMemory,
  scoreRecommendationStatic,
  timeOptions,
} from "../data/sampleData";
import type { InterpretationFallbackReason, InterpretationSource } from "../data/cravingInterpretationValidation";
import { compareInterpretations } from "../data/interpretationComparison";
import type { InterpretationComparisonResult } from "../data/interpretationComparison";

type Step = "home" | "personas" | "profile" | "craving" | "recommendation" | "backups" | "feedback" | "insights";
type FeedbackChoice = "Loved it" | "Meh" | "Disappointing" | "Skipped" | "";
type StoredRecommendationType = "primary" | "safer_backup" | "exploratory_backup";
type StoredFeedbackSentiment = "loved" | "meh" | "disappointing" | "skipped";
type InterpretationResolution = {
  contextKey: string;
  interpretation: CravingInterpretation | null;
  interpretationSource: InterpretationSource;
  fallbackReason?: InterpretationFallbackReason;
};

type LocalFeedbackMemory = {
  id: string;
  personaId: string;
  personaName: string;
  decisionContext: {
    rawCraving: string;
    budgetRange: string;
    customBudget?: number;
    occasion: string;
    explorationIntent: string;
    heaviness: string;
    availableTime?: string;
    upcomingConstraint?: string;
  };
  selectedRecommendation: {
    dishName: string;
    restaurantName: string;
    price: number;
    type: StoredRecommendationType;
    regretRisk: "low" | "medium" | "high";
  };
  feedback: {
    sentiment: StoredFeedbackSentiment;
    reasonChips: string[];
    customNote?: string;
  };
  classification: {
    sentiment: "positive" | "mixed" | "negative";
    regretLevel: "low" | "medium" | "high";
    failureReasons: string[];
    reorderIntent: "yes" | "maybe" | "no";
    learning: string;
  };
  createdAt: string;
};

const localFeedbackMemoryKey = "cravewise.localFeedbackMemory.v1";

const steps: Array<{ id: Step; label: string }> = [
  { id: "home", label: "Home" },
  { id: "personas", label: "Persona" },
  { id: "profile", label: "Memory" },
  { id: "craving", label: "Craving" },
  { id: "recommendation", label: "Pick" },
  { id: "backups", label: "Backups" },
  { id: "feedback", label: "Feedback" },
  { id: "insights", label: "Insights" },
];

const defaultContext: DecisionContext = {
  cravingText: "spicyy but not too oily",
  budgetBand: "Rs.250-400",
  customBudget: "",
  occasion: "Weekend dinner",
  explorationIntent: "somewhat_new",
  heaviness: "Medium",
  availableTime: "20-30 min",
  upcomingConstraint: "No constraint",
};

export default function CraveWisePage() {
  const [step, setStep] = useState<Step>("home");
  const [selectedPersonaId, setSelectedPersonaId] = useState(personas[0].id);
  const [context, setContext] = useState<DecisionContext>(defaultContext);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [feedback, setFeedback] = useState<FeedbackChoice>("");
  const [reasonChips, setReasonChips] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [localFeedbackMemory, setLocalFeedbackMemory] = useState<LocalFeedbackMemory[]>([]);
  const [interpretationResolution, setInterpretationResolution] = useState<InterpretationResolution | null>(null);
  const [isInterpretingCraving, setIsInterpretingCraving] = useState(false);

  const persona = useMemo(() => getPersona(selectedPersonaId), [selectedPersonaId]);
  const contextKey = useMemo(() => JSON.stringify(context), [context]);
  const staticInterpretation = useMemo(() => interpretCravingStatic(context), [context]);
  const resolvedInterpretation = interpretationResolution?.contextKey === contextKey
    ? interpretationResolution.interpretation
    : null;
  const interpretation = resolvedInterpretation ?? staticInterpretation;
  const interpretationStatus = getInterpretationStatus(interpretationResolution, contextKey, isInterpretingCraving);
  const scoringFeedbackMemory = useMemo(() => localFeedbackMemory.map(toScoringFeedbackMemory), [localFeedbackMemory]);
  const recommendations = useMemo(() => scoreRecommendationStatic(persona, context, scoringFeedbackMemory, interpretation), [persona, context, scoringFeedbackMemory, interpretation]);
  const interpretationComparison = useMemo(() => {
    if (interpretationResolution?.contextKey !== contextKey) return null;
    return compareInterpretations({
      persona,
      context,
      feedbackMemory: scoringFeedbackMemory,
      staticInterpretation,
      aiInterpretation: resolvedInterpretation,
    });
  }, [context, contextKey, interpretationResolution, persona, resolvedInterpretation, scoringFeedbackMemory, staticInterpretation]);
  const primaryRecommendation = recommendations[0];
  const backupRecommendations = recommendations.slice(1, 3);
  const fallbackState = getFallbackState(persona, context, recommendations, interpretation);
  const feedbackClassification = classifyFeedbackStatic(feedback, reasonChips, feedbackText);
  const insights = getPersonaInsightsStatic(persona);
  const personaFeedbackMemory = localFeedbackMemory.filter((memory) => memory.personaId === persona.id);
  const dynamicLocalInsights = deriveLocalInsightSummaries(personaFeedbackMemory, persona.name);

  useEffect(() => {
    setLocalFeedbackMemory(readLocalFeedbackMemory());
  }, []);

  function updateContext(patch: Partial<DecisionContext>) {
    setContext((current) => ({ ...current, ...patch }));
  }

  async function resolveCravingAndRecommend() {
    setIsInterpretingCraving(true);
    try {
      const response = await fetch("/api/interpret-craving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context }),
      });
      const result = await response.json() as {
        interpretationSource: InterpretationSource;
        interpretation?: CravingInterpretation;
        fallbackReason?: InterpretationFallbackReason;
      };
      setInterpretationResolution({
        contextKey,
        interpretation: result.interpretationSource === "ai_interpreted" && result.interpretation ? result.interpretation : null,
        interpretationSource: result.interpretationSource,
        fallbackReason: result.fallbackReason,
      });
    } catch {
      setInterpretationResolution({
        contextKey,
        interpretation: null,
        interpretationSource: "static_fallback",
        fallbackReason: "api_error",
      });
    } finally {
      setIsInterpretingCraving(false);
      setStep("recommendation");
    }
  }

  function chooseRecommendation(recommendation: Recommendation) {
    setSelectedRecommendation(recommendation);
    setStep("feedback");
  }

  function continueFromFeedback() {
    if (feedback !== "Skipped" && feedback !== "" && selectedRecommendation) {
      const nextMemory = buildLocalFeedbackMemory(
        persona.id,
        persona.name,
        context,
        selectedRecommendation,
        feedback,
        reasonChips,
        feedbackText,
        feedbackClassification,
      );
      const updatedMemory = [nextMemory, ...localFeedbackMemory].slice(0, 12);
      writeLocalFeedbackMemory(updatedMemory);
      setLocalFeedbackMemory(updatedMemory);
    }
    setStep("insights");
  }

  function clearLocalFeedbackMemory() {
    window.localStorage.removeItem(localFeedbackMemoryKey);
    setLocalFeedbackMemory([]);
  }

  function toggleReason(reason: string) {
    setReasonChips((current) =>
      current.includes(reason) ? current.filter((item) => item !== reason) : [...current, reason],
    );
  }

  return (
    <MobileShell currentStep={step} onStepChange={setStep}>
      {step === "home" && (
        <Screen eyebrow="Premium food decision assistant" title="CraveWise">
          <section className="home-hero">
            <div className="hero-lockup">
              <div className="hero-mark">CW</div>
              <div>
                <span>Decision layer</span>
                <strong>Not a delivery feed</strong>
              </div>
            </div>
            <p className="hero-copy">
              One confident food recommendation based on your taste, craving, budget, and past regrets.
            </p>
            <div className="quiet-proof">
              <span>Not a marketplace</span>
              <span>Not a chatbot</span>
              <span>One trusted pick</span>
            </div>
            <div className="case-study-entry">
              <span>AI PM case study</span>
              <a className="case-study-entry-link" href="/case-study" aria-label="View the CraveWise AI PM case study">
                <strong>View case study</strong>
                <em>Bounded AI, deterministic scoring</em>
              </a>
              <p>See the product thinking, bounded AI architecture, and evaluation evidence.</p>
            </div>
          </section>
          <section className="decision-preview" aria-label="CraveWise decision style">
            <div>
              <span>1</span>
              <p>Understand the craving.</p>
            </div>
            <div>
              <span>2</span>
              <p>Use taste memory.</p>
            </div>
            <div>
              <span>3</span>
              <p>Recommend one meal.</p>
            </div>
          </section>
          <button className="primary-action" onClick={() => setStep("personas")}>
            Start recommendation
          </button>
        </Screen>
      )}

      {step === "personas" && (
        <Screen eyebrow="Simulation profiles" title="Choose who CraveWise knows">
          <p className="screen-note">Pick a sample taste memory. Personas are only local demo profiles.</p>
          <div className="persona-list">
            {personas.map((item) => (
              <PersonaCard
                key={item.id}
                persona={item}
                selected={item.id === selectedPersonaId}
                onSelect={() => setSelectedPersonaId(item.id)}
              />
            ))}
          </div>
          <button className="primary-action" onClick={() => setStep("profile")}>
            Preview taste memory
          </button>
        </Screen>
      )}

      {step === "profile" && (
        <Screen eyebrow="Taste memory" title={`CraveWise remembers ${persona.name}`}>
          <TasteMemoryPanel persona={persona} />
          <button className="primary-action" onClick={() => setStep("craving")}>
            Use this profile
          </button>
        </Screen>
      )}

      {step === "craving" && (
        <Screen eyebrow="Current craving" title="Tell it like you would text a friend">
          <CravingInputPanel
            context={context}
            interpretation={interpretation}
            interpretationStatus={interpretationStatus}
            onChange={updateContext}
          />
          <button className="primary-action" onClick={resolveCravingAndRecommend} disabled={isInterpretingCraving}>
            {isInterpretingCraving ? "Reading craving..." : "Get one recommendation"}
          </button>
        </Screen>
      )}

      {step === "recommendation" && (
        <Screen eyebrow="Tonight's pick" title="One confident answer">
          {fallbackState.shouldSuppressPrimaryRecommendation ? (
            <>
              {fallbackState.type === "no_responsible_match" ? (
                <NoResponsibleMatchEmptyState fallbackState={fallbackState} interpretation={interpretation} />
              ) : (
                <FallbackCard fallbackState={fallbackState} />
              )}
              {interpretationComparison && <InterpretationComparisonPanel comparison={interpretationComparison} />}
              <div className="action-row">
                <button className="primary-action" onClick={() => setStep("craving")}>
                  Adjust craving
                </button>
                {backupRecommendations.length > 0 && (
                  <button className="secondary-action" onClick={() => setStep("backups")}>
                    See limited backups
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <RecommendationHeroCard recommendation={primaryRecommendation} personaName={persona.name} context={context} fallbackState={fallbackState} />
              {interpretationComparison && <InterpretationComparisonPanel comparison={interpretationComparison} />}
              <TrustReasonBlock recommendation={primaryRecommendation} />
              <AvoidedPatternsBlock note={primaryRecommendation.avoidedNote} fallbackState={fallbackState} />
              <div className="action-row">
                <button className="primary-action" onClick={() => chooseRecommendation(primaryRecommendation)}>
                  I'll order this
                </button>
                <button className="secondary-action" onClick={() => setStep("backups")}>
                  Not feeling this?
                </button>
              </div>
            </>
          )}
        </Screen>
      )}

      {step === "backups" && (
        <Screen eyebrow="Only if needed" title="Two backup paths">
          <p className="supporting-copy">Backups stay secondary so CraveWise does not become another browsing grid.</p>
          {backupRecommendations.length > 0 ? (
            <div className="backup-list">
              {backupRecommendations.map((recommendation) => (
                <BackupOptionCard
                  key={recommendation.item.id}
                  recommendation={recommendation}
                  onSelect={() => chooseRecommendation(recommendation)}
                />
              ))}
            </div>
          ) : (
            <div className="gentle-note">No distinct backup options are available in this dummy catalog for the current constraints.</div>
          )}
        </Screen>
      )}

      {step === "feedback" && (
        <Screen eyebrow="Lightweight learning" title="How did it land?">
          {selectedRecommendation && (
            <div className="selected-meal">
              <span>Selected meal</span>
              <strong>
                {selectedRecommendation.item.dishName} from {selectedRecommendation.item.restaurantName}
              </strong>
            </div>
          )}
          <FeedbackButtonGroup value={feedback} onChange={setFeedback} />
          {feedback === "Skipped" && (
            <div className="gentle-note">No worries. CraveWise gets smarter when you rate meals, but you can skip for now.</div>
          )}
          <FeedbackReasonChips selected={reasonChips} onToggle={toggleReason} />
          <label className="field">
            <span>Tell CraveWise what happened.</span>
            <textarea
              value={feedbackText}
              placeholder="Example: comforting, but a little too heavy before my meeting"
              onChange={(event) => setFeedbackText(event.target.value)}
            />
          </label>
          <div className="classification-card">
            <span>Static feedback read</span>
            <strong>{feedbackClassification.learning}</strong>
          </div>
          {feedbackClassification.failure_reasons.length > 0 && (
            <div className="classification-card subtle">
              <span>Stored internal signals</span>
              <strong>{feedbackClassification.failure_reasons.join(", ")}</strong>
            </div>
          )}
          <button className="primary-action" onClick={continueFromFeedback}>
            {feedback === "Skipped" ? "Skip to insights" : "Save feedback and see insights"}
          </button>
        </Screen>
      )}

      {step === "insights" && (
        <Screen eyebrow="Personal food intelligence" title="What CraveWise learned">
          <p className="screen-note">These are specific to {persona.name}'s dummy taste history and regret patterns.</p>
          <div className="insight-list">
            {insights.map((insight, index) => (
              <InsightCard key={insight} index={index + 1} insight={insight} />
            ))}
          </div>
          <LocalDemoMemoryPanel
            memories={personaFeedbackMemory}
            dynamicInsights={dynamicLocalInsights}
            totalMemoryCount={localFeedbackMemory.length}
            personaName={persona.name}
            onClear={clearLocalFeedbackMemory}
          />
          <button className="primary-action" onClick={() => setStep("craving")}>
            Start another recommendation
          </button>
        </Screen>
      )}
    </MobileShell>
  );
}

function MobileShell({
  currentStep,
  onStepChange,
  children,
}: {
  currentStep: Step;
  onStepChange: (step: Step) => void;
  children: React.ReactNode;
}) {
  return (
    <main className="app-shell">
      <section className="mobile-shell">
        <header className="app-header">
          <div>
            <span>CraveWise</span>
            <strong>Food decision assistant</strong>
          </div>
          <small>Static demo</small>
        </header>
        <ProgressStepper currentStep={currentStep} onStepChange={onStepChange} />
        {children}
      </section>
    </main>
  );
}

function ProgressStepper({
  currentStep,
  onStepChange,
}: {
  currentStep: Step;
  onStepChange: (step: Step) => void;
}) {
  return (
    <nav className="progress-stepper" aria-label="CraveWise flow">
      {steps.map((item, index) => (
        <button key={item.id} className={currentStep === item.id ? "active" : ""} onClick={() => onStepChange(item.id)}>
          <span>{index + 1}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function Screen({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="screen">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

function PersonaCard({
  persona,
  selected,
  onSelect,
}: {
  persona: (typeof personas)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button className={`persona-card ${selected ? "selected" : ""}`} onClick={onSelect}>
      <div className="persona-card-top">
        <div className="persona-title">
          <span>{persona.name}</span>
          <strong>{persona.title}</strong>
        </div>
        {selected && <em>Selected</em>}
      </div>
      <dl>
        <div>
          <dt>City</dt>
          <dd>{persona.city}</dd>
        </div>
        <div>
          <dt>Budget</dt>
          <dd>{persona.budgetRange}</dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>{persona.primaryMode}</dd>
        </div>
      </dl>
      <p className="persona-cuisines">{persona.topCuisines.join(" / ")}</p>
      <small>Usually regrets: {persona.topRegretPattern}</small>
    </button>
  );
}

function TasteMemoryPanel({ persona }: { persona: (typeof personas)[number] }) {
  return (
    <section className="taste-memory-panel">
      <div className="memory-panel-head">
        <span>CraveWise remembers</span>
        <p>{persona.tasteSummary}</p>
      </div>
      <div className="memory-grid">
        <MemoryBlock title="Usually loves" values={persona.comfortFoods} />
        <MemoryBlock title="Usually regrets" values={persona.regretPatterns} />
        <div className="memory-block">
          <span>Usual budget</span>
          <strong>{persona.budgetRange}</strong>
          <p>{persona.explorationTendency}</p>
        </div>
      </div>
      <div className="past-orders">
        <span>Example past orders</span>
        {persona.exampleOrders.map((order) => (
          <article key={`${order.restaurant}-${order.dish}`}>
            <strong>{order.dish}</strong>
            <p>
              {order.restaurant} / rating {order.rating} / {order.regret} regret / {order.reason}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MemoryBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="memory-block">
      <span>{title}</span>
      <ChipRow values={values} />
    </div>
  );
}

function CravingInputPanel({
  context,
  interpretation,
  interpretationStatus,
  onChange,
}: {
  context: DecisionContext;
  interpretation: ReturnType<typeof interpretCravingStatic>;
  interpretationStatus: string;
  onChange: (patch: Partial<DecisionContext>) => void;
}) {
  return (
    <section className="craving-input-panel">
      <label className="field large">
        <span>Craving</span>
        <textarea
          value={context.cravingText}
          placeholder="Something spicy, satisfying, not too oily."
          onChange={(event) => onChange({ cravingText: event.target.value })}
        />
      </label>
      <ChipSelector label="Try a messy craving" values={cravingExamples} selected={context.cravingText} onSelect={(value) => onChange({ cravingText: value })} />
      <BudgetChipGroup context={context} onChange={onChange} />
      <OccasionSelector context={context} onChange={onChange} />
      <ExplorationSelector context={context} onChange={onChange} />
      <ChipSelector label="Heaviness" values={[...heavinessOptions]} selected={context.heaviness} onSelect={(value) => onChange({ heaviness: value })} />
      {context.occasion === "Weekday Rush" && (
        <div className="rush-panel">
          <ChipSelector label="Available time" values={[...timeOptions]} selected={context.availableTime} onSelect={(value) => onChange({ availableTime: value })} />
          <ChipSelector label="Upcoming constraint" values={[...constraintOptions]} selected={context.upcomingConstraint} onSelect={(value) => onChange({ upcomingConstraint: value })} />
        </div>
      )}
      <div className="interpretation-card">
        <span>CraveWise heard</span>
        <small>{interpretationStatus}</small>
        <p>
          {interpretation.needs_clarification
            ? "This craving is vague, so CraveWise would ask one more question."
            : `${formatSignalList(interpretation.preferenceSignals)} craving${interpretation.cuisineIntents.length ? ` with ${interpretation.cuisineIntents.join(", ")} signal` : ""}.`}
        </p>
        {interpretation.needs_clarification && <ChipRow values={["Spicy", "Comforting", "Light", "Surprise me"]} />}
      </div>
    </section>
  );
}

function BudgetChipGroup({
  context,
  onChange,
}: {
  context: DecisionContext;
  onChange: (patch: Partial<DecisionContext>) => void;
}) {
  return (
    <>
      <ChipSelector<BudgetBand>
        label="Budget"
        values={budgetBands}
        selected={context.budgetBand}
        onSelect={(value) => onChange({ budgetBand: value })}
      />
      {context.budgetBand === "Custom" && (
        <label className="field compact">
          <span>Custom budget</span>
          <input
            value={context.customBudget}
            placeholder="under 300 / around 500 / not above 400"
            onChange={(event) => onChange({ customBudget: event.target.value })}
          />
        </label>
      )}
    </>
  );
}

function OccasionSelector({
  context,
  onChange,
}: {
  context: DecisionContext;
  onChange: (patch: Partial<DecisionContext>) => void;
}) {
  return <ChipSelector label="Occasion" values={occasions} selected={context.occasion} onSelect={(value) => onChange({ occasion: value })} />;
}

function ExplorationSelector({
  context,
  onChange,
}: {
  context: DecisionContext;
  onChange: (patch: Partial<DecisionContext>) => void;
}) {
  const selectedLabel = explorationOptions.find((item) => item.value === context.explorationIntent)?.label ?? "Somewhat new";
  return (
    <ChipSelector
      label="Exploration"
      values={explorationOptions.map((item) => item.label)}
      selected={selectedLabel}
      onSelect={(label) => {
        const option = explorationOptions.find((item) => item.label === label);
        if (option) onChange({ explorationIntent: option.value });
      }}
    />
  );
}

function RecommendationHeroCard({
  recommendation,
  personaName,
  context,
  fallbackState,
}: {
  recommendation: Recommendation;
  personaName: string;
  context: DecisionContext;
  fallbackState: FallbackState;
}) {
  const item = recommendation.item;
  const deliveryCopy = `${item.estimatedDeliveryMin}-${item.estimatedDeliveryMax} min dummy`;
  const confidenceLabel = getRecommendationDisplayLabel(recommendation, fallbackState);
  const cardLabel = fallbackState.type === "closest_available"
    ? "Closest available"
    : fallbackState.type === "limited_match"
      ? "Closest match"
      : "Tonight's pick";
  return (
    <article className="recommendation-hero-card">
      <div className="hero-card-top">
        <span>{cardLabel}</span>
        <strong>{confidenceLabel}</strong>
      </div>
      <h2>{item.dishName}</h2>
      <p className="restaurant-line">{item.restaurantName}</p>
      <div className="hero-metrics">
        <Metric label="Price" value={`Rs.${item.price}`} />
        <Metric label="ETA" value={deliveryCopy} />
        <Metric label="Regret risk" value={item.regretRisk} />
        <Metric label="Budget fit" value={recommendation.budgetFit} />
        <Metric label="Exploration" value={context.explorationIntent.replace("_", " ")} />
        <Metric label="Confidence" value={confidenceLabel} />
      </div>
      <p className="hero-reason">
        {recommendation.reason}
      </p>
      {recommendation.memoryNotes.length > 0 && <LocalMemoryInfluenceNote notes={recommendation.memoryNotes} />}
      <div className="decision-badges">
        <span>{confidenceLabel}</span>
        {fallbackState.type === "closest_available" && <span>No exact match in demo catalog</span>}
        <span>{personaName}'s taste memory</span>
        <span>Dummy data only</span>
      </div>
    </article>
  );
}

function LocalMemoryInfluenceNote({ notes }: { notes: string[] }) {
  return (
    <section className="memory-influence-note">
      <span>Local demo memory affected this recommendation</span>
      <p>{notes[0]}</p>
      <small>Based on feedback saved in this browser only. You can clear it anytime.</small>
    </section>
  );
}

function InterpretationComparisonPanel({ comparison }: { comparison: InterpretationComparisonResult }) {
  const changedCopy = comparison.changedFields.length
    ? comparison.changedFields.map((field) => field.replace("_", " ")).join(", ")
    : "No compared signal fields changed";
  const staticTop = comparison.staticTopRecommendation ?? "No static top recommendation";
  const aiTop = comparison.aiTopRecommendation ?? "No deterministic top from AI-interpreted signals";

  return (
    <details className="interpretation-comparison-panel">
      <summary>
        <span>Prototype QA: static vs AI interpretation</span>
        <strong>{comparison.recommendationChanged ? "Recommendation changed" : "Same recommendation"}</strong>
      </summary>
      <div className="comparison-body">
        <p>{changedCopy}</p>
        <small>Same persona, context, local memory, catalog, and deterministic scorer. Only interpretation source differs.</small>
        <div className="comparison-grid">
          <div>
            <span>Static top</span>
            <strong>{staticTop}</strong>
          </div>
          <div>
            <span>Deterministic top from AI-interpreted signals</span>
            <strong>{aiTop}</strong>
          </div>
        </div>
        <ComparisonSignalList title="Signals found by AI but not static rules" values={flattenSignalDiff(comparison.addedByAI)} />
        <ComparisonSignalList title="Signals found by static rules but not AI" values={flattenSignalDiff(comparison.missedByAI)} />
        <small>{comparison.notes.join(" ")}</small>
      </div>
    </details>
  );
}

function ComparisonSignalList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="comparison-signal-list">
      <span>{title}</span>
      <p>{values.length ? values.join(", ") : "None"}</p>
    </div>
  );
}

function FallbackCard({ fallbackState }: { fallbackState: FallbackState }) {
  return (
    <section className={`fallback-card ${fallbackState.severity}`}>
      <span>{fallbackState.severity === "blocking" ? "Recommendation paused" : "Recommendation note"}</span>
      <h2>{fallbackState.title}</h2>
      <p>{fallbackState.message}</p>
      {fallbackState.suggestedActions && (
        <div className="chip-row">
          {fallbackState.suggestedActions.map((action) => (
            <span key={action}>{action}</span>
          ))}
        </div>
      )}
    </section>
  );
}

function flattenSignalDiff(diff: InterpretationComparisonResult["addedByAI"]): string[] {
  return Object.entries(diff).flatMap(([field, values]) =>
    (values ?? []).map((value) => `${field.replace("_", " ")}: ${value.replace("_", " ")}`)
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TrustReasonBlock({ recommendation }: { recommendation: Recommendation }) {
  return (
    <section className="trust-reason-block">
      <span>Why this feels right</span>
      <p>{recommendation.reason}</p>
      <div className="reason-grid">
        <div>
          <strong>Taste signal</strong>
          <small>{recommendation.item.cuisine} / {recommendation.item.tags.slice(0, 3).join(", ")}</small>
        </div>
        <div>
          <strong>Tradeoff</strong>
          <small>{recommendation.tradeoff}</small>
        </div>
      </div>
      <small>Every static recommendation references taste memory, context, and regret risk. No real-time supply claims.</small>
    </section>
  );
}

function AvoidedPatternsBlock({ note, fallbackState }: { note: string; fallbackState: FallbackState }) {
  return (
    <section className="avoided-patterns-block">
      <span>What CraveWise avoided</span>
      <p>{note}</p>
      <small>{fallbackState.message}</small>
    </section>
  );
}

function BackupOptionCard({ recommendation, onSelect }: { recommendation: Recommendation; onSelect: () => void }) {
  const item = recommendation.item;
  return (
    <article className="backup-option-card">
      <span>{recommendation.type === "safe" ? "Safer familiar option" : "Exploratory option"}</span>
      <h2>{item.dishName}</h2>
      <p>{item.restaurantName} / Rs.{item.price}</p>
      <div className="metric-row">
        <span>{item.regretRisk} regret risk</span>
        <span>{recommendation.confidence} confidence</span>
      </div>
      <p>{recommendation.reason}</p>
      <div className="tradeoff-line">{recommendation.tradeoff}</div>
      <button className="secondary-action" onClick={onSelect}>
        Select this
      </button>
    </article>
  );
}

function FeedbackButtonGroup({ value, onChange }: { value: FeedbackChoice; onChange: (value: FeedbackChoice) => void }) {
  const labels: Record<Exclude<FeedbackChoice, "">, string> = {
    "Loved it": "Loved it",
    Meh: "Meh",
    Disappointing: "Disappointing",
    Skipped: "Skip",
  };
  return (
    <div className="feedback-button-group">
      {(["Loved it", "Meh", "Disappointing", "Skipped"] as const).map((choice) => (
        <button key={choice} className={value === choice ? "selected" : ""} onClick={() => onChange(choice)}>
          {labels[choice]}
        </button>
      ))}
    </div>
  );
}

function FeedbackReasonChips({ selected, onToggle }: { selected: string[]; onToggle: (reason: string) => void }) {
  return (
    <div className="feedback-reason-chips">
      {feedbackReasons.map((reason) => (
        <button key={reason} className={selected.includes(reason) ? "selected" : ""} onClick={() => onToggle(reason)}>
          {reason}
        </button>
      ))}
    </div>
  );
}

function InsightCard({ index, insight }: { index: number; insight: string }) {
  return (
    <article className="insight-card">
      <span>Learning {index}</span>
      <p>{insight}</p>
    </article>
  );
}

function LocalDemoMemoryPanel({
  memories,
  dynamicInsights,
  totalMemoryCount,
  personaName,
  onClear,
}: {
  memories: LocalFeedbackMemory[];
  dynamicInsights: LocalInsightSummary[];
  totalMemoryCount: number;
  personaName: string;
  onClear: () => void;
}) {
  return (
    <section className="local-demo-memory-panel">
      <div className="local-memory-head">
        <div>
          <span>Local demo memory from this browser</span>
          <p>
            Saved feedback stays in this browser only. It is not AI memory, backend persistence, or cross-device personalization.
          </p>
        </div>
        <button className="text-action" onClick={onClear} disabled={totalMemoryCount === 0}>
          Clear local demo memory
        </button>
      </div>
      {memories.length > 0 ? (
        <>
          <section className="dynamic-local-insights" aria-label={`Local demo memory patterns for ${personaName}`}>
            <div>
              <span>Based on feedback saved in this browser</span>
              <p>Local demo memory patterns for {personaName}. These disappear when local demo memory is cleared.</p>
            </div>
            {dynamicInsights.length > 0 ? (
              <div className="dynamic-local-insight-list">
                {dynamicInsights.map((insight) => (
                  <article key={insight.title}>
                    <strong>{insight.title}</strong>
                    <p>{insight.body}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="local-memory-empty">
                Feedback is saved for {personaName}, but there is not enough repeated local pattern data yet.
              </div>
            )}
          </section>
          <div className="local-memory-list">
            {memories.slice(0, 4).map((memory) => (
              <article key={memory.id}>
                <span>{formatFeedbackDate(memory.createdAt)}</span>
                <p>{buildLocalMemoryInsight(memory)}</p>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="local-memory-empty">
          {totalMemoryCount > 0
            ? `No saved local feedback for ${personaName} yet. Other persona demo feedback is stored in this browser.`
            : "No local demo feedback saved yet. Submit feedback after a recommendation to see this section update after refresh."}
        </div>
      )}
    </section>
  );
}

type LocalInsightSummary = {
  title: string;
  body: string;
};

function ChipSelector<T extends string>({
  label,
  values,
  selected,
  onSelect,
}: {
  label: string;
  values: T[];
  selected: string;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="chip-selector">
      <span>{label}</span>
      <div>
        {values.map((value) => (
          <button key={value} className={selected === value ? "selected" : ""} onClick={() => onSelect(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

function NoResponsibleMatchEmptyState({
  fallbackState,
  interpretation,
}: {
  fallbackState: FallbackState;
  interpretation: CravingInterpretation;
}) {
  const heardSignals = [
    ...interpretation.explicitDishIntents.map((signal) => `dish: ${signal.replace("_", " ")}`),
    ...interpretation.cuisineIntents.map((signal) => `cuisine: ${signal}`),
    ...interpretation.preferenceSignals.map((signal) => `preference: ${signal.replace("_", " ")}`),
  ];
  const supportedCuisines = Array.from(new Set(menuCatalog.map((item) => item.cuisine))).slice(0, 4);
  const supportedDishes = Array.from(new Set(menuCatalog.map((item) => item.dishType.replace("_", " ")))).slice(0, 4);
  return (
    <section className={`fallback-card ${fallbackState.severity}`}>
      <span>Recommendation paused</span>
      <h2>{fallbackState.title}</h2>
      <p>{fallbackState.message}</p>
      <div className="reason-grid">
        <div>
          <strong>What we heard</strong>
          <small>{heardSignals.length ? heardSignals.join(", ") : interpretation.rawInput}</small>
        </div>
        <div>
          <strong>Demo catalog supports</strong>
          <small>{[...supportedCuisines, ...supportedDishes].join(", ")}</small>
        </div>
      </div>
      {fallbackState.suggestedActions && <ChipRow values={fallbackState.suggestedActions} />}
    </section>
  );
}

function ChipRow({ values }: { values: string[] }) {
  return (
    <div className="chip-row">
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}

function formatSignalList(values: string[]): string {
  return values.length ? values.map((value) => value.replace("_", " ")).join(", ") : "comfort";
}

function getInterpretationStatus(
  resolution: InterpretationResolution | null,
  contextKey: string,
  isInterpreting: boolean,
): string {
  if (isInterpreting) return "Checking AI interpretation";
  if (resolution?.contextKey !== contextKey) return "Using local rules";
  if (resolution.interpretationSource === "ai_interpreted") return "AI interpreted your craving";
  if (resolution.fallbackReason === "missing_api_key") return "AI unavailable, using local rules";
  return "Using local rules";
}

function readLocalFeedbackMemory(): LocalFeedbackMemory[] {
  if (typeof window === "undefined") return [];
  try {
    const rawMemory = window.localStorage.getItem(localFeedbackMemoryKey);
    if (!rawMemory) return [];
    const parsed = JSON.parse(rawMemory);
    return Array.isArray(parsed) ? parsed.filter(isLocalFeedbackMemory) : [];
  } catch {
    return [];
  }
}

function writeLocalFeedbackMemory(memories: LocalFeedbackMemory[]) {
  window.localStorage.setItem(localFeedbackMemoryKey, JSON.stringify(memories));
}

function isLocalFeedbackMemory(value: unknown): value is LocalFeedbackMemory {
  if (!value || typeof value !== "object") return false;
  const memory = value as Partial<LocalFeedbackMemory>;
  return Boolean(
    memory.id &&
      memory.personaId &&
      memory.personaName &&
      memory.decisionContext &&
      memory.selectedRecommendation &&
      memory.feedback &&
      memory.classification &&
      memory.createdAt,
  );
}

function buildLocalFeedbackMemory(
  personaId: string,
  personaName: string,
  context: DecisionContext,
  selectedRecommendation: Recommendation,
  feedback: Exclude<FeedbackChoice, "" | "Skipped">,
  reasonChips: string[],
  feedbackText: string,
  classification: ReturnType<typeof classifyFeedbackStatic>,
): LocalFeedbackMemory {
  const customBudget = Number(context.customBudget.match(/\d+/)?.[0]);
  return {
    id: `${Date.now()}-${selectedRecommendation.item.id}`,
    personaId,
    personaName,
    decisionContext: {
      rawCraving: context.cravingText,
      budgetRange: context.budgetBand,
      ...(Number.isFinite(customBudget) ? { customBudget } : {}),
      occasion: context.occasion,
      explorationIntent: context.explorationIntent,
      heaviness: context.heaviness,
      availableTime: context.availableTime,
      upcomingConstraint: context.upcomingConstraint,
    },
    selectedRecommendation: {
      dishName: selectedRecommendation.item.dishName,
      restaurantName: selectedRecommendation.item.restaurantName,
      price: selectedRecommendation.item.price,
      type: mapRecommendationType(selectedRecommendation.type),
      regretRisk: selectedRecommendation.item.regretRisk,
    },
    feedback: {
      sentiment: mapFeedbackSentiment(feedback),
      reasonChips,
      ...(feedbackText.trim() ? { customNote: feedbackText.trim() } : {}),
    },
    classification: {
      sentiment: classification.sentiment,
      regretLevel: classification.regret_level,
      failureReasons: normalizeFailureReasonCodes(classification.failure_reasons),
      reorderIntent: classification.reorder_intent,
      learning: classification.learning,
    },
    createdAt: new Date().toISOString(),
  };
}

function mapRecommendationType(type: Recommendation["type"]): StoredRecommendationType {
  if (type === "safe") return "safer_backup";
  if (type === "explore") return "exploratory_backup";
  return "primary";
}

function mapFeedbackSentiment(feedback: Exclude<FeedbackChoice, "" | "Skipped">): StoredFeedbackSentiment {
  if (feedback === "Loved it") return "loved";
  if (feedback === "Disappointing") return "disappointing";
  return "meh";
}

function deriveLocalInsightSummaries(memories: LocalFeedbackMemory[], personaName: string): LocalInsightSummary[] {
  const reasonCounts = new Map<FailureReasonCode, number>();
  let wouldReorderCount = 0;
  let wouldNotReorderCount = 0;

  memories.forEach((memory) => {
    const reasons = getMemoryReasonCodes(memory);
    reasons.forEach((reason) => reasonCounts.set(reason, (reasonCounts.get(reason) ?? 0) + 1));

    if (memory.classification.reorderIntent === "yes" || reasons.includes("would_reorder")) {
      wouldReorderCount += 1;
    }

    if (memory.classification.reorderIntent === "no" || reasons.includes("would_not_reorder")) {
      wouldNotReorderCount += 1;
    }
  });

  const insights: LocalInsightSummary[] = [];
  const tooOilyCount = reasonCounts.get("too_oily") ?? 0;
  const wrongCravingCount = reasonCounts.get("wrong_craving_match") ?? 0;
  const deliveryIssueCount = (reasonCounts.get("delivery_issue") ?? 0) + (reasonCounts.get("reliability_issue") ?? 0);
  const notFreshCount = reasonCounts.get("not_fresh") ?? 0;

  if (tooOilyCount > 0) {
    insights.push({
      title: tooOilyCount > 1 ? "Repeated too-oily feedback" : "Too-oily feedback saved",
      body: `${formatCount(tooOilyCount, "meal")} included ${feedbackReasonLabels.too_oily}. Local scoring can treat oily or fried options more cautiously for ${personaName}.`,
    });
  }

  if (wrongCravingCount > 0) {
    insights.push({
      title: "Craving-match miss",
      body: `${formatCount(wrongCravingCount, "recommendation")} included ${feedbackReasonLabels.wrong_craving_match}. Local scoring can give explicit dish or cuisine hints more weight.`,
    });
  }

  if (wouldReorderCount > 0) {
    insights.push({
      title: "Would-reorder signal",
      body: `${formatCount(wouldReorderCount, "meal")} carried a would-reorder signal. Similar dishes or restaurants can get a modest local boost.`,
    });
  }

  if (wouldNotReorderCount > 0) {
    insights.push({
      title: "Would-not-reorder signal",
      body: `${formatCount(wouldNotReorderCount, "meal")} carried a would-not-reorder signal. The same dish or restaurant can be modestly penalized in this browser.`,
    });
  }

  if (deliveryIssueCount > 0) {
    insights.push({
      title: "Delivery or reliability issue",
      body: `${formatCount(deliveryIssueCount, "feedback item")} mentioned delivery or reliability. Weekday Rush choices can prefer faster, higher-reliability dummy options.`,
    });
  }

  if (notFreshCount > 0) {
    insights.push({
      title: "Freshness concern",
      body: `${formatCount(notFreshCount, "meal")} included ${feedbackReasonLabels.not_fresh}. Local scoring can treat the same restaurant and slower reliability-sensitive options more cautiously.`,
    });
  }

  return insights.slice(0, 5);
}

function getMemoryReasonCodes(memory: LocalFeedbackMemory): FailureReasonCode[] {
  return normalizeFailureReasonCodes([
    ...memory.classification.failureReasons,
    ...memory.feedback.reasonChips,
  ]);
}

function formatCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function buildLocalMemoryInsight(memory: LocalFeedbackMemory): string {
  const dish = memory.selectedRecommendation.dishName;
  const restaurant = memory.selectedRecommendation.restaurantName;
  const label = memory.feedback.sentiment === "loved"
    ? "Loved"
    : memory.feedback.sentiment === "disappointing"
      ? "Disappointing"
      : "Meh";
  const reasons = memory.feedback.reasonChips.length ? ` because of ${memory.feedback.reasonChips.join(", ")}` : "";
  const context = `${memory.decisionContext.occasion.toLowerCase()} ${memory.decisionContext.rawCraving}`;
  const failureReasons = normalizeFailureReasonCodes(memory.classification.failureReasons);

  if (failureReasons.includes("wrong_craving_match")) {
    return "CraveWise missed your explicit craving in one recommendation. This browser's local scoring now gives explicit dish/cuisine hints more weight.";
  }

  if (memory.classification.regretLevel === "high") {
    return `You marked ${dish} from ${restaurant} as ${label}${reasons}. This browser's local scoring can now penalize similar patterns.`;
  }

  if (memory.classification.reorderIntent === "yes") {
    return `You marked ${dish} from ${restaurant} as ${label}. This browser's local scoring can now modestly boost similar reorder patterns.`;
  }

  return `You marked ${dish} from ${restaurant} as ${label}${reasons} for ${context}. Saved for local demo review in this browser.`;
}

function toScoringFeedbackMemory(memory: LocalFeedbackMemory): ScoringFeedbackMemory {
  return {
    personaId: memory.personaId,
    decisionContext: {
      rawCraving: memory.decisionContext.rawCraving,
      occasion: memory.decisionContext.occasion,
      availableTime: memory.decisionContext.availableTime,
      upcomingConstraint: memory.decisionContext.upcomingConstraint,
    },
    selectedRecommendation: {
      dishName: memory.selectedRecommendation.dishName,
      restaurantName: memory.selectedRecommendation.restaurantName,
      price: memory.selectedRecommendation.price,
    },
    feedback: memory.feedback,
    classification: {
      ...memory.classification,
      failureReasons: normalizeFailureReasonCodes(memory.classification.failureReasons),
    },
  };
}

function formatFeedbackDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved locally";
  return `Saved locally ${date.toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`;
}

function getConfidenceLabel(confidence: Recommendation["confidence"]): string {
  if (confidence === "high") return "Strong match";
  if (confidence === "medium") return "Medium match";
  return "Limited confidence";
}

function getRecommendationDisplayLabel(recommendation: Recommendation, fallbackState: FallbackState): string {
  if (fallbackState.type === "closest_available" || recommendation.matchQuality === "style_match") return "Closest available";
  if (fallbackState.type === "limited_match" || recommendation.matchQuality === "partial") return "Limited match";
  return getConfidenceLabel(recommendation.confidence);
}
