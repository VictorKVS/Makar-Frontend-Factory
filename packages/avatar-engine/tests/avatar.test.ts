import { describe, expect, it } from "vitest";
import {
  createAvatarState,
  deserializeAvatarState,
  negotiateAvatarPresentation,
  serializeAvatarState,
  setAttentionTarget,
  setAvatarActivity,
  setAvatarTask,
  setPresenceMode
} from "../src";

const identity = {
  id: "alina",
  name: "ALINA",
  personaVersion: "1.0"
};

describe("avatar engine", () => {
  it("preserves identity, task and attention across presentation mode changes", () => {
    let state = createAvatarState(identity, "compact");
    state = setAvatarTask(state, "M0.6", "project:alina");
    state = setAttentionTarget(state, {
      kind: "panel",
      id: "knowledge-graph",
      label: "Knowledge Graph"
    });
    state = setAvatarActivity(state, "thinking");

    const hologram = setPresenceMode(state, "hologram");

    expect(hologram.identity).toEqual(identity);
    expect(hologram.currentTaskId).toBe("M0.6");
    expect(hologram.attention.id).toBe("knowledge-graph");
    expect(hologram.activity).toBe("thinking");
    expect(hologram.presence).toBe("hologram");
  });

  it("falls back from hologram to a supported renderer mode", () => {
    const state = setPresenceMode(createAvatarState(identity), "hologram");

    const result = negotiateAvatarPresentation(state, {
      id: "basic-2d",
      supportedModes: ["portrait", "compact", "voice-only", "hidden"],
      capabilities: ["2d", "audio"],
      reducedMotion: false
    });

    expect(result.mode).toBe("portrait");
    expect(result.degraded).toBe(true);
    expect(result.reasons[0]).toContain("presence-fallback");
  });

  it("marks reduced-motion negotiation as degraded without changing identity state", () => {
    const state = setPresenceMode(createAvatarState(identity), "full");

    const result = negotiateAvatarPresentation(state, {
      id: "motion-renderer",
      supportedModes: ["full", "portrait", "compact", "hidden"],
      capabilities: ["2d", "motion"],
      reducedMotion: true
    });

    expect(result.mode).toBe("full");
    expect(result.degraded).toBe(true);
    expect(result.reasons).toContain("reduced-motion");
  });

  it("serializes and restores avatar state", () => {
    const state = setAvatarActivity(
      setPresenceMode(createAvatarState(identity), "voice-only"),
      "speaking"
    );

    const restored = deserializeAvatarState(serializeAvatarState(state));

    expect(restored.identity.id).toBe("alina");
    expect(restored.presence).toBe("voice-only");
    expect(restored.activity).toBe("speaking");
  });
});
