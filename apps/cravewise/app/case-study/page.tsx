import type { Metadata } from "next";
import "./case-study.css";

export const metadata: Metadata = {
  title: "CraveWise Case Study | AI PM Portfolio",
  description:
    "A portfolio case study on CraveWise, a bounded-AI food decision assistant with deterministic scoring and live evaluation evidence.",
};

const cravingFragments = [
  "pizza but not cheese overloaded",
  "spicy but not oily",
  "healthy but filling",
  "something meaty, but quick",
  "sweet tooth tonight",
];

const flowSteps = [
  { number: "1", label: "Persona", tone: "quiet" },
  { number: "2", label: "Taste Profile", tone: "quiet" },
  { number: "3", label: "Craving Input", tone: "quiet" },
  { number: "4", label: "One Recommendation", tone: "dominant" },
  { number: "5", label: "Backups", tone: "secondary" },
  { number: "6", label: "Feedback", tone: "secondary" },
  { number: "7", label: "Insights", tone: "secondary" },
];

const evidenceCards = [
  {
    title: "Case A",
    label: "AI helped narrowly",
    category: "ai-helped",
    categoryLabel: "AI helped",
    body: "Gemini helped preserve pizza intent and avoid_cheese_heavy. Deterministic scoring still remained the recommendation authority.",
  },
  {
    title: "Case D",
    label: "Static was enough",
    category: "deterministic",
    categoryLabel: "Deterministic scoring",
    body: "For healthy but filling, Gemini captured health and satiety signals but did not materially change the recommendation.",
  },
  {
    title: "Case F",
    label: "Fallback hygiene",
    category: "fallback",
    categoryLabel: "Fallback / trust protection",
    body: "Invalid schema and invalid JSON outputs returned to static rules instead of weakening validation or blocking the product flow.",
  },
  {
    title: "Sweet/dessert QA",
    label: "Taxonomy mattered",
    category: "deterministic",
    categoryLabel: "Deterministic scoring",
    body: "After sweet and dessert coverage, Gemini emitted dessert plus sweet without route prompt weakening or schema relaxation.",
  },
  {
    title: "Fallback paths",
    label: "Reliability evidence",
    category: "fallback",
    categoryLabel: "Fallback / trust protection",
    body: "Timeouts, provider limits, quota issues, invalid output, and unsafe fields are treated as product paths, not surprises.",
  },
];

const measurementMetrics = [
  {
    title: "Decision time",
    body: "Does CraveWise reduce time-to-choice?",
  },
  {
    title: "Acceptance rate",
    body: "Do users act on the single recommendation?",
  },
  {
    title: "Regret rate",
    body: "Do users undo, reject, or give negative feedback after choosing?",
  },
  {
    title: "Repeat intent",
    body: "Do users return because recommendations feel trusted?",
  },
];

const taxonomyExamples = [
  { input: "sweet tooth", signal: "sweet ✓", tone: "new", note: "new" },
  { input: "not oily", signal: "avoid_oily ✓", tone: "constraint" },
  { input: "veg only", signal: "avoid_non_veg ✓", tone: "constraint" },
  { input: "no chicken", signal: "no meaty signal ✓", tone: "guard", note: "negation guard" },
  { input: "pizza not cheesy", signal: "avoid_cheese_heavy ✓", tone: "constraint" },
  { input: "cheesy pizza", signal: "no constraint ✓", tone: "affirm", note: "affirmative" },
  { input: "kuch meetha", signal: "dessert + sweet ✓", tone: "new", note: "new" },
];

