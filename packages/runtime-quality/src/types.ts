export type RuntimeMetric = {
  value: number | null;
  source: string;
  supported: boolean;
};

export type RuntimeQualitySnapshot = {
  collectedAt: string;
  userAgent: string;
  lcpMs: RuntimeMetric;
  cls: RuntimeMetric;
  interactionResponsivenessMs: RuntimeMetric;
  maxLongTaskMs: RuntimeMetric;
  avgFrameTimeMs: RuntimeMetric;
};

export type RuntimeQualityBudget = {
  lcpMs: number;
  cls: number;
  interactionMs: number;
  maxLongTaskMs: number;
  avgFrameTimeMs: number;
};

export type RuntimeMetricStatus = "pass" | "fail" | "unknown";

export type RuntimeQualityGate = {
  id:
    | "lcp"
    | "cls"
    | "interaction"
    | "long-task"
    | "frame-time";
  status: RuntimeMetricStatus;
  value: number | null;
  budget: number;
  source: string;
};

export type RuntimeQualityEvaluation = {
  passed: boolean;
  complete: boolean;
  gates: RuntimeQualityGate[];
  failed: string[];
  unknown: string[];
};

export type RuntimeQualityCollector = {
  snapshot(): RuntimeQualitySnapshot;
  sampleFrameTime(frameCount?: number): Promise<number | null>;
  dispose(): void;
};
