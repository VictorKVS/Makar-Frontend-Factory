import { describe, expect, it } from "vitest";
import {
  deserializeEvidenceManifest,
  evaluateQuality,
  recommendPerformanceTier,
  serializeEvidenceManifest,
  type QualityBudget,
} from "../src";

const budget: QualityBudget = {
  jsBytes: 700_000,
  cssBytes: 180_000,
  imageBytes: 2_500_000,
  modelBytes: 15_000_000,
  audioBytes: 8_000_000,
  lcpMs: 2500,
  cls: 0.1,
  inpMs: 200,
  maxLongTaskMs: 120,
  targetFrameTimeMs: 16.7,
  viewports: [
    { name: "laptop", width: 1366, height: 768 },
    { name: "desktop", width: 1920, height: 1080 },
    { name: "ultrawide", width: 2560, height: 1080 },
  ],
  reducedMotionRequired: true,
  keyboardFocusRequired: true,
};

describe("visual QA", () => {
  it("passes a measurement inside all known budgets", () => {
    const report = evaluateQuality(budget, {
      jsBytes: 620_000,
      cssBytes: 120_000,
      imageBytes: 2_000_000,
      modelBytes: 12_000_000,
      audioBytes: 4_000_000,
      lcpMs: 2100,
      cls: 0.05,
      inpMs: 160,
      maxLongTaskMs: 90,
      avgFrameTimeMs: 14,
      reducedMotionPassed: true,
      keyboardFocusPassed: true,
    });

    expect(report.passed).toBe(true);
    expect(report.failedCount).toBe(0);
  });

  it("fails explicit budget violations", () => {
    const report = evaluateQuality(budget, {
      jsBytes: 900_000,
      reducedMotionPassed: false,
      keyboardFocusPassed: true,
    });

    expect(report.passed).toBe(false);
    expect(report.gates.find((gate) => gate.gate === "js")?.status).toBe("fail");
    expect(
      report.gates.find((gate) => gate.gate === "reduced-motion")?.status
    ).toBe("fail");
  });

  it("downgrades performance tier when frame time is too high", () => {
    expect(
      recommendPerformanceTier(
        { avgFrameTimeMs: 28, maxLongTaskMs: 100 },
        budget
      )
    ).toBe("core");

    expect(
      recommendPerformanceTier(
        { avgFrameTimeMs: 18, maxLongTaskMs: 100 },
        budget
      )
    ).toBe("enhanced");

    expect(
      recommendPerformanceTier(
        { avgFrameTimeMs: 14, maxLongTaskMs: 80 },
        budget
      )
    ).toBe("cinematic");
  });

  it("serializes visual evidence manifests", () => {
    const manifest = {
      runId: "qa-001",
      commitSha: "abc",
      artifacts: [
        {
          id: "desktop",
          kind: "screenshot" as const,
          label: "desktop",
          viewport: "1920x1080",
        },
      ],
    };

    expect(deserializeEvidenceManifest(serializeEvidenceManifest(manifest))).toEqual(
      manifest
    );
  });
});
