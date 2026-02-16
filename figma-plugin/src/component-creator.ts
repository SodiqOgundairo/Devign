// =============================================================================
// COMPONENT CREATOR
// Builds all YemsUI components as Figma ComponentNodes with:
//   • Full Auto Layout (horizontal / vertical, hugging, fill, fixed)
//   • Variables bound to fills, strokes, radius, padding, gap, text
//   • Variants via ComponentSetNode (one component set per component)
//   • Proper naming conventions (Component/Variant=Value, Size=Default)
// =============================================================================

import type { VarMap } from "./variable-creator";
import { bindFill, bindStroke, bindRadius, bindPadding, bindGap } from "./variable-creator";

// ─── Text helper ──────────────────────────────────────────────────────────────

async function loadFont(family = "Poppins", style = "Medium"): Promise<void> {
  try {
    await figma.loadFontAsync({ family, style });
  } catch {
    await figma.loadFontAsync({ family: "Inter", style });
  }
}

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
  try { t.fontName = { family, style }; } catch { t.fontName = { family: "Inter", style }; }
  t.fontSize = size;
  t.textAlignHorizontal = "CENTER";
  t.textAlignVertical = "CENTER";
  t.layoutSizingHorizontal = "HUG";
  t.layoutSizingVertical = "HUG";

  const colorVar = varMap[colorVarName];
  if (colorVar) {
    t.fills = [figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", colorVar
    )];
  }
  return t;
}

// ─── Frame / container helper ─────────────────────────────────────────────────

function makeFrame(name: string): FrameNode {
  const f = figma.createFrame();
  f.name = name;
  f.fills = [];
  return f;
}

function makeAutoLayout(
  f: FrameNode | ComponentNode,
  direction: "HORIZONTAL" | "VERTICAL",
  paddingH: number,
  paddingV: number,
  gap: number
): void {
  f.layoutMode = direction;
  f.primaryAxisSizingMode  = "AUTO";
  f.counterAxisSizingMode  = "AUTO";
  f.primaryAxisAlignItems  = "CENTER";
  f.counterAxisAlignItems  = "CENTER";
  f.paddingLeft   = paddingH;
  f.paddingRight  = paddingH;
  f.paddingTop    = paddingV;
  f.paddingBottom = paddingV;
  f.itemSpacing   = gap;
  f.clipsContent  = false;
}

// ─── Component wrapper ────────────────────────────────────────────────────────

function makeComponent(name: string): ComponentNode {
  const c = figma.createComponent();
  c.name = name;
  c.fills = [];
  return c;
}

// ─── Place all components on canvas ──────────────────────────────────────────

export async function createAllComponents(varMap: VarMap): Promise<void> {
  const page = figma.currentPage;
  let xCursor = 0;
  const GAP = 80;

  async function place(node: ComponentSetNode | ComponentNode): Promise<void> {
    node.x = xCursor;
    node.y = 0;
    page.appendChild(node);
    xCursor += node.width + GAP;
  }

  // ── 1. BUTTON ──────────────────────────────────────────────────────────────
  figma.notify("Building Button…", { timeout: 800 });
  await place(await buildButtonSet(varMap));

  // ── 2. BADGE ───────────────────────────────────────────────────────────────
  figma.notify("Building Badge…", { timeout: 800 });
  await place(await buildBadgeSet(varMap));

  // ── 3. INPUT ───────────────────────────────────────────────────────────────
  figma.notify("Building Input…", { timeout: 800 });
  await place(await buildInputSet(varMap));

  // ── 4. CARD ────────────────────────────────────────────────────────────────
  figma.notify("Building Card…", { timeout: 800 });
  await place(await buildCardSet(varMap));

  // ── 5. ALERT ───────────────────────────────────────────────────────────────
  figma.notify("Building Alert…", { timeout: 800 });
  await place(await buildAlertSet(varMap));

  // ── 6. PROGRESS ────────────────────────────────────────────────────────────
  figma.notify("Building Progress…", { timeout: 800 });
  await place(await buildProgressSet(varMap));

  // ── 7. SWITCH ──────────────────────────────────────────────────────────────
  figma.notify("Building Switch…", { timeout: 800 });
  await place(await buildSwitchSet(varMap));

  // ── 8. CHECKBOX ────────────────────────────────────────────────────────────
  figma.notify("Building Checkbox…", { timeout: 800 });
  await place(await buildCheckboxSet(varMap));

  // ── 9. AVATAR ──────────────────────────────────────────────────────────────
  figma.notify("Building Avatar…", { timeout: 800 });
  await place(await buildAvatarSet(varMap));

  // ── 10. SEPARATOR ──────────────────────────────────────────────────────────
  figma.notify("Building Separator…", { timeout: 800 });
  await place(await buildSeparator(varMap));

  // ── 11. SPINNER ────────────────────────────────────────────────────────────
  figma.notify("Building Spinner…", { timeout: 800 });
  await place(await buildSpinnerSet(varMap));

  // ── 12. KBD ────────────────────────────────────────────────────────────────
  figma.notify("Building Kbd…", { timeout: 800 });
  await place(await buildKbdSet(varMap));

  figma.viewport.scrollAndZoomIntoView(page.children);
}

