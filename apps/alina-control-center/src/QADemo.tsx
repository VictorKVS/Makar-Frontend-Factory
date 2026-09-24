import { useMemo, useState } from "react";
import {
  evaluateQuality,
  recommendPerformanceTier,
  type QualityBudget,
  type QualityMeasurement,
} from "@father/visual-qa";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./qa-demo.css";

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

const samples: Record<string, QualityMeasurement> = {
  healthy: {
    jsBytes: 580_000,
    cssBytes: 126_000,
    imageBytes: 1_900_000,
    modelBytes: 10_500_000,
    audioBytes: 3_200_000,
    lcpMs: 2050,
    cls: 0.04,
    inpMs: 145,
    maxLongTaskMs: 82,
    avgFrameTimeMs: 14.2,
    reducedMotionPassed: true,
    keyboardFocusPassed: true,
  },
  overloaded: {
    jsBytes: 890_000,
    cssBytes: 172_000,
    imageBytes: 3_100_000,
    modelBytes: 19_000_000,
    audioBytes: 4_200_000,
    lcpMs: 3250,
    cls: 0.14,
    inpMs: 280,
    maxLongTaskMs: 210,
    avgFrameTimeMs: 29,
    reducedMotionPassed: true,
    keyboardFocusPassed: true,
  },
};

export function QADemo() {
  const [sampleId, setSampleId] = useState("healthy");
  const measurement = samples[sampleId];

  const report = useMemo(
    () => evaluateQuality(budget, measurement),
    [measurement]
  );

  const tier = recommendPerformanceTier(measurement, budget);

  return (
    <section
      className="qa-lab"
      aria-labelledby="qa-title"
      data-qa-status={report.passed ? "pass" : "fail"}
      data-performance-tier={tier}
    >
      <div className="qa-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 009</span>
          <h2 id="qa-title">Performance & Visual QA</h2>
          <p>
            Cinematic — это не картинка. Это визуальный эффект с бюджетом,
            fallback и доказательством в CI.
          </p>
        </div>
        <StatusIndicator
          tone={report.passed ? "success" : "danger"}
          label={report.passed ? "Quality gates pass" : "Quality budget failed"}
        />
      </div>

      <div className="qa-grid">
        <GlassPanel tone="elevated" glow="medium" className="qa-controls">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">MEASUREMENT SET</span>
              <h3>{sampleId}</h3>
            </div>
            <Badge tone="warning">DEMO METRICS</Badge>
          </div>

          <div className="qa-buttons">
            <Button
              variant={sampleId === "healthy" ? "primary" : "ghost"}
              onClick={() => setSampleId("healthy")}
            >
              Healthy
            </Button>
            <Button
              variant={sampleId === "overloaded" ? "primary" : "ghost"}
              onClick={() => setSampleId("overloaded")}
            >
              Overloaded
            </Button>
          </div>

          <dl className="qa-summary">
            <div><dt>Failed gates</dt><dd>{report.failedCount}</dd></div>
            <div><dt>Unknown gates</dt><dd>{report.unknownCount}</dd></div>
            <div><dt>Scene tier</dt><dd>{tier}</dd></div>
            <div><dt>Frame budget</dt><dd>{budget.targetFrameTimeMs} ms</dd></div>
          </dl>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="qa-gates">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">QUALITY GATES</span>
              <h3>Explicit evidence</h3>
            </div>
            <Badge tone={report.passed ? "success" : "danger"}>
              {report.passed ? "PASS" : "FAIL"}
            </Badge>
          </div>

          <div className="qa-gate-list">
            {report.gates.map((gate) => (
              <div key={gate.gate} className="qa-gate" data-gate-status={gate.status}>
                <strong>{gate.gate}</strong>
                <Badge
                  tone={
                    gate.status === "pass"
                      ? "success"
                      : gate.status === "fail"
                        ? "danger"
                        : "neutral"
                  }
                >
                  {gate.status.toUpperCase()}
                </Badge>
                <span>{gate.message}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
