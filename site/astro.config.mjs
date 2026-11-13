import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Ganti dengan domain produksi Anda (saat ini di-deploy sementara ke GitHub Pages).
export default defineConfig({
  site: 'https://sengkiong.github.io',
  base: '/mahir-digital-clone/',
  integrations: [sitemap()],
  build: {
    // CSS selalu file eksternal → CSP style-src 'self' tanpa 'unsafe-inline'
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    // Script juga tidak di-inline → CSP script-src 'self'
    build: { assetsInlineLimit: 0 },
  },
});
