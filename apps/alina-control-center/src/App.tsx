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
          <span className="eyebrow">MAKAR · EXPERIMENT 001</span>
          <h1>ALINA Visual Token Lab</h1>
        </div>
        <div className="topbar-status">
          <Badge tone="warning">DEMO / MOCK</Badge>
          <StatusIndicator tone="success" label="UI foundation online" />
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
              <span className="eyebrow">ALINA · CINEMATIC THEME</span>
              <h2>Интерфейс должен управлять вниманием, а не создавать шум.</h2>
              <p>
                Первый живой слой FATHER: semantic tokens, glass surfaces,
                status hierarchy, focus states и reduced-motion fallback.
              </p>
              <div className="hero-actions">
                <Button variant="primary" onClick={() => setLastCommand("Запущен визуальный тест")}>
                  Запустить тест
                </Button>
                <Button variant="ghost" onClick={() => setLastCommand("Открыта архитектура")}>
                  Архитектура
                </Button>
                <IconButton aria-label="More actions" title="More actions">•••</IconButton>
              </div>
            </div>

            <div className="avatar-placeholder" aria-label="ALINA avatar placeholder">
              <div className="avatar-orbit orbit-one" />
              <div className="avatar-orbit orbit-two" />
              <div className="avatar-core">
                <span>ALINA</span>
                <small>Avatar Engine slot</small>
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
                <span className="eyebrow">MATERIAL SYSTEM</span>
                <h3>Glass / Glow / Depth</h3>
              </div>
              <StatusIndicator tone="info" label="Token driven" />
            </div>

            <div className="material-grid">
              <GlassPanel tone="base" glow="none" className="material-swatch">
                <strong>BASE</strong>
                <span>quiet support</span>
              </GlassPanel>
              <GlassPanel tone="elevated" glow="soft" className="material-swatch">
                <strong>ELEVATED</strong>
                <span>working surface</span>
              </GlassPanel>
              <GlassPanel tone="interactive" glow="medium" className="material-swatch">
                <strong>INTERACTIVE</strong>
                <span>attention layer</span>
              </GlassPanel>
            </div>
          </GlassPanel>

          <GlassPanel className="status-panel" tone="base" glow="soft">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">INFORMATION PRIORITY</span>
                <h3>Stream states</h3>
              </div>
            </div>

            <div className="status-list">
              <div><Badge tone="info">PRIMARY</Badge><span>Текущая задача пользователя</span></div>
              <div><Badge tone="neutral">SECONDARY</Badge><span>Поддерживающий контекст</span></div>
              <div><Badge tone="success">AGENT</Badge><span>Работа специалиста завершена</span></div>
              <div><Badge tone="warning">BACKGROUND</Badge><span>Индексация · DEMO</span></div>
              <div><Badge tone="danger">ALERT</Badge><span>Требует внимания</span></div>
            </div>
          </GlassPanel>

          <GlassPanel className="activity-panel" tone="elevated" glow="soft">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">CONTEXT FEEDBACK</span>
                <h3>Последнее действие</h3>
              </div>
              <Badge tone="warning">EXPERIMENT 001</Badge>
            </div>
            <p className="last-command">{lastCommand}</p>
            <p className="muted">
              Здесь позже ALINA будет фиксировать, какой контекст Макар использовал,
              что оказалось лишним и чего не хватило.
            </p>
          </GlassPanel>
        </div>

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
