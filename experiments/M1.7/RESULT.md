# M1.7 — Result

Status: **hard acceptance passed / release readiness conditional**

## Evidence

- issue: **#40**
- branch: `feat/m1.7-acceptance`
- pull request: **PR #41**
- successful CI run: **36008220306**
- visual artifact: **10810953974 — alina-visual-evidence**
- artifact size: about **3.32 MB**
- acceptance report: `reports/alina-acceptance-report.json`
- delivery: `delivery:makar:M1.7:v1`

## Hard gates

Passed:

- TypeScript typecheck;
- unit tests;
- production build;
- static asset budget;
- ALINA shell contract validation;
- ALINA acceptance-matrix validation;
- Research / Coding / Security / Presentation / Focus;
- Core / Enhanced / Cinematic semantic paths;
- Core no-WebGL requirement;
- keyboard focus;
- reduced motion;
- Knowledge Graph accessible fallback;
- narrow / laptop / desktop / ultrawide;
- DEMO provenance labeling;
- Playwright product visual QA.

## Acceptance matrix result

Hard gates: **PASS**

Release readiness: **CONDITIONAL**

Reason: runtime performance observations below are not yet collected by the CI pipeline.

## Known limitations / observational metrics

Explicitly **unknown**, not treated as passes:

- LCP;
- CLS;
- INP / interaction responsiveness;
- maximum long task;
- sustained frame time.

Budgets already exist in `quality-budget.json`; M1.8 must collect real browser measurements or keep release readiness conditional.

## Agent Factory feedback

- selected knowledge items: **6**
- human clarification cycles: **0**
- repository/bootstrap rework: **0**
- blocking implementation rework: **0**
- missing context: **none blocking**
- redundant context: **none observed**

## Lessons for KB-1

1. Subsystem-green is not the same as product-level acceptance.
2. Unknown performance evidence is not a pass.
3. Scenario × tier × viewport testing catches architectural regressions better than isolated snapshots.
4. Accessibility fallbacks belong in the release matrix, not only component tests.
5. Release readiness should be computed from evidence and known limitations.

## Lessons for KB-2

1. A QA-focused six-item pack was sufficient.
2. Acceptance tasks should distinguish hard gates from observational evidence.
3. M1.8 should receive the conditional release state as a primary input, not only the green CI status.
4. ALINA must not translate “all automated hard gates passed” into “production-ready” while runtime metrics remain unknown.

## Conclusion

M1.7 is accepted and merged. The ALINA v1 frontend passes its current hard product gates, but release readiness remains conditional until M1.8 collects runtime browser metrics and completes production hardening.
