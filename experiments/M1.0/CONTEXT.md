# M1.0 — ALINA Agent Factory v0

**Reference agent:** Makar  
**Purpose:** Convert the successful ALINA → Makar experiments into a reusable factory.

## Core rule

The Factory manages agent provisioning and learning contracts. It does not render frontend and does not silently rewrite an agent's competence state.

## Inputs

- Agent Passport;
- Skill Graph;
- KB-1 knowledge catalog;
- KB-2 delivery policy;
- Project Overlay;
- Repository Contract;
- Task Definition.

## Outputs

- bounded Knowledge Pack;
- TASK.md;
- CONTEXT.md;
- KNOWLEDGE_PACK.md;
- ACCEPTANCE.md;
- RESULT.md template;
- context-package.json;
- Delivery Trace.

## Feedback routing

- knowledge gap → KB-1;
- briefing gap → KB-2;
- repository gap → Repository Contract;
- changed requirement → Project Overlay;
- sufficient context but wrong implementation → Execution.

## Evidence rule

Evidence may be attached automatically. Skill promotion is only proposed and remains reviewable.

## First proof

Provision Makar for one real next task and inspect every selected knowledge item and reason.
