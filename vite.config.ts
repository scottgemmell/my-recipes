import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ingredientUpload } from './vite-plugins/ingredient-upload'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ingredientUpload()],
  // Pin the dev server to a fixed port. The app persists all data in
  // localStorage, which is keyed by origin (host + port), so a changing port
  // makes saved work "disappear". strictPort fails loudly instead of silently
  // moving to another port.
  server: {
    port: 5174,
    strictPort: true,
  },
})
