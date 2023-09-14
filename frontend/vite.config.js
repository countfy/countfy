import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  preview: {
    host: '0.0.0.0',
    port: 8002
  },
  build: {
    outDir: 'build'
  }
})
