import { describe, expect, it } from "vitest";
import {
  createAvatarRenderPlan,
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


describe("avatar render plan", () => {
  it("binds stable assets without moving persona state into the renderer", () => {
    let state = createAvatarState(identity, "bust");
    state = setAvatarTask(state, "M1.5", "project:alina");
    state = setAttentionTarget(state, {
      kind: "panel",
      id: "knowledge-graph",
      label: "Knowledge Graph"
    });
    state = setAvatarActivity(state, "working");

    const plan = createAvatarRenderPlan(
      state,
      {
        id: "dom-2.5d",
        supportedModes: ["bust", "portrait", "compact", "voice-only", "hidden"],
        capabilities: ["audio", "2d", "2.5d", "motion"],
        reducedMotion: false
      },
      {
        bust: "asset:alina:bust:v1",
        portrait: "asset:alina:portrait:v1"
      }
    );

    expect(plan.assetId).toBe("asset:alina:bust:v1");
    expect(plan.currentTaskId).toBe("M1.5");
    expect(plan.attention.id).toBe("knowledge-graph");
    expect(plan.rendererId).toBe("dom-2.5d");
  });

  it("reports hologram proxy degradation when 3d capability is absent", () => {
    const state = setPresenceMode(createAvatarState(identity), "hologram");

    const plan = createAvatarRenderPlan(
      state,
      {
        id: "dom-cinematic-proxy",
        supportedModes: ["hologram", "full", "bust", "portrait", "compact", "voice-only", "hidden"],
        capabilities: ["audio", "2d", "2.5d", "motion"],
        reducedMotion: false
      },
      { hologram: "asset:alina:hologram:v1" }
    );

    expect(plan.resolvedMode).toBe("hologram");
    expect(plan.degraded).toBe(true);
    expect(plan.missingCapabilities).toContain("3d");
  });

  it("disables render-plan motion in reduced-motion mode", () => {
    const state = setPresenceMode(createAvatarState(identity), "full");

    const plan = createAvatarRenderPlan(
      state,
      {
        id: "accessible-renderer",
        supportedModes: ["full", "bust", "portrait", "compact", "voice-only", "hidden"],
        capabilities: ["audio", "2d", "2.5d", "motion"],
        reducedMotion: true
      }
    );

    expect(plan.motionEnabled).toBe(false);
    expect(plan.degraded).toBe(true);
  });
});
