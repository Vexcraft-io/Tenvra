# ProjectZero / Tenvra — Agent Context

This folder contains local agent context for the Tenvra project.
It is loaded by Hermes and other compatible agents working in this repo.

## Project Identity
- **Name:** Tenvra
- **Repo:** https://github.com/Vexcraft-io/Tenvra
- **Local path:** `C:\Users\mikae\Documents\ProjectZero`
- **Phase:** 0–1 (Foundation / Validation)

## Key Files
- `user.md` — how the agent should work and communicate
- `memory.md` — stable project facts and lessons learned
- `.hermes/model-orchestration.md` — provider split and subagent strategy

## Quality Gates
Before reporting any code change as done, run:
```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Communication
- Chat in Swedish
- Code, commits, and technical artifacts in English when that fits repo conventions
- Status reports: **klart**, **pågår**, **nästa steg**, **risker/blockerare**
