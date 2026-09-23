export * from "./types";
export * from "./base-tokens";
export * from "./themes";
export * from "./css-vars";

import { foundationTokens } from "./base-tokens";
import { alinaCinematicTheme, fatherDarkTheme } from "./themes";
import type { DesignTheme, TokenBundle } from "./types";

export function createTokenBundle(theme: DesignTheme = fatherDarkTheme): TokenBundle {
  return {
    foundation: foundationTokens,
    theme
  };
}

export const fatherDarkTokens = createTokenBundle(fatherDarkTheme);
export const alinaCinematicTokens = createTokenBundle(alinaCinematicTheme);
