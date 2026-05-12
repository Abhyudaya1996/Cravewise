"use client";

import { useMemo, useState } from "react";
import {
  budgetBands,
  BudgetBand,
  classifyFeedbackStatic,
  constraintOptions,
  cravingExamples,
  DecisionContext,
  explorationOptions,
  feedbackReasons,
  generateInsightsStatic,
  getFallbackState,
  getPersona,
  heavinessOptions,
  interpretCravingStatic,
  occasions,
  personas,
  Recommendation,
  scoreRecommendationStatic,
  timeOptions,
} from "../data/sampleData";

type Step = "home" | "personas" | "profile" | "craving" | "recommendation" | "backups" | "feedback" | "insights";
type FeedbackChoice = "Loved it" | "Meh" | "Disappointing" | "Skipped" | "";

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

  const persona = useMemo(() => getPersona(selectedPersonaId), [selectedPersonaId]);
  const interpretation = useMemo(() => interpretCravingStatic(context), [context]);
  const recommendations = useMemo(() => scoreRecommendationStatic(persona, context), [persona, context]);
  const primaryRecommendation = recommendations[0];
  const backupRecommendations = recommendations.slice(1, 3);
  const fallbackState = getFallbackState(context, recommendations, interpretation);
  const feedbackClassification = classifyFeedbackStatic(feedback, reasonChips, feedbackText);
  const insights = generateInsightsStatic(persona);

  function updateContext(patch: Partial<DecisionContext>) {
    setContext((current) => ({ ...current, ...patch }));
  }

  function chooseRecommendation(recommendation: Recommendation) {
    setSelectedRecommendation(recommendation);
    setStep("feedback");
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
            onChange={updateContext}
          />
          <button className="primary-action" onClick={() => setStep("recommendation")}>
            Get one recommendation
          </button>
        </Screen>
      )}

      {step === "recommendation" && (
        <Screen eyebrow="Tonight's pick" title="One confident answer">
          <RecommendationHeroCard recommendation={primaryRecommendation} personaName={persona.name} context={context} />
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
        </Screen>
      )}

      {step === "backups" && (
        <Screen eyebrow="Only if needed" title="Two backup paths">
          <p className="supporting-copy">Backups stay secondary so CraveWise does not become another browsing grid.</p>
          <div className="backup-list">
            {backupRecommendations.map((recommendation) => (
              <BackupOptionCard
                key={recommendation.item.id}
                recommendation={recommendation}
                onSelect={() => chooseRecommendation(recommendation)}
              />
            ))}
          </div>
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
          <button className="primary-action" onClick={() => setStep("insights")}>
            See what CraveWise learned
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
  onChange,
}: {
  context: DecisionContext;
  interpretation: ReturnType<typeof interpretCravingStatic>;
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
        <p>
          {interpretation.needs_clarification
            ? "This craving is vague, so CraveWise would ask one more question."
            : `${interpretation.craving_type.join(", ")} craving${interpretation.cuisine_hint ? ` with ${interpretation.cuisine_hint} signal` : ""}.`}
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
}: {
  recommendation: Recommendation;
  personaName: string;
  context: DecisionContext;
}) {
  const item = recommendation.item;
  const matchScore = Math.min(98, Math.max(54, recommendation.score));
  const deliveryCopy = `${item.estimatedDeliveryMin}-${item.estimatedDeliveryMax} min dummy`;
  return (
    <article className="recommendation-hero-card">
      <div className="hero-card-top">
        <span>Tonight's pick</span>
        <strong>{matchScore}% taste match</strong>
      </div>
      <h2>{item.dishName}</h2>
      <p className="restaurant-line">{item.restaurantName}</p>
      <div className="hero-metrics">
        <Metric label="Price" value={`Rs.${item.price}`} />
        <Metric label="ETA" value={deliveryCopy} />
        <Metric label="Regret risk" value={item.regretRisk} />
        <Metric label="Budget fit" value={recommendation.budgetFit} />
        <Metric label="Exploration" value={context.explorationIntent.replace("_", " ")} />
      </div>
      <p className="hero-reason">
        {recommendation.reason}
      </p>
      <div className="decision-badges">
        <span>{recommendation.confidence} confidence</span>
        <span>{personaName}'s taste memory</span>
        <span>Dummy data only</span>
      </div>
    </article>
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

function AvoidedPatternsBlock({ note, fallbackState }: { note: string; fallbackState: string }) {
  return (
    <section className="avoided-patterns-block">
      <span>What CraveWise avoided</span>
      <p>{note}</p>
      <small>{fallbackState}</small>
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

function ChipRow({ values }: { values: string[] }) {
  return (
    <div className="chip-row">
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </div>
  );
}
