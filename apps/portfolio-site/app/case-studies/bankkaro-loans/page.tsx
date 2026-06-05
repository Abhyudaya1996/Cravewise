import type { Metadata } from "next";
import "../agent-bankkaro/agent-bankkaro.css";

export const metadata: Metadata = {
  title: "BankKaro Loans Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on building a two-tier loan eligibility and recommendation engine with honest data limitations.",
};

const platformPieces = [
  "Two-tier business rules engine",
  "Fast eligibility gate",
  "Deeper pricing and limit logic",
  "Lender-type qualification rules",
  "Estimated income and profile signals",
  "Honest CIBIL and Account Aggregator limitations",
];

const lessons = [
  {
    title: "Eligibility is not one rule",
    body: "Different lender types qualify and price users differently, so the product needed a structured engine rather than a static offer list.",
  },
  {
    title: "Speed and depth needed separate layers",
    body: "A fast first-pass gate kept the experience usable, while deeper rules handled lender-specific pricing and limit logic.",
  },
  {
    title: "The limitation had to be visible",
    body: "Without real CIBIL pulls or Account Aggregator data, eligibility stays estimated. That boundary is part of the product truth.",
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
          <h1>A loan recommendation engine for a messy lender universe.</h1>
          <p>
            BankKaro Loans modeled the lender universe as rules: how different lender types qualify, price,
            and limit users. The goal was not to list offers. It was to recommend the best-fit loan from
            estimated profile signals while keeping the data boundary honest.
          </p>
          <div className="abk-metrics" aria-label="BankKaro Loans outcomes">
            <article>
              <strong>70%</strong>
              <span>incorrect mappings reduction</span>
            </article>
            <article>
              <strong>2</strong>
              <span>BRE layers</span>
            </article>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Case study thesis">
          <strong>Product thesis</strong>
          <p>
            A loan marketplace becomes more useful when it models how lenders actually qualify and price
            users, then separates fast eligibility from deeper recommendation logic.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>The starting problem</h2>
            <p>
              Loan products vary by lender type, qualification rules, pricing behavior, and profile fit. A
              plain listing surface can send users toward products they are unlikely to qualify for or
              products that are not the best match.
            </p>
          </section>

          <section>
            <h2>What the engine needed to do</h2>
            <p>
              The product needed a two-tier rules engine: one layer for fast eligibility, and another for
              deeper lender-specific pricing, limits, and recommendation logic.
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
              The public case study describes the mechanism only. Exact lender matrices, pricing grids, and
              rate logic are not published because they are commercially sensitive and change over time.
            </p>
            <p className="abk-safety-note">
              Eligibility is estimated from declared and available profile signals. Real CIBIL and Account
              Aggregator data are not pulled.
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
            The strongest product decision was not hiding uncertainty. It was making the recommendation
            better while being clear about the missing ground-truth data.
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
