import { readFile } from "node:fs/promises";
import path from "node:path";

const contractPath = path.join(
  process.cwd(),
  "configs",
  "alina-v1",
  "product-shell.contract.json"
);

const contract = JSON.parse(await readFile(contractPath, "utf8"));
const errors = [];

const expectedPlanes = [
  "background",
  "navigation",
  "primary-work",
  "secondary-context",
  "avatar-presence",
  "command",
  "alert-overlay",
];

const expectedScenarios = [
  "research",
  "coding",
  "security",
  "presentation",
  "focus",
];

for (const id of expectedPlanes) {
  const plane = contract.planes?.find((item) => item.id === id);
  if (!plane) errors.push(`missing-plane:${id}`);
  else {
    if (!plane.owner) errors.push(`missing-plane-owner:${id}`);
    if (!plane.purpose) errors.push(`missing-plane-purpose:${id}`);
    if (!plane.fallback) errors.push(`missing-plane-fallback:${id}`);
  }
}

if ((contract.planes?.length ?? 0) !== expectedPlanes.length) {
  errors.push(`unexpected-plane-count:${contract.planes?.length ?? 0}`);
}

for (const name of expectedScenarios) {
  const scenario = contract.scenarios?.[name];
  if (!scenario) {
    errors.push(`missing-scenario:${name}`);
    continue;
  }

  if (typeof scenario.primary !== "string" || !scenario.primary.trim()) {
    errors.push(`scenario-primary-invalid:${name}`);
  }

  if (typeof scenario.avatar !== "string" || !scenario.avatar.trim()) {
    errors.push(`scenario-avatar-invalid:${name}`);
  }

  if (typeof scenario.reason !== "string" || !scenario.reason.startsWith("scenario:")) {
    errors.push(`scenario-reason-invalid:${name}`);
  }

  for (const key of ["secondary", "background", "alerts"]) {
    if (!Array.isArray(scenario[key])) {
      errors.push(`scenario-${key}-invalid:${name}`);
    }
  }
}

for (const tier of ["core", "enhanced", "cinematic"]) {
  if (!contract.performance?.[tier]) errors.push(`missing-performance-tier:${tier}`);
}

if (contract.performance?.core?.webgl_required !== false) {
  errors.push("core-must-not-require-webgl");
}

if (contract.principles?.one_primary_context !== true) {
  errors.push("one-primary-context-principle-missing");
}

if (contract.principles?.reason_trace_required !== true) {
  errors.push("reason-trace-principle-missing");
}

if (contract.principles?.core_tier_must_be_usable !== true) {
  errors.push("core-usability-principle-missing");
}

if (errors.length) {
  console.error("ALINA shell contract validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("ALINA shell contract validation passed");
console.log(`planes=${contract.planes.length}`);
console.log(`scenarios=${Object.keys(contract.scenarios).length}`);
console.log(`performance_tiers=${Object.keys(contract.performance).join(",")}`);
