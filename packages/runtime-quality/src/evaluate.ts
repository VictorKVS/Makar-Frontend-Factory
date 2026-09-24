import type {
  RuntimeMetric,
  RuntimeQualityBudget,
  RuntimeQualityEvaluation,
  RuntimeQualityGate,
  RuntimeQualitySnapshot,
} from "./types";

function gate(
  id: RuntimeQualityGate["id"],
  metric: RuntimeMetric,
  budget: number
): RuntimeQualityGate {
  if (!metric.supported || metric.value === null) {
    return {
      id,
      status: "unknown",
      value: metric.value,
      budget,
      source: metric.source,
    };
  }

  return {
    id,
    status: metric.value <= budget ? "pass" : "fail",
    value: metric.value,
    budget,
    source: metric.source,
  };
}

export function evaluateRuntimeQuality(
  snapshot: RuntimeQualitySnapshot,
  budget: RuntimeQualityBudget
): RuntimeQualityEvaluation {
  const gates = [
    gate("lcp", snapshot.lcpMs, budget.lcpMs),
    gate("cls", snapshot.cls, budget.cls),
    gate(
      "interaction",
      snapshot.interactionResponsivenessMs,
      budget.interactionMs
    ),
    gate("long-task", snapshot.maxLongTaskMs, budget.maxLongTaskMs),
    gate("frame-time", snapshot.avgFrameTimeMs, budget.avgFrameTimeMs),
  ];

  const failed = gates
    .filter((item) => item.status === "fail")
    .map((item) => item.id);
  const unknown = gates
    .filter((item) => item.status === "unknown")
    .map((item) => item.id);

  return {
    passed: failed.length === 0 && unknown.length === 0,
    complete: unknown.length === 0,
    gates,
    failed,
    unknown,
  };
}
