# composition-engine

Orchestrates the visible experience for the current task.

## Purpose

The previous engines answer separate questions:

- Workspace Engine — where modules can live;
- Stream Engine — what deserves attention;
- Visualization Engine — how information may be represented;
- Avatar Engine — how the persona may be presented.

Composition Engine combines those decisions into one inspectable **Composition Plan**.

## Scenarios v0

- research;
- coding;
- security;
- presentation;
- focus.

## Output

A plan contains:

- primary module;
- visible/collapsed modules;
- regions;
- visualization hints;
- avatar presence and placement;
- density;
- reason trace;
- human locks/overrides.

## Rules

1. Renderer- and React-independent.
2. Deterministic and serializable.
3. Human overrides are explicit and locked.
4. Alerts can modify attention without silently replacing the user's primary task.
5. Performance/accessibility may downgrade presentation without changing domain state.
6. Avatar visibility is optional.
7. Every automatic decision should be explainable through `reasons`.

This package is the first layer that turns ALINA's separate frontend laboratories into an adaptive interface.
