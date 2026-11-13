# Audit mahirdigital.id: Struktur, Rekomendasi Perbaikan & Security

> Tanggal audit: 13 November 2026
> Metode: **pasif saja**, yaitu membaca HTML, header HTTP, sitemap, dan status endpoint publik. Saya tidak melakukan scan, brute force, atau eksploitasi apa pun.
> Status: situs dipakai **hanya sebagai referensi**. Rebuild di folder `site/` memakai struktur funnel yang sama, tetapi brand, teks, dan gambarnya placeholder atau orisinal.

---

## 1. Ringkasan Eksekutif

mahirdigital.id adalah **landing page penjualan membership edukasi digital marketing**. Model bisnisnya: e-course, ditambah bimbingan rutin (kelas offline, webinar, dan grup WhatsApp). Halamannya panjang dan mengikuti pola funnel klasik, yaitu **masalah → solusi → bukti → harga → keberatan → CTA**.

| Aspek | Nilai | Catatan singkat |
|---|---|---|
| Alur penjualan / funnel | 🟢 Baik | Urutan section persuasif dan value stack jelas |
| Performa | 🔴 Buruk | HTML 279 KB, 140 gambar, lebih dari 20 file JS + jQuery |
| SEO teknis | 🟠 Sedang | Yoast aktif, tetapi `lang="en-US"`, 150+ halaman sampah terindeks, tanpa schema Course/FAQ |
| Aksesibilitas | 🔴 Buruk | 117 dari 140 gambar tanpa alt, hierarki heading kacau, banyak ALL CAPS |
| Kepercayaan / konversi | 🟠 Sedang | Tidak ada FAQ, garansi, atau kebijakan refund; ada halaman `fake-order` |
| **Security** | 🔴 **Kritis** | **Ada injeksi link spam tersembunyi** (indikasi situs disusupi) dan tidak ada security header |

### Stack yang terdeteksi
| Lapisan | Teknologi |
|---|---|
| CMS | WordPress (versi disembunyikan) |
| Tema | LandingPress (`landingpress-wp`) |
| Page builder | Elementor **3.24.5** (rilis 2024, sudah usang) + Elementor Pro |
| Plugin | Yoast SEO, Autoptimize, MyStickyElements, Page Scroll to ID, Scroll Top, WP Security Hardening, Plyr (dari CDN) |
| CDN/WAF | Cloudflare (`cf-cache-status: DYNAMIC`, artinya HTML tidak di-cache di edge) |
| Server cache | FastCGI cache (`x-fastcgi-cache: MISS`) |
| Checkout | `member.mahirdigital.id` (nginx 1.18.0/Ubuntu), `lynk.id`, WhatsApp `wa.me` |

---

## 2. Peta Struktur

### 2.1 Anatomi homepage (urutan funnel)

```
┌─ 1. HERO ─────────────── "Belajar butuh waktu → butuh bimbingan rutin" + CTA
├─ 2. 3 PILAR ──────────── #Ngajarin  #Nemenin  #Nolongin
├─ 3. LOGO KOLABORASI ──── social proof institusi
├─ 4. VALUE UTAMA ──────── problem: belajar sendiri ≠ hasil → solusi: bimbingan rutin
├─ 5. 3 KANAL BIMBINGAN ── offline (bulanan) · webinar (mingguan) · grup WA (harian)
├─ 6. UNTUK SIAPA ──────── Basic (belum punya produk) vs Advance (sudah punya produk)
├─ 7. KURIKULUM ────────── 7 kelas: FB/IG Ads, Marketplace, Dropship, Affiliate, ...
├─ 8. TESTIMONI ────────── cerita alumni (screenshot)
├─ 9. AGITASI + FOUNDER ── "jangan trial & error sendiri" + biaya/pengalaman founder
├─ 10. HARGA ───────────── harga coret Rp2,5 jt → harga khusus Rp895 rb + value stack
├─ 11. VIDEO GRATIS ────── "kalau ragu, jangan join dulu, tonton ini"
├─ 12. 4 BONUS ─────────── komunitas, kurikulum terstruktur, ...
└─ 13. FOOTER + WA STICKY
```

**Yang sudah bagus dan layak ditiru:** urutan persuasinya, *value stacking* (setiap komponen diberi "senilai Rp…"), *risk reversal* lewat video gratis ("jangan join dulu"), serta segmentasi Basic vs Advance.

