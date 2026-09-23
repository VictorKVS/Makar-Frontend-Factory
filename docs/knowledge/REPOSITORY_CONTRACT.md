# Repository Contract

Experiment 001 showed that professional knowledge and task acceptance criteria are not enough.

An implementation agent also needs an explicit **Repository Contract**.

## Why

M0.2 produced zero human clarification cycles for frontend concepts, but CI required rework because the task package did not state:

- package manager source of truth;
- lockfile state;
- CI commands;
- package-level test ownership;
- screenshot artifact expectations.

These are not frontend-knowledge failures. They are **execution-context failures**.

## Delivery rule

For code-producing tasks, ALINA should attach the repository contract before the agent starts work.

The agent should never need to infer:
- how to install;
- how to typecheck;
- how to test;
- how to build;
- which visual/e2e checks are required;
- whether a lockfile/cache exists.

## Precedence

```text
Hard project constraints
  ↓
Repository Contract
  ↓
Current project decisions
  ↓
Task Context
  ↓
Professional Knowledge Pack
```

The repository contract is operational and project-scoped. It belongs to KB-2 / Project Overlay, not to Makar's permanent professional KB.
