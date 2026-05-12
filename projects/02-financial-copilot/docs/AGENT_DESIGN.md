# Agent Design: AI Financial Copilot

## Principle

Agents are not the product. Agents are internal modules used where reasoning, memory, tool-use, or stakeholder simulation improves the workflow.

## Initial Agents

### Offer Parser Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Fee & Risk Explainer Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Comparison Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Scenario Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Trust & Guardrail Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n

## Agent Guardrails

- Keep each agent narrow.
- Do not expose chain-of-thought.
- Return structured outputs.
- Validate output.
- Show user-facing explanation, not hidden reasoning.
- Add evals before expanding autonomy.
