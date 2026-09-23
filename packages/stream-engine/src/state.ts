import type { StreamItem, StreamLifecycle, StreamValidation } from "./types";

function replaceItem(
  items: StreamItem[],
  id: string,
  updater: (item: StreamItem) => StreamItem
): StreamItem[] {
  let found = false;

  const next = items.map((item) => {
    if (item.id !== id) return item;
    found = true;
    return updater({ ...item });
  });

  if (!found) throw new Error(`Unknown stream item: ${id}`);
  return next;
}

export function acknowledgeStream(
  items: StreamItem[],
  id: string,
  acknowledgedAt: string
): StreamItem[] {
  return replaceItem(items, id, (item) => ({
    ...item,
    acknowledged: true,
    acknowledgedAt,
    updatedAt: acknowledgedAt,
  }));
}

export function reopenStream(items: StreamItem[], id: string, updatedAt: string): StreamItem[] {
  return replaceItem(items, id, (item) => ({
    ...item,
    acknowledged: false,
    acknowledgedAt: undefined,
    lifecycle: "active",
    updatedAt,
  }));
}

export function setStreamLifecycle(
  items: StreamItem[],
  id: string,
  lifecycle: StreamLifecycle,
  updatedAt: string
): StreamItem[] {
  return replaceItem(items, id, (item) => ({
    ...item,
    lifecycle,
    updatedAt,
  }));
}

export function validateStreams(items: StreamItem[]): StreamValidation {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const item of items) {
    if (!item.id.trim()) errors.push("Stream id must not be empty");
    if (ids.has(item.id)) errors.push(`Duplicate stream id: ${item.id}`);
    ids.add(item.id);

    if (!item.source.trim()) errors.push(`Missing source for: ${item.id}`);
    if (!Number.isFinite(Date.parse(item.createdAt))) {
      errors.push(`Invalid createdAt for: ${item.id}`);
    }
    if (item.confidence < 0 || item.confidence > 1) {
      errors.push(`Confidence out of range for: ${item.id}`);
    }
    if (item.costOfMissing < 0 || item.costOfMissing > 1) {
      errors.push(`Cost-of-missing out of range for: ${item.id}`);
    }
  }

  return { valid: errors.length === 0, errors };
}
