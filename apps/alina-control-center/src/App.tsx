import { ProductShell } from "./ProductShell";
import { AgentFactoryDemo } from "./AgentFactoryDemo";
import { CompositionDemo } from "./CompositionDemo";
import { InputDemo } from "./InputDemo";
import { SceneDemo } from "./SceneDemo";
import { QADemo } from "./QADemo";
import { WorkspaceDemo } from "./WorkspaceDemo";
import { StreamDemo } from "./StreamDemo";
import { VisualizationDemo } from "./VisualizationDemo";
import { AvatarDemo } from "./AvatarDemo";

export function App() {
  return (
    <>
      <ProductShell />

      <details className="engineering-diagnostics">
        <summary>Engineering diagnostics · M0/M1 labs</summary>
        <div className="engineering-diagnostics-stack">
          <AgentFactoryDemo />
          <CompositionDemo />
          <InputDemo />
          <SceneDemo />
          <QADemo />
          <WorkspaceDemo />
          <StreamDemo />
          <VisualizationDemo />
          <AvatarDemo />
        </div>
      </details>
    </>
  );
}
