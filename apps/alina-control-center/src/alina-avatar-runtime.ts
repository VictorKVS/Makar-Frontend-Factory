import {
  createAvatarRenderPlan,
  createAvatarState,
  setAttentionTarget,
  setAvatarActivity,
  setAvatarExpression,
  setAvatarGesture,
  setAvatarTask,
  setPresenceMode,
  type AvatarActivity,
  type AvatarAssetBindings,
  type AvatarPresenceMode,
  type AvatarRendererProfile,
} from "@father/avatar-engine";

export type AlinaPerformanceTier = "core" | "enhanced" | "cinematic";

export const alinaAvatarAssets: AvatarAssetBindings = {
  "voice-only": "asset:alina:voice:v1",
  compact: "asset:alina:portrait:v1",
  portrait: "asset:alina:portrait:v1",
  bust: "asset:alina:bust:v1",
  full: "asset:alina:full:v1",
  hologram: "asset:alina:hologram:v1",
};

export function avatarRendererForTier(
  tier: AlinaPerformanceTier,
  reducedMotion: boolean,
  cinematic3dAvailable = false
): AvatarRendererProfile {
  if (tier === "core") {
    return {
      id: "alina-dom-core",
      supportedModes: ["portrait", "compact", "voice-only", "hidden"],
      capabilities: ["audio", "2d"],
      reducedMotion,
    };
  }

  if (tier === "enhanced") {
    return {
      id: "alina-dom-2.5d",
      supportedModes: ["full", "bust", "portrait", "compact", "voice-only", "hidden"],
      capabilities: ["audio", "2d", "2.5d", "motion"],
      reducedMotion,
    };
  }

  return cinematic3dAvailable
    ? {
        id: "alina-webgl-cinematic",
        supportedModes: [
          "hologram",
          "full",
          "bust",
          "portrait",
          "compact",
          "voice-only",
          "hidden",
        ],
        capabilities: ["audio", "2d", "2.5d", "3d", "motion"],
        reducedMotion,
      }
    : {
        id: "alina-dom-cinematic-proxy",
        supportedModes: [
          "hologram",
          "full",
          "bust",
          "portrait",
          "compact",
          "voice-only",
          "hidden",
        ],
        capabilities: ["audio", "2d", "2.5d", "motion"],
        reducedMotion,
      };
}

function expressionForActivity(activity: AvatarActivity) {
  switch (activity) {
    case "listening":
      return "warm" as const;
    case "thinking":
    case "working":
      return "focused" as const;
    case "speaking":
      return "confident" as const;
    default:
      return "neutral" as const;
  }
}

function gestureForActivity(activity: AvatarActivity) {
  switch (activity) {
    case "speaking":
      return "explain" as const;
    case "working":
      return "point" as const;
    case "listening":
      return "confirm" as const;
    default:
      return "none" as const;
  }
}

export function createAlinaAvatarPlan(input: {
  requestedMode: AvatarPresenceMode;
  tier: AlinaPerformanceTier;
  reducedMotion: boolean;
  activity: AvatarActivity;
  taskId: string;
  contextRef: string;
  attentionLabel: string;
  cinematic3dAvailable?: boolean;
}) {
  let state = createAvatarState(
    {
      id: "alina",
      name: "ALINA",
      personaVersion: "1.0.0",
    },
    input.requestedMode
  );

  state = setPresenceMode(state, input.requestedMode);
  state = setAvatarTask(state, input.taskId, input.contextRef);
  state = setAttentionTarget(state, {
    kind: "panel",
    id: input.contextRef,
    label: input.attentionLabel,
  });
  state = setAvatarActivity(state, input.activity);
  state = setAvatarExpression(state, expressionForActivity(input.activity));
  state = setAvatarGesture(state, gestureForActivity(input.activity));

  return createAvatarRenderPlan(
    state,
    avatarRendererForTier(
      input.tier,
      input.reducedMotion,
      input.cinematic3dAvailable ?? false
    ),
    alinaAvatarAssets
  );
}

export function resolveProductAvatarMode(
  requestedMode: AvatarPresenceMode,
  tier: AlinaPerformanceTier
): AvatarPresenceMode {
  return createAlinaAvatarPlan({
    requestedMode,
    tier,
    reducedMotion: false,
    activity: "idle",
    taskId: "product-shell",
    contextRef: "primary-work",
    attentionLabel: "Primary work",
  }).resolvedMode;
}
