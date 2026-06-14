import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Bank API Integrations Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on moving bank journeys from T-1 batch reporting to real-time API status, with safe rollout, error monitoring, and local event tracking.",
};

const platformPieces = [
  "Axis and SBI API integration",
  "Real-time status vs T-1 reporting",
  "Drop-off targeting via CleverTap",
  "Journey Tracks session-event monitoring",
  "Error flagging on OpenObserve and Teams",
  "Retry and re-ingestion flows",
];

const lessons = [
  {
    title: "Real-time changed the whole funnel",
    body: "T-1 batch reports meant we nudged drop-offs a day late, worse around holidays. Real-time API status let us reach a user while intent was still warm. That is most of the move from 10% to 27%.",
  },
  {
    title: "If you cannot see the error, you cannot fix it",
    body: "Every error flag from the API logs pushed into OpenObserve and a Teams channel, so failures pinged us the moment they happened. Queries and escalations got solved proactively, not after users complained.",
  },
  {
    title: "Build the tracking locally to understand it",
    body: "Journey Tracks let us monitor each event in a user's session. GA or CleverTap could do parts of it, but building our own taught us how events are defined, which params we store, and which ones are actually useful.",
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
          <h1>From next-day bank reports to real-time, recoverable journeys.</h1>
          <p>
            CashKaro sends users into bank journeys by redirection, and the bank reports came back T-1, the next
            day, and later still around holidays and events. That delay meant we nudged drop-offs too late.
            Integrating the Axis and SBI APIs made status real-time, so we could target drop-offs in the moment,
            roll out safely, and recover failures before they cost leads.
          </p>
          <div className="abk-metrics" aria-label="Bank API integration outcomes">
            <article>
              <strong>10% to 27%</strong>
              <span>conversion on redirection journeys</span>
            </article>
            <article>
              <strong>Real-time</strong>
              <span>status, replacing next-day (T-1) bank reports</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            A bank integration is not done when the happy path works. It is done when status is real-time,
            failures are visible, and affected leads are recoverable by the teams operating the journey.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>Why the API mattered</h2>
            <p>
              With T-1 reporting, we only learned a user had dropped off a day later, and any nudge landed after
              the moment had passed. Direct API access gave real-time status, which unlocked the actual lever:
              targeting drop-offs while intent was still live. Higher conversion followed because we could finally
              act in time.
            </p>
          </section>

          <section>
            <h2>What the system had to do</h2>
            <p>
              The work was the journey around the API, not just the call: integrate Axis and SBI, map status in
              real time, target drop-offs, watch for failures, and recover affected leads without operational
              confusion.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>Rolling out safely</h2>
            <p>
              An integration spec can never anticipate every real-world edge case or compliance scenario. So
              instead of switching the whole base over, we opened the API path to a limited cohort first, let the
              unhandled cases surface, handled them, and widened from there. That kept the risk contained while we
              learned what the spec did not cover.
            </p>
          </section>

          <section>
            <h2>Seeing and recovering failures</h2>
            <p>
              We built error flagging on top of the API logs: every error pushed to OpenObserve and into a Teams
              channel, so the team saw failures in real time. When a partner-side change started throwing gateway
              timeouts across a share of users, the flagging caught it early, and affected leads were re-ingested
              through retry flows with zero lead loss.
            </p>
            <p className="abk-safety-note">
              Public copy keeps the partner narrative neutral. The story is the product system: real-time status,
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
            The durable work was making the invisible parts of a partner integration visible: real-time status to
            act on, error flagging to catch failures, and local event tracking to understand users, all before a
            lead was lost.
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
