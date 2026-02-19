// =============================================================================
// VARIABLE CREATOR — correct Figma Plugin API patterns
// Key rule: fills/strokes are IMMUTABLE arrays.
// You must clone → setBoundVariableForPaint → reassign.
// setBoundVariable() works directly for scalar fields (radius, padding, gap).
// =============================================================================

import type { VariableSchema, RGBAColor } from "./token-mapper";

export type VarMap = Record<string, Variable>;

function rgbaToFigma(c: RGBAColor): RGBA {
  return { r: c.r, g: c.g, b: c.b, a: c.a };
}

const BASE_PAINT: SolidPaint = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };

function getOrCreateCollection(name: string): [VariableCollection, string, string] {
  const col = figma.variables.createVariableCollection(name);
  col.renameMode(col.modes[0].modeId, "Light");
  const darkId = col.addMode("Dark");
  return [col, col.modes[0].modeId, darkId];
}

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

function buildFloatCollection(
  name: string,
  tokens: Array<{ name: string; value: number }>,
  varMap: VarMap
): void {
  const col = figma.variables.createVariableCollection(name);
  const modeId = col.modes[0].modeId;
  col.renameMode(modeId, "Default");
  for (const token of tokens) {
    const v = figma.variables.createVariable(token.name, col, "FLOAT");
    v.setValueForMode(modeId, token.value);
    varMap[token.name] = v;
  }
}

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

export function createAllVariables(schema: VariableSchema): VarMap {
  const varMap: VarMap = {};
  figma.notify("Creating palette variables…",    { timeout: 1000 });
  buildColorCollection("Primitives / Colors",    schema.palette,  varMap);
  figma.notify("Creating semantic variables…",   { timeout: 1000 });
  buildColorCollection("Tokens / Colors",   schema.semantic, varMap);
  figma.notify("Creating radius variables…",     { timeout: 1000 });
  buildFloatCollection("Tokens / Radius",     schema.radius,   varMap);
  figma.notify("Creating spacing variables…",    { timeout: 1000 });
  buildFloatCollection("Tokens / Spacing",    schema.spacing,  varMap);
  figma.notify("Creating opacity variables…",    { timeout: 1000 });
  buildFloatCollection("Tokens / Opacity",    schema.opacity,  varMap);
  figma.notify("Creating typography variables…", { timeout: 1000 });
  buildStringCollection("Primitives / Typography", schema.strings, varMap);
  buildStringCollection("Tokens / Typography Metrics", schema.typography, varMap);
  return varMap;
}

// ─── Bind helpers ─────────────────────────────────────────────────────────────

export function bindFill(node: MinimalFillsMixin, varName: string, varMap: VarMap): void {
  const variable = varMap[varName];
  if (!variable) return;
  try {
    node.fills = [figma.variables.setBoundVariableForPaint({ ...BASE_PAINT }, "color", variable)];
  } catch {
    // Fallback if variables not supported
  }
}

export function bindStroke(node: MinimalStrokesMixin, varName: string, varMap: VarMap): void {
  const variable = varMap[varName];
  if (!variable) return;
  try {
    node.strokes = [figma.variables.setBoundVariableForPaint({ ...BASE_PAINT }, "color", variable)];
  } catch {
    // Fallback if variables not supported
  }
}

export function bindRadius(
  node: FrameNode | ComponentNode | RectangleNode,
  varName: string,
  varMap: VarMap
): void {
  const variable = varMap[varName];
  if (!variable) return;
  try {
    const n = node as any;
    n.setBoundVariable("topLeftRadius",     variable);
    n.setBoundVariable("topRightRadius",    variable);
    n.setBoundVariable("bottomLeftRadius",  variable);
    n.setBoundVariable("bottomRightRadius", variable);
  } catch {
    // Fallback if variables not supported
  }
}

export function bindPadding(
  node: FrameNode | ComponentNode,
  side: "all" | "horizontal" | "vertical" | "top" | "right" | "bottom" | "left",
  varName: string,
  varMap: VarMap
): void {
  const variable = varMap[varName];
  if (!variable) return;
  try {
    const n = node as any;
    if (side === "all" || side === "horizontal" || side === "left")   n.setBoundVariable("paddingLeft",   variable);
    if (side === "all" || side === "horizontal" || side === "right")  n.setBoundVariable("paddingRight",  variable);
    if (side === "all" || side === "vertical"   || side === "top")    n.setBoundVariable("paddingTop",    variable);
    if (side === "all" || side === "vertical"   || side === "bottom") n.setBoundVariable("paddingBottom", variable);
  } catch {
    // Fallback if variables not supported
  }
}

export function bindGap(node: FrameNode | ComponentNode, varName: string, varMap: VarMap): void {
  const variable = varMap[varName];
  if (!variable) return;
  try {
    (node as any).setBoundVariable("itemSpacing", variable);
  } catch {
    // Fallback if variables not supported
  }
}