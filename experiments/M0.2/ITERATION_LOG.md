# M0.2 — Experiment 001 Iteration Log

This file records what happened while Makar executed the first task provisioned through the ALINA Agent Factory context package.

## Baseline

- Agent: Makar
- Task: M0.2 — UI Primitives + Visual Token Lab
- Clarification cycles with human: **0**
- Context package: **v1.1.0**
- Initial dependency: M0.1 Design Tokens
- Dependency resolution: PR #2 merged before implementation

## Implementation produced from the package

Shared UI:
- GlassPanel
- Button
- IconButton
- Badge
- StatusIndicator
- MetricCard
- NavigationItem
- CommandBar

ALINA lab:
- responsive shell
- explicit DEMO / MOCK marking
- material/glow/depth samples
- information-stream states
- Avatar Engine placeholder
- keyboard focus rules
- reduced-motion rules

QA:
- TypeScript typecheck
- Vitest unit/render tests
- build
- Playwright responsive visual QA
- screenshot artifact pipeline

---

## Rework cycle 1 — CI cache assumption

**Observed failure:** GitHub Actions setup-node expected `pnpm-lock.yaml` because cache was enabled, but the new repository did not yet have a lockfile.

**Classification:** bootstrap / delivery-context gap.

**Action:** disabled pnpm caching until a lockfile exists.

**KB-1 lesson:** none; this was not a frontend competence failure.

**KB-2 lesson:** a new-repository task package should include repository bootstrap state: package manager, lockfile presence, CI assumptions.

---

## Rework cycle 2 — package manager source of truth

**Observed failure:** Turborepo required a package-manager declaration. After adding `packageManager`, pnpm/action-setup rejected a second conflicting version declared in workflow YAML.

**Classification:** repository contract / CI configuration.

**Action:** made `package.json -> packageManager` the version source of truth and removed the duplicate workflow version.

**KB-1 lesson:** shared build infrastructure should have one package-manager version source.

**KB-2 lesson:** ALINA should deliver a `RepositoryContract` with runtime/package-manager/build commands before an agent begins implementation.

---

## Rework cycle 3 — test ownership

**Observed failure:** the ALINA application had a `test` script but no unit tests, causing Vitest to exit with code 1.

**Classification:** acceptance-contract ambiguity + implementation gap.

**Action:** added app-level tests proving:
- the Visual Lab renders;
- DEMO / MOCK is explicitly visible;
- key foundation surfaces are present.

Later Playwright tests were separated from Vitest ownership.

**KB-1 lesson:** every workspace package exposing a test command should own at least one meaningful test or explicitly declare no-tests behavior.

**KB-2 lesson:** the acceptance package should specify **which package owns which class of test**, not only say "tests pass".

---

## Context usefulness observed so far

### Useful
- semantic-token constraint;
- no ALINA-specific logic inside shared UI;
- visible keyboard focus;
- reduced-motion requirement;
- explicit DEMO / MOCK rule;
- defined component inventory.

### Missing
- repository/package-manager bootstrap contract;
- lockfile/cache status;
- exact CI command contract;
- unit vs visual-test ownership;
- screenshot evidence mechanism.

### Redundant
No clearly redundant knowledge has been identified yet.

---

## Current experiment assessment

The professional knowledge pack was sufficient to begin implementation without asking the human for clarification.

Most rework so far came from **operational repository context not included in KB-2**, not from missing frontend knowledge in KB-1.

This is exactly why the two-base architecture is useful:

```text
Frontend concept failure?         → KB-1
Repository/task briefing failure? → KB-2
```

## Next

Complete Playwright visual QA, store screenshot artifacts, then finalize `RESULT.md` and promote reusable lessons into the two knowledge bases.
