import { describe, expect, it } from "vitest";
import { deserializeBindings, dispatchInput, serializeBindings, type InputBinding } from "../src";

const bindings: InputBinding[] = [
  {
    id: "cmd-open",
    source: "keyboard",
    control: "Ctrl+K",
    action: "command.open",
    phase: "press",
    contexts: ["global"],
    priority: 100,
    enabled: true,
    allowInTextEditing: false
  },
  {
    id: "workspace-next",
    source: "keyboard",
    control: "Tab",
    action: "workspace.next",
    phase: "press",
    contexts: ["workspace"],
    priority: 50,
    enabled: true
  },
  {
    id: "game-confirm",
    source: "gamepad",
    control: "A",
    action: "menu.confirm",
    phase: "press",
    contexts: ["gameplay"],
    priority: 50,
    enabled: true
  }
];

describe("input engine", () => {
  it("dispatches semantic actions independent from hardware event objects", () => {
    const result = dispatchInput(bindings, {
      source: "keyboard",
      control: "Tab",
      phase: "press",
      context: "workspace",
      timestamp: 1
    });

    expect(result.selected?.action).toBe("workspace.next");
  });

  it("protects text editing from global shortcuts by default", () => {
    const result = dispatchInput(bindings, {
      source: "keyboard",
      control: "Ctrl+K",
      phase: "press",
      context: "text-editing",
      timestamp: 1
    });

    expect(result.suppressed).toBe(true);
    expect(result.selected).toBeNull();
  });

  it("supports future gamepad bindings without game-specific core logic", () => {
    const result = dispatchInput(bindings, {
      source: "gamepad",
      control: "A",
      phase: "press",
      context: "gameplay",
      timestamp: 1
    });

    expect(result.selected?.action).toBe("menu.confirm");
  });

  it("serializes bindings", () => {
    const restored = deserializeBindings(serializeBindings(bindings));
    expect(restored).toEqual(bindings);
  });
});
