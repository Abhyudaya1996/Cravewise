import { ThemeToggle } from "./theme-toggle";

const cravewiseAppUrl = process.env.NEXT_PUBLIC_CRAVEWISE_DEMO_URL?.trim();
const loungeFinderUrl = process.env.NEXT_PUBLIC_LOUNGE_FINDER_DEMO_URL?.trim();

type Cta = {
  label: string;
  href?: string;
  external?: boolean;
  primary?: boolean;
};

const selectedWork = [
  {
    title: "Great.Cards",
    type: "India's smartest card recommendation engine",
    metric: "₹25 L",
    metricLabel: "incremental revenue, zero ad spend",
    problem: "Card picks are usually pushed by sales incentives, not user fit.",
    built: "An engine that reads your spends and returns the best-fit card, with eligibility logic and no affiliate bias.",
    role: "Lead PM. Owned the recommendation logic and execution end to end.",
    ctas: [
      { href: "https://great.cards", label: "Visit great.cards", external: true },
      { href: "/case-studies/great-cards", label: "Read case study" },
    ],
  },
  {
    title: "Agent BankKaro",
    type: "B2B2C field-sales platform",
    metric: "2×",
    metricLabel: "agent conversion (6% to 12%)",
    problem: "Leads, agents, payouts, and bank statuses lived across disconnected workflows.",
    built: "An operating platform for onboarding, lead punching, payments, and lead-quality visibility.",
    role: "Defined the platform model and the lead-quality controls. 500+ agents onboarded.",
    ctas: [{ href: "/case-studies/agent-bankkaro", label: "Read case study" }],
  },
  {
    title: "BankKaro Loans",
    type: "Personal-loan BRE and matching",
    metric: "₹5 Cr",
    metricLabel: "monthly loan disbursal",
    problem: "Loan matching breaks when lender rules and eligibility live scattered across partners.",
    built: "A business rules engine (BRE) built during partner onboarding that routes each user to the right offer.",
    role: "Designed the BRE and the matching logic. Drove roughly ₹5 Cr in monthly loan disbursal.",
    ctas: [
      { href: "https://loans.bankkaro.com/login", label: "See it live (login)", external: true },
      { href: "/case-studies/bankkaro-loans", label: "Read case study" },
    ],
  },
  {
    title: "Axis & SBI API integrations",
    type: "Bank partner APIs",
    metric: "27%",
    metricLabel: "conversion, up from 10%",
    problem: "Redirection-based bank journeys converted at roughly 10%, and teams could not see where applicants dropped.",
    built: "Integrated the Axis and SBI APIs, then added drop-off nudges before and after application, with error flagging and partner-status visibility.",
    role: "Specced the integration and the recovery flow. Conversion rose from 10% to 27%.",
    ctas: [
      { href: "https://axis.bankkaro.com", label: "View Axis integration", external: true },
      { href: "https://sbi.bankkaro.com", label: "View SBI integration", external: true },
      { href: "/case-studies/bank-api-integrations", label: "Read case study" },
    ],
  },
] satisfies Array<{
  title: string;
  type: string;
  metric: string;
  metricLabel: string;
  problem: string;
  built: string;
  role: string;
  ctas: Cta[];
}>;

const buildItems = [
  {
    logo: "CW",
    title: "CraveWise",
    type: "Built with AI",
    tag: true,
    points: [
      "AI interprets the craving signal: mood, budget, taste, and past regrets.",
      "Deterministic scoring owns the recommendation, including when not to recommend.",
      "33 of 33 evals pass before anything ships.",
    ],
    note: "AI proposes, deterministic logic can refuse when the inputs do not support a confident pick.",
    ctas: [
      ...(cravewiseAppUrl ? [{ href: cravewiseAppUrl, label: "Open demo", external: true, primary: true }] : []),
      { href: "/case-studies/cravewise", label: "Read the case study" },
    ],
  },
  {
    logo: "LH",
    title: "Lounge Hopper",
    type: "Airport lounge finder",
    points: [
      "Tells you which of your cards gets you into a specific airport lounge, before you reach the desk.",
      "Ends the awkward queue ritual of tapping card after card hoping one works.",
      "Search by airport and card; covers domestic and international access rules.",
    ],
    note: "A small utility, shipped and usable. Built to kill one specific travel annoyance.",
    ctas: [
      ...(loungeFinderUrl ? [{ href: loungeFinderUrl, label: "Open demo", external: true, primary: true }] : []),
      { href: "https://github.com/Abhyudaya1996/lounge-hopper-india", label: "View on GitHub", external: true },
    ],
  },
  {
    logo: "MG",
    title: "Mobikwik x Great.Cards",
    type: "Partner pitch concept",
    points: [
      "Embeds Great.Cards inside MobiKwik: each user sees the best-fit card for their real spends, in-app.",
      "Marketing: a personalized ‘which card should I get’ moment at the point of intent, no extra acquisition spend.",
      "Revenue: every approved application is an affiliate payout MobiKwik shares in, with zero credit or inventory risk.",
    ],
    note: "A partner-facing concept and live demo of how the recommendation flow would sit inside MobiKwik.",
    ctas: [{ href: "https://mobikwik-gc.vercel.app/", label: "Open demo", external: true, primary: true }],
  },
] satisfies Array<{
  logo: string;
  title: string;
  type: string;
  tag?: boolean;
  points?: string[];
  note?: string;
  ctas: Cta[];
}>;

