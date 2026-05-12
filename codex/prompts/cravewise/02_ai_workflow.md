# CraveWise Prompt 02: AI Recommendation Workflow

Goal:
Add AI-powered structured food recommendations.

Context:
Use CraveWise docs and existing static UI.

Constraints:
- Use structured output.
- Validate with Zod.
- Return exactly 3 recommendations.
- Add fallback mock recommendations.
- Avoid medical/nutrition certainty.
- Do not expose chain-of-thought.

Done when:
The recommendations page can call an API route and render validated AI-generated recommendations.
