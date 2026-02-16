// =============================================================================
// STYLE CREATOR
// Creates Figma Text Styles (typography scale) and Effect Styles (shadows/glass)
// Every text style has font family + size + weight + line-height locked in.
// Font family variables are bound where the API supports it.
// =============================================================================

export interface TextStyleDef {
  name: string;       // e.g. "Devign/Heading/4XL"
  family: string;     // "Poppins" | "Fira Code"
  style: string;      // "SemiBold" | "Regular" etc
  size: number;       // px
  lineHeight: number; // px
  letterSpacing: number; // px
  paragraphSpacing?: number;
}

export interface EffectStyleDef {
  name: string;
  effects: Effect[];
}

// ─── Typography scale (matches styles.css heading definitions) ────────────────

export const TEXT_STYLE_DEFS: TextStyleDef[] = [
  // Display heading
  { name: "Devign/Heading/Display",   family: "Poppins", style: "Black",    size: 72, lineHeight: 80, letterSpacing: -2   },
  // Headings
  { name: "Devign/Heading/4XL",      family: "Poppins", style: "SemiBold", size: 48, lineHeight: 56, letterSpacing: -1.5 },
  { name: "Devign/Heading/3XL",      family: "Poppins", style: "SemiBold", size: 36, lineHeight: 44, letterSpacing: -1   },
  { name: "Devign/Heading/2XL",      family: "Poppins", style: "SemiBold", size: 30, lineHeight: 38, letterSpacing: -0.5 },
  { name: "Devign/Heading/XL",       family: "Poppins", style: "SemiBold", size: 24, lineHeight: 32, letterSpacing: -0.3 },
  { name: "Devign/Heading/LG",       family: "Poppins", style: "SemiBold", size: 20, lineHeight: 28, letterSpacing: -0.2 },
  { name: "Devign/Heading/MD",       family: "Poppins", style: "SemiBold", size: 18, lineHeight: 26, letterSpacing: -0.1 },
  // Body
  { name: "Devign/Body/XL",          family: "Poppins", style: "Regular",  size: 20, lineHeight: 32, letterSpacing: 0    },
  { name: "Devign/Body/LG",          family: "Poppins", style: "Regular",  size: 18, lineHeight: 28, letterSpacing: 0    },
  { name: "Devign/Body/MD",          family: "Poppins", style: "Regular",  size: 16, lineHeight: 24, letterSpacing: 0    },
  { name: "Devign/Body/SM",          family: "Poppins", style: "Regular",  size: 14, lineHeight: 22, letterSpacing: 0    },
  { name: "Devign/Body/XS",          family: "Poppins", style: "Regular",  size: 12, lineHeight: 18, letterSpacing: 0    },
  // Labels
  { name: "Devign/Label/LG",         family: "Poppins", style: "Medium",   size: 16, lineHeight: 24, letterSpacing: 0    },
  { name: "Devign/Label/MD",         family: "Poppins", style: "Medium",   size: 14, lineHeight: 20, letterSpacing: 0    },
  { name: "Devign/Label/SM",         family: "Poppins", style: "Medium",   size: 12, lineHeight: 16, letterSpacing: 0    },
  { name: "Devign/Label/XS",         family: "Poppins", style: "SemiBold", size: 10, lineHeight: 14, letterSpacing: 0.5  },
  // Code / Mono
  { name: "Devign/Code/MD",          family: "Fira Code", style: "Regular", size: 14, lineHeight: 22, letterSpacing: -0.2 },
  { name: "Devign/Code/SM",          family: "Fira Code", style: "Regular", size: 12, lineHeight: 18, letterSpacing: -0.1 },
  // Overline / caption
  { name: "Devign/Overline",         family: "Poppins", style: "SemiBold", size: 10, lineHeight: 14, letterSpacing: 1.5  },
  { name: "Devign/Caption",          family: "Poppins", style: "Regular",  size: 11, lineHeight: 16, letterSpacing: 0.2  },
];

// ─── Effect styles ────────────────────────────────────────────────────────────

