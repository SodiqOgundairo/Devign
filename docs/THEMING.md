# Theming contract

Every Devign component is styled entirely through CSS custom properties (design tokens). This document is the authoritative list of those tokens: what each one does, and its light and dark defaults.

> **You usually do not need this.** Importing `devign/styles.css` defines every token below with sensible defaults, so components render correctly out of the box. Read on only if you are hand-rolling a theme, overriding specific tokens, or debugging an unstyled component.

## How the token system works

There are two layers:

```
Layer 1 — Raw palette        Layer 2 — Semantic tokens        Components
--brand-500: #5000ab    ->   --color-primary: var(--brand-500)   ->  bg-primary
--accent-500: #e3b23c   ->   --color-accent: var(--accent-500)   ->  bg-accent
```

To retheme, override **Layer 1** and everything cascades. To rewire which palette colour plays which role, override **Layer 2**. Both are valid.

The fastest way to get a ready-to-edit file with every token pre-filled is:

```bash
npx devign init
```

## Why a token can silently render unstyled

Components read these variables by name. If a required token is missing or misnamed, the component renders without that style and **there is no build error**. The two ways to avoid this:

1. Import `devign/styles.css` (recommended). It provides defaults for every token, so your overrides are additive and a typo only loses that one override, not the whole component.
2. If you define tokens entirely by hand (no `devign/styles.css`), you must define every token in the Required set below, in both `:root` and your dark selector.

---

## Required semantic tokens (Layer 2)

These are read directly by components. Define all of them if you are not importing `devign/styles.css`.

| Token | Role | Light default | Dark default |
| --- | --- | --- | --- |
| `--color-background` | Page background | `--neutral-100` | `--neutral-900` |
| `--color-foreground` | Body text | `--neutral-900` | `--neutral-50` |
| `--color-card` | Card surface | `--neutral-0` | `--neutral-800` |
| `--color-card-foreground` | Text on cards | `--neutral-900` | `--neutral-50` |
| `--color-popover` | Popover / dropdown surface | `--neutral-0` | `--neutral-800` |
| `--color-popover-foreground` | Text on popovers | `--neutral-900` | `--neutral-50` |
| `--color-input` | Input background | `--neutral-0` | `--neutral-700` |
| `--color-muted` | Subtle background | `--neutral-100` | `--neutral-700` |
| `--color-muted-foreground` | Placeholder / hint text | `--neutral-600` | `--neutral-400` |
| `--color-primary` | Primary actions, links, focus ring | `--brand-500` | inherited |
| `--color-primary-foreground` | Text on primary | `--neutral-50` | inherited |
| `--color-secondary` | Secondary actions | `--brand-900` | inherited |
| `--color-secondary-foreground` | Text on secondary | `--neutral-50` | inherited |
| `--color-accent` | Accent / highlight | `--accent-500` | inherited |
| `--color-accent-foreground` | Text on accent | `--neutral-900` | inherited |
| `--color-ember` | Ember variant | `--accent-700` | inherited |
| `--color-ember-foreground` | Text on ember | `--neutral-50` | inherited |
| `--color-destructive` | Destructive actions | `--color-error` | inherited |
| `--color-destructive-foreground` | Text on destructive | `--neutral-50` | inherited |
| `--color-border` | Borders and dividers | `--neutral-300` | `--neutral-700` |
| `--color-ring` | Focus ring | `--brand-500` | inherited |

"inherited" means the dark selector does not override it; the light value stands unless you change the underlying palette.

Utility state colours also exist and are used by status variants: `--color-success`, `--color-warning`, `--color-error`, `--color-sky`.

---

## Shape

| Token | Default | Purpose |
| --- | --- | --- |
| `--radius` | `12px` | Base radius. Every other radius derives from this. |

Derived (you rarely set these directly): `--radius-sm` (×0.5), `--radius-md` (×0.75), `--radius-lg` (×1), `--radius-xl` (×1.5), `--radius-2xl` (×2), `--radius-3xl` (×2.5), `--radius-full` (`9999px`).

