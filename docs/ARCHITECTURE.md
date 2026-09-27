# Architecture

## Top-level model

```text
Applications
  ├─ ALINA Control Center
  ├─ BOOK-CRAFT
  ├─ future FATHER apps
  └─ future games / simulations
       │
Shared Platform
  ├─ Visual Production Layer
  │    ├─ Design Tokens
  │    ├─ Design Handoff Contract
  │    ├─ Asset Registry
  │    ├─ Theme Engine
  │    ├─ Motion System
  │    └─ Visual QA
  ├─ UI
  ├─ Workspace Engine
  ├─ Stream Engine
  ├─ Visualization Engine
  ├─ Avatar Engine
  ├─ Composition Engine
  ├─ Input Engine
  ├─ Scene Engine
  └─ Game Core
```

## Visual Production Layer

The Visual Production Layer is a first-class part of Makar's architecture.

It converts visual direction into an executable, testable frontend contract:

```text
Visual idea / client brief
        ↓
Figma MASTER
        ↓
Desktop / Tablet / Phone
        ↓
Typed Visual Production Handoff
        ↓
Asset Registry + Theme Registry
        ↓
Component Map + Motion Spec
        ↓
Frontend implementation
        ↓
Visual QA + performance evidence
```

Figma is the visual source of truth.
Frontend code is the executable source of truth.
The handoff contract is the typed bridge between them.

The generic contract is defined by:

`schemas/visual-production-handoff.schema.json`

Project-specific design packs may extend the data around this contract, but must not replace the generic architecture.

## Typical solution promotion rule

When a project experiment produces a reusable solution, Makar must decide whether it is:

1. project-specific;
2. reusable pattern;
3. shared architectural primitive.

If the solution is generic across future projects, it must be promoted immediately into:
- architecture;
- schema/contract where applicable;
- Makar KB;
- tests/acceptance rules.

Do not leave a generic capability buried only inside one project folder.

Examples of promoted architectural primitives:
- three-breakpoint design handoff;
- stable asset IDs;
- typed design-to-code contract;
- theme registry;
- motion ownership;
- visual QA baseline.

## Dependency rule

Applications may depend on shared packages. Shared packages must not depend on application-specific code.

`game-core` may depend on stable lower-level primitives such as input, scene and UI contracts, but ALINA must not depend on `game-core`.

The Visual Production Layer may define contracts consumed by applications and shared packages, but must not contain BOOK-CRAFT- or ALINA-specific business logic.

## State philosophy

Keep domain state separate from presentation state.

Examples:
- "document analysis finished" is domain state;
- "show result panel expanded" is presentation state;
- "ALINA is speaking" is avatar presentation state derived from interaction state;
- "July theme is active" is presentation/theme state, not business state.

## Performance tiers

1. **Core** — functional UI, no heavy effects.
2. **Enhanced** — motion, blur, particles and richer transitions.
3. **Cinematic** — WebGL/3D/high-fidelity scene where hardware allows.

The application must remain useful in Core mode.

## Agent execution rule

Before Makar implements a high-end visual screen, the context package should include, when applicable:

- task card;
- approved visual reference / MASTER;
- visual production handoff;
- component map;
- asset registry;
- theme registry;
- motion spec;
- responsive rules;
- acceptance criteria;
- visual QA baseline;
- performance budget.

Missing required visual-contract data is a context-quality problem, not a reason for Makar to invent major design decisions.
