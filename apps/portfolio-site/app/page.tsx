import { ThemeToggle } from "./theme-toggle";

const cravewiseAppUrl = process.env.NEXT_PUBLIC_CRAVEWISE_DEMO_URL?.trim();
const loungeFinderUrl = process.env.NEXT_PUBLIC_LOUNGE_FINDER_DEMO_URL?.trim();

type Cta = {
  label: string;
  href?: string;
  external?: boolean;
};

const heroAnchors = [
  {
    heading: "Production fintech systems",
    line: "Great.Cards card recommendations, loan eligibility engines, and bank API integrations.",
  },
  {
    heading: "In the details",
    line: "API contracts, status tracking, partner constraints, QA, and staging edge cases.",
  },
];

const selectedWork = [
  {
    title: "Great.Cards",
    type: "Recommendation engine",
    summary:
      "A bank RM or mall sales rep sells you a card without knowing how you spend, so you often get the wrong one.",
    points: [
      "Built a spend-based engine that recommends the best-fit card in real rupee value, with no affiliate bias.",
      "Added an eligibility layer built on direct bank data before showing a card as a fit.",
    ],
    outcome:
      "India's first spend-based card recommendation engine. 25% lift in applications, measurable incremental revenue, zero marketing spend.",
    ctas: [{ href: "https://great.cards", label: "Visit great.cards", external: true }],
  },
  {
    title: "Agent BankKaro",
    type: "B2B2C platform",
    summary:
      "Turned a chaotic, no-visibility field-sales operation into a platform for onboarding, lead punching, payments, and lead-quality scoring.",
    points: [
      "Converted bank-status jargon into plain-English reporting agents could act on.",
      "The system surfaced a low-quality lead pattern traced to an incentive gap.",
    ],
    outcome: "Lifted lead conversion from 6% to 12% across the field-sales network.",
    ctas: [{ href: "/case-studies/agent-bankkaro", label: "Read the case study" }],
  },
  {
    title: "BankKaro Loans",
    type: "Eligibility engine",
    summary:
      "A two-tier rules engine that models how the lender universe prices and qualifies, then recommends the best-fit loan.",
    points: [
      "Two tiers: a fast eligibility gate, then deeper pricing and limit logic per lender type.",
      "Eligibility stays estimated from declared and available profile signals. Real CIBIL and Account Aggregator data are not pulled.",
    ],
    outcome: "Cut incorrect product mappings by 70%.",
    ctas: [
      { href: "https://loans.bankkaro.com/login", label: "See the live product (login)", external: true },
    ],
  },
  {
    title: "Bank API integrations",
    type: "Partner APIs",
    summary:
      "Worked across partner bank journeys where API failures, logging gaps, and retry flows directly affected lead conversion.",
    points: [
      "Owned application flows, status tracking, and failure handling with bank tech and risk teams.",
      "A bank-side 504 spike was caught early and affected leads were re-ingested through retry flows with zero lead loss.",
    ],
    outcome: "Made opaque partner flows observable, recoverable, and safer for operations teams.",
    ctas: [
      { href: "https://sbi.bankkaro.com", label: "View integration", external: true },
      { href: "https://axis.bankkaro.com", label: "View integration", external: true },
    ],
  },
] satisfies Array<{
  title: string;
  type: string;
  summary: string;
  points: string[];
  outcome: string;
  ctas: Cta[];
}>;

const artifacts = [
  {
    title: "CraveWise",
    type: "AI decision product",
    description:
      "An AI food decision assistant where AI interprets craving signals, deterministic scoring owns the recommendation, and the product refuses weak matches.",
    why: "A bounded-AI proof point: clear logic, visible constraints, evals, and honest fallback behavior.",
    ctas: [
      cravewiseAppUrl
        ? { href: cravewiseAppUrl, label: "Open demo", external: true }
        : { label: "Demo coming soon" },
      { href: "/case-studies/cravewise", label: "Read the case study" },
      { href: "https://github.com/Abhyudaya1996/Cravewise", label: "View on GitHub", external: true },
    ],
  },
  {
    title: "Airport Lounge Finder",
    type: "Utility build",
    description: "Maps lounge eligibility across 200+ airports by credit-card type.",
    why: "Built solo to validate demand fast, with no eng or design dependency.",
    ctas: [
      loungeFinderUrl
        ? { href: loungeFinderUrl, label: "Open demo", external: true }
        : { label: "Demo coming soon" },
      { href: "https://github.com/Abhyudaya1996/lounge-hopper-india", label: "View on GitHub", external: true },
    ],
  },
  {
    title: "Mobikwik x Great.Cards demo",
    type: "Integration demo",
    description:
      "A working partner-style Great.Cards integration that shows the spend-based recommendation flow in action.",
    why: "A demo surface for the recommendation engine, separate from the live product.",
    ctas: [{ href: "https://mobikwik-gc.vercel.app/", label: "View demo", external: true }],
  },
] satisfies Array<{
  title: string;
  type: string;
  description: string;
  why: string;
  ctas: Cta[];
}>;

