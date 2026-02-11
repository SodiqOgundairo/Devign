# yems-ui

A beautiful React component library with **glassmorphism effects**, **premium animations**, and **modern design patterns**.

## 🎨 Live Demo

👉 **[View Interactive Component Playground](https://yems-ui-playground.vercel.app)** - See all components in action!

## ✨ Features

- 🎨 **Glassmorphism Design** - Beautiful frosted glass effects with liquid aesthetics
- ⚡ **Premium Animations** - Smooth micro-interactions using Motion.dev (Framer Motion)
- 🎯 **TypeScript First** - Full type safety with exported types
- 🎭 **Radix UI Primitives** - Fully accessible components
- 🎨 **Tailwind CSS v4** - Modern utility-first styling
- 🌓 **Dark/Light Mode** - Theme-aware with CSS variables
- 🚀 **Tree-shakeable** - Import only what you need

## 📦 Installation

### Via NPM (Recommended)

```bash
npm install yems-ui
```

### Peer Dependencies

Make sure you have React 18+ installed:

```bash
npm install react react-dom
```

### Required: Tailwind CSS v4

This library requires Tailwind CSS v4:

```bash
npm install tailwindcss@next
```

---

## 🚨 IMPORTANT: Tailwind CSS v4 Setup

This library uses Tailwind CSS v4 and requires **two critical steps** in your project:

### Step 1: Add the `@source` directive

In your main CSS file (e.g., `src/styles.css` or `src/index.css`), add:

```css
@import "tailwindcss";
@source "../node_modules/@yems-ui/core/dist"; /* <-- REQUIRED! */
@import "@yems-ui/core/styles.css";

/* Your custom styles below... */
```

> ⚠️ **Without the `@source` directive, the library's utility classes (like `bg-true-azure`, `glass-card`, etc.) will NOT be generated!**

### Step 2: Ensure Vite + Tailwind v4 plugin

Make sure your `vite.config.ts` includes the Tailwind plugin:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

---

## � Framework Integration

This library works with any React framework or setup:

- **Next.js** - Works with App Router and Pages Router
- **Vite** - Full support with HMR
- **Create React App** - Compatible
- **Remix** - Works as expected
- **Astro + React** - Fully compatible
- **Gatsby** - Supported
- **Any custom webpack/rollup setup** - Should work fine

> **Note**: Mobile support is built-in. Components are touch-friendly and work on React Native Web setups.

---

## �🚀 Usage

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@yems-ui/core";

function App() {
  return (
    <Card hover>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

---

## 🎨 Components

| Component         | Description                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| **Button**        | Multiple variants (primary, secondary, accent, ghost, outline) with glassmorphism |
| **Card**          | Glass card with hover lift and StatCard variant                                   |
| **Dialog**        | Liquid glass modal with smooth animations                                         |
| **Input**         | Floating label inputs with variants                                               |
| **Radio Group**   | With explosion animation effect                                                   |
| **Switch**        | Glassmorphism toggle                                                              |
| **Checkbox**      | Animated checkbox                                                                 |
| **Alert**         | 5 variants (default, info, success, warning, error)                               |
| **Accordion**     | Collapsible content sections                                                      |
| **Popover**       | Contextual overlays                                                               |
| **Tabs**          | Tabbed content with glass effect                                                  |
| **Select**        | Dropdown select with glass styling                                                |
| **Tooltip**       | Hover tooltips                                                                    |
| **Dropdown Menu** | Context menus                                                                     |
| **Table**         | Data tables with hover effects                                                    |
| **Badge**         | Status badges and indicators                                                      |
| **Avatar**        | User avatars with fallback                                                        |
| **Progress**      | Progress bars                                                                     |
| **Separator**     | Dividers                                                                          |
| **Pagination**    | Smart page navigation                                                             |
| **Breadcrumbs**   | Navigation hierarchy                                                              |
| **Skeleton**      | Loading states (text, card, avatar, table)                                        |
| **Empty State**   | No data displays                                                                  |
| **Toast**         | Notification toasts                                                               |

---

## 🎨 Brand Colors

The library includes these brand colors as CSS variables:

| Variable                 | Color     | Hex       |
| ------------------------ | --------- | --------- |
| `--color-true-azure`     | Primary   | `#5000ab` |
| `--color-dark-amethyst`  | Secondary | `#1c0636` |
| `--color-sunflower-gold` | Accent    | `#e3b23c` |
| `--color-autumn-ember`   | Ember     | `#bb4d00` |
| `--color-fresh-sky`      | Sky       | `#4ea5d9` |
| `--color-seasalt`        | Light     | `#fafafa` |

---

## 📝 License

MIT © Sodiq Ogundairo
