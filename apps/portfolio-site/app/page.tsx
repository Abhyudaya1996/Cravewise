// CraveWise prototype deployment URL — fill in after deploying to Vercel.
// Leave empty to keep the prototype off the artifact links.
// The CraveWise case study lives on this portfolio at /case-studies/cravewise.
const cravewiseAppUrl = "";        // e.g. "https://cravewise.vercel.app"

const heroAnchors = [
  {
    heading: "India's first spend-based card recommendation engine",
    line: "Great.Cards — 25% application lift with measurable incremental revenue, zero extra marketing spend.",
  },
  {
    heading: "Production fintech systems",
    line: "Eligibility engines, SBI/Axis API integrations, and a B2B2C lead platform with 2,000+ agents.",
  },
  {
    heading: "Close to implementation",
    line: "API contracts, eligibility logic, status tracking, failure handling, PRDs, and staging edge cases.",
  },
];

const selectedWork = [
  {
    title: "Great.Cards",
    status: "Shipped",
    type: "Recommendation engine",
    context:
      "A bank RM cold-calls — “you have a card offer.” A sales rep pitches another in a crowded mall. Neither knows how you actually spend, so most people end up with the wrong card and rewards they never realize.",
    belief:
      "There's no best card — there's a card that's best for you. Recommend from real spend behavior, with zero bias toward affiliate fees or promotional offers.",
    built: [
      "Spend-based recommendation engine: the user enters spend by category, and the engine ranks cards by real reward value — shown in absolute rupee terms, not abstract points.",
      "An eligibility layer built from direct bank relationships: a pincode master, a company master, and rules like minimum salary and age, applied after the reward fit.",
      "Owned the backend recommendation logic, API contracts, PRDs, and staging edge cases. Shipped as India's first spend-based credit card recommendation engine.",
      "Honest constraint: keeping reward rates, caps, and transfer ratios accurate still needs human verification, even with scrapers and small models.",
    ],
    mattered:
      "A 25% lift in credit-card applications with measurable incremental revenue, without extra marketing spend. Live inside the CashKaro app.",
    link: { href: "https://mobikwik-gc.vercel.app/", label: "View live integration demo" },
  },
  {
    title: "Agent BankKaro",
    status: "Shipped",
    type: "B2B2C lead platform",
    context:
      "A pan-India field-sales team had just started selling cards with almost no transparency — leads weren't uploaded, there was no funnel view, and bank reports came back in jargon agents couldn't read.",
    belief:
      "Agents weren't failing on effort; they were failing on visibility. Give them readable data, a clear funnel, and the right leads, and conversion follows.",
    built: [
      "Started by rebuilding bank reports into plain English in Power Query (pre-AI), which lifted transparency and agent trust.",
      "Grew it into a full platform: agent and sub-agent onboarding, lead punching, reporting, payment verification, commission withdrawal, and an in-tool card-pitch repository.",
      "Added drop-off follow-up and funnel visibility — the two levers that moved conversion.",
      "Built lead-quality scoring from bank status signals (IPA Unresolved → weak lead; KYC Completed → strong lead). It surfaced a low-quality lead pattern traced to an incentive gap — fixed-salary sub-agents had no payout reason to optimize for quality.",
    ],
    mattered: "2,000+ agents onboarded; lead conversion improved from 6% to 12%.",
    link: null,
  },
  {
    title: "BankKaro Loans",
    status: "Shipped",
    type: "Eligibility engine (BRE)",
    context:
      "Users were being matched to loan products they didn't qualify for — driving rejections, ops rework, and lost trust.",
    belief:
      "Same principle as Great.Cards: model the real rules of the entire lender universe and recommend the genuinely best-fit loan, with no bias.",
    built: [
      "A two-tier Business Rules Engine — BRE-1 for fast eligibility, BRE-2 for deeper pricing and limits.",
      "Reverse-engineered how each lender type (NBFC, STPL, PSB, private banks) prices and qualifies, then unified it into income × CIBIL grids that output both sanctioned loan amount and interest rate.",
      "Honest constraint: without access to real CIBIL (cost) or Account Aggregator data (licensing and statutory norms), eligibility is estimated rather than pulled.",
    ],
    mattered:
      "Reduced incorrect product mappings by 70%, cutting ops rework and improving user trust.",
    link: null,
  },
  {
    title: "SBI / Axis Integrations",
    status: "Shipped",
    type: "Bank API integrations",
    context:
      "Credit-card applications ran through bank APIs, and one major bank partner did not expose real API error logs, which made failures hard to see.",
    belief:
      "If the bank can't see its own failures, the integration has to. Monitor proactively and make every failure recoverable.",
    built: [
      "Owned application flows, status tracking, and failure handling end-to-end with bank tech and risk teams.",
      "Built a proactive error-case flagging system to compensate for missing partner-side error logs.",
      "When a bank-side change started throwing 504 Gateway Timeouts across a large share of users, the flagging system caught it before the bank did — and re-ingested the affected leads via the retry API, cutting impact sharply with zero lead loss.",
    ],
    mattered:
      "Turned an opaque, failure-prone integration into one where breaks are caught early and recovered without losing applications.",
    link: null,
  },
];

