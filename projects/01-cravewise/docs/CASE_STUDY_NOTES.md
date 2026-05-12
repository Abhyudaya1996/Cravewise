# Case Study Notes: CraveWise

## Problem

Users face weekend food-ordering paralysis because delivery apps show many options but weak personal decision signals.

## User

Initial wedge: urban professionals in Indian metros, especially weekend evening ordering where expectations and regret are higher.

## Product Hypothesis

One trusted dish + restaurant recommendation can feel more useful than browsing hundreds of generic options when it references taste history, budget, and regret patterns.

## Before Workflow

Open Swiggy/Zomato, scroll, compare generic ratings/discounts, pick randomly or reorder safe meals, then sometimes regret the choice.

## After Workflow

Open CraveWise, select a simulation persona, preview the taste profile, enter messy craving/budget/occasion/exploration context, receive one primary recommendation with reasoning, optionally reveal backups, then give or skip feedback.

## Experience Design

The prototype is designed as a premium food decision assistant, not a delivery marketplace. The UI uses a warm mobile shell, calm cards, chips, badges, and progressive disclosure to keep each screen focused on one decision. The recommendation screen is intentionally the hero moment: one dish, one restaurant, visible taste match, regret risk, budget fit, dummy ETA, why it fits, and what CraveWise avoided.

## AI System Design

Milestone 1 has no AI. The prototype simulates future AI behavior with local sample data, deterministic craving interpretation, static scoring, feedback classification, and visible reasoning so the workflow can be reviewed before model calls are introduced.

## Metrics

- Time to decision
- Primary recommendation acceptance
- Backup usage
- Feedback completion
- Reason trust score
- Weekday Rush acceptance rate
- Fallback/clarification usage

## Evals

Static fallback states cover vague craving, low budget, high regret risk, and no strong match. Future evals should test whether AI preserves these behaviors and whether Weekday Rush prioritizes ETA/reliability over novelty.

## Tradeoffs

- Built one primary recommendation instead of a ranked feed.
- Used dummy/sample data instead of live restaurant availability.
- Used local component state instead of persistence.
- Added Weekday Rush with dummy ETA data while avoiding real-time delivery claims.
- Upgraded the UI toward a premium decision-assistant feel instead of a restaurant marketplace layout.
- Kept backup options visually secondary so the core experience remains one confident recommendation, not a restaurant grid.

## What I Cut

- OpenAI API
- backend/database
- auth
- Swiggy/Zomato integration
- MCP integration
- ordering/payments/delivery
- medical or nutrition claims

## What I Learned

The product feels clearest when CraveWise explains what it avoided, not only what it recommends. Weekday Rush also needs a different decision logic: reliability and meeting-safety matter more than novelty.

The interface feels more differentiated when it behaves like a calm personal decision layer rather than a feed of restaurant cards.

The UI polish works best when trust is visible in small, specific blocks: taste signal, tradeoff, avoided regret pattern, and dummy-data limitation.

## Screenshots To Capture

- Home
- Persona Selection
- Taste Profile Preview
- Craving Input with Weekday Rush
- Primary Recommendation
- Backup Options
- Feedback
- Insights

## Demo Script

Start with Abhyudaya's weekend foodie profile, enter a spicy but not oily dinner craving, show the primary recommendation, reveal backups, submit feedback, and end on insights. Then show Kushagra with Weekday Rush to demonstrate the Classic Chicken Burrito recommendation using dummy ETA and meeting-safe logic.
