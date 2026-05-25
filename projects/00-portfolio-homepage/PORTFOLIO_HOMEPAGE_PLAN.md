# AI PM Portfolio Homepage Plan

Owner: Abhyudaya Singh  
Status: planning only  
Recommended app target: `apps/portfolio-site`

---

## 1. Product Goal

Create a central portfolio homepage for Abhyudaya Singh, a fintech Product Manager building an AI-native PM portfolio through shipped, structured product experiments.

The homepage should help a visitor quickly understand:

- what kind of PM Abhyudaya is
- what has actually shipped
- how AI is used responsibly in the work
- where to inspect proof: prototypes, case studies, evals, build logs, and code
- how to contact or evaluate Abhyudaya for PM opportunities

The page should not feel like a generic personal website. It should feel like a product surface for an AI-native PM: concise thesis, shipped artifacts, evidence, decision quality, and clear next clicks.

---

## 2. Target Audience

Primary audience:

- Hiring managers for product roles, especially AI, fintech, consumer, or platform PM roles
- Product leaders evaluating judgment, taste, execution, and AI literacy
- Recruiters who need a fast narrative and resume path

Secondary audience:

- PM peers interested in AI product craft
- Engineers/designers evaluating whether Abhyudaya can work clearly with technical teams
- Founders or operators looking for structured product thinking

Visitor questions the homepage should answer:

- Can this PM ship usable product experiments?
- Does this PM understand where AI should and should not have authority?
- Is there evidence behind the claims?
- Can I inspect the work quickly?
- What should I click first?

---

## 3. Homepage Information Architecture

Recommended top-level navigation:

1. `Home`
2. `Case Studies`
3. `Prototypes`
4. `Writing`
5. `About`
6. `Resume`
7. `Contact`

Recommended homepage hierarchy:

1. Hero thesis
2. Featured shipped project: CraveWise
3. Proof strip
4. Case studies
5. Products/prototypes
6. Operating principles
7. Writing/build logs
8. About/resume/contact

The homepage should lead with the portfolio thesis, then immediately prove it with CraveWise. Future projects should be visible as a roadmap or queue only if clearly labeled as not shipped.

---

## 4. MVP Sections

### Section 1: Hero

Purpose:
Make the positioning clear in five seconds.

Must include:

- name
- role positioning
- AI-native PM thesis
- primary CTA to CraveWise case study
- secondary CTA to resume/contact

Suggested hero structure:

- Eyebrow: `AI-native Product Manager`
- Headline: `I ship structured product experiments that test where AI should and should not have authority.`
- Supporting copy: 1-2 sentences
- CTAs:
  - `View CraveWise case study`
  - `Download resume`
  - `Contact`

### Section 2: Featured Project

Purpose:
Put the strongest proof above the fold or immediately after it.

Featured project:

- CraveWise
- AI food decision assistant
- bounded AI architecture
- deterministic recommender authority
- Recommender Integrity v2
- static evals 33/33
- AI validation 5/5
- interpretation comparison 3/3

This should link to:

- `/case-studies/cravewise` or CraveWise route equivalent
- live prototype
- GitHub repository
- evaluation evidence if public

### Section 3: Proof Strip

Purpose:
Show evidence without turning the homepage into a wall of text.

Suggested proof chips:

- `Shipped prototype`
- `Static evals 33/33`
- `AI validation 5/5`
- `Deterministic scoring authority`
- `No fake live availability`
- `Bounded AI`

### Section 4: Case Studies

Purpose:
Create a durable index as more projects ship.

MVP:

- CraveWise as the only active completed case study
- Future cards for Financial Copilot and AI PM Simulator may appear only as `Planned` or `Queued`, not as shipped work

### Section 5: Products / Prototypes

Purpose:
Separate interactive demos from written case studies.

MVP cards:

- CraveWise prototype: shipped
- Financial Copilot: planned
- AI PM Simulator: planned

Each card should show status:

- `Shipped`
- `In progress`
- `Planned`

Avoid implying future projects are already live.

### Section 6: Operating Principles

Purpose:
Show PM judgment in a compact way.

Suggested principles:

