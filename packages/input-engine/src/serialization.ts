import type { InputBinding } from "./types";
import { validateBindings } from "./core";

export function serializeBindings(bindings: InputBinding[]): string {
  return JSON.stringify(bindings);
}

export function deserializeBindings(serialized: string): InputBinding[] {
  const value = JSON.parse(serialized) as InputBinding[];

  if (!Array.isArray(value)) {
    throw new Error("Invalid input bindings");
  }

  const errors = validateBindings(value);
  if (errors.length) {
    throw new Error(`Invalid input bindings: ${errors.join(", ")}`);
  }

  return value;
}
