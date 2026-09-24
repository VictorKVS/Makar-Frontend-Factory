import type {
  QualityBudget,
  QualityGateResult,
  QualityMeasurement,
  QualityReport,
} from "./types";

function numberGate(
  gate: QualityGateResult["gate"],
  actual: number | undefined,
  budget: number,
  lowerIsBetter = true
): QualityGateResult {
  if (actual === undefined) {
    return {
      gate,
      status: "unknown",
      budget,
      message: "measurement-missing",
    };
  }

  const passed = lowerIsBetter ? actual <= budget : actual >= budget;
  return {
    gate,
    status: passed ? "pass" : "fail",
    actual,
    budget,
    message: passed ? "within-budget" : "budget-exceeded",
  };
}

function booleanGate(
  gate: QualityGateResult["gate"],
  actual: boolean | undefined,
  required: boolean
): QualityGateResult {
  if (!required) {
    return {
      gate,
      status: "pass",
      actual,
      budget: required,
      message: "not-required",
    };
  }

  if (actual === undefined) {
    return {
      gate,
      status: "unknown",
      budget: required,
      message: "measurement-missing",
    };
  }

  return {
    gate,
    status: actual ? "pass" : "fail",
    actual,
    budget: required,
    message: actual ? "requirement-met" : "requirement-failed",
  };
}

export function evaluateQuality(
  budget: QualityBudget,
  measurement: QualityMeasurement
): QualityReport {
  const gates: QualityGateResult[] = [
    numberGate("js", measurement.jsBytes, budget.jsBytes),
    numberGate("css", measurement.cssBytes, budget.cssBytes),
    numberGate("images", measurement.imageBytes, budget.imageBytes),
    numberGate("models", measurement.modelBytes, budget.modelBytes),
    numberGate("audio", measurement.audioBytes, budget.audioBytes),
    numberGate("lcp", measurement.lcpMs, budget.lcpMs),
    numberGate("cls", measurement.cls, budget.cls),
    numberGate("inp", measurement.inpMs, budget.inpMs),
    numberGate("long-task", measurement.maxLongTaskMs, budget.maxLongTaskMs),
    numberGate("frame-time", measurement.avgFrameTimeMs, budget.targetFrameTimeMs),
    booleanGate(
      "reduced-motion",
      measurement.reducedMotionPassed,
      budget.reducedMotionRequired
    ),
    booleanGate(
      "keyboard-focus",
      measurement.keyboardFocusPassed,
      budget.keyboardFocusRequired
    ),
  ];

  const failedCount = gates.filter((gate) => gate.status === "fail").length;
  const unknownCount = gates.filter((gate) => gate.status === "unknown").length;

  return {
    passed: failedCount === 0,
    gates,
    failedCount,
    unknownCount,
  };
}

export function recommendPerformanceTier(
  measurement: Pick<QualityMeasurement, "avgFrameTimeMs" | "maxLongTaskMs">,
  budget: Pick<QualityBudget, "targetFrameTimeMs" | "maxLongTaskMs">
): "core" | "enhanced" | "cinematic" {
  const frame = measurement.avgFrameTimeMs;
  const longTask = measurement.maxLongTaskMs;

  if (
    frame === undefined ||
    longTask === undefined ||
    frame > budget.targetFrameTimeMs * 1.5 ||
    longTask > budget.maxLongTaskMs * 1.5
  ) {
    return "core";
  }

  if (
    frame > budget.targetFrameTimeMs ||
    longTask > budget.maxLongTaskMs
  ) {
    return "enhanced";
  }

  return "cinematic";
}
