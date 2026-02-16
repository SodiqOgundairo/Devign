# yems-ui

A React component library with **glassmorphism effects**, **premium micro-animations**, and a fully themeable design system built on Tailwind CSS v4.

[![npm version](https://img.shields.io/npm/v/yems-ui)](https://www.npmjs.com/package/yems-ui)
[![npm downloads](https://img.shields.io/npm/dm/yems-ui)](https://www.npmjs.com/package/yems-ui)
[![license](https://img.shields.io/npm/l/yems-ui)](./LICENSE)

**[Live Demo →](https://yems-ui.vercel.app)** — See all components in action with light/dark mode toggle.

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Theming](#theming)
- [Components](#components)
- [Dark Mode](#dark-mode)
- [TypeScript](#typescript)

---

## Installation

```bash
npm install yems-ui
# or
pnpm add yems-ui
# or
yarn add yems-ui
```

**Peer dependencies** (install if not already present):

```bash
npm install react react-dom
```

---

## Setup

yems-ui requires **Tailwind CSS v4** and the `@tailwindcss/vite` plugin.

### 1. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Configure Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 3. Import the styles

In your app's entry CSS file (e.g. `src/index.css`):

```css
@import "tailwindcss";

/* Tell Tailwind to scan yems-ui's dist folder for class names */
@source "../node_modules/yems-ui/dist";

/* Import the design system tokens and base styles */
@import "yems-ui/styles.css";
```

> ⚠️ The `@source` directive is required. Without it, Tailwind won't generate the utility classes used by yems-ui components.

### 4. Import styles in your entry file

```tsx
// src/main.tsx
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 5. Use components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "yems-ui";

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Theming

yems-ui uses a **two-layer CSS variable system** built into Tailwind v4's `@theme`. You can override any part of it in your own CSS.

### How it works

```
Layer 1 — Raw palette      →    Layer 2 — Semantic tokens    →    Components
--brand-500: #5000ab       →    --color-primary: var(--brand-500)  →  bg-primary
--accent-500: #e3b23c      →    --color-accent: var(--accent-500)  →  bg-accent
```

To retheme the library, you only need to override **Layer 1** values. Everything cascades automatically.

---

### Changing the primary color

Add this to your CSS file after importing yems-ui styles:

```css
@import "tailwindcss";
@source "../node_modules/yems-ui/dist";
@import "yems-ui/styles.css";

/* Override just what you want to change */
:root {
  --brand-500: #0066ff; /* new primary — all buttons, links, rings update */
  --brand-900: #001a66; /* new secondary / dark shade */
  --accent-500: #f59e0b; /* new accent color */
}
```

### All themeable tokens

#### Brand palette (Layer 1)

| Token          | Default   | Purpose                |
| -------------- | --------- | ---------------------- |
| `--brand-50`   | `#ede8f7` | Lightest brand tint    |
| `--brand-100`  | `#d4c5f0` | Light brand tint       |
| `--brand-200`  | `#a98cdf` |                        |
| `--brand-300`  | `#7e53ce` |                        |
| `--brand-400`  | `#6529be` |                        |
| `--brand-500`  | `#5000ab` | **Main primary color** |
| `--brand-600`  | `#40008a` |                        |
| `--brand-700`  | `#300069` |                        |
| `--brand-800`  | `#200048` |                        |
| `--brand-900`  | `#1c0636` | Secondary / dark shade |
| `--accent-500` | `#e3b23c` | **Main accent color**  |
| `--accent-700` | `#bb4d00` | Ember / dark accent    |

#### Semantic tokens (Layer 2)

These are what components use internally. You can override these individually if you want to rewire which color plays which role:

| Token                        | Default maps to | Used for                            |
| ---------------------------- | --------------- | ----------------------------------- |
| `--color-primary`            | `--brand-500`   | Primary buttons, links, focus rings |
| `--color-primary-foreground` | `--neutral-50`  | Text on primary backgrounds         |
| `--color-secondary`          | `--brand-900`   | Secondary buttons                   |
| `--color-accent`             | `--accent-500`  | Accent buttons, highlights          |
| `--color-ember`              | `--accent-700`  | Ember variant                       |
| `--color-destructive`        | `--color-error` | Destructive actions                 |
| `--color-background`         | `--neutral-100` | Page background                     |
| `--color-foreground`         | `--neutral-900` | Body text                           |
| `--color-muted`              | `--neutral-100` | Subtle backgrounds                  |
| `--color-muted-foreground`   | `--neutral-500` | Placeholder / hint text             |
| `--color-border`             | `--neutral-200` | Borders and dividers                |
| `--color-ring`               | `--brand-500`   | Focus ring color                    |

#### Shape & spacing

| Token      | Default | Purpose                               |
| ---------- | ------- | ------------------------------------- |
| `--radius` | `12px`  | Base border radius for all components |

```css
:root {
  --radius: 8px; /* more angular */
  /* or */
  --radius: 20px; /* more pill-shaped */
}
```

#### Shadows

| Token              | Default       | Purpose              |
| ------------------ | ------------- | -------------------- |
| `--shadow-sm`      | subtle        | Small elevation      |
| `--shadow-md`      | medium        | Default cards        |
| `--shadow-lg`      | prominent     | Dropdowns, modals    |
| `--shadow-xl`      | strong        | Tooltips, popovers   |
| `--shadow-primary` | brand-tinted  | Primary button hover |
| `--shadow-accent`  | accent-tinted | Accent button hover  |

```css
:root {
  /* Softer shadows for a flatter look */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

#### Glassmorphism

| Token               | Light default            | Purpose               |
| ------------------- | ------------------------ | --------------------- |
| `--glass-bg`        | `rgba(255,255,255,0.65)` | Glass background      |
| `--glass-bg-strong` | `rgba(255,255,255,0.85)` | Strong glass          |
| `--glass-border`    | `rgba(0,0,0,0.08)`       | Glass border          |
| `--glass-blur`      | `16px`                   | Backdrop blur amount  |
| `--glass-card-bg`   | `rgba(255,255,255,0.75)` | Card glass background |
| `--glass-shadow`    | subtle blue-tinted       | Glass drop shadow     |

```css
:root {
  /* Heavier blur for more prominent glass effect */
  --glass-blur: 24px;
  --glass-bg: rgba(255, 255, 255, 0.5);

  /* Or minimal glass — nearly transparent */
  --glass-blur: 8px;
  --glass-bg: rgba(255, 255, 255, 0.9);
}
```

#### Typography

| Token            | Default                | Purpose              |
| ---------------- | ---------------------- | -------------------- |
| `--font-sans`    | `"Poppins", system-ui` | Body font            |
| `--font-display` | `"Otama EP", Georgia`  | Display/heading font |

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

#### Transitions

| Token                 | Default | Purpose          |
| --------------------- | ------- | ---------------- |
| `--transition-fast`   | `150ms` | Hover states     |
| `--transition-normal` | `250ms` | Most animations  |
| `--transition-slow`   | `350ms` | Page transitions |

```css
:root {
  /* Snappier animations */
  --transition-fast: 100ms;
  --transition-normal: 180ms;

  /* Or disable motion for accessibility */
  --transition-fast: 0ms;
  --transition-normal: 0ms;
}
```

### Complete theme example

```css
@import "tailwindcss";
@source "../node_modules/yems-ui/dist";
@import "yems-ui/styles.css";

/* A blue/teal theme with softer radius and minimal glass */
:root {
  /* Brand */
  --brand-500: #0ea5e9;
  --brand-900: #0c4a6e;
  --accent-500: #f59e0b;
  --accent-700: #d97706;

  /* Shape */
  --radius: 8px;

  /* Glass — subtle */
  --glass-blur: 8px;
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-card-bg: rgba(255, 255, 255, 0.9);

  /* Shadows — flatter */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.1);
}
```

### Per-component override via className

Every component accepts a `className` prop for one-off overrides without touching theme variables:

```tsx
<Button variant="primary" className="rounded-full px-8">
  Pill Button
</Button>

<Card className="border-2 border-primary/30 shadow-xl">
  Custom Card
</Card>

<Input className="h-14 text-lg" placeholder="Large input" />
```

---

## Components

### Button

```tsx
import { Button } from "yems-ui";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ember">Ember</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
<Button variant="link">Link</Button>

// Outline variants
<Button variant="outline-primary">Outline Primary</Button>
<Button variant="outline-secondary">Outline Secondary</Button>
<Button variant="outline-accent">Outline Accent</Button>
<Button variant="outline-ember">Outline Ember</Button>
<Button variant="outline-destructive">Outline Destructive</Button>

// Ghost variants
<Button variant="ghost-primary">Ghost Primary</Button>
<Button variant="ghost-secondary">Ghost Secondary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><SearchIcon /></Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>
<Button rightIcon={<ArrowRight />}>Continue</Button>

// Loading state
<Button isLoading>Saving...</Button>

// As a link (renders as child element)
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

**Props:**

| Prop        | Type                                                      | Default   | Description                           |
| ----------- | --------------------------------------------------------- | --------- | ------------------------------------- |
| `variant`   | see above                                                 | `primary` | Visual style                          |
| `size`      | `sm \| default \| lg \| xl \| icon \| icon-sm \| icon-lg` | `default` | Size                                  |
| `isLoading` | `boolean`                                                 | `false`   | Shows spinner, disables interaction   |
| `leftIcon`  | `ReactNode`                                               | —         | Icon before label                     |
| `rightIcon` | `ReactNode`                                               | —         | Icon after label                      |
| `asChild`   | `boolean`                                                 | `false`   | Renders as child element (e.g. `<a>`) |

---

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, StatCard } from "yems-ui";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>A short description.</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here.
  </CardContent>
  <CardFooter>
    <Button variant="outline-primary">Action</Button>
  </CardFooter>
</Card>

// With hover animation
<Card hover>
  <CardContent>Lifts on hover</CardContent>
</Card>

// Stats card
<StatCard
  title="Total Revenue"
  value="$12,340"
  icon={<DollarSign />}
  trend={{ value: 12.5, isPositive: true }}
  description="vs last month"
/>
```

**StatCard props:**

| Prop          | Type                                     | Description                 |
| ------------- | ---------------------------------------- | --------------------------- |
| `title`       | `string`                                 | Label above the value       |
| `value`       | `string \| number`                       | The main figure             |
| `icon`        | `ReactNode`                              | Icon shown top-right        |
| `trend`       | `{ value: number, isPositive: boolean }` | Percentage change indicator |
| `description` | `string`                                 | Sub-label below the value   |

---

### Input

```tsx
import { Input, Label, FormField, Textarea } from "yems-ui";
import { Search } from "lucide-react";

// Variants
<Input placeholder="Default" />
<Input placeholder="Filled" variant="filled" />
<Input placeholder="Ghost" variant="ghost" />

// Sizes
<Input placeholder="Small" inputSize="sm" />
<Input placeholder="Large" inputSize="lg" />

// With icons and addons
<Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search..." />
<Input leftAddon="https://" placeholder="yoursite.com" />
<Input rightAddon=".com" placeholder="domain" />

// Validation states
<Input state="error" error="This field is required" />
<Input state="success" hint="Looks good!" />

// Label + FormField (handles layout, label, error, hint together)
<FormField label="Email" htmlFor="email" required error="Invalid email">
  <Input id="email" type="email" />
</FormField>

// Textarea
<Textarea placeholder="Write something..." rows={4} />
<Textarea variant="filled" state="error" error="Required" />
```

---

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "yems-ui";
import { InfoIcon } from "lucide-react";

<Alert variant="info">
  <InfoIcon className="h-4 w-4" />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Something you should know.</AlertDescription>
</Alert>

// Variants: default | info | success | warning | error
<Alert variant="success">...</Alert>
<Alert variant="warning">...</Alert>
<Alert variant="error">...</Alert>

// Dismissible
<Alert variant="info" dismissible onDismiss={() => console.log("dismissed")}>
  <AlertTitle>Dismissible</AlertTitle>
</Alert>
```

---

### Badge

```tsx
import { Badge, StatusBadge } from "yems-ui";

// Filled
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>

// Soft (light background, colored text)
<Badge variant="soft-success">Paid</Badge>
<Badge variant="soft-warning">Pending</Badge>
<Badge variant="soft-error">Unpaid</Badge>

// Outline
<Badge variant="outline-primary">Draft</Badge>

// With dot indicator
<Badge variant="soft-success" dot>Online</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>

// Preset status badge
<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="inactive" />
```

---

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "yems-ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
    </DialogHeader>
    <div className="py-4">
      <Input placeholder="Name" />
    </div>
    <DialogFooter>
      <Button variant="primary">Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

---

### Select

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "yems-ui";

const [value, setValue] = useState("");

<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Choose one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>;
```

---

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "yems-ui";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>;
```

---

### Toast

```tsx
import { Toaster, useToast } from "yems-ui";

// Add <Toaster /> once near the root of your app
function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  );
}

// Use the hook anywhere
function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({ title: "Saved!", description: "Your changes have been saved." })
      }
    >
      Save
    </Button>
  );
}

// Destructive variant
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
});
```

---

### Skeleton

```tsx
import { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar, SkeletonTable } from "yems-ui";

// Basic
<Skeleton className="h-4 w-48" />
<Skeleton variant="circular" className="h-10 w-10" />

// Animation variants
<Skeleton animation="pulse" className="h-4 w-full" />   // default
<Skeleton animation="wave" className="h-4 w-full" />
<Skeleton animation="none" className="h-4 w-full" />

// Preset layouts
<SkeletonCard />
<SkeletonText lines={4} />
<SkeletonAvatar size="lg" />
<SkeletonTable rows={5} columns={4} />
```

---

### Other components

| Component      | Import                                                                        | Notes                                              |
| -------------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| `Accordion`    | `AccordionItem, AccordionTrigger, AccordionContent`                           | Radix-based, animated                              |
| `Avatar`       | `Avatar, AvatarImage, AvatarFallback`                                         | With image fallback                                |
| `Breadcrumbs`  | `Breadcrumbs`                                                                 | Accepts `items: { label, href? }[]`                |
| `Checkbox`     | `Checkbox`                                                                    | Controlled via `checked` + `onCheckedChange`       |
| `DropdownMenu` | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem`    | Radix-based                                        |
| `EmptyState`   | `EmptyState`                                                                  | Props: `title`, `description`, `icon`, `action`    |
| `Pagination`   | `Pagination`                                                                  | Props: `currentPage`, `totalPages`, `onPageChange` |
| `Popover`      | `Popover, PopoverTrigger, PopoverContent`                                     | Radix-based                                        |
| `Progress`     | `Progress`                                                                    | Accepts `value` (0–100)                            |
| `RadioGroup`   | `RadioGroup, RadioGroupItem`                                                  | Controlled via `value` + `onValueChange`           |
| `Separator`    | `Separator`                                                                   | Horizontal or vertical divider                     |
| `Switch`       | `Switch`                                                                      | Controlled via `checked` + `onCheckedChange`       |
| `Table`        | `Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption` | Standard table layout                              |
| `Tooltip`      | `TooltipProvider, Tooltip, TooltipTrigger, TooltipContent`                    | Wrap app in `TooltipProvider`                      |

---

## Dark Mode

yems-ui supports dark mode via a `.dark` class on the `<html>` element. Add or remove it to switch themes:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

A simple React hook to manage this:

```tsx
function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  // Restore on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return { isDark, toggle };
}

// Usage
function Header() {
  const { isDark, toggle } = useDarkMode();
  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
```

Dark mode overrides the glass variables and all semantic tokens automatically — no extra setup needed.

---

## TypeScript

All components are fully typed. Props interfaces are exported:

```tsx
import type {
  ButtonProps,
  CardProps,
  InputProps,
  BadgeProps,
  StatCardProps,
  EmptyStateProps,
  PaginationProps,
  SkeletonProps,
} from "yems-ui";
```

---

## Framework notes

| Framework                | Notes                                                                             |
| ------------------------ | --------------------------------------------------------------------------------- |
| **Vite**                 | Full support. See setup above.                                                    |
| **Next.js App Router**   | Add `"use client"` to files using hooks or event handlers. CSS setup is the same. |
| **Next.js Pages Router** | Import styles in `_app.tsx`. Works without `"use client"`.                        |
| **Remix**                | Import styles in `root.tsx` links export.                                         |
| **Astro**                | Use inside `.tsx` components with `client:load` or `client:visible`.              |

---

## License

MIT © [Yemi Ogundairo](https://github.com/SodiqOgundairo)

---

## 🔤 Fonts

yems-ui declares font tokens but **does not load fonts itself** — you choose the method that fits your project.

### Option A — Google Fonts

Add to your `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,400&display=swap"
  rel="stylesheet"
/>
```

### Option B — Fontsource (self-hosted, no CDN)

```bash
npm install @fontsource/poppins
```

Then in your app entry file:

```ts
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
```

### Option C — Bring your own font

Override the CSS token in your stylesheet (after importing yems-ui styles):

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Fira Code", ui-monospace, monospace;
}
```

---

## 🎨 New Components (v1.2+)

### Typography

```tsx
import { Heading, Text, Code, Lead, Blockquote } from "yems-ui";

// Heading — renders h1-h6 with size/weight/gradient variants
<Heading as="h1" size="4xl" gradient="primary">Welcome to Devign</Heading>
<Heading as="h2" size="2xl" weight="bold">Section Title</Heading>
<Heading size="lg" gradient="accent">Accent Heading</Heading>

// Text — inline or block text with semantic color variants
<Text size="lg" variant="muted" leading="relaxed">Subtitle text</Text>
<Text size="sm" variant="error">Error message</Text>
<Text as="span" weight="semibold" variant="primary">Highlighted</Text>

// Code
<Code>npm install yems-ui</Code>              // inline
<Code block>{`const x = 1;`}</Code>           // block / pre

// Lead — large intro paragraph
<Lead>A short description that introduces the section content.</Lead>

// Blockquote
<Blockquote>Design is not just what it looks like. Design is how it works.</Blockquote>
```

**Heading props:**

| Prop       | Values                                              | Default    |
| ---------- | --------------------------------------------------- | ---------- |
| `as`       | `h1` `h2` `h3` `h4` `h5` `h6`                       | `h2`       |
| `size`     | `4xl` `3xl` `2xl` `xl` `lg` `md`                    | `2xl`      |
| `weight`   | `light` `normal` `medium` `semibold` `bold` `black` | `semibold` |
| `gradient` | `none` `primary` `accent` `cool`                    | `none`     |
| `align`    | `left` `center` `right`                             | `left`     |

**Text props:**

| Prop       | Values                                                           | Default   |
| ---------- | ---------------------------------------------------------------- | --------- |
| `as`       | `p` `span` `div` `label` `small` `strong` `em`                   | `p`       |
| `size`     | `xs` `sm` `md` `lg` `xl`                                         | `md`      |
| `variant`  | `default` `muted` `primary` `accent` `success` `warning` `error` | `default` |
| `weight`   | `light` `normal` `medium` `semibold` `bold`                      | `normal`  |
| `leading`  | `tight` `snug` `normal` `relaxed` `loose`                        | `normal`  |
| `truncate` | `true` `false`                                                   | `false`   |

---

### Spinner

```tsx
import { Spinner, LoadingOverlay } from "yems-ui";

<Spinner />                                // default medium primary
<Spinner size="lg" variant="accent" />
<Spinner size="xs" variant="white" />      // inside dark buttons

// LoadingOverlay — wraps any content
<LoadingOverlay loading={isLoading} label="Fetching data...">
  <MyDataTable />
</LoadingOverlay>
```

| Prop      | Values                                         | Default   |
| --------- | ---------------------------------------------- | --------- |
| `size`    | `xs` `sm` `md` `lg` `xl`                       | `md`      |
| `variant` | `primary` `secondary` `accent` `white` `muted` | `primary` |

---

### Kbd

```tsx
import { Kbd, Shortcut } from "yems-ui";

<Kbd>⌘</Kbd>
<Kbd size="lg">Enter</Kbd>

// Shortcut renders a key combination
<Shortcut keys={["⌘", "K"]} />
<Shortcut keys={["Ctrl", "Shift", "P"]} size="sm" />
```

---

### AvatarGroup

```tsx
import { AvatarGroup } from "yems-ui";

<AvatarGroup
  avatars={[
    { src: "/alice.jpg", fallback: "AL", alt: "Alice" },
    { src: "/bob.jpg", fallback: "BO", alt: "Bob" },
    { fallback: "CW", alt: "Charlie" },
    { fallback: "DM", alt: "Diana" },
    { fallback: "EK", alt: "Eve" },
    { fallback: "FP", alt: "Frank" }, // overflows → shows +1
  ]}
  max={5}
  size="md"
  spacing="normal"
/>;
```

| Prop      | Values                   | Default  |
| --------- | ------------------------ | -------- |
| `max`     | number                   | `5`      |
| `size`    | `sm` `md` `lg`           | `md`     |
| `spacing` | `tight` `normal` `loose` | `normal` |

---

### NumberInput

```tsx
import { NumberInput } from "yems-ui";

const [qty, setQty] = useState(1);

<NumberInput value={qty} onChange={setQty} min={1} max={99} />
<NumberInput value={qty} onChange={setQty} step={5} size="lg" />
<NumberInput value={qty} onChange={setQty} error="Must be at least 1" />
```

| Prop       | Type                      | Default     |
| ---------- | ------------------------- | ----------- |
| `value`    | `number`                  | `0`         |
| `onChange` | `(value: number) => void` | —           |
| `min`      | `number`                  | `-Infinity` |
| `max`      | `number`                  | `Infinity`  |
| `step`     | `number`                  | `1`         |
| `size`     | `sm` `md` `lg`            | `md`        |

---

### Layout Primitives

```tsx
import { Container, Stack, Grid, Divider } from "yems-ui";

// Container — max-width page wrapper
<Container size="xl" padded>
  <YourPageContent />
</Container>

// Stack — flex column or row with gap
<Stack direction="col" gap={6}>
  <Card>One</Card>
  <Card>Two</Card>
</Stack>

<Stack direction="row" gap={4} align="center" justify="between">
  <Logo />
  <Nav />
</Stack>

// Grid — responsive columns
<Grid cols={1} mdCols={2} lgCols={3} gap={6}>
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</Grid>

// Divider
<Divider />
<Divider label="or continue with" />
<Divider orientation="vertical" />
```

**Stack props:**

| Prop        | Values                                             | Default   |
| ----------- | -------------------------------------------------- | --------- |
| `direction` | `col` `row`                                        | `col`     |
| `gap`       | `0` `1` `2` `3` `4` `6` `8` `10` `12`              | `4`       |
| `align`     | `start` `center` `end` `stretch` `baseline`        | `stretch` |
| `justify`   | `start` `center` `end` `between` `around` `evenly` | `start`   |
| `wrap`      | `boolean`                                          | `false`   |

---

## 🎨 Live Theme Builder

The [live demo](https://yem-ui.vercel.app) includes an interactive **Theme Builder** panel — click the **Customize** button in the bottom-right corner to:

- Pick from preset themes (Ocean, Forest, Rose, Slate, Sharp, Pill, Snappy)
- Adjust primary and accent colors with a color picker
- Tune border radius, glass blur, and animation speed with sliders
- Copy the generated CSS to paste directly into your project

---

## 📝 License

MIT © Yemi Ogundairo
