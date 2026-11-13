# Langkah Digital: landing page (rebuild)

Landing page statis (Astro 7 + Tailwind CSS 4) yang terinspirasi dari struktur funnel mahirdigital.id. Semua brand, teks, dan angkanya **placeholder**. Audit lengkapnya ada di [`../AUDIT.md`](../AUDIT.md).

## Menjalankan

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # hasil ke dist/
npm run preview   # sajikan dist/
```

## Yang perlu diganti sebelum go-live

| File | Isi |
|---|---|
| `src/config/site.ts` | Nama brand, domain, nomor WhatsApp, URL checkout, harga, garansi, ID video YouTube, angka statistik (**gunakan data asli**) |
| `src/data/content.ts` | Pilar, partner, kurikulum, testimoni (**wajib asli dan berizin**), FAQ, bonus |
| `astro.config.mjs` | `site:` → domain produksi (dipakai untuk canonical & sitemap) |
| `public/robots.txt` | URL sitemap → domain produksi |
| `public/og-image.svg` | Ganti dengan **PNG/JPG 1200×630**, karena Facebook dan WhatsApp tidak menampilkan SVG. Sesuaikan juga `ogImage` di config |
| `src/components/Founder.astro` | Monogram "LD" → foto founder (`astro:assets` `<Image>`) |

## Struktur

```
src/
  config/site.ts        satu sumber untuk brand, kontak, dan harga
  data/content.ts       semua teks section
  layouts/Base.astro    <head>: SEO, Open Graph, JSON-LD (Organization, Course, FAQPage)
  components/           satu komponen per section, berurutan di pages/index.astro
  styles/global.css     design token (@theme) + utility (.btn, .card, .h2, ...)
public/_headers         security header (Cloudflare Pages / Netlify)
```

## Deploy & security

- **Cloudflare Pages / Netlify:** `public/_headers` otomatis dipakai (HSTS, CSP ketat, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy).
- **Hosting lain (nginx/Apache/Vercel):** salin header yang sama ke konfigurasi server. Contoh nginx ada di `AUDIT.md` §4.3.
- CSP memakai `script-src 'self'; style-src 'self'` tanpa `'unsafe-inline'`. Ini bisa karena `astro.config.mjs` mematikan inlining CSS dan JS. Jika nanti menambah Meta Pixel, Google Analytics, atau tool lain, **tambahkan domainnya ke CSP** (mis. `script-src 'self' https://connect.facebook.net`), atau script itu akan diblokir.
- Video YouTube baru dimuat (dari `youtube-nocookie.com`) setelah pengunjung mengklik tombol play.
