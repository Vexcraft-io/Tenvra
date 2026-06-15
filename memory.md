# memory.md

## Projektidentitet
- Projektet är **Tenvra** i arbetskatalogen `ProjectZero`.
- Tenvra är ett europeiskt först-initierat AI-projekt med fokus på suveränitet, öppen utveckling och verifierbara bidrag.
- Repositoriet är ett pnpm-monorepo med Next.js-webb, TypeScript-koordinator, Go compute-klient, Python-verifierare, delade paket och infrastruktur.

## Produkt- och leveranskontext
- Projektet befinner sig i praktiken i **Phase 0–1**: foundation och validation.
- Webb, interest capture och operatorflöden finns lokalt; produktionstjänster och operativ launch-gate återstår.
- Arkitekturen är medvetet uppdelad mellan webb, coordinator, verifiering, compute och data/infrastruktur.

## Tekniska grundregler
- Europeisk dataresidens och leverantörsoberoende är kärnkrav, inte kosmetik.
- Produktionsdata och kritisk drift ska hållas inom EU/EEA när lösningen går till produktion.
- Projektet ska inte bygga på live-träning på användarprompter.
- Verifierbart arbete, tydliga kontrakt och reproducerbara flöden är viktigare än snabb men okontrollerad iteration.

## Repo- och kvalitetskonventioner
- Standardverifiering i repo: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
- Ytterligare domänkontroller finns för contracts och Supabase när relevant.
- GitHub-flöden, issues och PRs hanteras via `gh` CLI när möjligt.

## Hermes-/arbetskontext för projektet
- Projektet använder och tjänar på multi-provider-orkestrering snarare än en enda modell för allt.
- Subagenter är en förstaklassmetod för att dela upp research, implementation och review.
- Projektets lokala agentkontext ska hållas i synk mellan repo-filer, skills och persistent memory.

## Hårdvunna lärdomar
- Större dependency-uppdateringar ska verifieras lokalt innan merge, särskilt när flera Dependabot-PRs överlappar.
- ESLint-majorer måste kontrolleras mot Next.js- och React-lintkedjans faktiska kompatibilitet innan de accepteras.
- TypeScript-majorer kan kräva små kompatibilitetsjusteringar i tsconfig även när applikationskoden i övrigt är korrekt.
- DCO-signoff krävs för alla commits; Dependabot-PRs måste cherry-pickas om de saknar signoff.

## Senaste repo-status (2026-06-15)
- PR #17 (docs) — mergad
- PR #18 (safe deps) — mergad
- PR #19 (risky deps replacement, utan ESLint 10) — mergad
- PR #7 (ESLint 10) — öppen, blockerad av kompatibilitetsproblem
- PR #20 (vitest bump) — öppen, kan granskas
- Branch `chore/dependency-updates-risky` — innehåller nu även `user.md`, `memory.md`, `.hermes/`
