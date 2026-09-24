# M1.1 — Context

## Product state

M0.1–M0.10 are complete. The project has reusable engines for tokens, UI, workspace, streams, visualization, avatar, composition, input, scene/assets and visual QA.

M1.0 introduced ALINA Agent Factory v0. M1.1 is the first real product task provisioned through it.

## Architecture constraints

- Screen = composition of modules.
- Workspace owns placement, not domain data.
- Stream Engine owns semantic attention priority.
- Visualization chooses representation from information intent.
- Avatar identity/state survives renderer changes.
- Composition combines engines but does not absorb their responsibilities.
- Scene owns cinematic presentation and fallback tiers.
- Input maps devices to semantic actions.
- Visual QA defines acceptance evidence.

## Repository execution

Use the current pnpm monorepo, CI, Playwright visual QA and `quality-budget.json`.

## Product transition

Engineering Labs remain available behind diagnostics/development surfaces. They are not the default ALINA v1 homepage.