### 2.2 Sitemap
`/sitemap_index.xml` → `page-sitemap.xml` berisi **150+ halaman**. Kelompoknya:

| Kelompok | Contoh | Masalah |
|---|---|---|
| Landing page iklan | `ads2`, `ads3`, `ads4`, `lp-1`, `lp-md1`, `lp-md2`, `lp-md-tiktok-ads`, `lp-md-tiktok-ads-2`, `lp-md-tiktok-ads-new`, `lp-md-tiktok-ads-new-2` | Puluhan varian hampir identik → konten duplikat, kanibalisasi SEO |
| Webinar | `webinar-lp`, `webinar-md`, `webinar20agustus`, `webinar-20-agustuss`, `short-webinar`, `short-webinar2`, `short-webinar-3` | Event lama masih terindeks, ada typo slug |
| Affiliate | `lp-affiliate`, `lp-aff`, `lp-aff-new`, `lpaff-new-2`, `affiliate-short`, `affiliate-short-2` | Duplikat |
| Area member | `halaman-akses-kelas-*`, `members`, `forums`, `news-feed`, `my-account` | Halaman privat masuk sitemap publik |
| **Sampah / internal** | `test`, `test-2`, `contoh`, `contoh-2`, `footer`, `elementor-2546`, `home-2`, `login-customizer`, `new-web-test-rama`, `json-affiliate-1..5`, `fake-order`, `persipan1` (typo dari `persiapan1`) | **Tidak boleh publik dan tidak boleh terindeks** |
| Produk lain yang tidak relevan | `intermittent-fasting`, `stevia`, `succeng-max`, `kurma-2-0`, `tools-marketing-produk-*` | Mengaburkan topik situs di mata Google |

---

## 3. Rekomendasi Perbaikan (diprioritaskan)

Format: **Masalah → Dampak → Solusi.** Prioritas: P1 = segera, P2 = bulan ini, P3 = nice to have.

### 3.1 Performa
| P | Masalah | Dampak | Solusi |
|---|---|---|---|
| P1 | 140 `<img>` dan banyak screenshot testimoni berukuran besar | LCP lambat di 4G, boros kuota pengunjung | Kompres ke WebP/AVIF, pasang `width`/`height`, lazy-load di bawah fold, gabungkan testimoni ke carousel |
| P1 | Lebih dari 20 file JS dari Autoptimize "single" (tidak digabung) + jQuery + Plyr | Main thread sibuk, INP buruk | Hapus plugin yang tidak perlu (scroll-top, page-scroll-to-id → CSS `scroll-behavior`), muat Plyr hanya saat video diklik |
| P1 | `cf-cache-status: DYNAMIC` (HTML tidak di-cache Cloudflare) | TTFB tergantung server origin | Aktifkan Cloudflare APO atau Cache Rule "Cache Everything" untuk halaman publik (bypass saat ada cookie login) |
| P2 | HTML 279 KB karena markup Elementor yang sangat bersarang | Parse lambat | Gunakan Flexbox Container Elementor (bukan section/column lama), atau rebuild statis seperti di `site/` |
| P2 | Embed YouTube langsung | ±1 MB JS pihak ketiga dimuat saat halaman dibuka | Pakai *facade*: thumbnail dulu, iframe baru dimuat setelah diklik |

### 3.2 SEO
| P | Masalah | Dampak | Solusi |
|---|---|---|---|
| P1 | `<html lang="en-US">` & `og:locale=en_US` padahal konten berbahasa Indonesia | Google/screen reader salah mengenali bahasa | Settings → General → Site Language: **Bahasa Indonesia** |
| P1 | 150+ halaman, termasuk test/duplikat/member, terindeks | Crawl budget terbuang, konten tipis, kanibalisasi | Hapus halaman sampah, `noindex` semua LP iklan & area member, 301 redirect varian lama ke halaman utama |
| P2 | Tidak ada schema `Course`, `FAQPage`, `Organization` (Yoast hanya membuat WebPage) | Kehilangan rich result | Tambahkan JSON-LD (contohnya ada di `site/src/layouts/Base.astro`) |
| P2 | Heading dipakai sebagai dekorasi (`. . . . . . . .`) dan lebih dari 50 heading di satu halaman | Struktur topik tidak jelas | 1×H1, H2 per section, H3 per kartu; dekorasi pakai CSS |
| P3 | Tidak ada blog/konten edukasi | Hampir seluruh trafik bergantung pada iklan | Buat cluster artikel ("cara iklan FB untuk pemula", dll.) yang menautkan ke halaman program |

