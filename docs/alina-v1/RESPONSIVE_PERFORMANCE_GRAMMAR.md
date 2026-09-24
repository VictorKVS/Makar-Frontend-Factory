# ALINA v1 — Responsive & Performance Grammar

## Responsive grammar

### Narrow / tablet

- one primary work plane visible;
- navigation collapses;
- secondary context becomes drawer/sheet;
- avatar becomes compact, portrait, voice-only or hidden;
- command plane remains reachable;
- alerts overlay without permanently stealing layout space.

### Laptop

- navigation + primary work + one bounded context surface;
- avatar compact/bust;
- secondary streams collapsed by default;
- command plane persistent.

### Desktop

- navigation + primary + secondary context;
- optional avatar plane;
- multiple visual modules allowed inside the attention budget.

### Ultrawide

- primary work remains dominant;
- secondary context may split into multiple regions;
- avatar may occupy an independent presence zone;
- extra width must not turn every stream into a high-prominence panel.

## Performance grammar

### Core

- no WebGL requirement;
- static/2D avatar fallback;
- minimal motion;
- essential workspace, streams, command and alerts fully functional;
- primary task meaning preserved.

### Enhanced

- motion and richer transitions;
- 2.5D depth;
- richer avatar presentation;
- additional scene/environment layers;
- still fully understandable without cinematic effects.

### Cinematic

- optional 3D/WebGL avatar/environment;
- particles, spatial depth and richer lighting where budget allows;
- never changes the truth/meaning of the underlying information;
- must degrade to Enhanced/Core through deterministic capability negotiation.

## Acceptance rule

A feature is not part of ALINA v1 if its Core fallback cannot complete the user task.
