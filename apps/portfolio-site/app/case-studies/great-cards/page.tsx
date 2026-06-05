import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Great.Cards Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on building a spend-based credit-card recommendation engine with eligibility filtering and rupee-value benefit logic.",
};

const platformPieces = [
  "Spend-category input",
  "Rupee-value benefit comparison",
  "Eligibility filtering from bank relationship data",
  "No affiliate-fee bias in ranking",
  "Reward-rate verification workflow",
  "CashKaro app distribution",
];

const lessons = [
  {
    title: "The recommendation had to be personal",
    body: "The product thesis was that there is no single best card. There is a card that is best for a user's spends, eligibility, and redemption behavior.",
  },
  {
    title: "Trust depended on rupee value",
    body: "Benefits were translated into absolute rupee value rather than abstract points, so users could compare cards without decoding reward math.",
  },
  {
    title: "Eligibility mattered after rewards",
    body: "The product could not stop at the theoretical best card. It needed an eligibility layer before showing a card as a real fit.",
  },
];

export default function GreatCardsCaseStudyPage() {
  return (
    <main className="abk-page">
      <article className="abk-article">
        <a className="back-link" href="/">
          Back to portfolio
        </a>

        <header className="abk-hero">
          <span className="eyebrow">Case study, Great.Cards</span>
          <h1>Making credit-card recommendations personal, not promotional.</h1>
          <p>
            Great.Cards was built around a simple product belief: a bank RM or mall sales rep cannot
            recommend the right card without knowing how someone spends. The system asks for spend patterns,
            turns rewards into rupee value, and recommends the best-fit card without affiliate bias.
          </p>
          <div className="abk-metrics" aria-label="Great.Cards outcomes">
            <article>
              <strong>25%</strong>
              <span>lift in applications</span>
            </article>
            <article>
              <strong>0</strong>
              <span>extra marketing spend</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            India&apos;s first spend-based card recommendation engine had to earn trust by explaining which
            card fit a user&apos;s actual spend behavior, not by pushing the card with the best promotion.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The starting problem</h2>
            <p>
              Card sales often start from the seller&apos;s inventory, not the user&apos;s behavior. A customer may
              get a cold call or a mall pitch for a card that looks attractive but does not match their
              actual spends, redemption habits, or eligibility.
            </p>
          </section>

          <section>
            <h2>What the engine needed to do</h2>
            <p>
              The engine had to collect enough spend signal to recommend a card responsibly, show the benefit
              in real rupee terms, and filter the result through eligibility rules before presenting it as a
              fit.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>The hardest operator problem</h2>
            <p>
              Card and reward data changes often: reward rates, caps, conversion rules, transfer ratios, and
              brand-specific value can all shift. Automation helped reduce the verification load, but the
              product still needed human review to keep the recommendation trustworthy.
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
            The product worked because it treated recommendation quality as a trust problem: spend signal,
            eligibility, explainability, and data freshness all had to move together.
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
