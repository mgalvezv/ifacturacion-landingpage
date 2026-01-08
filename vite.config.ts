import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ifacturacion-landingpage/',
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimizaciones de desarrollo
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})