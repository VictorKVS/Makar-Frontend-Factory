# M0.4 — Project Context

M0.1–M0.3 are now merged.

ALINA currently has:
- semantic design tokens;
- reusable UI primitives;
- visual QA;
- a serializable Workspace Engine;
- Agent Factory Context Composer;
- Repository Contract.

M0.4 adds the semantic layer that decides **what deserves attention** before Workspace/UI decide where and how to render it.

## Boundary

Stream Engine owns:
- semantic class;
- priority;
- lifecycle;
- acknowledgement;
- interruption decision;
- ranked selection.

It does **not** own:
- React rendering;
- panel geometry;
- domain payloads;
- ALINA-specific business rules.

Workspace Engine may consume stream selections, but Stream Engine does not depend on Workspace Engine.
