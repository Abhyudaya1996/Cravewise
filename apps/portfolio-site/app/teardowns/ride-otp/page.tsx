import type { Metadata } from "next";
import "./teardown.css";

export const metadata: Metadata = {
  title: "Reusable OTP vs Fresh Ride PIN | PM Teardown | Abhyudaya Singh",
  description:
    "A PM teardown of reusable ride OTPs versus fresh ride-level PINs, focused on pickup speed, trust, and real risk.",
};

const tradeOffRows = [
  {
    dimension: "Pickup speed",
    reusable: "Faster. Less time spent locating or reading a new code.",
    fresh: "Slower. User may need to open the app, find the PIN, and communicate it.",
  },
  {
    dimension: "Cognitive load",
    reusable: "Lower. Repeat users remember the flow.",
    fresh: "Higher. Each ride creates a new code to notice and share.",
  },
  {
    dimension: "Repeat-user convenience",
    reusable: "Strong. Especially useful for frequent short rides.",
    fresh: "Moderate. Consistent security model, but repeated friction remains.",
  },
  {
    dimension: "Proxy booking",
    reusable: "Easier. The booker can share a known static ride PIN.",
    fresh: "Harder. The rider needs the fresh PIN from the booker or app context.",
  },
  {
    dimension: "Low-network reliability",
    reusable: "Better. Static code can work when the app is slow or network is weak.",
    fresh: "Weaker. If the PIN does not load or the user cannot access it, pickup can stall.",
  },
  {
    dimension: "Perceived freshness",
    reusable: "Weaker. Users may read reuse as poor security.",
    fresh: "Stronger. Aligns with the standard \"new event, new code\" mental model.",
  },
  {
    dimension: "Audit clarity",
    reusable: "Weaker. The same PIN may appear across trips.",
    fresh: "Stronger. The code is tied to a specific ride.",
  },
  {
    dimension: "Dispute handling",
    reusable: "More dependent on GPS, timing, support logs, and driver patterns.",
    fresh: "Cleaner ride-level evidence for pickup disputes.",
  },
  {
    dimension: "Actual safety coverage",
    reusable: "Narrow. Helps ride-start verification but not broader ride safety.",
    fresh: "Also narrow. Better freshness, but still not a full safety solution.",
  },
];

