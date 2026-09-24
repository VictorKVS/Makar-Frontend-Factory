# M0.6 — ALINA Context Package

**Agent:** Makar  
**Experiment:** 005  
**Task:** Avatar Engine v0

## Goal

Build a renderer-independent Avatar Engine where ALINA's identity and behavioral state survive changes in presentation mode, placement and renderer capability.

## Why

ALINA cannot be a hard-coded hologram in the middle of one page. She must be the same persona when presented as compact assistant, portrait, full body, hologram, voice-only or hidden.

## Hard constraints

1. Identity/state is independent from renderer.
2. Presentation mode changes must not destroy task, context or attention state.
3. Core package must not depend on React, Three.js, WebGL, TTS or ALINA application code.
4. Reduced-motion is a renderer negotiation input, not a separate persona.
5. 3D is optional; comprehension must survive fallback to 2D/voice-only/hidden.
6. State and renderer negotiation must be serializable/inspectable.
7. Simulated behavior in the UI must be explicitly marked DEMO.

## Change impact

M0.5 exposed stale UI assertions after a top-level identity change. For M0.6 inspect:
- `apps/alina-control-center/src/App.tsx`;
- `App.test.tsx`;
- `visual-tests/lab.visual.spec.ts`;
- app workspace dependencies;
- old avatar placeholder assumptions.

Do not leave obsolete "Avatar Engine slot" assertions after replacing the placeholder.

## Acceptance

- typed `@father/avatar-engine`;
- deterministic mode/state transitions;
- capability negotiation with fallback;
- serialization;
- unit tests;
- live ALINA Avatar Stage;
- state survives mode changes in the UI;
- reduced-motion path remains usable;
- visual QA at laptop / desktop / ultrawide;
- RESULT.md records Experiment 005.
