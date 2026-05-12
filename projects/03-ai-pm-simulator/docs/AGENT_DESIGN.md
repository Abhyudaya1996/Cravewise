# Agent Design: AI PM Simulator

## Principle

Agents are not the product. Agents are internal modules used where reasoning, memory, tool-use, or stakeholder simulation improves the workflow.

## Initial Agents

### CEO Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Engineer Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Designer Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### User Research Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Data Analyst Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### PM Coach Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Scoring Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n

## Agent Guardrails

- Keep each agent narrow.
- Do not expose chain-of-thought.
- Return structured outputs.
- Validate output.
- Show user-facing explanation, not hidden reasoning.
- Add evals before expanding autonomy.