### 3.3 Aksesibilitas
| P | Masalah | Solusi |
|---|---|---|
| P1 | 117 dari 140 gambar tanpa `alt` | Isi alt yang deskriptif; gambar dekoratif pakai `alt=""` |
| P1 | ALL CAPS di tengah kalimat ("BIMBINGAN RUTIN", "DARI NOL") | Penekanan cukup dengan `<strong>`/warna; screen reader bisa membaca huruf kapital per huruf |
| P2 | Kontras teks di atas gradasi/gambar | Uji dengan Lighthouse, target WCAG AA (4.5:1) |
| P2 | Fokus keyboard pada tombol tidak terlihat | Tambahkan style `:focus-visible` |

### 3.4 UX & Konversi
| P | Masalah | Solusi |
|---|---|---|
| P1 | Tidak ada FAQ (refund? akses berapa lama? jadwal kelas? cocok untuk HP?) | Tambahkan section FAQ sebelum CTA terakhir; isinya diambil dari pertanyaan yang paling sering masuk lewat WA |
| P1 | Tidak ada garansi atau kebijakan refund yang jelas | Tambahkan garansi (mis. 7 hari uang kembali) beserta link syarat dan ketentuannya |
| P1 | Halaman `fake-order` (diduga popup notifikasi pembelian palsu) | **Hentikan.** Social proof palsu merusak kepercayaan dan berisiko melanggar UU Perlindungan Konsumen (UU 8/1999, Pasal 9 tentang informasi yang menyesatkan). Pakai data asli: jumlah alumni dan testimoni terverifikasi |
| P2 | CTA tersebar ke tiga tujuan (member checkout, lynk.id, WA) | Satu CTA utama (checkout), WA sebagai CTA sekunder |
| P2 | Harga "2500000" ditampilkan tanpa format | Format `Rp2.500.000`, harga coret, dan penjelasan "per apa" (seumur hidup/bulanan?) |
| P2 | Tidak ada sticky CTA di mobile | Tambahkan bar CTA di bawah layar mobile setelah hero lewat |
| P3 | Klaim besar ("Budget iklan 4–5 Milyar") tanpa bukti | Tampilkan screenshot Ads Manager atau studi kasus alumni (dengan izin) |

### 3.5 Copywriting
- Typo: "refrensi" → **referensi**, "platofm" → **platform**, "strees" → **stres**, "menaikan" → **menaikkan**, "yg" → **yang**, "ngga" (pilih satu gaya: santai atau formal, lalu konsisten).
- Kalimat terlalu panjang dan berulang ("1 hari, 1 minggu, bahkan 1 bulan" muncul dua kali). Pangkas sekitar 30%.
- Ganti "Harga Khusus" dengan alasan yang jujur (mis. "Harga early-bird batch November").

### 3.6 Kebersihan konten
- Hapus permanen: `test`, `test-2`, `contoh`, `contoh-2`, `footer`, `home-2`, `elementor-2546`, `new-web-test-rama`, `login-customizer`, `json-affiliate-*`, `persipan1`.
- Jadikan template Elementor (bukan halaman) untuk `footer`.
- Pisahkan produk yang tidak berhubungan (`stevia`, `intermittent-fasting`, `kurma-2-0`, dll.) ke subdomain/domain lain agar topik situs fokus.

---

## 4. Security

### 4.1 Tabel temuan

