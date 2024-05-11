import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
console.log('url:', import.meta.url)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./package', import.meta.url)),
      '@vue-calendar-next': fileURLToPath(new URL('./package', import.meta.url)),
    }
  }
})
