import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactSwc(), tailwindcss()],
  resolve: {
    alias: {
      '@yems-ui/core': path.resolve(__dirname, '../src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    port: 5175,
  },
  build: {
    outDir: 'dist',
  },
})
