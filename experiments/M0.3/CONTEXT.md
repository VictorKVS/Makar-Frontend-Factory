# M0.3 — Project Context

Project: **ALINA Control Center**

## Current foundation

- M0.1 Design Tokens implemented.
- M0.2 UI Primitives implemented and Visual QA proven.
- ALINA Agent Factory Experiment 001 showed that operational repository context must be explicit.
- `projects/alina/repository-contract.json` is now mandatory input.

## Architectural decisions

- workspace state is presentation state;
- domain data remains outside the layout model;
- panel identity is stable and serializable;
- ALINA application decides which concrete component renders a panel content type;
- shared Workspace Engine must remain ALINA-agnostic;
- responsive transformations are explicit, not accidental CSS side effects.

## Current target

Replace the static mental model of a page with a serializable workspace containing modules that can change mode without losing identity.