| # | Tingkat | Temuan | Bukti (pasif) | Risiko | Remediasi untuk pemilik |
|---|---|---|---|---|---|
| S1 | 🔴 **Kritis** | **Injeksi link spam tersembunyi** | Di HTML homepage, setelah `</script>`: `<div id="content" style="display: none;">` berisi 6 link ke `movexpk.com`, `coronaupholsterycleaning.net`, `bhishak.net`, `trrhospitals.com`, `covidhtechnologies.com`, `interna.com.br` | Ciri khas **situs yang disusupi** atau **tema/plugin nulled** (bajakan). Google bisa memberi penalti *spammy links*, dan penyerang kemungkinan masih punya akses (backdoor) | Lihat 4.2 (prosedur pembersihan) |
| S2 | 🔴 Tinggi | Script pihak ketiga tanpa pin versi/SRI | `cdn.jsdelivr.net/gh/CDNSFree2/Plyr/plyr.js`: fork GitHub milik akun anonim, tanpa versi dan tanpa `integrity=` | Kalau pemilik repo itu mengubah kodenya, **semua pengunjung langsung menjalankan JS penyerang** (bisa mencuri sesi atau membelokkan link checkout) | Self-host Plyr resmi dari npm `plyr@3.x`, atau pakai `cdn.jsdelivr.net/npm/plyr@3.7.8/...` + atribut `integrity` |
| S3 | 🟠 Sedang | Tidak ada security header | Respons homepage tidak memuat `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Clickjacking, downgrade HTTPS, dan dampak XSS lebih besar | Lihat 4.3 |
| S4 | 🟠 Sedang | Software usang | `meta generator`: Elementor 3.24.5 (2024). `member.mahirdigital.id` mengirim `Server: nginx/1.18.0 (Ubuntu)` (paket Ubuntu 20.04, dukungan standarnya sudah berakhir) | Elementor dan Elementor Pro punya riwayat CVE (XSS, file upload). OS tanpa patch keamanan | Update WordPress, tema, dan semua plugin. Upgrade server ke Ubuntu 24.04 LTS. Tambahkan `server_tokens off;` |
| S5 | 🟡 Rendah | `wp-cron.php` bisa dipanggil publik | `GET /wp-cron.php` → 200 | Bisa dipanggil berulang untuk membebani server | `define('DISABLE_WP_CRON', true);` + cron sistem `*/5 * * * * curl -s https://domain/wp-cron.php?doing_wp_cron`, atau blokir dari luar di Cloudflare WAF |
| S6 | 🟡 Rendah | Halaman internal dan member di sitemap publik | `halaman-akses-kelas-*`, `members`, `my-account`, `json-affiliate-*` di `page-sitemap.xml` | Memudahkan pemetaan oleh penyerang; konten berbayar bisa bocor kalau proteksinya lemah | Keluarkan dari sitemap, `noindex`, dan pastikan proteksi login benar-benar berlaku di server |
| S7 | 🟡 Info | Email di-obfuscate Cloudflare | `/cdn-cgi/.../email-decode.min.js` | Aman. Ini fitur Cloudflare | — |

**Yang sudah baik ✅:** `xmlrpc.php` 404, `/wp-json/` dan `/wp-json/wp/v2/users` 401 (enumerasi user diblokir), `wp-login.php` 403 (kemungkinan login dipindah atau dibatasi IP), `readme.html`/`license.txt` 404, `debug.log` 403, query `?ver=` dihapus, dan Cloudflare aktif.

### 4.2 Prosedur pembersihan (untuk S1)
1. **Backup penuh** (file + database) sebelum menyentuh apa pun, lalu simpan offline sebagai barang bukti.
2. **Cari sumber injeksi:**
   - `grep -rn "display: none" wp-content/themes/ wp-content/plugins/ --include=*.php | grep -i "<a href"`
   - `grep -rnE "base64_decode|eval\(|gzinflate|str_rot13|assert\(" wp-content/ wp-includes/ --include=*.php`
   - Database: `SELECT option_name FROM wp_options WHERE option_value LIKE '%movexpk%' OR option_value LIKE '%display: none%';`, serta cek tabel `wp_posts` dan `wp_postmeta` (data Elementor tersimpan di `_elementor_data`)
   - Cek file `functions.php` tema dan folder `wp-content/mu-plugins/` (lokasi favorit untuk backdoor)
3. **Scan** dengan Wordfence (gratis) atau Sucuri SiteCheck, dan cocokkan checksum core: `wp core verify-checksums` serta `wp plugin verify-checksums --all`.
4. **Ganti tema dan plugin dengan salinan resmi.** LandingPress dan Elementor Pro adalah produk berbayar. Kalau lisensinya tidak asli (nulled), itu kemungkinan besar sumber masalahnya.
5. **Rotasi semua kredensial:** password admin, database, FTP/SSH, hosting; perbarui *salts* di `wp-config.php` (generator: `https://api.wordpress.org/secret-key/1.1/salt/`); hapus user admin yang tidak dikenal.
6. **Hardening:** 2FA untuk admin, `define('DISALLOW_FILE_EDIT', true);`, permission file 644 dan folder 755, `wp-config.php` 600.
7. Setelah bersih, ajukan **Request Review** di Google Search Console → Security Issues (kalau ada peringatan di sana).

