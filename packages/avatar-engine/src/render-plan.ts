import { negotiateAvatarPresentation } from "./core";
import type {
  AvatarPresenceMode,
  AvatarRendererProfile,
  AvatarState,
} from "./types";

export type AvatarAssetBindings = Partial<
  Record<AvatarPresenceMode, string>
>;

export type AvatarRenderPlan = {
  identityId: string;
  identityName: string;
  requestedMode: AvatarPresenceMode;
  resolvedMode: AvatarPresenceMode;
  rendererId: string;
  assetId: string | null;
  activity: AvatarState["activity"];
  expression: AvatarState["expression"];
  gesture: AvatarState["gesture"];
  attention: AvatarState["attention"];
  currentTaskId?: string;
  contextRef?: string;
  revision: number;
  degraded: boolean;
  missingCapabilities: AvatarRenderCapability[];
  reasons: string[];
  motionEnabled: boolean;
};

type AvatarRenderCapability = AvatarRendererProfile["capabilities"][number];

export function createAvatarRenderPlan(
  state: AvatarState,
  renderer: AvatarRendererProfile,
  assets: AvatarAssetBindings = {}
): AvatarRenderPlan {
  const negotiation = negotiateAvatarPresentation(state, renderer);
  const assetId = assets[negotiation.mode] ?? null;

  return {
    identityId: state.identity.id,
    identityName: state.identity.name,
    requestedMode: state.presence,
    resolvedMode: negotiation.mode,
    rendererId: renderer.id,
    assetId,
    activity: state.activity,
    expression: state.expression,
    gesture: state.gesture,
    attention: state.attention,
    currentTaskId: state.currentTaskId,
    contextRef: state.contextRef,
    revision: state.revision,
    degraded: negotiation.degraded,
    missingCapabilities: negotiation.missingCapabilities,
    reasons: negotiation.reasons,
    motionEnabled:
      renderer.capabilities.includes("motion") && !renderer.reducedMotion,
  };
}
