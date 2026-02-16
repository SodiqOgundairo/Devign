// =============================================================================
// TOKEN MAPPER
// Converts YemsUI/Devign CSS design tokens into a Figma Variable schema.
// =============================================================================

export interface RGBAColor { r: number; g: number; b: number; a: number }

export interface TokenTheme {
  brand500:  string;  // primary hex  e.g. "#5000ab"
  brand900:  string;  // secondary hex
  accent500: string;  // accent hex
  accent700: string;  // ember hex
  radius:    number;  // border radius base px
  glassBlur: number;  // blur px
}

export interface ColorToken  { name: string; light: RGBAColor; dark: RGBAColor }
export interface FloatToken  { name: string; value: number }
export interface StringToken { name: string; value: string }

export interface VariableSchema {
  palette:  ColorToken[];
  semantic: ColorToken[];
  radius:   FloatToken[];
  spacing:  FloatToken[];
  opacity:  FloatToken[];
  strings:  StringToken[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function hexToRgba(hex: string, alpha = 1): RGBAColor {
  const clean = hex.replace("#", "");
  const full  = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  return {
    r: parseInt(full.slice(0, 2), 16) / 255,
    g: parseInt(full.slice(2, 4), 16) / 255,
    b: parseInt(full.slice(4, 6), 16) / 255,
    a: alpha,
  };
}

function withAlpha(c: RGBAColor, a: number): RGBAColor {
  return { ...c, a };
}

// Fixed colours
const SEASALT  = hexToRgba("#fafafa");
const BLACK    = hexToRgba("#121212");
const SUCCESS  = hexToRgba("#026008");
const WARNING  = hexToRgba("#ff8b00");
const ERROR    = hexToRgba("#ff0900");
const SKY      = hexToRgba("#4ea5d9");
const GRAY     = hexToRgba("#a1a1a1");
const GRAY_MD  = hexToRgba("#6f6d66");

// ─── Schema builder ───────────────────────────────────────────────────────────

export function buildVariableSchema(theme: TokenTheme): VariableSchema {
  const P = hexToRgba(theme.brand500);
  const S = hexToRgba(theme.brand900);
  const A = hexToRgba(theme.accent500);
  const E = hexToRgba(theme.accent700);

  const palette: ColorToken[] = [
    { name: "Palette/Brand/50",  light: withAlpha(P, 0.05), dark: withAlpha(P, 0.08) },
    { name: "Palette/Brand/100", light: withAlpha(P, 0.10), dark: withAlpha(P, 0.15) },
    { name: "Palette/Brand/300", light: withAlpha(P, 0.40), dark: withAlpha(P, 0.40) },
    { name: "Palette/Brand/500", light: P,                   dark: P                  },
    { name: "Palette/Brand/700", light: withAlpha(P, 0.80), dark: withAlpha(P, 0.80) },
    { name: "Palette/Brand/900", light: S,                   dark: S                  },
    { name: "Palette/Accent/500", light: A, dark: A },
    { name: "Palette/Accent/700", light: E, dark: E },
    { name: "Palette/Neutral/White",  light: SEASALT, dark: SEASALT },
    { name: "Palette/Neutral/Black",  light: BLACK,   dark: BLACK   },
    { name: "Palette/Neutral/Gray",   light: GRAY,    dark: GRAY    },
    { name: "Palette/Neutral/GrayMd", light: GRAY_MD, dark: GRAY_MD },
    { name: "Palette/Status/Success", light: SUCCESS, dark: SUCCESS },
    { name: "Palette/Status/Warning", light: WARNING, dark: WARNING },
    { name: "Palette/Status/Error",   light: ERROR,   dark: ERROR   },
    { name: "Palette/Status/Sky",     light: SKY,     dark: SKY     },
  ];

  const semantic: ColorToken[] = [
    { name: "Color/Background",           light: hexToRgba("#f5f7fa"), dark: hexToRgba("#0a0a0a")        },
    { name: "Color/Background/Alt",       light: hexToRgba("#e8ecf1"), dark: hexToRgba("#1a1a1a")        },
    { name: "Color/Foreground",           light: BLACK,                dark: SEASALT                      },
    { name: "Color/Muted/Foreground",     light: GRAY_MD,              dark: GRAY                         },
    { name: "Color/Primary",              light: P,                    dark: P                            },
    { name: "Color/Primary/Foreground",   light: SEASALT,              dark: SEASALT                      },
    { name: "Color/Secondary",            light: S,                    dark: S                            },
    { name: "Color/Secondary/Foreground", light: SEASALT,              dark: SEASALT                      },
    { name: "Color/Accent",               light: A,                    dark: A                            },
    { name: "Color/Accent/Foreground",    light: BLACK,                dark: BLACK                        },
    { name: "Color/Ember",                light: E,                    dark: E                            },
    { name: "Color/Ember/Foreground",     light: SEASALT,              dark: SEASALT                      },
    { name: "Color/Success",              light: SUCCESS,              dark: SUCCESS                      },
    { name: "Color/Warning",              light: WARNING,              dark: WARNING                      },
    { name: "Color/Error",                light: ERROR,                dark: ERROR                        },
    { name: "Color/Sky",                  light: SKY,                  dark: SKY                          },
    { name: "Color/Surface/Card",         light: withAlpha(SEASALT, 0.75), dark: { r:0.16, g:0.16, b:0.15, a:0.75 } },
    { name: "Color/Surface/Input",        light: withAlpha(SEASALT, 0.55), dark: { r:0.16, g:0.16, b:0.15, a:0.55 } },
    { name: "Color/Surface/Glass",        light: withAlpha(SEASALT, 0.65), dark: { r:0.07, g:0.07, b:0.07, a:0.65 } },
    { name: "Color/Border",               light: withAlpha(SEASALT, 0.30), dark: { r:1, g:1, b:1, a:0.10 }           },
    { name: "Color/Border/Input",         light: withAlpha(GRAY, 0.25),    dark: { r:1, g:1, b:1, a:0.15 }           },
    { name: "Color/Tint/Primary",         light: withAlpha(P, 0.10),       dark: withAlpha(P, 0.15)                  },
    { name: "Color/Tint/Accent",          light: withAlpha(A, 0.10),       dark: withAlpha(A, 0.15)                  },
    { name: "Color/Tint/Success",         light: withAlpha(SUCCESS, 0.10), dark: withAlpha(SUCCESS, 0.15)            },
    { name: "Color/Tint/Warning",         light: withAlpha(WARNING, 0.10), dark: withAlpha(WARNING, 0.15)            },
    { name: "Color/Tint/Error",           light: withAlpha(ERROR, 0.10),   dark: withAlpha(ERROR, 0.15)              },
  ];

  const base = theme.radius;
  const radius: FloatToken[] = [
    { name: "Radius/None", value: 0           },
    { name: "Radius/XS",   value: base * 0.25 },
    { name: "Radius/SM",   value: base * 0.5  },
    { name: "Radius/MD",   value: base * 0.75 },
    { name: "Radius/LG",   value: base        },
    { name: "Radius/XL",   value: base * 1.5  },
    { name: "Radius/2XL",  value: base * 2    },
    { name: "Radius/Full", value: 9999        },
  ];

  const spacing: FloatToken[] = [
    { name: "Spacing/0",  value: 0  },
    { name: "Spacing/1",  value: 4  },
    { name: "Spacing/2",  value: 8  },
    { name: "Spacing/3",  value: 12 },
    { name: "Spacing/4",  value: 16 },
    { name: "Spacing/5",  value: 20 },
    { name: "Spacing/6",  value: 24 },
    { name: "Spacing/8",  value: 32 },
    { name: "Spacing/10", value: 40 },
    { name: "Spacing/12", value: 48 },
    { name: "Spacing/16", value: 64 },
  ];

  const opacity: FloatToken[] = [
    { name: "Opacity/5",   value: 0.05 },
    { name: "Opacity/10",  value: 0.10 },
    { name: "Opacity/20",  value: 0.20 },
    { name: "Opacity/30",  value: 0.30 },
    { name: "Opacity/50",  value: 0.50 },
    { name: "Opacity/80",  value: 0.80 },
    { name: "Opacity/100", value: 1.00 },
  ];

  const strings: StringToken[] = [
    { name: "Typography/FontFamily/Sans",    value: "Poppins"   },
    { name: "Typography/FontFamily/Display", value: "Otama EP"  },
    { name: "Typography/FontFamily/Mono",    value: "Fira Code" },
  ];

  return { palette, semantic, radius, spacing, opacity, strings };
}