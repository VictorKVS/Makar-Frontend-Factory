# KB-2 — ALINA Agent Knowledge Delivery Base

## Purpose

This knowledge base defines **how ALINA discovers what an agent needs, composes the right context, delivers it at the right moment, and learns from the result**.

It is the prototype for ALINA's future Agent Factory.

Makar is the first agent on which this mechanism is tested.

---

## 1. ALINA Agent Factory model

ALINA should not create an agent by giving it one giant prompt.

An agent is assembled from layers:

```text
Agent
├── Identity
├── Role Contract
├── Core Competence KB
├── Personal Skill State
├── Tool Permissions
├── Project Overlay
├── Current Task Context
├── Working Memory
├── Output Contract
├── QA Contract
└── Feedback / Learning Loop
```

For Makar:

```text
Makar
├── Senior Frontend role
├── Frontend professional KB
├── ALINA Frontend project overlay
├── current GitHub task
├── current code/branch/PR state
├── visual target
├── data contract
├── acceptance criteria
└── test + visual QA contract
```

---

## 2. What ALINA must know about every agent

Each agent needs an Agent Passport.

Suggested schema:

```json
{
  "agent_id": "makar",
  "name": "Makar",
  "role": "Senior Frontend / Creative / Interactive Engineer",
  "mission": "Build reusable high-end interfaces",
  "competence_domains": [],
  "skill_state": {},
  "tools": [],
  "permissions": [],
  "preferred_context_format": [],
  "attention_budget": {},
  "current_projects": [],
  "active_task": null,
  "known_constraints": [],
  "recent_lessons": [],
  "handoff_contracts": []
}
```

---

## 3. Context is composed, not dumped

ALINA should produce a **Context Package** for every meaningful task.

```json
{
  "task_id": "M0.2",
  "agent_id": "makar",
  "goal": "Create UI primitives",
  "why": "Build reusable visual foundation",
  "priority": "high",
  "constraints": [],
  "inputs": [],
  "knowledge_refs": [],
  "project_decisions": [],
  "data_contracts": [],
  "visual_refs": [],
  "acceptance_criteria": [],
  "test_contract": [],
  "deliverables": [],
  "dependencies": [],
  "open_questions": [],
  "output_format": {},
  "context_version": "1"
}
```

The package must be small enough to act on, but rich enough to avoid guessing.

---

## 4. Delivery layers

ALINA should deliver context in layers.

### Layer A — Task Card
Always present.

Contains:
- what to do;
- why;
- expected result;
- priority;
- deadline if real;
- blocking dependencies.

### Layer B — Execution Contract
Contains:
- required inputs;
- constraints;
- acceptance criteria;
- output format;
- QA requirements.

### Layer C — Knowledge Pack
Only relevant fragments from KB-1:
- patterns;
- examples;
- anti-patterns;
- tool guidance;
- prior lessons.

### Layer D — Project Context
- current architecture;
- active branch / issue / PR;
- current design decisions;
- relevant files;
- API/data contracts.

### Layer E — Deep Sources
Only on demand:
- official docs;
- books;
- full specifications;
- long research notes.

This prevents context overload.

---

## 5. Adaptive delivery

ALINA should adapt the amount of explanation to Makar's skill level.

Example:

```text
If skill = K1:
  explain concept + example + checklist

If skill = K3:
  provide contract + reference pattern + pitfalls

If skill = K5:
  provide constraints + goal + tests, minimal explanation
```

Therefore the Agent Factory requires a live skill graph, not a static persona prompt.

---

## 6. Information priority model

Every information item receives:

- relevance;
- urgency;
- authority;
- confidence;
- recency;
- project_scope;
- agent_scope;
- cost_of_missing.

ALINA can then rank what Makar sees first.

Example:

```text
Hard security constraint       → must show
Current API contract           → must show
Current visual target          → must show
Old tutorial                   → suppress
Background research            → link only
Unverified hypothesis          → show with status
```

---

## 7. Delivery channels

