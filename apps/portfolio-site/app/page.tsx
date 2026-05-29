const proofChips = [
  "Working prototype shipped",
  "Eval-backed product logic",
  "AI role is constrained",
  "Weak matches are refused",
  "Case study in repo",
];

const heroAnchors = [
  {
    heading: "3+ years fintech PM",
    line: "Credit cards, loans, bank APIs, and B2B2C platforms at CashKaro / BankKaro.",
  },
  {
    heading: "Built India's first spend-based card recommendation engine",
    line: "Great.Cards — 25% application lift, ₹2L incremental monthly revenue, zero marketing spend.",
  },
  {
    heading: "Close to implementation",
    line: "API contracts, eligibility logic, bank integrations, PRDs, and staging edge cases.",
  },
];

const pmTeardowns = [
  {
    category: "Ride-hailing · Verification design",
    status: "Drafted",
    title: "Reusable OTP vs Fresh Ride PIN",
    thesis:
      "A ride OTP verifies pickup handoff, not account access. Reusable OTP can be a smart default if surrounding controls and incident data support it.",
    note: "PM teardown, not a shipped product",
  },
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
      "Turns messy PM inputs — Slack threads, meeting notes, and stakeholder asks — into structured PRD drafts, open questions, and execution checklists.",
  },
];

const operatingPrinciples = [
  "AI should earn authority, not assume it.",
  "Deterministic systems are often the trust layer.",
  "Evals are product artifacts, not just engineering tests.",
  "Prototype scope should be honest about what is real and what is mocked.",
  "Strong PM work includes deciding what not to build.",
];

const careerRoles = [
  {
    title: "Assistant Manager – Product Management",
    company: "CashKaro / BankKaro",
    period: "Aug 2022 – Present",
    highlights: [
      "Great.Cards: Built India's first spend-based credit card recommendation engine. 25% application lift, ₹2L incremental monthly revenue, zero marketing spend.",
      "Agent BankKaro: B2B2C platform for offline sales leads. 2,000+ agents onboarded. Lead conversion 6% → 12%.",
      "BankKaro Loans: Rules-based eligibility engine. Reduced incorrect product mappings by 70%.",
      "SBI and Axis API integrations: owned application flows, status tracking, and failure handling end-to-end.",
    ],
  },
  {
    title: "Analyst",
    company: "Better Mortgage",
    period: "Oct 2021 – Mar 2022",
    highlights: [
      "Supported U.S. mortgage verification workflows aligned with Fannie Mae guidelines.",
      "Created SOPs and validation checklists. Improved turnaround by 30%.",
    ],
  },
];

