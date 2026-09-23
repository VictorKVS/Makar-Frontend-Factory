import { useMemo, useState } from "react";
import {
  acknowledgeStream,
  rankStreams,
  selectAttention,
  shouldInterrupt,
  type StreamClass,
  type StreamItem,
} from "@father/stream-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./stream-demo.css";

const initialStreams: StreamItem[] = [
  {
    id: "alert-security",
    class: "alert",
    title: "Обнаружено противоречие в требованиях",
    summary: "Нужна проверка перед продолжением анализа.",
    source: "ALINA / Regulatory Analyzer",
    createdAt: "2026-09-24T00:00:00.000Z",
    urgency: "high",
    confidence: 0.94,
    costOfMissing: 0.92,
    lifecycle: "active",
    acknowledged: false,
    tags: ["DEMO"],
  },
  {
    id: "primary-analysis",
    class: "primary",
    title: "Анализ 152-ФЗ",
    summary: "Текущая задача пользователя. Сохраняет главный визуальный приоритет.",
    source: "User task",
    createdAt: "2026-09-23T23:55:00.000Z",
    urgency: "normal",
    confidence: 1,
    costOfMissing: 0.8,
    lifecycle: "active",
    acknowledged: false,
    tags: ["DEMO"],
  },
  {
    id: "secondary-graph",
    class: "secondary",
    title: "Связанные требования",
    summary: "Поддерживающий контекст для текущего анализа.",
    source: "Knowledge Graph",
    createdAt: "2026-09-23T23:58:00.000Z",
    urgency: "normal",
    confidence: 0.9,
    costOfMissing: 0.55,
    lifecycle: "active",
    acknowledged: false,
    tags: ["DEMO"],
  },
  {
    id: "agent-makar",
    class: "agent",
    title: "Макар завершил Visual QA",
    summary: "Агентская активность видна отдельно и не подменяет задачу пользователя.",
    source: "Makar",
    createdAt: "2026-09-24T00:01:00.000Z",
    urgency: "normal",
    confidence: 1,
    costOfMissing: 0.3,
    lifecycle: "active",
    acknowledged: false,
    tags: ["DEMO"],
  },
  {
    id: "background-index",
    class: "background",
    title: "Индексация базы знаний",
    summary: "Фоновая работа продолжается без захвата пользовательского внимания.",
    source: "RAG Indexer",
    createdAt: "2026-09-24T00:02:00.000Z",
    urgency: "high",
    confidence: 0.99,
    costOfMissing: 0.2,
    lifecycle: "active",
    acknowledged: false,
    tags: ["DEMO"],
  },
];

const toneByClass: Record<StreamClass, "neutral" | "info" | "success" | "warning" | "danger"> = {
  primary: "info",
  secondary: "neutral",
  background: "warning",
  alert: "danger",
  agent: "success",
};

export function StreamDemo() {
  const [streams, setStreams] = useState<StreamItem[]>(initialStreams);

  const ranked = useMemo(() => rankStreams(streams), [streams]);
  const attention = useMemo(() => selectAttention(streams), [streams]);
  const alert = streams.find((item) => item.id === "alert-security");
  const interrupting = alert ? shouldInterrupt(alert) : false;

  return (
    <GlassPanel className="stream-demo" tone="elevated" glow="medium">
      <div className="stream-demo-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 003</span>
          <h3>Information Stream Engine</h3>
          <p>
            Семантический приоритет решает, что заслуживает внимания, до того как UI
            выбирает размер, цвет и место.
          </p>
        </div>

        <div className="stream-demo-meta">
          <Badge tone="warning">DEMO / MOCK</Badge>
          <StatusIndicator
            tone={interrupting ? "warning" : "success"}
            label={interrupting ? "alert may interrupt" : "attention stable"}
          />
        </div>
      </div>

      <div className="stream-principle">
        <strong>Правило:</strong>
        <span>новее ≠ важнее · background не вытесняет primary</span>
      </div>

      <div className="stream-layout">
        <section className="stream-primary-zone" aria-label="Primary attention zone">
          <span className="stream-zone-label">PRIMARY ATTENTION</span>
          {attention.selected
            .filter((entry) => entry.item.class === "primary")
            .map(({ item }) => (
              <StreamCard key={item.id} item={item} prominent />
            ))}
        </section>

        <section className="stream-feed" aria-label="Ranked information streams">
          <div className="stream-feed-header">
            <span className="stream-zone-label">RANKED STREAMS</span>
            <Badge tone="neutral">{attention.selected.length} selected</Badge>
          </div>

          {ranked.map(({ item, score }, index) => (
            <StreamCard
              key={item.id}
              item={item}
              rank={index + 1}
              score={score}
              onAcknowledge={
                item.class === "alert" && !item.acknowledged
                  ? () =>
                      setStreams((current) =>
                        acknowledgeStream(
                          current,
                          item.id,
                          "2026-09-24T00:05:00.000Z"
                        )
                      )
                  : undefined
              }
            />
          ))}
        </section>
      </div>

      <footer className="stream-footer">
        <div>
          <span className="stream-zone-label">SUPPRESSED BY ATTENTION BUDGET</span>
          <strong>{attention.suppressed.length}</strong>
        </div>
        <div>
          <span className="stream-zone-label">INTERRUPTION STATE</span>
          <strong>{interrupting ? "REQUIRES ATTENTION" : "ACKNOWLEDGED / STABLE"}</strong>
        </div>
        <Button variant="ghost" onClick={() => setStreams(initialStreams)}>
          Reset streams
        </Button>
      </footer>
    </GlassPanel>
  );
}

type StreamCardProps = {
  item: StreamItem;
  rank?: number;
  score?: number;
  prominent?: boolean;
  onAcknowledge?: () => void;
};

function StreamCard({
  item,
  rank,
  score,
  prominent = false,
  onAcknowledge,
}: StreamCardProps) {
  return (
    <article
      className={`stream-card stream-${item.class} ${prominent ? "is-prominent" : ""}`}
      data-stream-id={item.id}
      data-stream-class={item.class}
      data-acknowledged={String(item.acknowledged)}
    >
      <div className="stream-card-topline">
        <div>
          <Badge tone={toneByClass[item.class]}>{item.class.toUpperCase()}</Badge>
          {rank ? <span className="stream-rank">#{rank}</span> : null}
        </div>
        {typeof score === "number" ? (
          <span className="stream-score">score {score.toFixed(0)}</span>
        ) : null}
      </div>

      <h4>{item.title}</h4>
      {item.summary ? <p>{item.summary}</p> : null}

      <div className="stream-card-meta">
        <span>{item.source}</span>
        <span>urgency: {item.urgency}</span>
        <span>confidence: {Math.round(item.confidence * 100)}%</span>
      </div>

      {item.acknowledged ? (
        <Badge tone="success">ACKNOWLEDGED</Badge>
      ) : onAcknowledge ? (
        <Button variant="secondary" onClick={onAcknowledge}>
          Acknowledge alert
        </Button>
      ) : null}
    </article>
  );
}