The same knowledge may be delivered differently depending on task.

### Before work
- task briefing;
- constraints;
- architecture;
- acceptance criteria.

### During work
- contextual hints;
- related code;
- detected conflicts;
- test failures;
- visual mismatch;
- dependency updates.

### On interruption
- only high-priority alerts.

### After work
- result review;
- lessons learned;
- reusable pattern extraction;
- skill evidence update;
- next task recommendation.

---

## 8. Traceability

Every delivered knowledge fragment should be traceable:

```json
{
  "delivery_id": "ctx-2026-09-23-001",
  "agent_id": "makar",
  "task_id": "M0.2",
  "knowledge_ids": [
    "makar.design.tokens.semantic_roles",
    "father.ui.glass.surface_rules"
  ],
  "source_versions": [],
  "delivered_at": null,
  "used": [],
  "ignored": [],
  "result_refs": [],
  "feedback": null
}
```

This lets ALINA learn:
- what context was useful;
- what was redundant;
- what was missing;
- what led to rework.

---

## 9. Feedback loop

```text
ALINA creates task
  ↓
Context Composer selects knowledge
  ↓
Makar works
  ↓
Code / test / visual result
  ↓
ALINA evaluates outcome
  ↓
Compare expected vs actual
  ↓
Identify missing or excessive context
  ↓
Update:
  - project overlay
  - Makar skill state
  - reusable patterns
  - delivery policy
```

The system should improve not only the agent, but also **how ALINA teaches and briefs the agent**.

---

## 10. Two-memory rule

ALINA must distinguish:

### Professional long-term memory
Stable knowledge:
- frontend patterns;
- testing rules;
- design principles;
- reusable lessons.

### Operational working memory
Temporary context:
- current task;
- active branch;
- current bug;
- temporary mock;
- recent conversation;
- current design variant.

Temporary context should expire or be archived instead of contaminating professional knowledge.

---

## 11. Agent-to-agent handoff

ALINA should be able to create structured handoffs.

Example backend → Makar:

```json
{
  "from": "backend-agent",
  "to": "makar",
  "artifact": "ProjectContext API",
  "contract": {
    "endpoint": "/api/context",
    "schema_ref": "context.v2",
    "states": ["loading", "ready", "empty", "error"],
    "latency_budget_ms": 800
  },
  "ui_expectation": "Render current project context without blocking the main workspace"
}
```

Makar should not need to reverse-engineer another agent's output.

---

## 12. ALINA Frontend as the first proving ground

ALINA itself becomes the first environment where the Agent Factory is tested.

The loop is intentionally recursive:

```text
ALINA designs how she briefs Makar
        ↓
Makar builds ALINA Frontend
        ↓
ALINA Frontend exposes agent/task/context views
        ↓
We observe what information Makar actually needs
        ↓
Agent Factory improves
        ↓
Makar receives better context
```

This is a deliberate dogfooding strategy.

---

## 13. First implementation modules

The Agent Factory should eventually contain:

- Agent Registry
- Agent Passport
- Skill Graph
- Professional KB
- Project Overlay
- Task Context Store
- Context Composer
- Knowledge Retriever
- Priority / Attention Engine
- Delivery Log
- Feedback Evaluator
- Lesson Extractor
- Handoff Manager
- Agent Provisioning

---

## 14. First Makar experiment

For every Makar task, ALINA should generate five artifacts:

1. **TASK.md** — what and why;
2. **CONTEXT.md** — relevant project context;
3. **KNOWLEDGE_PACK.md** — only required knowledge;
4. **ACCEPTANCE.md** — how success is measured;
5. **RESULT.md** — outcome, evidence, lessons.

Then compare:
- task completion time;
- number of clarification cycles;
- rework;
- failed tests;
- visual mismatches;
- amount of unused context.

This produces the first empirical data for ALINA's Agent Factory.

---

## 15. Core rule

**ALINA should not simply answer an agent. She should provision the agent with the smallest sufficient, traceable, role-aware context required to complete the task correctly.**
