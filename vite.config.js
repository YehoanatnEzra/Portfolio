import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: base must match the repository name for GitHub Pages deployment
// This makes import.meta.env.BASE_URL = '/Portfolio/' so we can prefix asset paths.
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
  build: { outDir: 'dist' }
});
