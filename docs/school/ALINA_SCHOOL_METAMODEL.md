# ALINA School v0 — Metamodel

## Purpose

ALINA School is a computable learning system for producing verified digital specialists.

It is not a document folder and not merely a RAG corpus.

The design starts from the graduate standard and works backwards.

```text
Graduate Standard
  ↓ requires
Competencies
  ↓ consist of
Skills
  ↓ require
Knowledge
  ↓ taught by
Curriculum
  ↓ practiced by
Exercise / Lab / Project
  ↓ verified by
Assessment
  ↓ produces
Evidence
  ↓ updates
Mastery
```

## Five connected graphs

### Graduate Graph
Defines what a finished specialist must demonstrate.

### Knowledge Graph
Defines concepts, facts, tools, patterns and anti-patterns that must be known.

### Skill Graph
Defines what the student must be able to execute.

### Curriculum Graph
Defines teaching order, prerequisites, lessons, exercises, labs and projects.

### Evidence Graph
Defines why the school believes a capability has been mastered.

The implementation may store these in one physical graph while keeping the semantics separate.

## Student state

A student's state is not stored by rewriting professional knowledge.

Student state is a separate set of mastery records:

```text
student + node + K-level + confidence + evidence refs
```

This lets the same school teach multiple students without duplicating the curriculum.

## Mastery scale

- K0 — unknown
- K1 — recognized / exposed
- K2 — explained / understood
- K3 — applied with guidance
- K4 — applied independently
- K5 — reusable pattern created
- K6 — can review and improve another solution

Reading can support K1. It cannot prove independent execution.

## Adaptive learning

ALINA School diagnoses current mastery before assigning material.

- mastery at or above target with strong confidence → skip;
- partial relevant mastery → shortened path;
- missing/weak mastery → full path.

The path includes prerequisites recursively.

## Graduation

Graduation is not an average alone.

A graduate must satisfy:

1. weighted readiness threshold;
2. all critical requirements;
3. minimum confidence;
4. evidence policy.

This prevents a high average from hiding a missing critical competence.

## First reference student

Makar is the first reference student and first graduate profile.

The next phase is to populate his curriculum against this metamodel, not to add new specialist roles yet.