// =============================================================================
// BUTTON
// Variants: Type (Filled|Outline|Ghost|Link) × Color (Primary|Secondary|Accent|Ember|Destructive)
// Sizes:    SM | Default | LG | XL
// =============================================================================

async function buildButtonSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Medium");

  const variants: ComponentNode[] = [];

  const configs: Array<{
    type: string;
    color: string;
    fillVar: string;
    textVar: string;
    strokeVar?: string;
  }> = [
    { type: "Filled",  color: "Primary",     fillVar: "Color/Primary",     textVar: "Color/Primary/Foreground" },
    { type: "Filled",  color: "Secondary",   fillVar: "Color/Secondary",   textVar: "Color/Secondary/Foreground" },
    { type: "Filled",  color: "Accent",      fillVar: "Color/Accent",      textVar: "Color/Accent/Foreground" },
    { type: "Filled",  color: "Ember",       fillVar: "Color/Ember",       textVar: "Color/Ember/Foreground" },
    { type: "Filled",  color: "Destructive", fillVar: "Color/Error",       textVar: "Color/Primary/Foreground" },
    { type: "Outline", color: "Primary",     fillVar: "Color/Surface/Card",textVar: "Color/Primary",       strokeVar: "Color/Primary" },
    { type: "Outline", color: "Secondary",   fillVar: "Color/Surface/Card",textVar: "Color/Secondary",     strokeVar: "Color/Secondary" },
    { type: "Outline", color: "Accent",      fillVar: "Color/Surface/Card",textVar: "Color/Accent",        strokeVar: "Color/Accent" },
    { type: "Outline", color: "Destructive", fillVar: "Color/Surface/Card",textVar: "Color/Error",         strokeVar: "Color/Error" },
    { type: "Ghost",   color: "Primary",     fillVar: "Color/Surface/Glass",textVar: "Color/Primary" },
    { type: "Ghost",   color: "Default",     fillVar: "Color/Surface/Glass",textVar: "Color/Foreground" },
    { type: "Link",    color: "Primary",     fillVar: "Color/Surface/Glass",textVar: "Color/Primary" },
  ];

  const sizes: Array<{ size: string; h: number; padH: number; padV: number; fontSize: number }> = [
    { size: "SM",      h: 32,  padH: 12, padV: 4,  fontSize: 12 },
    { size: "Default", h: 40,  padH: 16, padV: 8,  fontSize: 14 },
    { size: "LG",      h: 48,  padH: 24, padV: 12, fontSize: 16 },
    { size: "XL",      h: 56,  padH: 32, padV: 14, fontSize: 18 },
  ];

  for (const cfg of configs) {
    for (const sz of sizes) {
      const c = makeComponent(`Type=${cfg.type}, Color=${cfg.color}, Size=${sz.size}`);
      makeAutoLayout(c, "HORIZONTAL", sz.padH, sz.padV, 8);
      c.minWidth = sz.padH * 2 + 60;

      bindFill(c, cfg.fillVar, varMap);
      if (cfg.strokeVar) {
        bindStroke(c, cfg.strokeVar, varMap);
        c.strokeWeight = 2;
        c.strokeAlign  = "INSIDE";
      }
      bindRadius(c, "Radius/XL", varMap);

      const label = await makeText("Button", "Poppins", "Medium", sz.fontSize, cfg.textVar, varMap);
      label.textAlignHorizontal = "LEFT";
      c.appendChild(label);

      variants.push(c);
    }
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Button";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  set.layoutWrap = "WRAP";
  set.itemSpacing = 12;
  set.counterAxisSpacing = 12;
  return set;
}

