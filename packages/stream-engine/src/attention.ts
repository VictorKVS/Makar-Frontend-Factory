import { rankStreams } from "./ranking";
import type {
  AttentionBudget,
  AttentionSelection,
  InterruptionPolicy,
  RankedStream,
  StreamClass,
  StreamItem,
  StreamUrgency,
} from "./types";

export const defaultAttentionBudget: AttentionBudget = {
  total: 7,
  primary: 1,
  secondary: 2,
  background: 1,
  alert: 1,
  agent: 2,
};

export const defaultInterruptionPolicy: InterruptionPolicy = {
  minimumUrgency: "high",
  minimumCostOfMissing: 0.5,
  criticalAlwaysInterrupts: true,
};

const urgencyRank: Record<StreamUrgency, number> = {
  low: 0,
  normal: 1,
  high: 2,
  critical: 3,
};

function classLimit(budget: AttentionBudget, streamClass: StreamClass): number {
  return budget[streamClass];
}

export function selectAttention(
  items: StreamItem[],
  budget: AttentionBudget = defaultAttentionBudget
): AttentionSelection {
  const ranked = rankStreams(items).filter(
    ({ item }) => item.lifecycle !== "archived" && item.lifecycle !== "resolved"
  );

  const selected: RankedStream[] = [];
  const suppressed: RankedStream[] = [];
  const counts: Record<StreamClass, number> = {
    primary: 0,
    secondary: 0,
    background: 0,
    alert: 0,
    agent: 0,
  };

  for (const entry of ranked) {
    const streamClass = entry.item.class;
    const underClassLimit = counts[streamClass] < classLimit(budget, streamClass);
    const underTotalLimit = selected.length < budget.total;

    if (underClassLimit && underTotalLimit) {
      selected.push(entry);
      counts[streamClass] += 1;
    } else {
      suppressed.push(entry);
    }
  }

  return { selected, suppressed };
}

export function shouldInterrupt(
  item: StreamItem,
  policy: InterruptionPolicy = defaultInterruptionPolicy
): boolean {
  if (item.class !== "alert") return false;
  if (item.acknowledged) return false;
  if (item.lifecycle === "resolved" || item.lifecycle === "archived") return false;

  if (policy.criticalAlwaysInterrupts && item.urgency === "critical") {
    return true;
  }

  const urgentEnough =
    urgencyRank[item.urgency] >= urgencyRank[policy.minimumUrgency];
  const costlyEnough =
    Math.max(0, Math.min(1, item.costOfMissing)) >= policy.minimumCostOfMissing;

  return urgentEnough && costlyEnough;
}

export function interruptingAlerts(
  items: StreamItem[],
  policy: InterruptionPolicy = defaultInterruptionPolicy
): RankedStream[] {
  return rankStreams(items.filter((item) => shouldInterrupt(item, policy)));
}
