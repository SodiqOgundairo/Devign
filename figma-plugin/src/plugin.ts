// =============================================================================
// PLUGIN ENTRY POINT
// Runs inside the Figma plugin sandbox.
// Receives messages from the UI, orchestrates variable/style/component creation.
// =============================================================================

import { buildVariableSchema, type TokenTheme } from "./token-mapper";
import { createAllVariables } from "./variable-creator";
import { createTextStyles, createEffectStyles } from "./style-creator";
import { createAllComponents } from "./component-creator";

// Show the plugin UI — 380px wide, 560px tall
figma.showUI(__html__, { width: 380, height: 560, title: "Devign Design System" });

// ─── Message handler ──────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg: { type: string; payload?: any }) => {

  if (msg.type === "GENERATE") {
    const theme: TokenTheme = msg.payload;

    try {
      figma.notify("🎨 Starting Devign import…", { timeout: 2000 });

      // 1. Build the token schema from user's theme values
      const schema = buildVariableSchema(theme);

      // 2. Create all Variable Collections
      const varMap = createAllVariables(schema);

      // 3. Create text styles and effect styles
      await createTextStyles();
      createEffectStyles();

      // 4. Create all components
      await createAllComponents(varMap);

      figma.notify("✅ Devign imported! Variables, styles and components are ready.", { timeout: 4000 });
      figma.ui.postMessage({ type: "DONE" });

    } catch (err: any) {
      const message = err?.message ?? String(err);
      figma.notify(`❌ Error: ${message}`, { error: true, timeout: 6000 });
      figma.ui.postMessage({ type: "ERROR", message });
    }
  }

  if (msg.type === "CLOSE") {
    figma.closePlugin();
  }

  if (msg.type === "VARIABLES_ONLY") {
    const theme: TokenTheme = msg.payload;
    try {
      const schema = buildVariableSchema(theme);
      createAllVariables(schema);
      figma.notify("✅ Variables imported!", { timeout: 3000 });
      figma.ui.postMessage({ type: "DONE" });
    } catch (err: any) {
      figma.ui.postMessage({ type: "ERROR", message: err?.message ?? String(err) });
    }
  }

  if (msg.type === "STYLES_ONLY") {
    try {
      await createTextStyles();
      createEffectStyles();
      figma.notify("✅ Text and effect styles imported!", { timeout: 3000 });
      figma.ui.postMessage({ type: "DONE" });
    } catch (err: any) {
      figma.ui.postMessage({ type: "ERROR", message: err?.message ?? String(err) });
    }
  }

  if (msg.type === "COMPONENTS_ONLY") {
    const theme: TokenTheme = msg.payload;
    try {
      const schema = buildVariableSchema(theme);
      const varMap = createAllVariables(schema);
      await createAllComponents(varMap);
      figma.notify("✅ Components imported!", { timeout: 3000 });
      figma.ui.postMessage({ type: "DONE" });
    } catch (err: any) {
      figma.ui.postMessage({ type: "ERROR", message: err?.message ?? String(err) });
    }
  }
};