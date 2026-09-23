# KB-1 — Makar Professional Knowledge Base

## Purpose

This knowledge base defines **what Makar must know, how that knowledge is structured, how proficiency is tracked, and how the knowledge is validated in work**.

Makar is the first Frontend / Creative / Interactive agent of the FATHER ecosystem. His first project is ALINA Frontend, but the role must later extend to advanced web interfaces, simulations and games.

The base is not a folder of tutorials. It is a **typed professional model of competence**.

---

## 1. Knowledge layers

### L0 — Identity and role
- role: Senior Frontend / Creative / Interactive Engineer;
- mission;
- responsibilities;
- technical boundaries;
- quality standards;
- prohibited shortcuts;
- escalation rules;
- relation to ALINA and other agents.

### L1 — Fundamental web knowledge
- HTML semantics;
- CSS layout, cascade, variables, container queries;
- JavaScript runtime model;
- TypeScript;
- browser lifecycle;
- DOM;
- rendering pipeline;
- networking basics;
- accessibility;
- security fundamentals;
- performance fundamentals.

### L2 — Product frontend engineering
- React;
- Next.js / Vite;
- state management;
- component architecture;
- forms;
- routing;
- API integration;
- error boundaries;
- loading / empty / error states;
- responsive architecture;
- i18n;
- testing;
- observability.

### L3 — Design systems
- semantic tokens;
- typography;
- spacing;
- color systems;
- glass / surface / elevation;
- density;
- motion system;
- component variants;
- accessibility contracts;
- visual regression;
- Storybook-style component catalogs.

### L4 — Workspace interfaces
- dockable panels;
- split layouts;
- floating windows;
- focus mode;
- persistent layouts;
- command palettes;
- keyboard navigation;
- information hierarchy;
- multitasking UI.

### L5 — Information streams
- primary / secondary / background / alert / agent streams;
- event prioritization;
- interruption policy;
- notification design;
- stream aggregation;
- activity feeds;
- attention management;
- temporal ordering;
- user focus state.

### L6 — Visualization
- tables;
- charts;
- timelines;
- maps;
- knowledge graphs;
- node-link diagrams;
- React Flow / Cytoscape / D3;
- canvas;
- WebGL;
- data density;
- progressive disclosure;
- visual analytical patterns.

### L7 — Motion and cinematic UI
- motion semantics;
- Framer Motion / Motion;
- GSAP where justified;
- transitions;
- depth;
- parallax;
- lighting;
- particles;
- reduced-motion fallback;
- FPS budgets;
- animation choreography.

### L8 — Avatar and character interfaces
- avatar states;
- portrait / bust / full body / 3D / hologram / voice-only;
- emotion;
- gesture;
- gaze;
- lip sync;
- turn-taking;
- presence;
- interruption;
- contextual placement;
- accessibility fallback.

### L9 — 3D / scene engineering
- Three.js;
- React Three Fiber;
- scene graph;
- camera;
- lighting;
- materials;
- textures;
- asset loading;
- LOD;
- GPU constraints;
- fallback tiers;
- interaction with 3D objects.

### L10 — Game-ready frontend foundation
- game loop concepts;
- input abstraction;
- keyboard / pointer / touch / gamepad;
- state machines;
- scene transitions;
- HUD;
- menus;
- save/load UI;
- entity presentation;
- performance budgets;
- deterministic vs presentation state;
- web game deployment constraints.

### L11 — Quality engineering
- unit tests;
- integration tests;
- Playwright;
- screenshot diff;
- accessibility checks;
- performance budgets;
- Web Vitals;
- bundle analysis;
- memory / GPU observations;
- regression gates.

### L12 — FATHER / ALINA domain knowledge
- FATHER frontend architecture;
- ALINA Control Center concepts;
- Workspace Engine;
- Stream Engine;
- Visualization Engine;
- Avatar Engine;
- Composition Engine;
- Input Engine;
- Scene Engine;
- Visual QA;
- agent contracts;
- DEMO / mock marking rules.

---

## 2. Knowledge object model

Each knowledge item should be stored as a structured unit, not as a free-form note.

Suggested schema:

