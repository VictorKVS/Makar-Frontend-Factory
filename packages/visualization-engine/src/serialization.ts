import type { VisualizationState } from "./types";

export function serializeVisualizationState(state: VisualizationState): string {
  return JSON.stringify(state);
}

export function deserializeVisualizationState(serialized: string): VisualizationState {
  const value = JSON.parse(serialized) as VisualizationState;

  if (!value?.request?.id || !value?.recommendation?.primary || !value?.selectedForm) {
    throw new Error("Invalid visualization state");
  }

  return value;
}
