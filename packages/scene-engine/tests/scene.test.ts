import { describe, expect, it } from "vitest";
import {
  assetsByLoadPolicy,
  deserializeSceneManifest,
  resolveScene,
  serializeSceneManifest,
  validateSceneManifest,
  type SceneManifest,
} from "../src";

const manifest: SceneManifest = {
  id: "alina-stage",
  version: "1.0.0",
  defaultTier: "cinematic",
  assets: [
    {
      id: "portrait",
      type: "image",
      source: "/assets/alina/portrait.webp",
      version: "1",
      loadPolicy: "preload",
      required: true,
      license: "project-owned",
    },
    {
      id: "full-model",
      type: "model",
      source: "/assets/alina/full.glb",
      version: "1",
      loadPolicy: "lazy",
      required: false,
      fallbackAssetId: "portrait",
      license: "project-owned",
    },
  ],
  nodes: [
    {
      id: "portrait-node",
      kind: "avatar",
      assetId: "portrait",
      visible: true,
      minTier: "core",
    },
    {
      id: "model-node",
      kind: "avatar",
      assetId: "full-model",
      visible: true,
      minTier: "cinematic",
    },
  ],
  camera: {
    mode: "perspective",
    fov: 42,
    near: 0.1,
    far: 100,
  },
  lights: [
    {
      id: "ambient",
      kind: "ambient",
      intensity: 0.6,
      minTier: "core",
    },
  ],
};

describe("scene engine", () => {
  it("validates stable asset references", () => {
    expect(validateSceneManifest(manifest)).toEqual([]);
  });

  it("degrades cinematic scenes to core without WebGL", () => {
    const scene = resolveScene(manifest, {
      webgl: false,
      maxTier: "cinematic",
      reducedMotion: false,
    });

    expect(scene.tier).toBe("core");
    expect(scene.degraded).toBe(true);
    expect(scene.reasons).toContain("no-webgl");
    expect(scene.activeNodes.map((node) => node.id)).toEqual(["portrait-node"]);
  });

  it("keeps reduced motion below cinematic tier", () => {
    const scene = resolveScene(manifest, {
      webgl: true,
      maxTier: "cinematic",
      reducedMotion: true,
    });

    expect(scene.tier).toBe("enhanced");
    expect(scene.reasons).toContain("reduced-motion");
  });

  it("separates preload and lazy asset policy", () => {
    expect(assetsByLoadPolicy(manifest, "preload").map((asset) => asset.id)).toEqual(["portrait"]);
    expect(assetsByLoadPolicy(manifest, "lazy").map((asset) => asset.id)).toEqual(["full-model"]);
  });

  it("serializes a valid scene manifest", () => {
    expect(deserializeSceneManifest(serializeSceneManifest(manifest))).toEqual(manifest);
  });
});
