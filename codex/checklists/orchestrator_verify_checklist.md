# Orchestrator Verify Checklist

Before accepting an LLM task:

- [ ] Scope matches the prompt.
- [ ] No unrelated files changed.
- [ ] No secrets were added.
- [ ] No unnecessary dependencies were added.
- [ ] Build/lint/test result is reported when code changed.
- [ ] AI outputs are structured and validated where relevant.
- [ ] Unsafe advice paths have guardrails where relevant.
- [ ] Root milestone tracker was updated.
- [ ] Project milestone tracker was updated.
- [ ] `.ai/memory/session-handoff-current.md` was updated.
- [ ] Feature memory was updated if one exists.
- [ ] Learning log was updated.
- [ ] Case study notes were updated for meaningful product decisions.
