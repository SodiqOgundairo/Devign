// =============================================================================
// COMPONENT CREATOR — Devign Design System
// All components use auto-layout with variables bound to fills, strokes,
// radius, padding and gap. Correct API patterns:
//   • Append child to parent BEFORE setting layoutSizingHorizontal/Vertical
//   • setBoundVariableForPaint requires a SolidPaint object (not empty array)
//   • combineAsVariants needs nodes already on the page
// =============================================================================

import type { VarMap } from "./variable-creator";
import { bindFill, bindStroke, bindRadius } from "./variable-creator";

const BASE_PAINT: SolidPaint = { type: "SOLID", color: { r: 0, g: 0, b: 0 } };

// ─── Font loader ──────────────────────────────────────────────────────────────

async function loadFont(family = "Poppins", style = "Medium"): Promise<void> {
  try { await figma.loadFontAsync({ family, style }); }
  catch { await figma.loadFontAsync({ family: "Inter", style }); }
}

// ─── Text node helper ─────────────────────────────────────────────────────────

async function makeText(
  content: string,
  family: string,
  style: string,
  size: number,
  colorVarName: string,
  varMap: VarMap
): Promise<TextNode> {
  await loadFont(family, style);
  const t = figma.createText();
  t.characters = content;
  try { t.fontName = { family, style }; }
  catch { t.fontName = { family: "Inter", style }; }
  t.fontSize = size;
  t.textAlignHorizontal = "LEFT";
  t.textAlignVertical   = "CENTER";
  const colorVar = varMap[colorVarName];
  if (colorVar) {
    t.fills = [figma.variables.setBoundVariableForPaint({ ...BASE_PAINT }, "color", colorVar)];
  }
  return t;
}

// ─── Auto-layout helpers ──────────────────────────────────────────────────────

function applyAutoLayout(
  f: FrameNode | ComponentNode,
  direction: "HORIZONTAL" | "VERTICAL",
  padH: number,
  padV: number,
  gap: number
): void {
  f.layoutMode             = direction;
  f.primaryAxisSizingMode  = "AUTO";
  f.counterAxisSizingMode  = "AUTO";
  f.primaryAxisAlignItems  = "CENTER";
  f.counterAxisAlignItems  = "CENTER";
  f.paddingLeft   = padH;
  f.paddingRight  = padH;
  f.paddingTop    = padV;
  f.paddingBottom = padV;
  f.itemSpacing   = gap;
  f.clipsContent  = false;
}

function makeFrame(name: string): FrameNode {
  const f = figma.createFrame();
  f.name   = name;
  f.fills  = [];
  return f;
}

function makeComponent(name: string): ComponentNode {
  const c = figma.createComponent();
  c.name  = name;
  c.fills = [];
  return c;
}

// ─── Place on canvas with cursor ──────────────────────────────────────────────

export async function createAllComponents(varMap: VarMap): Promise<void> {
  const page = figma.currentPage;
  let x = 0;
  const GAP = 80;

  const place = (node: ComponentSetNode | ComponentNode) => {
    node.x = x;
    node.y = 0;
    x += node.width + GAP;
  };

  figma.notify("Building Button…",    { timeout: 800 }); place(await buildButtonSet(varMap));
  figma.notify("Building Badge…",     { timeout: 800 }); place(await buildBadgeSet(varMap));
  figma.notify("Building Input…",     { timeout: 800 }); place(await buildInputSet(varMap));
  figma.notify("Building Card…",      { timeout: 800 }); place(await buildCardSet(varMap));
  figma.notify("Building Alert…",     { timeout: 800 }); place(await buildAlertSet(varMap));
  figma.notify("Building Progress…",  { timeout: 800 }); place(await buildProgressSet(varMap));
  figma.notify("Building Switch…",    { timeout: 800 }); place(await buildSwitchSet(varMap));
  figma.notify("Building Checkbox…",  { timeout: 800 }); place(await buildCheckboxSet(varMap));
  figma.notify("Building Avatar…",    { timeout: 800 }); place(await buildAvatarSet(varMap));
  figma.notify("Building Separator…", { timeout: 800 }); place(buildSeparator(varMap));
  figma.notify("Building Spinner…",   { timeout: 800 }); place(await buildSpinnerSet(varMap));
  figma.notify("Building Kbd…",       { timeout: 800 }); place(await buildKbdSet(varMap));

  figma.viewport.scrollAndZoomIntoView(page.children);
}

