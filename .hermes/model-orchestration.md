# Model Orchestration — Tenvra / ProjectZero

## Provider Roles

| Provider | Role | When to use |
|----------|------|-------------|
| **Ollama Cloud** | Implementation, coding, refactors, tests | Day-to-day feature work, low-usage preference |
| **OpenRouter** | Research, factual lookup, docs, external validation | Before implementation decisions, API/docs reading |
| **OpenAI / ChatGPT 5.5 Medium** | Review, QA, verification, risk analysis | After implementation, before merge/sign-off |

## Fallback Rule
If Ollama Cloud hits rate/session limits, continue on another available provider. Do not stall the task.

## Subagent Pattern
1. **Main agent** owns planning, synthesis, and reporting
2. **Research lane** → OpenRouter-backed subagent for facts and docs
3. **Implementation lane** → Ollama Cloud-backed subagent for code
4. **Verification lane** → OpenAI / ChatGPT 5.5 Medium for review

## Reporting
Final status should cover:
- **Klart** (done)
- **Pågår** (in progress)
- **Nästa steg** (next steps)
- **Risker/blockerare** (risks/blockers)
