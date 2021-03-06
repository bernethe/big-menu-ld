import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/big-menu-ld/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  root: './',
  build: {
    outDir: './build'
  }
})