// =============================================================================
// BUTTON
// =============================================================================

async function buildButtonSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Medium");

  const configs = [
    { type: "Filled",  color: "Primary",     fillVar: "Color/Primary",      textVar: "Color/Primary/Foreground",   stroke: false },
    { type: "Filled",  color: "Secondary",   fillVar: "Color/Secondary",    textVar: "Color/Secondary/Foreground", stroke: false },
    { type: "Filled",  color: "Accent",      fillVar: "Color/Accent",       textVar: "Color/Accent/Foreground",    stroke: false },
    { type: "Filled",  color: "Ember",       fillVar: "Color/Ember",        textVar: "Color/Ember/Foreground",     stroke: false },
    { type: "Filled",  color: "Destructive", fillVar: "Color/Error",        textVar: "Color/Primary/Foreground",   stroke: false },
    { type: "Outline", color: "Primary",     fillVar: "Color/Surface/Card", textVar: "Color/Primary",              stroke: true, strokeVar: "Color/Primary" },
    { type: "Outline", color: "Secondary",   fillVar: "Color/Surface/Card", textVar: "Color/Secondary",            stroke: true, strokeVar: "Color/Secondary" },
    { type: "Outline", color: "Destructive", fillVar: "Color/Surface/Card", textVar: "Color/Error",                stroke: true, strokeVar: "Color/Error" },
    { type: "Ghost",   color: "Primary",     fillVar: "Color/Surface/Glass",textVar: "Color/Primary",              stroke: false },
    { type: "Ghost",   color: "Default",     fillVar: "Color/Surface/Glass",textVar: "Color/Foreground",           stroke: false },
  ] as const;

  const sizes = [
    { size: "SM",      padH: 12, padV: 4,  fontSize: 12 },
    { size: "Default", padH: 16, padV: 8,  fontSize: 14 },
    { size: "LG",      padH: 24, padV: 12, fontSize: 16 },
    { size: "XL",      padH: 32, padV: 14, fontSize: 18 },
  ];

  const variants: ComponentNode[] = [];

  for (const cfg of configs) {
    for (const sz of sizes) {
      const c = makeComponent(`Type=${cfg.type}, Color=${cfg.color}, Size=${sz.size}`);
      applyAutoLayout(c, "HORIZONTAL", sz.padH, sz.padV, 8);

      bindFill(c, cfg.fillVar, varMap);
      if (cfg.stroke && (cfg as any).strokeVar) {
        bindStroke(c, (cfg as any).strokeVar, varMap);
        c.strokeWeight = 2;
        c.strokeAlign  = "INSIDE";
      }
      bindRadius(c, "Radius/XL", varMap);

      const label = await makeText("Button", "Poppins", "Medium", sz.fontSize, cfg.textVar, varMap);
      c.appendChild(label);
      variants.push(c);
    }
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Button";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  (set as any).layoutWrap = "WRAP";
  (set as any).counterAxisSpacing = 12;
  return set;
}

// =============================================================================
// BADGE
// =============================================================================

