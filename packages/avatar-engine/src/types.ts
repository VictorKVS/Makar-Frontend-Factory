export type AvatarPresenceMode =
  | "hidden"
  | "voice-only"
  | "compact"
  | "portrait"
  | "bust"
  | "full"
  | "hologram";

export type AvatarActivity =
  | "idle"
  | "listening"
  | "thinking"
  | "speaking"
  | "working";

export type AvatarExpression =
  | "neutral"
  | "focused"
  | "warm"
  | "concerned"
  | "confident";

export type AvatarGesture =
  | "none"
  | "greet"
  | "explain"
  | "point"
  | "confirm"
  | "warn";

export type AttentionKind = "none" | "user" | "panel" | "entity" | "task";

export type AttentionTarget = {
  kind: AttentionKind;
  id?: string;
  label?: string;
};

export type RendererCapability =
  | "audio"
  | "2d"
  | "2.5d"
  | "3d"
  | "motion"
  | "lip-sync";

export type AvatarIdentity = {
  id: string;
  name: string;
  personaVersion: string;
};

export type AvatarState = {
  identity: AvatarIdentity;
  presence: AvatarPresenceMode;
  activity: AvatarActivity;
  expression: AvatarExpression;
  gesture: AvatarGesture;
  attention: AttentionTarget;
  currentTaskId?: string;
  contextRef?: string;
  canInterrupt: boolean;
  requestedCapabilities: RendererCapability[];
  revision: number;
};

export type AvatarRendererProfile = {
  id: string;
  supportedModes: AvatarPresenceMode[];
  capabilities: RendererCapability[];
  reducedMotion: boolean;
};

export type AvatarNegotiation = {
  mode: AvatarPresenceMode;
  degraded: boolean;
  missingCapabilities: RendererCapability[];
  reasons: string[];
};
