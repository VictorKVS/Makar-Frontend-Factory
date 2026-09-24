# M0.7 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 006  
**Task:** Composition Engine v0

## Goal

Combine Workspace, Stream, Visualization and Avatar contracts into a deterministic, serializable and explainable interface plan.

## Why

M0.2–M0.6 intentionally separated concerns. M0.7 is the first layer that combines them without turning ALINA back into a monolithic page.

## Inherited evidence

- M0.2: shared UI and Visual QA;
- M0.3: serializable workspace;
- M0.4: semantic attention and interruption;
- M0.5: visualization intent before renderer;
- M0.6: avatar identity/state independent from renderer;
- Repository Contract;
- change-impact lesson from M0.5.

## Hard constraints

1. Core Composition Engine is React- and renderer-independent.
2. Same input must produce the same Composition Plan.
3. Plan must be serializable.
4. Every automatic decision must expose a reason trace.
5. Human overrides are explicit and locked.
6. Background information cannot silently become primary.
7. Alerts follow Stream Engine policy and do not silently replace the user task.
8. Avatar may be hidden; visible body is never mandatory.
9. Performance/accessibility can downgrade presentation without changing domain state.
10. Breakpoint adaptation is part of composition logic.

## Scenarios v0

- research;
- coding;
- security;
- presentation;
- focus.

## Change impact

M0.7 changes the top-level interaction model. Inspect:

- `App.tsx`;
- `App.test.tsx`;
- Playwright visual tests;
- previous lab visibility assumptions;
- application workspace dependencies.

Older engine labs should remain available for engineering inspection, but should no longer dominate the default page.

## Acceptance

- typed `@father/composition-engine`;
- scenario presets;
- breakpoint/performance transforms;
- human override support;
- interrupting alert handling;
- reason trace;
- serialization;
- unit tests;
- adaptive ALINA composition preview;
- old labs collapsed behind disclosure;
- responsive screenshots;
- Experiment 006 RESULT.md.
