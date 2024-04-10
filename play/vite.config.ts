import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@vue-calendar-next': fileURLToPath(new URL('../packages', import.meta.url)),
      '@vue-calendar-next/utils': fileURLToPath(new URL('../packages/utils', import.meta.url)),
      '@vue-calendar-next/hooks': fileURLToPath(new URL('../packages/hooks', import.meta.url)),
      '@vue-calendar-next/locale': fileURLToPath(new URL('../packages/locale', import.meta.url)),
      '@vue-calendar-next/components': fileURLToPath(new URL('../packages/components', import.meta.url)),
    }
  }
})