export default function CraveWiseCaseStudyPage() {
  return (
    <main className="case-study-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <nav className="case-nav" aria-label="Case study navigation">
        <a href="/">← Back to prototype</a>
        <a href="#evidence">Read the evidence ↓</a>
      </nav>

      <section className="cs-hero">
        <div className="cs-hero-copy">
          <span className="case-eyebrow">AI-native PM portfolio project</span>
          <h1>Most food apps increase options. CraveWise reduces the decision surface.</h1>
          <p>
            CraveWise is a mobile-first food decision assistant, not a delivery marketplace. It gives one
            trusted recommendation with bounded AI, deterministic scoring, and live evaluation evidence.
          </p>
          <div className="cs-proof-chips" aria-label="Project proof points">
            <span>Working prototype</span>
            <span>Evidence: static evals 33/33</span>
            <span>AI validation 5/5</span>
            <span>Suppresses weak recommendations</span>
            <span>Bounded AI · deterministic scoring</span>
          </div>
          <div className="cs-action-row">
            <a className="cs-primary-link" href="/">Try the prototype →</a>
            <a className="cs-secondary-link" href="#evidence">Read the evidence ↓</a>
          </div>
        </div>

        <div className="cs-phone-wrap" aria-label="CraveWise recommendation mockup">
          <div className="cs-phone">
            <div className="cs-phone-screen">
              <div className="cs-phone-status">
                <span>9:41</span>
                <span>●●●</span>
              </div>
              <div className="cs-phone-appbar">CW · Food decision assistant</div>
              <div className="cs-phone-input">
                <span>Craving</span>
                <strong>I have sweet tooth tonight</strong>
              </div>
              <article className="cs-phone-card">
                <span className="cs-phone-label">Tonight&apos;s pick · strong match ✓</span>
                <h2>Gulab Jamun Combo</h2>
                <p>Sweet House</p>
                <div className="cs-phone-meta">Rs.180 · within Rs.250-400</div>
                <div className="cs-phone-tags">
                  <span>sweet craving</span>
                  <span>budget fit</span>
                </div>
                <p className="cs-phone-reason">
                  Fits the explicit dessert craving and stays within budget.
                </p>
              </article>
              <div className="cs-phone-avoid">
                <span>Avoided: heavy</span>
                <span>oily</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-reading" id="problem">
        <span className="case-eyebrow">Problem</span>
        <h2>The painful moment is not finding food. It is choosing.</h2>
        <p>
          Food apps are optimized for browsing. CraveWise explores the opposite product bet: reduce the
          decision surface when users already know fragments of what they want and what they regret.
        </p>
        <div className="cs-fragment-grid" aria-label="Craving examples">
          {cravingFragments.map((fragment) => (
            <blockquote key={fragment}>“{fragment}”</blockquote>
          ))}
        </div>
      </section>

      <section className="cs-section cs-wide">
        <div className="cs-section-head">
          <span className="case-eyebrow">Product thesis</span>
          <h2>One recommendation. Earned, not listed.</h2>
          <p>
            One recommendation is the wedge. Trust comes from visible reasoning, clear constraints,
            secondary backups, feedback memory, honest caveats, and no fake availability.
          </p>
        </div>
        <div className="cs-surface-comparison" aria-label="Decision surface comparison">
          <article className="cs-browsing-panel">
            <span className="cs-panel-label">Most food apps</span>
            <div className="cs-option-grid" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index}>
                  <i />
                  <b />
                </span>
              ))}
            </div>
            <p>16 restaurants · 200+ options</p>
            <strong>More options, more paralysis</strong>
          </article>
          <div className="cs-comparison-arrow" aria-hidden="true">→</div>
          <article className="cs-one-answer-panel">
            <span className="cs-panel-label">CraveWise</span>
            <div className="cs-answer-card">
              <span className="cs-checkmark">✓</span>
              <h3>Gulab Jamun Combo</h3>
              <p>Strong match · Rs.180</p>
            </div>
            <strong>One confident answer</strong>
          </article>
        </div>
        <p className="cs-note">
          CraveWise does not order food, process payments, track delivery, scrape apps, or claim live
          availability.
        </p>
      </section>

      <section className="cs-flow-section cs-wide">
        <div className="cs-section-head">
          <span className="case-eyebrow">Product flow</span>
          <h2>The decision experience, step by step.</h2>
          <p className="cs-persona-note">
            Personas are illustrative composites for demo scenarios, not interview-derived research.
          </p>
        </div>
        <ol className="cs-flow-timeline">
          {flowSteps.map((step) => (
            <li key={step.label} className={`cs-flow-${step.tone}`}>
              <span>{step.number}</span>
              <strong>{step.label}</strong>
            </li>
          ))}
        </ol>
        <div className="cs-feedback-arc">Feedback and insights loop back into future recommendations.</div>
      </section>

      <section className="cs-section cs-reading">
        <span className="case-eyebrow">Static-first foundation</span>
        <h2>Static first. AI only when it earns its place.</h2>
        <p>
          Static-first tested the decision-support thesis before adding AI. Deterministic scoring created
          a comparison baseline, and the Simran pizza regression was caught and fixed without AI.
        </p>
        <div className="cs-stat-row" aria-label="Verification stats">
          <article>
            <strong>33</strong>
            <span>/ 33</span>
            <p>Static evals passed</p>
          </article>
          <article>
            <strong>5</strong>
            <span>/ 5</span>
            <p>AI validation checks</p>
          </article>
          <article>
            <strong>3</strong>
            <span>/ 3</span>
            <p>Interpretation comparisons</p>
          </article>
        </div>
        <p className="cs-proof-note">Live Gemini QA: dessert + sweet accepted after taxonomy update.</p>
      </section>

      <section className="cs-section cs-wide">
        <div className="cs-section-head">
          <span className="case-eyebrow">Architecture boundary</span>
          <h2>Where AI can act. Where it cannot.</h2>
        </div>
        <div className="cs-arch-diagram" aria-label="CraveWise architecture boundary">
          <div className="cs-arch-zone cs-arch-ai">
            <span className="cs-arch-zone-label">AI interpretation layer</span>
            <div className="cs-arch-nodes">
              <div className="cs-arch-node">User craving input</div>
              <div className="cs-arch-node-arrow">↓</div>
              <div className="cs-arch-node cs-arch-node-ai">
                Optional AI interpretation
                <small>Signals only, no dish ranking</small>
              </div>
              <div className="cs-arch-node-arrow">↓</div>
              <div className="cs-arch-node">Schema validation</div>
            </div>
            <div className="cs-arch-fallback">Fallback: invalid, slow, missing, or unsafe output → static rules</div>
          </div>
          <div className="cs-arch-boundary" aria-hidden="true">
            <span className="cs-arch-boundary-line" />
            <span className="cs-arch-boundary-arrow">→</span>
            <span className="cs-arch-boundary-label">validated signals only</span>
            <span className="cs-arch-boundary-line" />
          </div>
          <div className="cs-arch-zone cs-arch-det">
            <span className="cs-arch-zone-label">Deterministic scoring · final authority</span>
            <div className="cs-arch-nodes">
              <div className="cs-arch-node">Static interpretation baseline</div>
              <div className="cs-arch-node-arrow">↓</div>
              <div className="cs-arch-node cs-arch-node-det">
                Scoring engine
                <small>Final recommendation authority</small>
              </div>
              <div className="cs-arch-node-arrow">↓</div>
              <div className="cs-arch-node">Recommendation output</div>
              <div className="cs-arch-node-arrow">↓</div>
              <div className="cs-arch-node">Browser-local feedback memory</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-wide" id="evidence">
        <div className="cs-section-head">
          <span className="case-eyebrow">Evidence</span>
          <h2>What the evidence actually showed.</h2>
          <p>
            Gemini evidence was collected across multiple runs, not as one clean uninterrupted 8-case
            pass. Provider limits and fallback paths were part of the evidence.
          </p>
        </div>
        <div className="cs-key-finding">
          <p className="cs-key-finding-text">
            No accepted Gemini case changed the deterministic top recommendation.
          </p>
          <small>
            Combined evidence from 5D-B and 5D-C runs. No fabricated outputs. Fallback rows remain
            fallback rows.
          </small>
        </div>
        <CaseGFailureCard />
        <div className="cs-evidence-grid">
          {evidenceCards.map((card) => (
            <article className={`cs-evidence-card cs-evidence-${card.category}`} key={card.title}>
              <div className="cs-evidence-card-top">
                <span className="cs-evidence-card-label">{card.label}</span>
                <span className="cs-evidence-category">{card.categoryLabel}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
        <div className="cs-taxonomy-head">
          <span className="case-eyebrow">Signal coverage</span>
          <p>Taxonomy was explicitly hardened. These are tested, not assumed.</p>
        </div>
        <div className="cs-taxonomy-strip" role="list" aria-label="Taxonomy signal examples">
          {taxonomyExamples.map((example) => (
            <div className="cs-tax-item" role="listitem" key={example.input}>
              <span className="cs-tax-input">“{example.input}”</span>
              <span className="cs-tax-arrow">→</span>
              <span className={`cs-tax-signal cs-tax-${example.tone}`}>
                {example.signal}
                {example.note ? <em>{example.note}</em> : null}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section cs-reading">
        <span className="case-eyebrow">How we&apos;d measure this</span>
        <h2>Production proof would come from decision behavior.</h2>
        <p>
          These are proposed production metrics, not current measured outcomes. The prototype validates
          logic and boundaries; a shipped product would need behavioral evidence.
        </p>
        <div className="cs-measure-grid">
          {measurementMetrics.map((metric) => (
            <article key={metric.title}>
              <strong>{metric.title}</strong>
              <p>{metric.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cs-pm-section cs-reading" id="pm-judgment">
        <span className="case-eyebrow">PM judgment</span>
        <p className="cs-pm-display">
          The PM decision wasn&apos;t “add AI.” It was deciding where AI should not have authority.
        </p>
        <p className="cs-pm-body">
          Deterministic scoring is not only a safety mechanism. It is a trust and explainability mechanism.
          When a recommendation is wrong, the team can inspect rules, constraints, score breakdowns, and
          failure cases instead of blaming a black-box AI output.
        </p>
        <div className="cs-pm-grid">
          <article>
            <strong>Static-first validated the thesis</strong>
            <p>The prototype proved the decision-support concept before any AI was added.</p>
          </article>
          <article>
            <strong>Case G exposed AI noise by design</strong>
            <p>Testing for failure, not just success, made the architecture more honest.</p>
          </article>
          <article>
            <strong>Fallback design is product design</strong>
            <p>Timeouts, invalid output, and quota limits return to static rules by contract.</p>
          </article>
          <article>
            <strong>Taxonomy coverage made AI testable</strong>
            <p>Sweet and dessert coverage made obvious cravings auditable, not assumed.</p>
          </article>
        </div>
        <p className="cs-pm-close">
          The food domain is the vehicle. The transferable skill is knowing when to constrain AI, how to
          validate its outputs, and how to use evidence to decide whether AI improves the product rather than
          assuming it does.
        </p>
      </section>

      <footer className="cs-footer">
        <a className="cs-footer-primary" href="/">Try the prototype →</a>
        <div className="cs-footer-links">
          <a href="https://github.com/Abhyudaya1996/Cravewise/tree/feature/cravewise-static-logic-evals" target="_blank" rel="noopener">
            GitHub repo ↗
          </a>
          <a href="https://github.com/Abhyudaya1996/Cravewise/blob/feature/cravewise-static-logic-evals/projects/01-cravewise/docs/CASE_STUDY_DRAFT.md" target="_blank" rel="noopener">
            Markdown case study ↗
          </a>
          <a href="https://github.com/Abhyudaya1996/Cravewise/blob/feature/cravewise-static-logic-evals/projects/01-cravewise/docs/AI_EVALUATION_PACK_5C.md" target="_blank" rel="noopener">
            Evaluation evidence ↗
          </a>
        </div>
        <small className="cs-footer-note">CraveWise · AI PM portfolio project · Static demo</small>
      </footer>
    </main>
  );
}

function CaseGFailureCard() {
  return (
    <article className="cs-case-g">
      <div className="cs-case-g-header">
        <span className="cs-case-g-label">Case G · AI noise evidence</span>
        <span className="cs-case-g-verdict">Architecture held</span>
      </div>
      <h3 className="cs-case-g-headline">AI accepted nonsense. Architecture still held.</h3>
      <p className="cs-case-g-body">
        Input: “asdf random blah.” Gemini returned high-confidence exploratory intent with{" "}
        <code>needs_clarification: false</code> — confident about nothing. Deterministic scoring ignored
        the noise signal. The top recommendation was unchanged.
      </p>
      <div className="cs-case-g-footer">
        <span>Input: nonsense</span>
        <span>AI: accepted incorrectly</span>
        <span>Top recommendation: unchanged</span>
      </div>
      <p className="cs-case-g-note">
        This is not a failure of the architecture. It is why the architecture was designed with a
        deterministic scoring layer.
      </p>
    </article>
  );
}
