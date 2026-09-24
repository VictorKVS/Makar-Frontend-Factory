import type { AvatarPresenceMode } from "@father/avatar-engine";
import type { BreakpointMode, WorkspaceRegion } from "@father/workspace-engine";
import { scenarioPresets } from "./presets";
import type {
  CompositionDensity,
  CompositionInput,
  CompositionModulePlan,
  CompositionPlan
} from "./types";

function cloneModules(modules: CompositionModulePlan[]): CompositionModulePlan[] {
  return modules.map((module) => ({ ...module }));
}

function densityFor(breakpoint: BreakpointMode): CompositionDensity {
  if (breakpoint === "mobile" || breakpoint === "tablet") return "compact";
  if (breakpoint === "ultrawide") return "spacious";
  return "balanced";
}

function responsiveTransform(
  modules: CompositionModulePlan[],
  breakpoint: BreakpointMode,
  primaryModuleId: string,
  reasons: string[]
): CompositionModulePlan[] {
  if (breakpoint === "mobile") {
    reasons.push("responsive:mobile-collapse-secondary");
    return modules.map((module) => {
      if (module.locked || module.region === "overlay") return module;

      return {
        ...module,
        region: module.id === primaryModuleId ? "center" : "bottom",
        collapsed: module.id !== primaryModuleId,
        visible:
          module.visible &&
          (module.id === primaryModuleId || module.role !== "background")
      };
    });
  }

  if (breakpoint === "tablet") {
    reasons.push("responsive:tablet-reduce-side-regions");
    return modules.map((module) => {
      if (module.locked || module.region === "overlay") return module;

      return {
        ...module,
        region: module.region === "right" ? "bottom" : module.region,
        collapsed: module.role === "background" ? true : module.collapsed
      };
    });
  }

  return modules;
}

function performanceAvatar(
  requested: AvatarPresenceMode,
  tier: CompositionInput["performanceTier"],
  reducedMotion: boolean,
  reasons: string[]
): AvatarPresenceMode {
  if (reducedMotion && (requested === "hologram" || requested === "full")) {
    reasons.push(`avatar:reduced-motion:${requested}->portrait`);
    return "portrait";
  }

  if (tier === "core" && ["hologram", "full", "bust"].includes(requested)) {
    reasons.push(`avatar:performance-core:${requested}->compact`);
    return "compact";
  }

  if (tier === "enhanced" && requested === "hologram") {
    reasons.push("avatar:performance-enhanced:hologram->bust");
    return "bust";
  }

  return requested;
}

export function composeInterface(input: CompositionInput): CompositionPlan {
  const preset = scenarioPresets[input.scenario];
  const reasons = [`scenario:${input.scenario}`];
  let primaryModuleId = preset.primaryModuleId;
  let modules = cloneModules(preset.modules).filter((module) =>
    input.availableModules.includes(module.id)
  );

  if (!modules.some((module) => module.id === primaryModuleId)) {
    primaryModuleId = modules.find((module) => module.role === "primary")?.id
      ?? modules[0]?.id
      ?? "none";
    reasons.push(`primary:fallback:${primaryModuleId}`);
  }

  if (
    input.overrides?.primaryModuleId &&
    modules.some((module) => module.id === input.overrides?.primaryModuleId)
  ) {
    primaryModuleId = input.overrides.primaryModuleId;
    modules = modules.map((module) => ({
      ...module,
      role: module.id === primaryModuleId
        ? "primary"
        : module.role === "primary"
          ? "secondary"
          : module.role,
      locked: module.id === primaryModuleId ? true : module.locked
    }));
    reasons.push(`override:primary:${primaryModuleId}`);
  }

  if (input.overrides?.suppressModules?.length) {
    const suppressed = new Set(input.overrides.suppressModules);
    modules = modules.map((module) =>
      suppressed.has(module.id)
        ? { ...module, visible: false, collapsed: true, locked: true }
        : module
    );
    reasons.push("override:suppressed-modules");
  }

  if (input.overrides?.moduleRegions) {
    modules = modules.map((module) => {
      const region = input.overrides?.moduleRegions?.[module.id];
      return region
        ? { ...module, region, locked: true }
        : module;
    });
    reasons.push("override:module-regions");
  }

  if (input.preferredVisualization) {
    modules = modules.map((module) =>
      module.id === primaryModuleId
        ? { ...module, visualization: input.preferredVisualization }
        : module
    );
    reasons.push(`visualization:preferred:${input.preferredVisualization}`);
  }

  if (input.interruptingAlert && input.availableModules.includes("alerts")) {
    const existing = modules.find((module) => module.id === "alerts");
    if (existing) {
      modules = modules.map((module) =>
        module.id === "alerts"
          ? { ...module, visible: true, collapsed: false, region: "overlay", order: 0 }
          : module
      );
    } else {
      modules.push({
        id: "alerts",
        role: "secondary",
        region: "overlay",
        visible: true,
        collapsed: false,
        order: 0,
        locked: false
      });
    }
    reasons.push("alert:interrupting-overlay");
  }

  modules = responsiveTransform(modules, input.breakpoint, primaryModuleId, reasons);

  let avatarPresence =
    input.overrides?.avatarPresence ?? preset.avatar.presence;
  const avatarLocked = input.overrides?.avatarPresence !== undefined;

  if (!avatarLocked) {
    avatarPresence = performanceAvatar(
      avatarPresence,
      input.performanceTier,
      input.reducedMotion,
      reasons
    );
  } else {
    reasons.push(`override:avatar:${avatarPresence}`);
  }

  const avatarVisible =
    avatarPresence !== "hidden" && (avatarLocked ? true : preset.avatar.visible);

  if (input.primaryStreamClass === "background") {
    reasons.push("attention:background-does-not-promote-layout");
  }

  return {
    version: 1,
    scenario: input.scenario,
    breakpoint: input.breakpoint,
    density: densityFor(input.breakpoint),
    primaryModuleId,
    modules: modules.sort((a, b) =>
      a.region.localeCompare(b.region) || a.order - b.order || a.id.localeCompare(b.id)
    ),
    avatar: {
      visible: avatarVisible,
      presence: avatarPresence,
      region: preset.avatar.region as WorkspaceRegion,
      locked: avatarLocked
    },
    reasons
  };
}
