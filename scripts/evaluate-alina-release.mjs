import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();

async function readJson(relativePath) {
  return JSON.parse(
    await fs.readFile(path.join(root, relativePath), "utf8")
  );
}

const qualityBudget = await readJson("quality-budget.json");
const acceptance = await readJson("reports/alina-acceptance-report.json");
const assetBudget = await readJson("reports/quality-budget-report.json");
const runtime = await readJson("reports/runtime-quality-report.json");

const budgets = qualityBudget.budgets;

const runtimeSpecs = [
  ["lcp", runtime.metrics.lcpMs, budgets.lcpMs],
  ["cls", runtime.metrics.cls, budgets.cls],
  [
    "interaction",
    runtime.metrics.interactionResponsivenessMs,
    budgets.inpMs,
  ],
  ["long-task", runtime.metrics.maxLongTaskMs, budgets.maxLongTaskMs],
  ["frame-time", runtime.metrics.avgFrameTimeMs, budgets.targetFrameTimeMs],
];

const runtimeGates = runtimeSpecs.map(([id, metric, budget]) => {
  const value = metric?.value ?? null;
  const supported = metric?.supported === true;
  const status =
    !supported || value === null
      ? "unknown"
      : value <= budget
        ? "pass"
        : "fail";

  return {
    id,
    status,
    value,
    budget,
    source: metric?.source ?? "missing",
  };
});

const runtimeUnknown = runtimeGates
  .filter((gate) => gate.status === "unknown")
  .map((gate) => gate.id);
const runtimeFailed = runtimeGates
  .filter((gate) => gate.status === "fail")
  .map((gate) => gate.id);

const frontendRcReady =
  acceptance.hardGatesPassed === true &&
  assetBudget.passed === true &&
  runtimeUnknown.length === 0 &&
  runtimeFailed.length === 0;

const configuredMode = process.env.VITE_ALINA_DATA_MODE ?? "demo";
const liveApiBase = process.env.VITE_ALINA_API_BASE_URL ?? null;
const liveBackendConfigured =
  configuredMode === "live" && Boolean(liveApiBase);

const liveIntegrationStatus = liveBackendConfigured
  ? "configured-not-validated-by-this-ci"
  : "external-dependency-pending";

const overallStatus = frontendRcReady
  ? liveBackendConfigured
    ? "frontend-rc-ready-live-config-present"
    : "frontend-rc-ready-live-integration-pending"
  : "blocked";

const knownLimitations = [
  "Runtime quality evidence is a headless Chromium CI measurement, not field RUM.",
];

if (!liveBackendConfigured) {
  knownLimitations.push(
    "Live FATHER/ALINA backend is not configured in this CI run; DEMO mode remains explicit."
  );
}

const manifest = {
  version: "1.0.0",
  generatedAt: new Date().toISOString(),
  source: {
    repository: "VictorKVS/Makar-Frontend-Factory",
    commitSha: process.env.GITHUB_SHA ?? null,
    workflowRunId: process.env.GITHUB_RUN_ID ?? null,
  },
  status: overallStatus,
  frontendRc: {
    ready: frontendRcReady,
    hardAcceptancePassed: acceptance.hardGatesPassed === true,
    assetBudgetPassed: assetBudget.passed === true,
    runtimeGates,
    runtimeUnknown,
    runtimeFailed,
  },
  liveIntegration: {
    configured: liveBackendConfigured,
    status: liveIntegrationStatus,
    dataMode: configuredMode,
    apiBaseConfigured: Boolean(liveApiBase),
  },
  evidence: {
    acceptanceReport: "reports/alina-acceptance-report.json",
    assetBudgetReport: "reports/quality-budget-report.json",
    runtimeQualityReport: "reports/runtime-quality-report.json",
  },
  knownLimitations,
  rollback: {
    safeTier: "core",
    dataPolicy: "never silently substitute DEMO for failed LIVE mode",
  },
};

await fs.mkdir(path.join(root, "reports"), { recursive: true });
await fs.writeFile(
  path.join(root, "reports", "alina-release-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);

console.log("ALINA RELEASE STATUS:", overallStatus);
for (const gate of runtimeGates) {
  console.log(
    gate.status.toUpperCase(),
    gate.id,
    gate.value,
    "/",
    gate.budget,
    "source=" + gate.source
  );
}

if (!frontendRcReady) {
  console.error(
    "Frontend RC blocked:",
    JSON.stringify({ runtimeUnknown, runtimeFailed })
  );
  process.exitCode = 1;
}
