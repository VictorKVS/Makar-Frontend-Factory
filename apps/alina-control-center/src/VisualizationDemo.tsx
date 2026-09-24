import { useMemo, useState } from "react";
import {
  createVisualizationState,
  selectVisualizationForm,
  type VisualizationForm,
} from "@father/visualization-engine";
import { Badge, Button, GlassPanel, StatusIndicator } from "@father/ui";
import "./visualization-demo.css";

const data = [
  { label: "152-ФЗ", value: 92 },
  { label: "ПП 1119", value: 76 },
  { label: "ФСТЭК 21", value: 61 },
  { label: "ФСБ 378", value: 44 },
];

export function VisualizationDemo() {
  const initial = useMemo(
    () =>
      createVisualizationState({
        id: "regulatory-coverage",
        intent: "compare",
        shape: "records",
        itemCount: data.length,
        requiresExactValues: true,
        preferredForms: ["chart"],
      }),
    []
  );

  const [state, setState] = useState(initial);
  const available = [
    state.recommendation.primary,
    ...state.recommendation.alternates,
    state.recommendation.fallback,
  ].filter((form, index, list) => list.indexOf(form) === index);

  const choose = (form: VisualizationForm) => {
    setState((current) => selectVisualizationForm(current, form));
  };

  return (
    <section className="viz-lab" aria-labelledby="viz-title">
      <div className="viz-heading">
        <div>
          <span className="eyebrow">MAKAR · EXPERIMENT 004</span>
          <h2 id="viz-title">Visualization Engine</h2>
          <p>
            Один контракт данных — несколько допустимых представлений.
            Семантическая задача важнее визуального эффекта.
          </p>
        </div>
        <StatusIndicator tone="info" label="Renderer independent" />
      </div>

      <div className="viz-grid">
        <GlassPanel tone="elevated" glow="medium" className="viz-policy">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">RECOMMENDATION</span>
              <h3>{state.recommendation.primary.toUpperCase()}</h3>
            </div>
            <Badge tone="warning">DEMO DATA</Badge>
          </div>

          <dl className="viz-contract">
            <div><dt>Intent</dt><dd>compare</dd></div>
            <div><dt>Shape</dt><dd>records</dd></div>
            <div><dt>Density</dt><dd>{state.recommendation.density}</dd></div>
            <div><dt>Interaction</dt><dd>{state.recommendation.interaction}</dd></div>
            <div><dt>Fallback</dt><dd>{state.recommendation.fallback}</dd></div>
          </dl>

          <div className="viz-switcher" aria-label="Visualization form">
            {available.map((form) => (
              <Button
                key={form}
                variant={state.selectedForm === form ? "primary" : "ghost"}
                onClick={() => choose(form)}
              >
                {form}
              </Button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel tone="base" glow="soft" className="viz-surface">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">SELECTED FORM</span>
              <h3>{state.selectedForm}</h3>
            </div>
            <Badge tone="success">ACCESSIBLE FALLBACK</Badge>
          </div>

          {state.selectedForm === "table" ? (
            <table className="viz-table">
              <caption>DEMO: coverage values</caption>
              <thead><tr><th>Источник</th><th>Покрытие</th></tr></thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.label}><td>{row.label}</td><td>{row.value}%</td></tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="viz-bars" role="img" aria-label="DEMO comparison of regulatory coverage">
              {data.map((row) => (
                <div className="viz-bar-row" key={row.label}>
                  <span>{row.label}</span>
                  <div className="viz-bar-track">
                    <div className="viz-bar-fill" style={{ width: `${row.value}%` }} />
                  </div>
                  <strong>{row.value}%</strong>
                </div>
              ))}
            </div>
          )}

          <p className="viz-summary">
            Текстовый fallback: максимальное DEMO-значение — 152-ФЗ, 92%.
            Минимальное — ФСБ 378, 44%.
          </p>
        </GlassPanel>
      </div>
    </section>
  );
}
