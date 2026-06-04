import type { Metadata } from "next";
import "./case-study.css";

export const metadata: Metadata = {
  title: "CraveWise — Bounded-AI Food Decision Assistant | Case Study | Abhyudaya Singh",
  description:
    "A case study on CraveWise: a bounded-AI food decision assistant where AI interprets signals, deterministic scoring owns the recommendation, and refusal is a tested product path.",
};

const cravingFragments = [
  "pizza but not cheese overloaded",
  "spicy but not oily",
  "healthy but filling",
  "something meaty, but quick",
  "sweet tooth tonight",
];

const evidenceCards = [
  {
    label: "AI helped narrowly",
    category: "AI helped",
    body: "For \"pizza but not cheese overloaded,\" the model preserved pizza intent and the avoid_cheese_heavy constraint. Deterministic scoring still owned the final recommendation.",
  },
  {
    label: "Static was enough",
    category: "Deterministic scoring",
    body: "For \"healthy but filling,\" the model captured health and satiety signals but did not change the recommendation the scoring engine would have made on its own.",
  },
  {
    label: "Fallback hygiene",
    category: "Trust protection",
    body: "Invalid schema and malformed JSON returned to static rules instead of weakening validation or blocking the flow. Timeouts and provider limits are treated as product paths, not surprises.",
  },
  {
    label: "Taxonomy mattered",
    category: "Deterministic scoring",
    body: "After hardening sweet and dessert coverage, the model emitted dessert plus sweet without any prompt weakening or schema relaxation. Tested, not assumed.",
  },
];

const measurementMetrics = [
  { title: "Decision time", body: "Does CraveWise reduce time-to-choice?" },
  { title: "Acceptance rate", body: "Do users act on the single recommendation?" },
  { title: "Regret rate", body: "Do users undo, reject, or give negative feedback after choosing?" },
  { title: "Repeat intent", body: "Do users return because the recommendations feel trusted?" },
];

const pmTakeaways = [
  {
    title: "Static-first validated the thesis",
    body: "The prototype proved the decision-support concept before any AI was added, with a deterministic baseline to compare against.",
  },
  {
    title: "Testing for failure made it honest",
    body: "A nonsense input the model accepted with false confidence was caught because the architecture was tested for failure, not just success.",
  },
  {
    title: "Fallback design is product design",
    body: "Timeouts, invalid output, and quota limits return to static rules by contract — not as an afterthought.",
  },
  {
    title: "Taxonomy coverage made AI testable",
    body: "Explicit signal coverage made obvious cravings auditable instead of assumed.",
  },
];

