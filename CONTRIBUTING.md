# Contributing to Devign

## Development Workflow

This project uses a dedicated playground environment for local development to separate the preview process from the library build.

### Prerequisites

- Node.js (v18+)
- npm

### 1. Local Development (Preview)

To start the local development server with hot-reload:

```bash
npm run dev
```

This command starts the **Playground** app (located in `./playground`) which imports the library source files directly from `./src`.

- **URL**: http://localhost:5173 (or similar)
- **Features**: Hot Module Replacement (HMR), Instant feedback, Tailwind CSS v4 support.
- **Note**: This does NOT trigger a library build. It uses the source code directly.

### 2. Building the Library

To build the library for production (dist output):

```bash
npm run build
# OR
npm run build:library
```

This uses `tsup` to bundle the library into `dist/`.

### 3. Testing the Build

To test the built library or the playground build locally:

```bash
npm run preview
```

This builds the playground and serves it, simulating a production environment for the preview app.

## Project Structure

- `src/`: Core library components and styles.
- `playground/`: Vite + React app for testing and previewing components during development.
- `playground/vite.config.ts`: Configured to alias `@yems-ui/core` to `../src`.

## Tailwind CSS Configuration

The project uses Tailwind CSS v4.

- Library styles are defined in `src/styles.css` using `@theme`.
- The playground imports these styles and is configured with `@tailwindcss/vite` plugin.
- Playground CSS (`playground/src/index.css`) uses `@source "../../src"` to ensure Tailwind scans the library files for class usage.

## Verification

To verify that the local environment is set up correctly:

1. Run `npm run dev` -> Check if the playground opens and displays components.
2. Edit a component in `src/components/` -> Check if the playground updates instantly.
3. Run `npm run build` -> Check if `dist/` folder is generated without errors.
