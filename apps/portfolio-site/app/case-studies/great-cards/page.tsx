import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Great.Cards Case Study | Abhyudaya Singh",
  description:
    "The story behind Great.Cards: a spend-based credit-card recommendation engine that runs your real numbers, with eligibility filtering, rupee-value benefits, and no affiliate bias.",
};

const commonLeaks = [
  {
    title: "Capped without noticing",
    body: "A cashback card that hits its monthly cap by week two, so most of the year quietly earns nothing extra.",
  },
  {
    title: "A milestone just out of reach",
    body: "A spend-milestone benefit missed by a few thousand rupees, month after month, with the reward sitting right there.",
  },
  {
    title: "A card that outlived its fit",
    body: "A fuel-optimised card that stops making sense the day a commute changes. The card does not move. The person's life does.",
  },
];

const engineEvaluates = [
  "Effective reward rate on your spends",
  "Category and monthly caps",
  "Milestone benefits and triggers",
  "Annual-fee value, net of rewards",
  "Eligibility from bank rules",
  "No affiliate-fee bias in ranking",
];

const lessons = [
  {
    title: "The recommendation had to be personal",
    body: "There is no single best card. There is a card that fits a specific person's spends, caps, eligibility, and redemption habits. The engine had to start from the user, not the catalogue.",
  },
  {
    title: "Rupee value beat reward jargon",
    body: "Benefits became absolute rupee value instead of points, multipliers, and transfer ratios, so a person could compare two cards without decoding reward math.",
  },
  {
    title: "It is a decision you re-make over time",
    body: "The right card at 28 is the wrong card at 32. The product had to account for spending that shifts and reward structures that change quietly, not a one-time pick.",
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
          <h1>No card is the best card. The best one is the one for you.</h1>
          <p>
            Great.Cards came from an uncomfortable truth: even people who think they have their cards optimised
            are usually carrying the wrong one. CashKaro exists to get people more back from every rupee, and
            credit cards are where that money leaks the most. So we built an engine that runs your actual numbers
            and tells you the card that fits you, with no affiliate bias.
          </p>
          <div className="abk-metrics" aria-label="Great.Cards outcomes">
            <article>
              <strong>₹25L</strong>
              <span>incremental revenue, zero ad spend</span>
            </article>
            <article>
              <strong>25%</strong>
              <span>more card applications</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            There is no best card. There is only the right card for you, the one that fits your spends, your
            caps, your eligibility, and how you actually redeem. Your spending pattern is unique, so the
            recommendation has to be too.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The problem we set out to solve</h2>
            <p>
              CashKaro was built on a simple idea: people deserve more back from every rupee they spend. Credit
              cards are where that promise breaks most often, because a reward that looks great on the brochure
              quietly underperforms in real life.
            </p>
            <p>
              Do the math properly, category by category, cap by cap, against how someone actually spends, and
              the leaks show up fast. The same few patterns came up again and again.
            </p>
            <div className="abk-lesson-grid">
              {commonLeaks.map((leak) => (
                <article key={leak.title}>
                  <strong>{leak.title}</strong>
                  <p>{leak.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2>A card is never a one-time decision</h2>
            <p>
              This is the thing nobody tells you about credit cards in India. It is not a one-time decision.
              Reward structures change quietly. Spending shifts. A card that is perfect at 28, living alone and
              ordering in every night, is a completely different card at 32 with a family and a home-loan EMI.
            </p>
            <p>
              Staying on top of all of it manually is a part-time job, and even diligent people still miss
              things. If a card optimiser can drift out of fit, the average user never stood a chance of catching
              it. That gap, between the card someone has and the card they should have, was the product.
            </p>
          </section>

          <section>
            <h2>So we built Great.Cards</h2>
            <p>
              You tell us how you spend. We run the math, effective reward rate, caps, milestone benefits, and
              annual-fee value, and tell you exactly which card puts the most money back in your pocket. No
              generic rankings. No affiliate bias. Just your numbers.
            </p>
            <div className="abk-piece-grid">
              {engineEvaluates.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
            <div className="abk-cta">
              <a className="primary-link" href="https://great.cards" target="_blank" rel="noreferrer">
                Try it at great.cards
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </section>

          <section>
            <h2>The hardest operator problem</h2>
            <p>
              Card and reward data drifts constantly: reward rates, caps, conversion rules, transfer ratios, and
              brand-specific value all change. Automation reduced the verification load, but the recommendation
              still needed human review to stay trustworthy, because a confidently wrong rupee figure is worse
              than no figure at all.
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
            Start from the user's actual numbers and the right card stops being a guess. Great.Cards worked
            because it treated recommendation quality as a trust problem: real spends, real eligibility, honest
            rupee value, and fresh data, all moving together.
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