// =============================================================================
// BADGE
// Variants: Style (Filled|Soft|Outline) × Color (Primary|Secondary|Accent|Success|Warning|Error)
// =============================================================================

async function buildBadgeSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");

  const variants: ComponentNode[] = [];

  const configs: Array<{ style: string; color: string; fillVar: string; textVar: string; strokeVar?: string }> = [
    { style: "Filled",  color: "Primary",   fillVar: "Color/Primary",         textVar: "Color/Primary/Foreground" },
    { style: "Filled",  color: "Secondary", fillVar: "Color/Secondary",        textVar: "Color/Secondary/Foreground" },
    { style: "Filled",  color: "Accent",    fillVar: "Color/Accent",           textVar: "Color/Accent/Foreground" },
    { style: "Filled",  color: "Success",   fillVar: "Color/Success",          textVar: "Color/Primary/Foreground" },
    { style: "Filled",  color: "Warning",   fillVar: "Color/Warning",          textVar: "Color/Foreground" },
    { style: "Filled",  color: "Error",     fillVar: "Color/Error",            textVar: "Color/Primary/Foreground" },
    { style: "Soft",    color: "Primary",   fillVar: "Color/Tint/Primary",     textVar: "Color/Primary" },
    { style: "Soft",    color: "Success",   fillVar: "Color/Tint/Success",     textVar: "Color/Success" },
    { style: "Soft",    color: "Warning",   fillVar: "Color/Tint/Warning",     textVar: "Color/Warning" },
    { style: "Soft",    color: "Error",     fillVar: "Color/Tint/Error",       textVar: "Color/Error" },
    { style: "Outline", color: "Primary",   fillVar: "Color/Surface/Glass",    textVar: "Color/Primary",   strokeVar: "Color/Primary" },
    { style: "Outline", color: "Success",   fillVar: "Color/Surface/Glass",    textVar: "Color/Success",   strokeVar: "Color/Success" },
    { style: "Outline", color: "Error",     fillVar: "Color/Surface/Glass",    textVar: "Color/Error",     strokeVar: "Color/Error" },
  ];

  for (const cfg of configs) {
    const c = makeComponent(`Style=${cfg.style}, Color=${cfg.color}`);
    makeAutoLayout(c, "HORIZONTAL", 10, 4, 6);

    bindFill(c, cfg.fillVar, varMap);
    if (cfg.strokeVar) {
      bindStroke(c, cfg.strokeVar, varMap);
      c.strokeWeight = 1;
      c.strokeAlign = "INSIDE";
    }
    bindRadius(c, "Radius/Full", varMap);

    const label = await makeText("Badge", "Poppins", "SemiBold", 12, cfg.textVar, varMap);
    c.appendChild(label);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Badge";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  set.layoutWrap = "WRAP";
  return set;
}

// =============================================================================
// INPUT
// Variants: Variant (Default|Filled|Ghost) × State (Default|Error|Success|Disabled)
// =============================================================================