const sideProjects = [
  {
    title: "Airport Lounge Finder",
    year: "2023",
    description:
      "MVP built independently with Cursor and Python. Maps lounge eligibility across 200+ airports by credit card type. Reduced lounge-related support queries by 35%.",
  },
  {
    title: "Cross-Bank MIS Automation",
    year: "2023",
    description:
      "Automated multi-bank reporting using Power Query. Cut manual effort by 40%.",
  },
];

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Abhyudaya1996",
    note: "Public GitHub profile",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhyudayasinghpm/",
    note: "LinkedIn profile",
  },
  {
    label: "Email",
    href: "mailto:singh.abhyudaya1996@gmail.com",
    note: "singh.abhyudaya1996@gmail.com",
  },
  {
    label: "Resume",
    href: "/resume/abhyudaya-singh-product-resume.pdf",
    note: "Product resume PDF",
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
          <a href="#teardowns">Teardowns</a>
          <a href="#product-lab">Lab</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow">Fintech PM, AI-native product work</span>
          <h1>I build AI products that know when not to answer.</h1>
          <p>
            Fintech PM moving into AI-native product work. I ship small, working prototypes with the
            evals, fallback states, and architecture decisions a hiring manager can inspect in one
            sitting.
          </p>
          <div className="hero-anchors">
            {heroAnchors.map((anchor) => (
              <div className="hero-anchor" key={anchor.heading}>
                <strong>{anchor.heading}</strong>
                <span>{anchor.line}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="https://github.com/Abhyudaya1996/Cravewise" target="_blank" rel="noreferrer">
              Inspect CraveWise repo
            </a>
            <a className="secondary-link" href="/resume/abhyudaya-singh-product-resume.pdf">
              Open resume
            </a>
            <a className="secondary-link" href="#contact">Contact</a>
          </div>
          <span className="availability-note">Prototype and case study are in repo. Live deployment is coming.</span>
        </div>
        <aside className="hero-panel" aria-label="Portfolio thesis proof">
          <span className="panel-kicker">Where I become useful</span>
          <ul className="panel-modes">
            <li className="panel-mode">
              <strong>Recommendation logic</strong>
              <span>Turning user signals into one trusted, explainable answer.</span>
            </li>
            <li className="panel-mode">
              <strong>API systems</strong>
              <span>Bank integrations, data contracts, eligibility rules, failure handling.</span>
            </li>
            <li className="panel-mode">
              <strong>Bounded AI</strong>
              <span>Defining what AI is allowed to decide. Deterministic logic owns the rest.</span>
            </li>
            <li className="panel-mode">
              <strong>Public proof-of-work</strong>
              <span>Evals, schemas, and failure modes visible in repo.</span>
            </li>
          </ul>
          <p className="panel-quote">&quot;I am usually more useful in the build than in the theatre around it.&quot;</p>
        </aside>
      </section>

      <section className="featured-project" id="work">
        <div className="section-heading">
          <span className="eyebrow">Shipped proof</span>
          <h2>CraveWise: AI Food Decision Assistant</h2>
        </div>
        <div className="featured-grid">
          <article className="project-card project-card-primary">
            <div className="status-row">
              <span className="status-chip shipped">Shipped</span>
              <span className="type-chip">AI decision product</span>
            </div>

            <dl className="case-study-format">
              <dt>Context</dt>
              <dd>
                Most food recommendation surfaces push options back at the user. The real problem is
                decision fatigue — users want one honest answer, not another grid to browse.
              </dd>

              <dt>Product belief</dt>
              <dd>
                &quot;AI should interpret craving signals, not choose the recommendation. Deterministic
                scoring owns the final decision. When the catalog cannot satisfy the request, the product
                says so.&quot;
              </dd>

              <dt>What changed</dt>
              <dd>
                <ul>
                  <li>Bounded AI architecture: AI extracts signals only; scoring engine applies 33 rules.</li>
                  <li>Recommender Integrity v2: matchQuality states — strong, style match, partial, no match.</li>
                  <li>5 AI output safety gates block unsafe fields before scoring.</li>
                  <li>Weak matches suppressed instead of forced.</li>
                  <li>Honest empty state when catalog cannot satisfy the request.</li>
                </ul>
              </dd>

              <dt>Why it mattered</dt>
              <dd>
                The product can refuse a recommendation. That design decision is the proof point — not the
                AI integration.
              </dd>
            </dl>

            <div className="project-actions">
              <a href="https://github.com/Abhyudaya1996/Cravewise" target="_blank" rel="noreferrer">
                View GitHub repo
              </a>
              <span className="disabled-action" aria-disabled="true">Case study deployment coming soon</span>
              <span className="disabled-action" aria-disabled="true">Prototype deployment coming soon</span>
            </div>
          </article>
          <aside className="decision-card" aria-label="CraveWise architecture summary">
            <span>Architecture boundary</span>
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

      <section className="content-section teardowns-section" id="teardowns">
        <div className="section-heading">
          <span className="eyebrow">PM teardowns</span>
          <h2>Structured reasoning on real product decisions.</h2>
          <p>
            Trade-off analysis on verification design, marketplace incentives, and platform trust. PM
            analysis — not shipped prototypes.
          </p>
        </div>
        <div className="card-grid">
          {pmTeardowns.map((td) => (
            <article className="teardown-card" key={td.title}>
              <div className="status-row">
                <span className="status-chip drafted">{td.status}</span>
                <span className="type-chip">{td.category}</span>
              </div>
              <h3>{td.title}</h3>
              <p>{td.thesis}</p>
              <span className="teardown-note">{td.note}</span>
            </article>
          ))}
        </div>
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
          <h2>Notes from shipped judgment.</h2>
        </div>
        <article className="writing-card compact-writing-card">
          <span className="status-chip planned">Coming next</span>
          <h3>Why the strongest decision in CraveWise was &quot;no recommendation.&quot;</h3>
          <p>
            A build note on honest fallback design, product authority boundaries, and what static evals
            teach a PM.
          </p>
        </article>
      </section>

      <section className="content-section background-section" id="background">
        <div className="section-heading">
          <span className="eyebrow">Background</span>
          <h2>Where the fintech experience comes from.</h2>
        </div>
        <div className="career-timeline">
          {careerRoles.map((role) => (
            <article className="career-role" key={role.title + role.company}>
              <div className="role-header">
                <div>
                  <strong className="role-title">{role.title}</strong>
                  <span className="role-company">{role.company}</span>
                </div>
                <span className="role-period">{role.period}</span>
              </div>
              <ul className="role-highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="side-projects">
          <h3>Side projects</h3>
          <div className="card-grid two-card-grid">
            {sideProjects.map((project) => (
              <article className="lab-card" key={project.title}>
                <div className="status-row">
                  <span className="type-chip">{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="contact">
        <div>
          <span className="eyebrow">About, resume, contact</span>
          <h2>Fintech PM building public proof-of-work for senior PM roles.</h2>
          <p>
            I am Abhyudaya Singh, a fintech Product Manager with 3+ years across credit cards, loans,
            bank APIs, and B2B2C platforms. I am building this portfolio as public proof-of-work —
            working prototypes, PM teardowns, evals, and build notes — to demonstrate AI-native product
            judgment for senior PM roles.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-copy-column">
            <ul>
              <li>Fintech PM experience across credit cards, loans, cashback, APIs, and admin systems.</li>
              <li>Close to implementation: PRDs, API contracts, staging edge cases, and partner constraints.</li>
              <li>Publicly building AI PM proof-of-work: working prototypes with evals, schemas, and visible failure modes.</li>
            </ul>
            <div className="resume-block">
              <dl className="resume-summary">
                <div className="resume-row">
                  <dt>Operating range</dt>
                  <dd>Credit cards, loans, bank APIs, B2B2C platforms, AI-native product experiments.</dd>
                </div>
                <div className="resume-row">
                  <dt>Current focus</dt>
                  <dd>
                    CashKaro / BankKaro — Great.Cards, Agent BankKaro, loans, API integrations, and
                    this AI PM portfolio.
                  </dd>
                </div>
                <div className="resume-row">
                  <dt>Background</dt>
                  <dd>3+ years fintech PM. Rapid prototyper. Close to implementation.</dd>
                </div>
              </dl>
              <div className="resume-actions">
                <a href="/resume/abhyudaya-singh-product-resume.pdf" target="_blank" rel="noreferrer" className="primary-link">
                  Download resume PDF
                </a>
              </div>
            </div>
          </div>
          <div className="contact-card">
            {contactLinks.map((link) => (
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
