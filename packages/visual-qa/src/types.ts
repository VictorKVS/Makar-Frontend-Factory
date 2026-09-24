export type ViewportBudget = {
  name: string;
  width: number;
  height: number;
};

export type QualityBudget = {
  jsBytes: number;
  cssBytes: number;
  imageBytes: number;
  modelBytes: number;
  audioBytes: number;
  lcpMs: number;
  cls: number;
  inpMs: number;
  maxLongTaskMs: number;
  targetFrameTimeMs: number;
  viewports: ViewportBudget[];
  reducedMotionRequired: boolean;
  keyboardFocusRequired: boolean;
};

export type QualityMeasurement = {
  jsBytes?: number;
  cssBytes?: number;
  imageBytes?: number;
  modelBytes?: number;
  audioBytes?: number;
  lcpMs?: number;
  cls?: number;
  inpMs?: number;
  maxLongTaskMs?: number;
  avgFrameTimeMs?: number;
  reducedMotionPassed?: boolean;
  keyboardFocusPassed?: boolean;
};

export type QualityGateName =
  | "js"
  | "css"
  | "images"
  | "models"
  | "audio"
  | "lcp"
  | "cls"
  | "inp"
  | "long-task"
  | "frame-time"
  | "reduced-motion"
  | "keyboard-focus";

export type QualityGateResult = {
  gate: QualityGateName;
  status: "pass" | "fail" | "unknown";
  actual?: number | boolean;
  budget?: number | boolean;
  message: string;
};

export type QualityReport = {
  passed: boolean;
  gates: QualityGateResult[];
  unknownCount: number;
  failedCount: number;
};

export type EvidenceArtifact = {
  id: string;
  kind: "screenshot" | "trace" | "report" | "benchmark" | "video";
  label: string;
  path?: string;
  viewport?: string;
  createdAt?: string;
};

export type VisualEvidenceManifest = {
  runId: string;
  commitSha?: string;
  artifacts: EvidenceArtifact[];
};
