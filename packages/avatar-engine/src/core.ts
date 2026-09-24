import type {
  AttentionTarget,
  AvatarActivity,
  AvatarExpression,
  AvatarGesture,
  AvatarIdentity,
  AvatarPresenceMode,
  AvatarRendererProfile,
  AvatarState,
  AvatarNegotiation,
  RendererCapability
} from "./types";

const fallbackOrder: Record<AvatarPresenceMode, AvatarPresenceMode[]> = {
  hologram: ["hologram", "full", "bust", "portrait", "compact", "voice-only", "hidden"],
  full: ["full", "bust", "portrait", "compact", "voice-only", "hidden"],
  bust: ["bust", "portrait", "compact", "voice-only", "hidden"],
  portrait: ["portrait", "compact", "voice-only", "hidden"],
  compact: ["compact", "voice-only", "hidden"],
  "voice-only": ["voice-only", "hidden"],
  hidden: ["hidden"]
};

export function createAvatarState(
  identity: AvatarIdentity,
  presence: AvatarPresenceMode = "compact"
): AvatarState {
  return {
    identity,
    presence,
    activity: "idle",
    expression: "neutral",
    gesture: "none",
    attention: { kind: "none" },
    canInterrupt: false,
    requestedCapabilities: presence === "hologram" ? ["3d", "motion"] : [],
    revision: 0
  };
}

function next(state: AvatarState, patch: Partial<AvatarState>): AvatarState {
  return {
    ...state,
    ...patch,
    identity: state.identity,
    revision: state.revision + 1
  };
}

export function setPresenceMode(
  state: AvatarState,
  presence: AvatarPresenceMode
): AvatarState {
  const requestedCapabilities: RendererCapability[] =
    presence === "hologram"
      ? ["3d", "motion"]
      : presence === "full"
        ? ["motion"]
        : [];

  return next(state, { presence, requestedCapabilities });
}

export function setAvatarActivity(
  state: AvatarState,
  activity: AvatarActivity
): AvatarState {
  return next(state, { activity });
}

export function setAvatarExpression(
  state: AvatarState,
  expression: AvatarExpression
): AvatarState {
  return next(state, { expression });
}

export function setAvatarGesture(
  state: AvatarState,
  gesture: AvatarGesture
): AvatarState {
  return next(state, { gesture });
}

export function setAttentionTarget(
  state: AvatarState,
  attention: AttentionTarget
): AvatarState {
  return next(state, { attention });
}

export function setAvatarTask(
  state: AvatarState,
  currentTaskId?: string,
  contextRef?: string
): AvatarState {
  return next(state, { currentTaskId, contextRef });
}

export function setInterruptionPermission(
  state: AvatarState,
  canInterrupt: boolean
): AvatarState {
  return next(state, { canInterrupt });
}

export function negotiateAvatarPresentation(
  state: AvatarState,
  renderer: AvatarRendererProfile
): AvatarNegotiation {
  const mode =
    fallbackOrder[state.presence].find((candidate) =>
      renderer.supportedModes.includes(candidate)
    ) ?? "hidden";

  const missingCapabilities = state.requestedCapabilities.filter(
    (capability) => !renderer.capabilities.includes(capability)
  );

  const reasons: string[] = [];
  if (mode !== state.presence) {
    reasons.push(`presence-fallback:${state.presence}->${mode}`);
  }

  if (missingCapabilities.length > 0) {
    reasons.push(`missing-capabilities:${missingCapabilities.join(",")}`);
  }

  if (
    renderer.reducedMotion &&
    state.requestedCapabilities.includes("motion") &&
    renderer.capabilities.includes("motion")
  ) {
    reasons.push("reduced-motion");
  }

  return {
    mode,
    degraded:
      mode !== state.presence ||
      missingCapabilities.length > 0 ||
      renderer.reducedMotion,
    missingCapabilities,
    reasons
  };
}
