# Feature Memory: CraveWise Static Prototype

## Project

CraveWise

## Milestone

Static clickable prototype with dummy data.

## Goal

Create the first working user flow from the active CraveWise PRD using dummy/sample data only, without AI APIs or external integrations.

## User Problem

Users often know they are hungry but do not know what will feel satisfying, affordable, and low-regret in the moment.

## Scope

- Home / start screen
- Persona Selection screen with six simulation profiles
- Taste Profile Preview screen using sample personas
- Current craving and context input with messy examples
- Budget, occasion, exploration, heaviness, Weekday Rush time, and constraint controls
- One primary recommendation before optional backups
- Optional safer and exploratory backup recommendations
- Deterministic local scoring with Weekday Rush ETA/reliability behavior
- Regret-risk explanation
- Optional post-meal feedback screen with chips and custom feedback text
- Static feedback classification output
- Persona-specific insight summary from sample history
- Fallback state panel for vague craving, low budget, high regret risk, and no strong match
- Portfolio-grade mobile UI polish with warm shell, cards, chips, badges, visible trust blocks, and a recommendation hero

## Out Of Scope

- OpenAI API calls
- restaurant delivery integrations
- auth
- database
- nutrition or medical claims
- payment, ordering, or delivery tracking
- MCP or Swiggy/Zomato integration

## Acceptance Criteria

- [x] User can complete the full flow locally with dummy data.
- [x] Screens are product-specific, not chatbot-style.
- [x] One primary recommendation appears before backup options.
- [x] Backup options are hidden until requested.
- [x] Recommendation cards show reasons and tradeoffs.
- [x] Feedback can be submitted or skipped in local component state.
- [x] Fallback states exist for vague craving, low budget, high regret risk, and no strong match.
- [x] No live integrations or secrets are introduced.
- [x] Six named personas are visible.
- [x] Weekday Rush mode includes dummy ETA, delivery reliability, and meeting-safe logic.
- [x] Local static utilities exist for craving interpretation, recommendation scoring, feedback classification, and insights.

## Verification

- `npm install`: passed.
- `npm run build`: passed after rerunning outside sandbox because the first sandboxed build hit a Windows `.next` rename permission error.
- `npm run lint`: passed using `tsc --noEmit`.
- `npm audit --json`: zero vulnerabilities reported after upgrading to Next 16.2.6 / React 19.2.6.
- v1.2 update: `npm run lint` passed; `npm run build` passed after rerunning outside sandbox due to Windows `.next` permission cleanup.

## Product Decisions

- Kept CraveWise as a decision layer, not a delivery/search feed.
- Led with one confident recommendation and placed backups behind an explicit "Not feeling this?" path.
- Made sample data visible in UI copy so the prototype does not imply live restaurant availability.
- Added Weekday Rush as a static mode, but kept it dummy-only and explicitly not real-time availability.
- Treated personas as simulation profiles, not permanent user buckets.
- Upgraded the UI to feel warm, premium, calm, confident, personal, and mobile-first.
- Kept one screen focused on one user decision and made the recommendation screen the visual hero.
- Strengthened visual hierarchy so CraveWise feels like a calm food-intelligent decision assistant, not a restaurant grid or discount marketplace.

## Technical Decisions

- Used a minimal Next App Router + TypeScript app with plain CSS.
- Did not add Tailwind or shadcn yet to avoid extra setup during the static prototype.
- Kept data local in `apps/cravewise/data/sampleData.ts`.
- Added deterministic local functions instead of AI calls: `interpretCravingStatic`, `scoreRecommendationStatic`, `classifyFeedbackStatic`, and `generateInsightsStatic`.
- Componentized the static prototype in `apps/cravewise/app/page.tsx` with product-level components such as `MobileShell`, `ProgressStepper`, `PersonaCard`, `TasteMemoryPanel`, `CravingInputPanel`, `RecommendationHeroCard`, feedback controls, and insight cards.
- Normalized visible price copy to `Rs.` strings to avoid symbol encoding issues in the static prototype.

## Status

REVIEW

