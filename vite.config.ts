import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: true,      // 👈 needed for Docker (binds to 0.0.0.0)
    port: 80,      // 👈 desired internal port
    strictPort: true // avoids fallback
  }
})
