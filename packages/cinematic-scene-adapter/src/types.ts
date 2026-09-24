export type ScenePerformanceTier = "core" | "enhanced" | "cinematic";

export type SceneAdapterKind =
  | "dom-core"
  | "dom-enhanced"
  | "webgl-cinematic";

export type SceneCapabilityInput = {
  desiredTier: ScenePerformanceTier;
  webglSupported: boolean;
  reducedMotion: boolean;
};

export type SceneAdapterDecision = {
  adapter: SceneAdapterKind;
  resolvedTier: ScenePerformanceTier;
  webglActive: boolean;
  threeDimensional: boolean;
  animated: boolean;
  reasons: string[];
};

export type WebGLHologramController = {
  readonly kind: "webgl-cinematic";
  readonly threeDimensional: true;
  start(): void;
  stop(): void;
  renderOnce(timeMs?: number): void;
  resize(): void;
  dispose(): void;
};