const artifacts = [
  {
    title: "CraveWise",
    type: "AI decision product · Next.js",
    description:
      "An AI food decision assistant: AI interprets craving signals, deterministic scoring owns the recommendation, and the product refuses when nothing fits.",
    why: "Proof I can apply the same fintech discipline — clear logic, bounded AI, and evals — to an AI product.",
    links: [
      ...(cravewiseAppUrl ? [{ href: cravewiseAppUrl, label: "Try it live", external: true }] : []),
      { href: "/case-studies/cravewise", label: "Read the case study", external: false },
      { href: "https://github.com/Abhyudaya1996/Cravewise", label: "GitHub", external: true },
    ],
  },
  {
    title: "Mobikwik × Great.Cards demo",
    type: "Live demo",
    description: "A working Great.Cards integration with revenue projection.",
    why: "Shows the spend-based recommendation engine running as a partner integration.",
    links: [{ href: "https://mobikwik-gc.vercel.app/", label: "View demo", external: true }],
  },
  {
    title: "Airport Lounge Finder",
    type: "MVP · Python + Cursor",
    description: "Maps lounge eligibility across 200+ airports by credit-card type.",
    why: "Built solo to validate demand without eng or design — cut lounge support queries by 35%.",
    links: [],
  },
  {
    title: "Cross-Bank MIS Automation",
    type: "Automation · Power Query",
    description: "Automated multi-bank reporting across partners.",
    why: "Cut manual reporting effort by 40% and made partner performance visible.",
    links: [],
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
    href: "/teardowns/ride-otp",
  },
];

const operatingPrinciples = [
  "Most product problems are logic, incentive, and trust problems — not model problems.",
  "Model the real rules of the whole universe; recommend the genuinely best fit, no bias.",
  "If the system can't see its own failures, build the layer that can.",
  "Deterministic logic should own the decision; AI assists, kept bounded.",
  "Be honest about limits — estimated vs. pulled data, real vs. mocked.",
  "Strong PM work includes deciding what not to build.",
];

