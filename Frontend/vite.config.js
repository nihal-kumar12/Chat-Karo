import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: 'https://text-karo-1.onrender.com/10000',
        
        changeOrigin: true,
      },
    },
  },
})