async function buildInputSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Regular");

  const variants: ComponentNode[] = [];

  const variantConfigs: Array<{ variant: string; fillVar: string; strokeVar: string }> = [
    { variant: "Default", fillVar: "Color/Surface/Glass", strokeVar: "Color/Border" },
    { variant: "Filled",  fillVar: "Color/Surface/Card",  strokeVar: "Color/Border/Input" },
    { variant: "Ghost",   fillVar: "Color/Surface/Glass", strokeVar: "Color/Border" },
  ];

  const stateConfigs: Array<{ state: string; strokeVar?: string; textVar: string }> = [
    { state: "Default",  textVar: "Color/Muted/Foreground" },
    { state: "Focus",    strokeVar: "Color/Primary",  textVar: "Color/Foreground" },
    { state: "Error",    strokeVar: "Color/Error",    textVar: "Color/Foreground" },
    { state: "Success",  strokeVar: "Color/Success",  textVar: "Color/Foreground" },
    { state: "Disabled", textVar: "Color/Muted/Foreground" },
  ];

  for (const vCfg of variantConfigs) {
    for (const sCfg of stateConfigs) {
      const c = makeComponent(`Variant=${vCfg.variant}, State=${sCfg.state}`);
      c.layoutMode = "HORIZONTAL";
      c.primaryAxisSizingMode = "FIXED";
      c.counterAxisSizingMode = "AUTO";
      c.resize(280, 40);
      c.paddingLeft  = 12;
      c.paddingRight = 12;
      c.paddingTop   = 8;
      c.paddingBottom = 8;
      c.primaryAxisAlignItems = "SPACE_BETWEEN";
      c.counterAxisAlignItems = "CENTER";
      c.itemSpacing = 8;

      bindFill(c, vCfg.fillVar, varMap);
      const strokeVar = sCfg.strokeVar ?? vCfg.strokeVar;
      bindStroke(c, strokeVar, varMap);
      c.strokeWeight = sCfg.state === "Focus" ? 2 : 1;
      c.strokeAlign  = "INSIDE";
      bindRadius(c, "Radius/LG", varMap);

      const placeholder = await makeText(
        sCfg.state === "Default" ? "Placeholder text…" : "Input value",
        "Poppins", "Regular", 14, sCfg.textVar, varMap
      );
      placeholder.textAlignHorizontal = "LEFT";
      placeholder.layoutSizingHorizontal = "FILL";
      c.appendChild(placeholder);

      if (sCfg.state === "Disabled") c.opacity = 0.5;

      variants.push(c);
    }
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Input";
  makeAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 12);
  return set;
}

// =============================================================================
// CARD
// Variants: Style (Default|Hover) — inner structure: Header + Content + Footer
// =============================================================================

