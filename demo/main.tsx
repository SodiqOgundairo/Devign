import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Import the library's design system styles from source directly
import "../src/styles.css";
// Import demo-specific styles
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
