import type { Metadata } from "next";
import "./agent-bankkaro.css";

export const metadata: Metadata = {
  title: "Agent BankKaro Case Study | Abhyudaya Singh",
  description:
    "A public-safe case study on improving an existing field-sales platform by sitting close to agents: readable reporting, sub-DSA support, follow-up visibility, and lead quality.",
};

const platformPieces = [
  "Plain-English bank reporting",
  "Sub-DSA onboarding and hierarchy",
  "Lead status and follow-up visibility",
  "Lead-quality signals from bank statuses",
  "Payment and commission clarity",
  "Card-pitch repository for field teams",
];

const lessons = [
  {
    title: "The roadmap came from the agents",
    body: "I did not start from a planning doc. I started by understanding where agents got stuck. Almost every improvement that mattered came from a pain they described, not a feature we assumed.",
  },
  {
    title: "Sub-DSA support unlocked the growth",
    body: "Agents wanted to recruit their own sub-agents to scale earnings. I designed the hierarchy and commission backend so they could, which is a big part of how the base grew past 500 agents.",
  },
  {
    title: "Visibility turned effort into conversion",
    body: "Readable reports and clear follow-up cues meant agents chased the right leads at the right time. Conversion moved from 6% to 12% without asking anyone to work harder.",
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
          <h1>Field agents had a platform. They didn&apos;t have a way to grow on it.</h1>
          <p>
            Agent BankKaro was already live when I came to it. My contribution was not inventing the platform,
            it was getting close to the people using it, then designing the parts they were missing, including
            the backend that let an agent build and run their own sub-agent team.
          </p>
          <div className="abk-metrics" aria-label="Agent BankKaro outcomes">
            <article>
              <strong>500+</strong>
              <span>field agents onboarded</span>
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
            The agents were not failing on effort. They were failing on visibility and on tooling that did not
            match how they actually worked. Proximity to the user, not a bigger feature list, was the unlock.
          </p>
        </aside>

        <div className="abk-body">
          <section>
            <h2>Where I came in</h2>
            <p>
              The product was built before me. What it lacked was a tight loop with the field. As the person
              closest to the agents, I treated their day as the source of truth: how they punched leads, how
              they read bank responses, how they decided who to follow up, and where they quietly gave up.
            </p>
          </section>

          <section>
            <h2>The pain the agents described</h2>
            <p>
              Three things came up again and again. Agents could not understand the bank reports, so they did
              not know what a status meant or what to do next. They wanted to recruit sub-agents but the product
              did not support that. And they had no clear view of which leads to follow up, or how lead quality
              affected their payout.
            </p>
            <div className="abk-piece-grid">
              {platformPieces.map((piece) => (
                <span key={piece}>{piece}</span>
              ))}
            </div>
          </section>

          <section>
            <h2>What I changed</h2>
            <p>
              I had bank statuses translated into plain language agents could act on, added sub-DSA onboarding
              so agents could build their own teams, and made follow-up state and lead quality visible. Lead
              quality used bank signals such as unresolved in-principle approvals and completed KYC, which also
              surfaced an incentive gap: fixed-salary sub-agents had no payout reason to care about quality.
            </p>
            <p className="abk-safety-note">
              Public-safe framing: the insight is about detection and incentive design, not public accusation or
              internal screenshots.
            </p>
          </section>

          <section>
            <h2>Designing the sub-DSA backend</h2>
            <p>
              Agents kept asking to recruit their own sub-agents, so the product team asked me to spec it. I drew
              the backend: how each level of the hierarchy links to the next, the parent agent to the agent, the
              agent to the sub-agent, how leads and performance roll up that tree, how reports are generated at
              each level, and how commissions are calculated and validated end to end, from a tracked lead
              through to a verified payout.
            </p>
            <p>
              That structure is a big part of how the base grew past 500 agents without the commission math
              breaking. An agent could build a team and trust that every lead and every rupee was accounted for.
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
            I did not need to own the original build to make the product better. The unlock was proximity:
            sitting with agents, hearing the same pains, and turning them into visibility, hierarchy, and
            incentives that worked.
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