async function buildBadgeSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");

  const configs = [
    { style: "Filled",  color: "Primary",   fillVar: "Color/Primary",      textVar: "Color/Primary/Foreground",   stroke: false },
    { style: "Filled",  color: "Accent",    fillVar: "Color/Accent",       textVar: "Color/Accent/Foreground",    stroke: false },
    { style: "Filled",  color: "Success",   fillVar: "Color/Success",      textVar: "Color/Primary/Foreground",   stroke: false },
    { style: "Filled",  color: "Warning",   fillVar: "Color/Warning",      textVar: "Color/Foreground",           stroke: false },
    { style: "Filled",  color: "Error",     fillVar: "Color/Error",        textVar: "Color/Primary/Foreground",   stroke: false },
    { style: "Soft",    color: "Primary",   fillVar: "Color/Tint/Primary", textVar: "Color/Primary",              stroke: false },
    { style: "Soft",    color: "Success",   fillVar: "Color/Tint/Success", textVar: "Color/Success",              stroke: false },
    { style: "Soft",    color: "Warning",   fillVar: "Color/Tint/Warning", textVar: "Color/Warning",              stroke: false },
    { style: "Soft",    color: "Error",     fillVar: "Color/Tint/Error",   textVar: "Color/Error",                stroke: false },
    { style: "Outline", color: "Primary",   fillVar: "Color/Surface/Glass",textVar: "Color/Primary",              stroke: true, strokeVar: "Color/Primary" },
    { style: "Outline", color: "Success",   fillVar: "Color/Surface/Glass",textVar: "Color/Success",              stroke: true, strokeVar: "Color/Success" },
    { style: "Outline", color: "Error",     fillVar: "Color/Surface/Glass",textVar: "Color/Error",                stroke: true, strokeVar: "Color/Error" },
  ];

  const variants: ComponentNode[] = [];

  for (const cfg of configs) {
    const c = makeComponent(`Style=${cfg.style}, Color=${cfg.color}`);
    applyAutoLayout(c, "HORIZONTAL", 10, 4, 6);
    bindFill(c, cfg.fillVar, varMap);
    if (cfg.stroke && (cfg as any).strokeVar) {
      bindStroke(c, (cfg as any).strokeVar, varMap);
      c.strokeWeight = 1;
      c.strokeAlign  = "INSIDE";
    }
    bindRadius(c, "Radius/Full", varMap);
    c.appendChild(await makeText("Badge", "Poppins", "SemiBold", 12, cfg.textVar, varMap));
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Badge";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  (set as any).layoutWrap = "WRAP";
  (set as any).counterAxisSpacing = 10;
  return set;
}

// =============================================================================
// INPUT
// =============================================================================

async function buildInputSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Regular");

  const variantConfigs = [
    { variant: "Default", fillVar: "Color/Surface/Glass", strokeVar: "Color/Border" },
    { variant: "Filled",  fillVar: "Color/Surface/Card",  strokeVar: "Color/Border/Input" },
  ];
  const stateConfigs = [
    { state: "Default",  strokeOverride: null,           textVar: "Color/Muted/Foreground", opacity: 1 },
    { state: "Focus",    strokeOverride: "Color/Primary", textVar: "Color/Foreground",       opacity: 1 },
    { state: "Error",    strokeOverride: "Color/Error",   textVar: "Color/Foreground",       opacity: 1 },
    { state: "Success",  strokeOverride: "Color/Success", textVar: "Color/Foreground",       opacity: 1 },
    { state: "Disabled", strokeOverride: null,            textVar: "Color/Muted/Foreground", opacity: 0.5 },
  ];

  const variants: ComponentNode[] = [];

  for (const vCfg of variantConfigs) {
    for (const sCfg of stateConfigs) {
      const c = makeComponent(`Variant=${vCfg.variant}, State=${sCfg.state}`);
      c.layoutMode = "HORIZONTAL";
      c.primaryAxisSizingMode  = "FIXED";
      c.counterAxisSizingMode  = "AUTO";
      c.primaryAxisAlignItems  = "SPACE_BETWEEN";
      c.counterAxisAlignItems  = "CENTER";
      c.paddingLeft   = 12;
      c.paddingRight  = 12;
      c.paddingTop    = 9;
      c.paddingBottom = 9;
      c.itemSpacing   = 8;
      c.resize(280, 40);

      bindFill(c, vCfg.fillVar, varMap);
      const sVar = sCfg.strokeOverride ?? vCfg.strokeVar;
      bindStroke(c, sVar, varMap);
      c.strokeWeight = sCfg.state === "Focus" ? 2 : 1;
      c.strokeAlign  = "INSIDE";
      bindRadius(c, "Radius/LG", varMap);
      if (sCfg.opacity < 1) c.opacity = sCfg.opacity;

      const placeholder = await makeText(
        sCfg.state === "Default" ? "Placeholder text…" : "Input value",
        "Poppins", "Regular", 14, sCfg.textVar, varMap
      );
      // Append first, then set sizing (FILL only valid on auto-layout children)
      c.appendChild(placeholder);
      placeholder.layoutSizingHorizontal = "FILL";

      variants.push(c);
    }
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Input";
  applyAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 12);
  return set;
}

