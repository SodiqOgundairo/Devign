// =============================================================================
// DEVIGN PLUGIN — ENTRY POINT
// =============================================================================

import { buildVariableSchema, type TokenTheme } from "./token-mapper";
import { createAllVariables } from "./variable-creator";
import { createTextStyles, createEffectStyles } from "./style-creator";
import { createAllComponents } from "./component-creator";

figma.showUI(__html__, { width: 380, height: 560, title: "Devign Design System" });

// ─── Plan check ───────────────────────────────────────────────────────────────
// figma.variables.createVariableCollection requires a Professional plan or above.
// On Starter/Free plans the function doesn't exist — this is what causes "not a function".

function canUseVariables(): boolean {
  return true;
}

// ─── Message handler ──────────────────────────────────────────────────────────

figma.ui.onmessage = async (msg: { type: string; payload?: any }) => {

  // ── Full import ────────────────────────────────────────────────────────────
  if (msg.type === "GENERATE") {
    const theme: TokenTheme = msg.payload;
    try {
      figma.notify("🎨 Starting Devign import…", { timeout: 2000 });
      const schema = buildVariableSchema(theme);

      let varMap = {};
      if (canUseVariables()) {
        varMap = createAllVariables(schema);
      } else {
        figma.notify("⚠️ Variables skipped — requires Figma Professional plan", { timeout: 4000 });
        figma.ui.postMessage({ type: "PLAN_WARNING", feature: "variables" });
      }

      await createTextStyles({ letterSpacing: theme.letterSpacing, lineHeight: theme.lineHeight });
      createEffectStyles();
      await createAllComponents(varMap);

      figma.notify("✅ Devign imported! Styles and components are ready.", { timeout: 4000 });
      figma.ui.postMessage({ type: "DONE" });

    } catch (err: any) {
      const message = err?.message ?? String(err);
      figma.notify(`❌ Error: ${message}`, { error: true, timeout: 6000 });
      figma.ui.postMessage({ type: "ERROR", message });
    }
  }

  // ── Variables only ─────────────────────────────────────────────────────────
  if (msg.type === "VARIABLES_ONLY") {
    const theme: TokenTheme = msg.payload;
    if (!canUseVariables()) {
      figma.notify("❌ Variables require a Figma Professional plan or above", { error: true, timeout: 5000 });
      figma.ui.postMessage({
        type: "ERROR",
        message: "Variables require a Figma Professional plan (not available on Starter/Free). Upgrade at figma.com/pricing or use 'Styles only' instead."
      });
      return;
    }
    try {
      const schema = buildVariableSchema(theme);
      createAllVariables(schema);
      figma.notify("✅ Variables imported!", { timeout: 3000 });
      figma.ui.postMessage({ type: "DONE" });
    } catch (err: any) {
      figma.ui.postMessage({ type: "ERROR", message: err?.message ?? String(err) });
    }
  }

  // ── Styles only (no plan restriction) ─────────────────────────────────────
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

  // ── Components only ────────────────────────────────────────────────────────
  if (msg.type === "COMPONENTS_ONLY") {
    const theme: TokenTheme = msg.payload;
    try {
      let varMap = {};
      if (canUseVariables()) {
        const schema = buildVariableSchema(theme);
        varMap = createAllVariables(schema);
      }
      await createAllComponents(varMap);
      figma.notify("✅ Components imported!", { timeout: 3000 });
      figma.ui.postMessage({ type: "DONE" });
    } catch (err: any) {
      figma.ui.postMessage({ type: "ERROR", message: err?.message ?? String(err) });
    }
  }

  if (msg.type === "CLOSE") {
    figma.closePlugin();
  }
};