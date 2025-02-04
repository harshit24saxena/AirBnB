import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://airbnb-backend-fwxz.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    allowedHosts: ["https://airbnb-backend-fwxz.onrender.com"]
  }
})
