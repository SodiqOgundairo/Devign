# YemsUI

A beautiful React component library with glassmorphism effects, premium animations, and modern design patterns.

## Features

- 🎨 **Glassmorphism Design** - Beautiful frosted glass effects
- ✨ **Premium Animations** - Smooth micro-interactions using Framer Motion
- 🎯 **TypeScript First** - Full type safety
- 🎭 **Radix UI Primitives** - Accessible components
- 🎨 **Tailwind CSS** - Utility-first styling
- 🚀 **Tree-shakeable** - Import only what you need

## Installation

```bash
npm install @sodiqogundairo/yemsui
```

## Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-dom
```

## Usage

```tsx
import { Button, Card, Dialog } from "@sodiqogundairo/yemsui";

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Components

- **Button** - Multiple variants with glassmorphism
- **Card** - Glass card with various styles
- **Dialog/Modal** - Liquid glass modal with animations
- **Input** - Floating label inputs
- **Radio Group** - With explosion animation effect
- **Switch** - Glassmorphism toggle
- **Alert** - 5 variants (default, info, success, warning, error)
- **Accordion** - Collapsible content sections
- **Popover** - Contextual overlays
- **Pagination** - Smart page navigation
- **Breadcrumbs** - Navigation hierarchy
- **Skeleton** - Loading states
- **Empty State** - No data displays
- And many more...

## Styling

This library requires Tailwind CSS. Add the library path to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sodiqogundairo/yemsui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
};
```

## License

MIT © Sodiq Ogundairo
