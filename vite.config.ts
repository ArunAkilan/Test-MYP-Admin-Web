import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/admin/',
  plugins: [react()],
   server: {
    host: true,      // needed for Docker (binds to 0.0.0.0)
     port: 80,         // desired internal port (changed Port:80 to 3001)
     allowedHosts: ['dev.myperambalurproperty.com'],
     hmr: {
        host: 'dev.myperambalurproperty.com', // The domain clients use to access the app
        protocol: 'wss', // Use 'wss' if using HTTPS
        port: 80 // Optional, default is server port
     }
  
  }
  
  
})