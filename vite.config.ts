import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: true,      // 👈 needed for Docker (binds to 0.0.0.0)
    port: 3001,      // 👈 desired internal port (changed Port:80 to 3001)
    strictPort: true // avoids fallback
  }
})
