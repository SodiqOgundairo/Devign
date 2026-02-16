# YemsUI Figma Plugin

Imports your entire YemsUI design system into Figma — variables, text styles, effect styles, and fully auto-layout components, all pre-wired to your design tokens.

---

## What gets created

### Variable Collections (6)

| Collection            | Type   | Modes        |
| --------------------- | ------ | ------------ |
| `YemsUI / Palette`    | COLOR  | Light · Dark |
| `YemsUI / Semantic`   | COLOR  | Light · Dark |
| `YemsUI / Radius`     | FLOAT  | Default      |
| `YemsUI / Spacing`    | FLOAT  | Default      |
| `YemsUI / Opacity`    | FLOAT  | Default      |
| `YemsUI / Typography` | STRING | Default      |

### Text Styles (20)

Display · Heading 4XL–MD · Body XL–XS · Label LG–XS · Code MD/SM · Overline · Caption

### Effect Styles (7)

Shadow SM · MD · LG · XL · Primary Glow · Accent Glow · Glass Card

### Components (12)

All with full auto-layout, variable bindings, and variants:

| Component | Variants                                               |
| --------- | ------------------------------------------------------ |
| Button    | Type (Filled/Outline/Ghost/Link) × Color × Size        |
| Badge     | Style (Filled/Soft/Outline) × Color                    |
| Input     | Variant × State (Default/Focus/Error/Success/Disabled) |
| Card      | Hover (True/False)                                     |
| Alert     | Variant × Dismissible                                  |
| Progress  | Value (25/50/75)                                       |
| Switch    | Checked (True/False)                                   |
| Checkbox  | Checked (True/False)                                   |
| Avatar    | Size (SM/MD/LG/XL)                                     |
| Separator | —                                                      |
| Spinner   | Size (XS/SM/MD/LG/XL)                                  |
| Kbd       | Size (SM/MD/LG)                                        |

---

## Setup

### 1. Install dependencies

```bash
cd figma-plugin
npm install
```

### 2. Build

```bash
# Single build
node build.js

# Watch mode (rebuilds on save)
node build.js --watch
```

This outputs `dist/plugin.js` with the UI HTML inlined.

### 3. Load in Figma

1. Open Figma Desktop (plugin development requires the desktop app)
2. Go to **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`
4. The plugin appears under **Plugins → Development → YemsUI Design System**

### 4. Run

1. Open any Figma file
2. Run **YemsUI Design System** from the plugins menu
3. Customise colors, radius, and blur in the **Theme** tab
4. Choose what to import in the **Import** tab
5. Click **Import YemsUI into Figma**

---

## How the variable binding works

Every component is built with variables bound directly to its fills, strokes, radius, padding, and gap:

```
Button fill → "Color/Primary" variable
           → aliases "Palette/Brand/500" variable
           → value: #5000ab (Light) / #5000ab (Dark)
```

When you switch a frame to **Dark mode** in Figma's variable panel, every component updates automatically. When you edit `Palette/Brand/500`, every Button, Badge, Input, and Card that references it updates too.

---

## Adding to publishing as a Figma Community plugin

1. Build for production: `node build.js`
2. In Figma: **Plugins → Development → Publish new version…**
3. Fill in name, description, and screenshots
4. Set category to **Design Systems**

---

## File structure

```
figma-plugin/
├── manifest.json           Figma plugin config
├── package.json
├── tsconfig.json
├── build.js                esbuild bundler script
└── src/
    ├── plugin.ts           Main entry, message handler
    ├── token-mapper.ts     CSS tokens → Figma variable schema
    ├── variable-creator.ts Creates Variable Collections
    ├── style-creator.ts    Creates text + effect styles
    ├── component-creator.ts Builds all auto-layout components
    └── ui.html             Plugin panel (Theme / Import / Guide tabs)
```