// =============================================================================
// CARD
// =============================================================================

async function buildCardSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");
  await loadFont("Poppins", "Regular");

  const variants: ComponentNode[] = [];

  for (const hover of [false, true]) {
    const c = makeComponent(`Hover=${hover ? "True" : "False"}`);
    c.layoutMode             = "VERTICAL";
    c.primaryAxisSizingMode  = "AUTO";
    c.counterAxisSizingMode  = "FIXED";
    c.primaryAxisAlignItems  = "MIN";
    c.counterAxisAlignItems  = "MIN";
    c.paddingLeft   = 0;
    c.paddingRight  = 0;
    c.paddingTop    = 0;
    c.paddingBottom = 0;
    c.itemSpacing   = 0;
    c.resize(320, 10);
    c.clipsContent  = true;

    bindFill(c, "Color/Surface/Card", varMap);
    bindStroke(c, "Color/Border", varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/XL", varMap);

    // Header
    const header = makeFrame("CardHeader");
    header.layoutMode            = "VERTICAL";
    header.primaryAxisSizingMode = "AUTO";
    header.counterAxisSizingMode = "FIXED";
    header.primaryAxisAlignItems = "MIN";
    header.counterAxisAlignItems = "MIN";
    header.paddingLeft   = 24;
    header.paddingRight  = 24;
    header.paddingTop    = 24;
    header.paddingBottom = 12;
    header.itemSpacing   = 4;

    const titleNode = await makeText("Card Title",              "Poppins", "SemiBold", 18, "Color/Foreground",       varMap);
    const descNode  = await makeText("Card description goes here.", "Poppins", "Regular", 14, "Color/Muted/Foreground", varMap);
    header.appendChild(titleNode);
    titleNode.layoutSizingHorizontal = "FILL";
    header.appendChild(descNode);
    descNode.layoutSizingHorizontal  = "FILL";

    // Content
    const content = makeFrame("CardContent");
    content.layoutMode            = "VERTICAL";
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FIXED";
    content.primaryAxisAlignItems = "MIN";
    content.counterAxisAlignItems = "MIN";
    content.paddingLeft   = 24;
    content.paddingRight  = 24;
    content.paddingTop    = 0;
    content.paddingBottom = 16;
    content.itemSpacing   = 8;
    const bodyText = await makeText("Your content goes here.", "Poppins", "Regular", 14, "Color/Foreground", varMap);
    content.appendChild(bodyText);
    bodyText.layoutSizingHorizontal = "FILL";

    // Divider
    const div = figma.createRectangle();
    div.name   = "Divider";
    div.resize(320, 1);
    bindFill(div, "Color/Border", varMap);

    // Footer
    const footer = makeFrame("CardFooter");
    footer.layoutMode            = "HORIZONTAL";
    footer.primaryAxisSizingMode = "AUTO";
    footer.counterAxisSizingMode = "FIXED";
    footer.primaryAxisAlignItems = "MIN";
    footer.counterAxisAlignItems = "CENTER";
    footer.paddingLeft   = 24;
    footer.paddingRight  = 24;
    footer.paddingTop    = 16;
    footer.paddingBottom = 24;
    footer.itemSpacing   = 8;

    c.appendChild(header);
    header.layoutSizingHorizontal = "FILL";
    c.appendChild(content);
    content.layoutSizingHorizontal = "FILL";
    c.appendChild(div);
    div.layoutSizingHorizontal = "FILL";
    c.appendChild(footer);
    footer.layoutSizingHorizontal = "FILL";

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Card";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 32);
  return set;
}

// =============================================================================
// ALERT
// =============================================================================

async function buildAlertSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");
  await loadFont("Poppins", "Regular");

  const configs = [
    { variant: "Default", fillVar: "Color/Surface/Card",  strokeVar: "Color/Border",  accentVar: "Color/Border",  textVar: "Color/Foreground" },
    { variant: "Info",    fillVar: "Color/Tint/Primary",  strokeVar: "Color/Primary", accentVar: "Color/Primary", textVar: "Color/Primary"    },
    { variant: "Success", fillVar: "Color/Tint/Success",  strokeVar: "Color/Success", accentVar: "Color/Success", textVar: "Color/Success"    },
    { variant: "Warning", fillVar: "Color/Tint/Warning",  strokeVar: "Color/Warning", accentVar: "Color/Warning", textVar: "Color/Warning"    },
    { variant: "Error",   fillVar: "Color/Tint/Error",    strokeVar: "Color/Error",   accentVar: "Color/Error",   textVar: "Color/Error"      },
  ];

  const variants: ComponentNode[] = [];

  for (const cfg of configs) {
    const c = makeComponent(`Variant=${cfg.variant}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "AUTO";
    c.primaryAxisAlignItems = "MIN";
    c.counterAxisAlignItems = "MIN";
    c.paddingLeft   = 16;
    c.paddingRight  = 16;
    c.paddingTop    = 14;
    c.paddingBottom = 14;
    c.itemSpacing   = 12;
    c.resize(400, 10);

    bindFill(c, cfg.fillVar, varMap);
    bindStroke(c, cfg.strokeVar, varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/LG", varMap);

    // Left accent bar
    const bar = figma.createRectangle();
    bar.name   = "AccentBar";
    bar.resize(4, 20);
    bar.cornerRadius = 2;
    bindFill(bar, cfg.accentVar, varMap);
    c.appendChild(bar);
    bar.layoutSizingVertical = "FILL";

    // Text block
    const textBlock = makeFrame("Text");
    textBlock.layoutMode            = "VERTICAL";
    textBlock.primaryAxisSizingMode = "AUTO";
    textBlock.counterAxisSizingMode = "AUTO";
    textBlock.primaryAxisAlignItems = "MIN";
    textBlock.counterAxisAlignItems = "MIN";
    textBlock.itemSpacing = 2;

    const alertTitle = await makeText("Alert Title",                           "Poppins", "SemiBold", 14, cfg.textVar,          varMap);
    const alertDesc  = await makeText("This is the alert description message.", "Poppins", "Regular",  13, "Color/Foreground",   varMap);
    textBlock.appendChild(alertTitle);
    alertTitle.layoutSizingHorizontal = "FILL";
    textBlock.appendChild(alertDesc);
    alertDesc.layoutSizingHorizontal  = "FILL";

    c.appendChild(textBlock);
    textBlock.layoutSizingHorizontal = "FILL";

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Alert";
  applyAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 12);
  return set;
}

// =============================================================================
// PROGRESS
// =============================================================================

async function buildProgressSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const value of [25, 50, 75]) {
    const c = makeComponent(`Value=${value}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "MIN";
    c.resize(280, 8);
    c.fills = [];
    c.clipsContent = false;

    const track = makeFrame("Track");
    track.layoutMode            = "HORIZONTAL";
    track.primaryAxisSizingMode = "FIXED";
    track.counterAxisSizingMode = "FIXED";
    track.primaryAxisAlignItems = "MIN";
    track.counterAxisAlignItems = "CENTER";
    track.resize(280, 8);
    track.clipsContent = true;
    bindFill(track, "Color/Surface/Card", varMap);
    bindRadius(track, "Radius/Full", varMap);

    const fill = makeFrame("Fill");
    fill.layoutMode            = "HORIZONTAL";
    fill.primaryAxisSizingMode = "FIXED";
    fill.counterAxisSizingMode = "FIXED";
    fill.resize(Math.round(280 * value / 100), 8);
    bindFill(fill, "Color/Primary", varMap);

    track.appendChild(fill);
    c.appendChild(track);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Progress";
  applyAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 16);
  return set;
}

// =============================================================================
// SWITCH
// =============================================================================

async function buildSwitchSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const checked of [false, true]) {
    const c = makeComponent(`Checked=${checked}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisAlignItems = checked ? "MAX" : "MIN";
    c.counterAxisAlignItems = "CENTER";
    c.paddingLeft   = 2;
    c.paddingRight  = 2;
    c.paddingTop    = 2;
    c.paddingBottom = 2;
    c.resize(44, 24);

    bindFill(c, checked ? "Color/Primary" : "Color/Surface/Card", varMap);
    bindStroke(c, checked ? "Color/Primary" : "Color/Border", varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/Full", varMap);

    const thumb = makeFrame("Thumb");
    thumb.primaryAxisSizingMode = "FIXED";
    thumb.counterAxisSizingMode = "FIXED";
    thumb.resize(20, 20);
    thumb.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    thumb.cornerRadius = 9999;

    c.appendChild(thumb);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Switch";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// CHECKBOX
// =============================================================================

async function buildCheckboxSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const checked of [false, true]) {
    const c = makeComponent(`Checked=${checked}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.resize(20, 20);

    bindFill(c, checked ? "Color/Primary" : "Color/Surface/Card", varMap);
    bindStroke(c, checked ? "Color/Primary" : "Color/Border", varMap);
    c.strokeWeight = 1.5;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/SM", varMap);

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Checkbox";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// AVATAR
// =============================================================================

async function buildAvatarSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Medium");

  const sizes = [
    { size: "SM", dim: 28, fontSize: 11 },
    { size: "MD", dim: 36, fontSize: 14 },
    { size: "LG", dim: 44, fontSize: 16 },
    { size: "XL", dim: 56, fontSize: 20 },
  ];

  const variants: ComponentNode[] = [];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.resize(sz.dim, sz.dim);
    c.cornerRadius = 9999;

    bindFill(c, "Color/Tint/Primary", varMap);
    c.appendChild(await makeText("AB", "Poppins", "Medium", sz.fontSize, "Color/Primary", varMap));
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Avatar";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  return set;
}

// =============================================================================
// SEPARATOR
// =============================================================================

function buildSeparator(varMap: VarMap): ComponentNode {
  const c = makeComponent("Separator");
  c.layoutMode            = "HORIZONTAL";
  c.primaryAxisSizingMode = "FIXED";
  c.counterAxisSizingMode = "FIXED";
  c.resize(320, 1);
  bindFill(c, "Color/Border", varMap);
  return c;
}

// =============================================================================
// SPINNER
// =============================================================================

async function buildSpinnerSet(varMap: VarMap): Promise<ComponentSetNode> {
  const sizes = [
    { size: "XS", dim: 12 },
    { size: "SM", dim: 16 },
    { size: "MD", dim: 24 },
    { size: "LG", dim: 32 },
    { size: "XL", dim: 48 },
  ];

  const variants: ComponentNode[] = [];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.resize(sz.dim, sz.dim);
    c.fills = [];

    const ring = figma.createEllipse();
    ring.name        = "Ring";
    ring.resize(sz.dim, sz.dim);
    ring.fills       = [];
    ring.strokeWeight = Math.max(2, Math.round(sz.dim * 0.12));
    ring.strokeAlign  = "INSIDE";
    ring.arcData      = { startingAngle: 0, endingAngle: Math.PI * 1.5, innerRadius: 0 };

    // Correct pattern: set strokes array then bind via setBoundVariableForPaint
    ring.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
    const colorVar = varMap["Color/Primary"];
    if (colorVar) {
      ring.strokes = [figma.variables.setBoundVariableForPaint(
        { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
        "color",
        colorVar
      )];
    }

    c.appendChild(ring);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Spinner";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// KBD
// =============================================================================

async function buildKbdSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Fira Code", "Regular");

  const sizes = [
    { size: "SM", h: 20, padH: 4,  fontSize: 10 },
    { size: "MD", h: 24, padH: 6,  fontSize: 12 },
    { size: "LG", h: 28, padH: 8,  fontSize: 14 },
  ];

  const variants: ComponentNode[] = [];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    c.layoutMode            = "HORIZONTAL";
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.paddingLeft   = sz.padH;
    c.paddingRight  = sz.padH;
    c.paddingTop    = 2;
    c.paddingBottom = 2;
    c.resize(sz.padH * 2 + 20, sz.h);

    bindFill(c, "Color/Surface/Card", varMap);
    bindStroke(c, "Color/Border", varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/SM", varMap);

    c.appendChild(await makeText("⌘", "Fira Code", "Regular", sz.fontSize, "Color/Foreground", varMap));
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Kbd";
  applyAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  return set;
}