import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Ganti dengan domain produksi Anda.
export default defineConfig({
  site: 'https://contoh-domain.id',
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
