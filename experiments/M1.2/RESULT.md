# M1.2 — Result

Status: **implementation complete / automated QA passed**

## Evidence

- issue: **#29**
- branch: `feat/m1.2-product-shell`
- pull request: **PR #30**
- successful CI run: **35985988594**
- QA artifact: **10802151792 — alina-visual-evidence**
- artifact size: about **2.77 MB**
- delivery trace: `experiments/M1.2/delivery-trace.json`
- typecheck: passed
- unit/render tests: passed
- build: passed
- quality budget: passed
- ALINA shell-contract validation: passed
- Playwright product visual QA: passed

## Delivered

- `ProductShell` driven by the M1.1 shell contract;
- ALINA Control Center is now the default experience;
- Engineering Labs moved behind a closed-by-default diagnostics surface;
- five scenarios: Research / Coding / Security / Presentation / Focus;
- scenario-specific primary work context;
- bounded secondary/context streams;
- scenario/tier-specific ALINA presence;
- visible Composition Trace;
- Core / Enhanced / Cinematic verification;
- persistent command plane;
- qualified Security alert overlay;
- explicit DEMO / MOCK marking;
- responsive laptop / desktop / ultrawide evidence;
- Security / Presentation / Focus visual evidence.

## Agent Factory feedback

### Selected context

ALINA delivered **7 bounded knowledge items**. No full-library dump was used.

### Useful

- M1.1 machine-readable product-shell contract;
- composition engine independence;
- reason-trace requirement;
- avatar capability negotiation;
- information attention budget;
- workspace/domain-state separation;
- reduced-motion requirement;
- UI test-impact lesson.

### Missing

No blocking architecture or repository context was missing.

### Redundant

No selected knowledge item was identified as redundant during implementation.

### Metrics

- human clarification cycles: **0**
- repository/bootstrap rework: **0**
- visual QA repair cycles: **1**
- final CI failures: **0**

## Rework analysis

The first M1.2 CI attempt passed typecheck, tests, build, quality budget and shell validation, but three responsive Playwright tests failed.

Cause:

- the assertion searched globally for `DEMO / MOCK`;
- legitimate diagnostic DOM also contained the same label;
- Playwright strict mode therefore resolved three matching elements.

Fix:

- scope the assertion to `.alina-product-shell`.

Classification:

- **execution / visual-test selector issue**;
- not an architecture failure;
- directly consistent with the existing KB-1 lesson `makar.qa.scoped_semantic_selectors`.

## Lessons for KB-1

1. Product-shell implementation is separate from engine implementation.
2. Config-driven scenario switching keeps the product shell inspectable and prevents one-off page branching.
3. Product-first visual QA should coexist with lower-level engine tests.
4. Hidden diagnostic DOM can still affect global semantic selectors.
5. Repeated valid labels require region-scoped assertions.

## Lessons for KB-2

1. M1.1 output was sufficient to implement M1.2 without another architecture round.
2. Carrying the previous task's machine-readable contract is more efficient than re-sending the whole architecture.
3. UI task packs should remind the agent to scope tests to the product region when diagnostics remain mounted in the DOM.
4. The feedback classifier should distinguish a selector/test defect from missing professional knowledge.

## Conclusion

M1.2 produced the first real **ALINA Control Center v1 product shell** from an ALINA Agent Factory task pack. The product experience is now primary; engineering laboratories remain available as diagnostics.
