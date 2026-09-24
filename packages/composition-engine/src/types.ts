import type { AvatarPresenceMode } from "@father/avatar-engine";
import type { StreamClass } from "@father/stream-engine";
import type { VisualizationForm } from "@father/visualization-engine";
import type { BreakpointMode, WorkspaceRegion } from "@father/workspace-engine";

export type CompositionScenario =
  | "research"
  | "coding"
  | "security"
  | "presentation"
  | "focus";

export type CompositionDensity = "compact" | "balanced" | "spacious";
export type PerformanceTier = "core" | "enhanced" | "cinematic";
export type ModuleRole = "primary" | "secondary" | "support" | "background";

export type CompositionModulePlan = {
  id: string;
  role: ModuleRole;
  region: WorkspaceRegion;
  visible: boolean;
  collapsed: boolean;
  order: number;
  visualization?: VisualizationForm;
  locked: boolean;
};

export type AvatarCompositionPlan = {
  visible: boolean;
  presence: AvatarPresenceMode;
  region: WorkspaceRegion;
  locked: boolean;
};

export type CompositionOverrides = {
  primaryModuleId?: string;
  moduleRegions?: Record<string, WorkspaceRegion>;
  suppressModules?: string[];
  avatarPresence?: AvatarPresenceMode;
};

export type CompositionInput = {
  scenario: CompositionScenario;
  breakpoint: BreakpointMode;
  performanceTier: PerformanceTier;
  reducedMotion: boolean;
  primaryStreamClass: StreamClass;
  interruptingAlert: boolean;
  availableModules: string[];
  preferredVisualization?: VisualizationForm;
  overrides?: CompositionOverrides;
};

export type CompositionPlan = {
  version: 1;
  scenario: CompositionScenario;
  breakpoint: BreakpointMode;
  density: CompositionDensity;
  primaryModuleId: string;
  modules: CompositionModulePlan[];
  avatar: AvatarCompositionPlan;
  reasons: string[];
};
