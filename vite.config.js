import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' giúp web chạy được cả trên Vercel, Netlify lẫn GitHub Pages
export default defineConfig({
  plugins: [vue()],
  base: './',
})
