# M1.2 — Result

Status: **implementation complete / awaiting CI**

## Evidence

- issue: #29
- branch: `feat/m1.2-product-shell`
- delivery trace: `experiments/M1.2/delivery-trace.json`
- pull request:
- CI:
- screenshots:

## Delivered

- ProductShell driven by M1.1 shell contract;
- product-first default route;
- five scenario modes;
- scenario/tier/avatar reason trace;
- Core fallback;
- command plane;
- diagnostics disclosure;
- updated unit/render tests;
- product-first Playwright suite.

## Agent Factory feedback

### Selected context

7 knowledge items.

### Clarification cycles

0 human clarification cycles so far.

### Rework

- homepage tests intentionally rewritten because product identity changed;
- no repository/bootstrap rework so far.

### Visual mismatches

To be recorded after CI screenshots.

## Lessons for KB-1

1. Product-shell implementation is separate from engine implementation.
2. Config-driven scenario switching reduces hard-coded page branching.
3. Product-first visual QA should coexist with engine unit tests.

## Lessons for KB-2

1. M1.1 output contract provided enough structure to implement M1.2 without a new architecture discussion.
2. Explicit test-impact knowledge was useful because the default homepage changed.
3. Product tasks benefit from carrying prior task output as an input artifact, not repeating the entire architecture.
