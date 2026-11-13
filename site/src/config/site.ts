// Satu-satunya tempat untuk mengganti brand, kontak, link, dan harga.
// Semua nilai di bawah adalah PLACEHOLDER — ganti sebelum dipublikasikan.

export const site = {
  brand: 'Langkah Digital',
  tagline: 'Belajar digital marketing, ditemani sampai jalan.',
  description:
    'Program belajar digital marketing untuk pemula: e-course terstruktur, kelas live mingguan, dan grup diskusi harian bersama mentor.',
  url: 'https://contoh-domain.id',
  locale: 'id_ID',
  ogImage: '/og-image.svg',

  // Kontak & tujuan CTA
  whatsapp: '6280000000000', // format internasional tanpa "+"
  whatsappText: 'Halo, saya mau tanya tentang program Langkah Digital.',
  checkoutUrl: '#harga', // ganti dengan URL checkout asli
  email: 'halo@contoh-domain.id',
  instagram: 'https://instagram.com/',

  // Angka sosial — isi dengan data ASLI, jangan dikarang.
  stats: {
    alumni: '1.000+',
    years: '3',
    classesPerMonth: '5',
  },

  pricing: {
    normal: 2_500_000,
    special: 895_000,
    period: 'akses 12 bulan',
    reason: 'Harga batch November — berlaku sampai kuota 100 peserta terpenuhi.',
    guaranteeDays: 7,
  },

  // ID video YouTube untuk preview gratis (ganti dengan video Anda).
  previewVideoId: 'dQw4w9WgXcQ',
} as const;

export const waLink = (text: string = site.whatsappText) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const rupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
