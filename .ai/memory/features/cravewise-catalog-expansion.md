# Feature Memory: CraveWise Catalog Expansion

## Project

CraveWise

## Milestone

Milestone 4B: Catalog expansion.

## Goal

Expand the static dummy catalog so local recommendation scoring and browser-only feedback memory have enough alternatives to show meaningful differentiation.

## Scope

- Expanded `menuCatalog` from 9 to 30 dummy items.
- Preserved key regression anchors:
  - Thin Crust Veggie Pizza from Slice Street
  - Chilli Garlic Noodles from Urban Wok House
  - Classic Chicken Burrito from Baja Bowl Co.
- Added coverage for pizza/Italian, Mexican/burrito, North Indian, Asian/Chinese, South Indian, healthy/light, fried/oily regret-prone, group-safe, and Weekday Rush scenarios.
- Added a medium-risk oily fried snack so Abhyudaya's `too_oily` feedback can visibly move the primary recommendation to a lower-oil spicy alternative.
- Updated eval documentation, project state, milestone tracker, README, session handoff, and learning log.

## Out Of Scope

- No AI API.
- No backend.
- No database.
- No MCP.
- No Supabase.
- No auth.
- No live restaurant integrations.
- No ordering, payment, delivery tracking, or real availability claims.

## Product Decisions

- Keep the catalog static and clearly dummy.
- Use category diversity to expose scoring behavior before adding AI interpretation.
- Preserve explicit craving priority and local feedback memory rules.
- Do not expand UI or app flow in this milestone.

## Verification

- Catalog count is 30.
- Simran pizza regression still returns Thin Crust Veggie Pizza.
- Abhyudaya `too_oily` memory changes `spicy fried snack late night` from Schezwan Fried Momos to Chilli Garlic Noodles.
- Kushagra Weekday Rush Mexican test still prefers Classic Chicken Burrito, with Veggie Burrito Bowl as a strong fast/reliable alternative.
- Piyush cheap pizza deal avoids high-regret deal-trap items as primary.
- Pransih group-safe flow prefers broad-appeal group options.

## Status

IMPLEMENTED
