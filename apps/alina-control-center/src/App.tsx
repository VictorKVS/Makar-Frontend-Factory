import { useState } from "react";
import {
  Badge,
  Button,
  CommandBar,
  GlassPanel,
  IconButton,
  MetricCard,
  NavigationItem,
  StatusIndicator,
} from "@father/ui";
import { WorkspaceDemo } from "./WorkspaceDemo";
import { StreamDemo } from "./StreamDemo";
import { VisualizationDemo } from "./VisualizationDemo";
import { AvatarDemo } from "./AvatarDemo";
import { CompositionDemo } from "./CompositionDemo";
import { InputDemo } from "./InputDemo";

const metrics = [
  { label: "ДАННЫЕ", value: "12.4K", delta: "+12%", deltaTone: "success" as const },
  { label: "СВЯЗИ", value: "248", delta: "+23%", deltaTone: "success" as const },
  { label: "ГИПОТЕЗЫ", value: "3", delta: "DEMO", deltaTone: "warning" as const },
  { label: "ЗАДАЧИ", value: "7", delta: "-2", deltaTone: "neutral" as const },
];

const nav = [
  ["Knowledge Base", "Документы · Граф · RAG"],
  ["Sources", "Официальные · OSINT"],
  ["Projects", "Задачи · Roadmap"],
  ["Agents", "Специалисты · Навыки"],
  ["Research", "Анализ · Гипотезы"],
];

export function App() {
  const [command, setCommand] = useState("");
  const [activeNav, setActiveNav] = useState(0);
  const [lastCommand, setLastCommand] = useState("Пока команд нет");

  return (
    <main className="lab-shell">
      <header className="lab-topbar">
        <div>
          <span className="eyebrow">MAKAR · FRONTEND FACTORY</span>
          <h1>ALINA Engineering Lab</h1>
        </div>
        <div className="topbar-status">
          <Badge tone="warning">DEMO / MOCK</Badge>
          <StatusIndicator tone="success" label="M0.8 in progress" />
        </div>
      </header>

      <aside className="lab-sidebar" aria-label="ALINA sections">
        <div className="brand-mark" aria-hidden="true">△</div>
        <div className="brand-copy">
          <strong>FATHER</strong>
          <span>Frontend Factory</span>
        </div>

        <nav className="nav-list">
          {nav.map(([label, description], index) => (
            <NavigationItem
              key={label}
              active={activeNav === index}
              label={label}
              description={description}
              icon={<span>{String(index + 1).padStart(2, "0")}</span>}
              onClick={() => setActiveNav(index)}
            />
          ))}
        </nav>

        <GlassPanel className="sidebar-note" tone="base" glow="none">
          <span className="eyebrow">PRINCIPLE</span>
          <strong>Экран — композиция модулей.</strong>
          <p>Не монолитная страница.</p>
        </GlassPanel>
      </aside>

      <section className="lab-stage">
        <div className="stage-grid">
          <GlassPanel className="hero-panel" tone="elevated" glow="strong">
            <div className="hero-copy">
              <span className="eyebrow">ALINA · ADAPTIVE COMPOSITION</span>
              <h2>Интерфейс перестраивается под задачу, а не заставляет задачу жить в одном дашборде.</h2>
              <p>
                Composition Engine связывает Workspace, Streams, Visualization
                и Avatar в один объяснимый план интерфейса.
              </p>
              <div className="hero-actions">
                <Button variant="primary" onClick={() => setLastCommand("Запущен композиционный тест")}>
                  Запустить тест
                </Button>
                <Button variant="ghost" onClick={() => setLastCommand("Открыта архитектура композиции")}>
                  Архитектура
                </Button>
                <IconButton aria-label="More actions" title="More actions">•••</IconButton>
              </div>
            </div>

            <div className="avatar-placeholder" aria-label="ALINA avatar engine status">
              <div className="avatar-orbit orbit-one" />
              <div className="avatar-orbit orbit-two" />
              <div className="avatar-core">
                <span>ALINA</span>
                <small>Composition-aware persona</small>
              </div>
            </div>
          </GlassPanel>

          <section className="metric-grid" aria-label="Demo metrics">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

          <GlassPanel className="materials-panel" tone="base" glow="medium">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">ENGINE STACK</span>
                <h3>Independent systems → one composition</h3>
              </div>
              <StatusIndicator tone="info" label="Explainable plan" />
            </div>

            <div className="material-grid">
              <GlassPanel tone="base" glow="none" className="material-swatch">
                <strong>WORKSPACE</strong>
                <span>where modules live</span>
              </GlassPanel>
              <GlassPanel tone="elevated" glow="soft" className="material-swatch">
                <strong>STREAMS + VIZ</strong>
                <span>what matters · how shown</span>
              </GlassPanel>
              <GlassPanel tone="interactive" glow="medium" className="material-swatch">
                <strong>AVATAR</strong>
                <span>persona presence</span>
              </GlassPanel>
            </div>
          </GlassPanel>

          <GlassPanel className="status-panel" tone="base" glow="soft">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">SCENARIO SYSTEM</span>
                <h3>Research / Coding / Security / Presentation / Focus</h3>
              </div>
            </div>

            <div className="status-list">
              <div><Badge tone="info">PRIMARY</Badge><span>Один главный рабочий контекст</span></div>
              <div><Badge tone="neutral">MODULES</Badge><span>Перестраиваются по задаче</span></div>
              <div><Badge tone="success">AVATAR</Badge><span>Не привязан к одному месту</span></div>
              <div><Badge tone="warning">FALLBACK</Badge><span>Учитывает экран и ресурсы</span></div>
              <div><Badge tone="danger">ALERT</Badge><span>Следует interruption policy</span></div>
            </div>
          </GlassPanel>

          <GlassPanel className="activity-panel" tone="elevated" glow="soft">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">CONTEXT FEEDBACK</span>
                <h3>Последнее действие</h3>
              </div>
              <Badge tone="warning">EXPERIMENT 007</Badge>
            </div>
            <p className="last-command">{lastCommand}</p>
            <p className="muted">
              ALINA фиксирует причины композиции и то, какой контекст понадобился Макару.
            </p>
          </GlassPanel>
        </div>

        <CompositionDemo />

        <InputDemo />

        <details className="engine-labs-disclosure">
          <summary>Открыть инженерные лаборатории M0.3–M0.6</summary>
          <div className="engine-labs-stack">
            <WorkspaceDemo />
            <StreamDemo />
            <VisualizationDemo />
            <AvatarDemo />
          </div>
        </details>

        <CommandBar
          value={command}
          onValueChange={setCommand}
          onSubmitCommand={(value) => {
            const trimmed = value.trim();
            if (!trimmed) return;
            setLastCommand(trimmed);
            setCommand("");
          }}
          placeholder="Спросите ALINA или поставьте задачу Макару…"
          startSlot={<span aria-hidden="true">＋</span>}
          endSlot={
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          }
        />
      </section>
    </main>
  );
}
