import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class AppErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ALINA_RENDER_ERROR", {
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <main className="alina-fatal-boundary" role="alert">
          <span className="eyebrow">ALINA · SAFE FALLBACK</span>
          <h1>Интерфейс временно недоступен</h1>
          <p>
            Ошибка отображения изолирована. Данные не подменяются DEMO-режимом.
          </p>
          <code>{this.state.error.message}</code>
          <button type="button" onClick={() => window.location.reload()}>
            Перезагрузить интерфейс
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
