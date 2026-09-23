import type {
  Density,
  InteractionLevel,
  VisualizationForm,
  VisualizationRecommendation,
  VisualizationRequest
} from "./types";

const intentDefaults: Record<string, VisualizationForm[]> = {
  compare: ["chart", "table", "metric"],
  trend: ["chart", "timeline", "table"],
  inspect: ["table", "metric", "canvas"],
  relate: ["graph", "network", "table"],
  locate: ["map", "table", "canvas"],
  sequence: ["timeline", "table", "chart"],
  monitor: ["metric", "chart", "table"]
};

function densityFor(count: number): Density {
  if (count <= 12) return "low";
  if (count <= 250) return "medium";
  return "high";
}

function interactionFor(request: VisualizationRequest): InteractionLevel {
  if (request.itemCount <= 1 && request.intent === "monitor") return "static";
  if (request.itemCount < 50 && request.intent !== "relate") return "inspectable";
  return "interactive";
}

function compatible(form: VisualizationForm, request: VisualizationRequest): boolean {
  if (request.excludedForms?.includes(form)) return false;
  if (form === "map" && !(request.hasGeo || request.shape === "geo")) return false;
  if (form === "timeline" && !(request.hasTime || request.shape === "events")) return false;
  if (form === "graph" && request.shape !== "graph" && request.intent !== "relate") return false;
  if (form === "network" && request.shape !== "network" && request.intent !== "relate") return false;
  if (form === "metric" && request.itemCount > 12 && request.intent !== "monitor") return false;
  return true;
}

export function recommendVisualization(
  request: VisualizationRequest
): VisualizationRecommendation {
  const reasons: string[] = [];
  const candidates: VisualizationForm[] = [];

  for (const preferred of request.preferredForms ?? []) {
    if (compatible(preferred, request)) {
      candidates.push(preferred);
      reasons.push(`preferred:${preferred}`);
    }
  }

  if (request.requiresExactValues && compatible("table", request)) {
    candidates.push("table");
    reasons.push("exact-values");
  }

  if ((request.hasGeo || request.shape === "geo") && compatible("map", request)) {
    candidates.push("map");
    reasons.push("geospatial-data");
  }

  if ((request.hasTime || request.shape === "events") && request.intent === "sequence" && compatible("timeline", request)) {
    candidates.push("timeline");
    reasons.push("temporal-sequence");
  }

  for (const form of intentDefaults[request.intent] ?? ["table"]) {
    if (compatible(form, request)) candidates.push(form);
  }

  const unique = [...new Set(candidates)];
  const primary = unique[0] ?? "table";
  const fallback: VisualizationForm =
    compatible("table", request) ? "table" : compatible("metric", request) ? "metric" : primary;

  reasons.push(`intent:${request.intent}`);
  reasons.push(`shape:${request.shape}`);

  return {
    primary,
    alternates: unique.slice(1, 4),
    fallback,
    density: densityFor(request.itemCount),
    interaction: interactionFor(request),
    reasons,
    accessibleSummaryRequired: primary !== "table"
  };
}

export function createVisualizationState(
  request: VisualizationRequest
) {
  const recommendation = recommendVisualization(request);
  return {
    request,
    recommendation,
    selectedForm: recommendation.primary
  };
}

export function selectVisualizationForm(
  state: ReturnType<typeof createVisualizationState>,
  form: VisualizationForm
) {
  const allowed = new Set([
    state.recommendation.primary,
    ...state.recommendation.alternates,
    state.recommendation.fallback
  ]);

  if (!allowed.has(form)) {
    throw new Error(`Visualization form ${form} is not allowed for this recommendation`);
  }

  return { ...state, selectedForm: form };
}
