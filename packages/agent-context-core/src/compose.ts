import type { AgentState, KnowledgeItem, RankedKnowledge, TaskNeed } from "./types";

const skillWeight: Record<string, number> = {
  K0: 1.0,
  K1: 0.9,
  K2: 0.75,
  K3: 0.55,
  K4: 0.35,
  K5: 0.2,
  K6: 0.1
};

export function rankKnowledge(
  items: KnowledgeItem[],
  task: TaskNeed,
  agent: AgentState
): RankedKnowledge[] {
  return items
    .map((item) => {
      let score = item.importance * 0.35 + item.confidence * 0.15;
      const reasons: string[] = [];

      if (task.explicitKnowledgeRefs.includes(item.id)) {
        score += 1;
        reasons.push("explicit-ref");
      }

      if (task.domains.includes(item.domain)) {
        score += 0.5;
        reasons.push("domain-match");
      }

      if (item.projects_used_in.includes(task.projectId)) {
        score += 0.2;
        reasons.push("project-match");
      }

      const skill = agent.skills[item.domain] ?? "K1";
      score += (skillWeight[skill] ?? 0.5) * 0.25;
      reasons.push(`skill-${skill}`);

      return { item, score, reasons };
    })
    .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id));
}

export function selectKnowledge(
  items: KnowledgeItem[],
  task: TaskNeed,
  agent: AgentState
): RankedKnowledge[] {
  const ranked = rankKnowledge(items, task, agent);
  const selected: RankedKnowledge[] = [];
  const seen = new Set<string>();

  const add = (entry: RankedKnowledge | undefined) => {
    if (!entry || seen.has(entry.item.id)) return;
    selected.push(entry);
    seen.add(entry.item.id);
  };

  for (const ref of task.explicitKnowledgeRefs) {
    add(ranked.find((entry) => entry.item.id === ref));
  }

  for (const entry of ranked) {
    if (selected.length >= agent.maxKnowledgeItems) break;
    add(entry);
  }

  return selected.slice(0, agent.maxKnowledgeItems);
}
