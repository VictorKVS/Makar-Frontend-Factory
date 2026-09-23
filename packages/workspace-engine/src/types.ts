export type WorkspaceRegion = "left" | "center" | "right" | "bottom" | "overlay";
export type PanelMode = "docked" | "floating";
export type BreakpointMode = "mobile" | "tablet" | "laptop" | "desktop" | "ultrawide";

export type WorkspacePanel = {
  id: string;
  contentType: string;
  title: string;
  region: WorkspaceRegion;
  mode: PanelMode;
  order: number;
  collapsed: boolean;
};

export type WorkspaceState = {
  id: string;
  version: 1;
  breakpointMode: BreakpointMode;
  focusedPanelId: string | null;
  panels: WorkspacePanel[];
};

export type PanelDefinition = {
  contentType: string;
  title: string;
  defaultRegion: WorkspaceRegion;
  allowedModes: readonly PanelMode[];
};

export type PanelRegistry = Record<string, PanelDefinition>;

export type CreateWorkspaceInput = {
  id: string;
  breakpointMode?: BreakpointMode;
  panels: WorkspacePanel[];
};

export type WorkspaceValidation = {
  valid: boolean;
  errors: string[];
};