const pmTeardowns = [
  {
    category: "Ride-hailing verification",
    status: "Drafted",
    title: "Reusable OTP vs Fresh Ride PIN",
    thesis:
      "A ride OTP verifies pickup handoff, not account access. Reusable OTP can be a smart default if surrounding controls and incident data support it.",
    note: "PM teardown, not a shipped product",
    href: "/teardowns/ride-otp",
  },
];

const careerRoles = [
  {
    title: "Assistant Manager, Product Management",
    company: "CashKaro / BankKaro",
    period: "Aug 2022 to Present",
    highlights: [
      "Came up through the operational side of BankKaro: customer support, data, and reporting for the field-sales team. I build for ops and edge cases, not just the happy path.",
      "Grew that ground-level view into product ownership across Great.Cards, Agent BankKaro, BankKaro Loans, and partner bank-API journeys: discovery, PRDs, launch metrics, QA, and iteration.",
      "Work directly with bank tech, risk, engineering, ops, and compliance on data contracts, eligibility rules, failure handling, and fraud/dispute workflows.",
      "2× BankKaro Superstar Award (2022, 2025) for measurable outcomes and cross-functional impact.",
    ],
  },
  {
    title: "Analyst",
    company: "Better Mortgage",
    period: "Oct 2021 to Mar 2022",
    highlights: [
      "Ran U.S. mortgage verification workflows under Fannie Mae guidelines: regulated, detail-heavy operations.",
      "Wrote SOPs and validation checklists that cut turnaround by 30% while holding compliance.",
    ],
  },
];

const contactLinks = [
  {
    label: "GitHub",
    icon: "github",
    href: "https://github.com/Abhyudaya1996",
    note: "Public GitHub profile",
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/abhyudayasinghpm/",
    note: "LinkedIn profile",
  },
  {
    label: "Email",
    icon: "email",
    href: "mailto:singh.abhyudaya1996@gmail.com",
    note: "singh.abhyudaya1996@gmail.com",
  },
  {
    label: "Resume",
    icon: "resume",
    href: "/resume/abhyudaya-singh-product-resume.pdf",
    note: "Product resume PDF",
  },
];

function Icon({ name }: { name: string }) {
  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
      </svg>
    );
  }

  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5M9.5 13h5M9.5 17h4" />
    </svg>
  );
}