const careerRoles = [
  {
    title: "Assistant Manager – Product Management",
    company: "CashKaro / BankKaro",
    period: "Aug 2022 – Present",
    highlights: [
      "Product across Great.Cards, Agent BankKaro, BankKaro Loans, and SBI/Axis API integrations — recommendation logic, eligibility engines, and bank/partner APIs.",
      "Owned PRDs, API contracts, success metrics, QA, and fraud/dispute workflows across discovery, launch, and iteration.",
      "2× BankKaro Superstar Award (2022, 2025) for measurable outcomes and cross-functional impact.",
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
          <a href="#build">Build</a>
          <a href="#teardowns">Teardowns</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow">Fintech Product Manager · builds with AI</span>
          <h1>I build the decision systems behind credit cards, loans, and bank APIs.</h1>
          <p>
            Fintech PM for 3+ years — recommendation engines, eligibility logic, and bank integrations
            shipped to production. Now I build AI products with the same discipline: clear logic, visible
            constraints, and decisions you can inspect.
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
            <a className="primary-link" href="#work">
              See selected work
            </a>
            <a className="secondary-link" href="/resume/abhyudaya-singh-product-resume.pdf" target="_blank" rel="noreferrer">
              Resume
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
          <div className="hero-social" aria-label="Profiles and contact">
            <a href="https://www.linkedin.com/in/abhyudayasinghpm/" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href="https://github.com/Abhyudaya1996" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
              </svg>
              GitHub
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href="mailto:singh.abhyudaya1996@gmail.com">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              Email
            </a>
          </div>
          <span className="availability-note">
            Great.Cards shipped as a pilot in the CashKaro app. Live integration demo and AI work are linked below.
          </span>
        </div>
        <aside className="hero-panel" aria-label="Where I am most useful">
          <span className="panel-kicker">Where I become useful</span>
          <ul className="panel-modes">
            <li className="panel-mode">
              <strong>Recommendation & eligibility logic</strong>
              <span>Turning messy inputs into one trusted, explainable decision.</span>
            </li>
            <li className="panel-mode">
              <strong>API & integration systems</strong>
              <span>Bank integrations, data contracts, status tracking, failure handling.</span>
            </li>
            <li className="panel-mode">
              <strong>Operations & incentives</strong>
              <span>Field tooling, funnels, lead quality, and the incentives behind behavior.</span>
            </li>
            <li className="panel-mode">
              <strong>AI, kept bounded</strong>
              <span>AI assists; deterministic logic owns the final decision. Evals as proof.</span>
            </li>
          </ul>
          <p className="panel-quote">&quot;Most product problems aren&apos;t AI problems — they&apos;re logic, incentive, and trust problems.&quot;</p>
        </aside>
      </section>

      <section className="content-section selected-work-section" id="work">
        <div className="section-heading">
          <span className="eyebrow">Selected work · production fintech</span>
          <h2>Systems I shipped in the messy reality of fintech.</h2>
          <p>
            Recommendation engines, eligibility logic, bank APIs, and field operations — where UX, data,
            and bank dependencies are inseparable. Each one was about modeling the real rules and handling
            the failure modes, not adding another screen.
          </p>
        </div>
        <div className="work-stack">
          {selectedWork.map((work) => (
            <article className="project-card" key={work.title}>
              <div className="status-row">
                <span className="status-chip shipped">{work.status}</span>
                <span className="type-chip">{work.type}</span>
              </div>
              <h3>{work.title}</h3>
              <dl className="case-study-format">
                <dt>Context</dt>
                <dd>{work.context}</dd>
                <dt>Product belief</dt>
                <dd>{work.belief}</dd>
                <dt>What I built</dt>
                <dd>
                  <ul>
                    {work.built.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
                <dt>Why it mattered</dt>
                <dd>{work.mattered}</dd>
              </dl>
              {work.link ? (
                <div className="project-actions">
                  <a href={work.link.href} target="_blank" rel="noreferrer">
                    {work.link.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="build">
        <div className="section-heading">
          <span className="eyebrow">Things I build</span>
          <h2>Prototypes and tools I build so people can react to the idea.</h2>
          <p>Working artifacts — inspectable, not slideware. Each one exists to test or prove something.</p>
        </div>
        <div className="card-grid two-card-grid">
          {artifacts.map((artifact) => (
            <article className="lab-card" key={artifact.title}>
              <div className="status-row">
                <span className="type-chip">{artifact.type}</span>
              </div>
              <h3>{artifact.title}</h3>
              <p>{artifact.description}</p>
              <p className="why-this">
                <strong>Why this exists</strong>
                {artifact.why}
              </p>
              {artifact.links.length > 0 ? (
                <div className="project-actions">
                  {artifact.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.label}
                      {link.external ? <span className="sr-only"> (opens in new tab)</span> : null}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
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
              <a className="primary-link" href={td.href}>
                Read the teardown →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section principles-section">
        <div className="section-heading">
          <h2>How I approach product work.</h2>
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
          <h2>What the build actually taught me.</h2>
        </div>
        <article className="writing-card compact-writing-card">
          <span className="status-chip drafted">Build note</span>
          <h3>Why the strongest decision in CraveWise was &quot;no recommendation.&quot;</h3>
          <p>
            A build note on honest fallback design, product authority boundaries, and what static evals
            teach a PM.
          </p>
          <a className="primary-link" href="/notes/no-recommendation">
            Read the build note →
          </a>
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
      </section>

      <section className="about-section" id="contact">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Fintech operator who ships production systems — and now builds with AI.</h2>
          <p>
            I am Abhyudaya Singh, a Product Manager with 3+ years in fintech: spend-based card
            recommendations, loan eligibility engines, bank API integrations, and a B2B2C lead platform. I
            work close to implementation — API contracts, eligibility logic, failure handling. I now build
            AI products with the same discipline, and this portfolio is the public proof-of-work.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-copy-column">
            <div className="resume-block">
              <dl className="resume-summary">
                <div className="resume-row">
                  <dt>Operating range</dt>
                  <dd>Recommendation engines, eligibility logic, bank &amp; partner APIs, B2B2C platforms, bounded-AI products.</dd>
                </div>
                <div className="resume-row">
                  <dt>Current focus</dt>
                  <dd>
                    CashKaro / BankKaro — Great.Cards, Agent BankKaro, loans, and SBI/Axis API integrations.
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
                  <span className="sr-only"> (opens in new tab)</span>
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
                {link.href.startsWith("http") ? <span className="sr-only"> (opens in new tab)</span> : null}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