export default function RideOtpTeardownPage() {
  return (
    <main className="teardown-page">
      <article className="teardown-article">
        <a className="back-link" href="/">
          ← Back to portfolio
        </a>

        <header className="teardown-hero">
          <span className="eyebrow">PM Teardown · Ride-hailing verification design</span>
          <h1>Reusable OTP vs Fresh Ride PIN</h1>
          <p className="teardown-subtitle">
            A ride OTP verifies pickup handoff, not account access. When reusable OTP is the right
            default, and when it isn&apos;t.
          </p>
          <div className="teardown-meta" aria-label="Teardown status and reading time">
            <span className="status-chip drafted">Drafted</span>
            <span>~8 min read</span>
          </div>
        </header>

        <aside className="thesis-callout" aria-label="Thesis">
          <strong>Thesis</strong>
          <p>
            Reusable ride OTPs get read as a security flaw. But a ride OTP only verifies the start of an
            already-assigned trip. It is not account access or payment authorization. Reusable OTP can be
            a defensible default for high-frequency rides if fake-start data is low and the surrounding
            controls are strong. A fresh per-ride PIN should earn default status through incident data, not
            the assumption that fresh is automatically safer.
          </p>
        </aside>

        <div className="teardown-body">
          <section className="teardown-intro">
            <p>
              The ride OTP sits at one specific moment: pickup handoff. Understanding what it actually
              does, and what it does not, changes the whole product question.
            </p>
            <p>
              The instinct is understandable. In banking, a reusable OTP would be an obvious red flag.
              OTPs are associated with fresh authorization, money movement, account access, and fraud
              prevention. But ride-hailing is a different product system with a different threat model.
            </p>
            <p>
              A ride OTP does not usually authorize account access or initiate a financial transaction.
              It verifies the start of an already assigned trip between a known rider account, a known
              captain or driver account, a vehicle, a pickup location, and a platform-generated ride
              context.
            </p>
            <p>That difference matters.</p>
            <p>
              The product question is not whether a fresh ride-level PIN feels more secure. It does.
              The question is whether that freshness reduces enough real-world risk to justify the added
              friction at pickup.
            </p>
          </section>

          <section>
            <h2>Product Question</h2>
            <h3>What job does OTP do in ride-hailing?</h3>
            <p>
              The ride OTP is a start-verification mechanism. Its job is to reduce the chance that the
              wrong person, wrong driver, or wrong trip gets started.
            </p>
            <p>It sits at a very specific point in the journey:</p>
            <ol>
              <li>The rider books a ride.</li>
              <li>The platform assigns a captain or driver.</li>
              <li>The rider and driver meet at pickup.</li>
              <li>The driver enters a code or verifies the rider.</li>
              <li>The trip starts.</li>
            </ol>
            <p>That means OTP is not the whole safety system. It is one control in the pickup handoff.</p>

            <h3>How is ride OTP different from banking OTP?</h3>
            <p>Banking OTPs usually authorize high-risk actions:</p>
            <ul>
              <li>account login</li>
              <li>password reset</li>
              <li>payment approval</li>
              <li>card setup</li>
              <li>beneficiary addition</li>
              <li>money movement</li>
            </ul>
            <p>
              If a banking OTP leaks, the attacker may be able to complete an action that changes
              account state or moves money.
            </p>
            <p>
              A ride OTP is narrower. On its own, it should not let someone access the user&apos;s account,
              book arbitrary rides, or withdraw value. It becomes useful only inside an active assigned
              ride context.
            </p>
            <p>That does not make it risk-free. It makes the risk more specific.</p>

            <h3>Why the threat model matters</h3>
            <p>
              If the threat is &quot;someone knows my reusable ride OTP,&quot; that alone is usually incomplete.
              The attacker also needs the active ride context: the assigned driver/captain flow, pickup
              timing, and platform state that allows the trip to start.
            </p>
            <p>
              If the threat is &quot;the driver starts the trip before I board,&quot; the OTP matters, but so do
              proximity checks, pickup GPS, driver complaint history, support resolution, cancellation
              behavior, and enforcement.
            </p>
            <p>
              If the threat is &quot;I got into the wrong vehicle,&quot; a fresh PIN helps only if the rider waits
              to verify the driver and vehicle before sharing it. Vehicle verification, driver matching,
              app assignment, license plate checks, and in-app safety education are still central.
            </p>
            <p>
              This is why the PM trade-off is more interesting than &quot;static equals unsafe, dynamic equals
              safe.&quot;
            </p>
          </section>

          <section>
            <h2>Observed Models</h2>
            <p>
              Important framing: I am not claiming private knowledge of Rapido&apos;s internal design choices.
              I am treating reusable/static ride OTP as observed by users and commonly discussed behavior,
              not as confirmed official strategy.
            </p>
            <p>
              Uber&apos;s public &quot;Verify Your Ride&quot; documentation describes a different model: after opting
              in, a rider receives a unique 4-digit PIN whenever they request a ride, and the feature can
              be enabled for every ride or only at night.
            </p>
            <p>
              That opt-in detail matters. Based on public documentation, Uber does not appear to make
              fresh PIN mandatory by default for all rides. I would not overclaim Uber&apos;s internal
              reasoning, but the product inference is useful: fresh verification has pickup-friction costs,
              so it should earn default status through risk data rather than through a generic
              &quot;fresh is safer&quot; assumption.
            </p>

            <h3>Model A: Reusable/static ride OTP</h3>
            <p>
              A reusable or static ride OTP can make sense when the dominant product problem is pickup
              speed at high frequency.
            </p>
            <p>Potential benefits:</p>
            <ul>
              <li>lower cognitive load</li>
              <li>faster trip start</li>
              <li>easier for repeat users</li>
              <li>easier proxy booking</li>
              <li>better in low-network pickup situations</li>
              <li>fewer &quot;where is the OTP?&quot; moments</li>
            </ul>
            <p>
              For auto and bike rides, the pickup environment is often noisy, quick, crowded, and
              repetitive. Users may be booking short rides, switching between apps, carrying bags, or
              trying to move fast. A static PIN can reduce the tiny repeated frictions that make pickup
              feel clunky.
            </p>
            <p>
              Proxy booking is especially relevant in Indian mobility contexts. People book rides for
              family members, staff, elderly parents, visitors, or someone who does not have app access
              in that moment. A static OTP helps the booker communicate the handoff quickly. The risk is
              that the actual passenger may not directly see the driver, vehicle, pickup, or OTP
              instructions. A better product solution would be a proxy passenger handoff through SMS,
              WhatsApp, or an app link that includes driver details, vehicle details, pickup instructions,
              and OTP guidance.
            </p>
            <p>
              This is not a trivial product gain. In a marketplace where drivers wait, riders search,
              cancellations happen, and network conditions vary, shaving seconds and confusion from pickup
              can have real marketplace value.
            </p>

            <h3>Model B: Fresh ride-level OTP</h3>
            <p>A fresh ride-level OTP creates stronger per-trip verification.</p>
            <p>Potential benefits:</p>
            <ul>
              <li>stronger ride-level freshness</li>
              <li>better audit/dispute handling</li>
              <li>better perceived trust</li>
              <li>less reuse risk if OTP was previously shared</li>
              <li>alignment with the standard user mental model of security</li>
            </ul>
            <p>
              This model feels safer because it matches what users have learned from banking, login,
              delivery, and payment flows: a new sensitive event gets a new code.
            </p>
            <p>
              That perception matters. Trust is not only actuarial risk. It is also how the product
              explains itself in the moment.
            </p>
          </section>

          <section>
            <h2>Where the Common Security Argument Becomes Weak</h2>
            <p>
              The strongest criticism of reusable OTP is simple: &quot;If the OTP is reused, anyone who learns
              it can misuse it later.&quot;
            </p>
            <p>That sounds right until we ask what &quot;misuse it later&quot; actually requires.</p>
            <p>
              Knowing my static ride OTP alone does not let someone start arbitrary future rides. The
              captain or driver still needs the active assigned ride context. The platform needs to have
              matched a driver to my ride. The trip needs to be in a state where entering the code starts
              that ride.
            </p>
            <p>
              There are still risks, but the OTP is not equivalent to an account password or a banking OTP.
            </p>
            <p>The dynamic model also has limits:</p>
            <ul>
              <li>If a user shares the OTP before boarding, a fresh ride-level PIN can still fail.</li>
              <li>
                Wrong vehicle onboarding is not solved by freshness alone; driver/vehicle matching and
                app assignment matter.
              </li>
              <li>
                If the real issue is route deviation, harassment, unsafe driving, or post-start dispute
                handling, the OTP has already done its narrow job.
              </li>
              <li>OTP protects ride-start verification, not the full ride-safety problem.</li>
            </ul>
            <p>
              This is where many security hot takes collapse. They compare OTP formats without defining
              the actual risk being controlled.
            </p>
          </section>

          <section>
            <h2>Real Risk Areas</h2>
            <p>
              Reusable/static OTP is not automatically bad design, but it does create real risk surfaces
              that a PM should not hand-wave away.
            </p>

            <h3>Ghost ride or fake trip-start incentives</h3>
            <p>
              A driver or captain could start a trip before the rider boards, move a short distance, end
              the trip, and collect fare, avoid a cancellation penalty, or game completion metrics. This
              is incentive-driven behavior, not just random bad actor behavior.
            </p>
            <p>
              Static OTP can be more vulnerable if the driver has seen the rider&apos;s code from a prior
              interaction and later gets assigned to that rider again. The important controls are not only
              OTP freshness. They include GPS-verified trip start, captain penalty structure, dispute
              monitoring, pickup telemetry, and repeat-offender enforcement.
            </p>
            <p>
              At marketplace scale, even a small fake-start rate can create a large support and trust
              burden; 0.1% of rides can still mean thousands of disputes depending on ride volume.
            </p>

            <h3>Premature OTP sharing</h3>
            <p>
              Users often optimize for speed. They may share the code before confirming the vehicle,
              driver, or pickup context. This weakens both static and dynamic OTP models, though reusable
              OTP increases the value of prior knowledge.
            </p>

            <h3>Dispute resolution</h3>
            <p>
              A fresh ride-level PIN creates cleaner evidence for a specific trip. If the code was unique
              to that ride, support teams may have a clearer audit trail when investigating fake starts or
              pickup disputes.
            </p>
            <p>
              Static OTP shifts more of the dispute burden to GPS logs, captain history, complaint
              patterns, pickup timing, and telemetry. That can still be workable, but it requires stronger
              backend instrumentation and support tooling.
            </p>

            <h3>Repeated captain/driver abuse</h3>
            <p>
              If a bad actor repeatedly encounters the same user, or learns a static OTP and later gets
              assigned to that user again, prior OTP knowledge may become useful. This is likely a
              lower-frequency edge case, but it is a real one.
            </p>

            <h3>Perception of weak security</h3>
            <p>
              Even if the incremental risk is limited, users may interpret reusable OTP as sloppy. Trust
              perception is a product input, not just a communications issue.
            </p>
          </section>

          <section>
            <h2>Trade-Off Table</h2>
            <div className="table-scroll" role="region" aria-label="Reusable OTP and fresh ride PIN trade-off table" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Dimension</th>
                    <th scope="col">Reusable/static OTP</th>
                    <th scope="col">Fresh ride-level OTP</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeOffRows.map((row) => (
                    <tr key={row.dimension}>
                      <th scope="row">{row.dimension}</th>
                      <td>{row.reusable}</td>
                      <td>{row.fresh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Recommendation</h2>
            <p>I would not recommend dynamic OTP for every ride by default without evidence.</p>
            <p>
              Instead, I would treat static/reusable OTP as a legitimate default if data shows fake-start
              and fraud risk are low, especially for high-frequency auto and bike rides where pickup speed
              is a meaningful product outcome.
            </p>
            <p>The better product strategy is layered:</p>
            <ol>
              <li>Keep static/reusable OTP as default if fake-start risk is low.</li>
              <li>Allow users to customize their static ride PIN.</li>
              <li>
                Block weak PINs such as <code>0000</code>, <code>1111</code>, <code>1234</code>,
                repeated digits, and obvious phone-number digits.
              </li>
              <li>
                Reinforce pickup education: share OTP only after matching the driver, vehicle, and app
                assignment. Education alone is a weak control in high-friction pickup environments. It
                supports proximity and platform checks but does not replace them.
              </li>
              <li>Use GPS proximity and pickup timing as backend controls.</li>
              <li>Track fake-start complaints by captain/driver and pickup zone.</li>
              <li>Penalize or blacklist repeat offenders.</li>
              <li>Investigate repeated complaint patterns more aggressively than one-off support tickets.</li>
              <li>Consider optional fresh OTP mode for users who explicitly want it.</li>
              <li>
                Make fresh OTP earn default status through incident data, not assumption. The question is
                whether the marginal safety gain clears the pickup friction cost at ride volume.
              </li>
            </ol>
            <p>
              This keeps the product honest. It does not pretend static OTP is perfect. It also does not
              assume that freshness automatically solves the real safety problem.
            </p>
            <p>
              There is also a regulatory and safety optics layer. A static OTP policy must be explainable
              after a public safety or fraud incident. The PM should be able to show surrounding controls:
              GPS start enforcement, complaint handling, driver penalties, audit logs, and user education.
              This is not just UX; it is a defensible platform policy.
            </p>
          </section>

          <section>
            <h2>Metrics</h2>
            <p>The decision should be measured as a product trade-off, not argued from vibes.</p>
            <p>Useful metrics:</p>
            <ul>
              <li>median pickup start time</li>
              <li>OTP-related trip start failure rate</li>
              <li>fake-start complaint rate</li>
              <li>support tickets mentioning OTP</li>
              <li>cancellation at pickup</li>
              <li>driver wait time</li>
              <li>repeat ride frequency</li>
              <li>user trust/safety feedback</li>
              <li>percentage of users enabling optional fresh OTP, if offered</li>
            </ul>
            <p>I would segment these by:</p>
            <ul>
              <li>ride type: bike, auto, cab</li>
              <li>pickup zone: residential, office, mall, railway/metro, nightlife</li>
              <li>time of day</li>
              <li>network quality</li>
              <li>new vs repeat users</li>
              <li>proxy vs self-booked rides, if detectable</li>
              <li>drivers/captains with repeated fake-start complaints</li>
            </ul>
            <p>
              The key is to avoid optimizing only for one side. If fresh OTP reduces fake-start complaints
              by a tiny amount but increases pickup failures, cancellations, and driver wait time
              meaningfully, it may not be the right default. If fake-start complaints cluster in specific
              geographies or time windows, targeted controls may beat a universal fresh-code mandate.
            </p>
            <p>
              I would test this with an A/B experiment or geo/city-level pilot rather than a blanket
              policy change. Compare static or customizable PIN as the default against optional fresh OTP,
              or dynamic OTP in selected risk segments. The success metrics should include pickup start
              time, OTP failure rate, fake-start complaints, support tickets, and cancellations at pickup.
              The guardrail is that safety complaints and dispute rate must not worsen. The decision rule
              is simple: fresh OTP should become broader only if dispute reduction outweighs pickup friction.
            </p>
          </section>
        </div>

        <aside className="final-lesson" aria-label="Final PM lesson">
          <span className="eyebrow">Final PM Lesson</span>
          <p>
            The mature PM question is not &quot;which OTP is more secure?&quot; It is &quot;what risk does this OTP
            actually control, and is the added friction of freshness worth the marginal reduction in
            real-world risk?&quot;
          </p>
        </aside>

        <footer className="teardown-footer">
          <a className="back-link" href="/">
            ← Back to portfolio
          </a>
        </footer>
      </article>
    </main>
  );
}
