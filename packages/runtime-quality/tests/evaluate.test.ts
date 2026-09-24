import { describe, expect, it } from "vitest";
import {
  evaluateRuntimeQuality,
  type RuntimeQualityBudget,
  type RuntimeQualitySnapshot,
} from "../src";

const budget: RuntimeQualityBudget = {
  lcpMs: 2500,
  cls: 0.1,
  interactionMs: 200,
  maxLongTaskMs: 120,
  avgFrameTimeMs: 16.7,
};

function snapshot(): RuntimeQualitySnapshot {
  return {
    collectedAt: "2026-09-24T00:00:00.000Z",
    userAgent: "test",
    lcpMs: { value: 1800, source: "lcp", supported: true },
    cls: { value: 0.03, source: "cls", supported: true },
    interactionResponsivenessMs: {
      value: 80,
      source: "event",
      supported: true,
    },
    maxLongTaskMs: { value: 60, source: "longtask", supported: true },
    avgFrameTimeMs: { value: 15, source: "raf", supported: true },
  };
}

describe("runtime quality", () => {
  it("passes only when every measured gate is present and within budget", () => {
    const result = evaluateRuntimeQuality(snapshot(), budget);
    expect(result.passed).toBe(true);
    expect(result.complete).toBe(true);
  });

  it("keeps unsupported evidence unknown instead of passing it", () => {
    const value = snapshot();
    value.lcpMs = {
      value: null,
      source: "unsupported",
      supported: false,
    };

    const result = evaluateRuntimeQuality(value, budget);
    expect(result.passed).toBe(false);
    expect(result.unknown).toContain("lcp");
  });

  it("fails a measured budget violation", () => {
    const value = snapshot();
    value.maxLongTaskMs.value = 180;

    const result = evaluateRuntimeQuality(value, budget);
    expect(result.failed).toContain("long-task");
  });
});
