import type { DataEnvelope, DataState, Provenance } from "./types";

export function isStale(
  provenance: Provenance,
  nowMs = Date.now()
): boolean {
  if (!provenance.observedAt || provenance.staleAfterMs === undefined) return false;
  const observed = Date.parse(provenance.observedAt);
  if (Number.isNaN(observed)) return true;
  return nowMs - observed > provenance.staleAfterMs;
}

export function withDerivedState<T>(
  envelope: DataEnvelope<T>,
  nowMs = Date.now()
): DataEnvelope<T> {
  if (envelope.state !== "ready") return envelope;
  if (!isStale(envelope.provenance, nowMs)) return envelope;
  return { ...envelope, state: "stale" };
}

export function createEnvelope<T>(input: {
  state: DataState;
  data: T | null;
  provenance: Provenance;
  error?: DataEnvelope<T>["error"];
}): DataEnvelope<T> {
  return {
    state: input.state,
    data: input.data,
    provenance: input.provenance,
    ...(input.error ? { error: input.error } : {}),
  };
}
