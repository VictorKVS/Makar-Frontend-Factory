import { useState } from "react";
import {
  dispatchInput,
  type InputBinding,
  type InputContext,
  type InputSource,
} from "@father/input-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./input-demo.css";

const bindings: InputBinding[] = [
  {
    id: "keyboard-command",
    source: "keyboard",
    control: "Ctrl+K",
    action: "command.open",
    phase: "press",
    contexts: ["global"],
    priority: 100,
    enabled: true,
  },
  {
    id: "voice-command",
    source: "voice",
    control: "open-command",
    action: "command.open",
    phase: "press",
    contexts: ["global"],
    priority: 100,
    enabled: true,
  },
  {
    id: "touch-focus",
    source: "touch",
    control: "panel-tap",
    action: "workspace.focus",
    phase: "press",
    contexts: ["workspace"],
    priority: 60,
    enabled: true,
  },
  {
    id: "gamepad-confirm",
    source: "gamepad",
    control: "A",
    action: "menu.confirm",
    phase: "press",
    contexts: ["gameplay"],
    priority: 60,
    enabled: true,
  },
];

type Sample = {
  label: string;
  source: InputSource;
  control: string;
  context: InputContext;
};

const samples: Sample[] = [
  { label: "Keyboard Ctrl+K", source: "keyboard", control: "Ctrl+K", context: "global" },
  { label: "Voice: open command", source: "voice", control: "open-command", context: "global" },
  { label: "Touch: focus panel", source: "touch", control: "panel-tap", context: "workspace" },
  { label: "Gamepad A", source: "gamepad", control: "A", context: "gameplay" },
];

export function InputDemo() {
  const [lastAction, setLastAction] = useState("none");
  const [lastSource, setLastSource] = useState("none");

  const run = (sample: Sample) => {
    const result = dispatchInput(bindings, {
      source: sample.source,
      control: sample.control,
      phase: "press",
      context: sample.context,
      timestamp: Date.now(),
    });

    setLastAction(result.selected?.action ?? result.reason);
    setLastSource(sample.source);
  };

  return (
    <section className="input-lab" aria-labelledby="input-title">
      <div className="input-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 007</span>
          <h2 id="input-title">Input & Interaction Engine</h2>
          <p>
            Физическое устройство меняется, а бизнес-действие остаётся семантическим.
          </p>
        </div>
        <StatusIndicator tone="info" label="Device independent" />
      </div>

      <div className="input-grid">
        <GlassPanel tone="elevated" glow="medium" className="input-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">INPUT SOURCES</span>
              <h3>One semantic action layer</h3>
            </div>
            <Badge tone="warning">DEMO</Badge>
          </div>

          <div className="input-actions">
            {samples.map((sample) => (
              <Button key={sample.label} variant="ghost" onClick={() => run(sample)}>
                {sample.label}
              </Button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="input-result">
          <span className="eyebrow">DISPATCH RESULT</span>
          <div className="input-result-value" data-last-action={lastAction}>
            {lastAction}
          </div>
          <dl>
            <div><dt>Source</dt><dd>{lastSource}</dd></div>
            <div><dt>Keyboard</dt><dd>adapter</dd></div>
            <div><dt>Touch</dt><dd>adapter</dd></div>
            <div><dt>Voice</dt><dd>adapter</dd></div>
            <div><dt>Gamepad</dt><dd>future-ready adapter</dd></div>
          </dl>
          <p>
            Keyboard Ctrl+K и Voice “open command” оба превращаются в
            <strong> command.open</strong>. ALINA и будущая игра работают с действием,
            а не с конкретной кнопкой.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
