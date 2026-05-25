const proofChips = [
  "Working prototype",
  "Evaluation-backed",
  "Bounded AI",
  "Honest fallback states",
  "Shipped case study",
];

const craveWiseProof = [
  "Shipped case study",
  "33 scoring rules",
  "5 AI output safety gates",
  "Weak matches suppressed",
  "AI signals · logic decides",
  "No fake availability claims",
];

const productLabCards = [
  {
    title: "CraveWise",
    status: "Shipped",
    type: "AI decision product",
    description:
      "Reduces food-ordering indecision by turning craving input, constraints, and local memory into one honest recommendation.",
  },
  {
    title: "Agent Workflow Prototype",
    status: "Planned",
    type: "AI workflow system",
    description:
      "Turns messy PM inputs — Slack threads, meeting notes, stakeholder asks — into structured PRD drafts, open questions, and execution checklists.",
  },
];

const operatingPrinciples = [
  "AI should earn authority, not assume it.",
  "Deterministic systems are often the trust layer.",
  "Evals are product artifacts, not just engineering tests.",
  "Prototype scope should be honest about what is real and what is mocked.",
  "Strong PM work includes deciding what not to build.",
];

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Abhyudaya1996",
    note: "Public GitHub profile",
  },
  {
    label: "LinkedIn",
    note: "LinkedIn coming soon",
  },
  {
    label: "Email",
    href: "mailto:abhyudaya.work96@gmail.com",
    note: "abhyudaya.work96@gmail.com",
  },
  {
    label: "Resume",
    note: "Resume coming soon",
  },
];

export default function PortfolioHomePage() {
  return (
    <main className="portfolio-page">
      <header className="site-header" aria-label="Portfolio navigation">
        <a className="brand-mark" href="#top" aria-label="Abhyudaya Singh portfolio home">
          AS
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#product-lab">Product lab</a>
          <a href="#writing">Build notes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow">Fintech PM · AI-native product work</span>
          <h1>I build AI products that know when not to answer.</h1>
          <p>
            Fintech PM moving into AI-native product work. I ship small, working prototypes - with the
            evals, fallback states, and architecture decisions a hiring manager can inspect in one
            sitting.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="https://github.com/Abhyudaya1996/Cravewise" target="_blank" rel="noreferrer">
              View CraveWise on GitHub
            </a>
            <span className="availability-note">Prototype and case study in repo · live deployment coming</span>
            <a className="secondary-link" href="#contact">Contact</a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Portfolio thesis proof">
          <span className="panel-kicker">How I work</span>
          <strong>Constrain AI. Evaluate it. Decide with evidence.</strong>
          <p>
            Each project defines what AI is allowed to do, runs structured evals, and documents where
            deterministic logic takes over from the model.
          </p>
        </aside>
      </section>

      <section className="featured-project" id="work">
        <div className="section-heading">
          <span className="eyebrow">Featured shipped project</span>
          <h2>CraveWise — AI Food Decision Assistant</h2>
        </div>
        <div className="featured-grid">
          <article className="project-card project-card-primary">
            <div className="status-row">
              <span className="status-chip shipped">Shipped</span>
              <span className="type-chip">AI decision product</span>
            </div>
            <p>
              CraveWise uses AI only to interpret craving signals. Product logic owns the final
              recommendation. When the catalog cannot responsibly satisfy the request, the product says
              so instead of inventing confidence.
            </p>
            <div className="proof-grid" aria-label="CraveWise proof points">
              {craveWiseProof.map((proof) => (
                <span key={proof}>{proof}</span>
              ))}
            </div>
            <div className="project-actions">
              <a href="https://github.com/Abhyudaya1996/Cravewise" target="_blank" rel="noreferrer">
                View GitHub repo
              </a>
              <span className="disabled-action" aria-disabled="true">Case study deployment coming soon</span>
              <span className="disabled-action" aria-disabled="true">Prototype deployment coming soon</span>
            </div>
          </article>
          <aside className="decision-card" aria-label="CraveWise architecture summary">
            <span>Bounded AI architecture</span>
            <ol>
              <li>AI interprets craving signals.</li>
              <li>Validation rejects unsafe or low-quality output.</li>
              <li>Product logic owns the final recommendation.</li>
              <li>Weak matches are suppressed instead of forced.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="proof-strip" aria-label="Portfolio proof strip">
        {proofChips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </section>

      <section className="content-section" id="product-lab">
        <div className="section-heading">
          <span className="eyebrow">Product lab</span>
          <h2>Products, not slideware.</h2>
          <p>The portfolio prioritizes usable prototypes and evidence trails over abstract AI claims.</p>
        </div>
        <div className="card-grid two-card-grid">
          {productLabCards.map((card) => (
            <article className="lab-card" key={card.title}>
              <div className="status-row">
                <span className={`status-chip ${card.status === "Shipped" ? "shipped" : "planned"}`}>
                  {card.status}
                </span>
                <span className="type-chip">{card.type}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section principles-section">
        <div className="section-heading">
          <span className="eyebrow">Operating principles</span>
          <h2>How I approach AI product work.</h2>
        </div>
        <div className="principles-list">
          {operatingPrinciples.map((principle, index) => (
            <article key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section build-notes-section" id="writing">
        <div className="section-heading">
          <span className="eyebrow">Build notes</span>
          <h2>What I&apos;m writing next.</h2>
        </div>
        <article className="writing-card compact-writing-card">
          <span className="status-chip planned">Coming next</span>
          <h3>Why the strongest AI product decision in CraveWise was &quot;no recommendation&quot;.</h3>
          <p>Planned, not published yet.</p>
        </article>
      </section>

      <section className="about-section" id="contact">
        <div>
          <span className="eyebrow">About / resume / contact</span>
          <h2>Fintech PM moving deeper into AI-native product management.</h2>
          <p>
            I&apos;m Abhyudaya Singh, a fintech Product Manager moving deeper into AI-native product work.
            I&apos;m strongest where product logic, backend systems, user trust, and execution meet.
          </p>
        </div>
        <div className="about-grid">
          <ul>
            <li>Fintech PM experience across credit cards, loans, cashback, APIs, and admin systems.</li>
            <li>Close to implementation: PRDs, API contracts, staging edge cases, and partner constraints.</li>
            <li>Publicly building AI PM proof-of-work: working prototypes with evals, schemas, and visible failure modes.</li>
          </ul>
          <div className="contact-card">
            {contactLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.note}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  <small>{link.note}</small>
                </a>
              ) : (
                <span className="contact-disabled" key={link.label} aria-disabled="true">
                  <span>{link.label}</span>
                  <small>{link.note}</small>
                </span>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
