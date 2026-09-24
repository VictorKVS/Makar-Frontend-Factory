export type VisualizationIntent =
  | "compare"
  | "trend"
  | "inspect"
  | "relate"
  | "locate"
  | "sequence"
  | "monitor";

export type DataShape =
  | "scalar"
  | "records"
  | "series"
  | "events"
  | "graph"
  | "geo"
  | "network";

export type VisualizationForm =
  | "metric"
  | "table"
  | "chart"
  | "timeline"
  | "graph"
  | "map"
  | "network"
  | "canvas";

export type Density = "low" | "medium" | "high";
export type InteractionLevel = "static" | "inspectable" | "interactive";

export type VisualizationRequest = {
  id: string;
  intent: VisualizationIntent;
  shape: DataShape;
  itemCount: number;
  hasTime?: boolean;
  hasGeo?: boolean;
  relationshipDepth?: number;
  requiresExactValues?: boolean;
  preferredForms?: VisualizationForm[];
  excludedForms?: VisualizationForm[];
};

export type VisualizationRecommendation = {
  primary: VisualizationForm;
  alternates: VisualizationForm[];
  fallback: VisualizationForm;
  density: Density;
  interaction: InteractionLevel;
  reasons: string[];
  accessibleSummaryRequired: boolean;
};

export type VisualizationState = {
  request: VisualizationRequest;
  recommendation: VisualizationRecommendation;
  selectedForm: VisualizationForm;
};
