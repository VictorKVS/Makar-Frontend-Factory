import type { TokenBundle } from "./types";

type FlatValue = string | number;

function toKebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}

function flatten(
  input: Record<string, unknown>,
  prefix: string[] = [],
  output: Record<string, FlatValue> = {}
): Record<string, FlatValue> {
  for (const [key, value] of Object.entries(input)) {
    const path = [...prefix, toKebabCase(key)];
    if (typeof value === "string" || typeof value === "number") {
      output[path.join("-")] = value;
    } else if (value && typeof value === "object") {
      flatten(value as Record<string, unknown>, path, output);
    }
  }

  return output;
}

export function toCssVariableMap(bundle: TokenBundle, namespace = "father"): Record<string, string> {
  const flat = flatten(bundle as unknown as Record<string, unknown>);
  return Object.fromEntries(
    Object.entries(flat).map(([key, value]) => [`--${namespace}-${key}`, String(value)])
  );
}

export function toCssVariables(bundle: TokenBundle, selector = ":root", namespace = "father"): string {
  const variables = toCssVariableMap(bundle, namespace);
  const body = Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `${selector} {\n${body}\n}`;
}
