import { describe, expect, it } from "vitest";
import { selectSceneAdapter } from "../src";

describe("cinematic scene adapter", () => {
  it("keeps Core independent from WebGL", () => {
    const result = selectSceneAdapter({
      desiredTier: "core",
      webglSupported: true,
      reducedMotion: false,
    });

    expect(result.adapter).toBe("dom-core");
    expect(result.webglActive).toBe(false);
    expect(result.threeDimensional).toBe(false);
  });

  it("uses real cinematic adapter only when WebGL is available", () => {
    const ready = selectSceneAdapter({
      desiredTier: "cinematic",
      webglSupported: true,
      reducedMotion: false,
    });

    expect(ready.adapter).toBe("webgl-cinematic");
    expect(ready.threeDimensional).toBe(true);

    const fallback = selectSceneAdapter({
      desiredTier: "cinematic",
      webglSupported: false,
      reducedMotion: false,
    });

    expect(fallback.adapter).toBe("dom-enhanced");
    expect(fallback.resolvedTier).toBe("enhanced");
    expect(fallback.reasons).toContain("no-webgl");
  });

  it("preserves WebGL scene while disabling continuous animation for reduced motion", () => {
    const result = selectSceneAdapter({
      desiredTier: "cinematic",
      webglSupported: true,
      reducedMotion: true,
    });

    expect(result.adapter).toBe("webgl-cinematic");
    expect(result.animated).toBe(false);
    expect(result.reasons).toContain("reduced-motion");
  });
});