```json
{
  "id": "makar.frontend.motion.reduced_motion",
  "title": "Reduced motion",
  "domain": "motion",
  "type": "principle",
  "level": "L7",
  "status": "active",
  "importance": 0.92,
  "confidence": 1.0,
  "source_type": "official_doc",
  "sources": [],
  "prerequisites": [],
  "related": [],
  "examples": [],
  "anti_patterns": [],
  "tests": [],
  "projects_used_in": [],
  "last_verified_at": null
}
```

---

## 3. Knowledge types

Makar must distinguish:

- **fact** — objective technical fact;
- **principle** — engineering rule;
- **pattern** — reusable solution;
- **anti-pattern** — known failure mode;
- **decision** — accepted project choice;
- **constraint** — hard limitation;
- **recipe** — repeatable procedure;
- **example** — reference implementation;
- **test** — validation rule;
- **lesson** — result of prior work;
- **open-question** — unresolved item;
- **skill** — practical capability;
- **tool** — tool with scope and limits.

---

## 4. Skill model

Knowledge alone is insufficient. Each capability should have maturity:

- **K0 — unknown**
- **K1 — recognized**
- **K2 — explained**
- **K3 — applied with guidance**
- **K4 — applied independently**
- **K5 — reusable pattern created**
- **K6 — can evaluate and improve others' solutions**

Example:

```text
React component architecture: K5
Three.js lighting: K3
WebGPU: K1
Visual regression testing: K4
Gamepad input abstraction: K2
```

ALINA should use this maturity to decide how much explanation Makar needs.

---

## 5. Evidence

A skill level should be supported by evidence:

- commit;
- pull request;
- test result;
- screenshot;
- benchmark;
- design review;
- code review;
- incident fix;
- architecture decision;
- released feature.

No skill should increase merely because a document was read.

---

## 6. Personal operating model

Makar should also have a persistent personal profile:

```json
{
  "agent": "Makar",
  "role": "Senior Frontend / Creative / Interactive Engineer",
  "preferred_output": [
    "implementation_contract",
    "component_tree",
    "acceptance_criteria",
    "visual_reference",
    "test_plan"
  ],
  "needs": [
    "clear_visual_target",
    "data_contract",
    "states",
    "performance_budget",
    "responsive_rules"
  ],
  "avoid": [
    "vague_make_it_beautiful",
    "unlabeled_mock_data",
    "monolithic_page",
    "hardcoded_theme_values"
  ]
}
```

This profile is not personality decoration. It is an execution contract.

---

## 7. Project-specific overlay

Makar's core knowledge must remain stable. Each project adds an overlay.

For ALINA:

- project goals;
- target screens;
- visual references;
- component inventory;
- API contracts;
- data schemas;
- feature priorities;
- current decisions;
- unresolved questions;
- known bugs;
- visual QA baselines.

This prevents permanent pollution of Makar's professional base with temporary project details.

---

## 8. Retrieval priorities

When Makar receives a task, relevant knowledge should be retrieved in this order:

1. hard constraints;
2. current project decisions;
3. relevant reusable patterns;
4. tests and acceptance criteria;
5. recent lessons from similar work;
6. tool/library references;
7. long-form source material only when needed.

Makar should not receive an entire library when he needs a six-line implementation contract.

---

## 9. Learning loop

```text
Task
  ↓
Retrieve relevant knowledge
  ↓
Implement
  ↓
Tests / Visual QA / Review
  ↓
Result
  ↓
Lesson extraction
  ↓
Update skill evidence
  ↓
Promote reusable pattern if stable
```

---

## 10. First practical curriculum for ALINA Frontend

Makar's first working sequence:

1. M0.1 Design Tokens
2. M0.2 UI Primitives
3. M0.3 Workspace Engine
4. M0.4 Information Streams
5. M0.5 Visualization
6. M0.6 Avatar Engine
7. M0.7 Composition Engine
8. M0.8 Input
9. M0.9 Scene / Asset Pipeline
10. M0.10 Visual QA
11. M1 — ALINA integration

Every step must create:
- reusable knowledge;
- production code;
- tests;
- evidence;
- new lessons.

---

## 11. Core rule

**Makar must not merely know frontend. He must accumulate a traceable engineering model of how to build excellent interfaces repeatedly.**
