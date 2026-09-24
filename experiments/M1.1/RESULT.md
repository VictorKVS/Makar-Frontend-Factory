# M1.1 — Result

Status: **implementation complete / awaiting CI and review**

## Evidence

- issue: #27
- branch: `feat/m1.1-scene-grammar`
- delivery trace: `experiments/M1.1/delivery-trace.json`
- pull request:
- CI:

## Delivered

- scene grammar;
- module map;
- attention map;
- avatar placement matrix;
- responsive grammar;
- performance grammar;
- machine-readable product-shell contract.

## Agent Factory feedback

### Useful context

- independent-engine composition principle;
- stream semantic priority;
- avatar renderer independence;
- workspace/domain-state separation;
- reason-trace requirement;
- visualization intent-before-renderer rule.

### Missing context

No blocking gap identified during decomposition.

### Redundant context

None identified in the six-item Knowledge Pack.

### Metrics

- human clarification cycles: **0**
- selected knowledge items: **6**
- full-library dump: **no**
- repository/bootstrap rework: **0**

## Lessons for KB-1

1. Product scene grammar is a reusable architecture skill distinct from raw component implementation.
2. A product plane should have exactly one primary owner even when several engines contribute.
3. Avatar placement is a scenario decision, not a fixed screen coordinate.
4. Performance-tier fallback belongs in the visual grammar before implementation.

## Lessons for KB-2

1. Six selected knowledge items were sufficient for this decomposition task.
2. Product-transition tasks should explicitly state which diagnostic surfaces are not the product homepage.
3. Machine-readable output contracts reduce ambiguity for the next implementation task.