async function buildCardSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");
  await loadFont("Poppins", "Regular");

  const variants: ComponentNode[] = [];

  for (const hover of [false, true]) {
    const c = makeComponent(`Hover=${hover ? "True" : "False"}`);
    c.layoutMode = "VERTICAL";
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(320, 10);
    c.paddingLeft   = 0;
    c.paddingRight  = 0;
    c.paddingTop    = 0;
    c.paddingBottom = 0;
    c.itemSpacing   = 0;

    bindFill(c, "Color/Surface/Card", varMap);
    bindStroke(c, "Color/Border", varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/XL", varMap);
    c.clipsContent = true;

    // Header
    const header = makeFrame("CardHeader");
    header.layoutMode = "VERTICAL";
    header.primaryAxisSizingMode = "AUTO";
    header.counterAxisSizingMode = "FILL";
    header.paddingLeft   = 24;
    header.paddingRight  = 24;
    header.paddingTop    = 24;
    header.paddingBottom = 12;
    header.itemSpacing   = 4;
    header.fills = [];

    const title = await makeText("Card Title", "Poppins", "SemiBold", 18, "Color/Foreground", varMap);
    title.textAlignHorizontal = "LEFT";
    title.layoutSizingHorizontal = "FILL";

    const desc = await makeText("Card description goes here", "Poppins", "Regular", 14, "Color/Muted/Foreground", varMap);
    desc.textAlignHorizontal = "LEFT";
    desc.layoutSizingHorizontal = "FILL";

    header.appendChild(title);
    header.appendChild(desc);

    // Content
    const content = makeFrame("CardContent");
    content.layoutMode = "VERTICAL";
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FILL";
    content.paddingLeft   = 24;
    content.paddingRight  = 24;
    content.paddingTop    = 0;
    content.paddingBottom = 16;
    content.itemSpacing   = 8;
    content.fills = [];
    const contentText = await makeText("Your content goes here", "Poppins", "Regular", 14, "Color/Foreground", varMap);
    contentText.textAlignHorizontal = "LEFT";
    contentText.layoutSizingHorizontal = "FILL";
    content.appendChild(contentText);

    // Separator line
    const sep = figma.createRectangle();
    sep.name = "Separator";
    sep.resize(320, 1);
    sep.layoutSizingHorizontal = "FILL";
    bindFill(sep, "Color/Border", varMap);

    // Footer
    const footer = makeFrame("CardFooter");
    footer.layoutMode = "HORIZONTAL";
    footer.primaryAxisSizingMode = "AUTO";
    footer.counterAxisSizingMode = "FILL";
    footer.paddingLeft   = 24;
    footer.paddingRight  = 24;
    footer.paddingTop    = 16;
    footer.paddingBottom = 24;
    footer.primaryAxisAlignItems = "MIN";
    footer.fills = [];

    c.appendChild(header);
    c.appendChild(content);
    c.appendChild(sep);
    c.appendChild(footer);

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Card";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 32);
  return set;
}

// =============================================================================
// ALERT
// Variants: Variant (Default|Info|Success|Warning|Error) × Dismissible (True|False)
// =============================================================================

async function buildAlertSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "SemiBold");
  await loadFont("Poppins", "Regular");

  const variants: ComponentNode[] = [];

  const configs: Array<{ variant: string; fillVar: string; strokeVar: string; textVar: string }> = [
    { variant: "Default", fillVar: "Color/Surface/Card",  strokeVar: "Color/Border",   textVar: "Color/Foreground" },
    { variant: "Info",    fillVar: "Color/Tint/Primary",  strokeVar: "Color/Primary",  textVar: "Color/Primary" },
    { variant: "Success", fillVar: "Color/Tint/Success",  strokeVar: "Color/Success",  textVar: "Color/Success" },
    { variant: "Warning", fillVar: "Color/Tint/Warning",  strokeVar: "Color/Warning",  textVar: "Color/Warning" },
    { variant: "Error",   fillVar: "Color/Tint/Error",    strokeVar: "Color/Error",    textVar: "Color/Error" },
  ];

  for (const cfg of configs) {
    for (const dismissible of [false, true]) {
      const c = makeComponent(`Variant=${cfg.variant}, Dismissible=${dismissible}`);
      c.layoutMode = "HORIZONTAL";
      c.primaryAxisSizingMode = "FIXED";
      c.counterAxisSizingMode = "AUTO";
      c.resize(400, 10);
      c.paddingLeft   = 16;
      c.paddingRight  = 16;
      c.paddingTop    = 14;
      c.paddingBottom = 14;
      c.itemSpacing   = 12;
      c.counterAxisAlignItems = "MIN";
      c.primaryAxisAlignItems = "SPACE_BETWEEN";

      bindFill(c, cfg.fillVar, varMap);
      bindStroke(c, cfg.strokeVar, varMap);
      c.strokeWeight = 1;
      c.strokeAlign  = "INSIDE";
      bindRadius(c, "Radius/LG", varMap);

      // Left border accent
      const accent = figma.createRectangle();
      accent.name = "Accent Border";
      accent.resize(4, 10);
      accent.layoutSizingVertical = "FILL";
      bindFill(accent, cfg.strokeVar, varMap);
      accent.cornerRadius = 2;
      c.appendChild(accent);

      // Text block
      const textBlock = makeFrame("Text");
      textBlock.layoutMode = "VERTICAL";
      textBlock.primaryAxisSizingMode = "AUTO";
      textBlock.counterAxisSizingMode = "FILL";
      textBlock.layoutSizingHorizontal = "FILL";
      textBlock.itemSpacing = 2;
      textBlock.fills = [];

      const alertTitle = await makeText("Alert Title", "Poppins", "SemiBold", 14, cfg.textVar, varMap);
      alertTitle.textAlignHorizontal = "LEFT";
      alertTitle.layoutSizingHorizontal = "FILL";

      const alertDesc = await makeText("This is the alert description message.", "Poppins", "Regular", 13, "Color/Foreground", varMap);
      alertDesc.textAlignHorizontal = "LEFT";
      alertDesc.layoutSizingHorizontal = "FILL";

      textBlock.appendChild(alertTitle);
      textBlock.appendChild(alertDesc);
      c.appendChild(textBlock);

      variants.push(c);
    }
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Alert";
  makeAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 12);
  return set;
}

