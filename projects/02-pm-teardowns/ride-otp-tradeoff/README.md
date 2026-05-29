# Reusable OTP vs Fresh Ride PIN

Status: draft

## Case Study Title

Reusable OTP vs Fresh Ride PIN: A PM Teardown of Pickup Speed, Trust, and Real Risk

## Core Thesis

A reusable ride OTP is not automatically bad product design. In ride-hailing, the OTP starts an already assigned trip rather than authorizing account access or money movement. If surrounding controls are strong, reusable OTP can reduce pickup friction with limited incremental risk. The PM question is whether fresh ride-level verification reduces enough real risk to justify added cognitive and operational friction.

## Assumptions

- Rapido-style reusable/static ride OTP behavior is framed as observed by users and commonly discussed behavior, not confirmed internal strategy.
- Uber's public Verify Your Ride documentation is used as the fresh ride-level PIN reference model.
- Uber's fresh PIN model is treated as an opt-in public product behavior, not as evidence of Uber's internal risk calculations.
- The analysis treats ride OTP as a pickup verification control, not as a full ride-safety system.
- The strongest evidence still needed is marketplace-level incident data: ghost ride/fake-start complaints, OTP-related support tickets, cancellation impact, driver wait-time impact, dispute resolution outcomes, and repeat-offender patterns.

## Sources To Verify

- Uber Help: "What is Verify Your Trip?" / "Verify Your Ride" documentation describing a unique 4-digit PIN whenever a ride is requested, with every-ride or night-only settings.
- Public user reports or discussions describing reusable/static ride OTP behavior in Rapido-style flows.
- Any official Rapido documentation, if available, that confirms or clarifies ride OTP behavior.
- Safety-control documentation for ride-hailing products: SOS, live trip sharing, route deviation alerts, vehicle/driver verification, and emergency escalation.
