import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ingredientUpload } from './vite-plugins/ingredient-upload'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ingredientUpload()],
  // Pin the dev server to a fixed port (5174 is the user's bookmarked origin;
  // strictPort fails loudly instead of silently moving). /api proxies to the
  // json-server REST backend — run it alongside vite with `npm run api`.
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
