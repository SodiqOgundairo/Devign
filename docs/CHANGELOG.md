# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2026-06-15

### Added

- **Combobox**: searchable / type-ahead select with multi-select, async `onSearch`, grouped options, and a custom-trigger escape hatch.
- **DateTimePicker**: combined date and time selection bound to a single `Date`, with date-format and 12/24-hour control.
- **Table sorting**: a `useSortable` hook, `sortable` / `sortDirection` / `onSort` props on `TableHead`, a `sticky` prop on `TableHeader`, and a `containerClassName` on `Table` for height-constrained scroll containers.
- `Card` and `StatCard` gain `radius` and `shadow` props.
- `Dialog` gains a `size` preset (`sm` to `full`) and a `zIndex` override.
- Z-index design tokens (`--z-overlay`, `--z-popover`, `--z-dialog`, `--z-drawer`, `--z-tooltip`); overlay components use them instead of a hardcoded `z-50`.
- Per-component subpath exports (e.g. `import { Button } from "devign/button"`) and `"sideEffects": false` for tree-shaking.
- Compiled stylesheet shipped at `dist/index.css` so the `devign/styles.css` export resolves; new `build:css` step.
- `docs/THEMING.md` documenting the full design-token contract.

### Changed

- Documentation files (`CHANGELOG`, `CONTRIBUTING`, `SECURITY`) moved into `docs/`.

## [3.0.0] - 2026-03-20

### Added

- New components: `Calendar`, `DatePicker`, `TimePicker`, `Drawer`, `Slider`, `Toggle`, `Collapsible`, `ScrollArea`, `AnimatedNumber`, and `Hoverable`.

## [2.3.0] - 2026-03-09

### Added

- **CLI theme generator** — run `npx devign init` to generate a fully commented theme file (`src/devign.css`) with every design token ready to customize
- Auto-generated CSS file output with `--dir` flag for custom output directories
- CSS file auto-generation support

## [2.1.0] - 2026-03-09

### Changed

- **Renamed from yems-ui to devign** — all imports, docs, and tooling updated
- Full backward compatibility: all component names, props, and exports are identical
- Updated all internal path aliases from `@yems-ui/core` to `@devign/core`
- Updated Figma plugin branding to Devign Design System
- Updated demo app references

### Migration

Simply swap your imports from `"yems-ui"` to `"devign"` — no other changes needed.

## [2.0.0]

### Added

- Typography components: `Heading`, `Text`, `Code`, `Lead`, `Blockquote`
- Layout primitives: `Container`, `Stack`, `Grid`, `Divider`
- `Spinner` and `LoadingOverlay` components
- `Kbd` and `Shortcut` components
- `AvatarGroup` component
- `NumberInput` component
- `EmptyState` component
- `StatCard` component
- Figma plugin for importing the design system

## [1.0.0]

### Added

- Initial release of the component library
- 25+ React components with TypeScript support
- Glassmorphism design system with Tailwind CSS v4
- Premium animations using Motion.dev
- Full accessibility support via Radix UI primitives
- Dark/Light mode support with CSS variables
- Brand color system with semantic tokens

### Components Included

- Accordion
- Alert
- Avatar
- Badge
- Breadcrumbs
- Button
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Input & Textarea
- Pagination
- Popover
- Progress
- Radio Group
- Select
- Separator
- Skeleton
- Switch
- Table
- Tabs
- Toast & Toaster
- Tooltip

### Features

- Tree-shakeable imports
- ESM & CommonJS support
- Full TypeScript declarations
- Optimized for bundle size
- Cross-framework compatible (Next.js, Vite, Remix, Astro)
- Mobile-friendly components

---

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes
