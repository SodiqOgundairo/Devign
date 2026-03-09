# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
