import type { Metadata } from "next";
import "./agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Agent BankKaro Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on turning a low-visibility field-sales operation into a B2B2C product platform with reporting, payouts, and lead-quality signals.",
};

const platformPieces = [
  "Agent and sub-agent onboarding",
  "Lead punching and status tracking",
  "Plain-English bank reporting",
  "Payment verification and commission withdrawal",
  "Card-pitch repository for field teams",
  "Lead-quality scoring from bank status signals",
];

const lessons = [
  {
    title: "Visibility changed behavior",
    body: "Agents did not need another motivational dashboard. They needed to see where each lead stood, what the bank response meant, and which action came next.",
  },
  {
    title: "Ops language became product language",
    body: "Bank statuses were translated into terms agents and managers could use without interpreting a partner report line by line.",
  },
  {
    title: "Incentives showed up in the data",
    body: "The system surfaced a low-quality lead pattern traced to an incentive gap. That was a product finding, not a blame story.",
  },
];

export default function AgentBankKaroCaseStudyPage() {
  return (
    <main className="abk-page">
      <article className="abk-article">
        <a className="back-link" href="/">
          Back to portfolio
        </a>

        <header className="abk-hero">
          <span className="eyebrow">Case study, Agent BankKaro</span>
          <h1>From field-sales opacity to an operating platform.</h1>
          <p>
            Agent BankKaro started as an operations-support problem: field agents were selling credit cards
            without clear visibility into lead status, bank responses, payouts, or quality signals. The work
            became a B2B2C platform that made the sales motion easier to run.
          </p>
          <div className="abk-metrics" aria-label="Agent BankKaro outcomes">
            <article>
              <strong>2,000+</strong>
              <span>agents onboarded</span>
            </article>
            <article>
              <strong>6% to 12%</strong>
              <span>conversion improvement</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            Agents were not failing on effort. They were failing on visibility. Give them readable data, a
            clear funnel, and a reason to care about quality, and conversion follows.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The starting problem</h2>
            <p>
              The offline card-sales motion had almost no shared operating surface. Leads were punched into
              scattered flows, bank reports came back in jargon, and managers could not easily see where a
              funnel was leaking. The result was avoidable follow-up misses, lower trust, and a weak feedback
              loop between field teams and product teams.
            </p>
          </section>

          <section>
            <h2>What the platform needed to do</h2>
            <p>
              The product had to cover the full working loop, not just lead entry. It needed to help agents
              onboard, punch leads, understand bank statuses, verify payments, withdraw commissions, and
              learn which cards to pitch.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>Jargon became plain-English reporting</h2>
            <p>
              A major unlock was translating bank status reports into language field teams could act on.
              Instead of making agents decode partner terms, the product surfaced readable funnel states and
              drop-off signals. That made follow-up more consistent and gave managers a clearer operating
              view.
            </p>
          </section>

          <section>
            <h2>Lead quality became visible</h2>
            <p>
              Lead-quality scoring used bank status signals such as unresolved in-principle approvals and
              completed KYC to separate weak leads from stronger ones. The system surfaced a low-quality
              lead pattern traced to an incentive gap: fixed-salary sub-agents had no payout reason to
              optimize for quality.
            </p>
            <p className="abk-safety-note">
              Public-safe framing matters here. The product insight is about detection and incentive design,
              not public accusation or internal screenshots.
            </p>
          </section>

          <section>
            <h2>What changed</h2>
            <div className="abk-lesson-grid">
              {lessons.map((lesson) => (
                <article key={lesson.title}>
                  <strong>{lesson.title}</strong>
                  <p>{lesson.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="final-lesson" aria-label="The PM lesson">
          <span className="eyebrow">The PM Lesson</span>
          <p>
            The platform worked because it treated field sales as a system: visibility, workflow, incentives,
            and bank feedback all had to move together.
          </p>
        </aside>

        <footer className="abk-footer">
          <a className="back-link" href="/">
            Back to portfolio
          </a>
        </footer>
      </article>
    </main>
  );
}