// =============================================================================
// PROGRESS
// =============================================================================

async function buildProgressSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const value of [25, 50, 75]) {
    const c = makeComponent(`Value=${value}`);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(280, 8);
    c.counterAxisAlignItems = "CENTER";
    c.fills = [];
    bindRadius(c, "Radius/Full", varMap);
    c.clipsContent = false;

    const track = makeFrame("Track");
    track.layoutMode = "HORIZONTAL";
    track.primaryAxisSizingMode = "FIXED";
    track.counterAxisSizingMode = "FIXED";
    track.resize(280, 8);
    track.counterAxisAlignItems = "CENTER";
    track.primaryAxisAlignItems = "MIN";
    bindFill(track, "Color/Surface/Card", varMap);
    bindRadius(track, "Radius/Full", varMap);
    track.clipsContent = true;

    const fill = makeFrame("Fill");
    fill.layoutMode = "HORIZONTAL";
    fill.resize(280 * (value / 100), 8);
    fill.primaryAxisSizingMode = "FIXED";
    fill.counterAxisSizingMode = "FIXED";
    bindFill(fill, "Color/Primary", varMap);

    track.appendChild(fill);
    c.appendChild(track);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Progress";
  makeAutoLayout(set as unknown as FrameNode, "VERTICAL", 20, 20, 16);
  return set;
}

// =============================================================================
// SWITCH
// =============================================================================

