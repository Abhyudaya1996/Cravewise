import type { Metadata } from "next";
import "./note.css";

export const metadata: Metadata = {
  title: "Why the strongest decision in CraveWise was \"no recommendation\" — Build Note | Abhyudaya Singh",
  description:
    "A build note on why refusing to recommend was CraveWise's strongest product decision, and how the bounded-AI architecture and evals were built to enforce it.",
};

const matchQualityStates = [
  {
    state: "strong",
    meaning: "the catalog clearly satisfies the craving and constraints",
  },
  {
    state: "style_match",
    meaning:
      "the exact dish is not available, but a style-adjacent option is honestly named as a substitute",
  },
  {
    state: "partial",
    meaning: "the request is met with a caveat, and the unmet part is surfaced",
  },
  {
    state: "no_responsible_match",
    meaning: "the catalog cannot satisfy the request without inventing confidence",
  },
];

export default function NoRecommendationNotePage() {
  return (
    <main className="note-page">
      <article className="note-article">
        <a className="back-link" href="/">
          ← Back to portfolio
        </a>

        <header className="note-hero">
          <span className="eyebrow">Build note · CraveWise</span>
          <h1>Why the strongest decision in CraveWise was &quot;no recommendation&quot;</h1>
          <p className="note-subtitle">
            The feature I am most confident about is the one where the product gives you nothing at all —
            and the architecture that made that refusal hold under pressure.
          </p>
          <div className="note-meta" aria-label="Note status and reading time">
            <span className="status-chip drafted">Build note</span>
            <span>~5 min read</span>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Key takeaway">
          <strong>Key takeaway</strong>
          <p>
            For a decision product, the value is not in producing an answer — it is in producing an answer
            you can trust. That means the product has to be willing to say no. The decision to refuse and
            the architecture that enforces refusal are the same piece of work; one without the other is a
            slogan.
          </p>
        </aside>

        <div className="note-body">
          <section className="note-intro">
            <p>
              CraveWise is a food decision assistant. Its entire job is to give you one answer instead of a
              grid to scroll. So the feature I am most confident about is the one where it gives you nothing
              at all.
            </p>
            <p>
              When the catalog cannot responsibly satisfy a craving, CraveWise does not return a best-effort
              guess. It says it does not have a good match and explains why. That refusal was harder to build
              than any recommendation, and it is the part of the product I would defend first in a review.
            </p>
            <p>
              This note is about why that decision was right, and how the product was built so it could
              actually hold the line under pressure.
            </p>
          </section>

          <section>
            <h2>The default failure mode</h2>
            <p>
              Most recommendation surfaces are built to always answer. An empty result feels like a bug, so
              teams pad it: relax the filters, drop a constraint, surface &quot;popular near you,&quot; anything to
              avoid a blank screen. The metric being protected is usually engagement or coverage, not whether
              the answer was any good.
            </p>
            <p>
              The cost is hidden. A product that always answers teaches users that its confidence is
              meaningless. Once someone gets one confidently wrong recommendation — the oily dish when they
              asked for light, the dessert when they asked for &quot;not too sweet&quot; — they stop trusting the next
              one. The system optimized for never being empty and paid for it in trust.
            </p>
            <p>
              For a decision product, that trade is backwards. The value is not in producing an answer. It is
              in producing an answer you can rely on. That means the product has to be willing to say no.
            </p>
          </section>

          <section>
            <h2>The decision: when to refuse</h2>
            <p>
              CraveWise separates how well it can satisfy a request into explicit <code>matchQuality</code>{" "}
              states rather than a single confidence score:
            </p>
            <ul className="state-list">
              {matchQualityStates.map((item) => (
                <li key={item.state}>
                  <code>{item.state}</code>
                  <span>{item.meaning}</span>
                </li>
              ))}
            </ul>
            <p>
              The last state is the important one. When it triggers, a{" "}
              <code>shouldSuppressPrimaryRecommendation</code> flag turns off the recommendation entirely and
              the product renders an honest empty state instead of a forced pick.
            </p>
            <p>
              A concrete example: ask CraveWise for &quot;sushi tonight&quot; when the demo catalog has no sushi. It
              does not hand you the closest noodle dish and pretend. It returns <code>no_responsible_match</code>{" "}
              and tells you it cannot responsibly satisfy that craving. The wrong answer here would have been
              easy. The product is built to not give it.
            </p>
            <p>
              This matters because the refusal is a product <em>path</em>, not an error. Vague input routes to
              a clarification state. A request the catalog genuinely cannot meet routes to a no-match state.
              Neither one fabricates a confident recommendation to fill the screen.
            </p>
          </section>

          <section>
            <h2>The engineering of restraint</h2>
            <p>
              A principle like &quot;refuse weak matches&quot; is worthless if the system can quietly route around it.
              The decision only holds because the architecture is bounded so that no single layer can
              manufacture a recommendation it has not earned.
            </p>
            <p>
              CraveWise uses AI for one job: interpreting the craving into structured signals. It does not
              choose the recommendation. Deterministic scoring owns the final decision. That boundary is
              enforced, not just documented — a validation gate rejects any AI output that tries to reach past
              its role into fields it should never set, such as the recommendation, the restaurant, or the
              backup options. If the model returns something unsafe or malformed, the request falls back to
              static rules rather than trusting it.
            </p>
            <p>
              So the refusal is structural. <code>assessMatchQuality()</code> evaluates coverage, budget, time,
              and constraints and reports what could not be satisfied. <code>getFallbackState()</code> maps
              that assessment to the right path, including <code>no_responsible_match</code>. The scoring
              engine, not the model, decides whether an answer exists. The &quot;no recommendation&quot; outcome is what
              happens when that deterministic logic concludes there is no honest answer — and nothing
              downstream is allowed to override it.
            </p>
            <p>
              This is the part that turns a nice intention into a real product guarantee. The model cannot
              smuggle in a confident pick. The UI cannot fall back to &quot;popular nearby.&quot; The only way to get a
              recommendation is for the scoring logic to actually find one worth standing behind.
            </p>
          </section>

          <section>
            <h2>How you test a refusal</h2>
            <p>
              The harder question in review is: how do you know the product refuses when it should, and
              answers when it should? An assistant that says &quot;no good match&quot; to everything is as useless as
              one that always answers.
            </p>
            <p>
              CraveWise treats this as something to verify, not assert. The static eval harness runs the
              scoring logic against fixed cases with an expected <code>matchQuality</code> for each — including
              cases that must resolve to <code>no_responsible_match</code> and cases that must <em>not</em>.
              The current baseline is 33/33 static cases, 5/5 AI-output validation checks, and 3/3
              interpretation-comparison checks. The validation checks specifically confirm the AI layer cannot
              set the fields it is forbidden from setting.
            </p>
            <p>
              The refusal is covered by tests the same way a recommendation is. That is what makes it a feature
              instead of a hope.
            </p>
          </section>
        </div>

        <aside className="final-lesson" aria-label="The PM lesson">
          <span className="eyebrow">The PM Lesson</span>
          <p>
            The strongest decision in CraveWise was &quot;no recommendation&quot; because it is the decision that
            makes every other recommendation worth trusting.
          </p>
        </aside>

        <footer className="note-footer">
          <a className="back-link" href="/">
            ← Back to portfolio
          </a>
        </footer>
      </article>
    </main>
  );
}
