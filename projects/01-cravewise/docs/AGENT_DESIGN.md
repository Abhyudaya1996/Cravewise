# Agent Design: CraveWise

## Principle

Agents are not the product. Agents are internal modules used where reasoning, memory, tool-use, or stakeholder simulation improves the workflow.

## Initial Agents

### Context Interpreter
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Preference Profiler
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Recommendation Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Regret Prediction Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Feedback Learning Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n
### Insights Agent
- Responsibility: define a narrow job.\n- Input: typed context.\n- Output: validated structured object.\n- Failure mode: define fallback behavior.\n

## Agent Guardrails

- Keep each agent narrow.
- Do not expose chain-of-thought.
- Return structured outputs.
- Validate output.
- Show user-facing explanation, not hidden reasoning.
- Add evals before expanding autonomy.