export const EFFECT_STYLE_DEFS: EffectStyleDef[] = [
  {
    name: "Devign/Shadow/SM",
    effects: [{
      type: "DROP_SHADOW", color: { r: 0.12, g: 0.15, b: 0.53, a: 0.08 },
      offset: { x: 0, y: 2 }, radius: 8, spread: 0, visible: true, blendMode: "NORMAL"
    }],
  },
  {
    name: "Devign/Shadow/MD",
    effects: [{
      type: "DROP_SHADOW", color: { r: 0.12, g: 0.15, b: 0.53, a: 0.12 },
      offset: { x: 0, y: 4 }, radius: 16, spread: 0, visible: true, blendMode: "NORMAL"
    }],
  },
  {
    name: "Devign/Shadow/LG",
    effects: [{
      type: "DROP_SHADOW", color: { r: 0.12, g: 0.15, b: 0.53, a: 0.16 },
      offset: { x: 0, y: 8 }, radius: 32, spread: 0, visible: true, blendMode: "NORMAL"
    }],
  },
  {
    name: "Devign/Shadow/XL",
    effects: [{
      type: "DROP_SHADOW", color: { r: 0.12, g: 0.15, b: 0.53, a: 0.20 },
      offset: { x: 0, y: 12 }, radius: 48, spread: 0, visible: true, blendMode: "NORMAL"
    }],
  },
  {
    name: "Devign/Shadow/Primary Glow",
    effects: [
      {
        type: "DROP_SHADOW", color: { r: 0.31, g: 0, b: 0.67, a: 0.25 },
        offset: { x: 0, y: 0 }, radius: 30, spread: 0, visible: true, blendMode: "NORMAL"
      },
      {
        type: "DROP_SHADOW", color: { r: 0.31, g: 0, b: 0.67, a: 0.20 },
        offset: { x: 0, y: 4 }, radius: 20, spread: 0, visible: true, blendMode: "NORMAL"
      },
    ],
  },
  {
    name: "Devign/Shadow/Accent Glow",
    effects: [
      {
        type: "DROP_SHADOW", color: { r: 0.89, g: 0.70, b: 0.24, a: 0.25 },
        offset: { x: 0, y: 0 }, radius: 30, spread: 0, visible: true, blendMode: "NORMAL"
      },
      {
        type: "DROP_SHADOW", color: { r: 0.89, g: 0.70, b: 0.24, a: 0.20 },
        offset: { x: 0, y: 4 }, radius: 20, spread: 0, visible: true, blendMode: "NORMAL"
      },
    ],
  },
  {
    name: "Devign/Glass/Card",
    effects: [
      {
        type: "DROP_SHADOW", color: { r: 0.12, g: 0.15, b: 0.53, a: 0.15 },
        offset: { x: 0, y: 8 }, radius: 32, spread: 0, visible: true, blendMode: "NORMAL"
      },
      {
        type: "LAYER_BLUR", radius: 16, visible: true
      },
    ],
  },
];

// ─── Creator ──────────────────────────────────────────────────────────────────

export async function createTextStyles(): Promise<void> {
  figma.notify("Creating text styles…", { timeout: 1000 });

  for (const def of TEXT_STYLE_DEFS) {
    try {
      await figma.loadFontAsync({ family: def.family, style: def.style });
    } catch {
      // Font not available — fall back to Inter
      await figma.loadFontAsync({ family: "Inter", style: def.style });
    }

    const style = figma.createTextStyle();
    style.name = def.name;

    try {
      style.fontName = { family: def.family, style: def.style };
    } catch {
      style.fontName = { family: "Inter", style: def.style };
    }

    style.fontSize = def.size;
    style.lineHeight = { unit: "PIXELS", value: def.lineHeight };
    style.letterSpacing = { unit: "PIXELS", value: def.letterSpacing };

    if (def.paragraphSpacing) {
      style.paragraphSpacing = def.paragraphSpacing;
    }
  }
}

export function createEffectStyles(): void {
  figma.notify("Creating effect styles…", { timeout: 1000 });

  for (const def of EFFECT_STYLE_DEFS) {
    const style = figma.createEffectStyle();
    style.name = def.name;
    style.effects = def.effects as Effect[];
  }
}