---

## Glassmorphism

Glass tokens drive the frosted surfaces. Dark mode overrides the colour values automatically.

| Token | Light default | Purpose |
| --- | --- | --- |
| `--glass-bg` | `rgba(255,255,255,0.65)` | Default glass background |
| `--glass-bg-strong` | `rgba(255,255,255,0.85)` | Strong glass background |
| `--glass-border` | `rgba(0,0,0,0.08)` | Glass border |
| `--glass-card-bg` | `rgba(255,255,255,0.75)` | Card glass background |
| `--glass-card-border` | `rgba(0,0,0,0.06)` | Card glass border |
| `--glass-input-bg` | `rgba(255,255,255,0.55)` | Input glass background |
| `--glass-shadow` | blue-tinted | Glass drop shadow |
| `--glass-card-shadow` | blue-tinted | Card glass drop shadow |
| `--glass-blur` | `16px` | Default backdrop blur |

Intensity scale (used by `glass="sm" | "md" | "lg"` on Card, Dialog, etc.): `--glass-blur-sm|md|lg`, `--glass-bg-sm|md|lg`, `--glass-card-bg-sm|md|lg`, `--glass-input-bg-sm|md|lg`.

---

## Shadows

| Token | Purpose |
| --- | --- |
| `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-xl` | Elevation scale |
| `--shadow-primary` `--shadow-primary-glow` | Brand-tinted shadow / glow |
| `--shadow-accent` `--shadow-accent-glow` | Accent-tinted shadow / glow |

Dark mode deepens the elevation scale automatically.

---

## Layering (z-index)

Overlay components read these instead of a hardcoded value, so you control stacking globally. Override a single token (for example `--z-dialog`) to lift Devign overlays above app chrome, or use the per-instance `zIndex` prop on Dialog for a one-off.

| Token | Default | Used by |
| --- | --- | --- |
| `--z-overlay` | `100` | Dialog / Drawer overlays |
| `--z-popover` | `150` | Popover, Select, Dropdown content |
| `--z-dialog` | `200` | Dialog content |
| `--z-drawer` | `200` | Drawer content |
| `--z-tooltip` | `250` | Tooltip |

Intended order: tooltip > dialog / drawer > popover > overlay.

---

## Typography

Devign declares font tokens but does not load fonts. You choose how to load them (see the README Fonts section).

| Token | Default |
| --- | --- |
| `--font-sans` | `"Poppins", ui-sans-serif, system-ui, sans-serif` |
| `--font-display` | `"Otama EP", ui-serif, Georgia, serif` |
| `--font-mono` | `ui-monospace, "Cascadia Code", "Fira Code", monospace` |

---

## Transitions

| Token | Default | Purpose |
| --- | --- | --- |
| `--transition-fast` | `150ms` | Hover states |
| `--transition-normal` | `250ms` | Most animations |
| `--transition-slow` | `350ms` | Larger transitions |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bounce easing |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Spring easing |

Set the transition tokens to `0ms` to honour reduced-motion preferences globally.

---

## Dark mode

Dark mode is activated by a `.dark` class on `<html>`. The `.dark` block in `devign/styles.css` re-declares the background, foreground, border, glass, and shadow tokens, so dark mode works without extra setup. If you hand-roll tokens, re-declare every token marked with a dark default above under your dark selector, or cards and surfaces will stay light in dark mode.

```css
.dark {
  --color-background: var(--neutral-900);
  --color-card: var(--neutral-800);
  --color-border: var(--neutral-700);
  /* ...and the rest of the dark-default tokens above */
}
```

---

## Minimal example

Override just the palette; every component follows:

```css
@import "tailwindcss";
@source "../node_modules/devign/dist";
@import "devign/styles.css";

:root {
  --brand-500: #0ea5e9; /* primary */
  --brand-900: #0c4a6e; /* secondary */
  --accent-500: #f59e0b; /* accent */
  --radius: 8px;
}
```
