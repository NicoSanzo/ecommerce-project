import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/ECOMMERCE/Backend', // Cambia esto a la URL de tu servidor PHP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: reescribe la ruta
      },
    },
  },
});
