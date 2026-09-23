import type { WorkspacePanel, WorkspaceState } from "./types";

function isPanel(value: unknown): value is WorkspacePanel {
  if (!value || typeof value !== "object") return false;
  const panel = value as Partial<WorkspacePanel>;

  return (
    typeof panel.id === "string" &&
    typeof panel.contentType === "string" &&
    typeof panel.title === "string" &&
    typeof panel.region === "string" &&
    typeof panel.mode === "string" &&
    typeof panel.order === "number" &&
    typeof panel.collapsed === "boolean"
  );
}

function isWorkspaceState(value: unknown): value is WorkspaceState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<WorkspaceState>;

  return (
    typeof state.id === "string" &&
    state.version === 1 &&
    typeof state.breakpointMode === "string" &&
    (state.focusedPanelId === null || typeof state.focusedPanelId === "string") &&
    Array.isArray(state.panels) &&
    state.panels.every(isPanel)
  );
}

export function serializeWorkspace(state: WorkspaceState): string {
  return JSON.stringify(state);
}

export function deserializeWorkspace(serialized: string): WorkspaceState {
  const value: unknown = JSON.parse(serialized);

  if (!isWorkspaceState(value)) {
    throw new Error("Invalid workspace payload");
  }

  return value;
}
