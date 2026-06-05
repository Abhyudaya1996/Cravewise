import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Bank API Integrations Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on making partner bank journeys observable and recoverable through status tracking, retry flows, and failure handling.",
};

const platformPieces = [
  "Partner application flows",
  "API contracts and status mapping",
  "Failure detection",
  "Retry and re-ingestion flows",
  "Bank tech and risk coordination",
  "Operations-safe recovery paths",
];

const lessons = [
  {
    title: "Opaque APIs need product instrumentation",
    body: "When partner systems do not expose enough error detail, the product still needs its own operating surface for detection and recovery.",
  },
  {
    title: "Retries are product design",
    body: "A retry API is not only backend plumbing. It decides whether affected leads are recoverable and whether operations can trust the journey.",
  },
  {
    title: "Neutral public framing matters",
    body: "The useful story is not naming or criticizing a bank partner. It is showing how a fragile partner flow became observable and recoverable.",
  },
];

export default function BankApiIntegrationsCaseStudyPage() {
  return (
    <main className="abk-page">
      <article className="abk-article">
        <a className="back-link" href="/">
          Back to portfolio
        </a>

        <header className="abk-hero">
          <span className="eyebrow">Case study, bank API integrations</span>
          <h1>Making bank partner journeys observable and recoverable.</h1>
          <p>
            Partner bank journeys can fail quietly: status gaps, retry constraints, and API changes can break
            conversion before teams understand the issue. This work made failures easier to detect,
            diagnose, and recover from.
          </p>
          <div className="abk-metrics" aria-label="Bank API integration outcomes">
            <article>
              <strong>0</strong>
              <span>lead loss in recovery incident</span>
            </article>
            <article>
              <strong>504</strong>
              <span>bank-side timeout class handled</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            A bank integration is not done when the happy path works. It is done when failures are visible,
            recoverable, and understandable to the teams operating the journey.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The starting problem</h2>
            <p>
              Credit-card applications depended on partner bank APIs where logging gaps, status ambiguity,
              and bank-side changes could directly affect lead conversion. Product work had to cover the
              journey around the API, not just the API call.
            </p>
          </section>

          <section>
            <h2>What the system needed to do</h2>
            <p>
              The system needed clear status tracking, proactive failure detection, partner coordination, and
              retry flows that could recover affected leads without creating operational confusion.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>The incident pattern</h2>
            <p>
              When a bank-side change started throwing gateway timeouts across a large share of users, the
              flagging system caught it early. Affected leads were re-ingested through retry flows, cutting
              impact sharply with zero lead loss.
            </p>
            <p className="abk-safety-note">
              Public copy keeps the partner narrative de-named. The case study focuses on the product system:
              detection, recovery, and operational safety.
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
            The durable product work was making the invisible parts of partner integrations visible enough
            for teams to act before users and leads were lost.
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
