import type { SceneManifest } from "./types";
import { validateSceneManifest } from "./core";

export function serializeSceneManifest(manifest: SceneManifest): string {
  return JSON.stringify(manifest);
}

export function deserializeSceneManifest(serialized: string): SceneManifest {
  const manifest = JSON.parse(serialized) as SceneManifest;
  const errors = validateSceneManifest(manifest);

  if (errors.length) {
    throw new Error(`Invalid scene manifest: ${errors.join(", ")}`);
  }

  return manifest;
}
