import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const budgetPath = path.join(root, "quality-budget.json");
const distPath = path.join(root, "apps", "alina-control-center", "dist");

const budgetDoc = JSON.parse(await fs.readFile(budgetPath, "utf8"));
const budget = budgetDoc.budgets;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }

  return files;
}

const files = await walk(distPath);
const totals = {
  jsBytes: 0,
  cssBytes: 0,
  imageBytes: 0,
  modelBytes: 0,
  audioBytes: 0,
};

const groups = {
  jsBytes: new Set([".js", ".mjs"]),
  cssBytes: new Set([".css"]),
  imageBytes: new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]),
  modelBytes: new Set([".glb", ".gltf", ".fbx", ".obj"]),
  audioBytes: new Set([".mp3", ".wav", ".ogg", ".m4a", ".aac"]),
};

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const stat = await fs.stat(file);

  for (const [key, extensions] of Object.entries(groups)) {
    if (extensions.has(ext)) totals[key] += stat.size;
  }
}

const measured = Object.entries(totals).map(([gate, actual]) => {
  const limit = budget[gate];
  const status = typeof limit === "number" && actual <= limit ? "pass" : "fail";
  return { gate, actual, budget: limit, status };
});

const report = {
  generatedAt: new Date().toISOString(),
  distPath: path.relative(root, distPath),
  measured,
  passed: measured.every((item) => item.status === "pass"),
};

await fs.mkdir(path.join(root, "reports"), { recursive: true });
await fs.writeFile(
  path.join(root, "reports", "quality-budget-report.json"),
  JSON.stringify(report, null, 2) + "\n"
);

for (const item of measured) {
  console.log(
    `${item.status.toUpperCase()} ${item.gate}: ${item.actual} / ${item.budget} bytes`
  );
}

if (!report.passed) {
  process.exitCode = 1;
}
