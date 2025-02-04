import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    rollupOptions:{
      input:{
        main: resolve(__dirname, 'client/src/main.jsx'),
        nested: resolve(__dirname, 'client/index.html'),
      }
    }
  }
})