const careerRoles = [
  {
    title: "Assistant Manager, Product Management",
    company: "CashKaro / BankKaro",
    period: "Aug 2022 to Present",
    award: "2× BankKaro Superstar Award (2022, 2025)",
    highlights: [
      "Lead and mentor a team of 4 Associate Product Managers (APMs) and 2 interns.",
      "Own product execution across Great.Cards, Agent BankKaro, BankKaro Loans, and the Axis and SBI bank-API journeys.",
      "Translate bank-partner constraints into data contracts, rules, and QA that hold when integrations fail, working across tech, risk, engineering, ops, and compliance.",
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

const experienceFocus = [
  "recommendation and eligibility systems",
  "lending rules engines (BRE)",
  "bank API and recovery flows",
  "team leadership",
];

const contactLinks = [
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/abhyudayasinghpm/",
  },
  {
    label: "GitHub",
    icon: "github",
    href: "https://github.com/Abhyudaya1996",
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
            className={cta.primary ? "cta-primary" : undefined}
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

function Monogram({ label }: { label: string }) {
  return (
    <span className="monogram" aria-hidden="true">
      {label}
    </span>
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
          <a href="#operate">How I operate</a>
          <a href="#teardowns">Teardown</a>
          <a href="#contact">Contact</a>
        </nav>
        <ThemeToggle />
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow hero-rise">Fintech PM, 3+ years at CashKaro / BankKaro</span>
          <h1 className="hero-rise hero-rise-1">I turn messy fintech rules into systems teams can run.</h1>
          <p className="hero-rise hero-rise-2">
            Recommendation engines, loan eligibility, and bank API integrations, shipped to production. Now I build with AI, holding the same bar.
          </p>
          <div className="hero-actions hero-rise hero-rise-3">
            <a className="primary-link" href="#work">
              See the work
            </a>
            <a className="secondary-link" href="#contact">
              Get in touch
            </a>
          </div>
          <div className="hero-social hero-rise hero-rise-4" aria-label="Profiles and contact">
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
        </div>
        <aside className="hero-panel hero-rise hero-rise-2" aria-label="About Abhyudaya Singh">
          <div className="hero-photo-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-photo"
              src="/abhyudaya.jpg"
              width={120}
              height={120}
              alt="Abhyudaya Singh"
            />
            <div className="hero-photo-meta">
              <strong>Abhyudaya Singh</strong>
              <span>Fintech PM, builds with AI</span>
            </div>
          </div>
          <ul className="panel-modes">
            <li className="panel-mode">
              <strong>Recommendation logic</strong>
              <span>I take your spends and tell you the best credit card.</span>
            </li>
            <li className="panel-mode">
              <strong>Partner API systems</strong>
              <span>Integrate bank APIs and win back the drop-offs in bank journeys.</span>
            </li>
            <li className="panel-mode">
              <strong>Lending logic</strong>
              <span>Build rules engines (BRE) that route users to the right loan offer.</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="content-section selected-work-section" id="work">
        <div className="section-heading centered reveal">
          <h2>Systems I&apos;ve shipped in fintech.</h2>
        </div>
        <div className="work-stack">
          {selectedWork.map((work) => (
            <article className="work-card linked-card reveal" key={work.title}>
              <div className="work-metric">
                <span className="work-metric-value">{work.metric}</span>
                <span className="work-metric-label">{work.metricLabel}</span>
              </div>
              <div className="work-head">
                <h3>{work.title}</h3>
                <span className="work-type">{work.type}</span>
              </div>
              <dl className="proof-lines">
                <div>
                  <dt>Problem</dt>
                  <dd>{work.problem}</dd>
                </div>
                <div>
                  <dt>Built</dt>
                  <dd>{work.built}</dd>
                </div>
                <div>
                  <dt>My role</dt>
                  <dd>{work.role}</dd>
                </div>
              </dl>
              <CtaGroup ctas={work.ctas} />
            </article>
          ))}
        </div>
      </section>

      <section className="content-section build-section" id="build">
        <div className="section-heading centered reveal">
          <h2>Prototypes and tools I build.</h2>
        </div>
        <div className="build-carousel" aria-label="Things I build (scroll horizontally for more)">
          {buildItems.map((item) => (
            <article className="build-card linked-card" key={item.title}>
              <div className="build-card-head">
                <Monogram label={item.logo} />
                <div className="build-card-title">
                  <h3>{item.title}</h3>
                  <span className="work-type">{item.type}</span>
                </div>
                {item.tag ? <span className="ai-tag">Built with AI</span> : null}
              </div>
              <ul className="ai-points">
                {item.points?.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {item.note ? <p className="ai-note">{item.note}</p> : null}
              <CtaGroup ctas={item.ctas} />
            </article>
          ))}
        </div>
      </section>

      <section className="content-section operate-section" id="operate">
        <div className="section-heading reveal">
          <h2>I start where the mess is and build outward until it holds.</h2>
          <p>
            I work closest to the messy middle of fintech execution: data contracts, rules, QA, partner failures, and the edge cases that decide whether a system holds.
          </p>
          <ul className="experience-focus">
            {experienceFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="career-timeline">
          {careerRoles.map((role) => (
            <article className="career-role reveal" key={role.title + role.company}>
              <div className="role-header">
                <div>
                  <strong className="role-title">{role.title}</strong>
                  <span className="role-company">{role.company}</span>
                </div>
                <span className="role-period">{role.period}</span>
              </div>
              {role.award ? <span className="role-award">{role.award}</span> : null}
              <ul className="role-highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section teardowns-section" id="teardowns">
        <div className="section-heading centered reveal">
          <h2>How I reason about product decisions.</h2>
        </div>
        <article className="reasoning-card reveal">
          <span className="reasoning-kicker">Ride-hailing teardown</span>
          <h3>Reusable OTP vs Fresh Ride PIN</h3>
          <p>
            Rapido reuses a ride OTP; Uber issues a fresh PIN per trip. A ride OTP verifies pickup handoff, not account access, so reusable can be the smarter default when surrounding controls and incident data support it.
          </p>
          <a className="ghost-link" href="/teardowns/ride-otp">
            Read the teardown
          </a>
        </article>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-card-band reveal">
          <div className="contact-copy">
            <h2>If this maps to a role you&apos;re hiring for, let&apos;s talk.</h2>
            <p>
              Best fit: product roles where fintech systems, AI product judgment, and implementation-close execution matter. I reply to every genuine message.
            </p>
            <div className="contact-actions">
              <a className="primary-link" href="mailto:singh.abhyudaya1996@gmail.com">
                Get in touch
              </a>
              <a
                className="ghost-link"
                href="/resume/abhyudaya-singh-product-resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download resume PDF
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                >
                  <Icon name={link.icon} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
          <aside className="contact-aside" aria-label="What I bring">
            <span className="panel-kicker">What I bring</span>
            <ul className="contact-brings">
              <li>
                <strong>Deep fintech expertise</strong>
                <span>Hands-on across credit cards, lending, BRE logic, rewards ecosystems, cashback platforms, and bank API integrations. I understand the operational nuances, partner dependencies, and failure points that determine whether fintech products scale.</span>
              </li>
              <li>
                <strong>Implementation-close product management</strong>
                <span>I operate at the intersection of product, data, and engineering, owning data contracts, API integrations, QA, edge cases, and production incident resolution. I build systems that work reliably beyond the happy path.</span>
              </li>
              <li>
                <strong>AI-enabled product thinking</strong>
                <span>I use AI to accelerate product discovery, analysis, and execution, while maintaining deterministic controls and clear evaluation frameworks for critical decision-making workflows.</span>
              </li>
              <li>
                <strong>Leadership and cross-functional execution</strong>
                <span>Lead and mentor a team of 4 Associate Product Managers (APMs) and 2 interns, while driving delivery across banking partners, risk, engineering, operations, and compliance stakeholders.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