- AI should earn authority, not assume it.
- Deterministic systems are often the trust layer.
- Evals are product artifacts, not just engineering tests.
- Prototype scope should be honest about what is real and what is mocked.
- Strong PM work includes deciding what not to build.

### Section 7: Writing / Build Logs

Purpose:
Make the portfolio feel alive and inspectable.

MVP:

- Link to learning log
- Link to CraveWise build notes or case-study writeup
- Optional future essays:
  - `Why bounded AI matters in consumer decision products`
  - `How I evaluate AI features before giving them product authority`
  - `What static evals teach a PM`

Only publish entries that exist.

### Section 8: About / Resume / Contact

Purpose:
Close the loop for hiring or collaboration.

MVP:

- short bio
- fintech PM background
- AI-native portfolio thesis
- resume link
- LinkedIn
- GitHub
- email/contact method

---

## 5. Suggested Copy

### Hero Copy

Headline:

```text
I ship structured product experiments that test where AI should and should not have authority.
```

Supporting copy:

```text
I am Abhyudaya Singh, a fintech Product Manager building an AI-native PM portfolio through working prototypes, case studies, evals, and build logs. My focus is practical AI product judgment: clear user problems, bounded model roles, deterministic trust layers, and honest evidence.
```

Primary CTA:

```text
View CraveWise case study
```

Secondary CTA:

```text
See resume
```

### Featured CraveWise Copy

Title:

```text
CraveWise
```

Subtitle:

```text
An AI food decision assistant that gives one trusted recommendation instead of another browsing grid.
```

Body:

```text
CraveWise uses AI only to interpret craving signals. Deterministic scoring owns the final recommendation. The shipped Recommender Integrity v2 gate suppresses weak matches when the demo catalog cannot responsibly satisfy the request.
```

Proof:

```text
Static evals 33/33
AI validation 5/5
Interpretation comparison 3/3
Bounded AI architecture
```

CTA labels:

```text
Read case study
Try prototype
View GitHub
```

### Case Studies Section Copy

Headline:

```text
Case studies with working proof.
```

Supporting copy:

```text
Each case study shows the product bet, decision boundaries, prototype behavior, evaluation design, and what changed after evidence.
```

CraveWise card:

```text
Shipped: CraveWise shows how a PM can use AI as an interpretation layer while keeping final recommendation authority deterministic and inspectable.
```

Future project card label:

```text
Planned, not yet shipped
```

### Products / Prototypes Copy

Headline:

```text
Products, not slideware.
```

Supporting copy:

```text
The portfolio prioritizes usable prototypes and evidence trails over abstract AI claims.
```

### Operating Principles Copy

Headline:

```text
How I approach AI product work.
```

Principles:

```text
Constrain AI before trusting it.
Use evals as product evidence.
Make uncertainty visible.
Keep mocked data honest.
Ship small enough to learn.
```

### About Copy

```text
I am a fintech Product Manager focused on AI-native product judgment. This portfolio is my proof-of-work system: I build prototypes, define product boundaries, run deterministic and AI validation checks, and turn the evidence into case studies.
```

---

## 6. Visual Direction

Tone:

- serious
- editorial
- product-minded
- evidence-forward
- calm, not flashy

Avoid:

- generic AI gradients
- abstract neural-network visuals
- fake dashboards
- fake company logos
- inflated metrics
- oversized personal-brand theatrics

Recommended visual language:

- near-white editorial background
- restrained accent palette
- case-study cards with clear status labels
- proof chips
- concise evidence strips
- one featured project module
- subtle product screenshots/mockups where real pages exist
- clear typography hierarchy

Suggested homepage feeling:

```text
Portfolio as product evidence, not personal marketing wallpaper.
```

CraveWise visual carryover:

- use similar proof-chip styling
- reuse the "bounded AI / deterministic scoring" language
- include a small product preview or phone mockup only if it reflects the real shipped prototype

---

## 7. Routing Recommendation

Recommendation:

Use the existing `apps/portfolio-site` placeholder as the central portfolio app.

Do not integrate the portfolio homepage into `apps/cravewise`.

Reason:

