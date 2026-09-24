export type DataOrigin = "live" | "cached" | "demo" | "synthetic" | "unavailable";
export type DataState = "loading" | "ready" | "empty" | "stale" | "error" | "offline";
export type SemanticStreamClass = "primary" | "secondary" | "background" | "alert" | "agent";

export type Provenance = {
  origin: DataOrigin;
  sourceId: string;
  observedAt: string | null;
  receivedAt: string;
  staleAfterMs?: number;
  correlationId?: string;
};

export type DataEnvelope<T> = {
  state: DataState;
  data: T | null;
  provenance: Provenance;
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
};

export type ContextItem = {
  id: string;
  title: string;
  summary?: string;
  kind: "source" | "document" | "entity" | "hypothesis" | "metric" | "task";
};

export type AlertRecord = {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  summary: string;
  acknowledged: boolean;
};

export type AgentActivityRecord = {
  id: string;
  agentId: string;
  title: string;
  status: "queued" | "working" | "completed" | "failed";
  summary?: string;
};

export type VisualizationDatum = {
  label: string;
  value: number;
};

export type VisualizationPayload = {
  intent: "compare" | "trend" | "inspect" | "relate" | "locate" | "sequence" | "monitor";
  formHint?: "metric" | "table" | "chart" | "timeline" | "graph" | "map" | "network" | "canvas";
  data: VisualizationDatum[];
};

export type PrimaryWorkPayload = {
  module: string;
  title: string;
  description: string;
  visualization?: VisualizationPayload;
  content?: string;
};

export type StreamRecord = {
  id: string;
  class: SemanticStreamClass;
  title: string;
  summary: string;
  urgency: number;
  costOfMissing: number;
  createdAt: string;
};

export type ScenarioSnapshot = {
  scenarioId: "research" | "coding" | "security" | "presentation" | "focus";
  projectTitle: string;
  primary: PrimaryWorkPayload;
  secondary: ContextItem[];
  background: StreamRecord[];
  alerts: AlertRecord[];
  agentActivity: AgentActivityRecord[];
};

export type CommandRequest = {
  text: string;
  scenarioId: ScenarioSnapshot["scenarioId"];
  targetAgentId?: string;
  requestId: string;
};

export type CommandResult = {
  requestId: string;
  correlationId: string;
  accepted: boolean;
  message: string;
  targetAgentId?: string;
};

export type GatewayScenarioId = ScenarioSnapshot["scenarioId"];

export interface DataGateway {
  readonly id: string;
  loadScenario(id: GatewayScenarioId): Promise<DataEnvelope<ScenarioSnapshot>>;
  submitCommand(request: CommandRequest): Promise<DataEnvelope<CommandResult>>;
}

export type RealtimeEvent<T = unknown> = {
  type: string;
  payload: T;
  provenance: Provenance;
};

export interface RealtimeSource {
  readonly id: string;
  subscribe(handler: (event: RealtimeEvent) => void): () => void;
}
