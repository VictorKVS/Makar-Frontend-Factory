# ALINA v1 — Scene Grammar

## Product principle

**An ALINA screen is a composition of planes and modules for the current task, not a fixed dashboard.**

The product shell has seven planes. A plane is a semantic layer with an owning engine; it is not necessarily a DOM layer or a fixed z-index.

## Seven planes

| Plane | Purpose | Primary owner | Examples |
|---|---|---|---|
| Background / Environment | ambient depth and scene context | Scene Engine | gradient, room, grid, subtle particles |
| Navigation | stable product orientation | UI + Workspace | global sections, project switcher |
| Primary Work | current user task | Workspace + Composition | document, graph, editor, visualization |
| Secondary Context | supporting information | Workspace + Streams | sources, properties, agent notes |
| Avatar / Presence | ALINA presence and communication | Avatar Engine | compact, portrait, hologram, voice-only |
| Command | user intent entry | Input Engine + UI | command bar, shortcuts, voice trigger |
| Alert / Overlay | interruption and transient focus | Stream Engine + Composition | critical alert, modal, confirmation |

## Ownership rule

A plane can consume other engines, but it has one primary owner. This prevents the product shell from becoming a monolithic coordinator.

## Module map

### Navigation plane
Existing capabilities:
- `NavigationItem`
- shared design tokens
- Workspace regions
- semantic input actions

New product requirements:
- project/workspace switcher;
- global product identity;
- compact/narrow navigation mode.

### Primary Work plane
Existing capabilities:
- Workspace Engine panel registry and focus;
- Visualization Engine representations;
- Composition Engine primary-module selection.

New product requirements:
- product modules for document, code, investigation and security canvases.

### Secondary Context plane
Existing capabilities:
- docked/floating panels;
- Stream Engine ranking;
- collapsible surfaces.

New product requirements:
- context inspector;
- source stack;
- agent commentary surface.

### Avatar plane
Existing capabilities:
- Avatar Engine identity/state;
- renderer capability negotiation;
- Scene Engine asset/presentation tiers.

New product requirement:
- production ALINA asset set.

### Command plane
Existing capabilities:
- CommandBar;
- Input Engine semantic actions;
- keyboard/voice/gamepad-ready mapping.

New product requirements:
- command history;
- agent/task targeting;
- contextual suggestions.

### Alert plane
Existing capabilities:
- Stream interruption policy;
- Composition reason trace;
- overlays and badges.

New product requirements:
- product severity vocabulary;
- acknowledgement audit surface.

## Scene invariants

1. Exactly one primary work context is visually dominant.
2. Secondary context can collapse without destroying state.
3. Background agent work never replaces the user task.
4. Critical alerts may interrupt only through Stream policy.
5. ALINA can move or disappear without losing identity/task state.
6. Cinematic scene layers can be removed while preserving product meaning.
7. Composition decisions expose reason tags.
