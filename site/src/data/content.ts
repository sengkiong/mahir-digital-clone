// Konten placeholder orisinal. Ganti sesuai program Anda.

export const pillars = [
  { tag: '#Mengajar', title: 'Materi runtut dari nol', body: 'Video pendek per topik, dari membuat akun iklan sampai membaca data kampanye.' },
  { tag: '#Menemani', title: 'Ada yang menjawab', body: 'Pertanyaan dibahas di grup harian dan sesi live setiap minggu, bukan dibiarkan menggantung.' },
  { tag: '#Membantu', title: 'Dibantu sampai praktik', body: 'Kampanye Anda direview mentor supaya budget iklan tidak habis untuk coba-coba.' },
];

export const partners = ['Komunitas UMKM', 'Inkubator Bisnis', 'Kampus Mitra', 'Asosiasi Pelaku Usaha', 'Media Partner'];

export const channels = [
  { freq: 'Setiap hari', title: 'Grup diskusi', body: 'Tanya kapan saja. Mentor dan sesama peserta membalas di hari yang sama.', icon: 'chat' },
  { freq: 'Setiap minggu', title: 'Kelas live online', body: 'Satu topik per sesi, bedah kasus peserta, rekamannya bisa ditonton ulang.', icon: 'video' },
  { freq: 'Setiap bulan', title: 'Kelas tatap muka', body: 'Workshop praktik langsung di kota pilihan, sekaligus berjejaring.', icon: 'users' },
] as const;

export const audiences = [
  {
    level: 'Pemula',
    title: 'Belum punya produk, belum pernah beriklan',
    points: ['Mulai dari dasar: akun bisnis, pixel, dan struktur kampanye', 'Rekomendasi produk untuk latihan (affiliate & dropship)', 'Target realistis: kampanye pertama berjalan dalam 30 hari'],
  },
  {
    level: 'Lanjutan',
    title: 'Sudah punya produk, ingin omzet naik',
    points: ['Audit kampanye dan funnel yang sudah berjalan', 'Strategi scale-up dan pengujian materi iklan', 'Pengalaman mentor di properti, travel, fashion, kuliner, dan skincare'],
  },
];

export const courses = [
  { title: 'Iklan Facebook & Instagram', chapters: 14, videos: 70, featured: true },
  { title: 'Jualan di Marketplace', chapters: 4, videos: 12 },
  { title: 'Dropship dari Nol', chapters: 9, videos: 24 },
  { title: 'Affiliate Marketing', chapters: 2, videos: 14 },
  { title: 'Iklan untuk Jasa & Travel', chapters: 6, videos: 15 },
  { title: 'Iklan untuk Properti', chapters: 5, videos: 29 },
  { title: 'Arsip Rekaman Kelas Live', chapters: 1, videos: 17 },
];

// Testimoni placeholder — WAJIB diganti dengan testimoni asli yang sudah mendapat izin.
export const testimonials = [
  { name: 'Nama Peserta', role: 'Penjual skincare, Bandung', quote: 'Contoh testimoni: sebelumnya saya boros di iklan karena asal pasang. Setelah dibimbing, saya tahu angka mana yang harus dilihat dulu.' },
  { name: 'Nama Peserta', role: 'Karyawan, mulai affiliate', quote: 'Contoh testimoni: yang paling membantu justru grupnya. Pertanyaan kecil yang bikin buntu cepat terjawab.' },
  { name: 'Nama Peserta', role: 'Pemilik agen travel', quote: 'Contoh testimoni: sesi bedah kasus mingguan membuat saya berani menaikkan budget dengan data, bukan feeling.' },
];

export const founderPoints = [
  'Bertahun-tahun mengelola iklan untuk berbagai industri',
  'Sudah melewati fase boncos, salah target, dan akun terblokir',
  'Semua pelajaran itu disusun ulang menjadi kurikulum yang bisa langsung dipraktikkan',
];

export const valueStack = [
  { item: 'Modul lengkap (7 kelas, 180+ video)', worth: 'Rp20 jt' },
  { item: 'Review kampanye oleh mentor', worth: 'Rp10 jt' },
  { item: 'Kelas live mingguan', worth: 'Rp1 jt/bln' },
  { item: 'Kelas tatap muka bulanan', worth: 'Rp5 jt/event' },
  { item: 'Grup diskusi harian', worth: 'Rp7,5 jt' },
  { item: 'Template materi iklan siap pakai', worth: 'Rp5 jt' },
];

export const benefits = [
  { title: 'Komunitas aktif', body: 'Belajar bersama peserta lain yang sedang berada di tahap yang sama.' },
  { title: 'Kurikulum terstruktur', body: 'Urutan materi jelas, jadi Anda tahu apa yang harus dipelajari berikutnya.' },
  { title: 'Materi diperbarui', body: 'Platform iklan sering berubah, dan modul ikut diperbarui tanpa biaya tambahan.' },
  { title: 'Belajar dari HP', body: 'Semua video bisa ditonton dari ponsel, kapan pun Anda sempat.' },
];

export const faqs = [
  { q: 'Saya benar-benar pemula. Apakah bisa mengikuti?', a: 'Bisa. Kelas pertama dimulai dari membuat akun dan memahami istilah dasar. Tidak perlu pengalaman sebelumnya.' },
  { q: 'Berapa lama akses programnya?', a: 'Akses materi dan grup berlaku 12 bulan sejak pembayaran. Rekaman kelas live tersimpan di arsip selama masa akses.' },
  { q: 'Berapa modal iklan yang dibutuhkan untuk praktik?', a: 'Untuk latihan, Rp30–50 ribu per hari sudah cukup. Mentor akan membantu menentukan budget sesuai produk Anda.' },
  { q: 'Bagaimana jika saya merasa tidak cocok?', a: 'Ada garansi 7 hari. Jika materi tidak sesuai harapan, ajukan pengembalian dana lewat WhatsApp tanpa pertanyaan berbelit.' },
  { q: 'Apakah ada jaminan pasti menghasilkan?', a: 'Tidak ada yang bisa menjamin hasil. Yang kami jamin adalah materi yang runtut dan pendampingan rutin. Hasil tetap bergantung pada praktik Anda.' },
  { q: 'Pembayarannya bisa lewat apa?', a: 'Transfer bank, e-wallet, dan QRIS. Detailnya muncul di halaman checkout.' },
];
