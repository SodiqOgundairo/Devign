import { defineConfig } from 'tsup'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// One entry per component file, so consumers can deep-import a single
// component and tree-shake the rest:  import { Button } from 'devign/button'
const componentsDir = 'src/components'
const componentEntries = Object.fromEntries(
  readdirSync(componentsDir)
    .filter((file) => file.endsWith('.tsx'))
    .map((file) => [file.replace(/\.tsx$/, ''), join(componentsDir, file)]),
)

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ...componentEntries,
  },
  format: ['cjs', 'esm'],
  dts: {
    tsconfig: './tsconfig.build.json',
    compilerOptions: {
      skipLibCheck: true,
      strict: false,
    },
  },
  // Shared code (cn, cva, cross-component imports) is extracted into chunks
  // instead of being inlined into every entry.
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
})
