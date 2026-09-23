import type {
  BreakpointMode,
  CreateWorkspaceInput,
  PanelRegistry,
  WorkspacePanel,
  WorkspaceRegion,
  WorkspaceState,
  WorkspaceValidation,
} from "./types";

function clonePanels(panels: WorkspacePanel[]): WorkspacePanel[] {
  return panels.map((panel) => ({ ...panel }));
}

function sortPanels(panels: WorkspacePanel[]): WorkspacePanel[] {
  return [...panels].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

function updatePanel(
  state: WorkspaceState,
  panelId: string,
  updater: (panel: WorkspacePanel) => WorkspacePanel
): WorkspaceState {
  let found = false;

  const panels = state.panels.map((panel) => {
    if (panel.id !== panelId) return panel;
    found = true;
    return updater({ ...panel });
  });

  if (!found) {
    throw new Error(`Unknown panel: ${panelId}`);
  }

  return { ...state, panels: sortPanels(panels) };
}

export function createWorkspace(input: CreateWorkspaceInput): WorkspaceState {
  const seen = new Set<string>();

  for (const panel of input.panels) {
    if (!panel.id.trim()) throw new Error("Panel id must not be empty");
    if (seen.has(panel.id)) throw new Error(`Duplicate panel id: ${panel.id}`);
    seen.add(panel.id);
  }

  return {
    id: input.id,
    version: 1,
    breakpointMode: input.breakpointMode ?? "desktop",
    focusedPanelId: null,
    panels: sortPanels(clonePanels(input.panels)),
  };
}

export function dockPanel(
  state: WorkspaceState,
  panelId: string,
  region: WorkspaceRegion,
  order?: number
): WorkspaceState {
  return updatePanel(state, panelId, (panel) => ({
    ...panel,
    mode: "docked",
    region,
    order: order ?? panel.order,
  }));
}

export function floatPanel(
  state: WorkspaceState,
  panelId: string,
  region: WorkspaceRegion = "overlay"
): WorkspaceState {
  return updatePanel(state, panelId, (panel) => ({
    ...panel,
    mode: "floating",
    region,
  }));
}

export function setPanelCollapsed(
  state: WorkspaceState,
  panelId: string,
  collapsed: boolean
): WorkspaceState {
  const next = updatePanel(state, panelId, (panel) => ({ ...panel, collapsed }));

  return collapsed && next.focusedPanelId === panelId
    ? { ...next, focusedPanelId: null }
    : next;
}

export function focusPanel(state: WorkspaceState, panelId: string | null): WorkspaceState {
  if (panelId === null) return { ...state, focusedPanelId: null };

  const panel = state.panels.find((candidate) => candidate.id === panelId);
  if (!panel) throw new Error(`Unknown panel: ${panelId}`);
  if (panel.collapsed) throw new Error(`Cannot focus collapsed panel: ${panelId}`);

  return { ...state, focusedPanelId: panelId };
}

export function restoreWorkspace(state: WorkspaceState): WorkspaceState {
  return {
    ...state,
    focusedPanelId: null,
    panels: state.panels.map((panel) => ({
      ...panel,
      collapsed: false,
      mode: "docked",
      region: panel.region === "overlay" ? "center" : panel.region,
    })),
  };
}

export function applyBreakpoint(
  state: WorkspaceState,
  breakpointMode: BreakpointMode
): WorkspaceState {
  if (breakpointMode === state.breakpointMode) return state;

  if (breakpointMode === "mobile") {
    return {
      ...state,
      breakpointMode,
      focusedPanelId: null,
      panels: state.panels.map((panel, index) => ({
        ...panel,
        mode: "docked",
        region: "center",
        order: index,
      })),
    };
  }

  if (breakpointMode === "tablet") {
    return {
      ...state,
      breakpointMode,
      focusedPanelId: null,
      panels: state.panels.map((panel) => ({
        ...panel,
        mode: "docked",
        region: panel.region === "overlay" ? "right" : panel.region,
      })),
    };
  }

  return { ...state, breakpointMode };
}

export function validateWorkspace(
  state: WorkspaceState,
  registry: PanelRegistry
): WorkspaceValidation {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const panel of state.panels) {
    if (ids.has(panel.id)) errors.push(`Duplicate panel id: ${panel.id}`);
    ids.add(panel.id);

    const definition = registry[panel.contentType];
    if (!definition) {
      errors.push(`Unknown content type: ${panel.contentType}`);
      continue;
    }

    if (!definition.allowedModes.includes(panel.mode)) {
      errors.push(`Mode ${panel.mode} is not allowed for ${panel.contentType}`);
    }
  }

  if (state.focusedPanelId && !ids.has(state.focusedPanelId)) {
    errors.push(`Focused panel does not exist: ${state.focusedPanelId}`);
  }

  return { valid: errors.length === 0, errors };
}
