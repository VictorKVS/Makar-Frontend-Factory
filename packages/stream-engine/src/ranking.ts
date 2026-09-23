import type {
  RankedStream,
  StreamClass,
  StreamItem,
  StreamLifecycle,
  StreamUrgency,
} from "./types";

const classWeight: Record<StreamClass, number> = {
  alert: 600,
  primary: 500,
  secondary: 400,
  agent: 300,
  background: 100,
};

const urgencyWeight: Record<StreamUrgency, number> = {
  low: 0,
  normal: 10,
  high: 30,
  critical: 50,
};

const lifecycleWeight: Record<StreamLifecycle, number> = {
  queued: 0,
  active: 20,
  resolved: -500,
  archived: -1000,
};

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function scoreStream(item: StreamItem): RankedStream {
  const reasons: string[] = [
    `class:${item.class}`,
    `urgency:${item.urgency}`,
    `lifecycle:${item.lifecycle}`,
  ];

  let score =
    classWeight[item.class] +
    urgencyWeight[item.urgency] +
    lifecycleWeight[item.lifecycle] +
    clamp01(item.costOfMissing) * 40 +
    clamp01(item.confidence) * 10;

  if (item.acknowledged) {
    score -= item.class === "alert" ? 120 : 10;
    reasons.push("acknowledged");
  }

  return { item, score, reasons };
}

export function rankStreams(items: StreamItem[]): RankedStream[] {
  return items
    .map(scoreStream)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;

      const aTime = Date.parse(a.item.updatedAt ?? a.item.createdAt);
      const bTime = Date.parse(b.item.updatedAt ?? b.item.createdAt);

      if (bTime !== aTime) return bTime - aTime;
      return a.item.id.localeCompare(b.item.id);
    });
}
