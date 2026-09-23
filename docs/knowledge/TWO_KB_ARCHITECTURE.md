# Two Knowledge Bases: Makar + ALINA Agent Factory

## Core idea

We deliberately separate two systems.

### KB-1 — Makar Professional Knowledge Base

Answers:

**What must Makar know and be able to do?**

Contains stable professional knowledge, skill state, patterns, anti-patterns, tools, evidence and project overlays.

### KB-2 — ALINA Agent Knowledge Delivery Base

Answers:

**How does ALINA decide what Makar needs right now and how should she deliver it?**

Contains agent passports, context composition rules, retrieval priorities, delivery formats, handoff contracts, traceability and learning loops.

---

## Why they must not be merged

If both are mixed into one store:

- role knowledge becomes polluted by temporary tasks;
- ALINA cannot measure whether missing knowledge or poor delivery caused a failure;
- every agent becomes a pile of prompts;
- project changes destroy reuse;
- personalization becomes hard to reason about.

Keeping the two bases separate creates a clean causal model:

```text
Agent capability problem?
→ improve KB-1

Context / briefing problem?
→ improve KB-2
```

---

## Relationship

```text
                         ┌────────────────────┐
                         │      ALINA         │
                         │   Agent Factory    │
                         └─────────┬──────────┘
                                   │
                      reads agent state + task
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │ KB-2 Context / Delivery  │
                    └────────────┬─────────────┘
                                 │ selects
                                 ▼
                    ┌──────────────────────────┐
                    │ KB-1 Makar Knowledge     │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                        Context Package
                                 │
                                 ▼
                               Makar
                                 │
                                 ▼
                      Code / UI / Test / Result
                                 │
                                 ▼
                    Feedback + Evidence + Lessons
                          ↙                 ↘
                    update KB-1         update KB-2
```

---

## First product experiment

Makar Frontend Factory is the first laboratory.

Every future Makar issue should eventually be generated with:
- task;
- context;
- knowledge pack;
- acceptance contract;
- result / lesson.

This repo therefore serves two purposes:

1. build ALINA Frontend;
2. validate ALINA's future Agent Factory on a real specialist.
