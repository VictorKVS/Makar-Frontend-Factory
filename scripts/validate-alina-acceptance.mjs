import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(
    await fs.readFile(path.join(root, relativePath), "utf8")
  );
}

const matrix = await readJson("configs/alina-v1/acceptance-matrix.json");
const shell = await readJson("configs/alina-v1/product-shell.contract.json");
const quality = await readJson("quality-budget.json");

const failures = [];
const checks = [];

function check(id, condition, detail) {
  const passed = Boolean(condition);
  checks.push({ id, passed, detail });
  if (!passed) failures.push(id + ": " + detail);
}

const expectedScenarios = [
  "research",
  "coding",
  "security",
  "presentation",
  "focus",
];
const expectedTiers = ["core", "enhanced", "cinematic"];
const expectedViewports = ["narrow", "laptop", "desktop", "ultrawide"];

check(
  "scenario-set",
  JSON.stringify(matrix.scenarios) === JSON.stringify(expectedScenarios),
  "acceptance matrix must cover all five product scenarios"
);

check(
  "tier-set",
  JSON.stringify(matrix.tiers) === JSON.stringify(expectedTiers),
  "acceptance matrix must cover Core, Enhanced and Cinematic"
);

check(
  "viewport-set",
  expectedViewports.every((id) =>
    matrix.viewports.some((viewport) => viewport.id === id)
  ),
  "narrow/laptop/desktop/ultrawide viewports are required"
);

for (const scenarioId of expectedScenarios) {
  const requirement = matrix.scenarioRequirements[scenarioId];
  const productScenario = shell.scenarios[scenarioId];

  check(
    "scenario-primary:" + scenarioId,
    requirement?.primary === productScenario?.primary,
    "matrix primary must match product-shell contract"
  );

  check(
    "scenario-core:" + scenarioId,
    requirement?.coreRequired === true,
    "every scenario must remain usable in Core"
  );
}

check(
  "core-no-webgl",
  shell.performance.core.webgl_required === false &&
    matrix.tierRequirements.core.webglRequired === false,
  "Core must never require WebGL"
);

check(
  "cinematic-capability-trace",
  matrix.tierRequirements.cinematic.capabilityTraceRequired === true,
  "Cinematic must expose actual capability trace"
);

check(
  "unknown-not-pass",
  matrix.policy.unknownIsPass === false &&
    matrix.policy.unknownIsVisible === true,
  "unknown runtime metrics may not silently become passes"
);

const observations = matrix.observationalMetrics;
check(
  "lcp-budget",
  observations.lcp.budgetMs === quality.budgets.lcpMs,
  "LCP acceptance budget must match quality-budget.json"
);
check(
  "cls-budget",
  observations.cls.budget === quality.budgets.cls,
  "CLS acceptance budget must match quality-budget.json"
);
check(
  "inp-budget",
  observations.inp.budgetMs === quality.budgets.inpMs,
  "INP acceptance budget must match quality-budget.json"
);
check(
  "long-task-budget",
  observations.maxLongTask.budgetMs === quality.budgets.maxLongTaskMs,
  "long-task budget must match quality-budget.json"
);
check(
  "frame-time-budget",
  observations.frameTime.budgetMs === quality.budgets.targetFrameTimeMs,
  "frame-time budget must match quality-budget.json"
);

const unknownObservations = Object.entries(observations)
  .filter(([, value]) => value.status !== "measured-pass")
  .map(([id, value]) => ({ id, status: value.status }));

const report = {
  generatedAt: new Date().toISOString(),
  matrixId: matrix.id,
  matrixVersion: matrix.version,
  hardGatesPassed: failures.length === 0,
  checks,
  failures,
  observationalUnknown: unknownObservations,
  releaseReadiness:
    failures.length > 0
      ? "blocked"
      : unknownObservations.length > 0
        ? "conditional"
        : "ready",
};

await fs.mkdir(path.join(root, "reports"), { recursive: true });
await fs.writeFile(
  path.join(root, "reports", "alina-acceptance-report.json"),
  JSON.stringify(report, null, 2) + "\n"
);

for (const item of checks) {
  console.log(
    `${item.passed ? "PASS" : "FAIL"} ${item.id}: ${item.detail}`
  );
}

if (unknownObservations.length) {
  console.log(
    "KNOWN LIMITATIONS:",
    unknownObservations.map((item) => item.id + "=" + item.status).join(", ")
  );
}

if (failures.length) {
  process.exitCode = 1;
}