- CraveWise should remain a standalone product/prototype.
- The portfolio homepage needs to become the parent surface for multiple projects.
- Future projects like Financial Copilot and AI PM Simulator should sit beside CraveWise, not inside it.
- The repo already has `apps/portfolio-site` reserved for this purpose.

Recommended route model:

```text
apps/portfolio-site
  /
  /case-studies
  /case-studies/cravewise
  /prototypes
  /about
  /resume
  /writing
  /contact
```

Short-term routing:

- Portfolio homepage: `/`
- CraveWise case study: `/case-studies/cravewise`
- CraveWise live prototype: link out to the CraveWise app route or deployment

If deployment is simpler at first, CraveWise can remain deployed separately and the portfolio homepage can link to it. Later, shared hosting can route both apps under one domain.

---

## 8. What Should Link to CraveWise

Homepage links:

- hero primary CTA: `View CraveWise case study`
- featured project card: `Read case study`
- featured project secondary CTA: `Try prototype`
- proof strip: optional link to evaluation evidence
- case studies index: CraveWise card
- prototypes index: CraveWise prototype card
- writing/build logs: CraveWise build-log entries

CraveWise destination links:

- case-study page
- live prototype
- GitHub repo
- evaluation pack / evidence
- learning log entry if exposed publicly

CraveWise should be positioned as:

```text
The first shipped proof-of-work project in the AI PM portfolio.
```

Not:

```text
A full food delivery product.
```

---

## 9. Out of Scope

Do not include in the homepage MVP:

- claims that future projects are shipped
- fake usage metrics
- fake customer interviews
- fake employer logos
- fake availability or integrations
- AI-generated testimonials
- a blog CMS
- auth
- database
- backend analytics
- email capture unless a simple mailto/contact link is enough
- complex animation system
- generic AI art
- full resume parser or PDF generation
- redesigning CraveWise inside this milestone

Do not overclaim:

- "AI expert"
- "production-scale AI systems"
- "user-tested with customers"
- "live restaurant intelligence"
- "personalized by real order history"

Prefer:

```text
AI-native PM portfolio
Working prototype
Structured product experiment
Bounded AI architecture
Evaluation-backed case study
```

---

## 10. Build Milestones

### Milestone 0A - Homepage Plan

Status: this document.

Output:

- homepage product goal
- target audience
- IA
- copy direction
- routing recommendation
- scope boundaries

### Milestone 0B - Portfolio App Scaffold

Goal:

Scaffold or activate `apps/portfolio-site`.

Acceptance criteria:

- local app runs
- homepage route exists
- basic layout and global styling exist
- no CraveWise logic copied into portfolio app

### Milestone 0C - Homepage MVP

Goal:

Build the central homepage with hero, featured CraveWise project, proof strip, case studies, prototypes, operating principles, writing links, about/resume/contact.

Acceptance criteria:

- homepage clearly positions Abhyudaya as an AI-native PM
- CraveWise is the only shipped featured project
- future projects are labeled planned or queued
- no unsupported claims
- mobile and desktop layouts work

### Milestone 0D - CraveWise Case Study Integration

Goal:

Move or mirror the CraveWise case study into the portfolio route model.

Acceptance criteria:

- `/case-studies/cravewise` exists in portfolio app
- links to live CraveWise prototype
- links to GitHub/evidence
- preserves bounded-AI and deterministic-scoring message

### Milestone 0E - Resume/About/Contact

Goal:

Add practical hiring paths.

Acceptance criteria:

- concise about page or section
- resume link
- LinkedIn/GitHub/email links
- no inflated experience claims

### Milestone 0F - Public Proof-of-Work Post

Goal:

Write a concise public launch/build post for CraveWise.

Acceptance criteria:

- states what shipped
- explains bounded AI authority
- links to prototype, case study, repo/evidence
- avoids claiming production user metrics

---

## Recommendation Summary

Build the central portfolio homepage as a separate app under the existing `apps/portfolio-site` placeholder, not inside the CraveWise app.

CraveWise should remain the first shipped proof point and the strongest above-the-fold project. The homepage should frame Abhyudaya Singh as an AI-native PM who ships structured product experiments, uses evidence to decide whether AI improves the product, and knows when deterministic systems should retain decision authority.
