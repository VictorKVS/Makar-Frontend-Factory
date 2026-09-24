import type { AvatarState } from "./types";

export function serializeAvatarState(state: AvatarState): string {
  return JSON.stringify(state);
}

export function deserializeAvatarState(serialized: string): AvatarState {
  const value = JSON.parse(serialized) as AvatarState;

  if (!value?.identity?.id || !value?.identity?.name || !value?.presence) {
    throw new Error("Invalid avatar state");
  }

  return value;
}
