import type {
  SceneAdapterDecision,
  SceneCapabilityInput,
} from "./types";

export function selectSceneAdapter(
  input: SceneCapabilityInput
): SceneAdapterDecision {
  if (input.desiredTier === "core") {
    return {
      adapter: "dom-core",
      resolvedTier: "core",
      webglActive: false,
      threeDimensional: false,
      animated: false,
      reasons: ["tier:core"],
    };
  }

  if (input.desiredTier === "enhanced") {
    return {
      adapter: "dom-enhanced",
      resolvedTier: "enhanced",
      webglActive: false,
      threeDimensional: false,
      animated: !input.reducedMotion,
      reasons: input.reducedMotion
        ? ["tier:enhanced", "reduced-motion"]
        : ["tier:enhanced"],
    };
  }

  if (!input.webglSupported) {
    return {
      adapter: "dom-enhanced",
      resolvedTier: "enhanced",
      webglActive: false,
      threeDimensional: false,
      animated: !input.reducedMotion,
      reasons: ["no-webgl", ...(input.reducedMotion ? ["reduced-motion"] : [])],
    };
  }

  return {
    adapter: "webgl-cinematic",
    resolvedTier: "cinematic",
    webglActive: true,
    threeDimensional: true,
    animated: !input.reducedMotion,
    reasons: input.reducedMotion
      ? ["webgl-ready", "reduced-motion"]
      : ["webgl-ready"],
  };
}
