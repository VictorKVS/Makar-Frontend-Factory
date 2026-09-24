import type { VisualEvidenceManifest } from "./types";

export function serializeEvidenceManifest(
  manifest: VisualEvidenceManifest
): string {
  return JSON.stringify(manifest);
}

export function deserializeEvidenceManifest(
  serialized: string
): VisualEvidenceManifest {
  const value = JSON.parse(serialized) as VisualEvidenceManifest;

  if (!value?.runId || !Array.isArray(value.artifacts)) {
    throw new Error("Invalid visual evidence manifest");
  }

  return value;
}