function CtaGroup({ ctas }: { ctas: Cta[] }) {
  return (
    <div className="project-actions">
      {ctas.map((cta, index) => {
        const ctaKey = `${cta.label}-${cta.href ?? "disabled"}-${index}`;

        return cta.href ? (
          <a
            key={ctaKey}
            href={cta.href}
            target={cta.external ? "_blank" : undefined}
            rel={cta.external ? "noreferrer" : undefined}
          >
            {cta.label}
            {cta.external ? <span className="sr-only"> (opens in new tab)</span> : null}
          </a>
        ) : (
          <span className="request-link" key={ctaKey}>
            {cta.label}
          </span>
        );
      })}
    </div>
  );
}

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
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow">Fintech Product Manager, builds with AI</span>
          <h1>I build the decision systems behind credit cards, loans, and bank APIs.</h1>
          <p>
            3+ years shipping fintech systems: recommendation engines, eligibility logic, bank APIs.
            Now building AI products with the same discipline.
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
          </div>
          <div className="hero-social" aria-label="Profiles and contact">
            <a href="https://www.linkedin.com/in/abhyudayasinghpm/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)">
              <Icon name="linkedin" />
            </a>
            <a href="https://github.com/Abhyudaya1996" target="_blank" rel="noreferrer" aria-label="GitHub (opens in new tab)">
              <Icon name="github" />
            </a>
            <a href="mailto:singh.abhyudaya1996@gmail.com" aria-label="Email Abhyudaya">
              <Icon name="email" />
            </a>
          </div>
          <span className="availability-note">Great.Cards is live in the CashKaro app.</span>
        </div>
        <aside className="hero-panel" aria-label="Where I am most useful">
          <span className="panel-kicker">Where I become useful</span>
          <ul className="panel-modes">
            <li className="panel-mode">
              <strong>Recommendation and eligibility logic</strong>
              <span>Turning messy inputs into one trusted, explainable decision.</span>
            </li>
            <li className="panel-mode">
              <strong>API and integration systems</strong>
              <span>Bank integrations, data contracts, status tracking, failure handling.</span>
            </li>
            <li className="panel-mode">
              <strong>Operations and incentives</strong>
              <span>Field tooling, funnels, lead quality, and the incentives behind behavior.</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="content-section selected-work-section" id="work">
        <div className="section-heading">
          <h2>Systems I shipped in the messy reality of fintech.</h2>
        </div>
        <div className="work-stack">
          {selectedWork.map((work) => (
            <article
              className={`project-card compact-work-card ${work.ctas.some((cta) => "href" in cta && cta.href) ? "linked-card" : ""}`}
              key={work.title}
            >
              <span className="type-chip">{work.type}</span>
              <h3>{work.title}</h3>
              <p className="card-summary">{work.summary}</p>
              <ul className="compact-points">
                {work.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="outcome-line">{work.outcome}</p>
              <CtaGroup ctas={work.ctas} />
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="build">
        <div className="section-heading">
          <h2>Prototypes and tools people can inspect.</h2>
        </div>
        <div className="card-grid three-card-grid">
          {artifacts.map((artifact) => (
            <article className={`lab-card linked-card`} key={artifact.title}>
              <span className="type-chip">{artifact.type}</span>
              <h3>{artifact.title}</h3>
              <p>{artifact.description}</p>
              <p className="why-this">
                <strong>Why this exists</strong>
                {artifact.why}
              </p>
              <CtaGroup ctas={artifact.ctas} />
            </article>
          ))}
        </div>
      </section>

      <section className="content-section teardowns-section" id="teardowns">
        <div className="section-heading">
          <span className="eyebrow">PM teardowns</span>
          <h2>Structured reasoning on real product decisions.</h2>
        </div>
        <div className="card-grid">
          {pmTeardowns.map((td) => (
            <article className="teardown-card linked-card" key={td.title}>
              <span className="type-chip">{td.category}</span>
              <h3>{td.title}</h3>
              <p>{td.thesis}</p>
              <span className="teardown-note">{td.note}</span>
              <a className="primary-link" href={td.href}>
                Read the teardown
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section experience-section" id="experience">
        <div className="section-heading">
          <span className="eyebrow">Experience</span>
          <h2>I start where the mess is and build outward until it holds.</h2>
          <p>
            I joined to operationally support BankKaro&apos;s field-sales team: customer support, data, and
            reporting, the unglamorous middle of a new card-selling business. The deeper in I got, the
            clearer the real problem became. Agents couldn&apos;t see their own funnel, so I rebuilt the
            reporting, then the platform around it. That is how I work. I start where the operational pain is,
            learn the system from the inside, and keep building until the thing holds in production.
          </p>
          <p>
            Since then I&apos;ve owned the decision systems behind cards, loans, and bank-API journeys: a
            spend-based card engine, a two-tier loan eligibility engine, and integrations where one quiet
            bank-side failure can kill conversions. What I&apos;m good at is the messy middle: modeling the real
            rules instead of guessing them, making opaque partner systems observable, reading the incentives
            behind behavior, and staying close to the API contract, the staging bug, and the edge case behind
            every user-facing decision. Now I bring that same discipline to AI products.
          </p>
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
          <h2>Fintech operator who ships production systems and now builds with AI.</h2>
          <p>
            I am Abhyudaya Singh, a Product Manager with 3+ years in fintech. This portfolio is the public
            proof of how I think: shipped systems, bounded AI prototypes, PM teardown work, and clear
            operating constraints.
          </p>
        </div>
        <div className="about-grid">
          <div className="resume-block">
            <dl className="resume-summary">
              <div className="resume-row">
                <dt>What I work on</dt>
                <dd>Recommendation engines, eligibility logic, partner APIs, B2B2C platforms, bounded-AI products.</dd>
              </div>
              <div className="resume-row">
                <dt>Background</dt>
                <dd>3+ years fintech PM. Rapid prototyper. In the details, not above them.</dd>
              </div>
            </dl>
          </div>
          <div className="contact-side">
            <div className="contact-card">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.note}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon name={link.icon} />
                  <span>{link.label}</span>
                  <small>{link.note}</small>
                  {link.href.startsWith("http") ? <span className="sr-only"> (opens in new tab)</span> : null}
                </a>
              ))}
            </div>
            <a href="/resume/abhyudaya-singh-product-resume.pdf" target="_blank" rel="noreferrer" className="primary-link contact-resume-cta">
              Download resume PDF
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
