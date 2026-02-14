import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactSwc(), tailwindcss()],
  resolve: {
    alias: {
      // Resolve @yems-ui/core imports to the local src folder.
      // This means the demo always uses the live source — no npm publish needed.
      '@yems-ui/core': path.resolve(__dirname, './src'),
    },
  },
  root: '.',
  server: {
    port: 5175,
  },
  build: {
    // Demo site output — Vercel serves this folder
    outDir: 'dist-demo',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})