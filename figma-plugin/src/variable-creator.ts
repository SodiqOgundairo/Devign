// =============================================================================
// VARIABLE CREATOR
// Creates Figma Variable Collections from the token schema.
// Collections produced:
//   1. "Devign / Palette"   — raw COLOR variables (Light + Dark modes)
//   2. "Devign / Semantic"  — semantic COLOR aliases (Light + Dark modes)
//   3. "Devign / Radius"    — FLOAT variables
//   4. "Devign / Spacing"   — FLOAT variables
//   5. "Devign / Opacity"   — FLOAT variables
//   6. "Devign / Typography" — STRING variables (font families)
// Returns a flat lookup map: variableName → Variable, used by component-creator.
// =============================================================================

import type { VariableSchema, RGBAColor } from "./token-mapper";

export type VarMap = Record<string, Variable>;

function rgbaToFigma(c: RGBAColor): RGBA {
  return { r: c.r, g: c.g, b: c.b, a: c.a };
}

function getOrCreateCollection(name: string): [VariableCollection, string, string] {
  // Always create fresh — plugin run is idempotent because we name-namespace everything
  const col = figma.variables.createVariableCollection(name);
  col.renameMode(col.modes[0].modeId, "Light");
  const darkId = col.addMode("Dark");
  return [col, col.modes[0].modeId, darkId];
}

// ─── Color collection ─────────────────────────────────────────────────────────

function buildColorCollection(
  name: string,
  tokens: Array<{ name: string; light: RGBAColor; dark: RGBAColor }>,
  varMap: VarMap
): void {
  const [col, lightId, darkId] = getOrCreateCollection(name);

  for (const token of tokens) {
    const v = figma.variables.createVariable(token.name, col, "COLOR");
    v.setValueForMode(lightId, rgbaToFigma(token.light));
    v.setValueForMode(darkId,  rgbaToFigma(token.dark));
    varMap[token.name] = v;
  }
}

// ─── Float collection ─────────────────────────────────────────────────────────

function buildFloatCollection(
  name: string,
  tokens: Array<{ name: string; value: number }>,
  varMap: VarMap
): void {
  const col = figma.variables.createVariableCollection(name);
  // Float collections don't need modes — one value fits all
  const modeId = col.modes[0].modeId;
  col.renameMode(modeId, "Default");

  for (const token of tokens) {
    const v = figma.variables.createVariable(token.name, col, "FLOAT");
    v.setValueForMode(modeId, token.value);
    varMap[token.name] = v;
  }
}

// ─── String collection ────────────────────────────────────────────────────────

function buildStringCollection(
  name: string,
  tokens: Array<{ name: string; value: string }>,
  varMap: VarMap
): void {
  const col = figma.variables.createVariableCollection(name);
  const modeId = col.modes[0].modeId;
  col.renameMode(modeId, "Default");

  for (const token of tokens) {
    const v = figma.variables.createVariable(token.name, col, "STRING");
    v.setValueForMode(modeId, token.value);
    varMap[token.name] = v;
  }
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function createAllVariables(schema: VariableSchema): VarMap {
  const varMap: VarMap = {};

  figma.notify("Creating palette variables…", { timeout: 1000 });
  buildColorCollection("Devign / Palette",    schema.palette,  varMap);

  figma.notify("Creating semantic variables…", { timeout: 1000 });
  buildColorCollection("Devign / Semantic",   schema.semantic, varMap);

  figma.notify("Creating radius variables…", { timeout: 1000 });
  buildFloatCollection("Devign / Radius",     schema.radius,   varMap);

  figma.notify("Creating spacing variables…", { timeout: 1000 });
  buildFloatCollection("Devign / Spacing",    schema.spacing,  varMap);

  figma.notify("Creating opacity variables…", { timeout: 1000 });
  buildFloatCollection("Devign / Opacity",    schema.opacity,  varMap);

  figma.notify("Creating typography variables…", { timeout: 1000 });
  buildStringCollection("Devign / Typography", schema.strings, varMap);

  return varMap;
}

// ─── Helper: bind a COLOR variable to a node fill ────────────────────────────

export function bindFill(node: MinimalFillsMixin, varName: string, varMap: VarMap): void {
  const variable = varMap[varName];
  if (!variable) return;
  node.fills = [
    figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
      "color",
      variable
    ),
  ];
}

export function bindStroke(node: MinimalStrokesMixin, varName: string, varMap: VarMap): void {
  const variable = varMap[varName];
  if (!variable) return;
  node.strokes = [
    figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
      "color",
      variable
    ),
  ];
}

// ─── Helper: bind a FLOAT variable to radius corners ─────────────────────────

export function bindRadius(
  node: FrameNode | ComponentNode | RectangleNode,
  varName: string,
  varMap: VarMap
): void {
  const variable = varMap[varName];
  if (!variable) return;
  (node as any).setBoundVariable("topLeftRadius",     variable);
  (node as any).setBoundVariable("topRightRadius",    variable);
  (node as any).setBoundVariable("bottomLeftRadius",  variable);
  (node as any).setBoundVariable("bottomRightRadius", variable);
}

// ─── Helper: bind FLOAT variable to padding / gap ────────────────────────────

export function bindPadding(
  node: FrameNode | ComponentNode,
  side: "all" | "horizontal" | "vertical" | "top" | "right" | "bottom" | "left",
  varName: string,
  varMap: VarMap
): void {
  const variable = varMap[varName];
  if (!variable) return;
  if (side === "all" || side === "horizontal" || side === "left")
    (node as any).setBoundVariable("paddingLeft", variable);
  if (side === "all" || side === "horizontal" || side === "right")
    (node as any).setBoundVariable("paddingRight", variable);
  if (side === "all" || side === "vertical" || side === "top")
    (node as any).setBoundVariable("paddingTop", variable);
  if (side === "all" || side === "vertical" || side === "bottom")
    (node as any).setBoundVariable("paddingBottom", variable);
}

export function bindGap(
  node: FrameNode | ComponentNode,
  varName: string,
  varMap: VarMap
): void {
  const variable = varMap[varName];
  if (!variable) return;
  (node as any).setBoundVariable("itemSpacing", variable);
}