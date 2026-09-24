import type { AgentHandoff } from "./types";

export function createHandoff(input: AgentHandoff): AgentHandoff {
  if (!input.from || !input.to || !input.artifact) {
    throw new Error("Invalid handoff identity");
  }

  if (input.from === input.to) {
    throw new Error("Handoff source and destination must differ");
  }

  return {
    ...input,
    sourceRefs: [...new Set(input.sourceRefs)],
  };
}