### 4.3 Contoh konfigurasi security header

**Nginx (origin):**
```nginx
server_tokens off;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
# Mulai dengan Report-Only, karena Elementor memakai banyak inline script/style
add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.youtube.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-src https://www.youtube-nocookie.com https://www.youtube.com; frame-ancestors 'self'" always;
```

**Cloudflare tanpa akses server:** Rules → Transform Rules → *Modify Response Header* → tambahkan header yang sama. HSTS juga bisa diaktifkan di SSL/TLS → Edge Certificates.

### 4.4 Catatan etis
Situs ini **bukan milik kita**. Temuan S1 dan S2 berdampak pada pengunjung dan pembeli mereka, jadi sebaiknya **dilaporkan secara privat ke pemilik** (lewat kontak WA/email yang ada di situs). Cukup sebutkan bukti pasif di atas, tanpa menguji lebih jauh dan tanpa mempublikasikannya sebelum diperbaiki.

---

## 5. Rebuild: apa yang diperbaiki di `site/`

| Area | Asli | Rebuild (`site/`) |
|---|---|---|
| Stack | WordPress + Elementor + 10+ plugin | Astro (HTML statis) + Tailwind CSS |
| JavaScript | 20+ file + jQuery | Script inline kecil (menu, sticky CTA, video facade) |
| Bahasa | `en-US` | `lang="id"`, `og:locale=id_ID` |
| Heading | 50+ heading, dekoratif | 1×H1, H2 per section, H3 per kartu |
| Alt gambar | 117 dari 140 kosong | Ilustrasi SVG inline, ikon dekoratif ditandai `aria-hidden` |
| Schema | WebPage saja | Organization + Course + FAQPage (JSON-LD) |
| Video | YouTube iframe langsung + Plyr dari CDN GitHub | Facade: thumbnail dulu, iframe `youtube-nocookie` setelah diklik |
| Security header | Tidak ada | `public/_headers`: HSTS, CSP ketat, XFO DENY, nosniff, Referrer-Policy, Permissions-Policy |
| Pihak ketiga | Google Fonts, jsDelivr, FB, YouTube | Nol request pihak ketiga saat halaman pertama dimuat (font di-self-host via system stack) |
| Kepercayaan | Tanpa FAQ dan garansi, ada `fake-order` | FAQ, garansi 7 hari, social proof tanpa notifikasi palsu |
| Konfigurasi | Tersebar di Elementor | Satu file `src/config/site.ts` (brand, harga, WA, link checkout) |

---

## 6. Sebelum vs Sesudah (Lighthouse 12, 13 Nov 2026)

Diukur dengan `npx lighthouse@12 <url> --form-factor=mobile` (emulasi HP + throttling 4G/CPU 4×). Rebuild diukur dari `astro preview` lokal, jadi TTFB-nya lebih rendah daripada di hosting nyata. Angka ukuran halaman dan jumlah request tidak terpengaruh oleh hal itu.

| Metrik (mobile) | mahirdigital.id | Rebuild `site/` |
|---|---|---|
| **Performance** | 46 | **100** |
| **Accessibility** | 94 | **100** |
| **Best Practices** | 57 | **100** |
| **SEO** | 85 | **100** |
| First Contentful Paint | 3,0 s | 1,0 s |
| Largest Contentful Paint | **28,0 s** | 1,0 s |
| Cumulative Layout Shift | 0,142 | 0 |
| Total Blocking Time | 470 ms | 0–50 ms |
| Total ukuran transfer | **9.172 KiB** | 16 KiB |
| Jumlah request | 151 | 6 |
| Request ke pihak ketiga saat load | banyak (Google Fonts, jsDelivr, YouTube, FB) | 0 |

Desktop rebuild: 100 / 100 / 100 / 100 (LCP 0,2 s).

**Pelajaran utama:** LCP 28 detik pada situs asli hampir seluruhnya berasal dari gambar besar yang belum dioptimasi dan JS yang memblokir render. Rekomendasi P1 di bagian 3.1 saja (kompres gambar + facade video + kurangi plugin) diperkirakan sudah menaikkan skor Performance secara signifikan, bahkan tanpa rebuild.
