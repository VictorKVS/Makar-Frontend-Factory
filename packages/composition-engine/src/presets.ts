import type {
  AvatarCompositionPlan,
  CompositionModulePlan,
  CompositionScenario
} from "./types";

export type ScenarioPreset = {
  primaryModuleId: string;
  modules: CompositionModulePlan[];
  avatar: AvatarCompositionPlan;
};

function modulePlan(
  id: string,
  role: CompositionModulePlan["role"],
  region: CompositionModulePlan["region"],
  order: number,
  visible = true,
  collapsed = false,
  visualization?: CompositionModulePlan["visualization"]
): CompositionModulePlan {
  return {
    id,
    role,
    region,
    visible,
    collapsed,
    order,
    visualization,
    locked: false
  };
}

export const scenarioPresets: Record<CompositionScenario, ScenarioPreset> = {
  research: {
    primaryModuleId: "knowledge-graph",
    modules: [
      modulePlan("sources", "secondary", "left", 0),
      modulePlan("knowledge-graph", "primary", "center", 0, true, false, "graph"),
      modulePlan("context", "secondary", "right", 0),
      modulePlan("agent-activity", "background", "bottom", 0, true, true)
    ],
    avatar: { visible: true, presence: "compact", region: "overlay", locked: false }
  },
  coding: {
    primaryModuleId: "editor",
    modules: [
      modulePlan("project-tree", "secondary", "left", 0),
      modulePlan("editor", "primary", "center", 0, true, false, "canvas"),
      modulePlan("context", "support", "right", 0),
      modulePlan("terminal", "secondary", "bottom", 0),
      modulePlan("agent-activity", "background", "bottom", 1, true, true)
    ],
    avatar: { visible: true, presence: "compact", region: "overlay", locked: false }
  },
  security: {
    primaryModuleId: "visualization",
    modules: [
      modulePlan("sources", "secondary", "left", 0),
      modulePlan("visualization", "primary", "center", 0, true, false, "network"),
      modulePlan("alerts", "secondary", "right", 0),
      modulePlan("timeline", "support", "bottom", 0, true, false, "timeline"),
      modulePlan("agent-activity", "background", "bottom", 1, true, true)
    ],
    avatar: { visible: true, presence: "portrait", region: "overlay", locked: false }
  },
  presentation: {
    primaryModuleId: "visualization",
    modules: [
      modulePlan("visualization", "primary", "center", 0, true, false, "chart"),
      modulePlan("context", "support", "right", 0, true, true),
      modulePlan("sources", "background", "left", 0, false, true),
      modulePlan("agent-activity", "background", "bottom", 0, false, true)
    ],
    avatar: { visible: true, presence: "hologram", region: "overlay", locked: false }
  },
  focus: {
    primaryModuleId: "document",
    modules: [
      modulePlan("document", "primary", "center", 0),
      modulePlan("context", "support", "right", 0, false, true),
      modulePlan("sources", "background", "left", 0, false, true),
      modulePlan("agent-activity", "background", "bottom", 0, false, true)
    ],
    avatar: { visible: false, presence: "hidden", region: "overlay", locked: false }
  }
};
