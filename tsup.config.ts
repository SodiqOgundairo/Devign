import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Do NOT include demo/ — tsup only builds the publishable library
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
  // CSS is NOT imported inside index.ts anymore.
  // Library consumers must import 'yems-ui/styles.css' separately in their app.
  // This avoids side-effect import issues during Vite dev/build.
})