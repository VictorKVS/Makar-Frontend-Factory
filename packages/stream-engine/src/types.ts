export type StreamClass =
  | "primary"
  | "secondary"
  | "background"
  | "alert"
  | "agent";

export type StreamUrgency = "low" | "normal" | "high" | "critical";

export type StreamLifecycle = "queued" | "active" | "resolved" | "archived";

export type StreamItem = {
  id: string;
  class: StreamClass;
  title: string;
  summary?: string;
  source: string;
  createdAt: string;
  updatedAt?: string;
  urgency: StreamUrgency;
  confidence: number;
  costOfMissing: number;
  lifecycle: StreamLifecycle;
  acknowledged: boolean;
  acknowledgedAt?: string;
  groupKey?: string;
  tags?: string[];
};

export type RankedStream = {
  item: StreamItem;
  score: number;
  reasons: string[];
};

export type AttentionBudget = {
  total: number;
  primary: number;
  secondary: number;
  background: number;
  alert: number;
  agent: number;
};

export type InterruptionPolicy = {
  minimumUrgency: "high" | "critical";
  minimumCostOfMissing: number;
  criticalAlwaysInterrupts: boolean;
};

export type AttentionSelection = {
  selected: RankedStream[];
  suppressed: RankedStream[];
};

export type StreamValidation = {
  valid: boolean;
  errors: string[];
};