async function buildSwitchSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const checked of [false, true]) {
    const c = makeComponent(`Checked=${checked}`);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(44, 24);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = checked ? "MAX" : "MIN";
    c.paddingLeft   = 2;
    c.paddingRight  = 2;
    c.paddingTop    = 2;
    c.paddingBottom = 2;

    bindFill(c, checked ? "Color/Primary" : "Color/Surface/Card", varMap);
    bindStroke(c, checked ? "Color/Primary" : "Color/Border", varMap);
    c.strokeWeight = 2;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/Full", varMap);

    const thumb = makeFrame("Thumb");
    thumb.resize(20, 20);
    thumb.primaryAxisSizingMode = "FIXED";
    thumb.counterAxisSizingMode = "FIXED";
    thumb.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    thumb.cornerRadius = 9999;

    c.appendChild(thumb);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Switch";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// CHECKBOX
// =============================================================================

async function buildCheckboxSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  for (const checked of [false, true]) {
    const c = makeComponent(`Checked=${checked}`);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(20, 20);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "CENTER";

    bindFill(c, checked ? "Color/Primary" : "Color/Surface/Card", varMap);
    bindStroke(c, checked ? "Color/Primary" : "Color/Border", varMap);
    c.strokeWeight = 1.5;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/SM", varMap);

    if (checked) {
      // Checkmark (simplified as a rectangle diagonal - real checkmark needs vector)
      const check = figma.createRectangle();
      check.resize(10, 2);
      check.rotation = -45;
      check.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      c.appendChild(check);
    }

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Checkbox";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// AVATAR
// =============================================================================

async function buildAvatarSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Poppins", "Medium");
  const variants: ComponentNode[] = [];

  const sizes: Array<{ size: string; dim: number; fontSize: number }> = [
    { size: "SM", dim: 28, fontSize: 11 },
    { size: "MD", dim: 36, fontSize: 14 },
    { size: "LG", dim: 44, fontSize: 16 },
    { size: "XL", dim: 56, fontSize: 20 },
  ];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(sz.dim, sz.dim);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "CENTER";
    c.cornerRadius = 9999;

    bindFill(c, "Color/Tint/Primary", varMap);

    const initials = await makeText("AB", "Poppins", "Medium", sz.fontSize, "Color/Primary", varMap);
    c.appendChild(initials);

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Avatar";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  return set;
}

// =============================================================================
// SEPARATOR
// =============================================================================

async function buildSeparator(varMap: VarMap): Promise<ComponentNode> {
  const c = makeComponent("Separator");
  c.layoutMode = "HORIZONTAL";
  c.primaryAxisSizingMode = "FIXED";
  c.counterAxisSizingMode = "FIXED";
  c.resize(320, 1);
  c.counterAxisAlignItems = "CENTER";
  bindFill(c, "Color/Border", varMap);
  return c;
}

// =============================================================================
// SPINNER
// =============================================================================

async function buildSpinnerSet(varMap: VarMap): Promise<ComponentSetNode> {
  const variants: ComponentNode[] = [];

  const sizes: Array<{ size: string; dim: number }> = [
    { size: "XS", dim: 12 },
    { size: "SM", dim: 16 },
    { size: "MD", dim: 24 },
    { size: "LG", dim: 32 },
    { size: "XL", dim: 48 },
  ];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    c.layoutMode = "HORIZONTAL";
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(sz.dim, sz.dim);
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "CENTER";
    c.fills = [];

    const ring = figma.createEllipse();
    ring.name = "Ring";
    ring.resize(sz.dim, sz.dim);
    ring.fills = [];
    ring.strokes = [figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color",
      varMap["Color/Primary"] || Object.values(varMap)[0]
    )];
    ring.strokeWeight = Math.max(2, sz.dim * 0.12);
    ring.strokeAlign = "INSIDE";
    ring.arcData = { startingAngle: 0, endingAngle: Math.PI * 1.5, innerRadius: 0 };

    c.appendChild(ring);
    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Spinner";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 16);
  return set;
}

// =============================================================================
// KBD (Keyboard Key)
// =============================================================================

async function buildKbdSet(varMap: VarMap): Promise<ComponentSetNode> {
  await loadFont("Fira Code", "Regular");
  const variants: ComponentNode[] = [];

  const sizes: Array<{ size: string; h: number; padH: number; fontSize: number }> = [
    { size: "SM", h: 20, padH: 4, fontSize: 10 },
    { size: "MD", h: 24, padH: 6, fontSize: 12 },
    { size: "LG", h: 28, padH: 8, fontSize: 14 },
  ];

  for (const sz of sizes) {
    const c = makeComponent(`Size=${sz.size}`);
    makeAutoLayout(c, "HORIZONTAL", sz.padH, 2, 0);
    c.counterAxisSizingMode = "FIXED";
    c.resize(sz.padH * 2 + 20, sz.h);

    bindFill(c, "Color/Surface/Card", varMap);
    bindStroke(c, "Color/Border", varMap);
    c.strokeWeight = 1;
    c.strokeAlign  = "INSIDE";
    bindRadius(c, "Radius/SM", varMap);

    const key = await makeText("⌘", "Fira Code", "Regular", sz.fontSize, "Color/Foreground", varMap);
    c.appendChild(key);

    variants.push(c);
  }

  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = "Kbd";
  makeAutoLayout(set as unknown as FrameNode, "HORIZONTAL", 20, 20, 12);
  return set;
}