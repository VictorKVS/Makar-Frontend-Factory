import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { alinaCinematicTokens, toCssVariables } from "@father/design-tokens";
import "@father/ui/styles.css";
import "./app.css";
import { App } from "./App";

const themeStyle = document.createElement("style");
themeStyle.dataset.source = "father-design-tokens";
themeStyle.textContent = toCssVariables(alinaCinematicTokens, ":root", "father");
document.head.append(themeStyle);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
