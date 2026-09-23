# Architecture

## Top-level model

```text
Applications
  ├─ ALINA Control Center
  ├─ future FATHER apps
  └─ future games / simulations
       │
Shared Platform
  ├─ Design Tokens
  ├─ UI
  ├─ Workspace Engine
  ├─ Stream Engine
  ├─ Visualization Engine
  ├─ Avatar Engine
  ├─ Composition Engine
  ├─ Input Engine
  ├─ Scene Engine
  ├─ Visual QA
  └─ Game Core
```

## Dependency rule

Applications may depend on shared packages. Shared packages must not depend on application-specific code.

`game-core` may depend on stable lower-level primitives such as input, scene and UI contracts, but ALINA must not depend on `game-core`.

## State philosophy

Keep domain state separate from presentation state.

Examples:
- "document analysis finished" is domain state;
- "show result panel expanded" is presentation state;
- "ALINA is speaking" is avatar presentation state derived from interaction state.

## Performance tiers

1. **Core** — functional UI, no heavy effects.
2. **Enhanced** — motion, blur, particles and richer transitions.
3. **Cinematic** — WebGL/3D/high-fidelity scene where hardware allows.

The application must remain useful in Core mode.
