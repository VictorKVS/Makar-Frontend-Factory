export type InputSource = "keyboard" | "pointer" | "touch" | "voice" | "gamepad";
export type TriggerPhase = "press" | "release" | "repeat" | "hold";
export type InputContext = "global" | "navigation" | "workspace" | "command" | "text-editing" | "gameplay";

export type SemanticAction =
  | "workspace.focus"
  | "workspace.next"
  | "workspace.previous"
  | "panel.close"
  | "panel.toggle"
  | "command.open"
  | "command.submit"
  | "avatar.toggle"
  | "menu.back"
  | "menu.confirm"
  | string;

export type InputBinding = {
  id: string;
  source: InputSource;
  control: string;
  action: SemanticAction;
  phase: TriggerPhase;
  contexts: InputContext[];
  priority: number;
  enabled: boolean;
  allowInTextEditing?: boolean;
};

export type InputEvent = {
  source: InputSource;
  control: string;
  phase: TriggerPhase;
  context: InputContext;
  timestamp: number;
  value?: number;
};

export type DispatchResult = {
  matched: InputBinding[];
  selected: InputBinding | null;
  suppressed: boolean;
  reason: string;
};
