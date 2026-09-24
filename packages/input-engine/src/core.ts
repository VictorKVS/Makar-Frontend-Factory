import type { DispatchResult, InputBinding, InputEvent, InputContext } from "./types";

export function validateBindings(bindings: InputBinding[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const binding of bindings) {
    if (ids.has(binding.id)) errors.push(`duplicate-id:${binding.id}`);
    ids.add(binding.id);

    if (!binding.contexts.length) errors.push(`no-context:${binding.id}`);
    if (binding.priority < 0) errors.push(`negative-priority:${binding.id}`);
  }

  return errors;
}

export function dispatchInput(
  bindings: InputBinding[],
  event: InputEvent
): DispatchResult {
  const textEditing = event.context === "text-editing";

  const matched = bindings
    .filter((binding) => binding.enabled)
    .filter((binding) => binding.source === event.source)
    .filter((binding) => binding.control === event.control)
    .filter((binding) => binding.phase === event.phase)
    .filter((binding) =>
      binding.contexts.includes(event.context) || binding.contexts.includes("global")
    )
    .filter((binding) => !textEditing || binding.allowInTextEditing === true)
    .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));

  if (textEditing && matched.length === 0) {
    return {
      matched,
      selected: null,
      suppressed: true,
      reason: "text-editing-protected"
    };
  }

  return {
    matched,
    selected: matched[0] ?? null,
    suppressed: false,
    reason: matched.length ? "binding-selected" : "no-match"
  };
}

export function bindingsForContext(
  bindings: InputBinding[],
  context: InputContext
): InputBinding[] {
  return bindings
    .filter((binding) => binding.enabled)
    .filter((binding) => binding.contexts.includes(context) || binding.contexts.includes("global"))
    .sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
}
