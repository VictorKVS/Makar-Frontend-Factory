import type { CompositionPlan } from "./types";

export function serializeCompositionPlan(plan: CompositionPlan): string {
  return JSON.stringify(plan);
}

export function deserializeCompositionPlan(serialized: string): CompositionPlan {
  const value = JSON.parse(serialized) as CompositionPlan;

  if (
    value?.version !== 1 ||
    !value?.scenario ||
    !value?.breakpoint ||
    !value?.primaryModuleId ||
    !Array.isArray(value?.modules) ||
    !value?.avatar
  ) {
    throw new Error("Invalid composition plan");
  }

  return value;
}
