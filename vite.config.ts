import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this project repo from /personal_website/.
  // In dev we serve from / so http://localhost:5173 works normally.
  // If you later use a custom domain or rename to <user>.github.io,
  // change this back to "/".
  base: command === "build" ? "/personal_website/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
