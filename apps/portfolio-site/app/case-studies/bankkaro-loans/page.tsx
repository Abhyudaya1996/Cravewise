import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "BankKaro Loans Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on launching loans as a new vertical: a pull product matched to user intent with a two-tier rules engine and cashback.",
};

const platformPieces = [
  "Two-tier business rules engine",
  "Fast eligibility gate",
  "Deeper pricing and limit logic",
  "Lender-type qualification rules",
  "Rate-versus-speed matching",
  "Cashback on disbursed loans",
];

const lessons = [
  {
    title: "Loans are pulled, not pushed",
    body: "Nobody wants a credit card pitch at a mall, but a person who needs a loan is already looking. The job was to meet that intent with the right offer, not to manufacture demand.",
  },
  {
    title: "People optimize on different axes",
    body: "Some need the money today and will pay more for speed. Others want the lowest rate and can wait. The engine had to match the user's real priority, not a single best offer.",
  },
  {
    title: "Cashback was the unfair advantage",
    body: "Coming from CashKaro, we could give cashback on a disbursed loan. That turned a commodity comparison into a reason to come back, the same trust loop that worked on cards.",
  },
];

export default function BankKaroLoansCaseStudyPage() {
  return (
    <main className="abk-page">
      <article className="abk-article">
        <a className="back-link" href="/">
          Back to portfolio
        </a>

        <header className="abk-hero">
          <span className="eyebrow">Case study, BankKaro Loans</span>
          <h1>A new vertical: if we win on cards, why not loans?</h1>
          <p>
            We were doing well on cards, and loans were the obvious next vertical. But loans are a pull product,
            not a push one: a user shows up because they already need money. So the product had to start from
            their need, how soon they want it, the rate they will accept, and the tradeoff between the two, and
            then return the best-fit offer with cashback on top.
          </p>
          <div className="abk-metrics" aria-label="BankKaro Loans outcomes">
            <article>
              <strong>₹5 Cr</strong>
              <span>monthly loan disbursal</span>
            </article>
            <article>
              <strong>70%</strong>
              <span>fewer incorrect product mappings</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            A loan marketplace wins when it stops pushing offers and starts answering the user&apos;s real
            question: how soon do you need the money, and what will you trade, rate for speed or speed for rate?
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The opportunity</h2>
            <p>
              Cards were working, and the same audience had a second, higher-intent need: credit. Unlike cards,
              loans do not need a pitch. The user arrives already looking. That changes the product job from
              creating demand to matching it well, fast, and honestly.
            </p>
          </section>

          <section>
            <h2>What the engine had to do</h2>
            <p>
              Lenders qualify and price the same person very differently, so a flat offer list sends users
              toward products they will not get or should not pick. We modeled the lender universe as rules: a
              fast eligibility gate first, then deeper pricing and limit logic, matched to whether the user
              optimized for speed or for rate, with cashback layered on disbursal.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>What stays private</h2>
            <p>
              This case study describes the mechanism only. Exact lender matrices, pricing grids, and rate logic
              are not published, because they are commercially sensitive and change over time.
            </p>
            <p className="abk-safety-note">
              Eligibility is estimated from declared and available profile signals. Real bureau and Account
              Aggregator pulls are a separate, gated step.
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
            The win was reading the demand correctly. Loans did not need a louder pitch, they needed a faster,
            more honest match to what the user already wanted, and a reason to come back.
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