export default function CraveWiseCaseStudyPage() {
  return (
    <main className="cs-page">
      <article className="cs-article">
        <a className="back-link" href="/">
          ← Back to portfolio
        </a>

        <header className="cs-hero">
          <span className="eyebrow">Case study · CraveWise</span>
          <h1>Most food apps add options. CraveWise removes the decision.</h1>
          <p className="cs-subtitle">
            A mobile-first food decision assistant, not a delivery marketplace. AI interprets craving
            signals; deterministic scoring owns the recommendation; and refusing to recommend is a tested
            product path.
          </p>
          <div className="cs-meta" aria-label="Case study status and reading time">
            <span className="status-chip shipped">Shipped</span>
            <span>~7 min read</span>
          </div>
          <div className="cs-proof-chips" aria-label="Project proof points">
            <span>Working prototype</span>
            <span>Static evals 33/33</span>
            <span>AI validation 5/5</span>
            <span>Weak matches suppressed</span>
            <span>Bounded AI · deterministic scoring</span>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Key takeaway">
          <strong>Key takeaway</strong>
          <p>
            The PM decision was not &quot;add AI.&quot; It was deciding where AI should not have authority. AI
            interprets the craving into signals; a deterministic scoring engine makes the final call and can
            refuse to recommend when no honest match exists. The food domain is the vehicle — the
            transferable skill is constraining AI and using evidence to decide whether it improves the
            product at all.
          </p>
        </aside>

        <div className="cs-body">
          <section className="cs-intro">
            <p>
              Food apps are optimized for browsing. CraveWise explores the opposite bet: reduce the decision
              surface when a user already knows fragments of what they want — and what they would regret.
            </p>
            <p>
              The painful moment is not finding food. It is choosing. CraveWise turns a craving, a few
              constraints, and local feedback memory into one recommendation it can stand behind.
            </p>
          </section>

          <section>
            <h2>The problem: choosing, not finding</h2>
            <p>
              People rarely arrive with nothing. They arrive with fragments — a direction and a boundary at
              the same time:
            </p>
            <div className="cs-fragment-grid" aria-label="Craving examples">
              {cravingFragments.map((fragment) => (
                <blockquote key={fragment}>&ldquo;{fragment}&rdquo;</blockquote>
              ))}
            </div>
            <p>
              A browsing grid answers this with more options. That is the wrong response to decision fatigue.
              The product bet is that one earned recommendation beats two hundred listed ones.
            </p>
          </section>

          <section>
            <h2>The thesis: one recommendation, earned not listed</h2>
            <p>
              One recommendation is the wedge. Trust comes from everything around it: visible reasoning,
              explicit constraints, secondary backups, feedback memory, honest caveats, and no fake
              availability.
            </p>
            <p className="cs-scope-note">
              CraveWise does not order food, process payments, track delivery, scrape apps, or claim live
              availability. It is a decision-support prototype, scoped honestly.
            </p>
          </section>

          <section>
            <h2>Static first. AI only when it earns its place.</h2>
            <p>
              The decision-support thesis was tested with deterministic scoring before any AI was added.
              That created a comparison baseline — and a regression in pizza-constraint handling was caught
              and fixed with no AI involved. AI was introduced only as an interpretation layer, then measured
              against the static baseline rather than assumed to be better.
            </p>
            <div className="cs-stat-row" aria-label="Verification stats">
              <article>
                <strong>33<span>/33</span></strong>
                <p>Static evals passed</p>
              </article>
              <article>
                <strong>5<span>/5</span></strong>
                <p>AI validation checks</p>
              </article>
              <article>
                <strong>3<span>/3</span></strong>
                <p>Interpretation comparisons</p>
              </article>
            </div>
          </section>

          <section>
            <h2>The architecture boundary: where AI can act, where it cannot</h2>
            <p>
              The boundary is enforced, not just documented. AI never reaches the recommendation. A
              validation gate rejects any model output that tries to set fields it should not — the
              recommendation, the restaurant, or the backups — and falls back to static rules on anything
              invalid, slow, or unsafe.
            </p>
            <div className="cs-boundary" aria-label="Architecture boundary">
              <div className="cs-zone cs-zone-ai">
                <span className="cs-zone-label">AI interpretation layer</span>
                <ol>
                  <li>User craving input</li>
                  <li>Optional AI interpretation — signals only, no dish ranking</li>
                  <li>Schema validation rejects unsafe or malformed output</li>
                </ol>
                <p className="cs-zone-fallback">
                  Fallback: invalid, slow, missing, or unsafe output → static rules
                </p>
              </div>
              <div className="cs-boundary-rule" aria-hidden="true">
                <span>validated signals only →</span>
              </div>
              <div className="cs-zone cs-zone-det">
                <span className="cs-zone-label">Deterministic scoring · final authority</span>
                <ol>
                  <li>Static interpretation baseline</li>
                  <li>Scoring engine owns the final recommendation</li>
                  <li>Weak matches suppressed; honest empty state when nothing fits</li>
                  <li>Browser-local feedback memory informs future scoring</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2>What the evidence actually showed</h2>
            <p>
              AI evidence was collected across multiple runs, not one clean pass. Provider limits and
              fallback paths were part of the evidence, not edited out of it.
            </p>
            <div className="cs-key-finding">
              <p>No accepted AI case changed the deterministic top recommendation.</p>
              <small>Combined across runs. No fabricated outputs. Fallback rows remain fallback rows.</small>
            </div>

            <article className="cs-caseg">
              <div className="cs-caseg-head">
                <span className="cs-caseg-label">AI noise evidence</span>
                <span className="cs-caseg-verdict">Architecture held</span>
              </div>
              <h3>AI accepted nonsense. The architecture still held.</h3>
              <p>
                Input: &quot;asdf random blah.&quot; The model returned high-confidence exploratory intent with{" "}
                <code>needs_clarification: false</code> — confident about nothing. Deterministic scoring
                ignored the noise signal and the top recommendation was unchanged. This is not a failure of
                the architecture; it is why the architecture has a deterministic scoring layer.
              </p>
            </article>

            <div className="cs-evidence-grid">
              {evidenceCards.map((card) => (
                <article className="cs-evidence-card" key={card.label}>
                  <div className="cs-evidence-top">
                    <span className="cs-evidence-label">{card.label}</span>
                    <span className="type-chip">{card.category}</span>
                  </div>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2>How I&apos;d measure this in production</h2>
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

          <section>
            <h2>Why the strongest decision was &quot;no recommendation&quot;</h2>
            <p>
              CraveWise became more trustworthy when it learned not to answer weak-match cases. Most
              recommendation surfaces protect coverage by relaxing constraints until something appears. A
              decision product has a different job: return an answer users can rely on, or say the catalog
              cannot responsibly satisfy the request.
            </p>
            <p>
              That refusal is built as a product path, not an error. Match quality can resolve to strong,
              style-adjacent, partial, or no responsible match. When no responsible match triggers, the
              primary recommendation is suppressed and the UI explains the gap instead of forcing a nearby
              dish into the slot.
            </p>
            <div className="cs-key-finding">
              <p>The refusal works because no layer is allowed to overrule it.</p>
              <small>
                AI interprets craving signals only. Deterministic scoring owns the final call, and static
                evals cover the cases where the right answer is no answer.
              </small>
            </div>
          </section>

          <section>
            <h2>The PM judgment</h2>
            <p>
              Deterministic scoring is not only a safety mechanism. It is a trust and explainability
              mechanism. When a recommendation is wrong, the team can inspect rules, constraints, and score
              breakdowns instead of blaming a black box.
            </p>
            <div className="cs-takeaway-grid">
              {pmTakeaways.map((item) => (
                <article key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="final-lesson" aria-label="The PM lesson">
          <span className="eyebrow">The PM Lesson</span>
          <p>
            The decision was not &quot;add AI.&quot; It was deciding where AI should not have authority — and
            using evidence to prove the boundary held.
          </p>
        </aside>

        <footer className="cs-footer">
          <a className="back-link" href="/">
            ← Back to portfolio
          </a>
          <a
            href="https://github.com/Abhyudaya1996/Cravewise"
            target="_blank"
            rel="noreferrer"
          >
            View the CraveWise repo
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
