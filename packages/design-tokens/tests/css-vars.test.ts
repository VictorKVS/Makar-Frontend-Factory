import { describe, expect, it } from "vitest";
import { alinaCinematicTokens, toCssVariableMap, toCssVariables } from "../src";

describe("design tokens", () => {
  it("generates semantic CSS variables", () => {
    const vars = toCssVariableMap(alinaCinematicTokens);

    expect(vars["--father-theme-colors-accent"]).toBe("#62D6FF");
    expect(vars["--father-foundation-spacing-4"]).toBe("16px");
    expect(vars["--father-foundation-depth-avatar"]).toBe("70");
  });

  it("supports custom selector and namespace", () => {
    const css = toCssVariables(alinaCinematicTokens, "[data-theme='alina']", "ff");

    expect(css).toContain("[data-theme='alina']");
    expect(css).toContain("--ff-theme-colors-accent: #62D6FF;");
  });
});
