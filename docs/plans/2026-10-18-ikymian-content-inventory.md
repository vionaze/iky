# Ikymian Studios — Phase 1: Inventaris Konten & Peta Field CMS

**Status:** berjalan. Struktur, arah visual, dan peta field sudah terkunci; identitas,
karya, dan statistik masih menunggu data dari pengguna.

**Prinsip:** tidak ada fakta tebakan. Nilai yang belum diketahui ditulis **belum
tersedia**, bukan diisi contoh. Angka tidak tersedia bukan nol. Aset fiktif tidak
dibuat untuk memenuhi kuota.

**Sumber keputusan:** [`2026-10-18-ikymian-portfolio.md`](2026-10-18-ikymian-portfolio.md).
Dokumen ini adalah lampiran kerja Phase 1, bukan pengganti rencana.

**Batas:** belum ada kode, scaffold, dependencies, atau perubahan server. Sesuai
instruksi, implementasi menunggu permintaan pengguna.

## Legenda status

| Simbol | Arti |
| --- | --- |
| ✅ | Terkunci — sudah diputuskan, siap dipakai implementasi |
| 🟡 | Draft — ada usulan, menunggu persetujuan pengguna |
| ❌ | Belum tersedia — hanya pengguna yang dapat mengisi |

---

## 1. Ringkasan status Phase 1

| # | Item Phase 1 | Status | Catatan |
| --- | --- | --- | --- |
| 1 | Identitas: ejaan brand, titel, bio, email | 🟡 | Ejaan brand + kanal sosial ✅; titel/bio draft; email, bahasa, nama kreator belum |
| 2 | Struktur section | ✅ | Hero → Selected Works → Impact → About & Process → Contact |
| 3 | Arah visual: palet, tipografi, jarak | ✅ | Token di bagian 5; tekstur cair masih perlu ditinjau di browser |
| 4 | Inventaris karya & media | 🟡 | 8 karya: 5 series lengkap dengan poster; 3 reel butuh judul + poster |
| 5 | Inventaris statistik & akses API | ❌ | Metrik terkunci; akun/platform dan akses belum |
| 6 | Peta field CMS header–body–footer | ✅ | Bagian 9 |

Phase 1 dinyatakan selesai ketika item 1 dan 4 punya isi nyata. Item 5 boleh
menunggu (kelayakan API dibuktikan di Phase 4).

---

## 2. Identitas

| Field | Nilai | Status | Sumber |
| --- | --- | --- | --- |
| Nama domain | `ikymianstudios.si` | ✅ | Bootstrap yang sudah live |
| Ejaan brand | **Ikymian Studios** | ✅ | Dikonfirmasi pengguna; dipakai di semua copy dan metadata |
| Nama kreator | Caisart Felix — ditampilkan bersama brand | ✅ | Dikonfirmasi pengguna; format "Ikymian Studios — Caisart Felix" |
| Titel kreator | AI Filmmaker & Content Creator | 🟡 | Draft dari referensi |
| Bio singkat | Lihat bagian 4 | 🟡 | Draft |
| Email bisnis | `ariesiky8@gmail.com` | ✅ | Dikonfirmasi pengguna sebagai kontak resmi |
| Logo | — | ❌ | Opsional; tanpa logo, nama studio dipakai sebagai wordmark |
| Empat kategori karya | Series, Music Video, Short Film, Tutorial | ✅ | Berasal dari dokumen awal; jangan diubah jadi empat layanan berbayar |
| Bahasa landing | Bilingual **Indonesia + Inggris** dengan toggle | 🟡 | Dikonfirmasi pengguna; strategi routing dibahas di bagian 9.9 |

### 2.1 Kanal resmi

Sumber: [Linktree ikymianvt](https://linktr.ee/ikymianvt), dipotong ulang dari
[tr.ee/CdFn8v9-L6](https://tr.ee/CdFn8v9-L6), dibaca 18 Oktober 2026.

| Platform | URL | Status |
| --- | --- | --- |
| Instagram | [instagram.com/ikymianvt](https://instagram.com/ikymianvt) | ✅ dipakai |
| TikTok | [tiktok.com/@caisarttfelix](https://www.tiktok.com/@caisarttfelix) | ✅ dipakai — `@damiann101` (pemilik playlist series) dikonfirmasi akun pengguna juga |
| YouTube | [youtube.com/@ikymian_dramas](https://www.youtube.com/@ikymian_dramas) | ✅ dipakai |
| X | [x.com/ikymianstudios](https://x.com/ikymianstudios) | ✅ dipakai |
| Threads | [threads.com/@ikymian_series](https://www.threads.com/@ikymian_series) | ✅ dipakai |
| Facebook | [facebook.com/share/1am5DXMdbs](https://www.facebook.com/share/1am5DXMdbs/) | 🟡 tautan share, bukan URL profil bersih |
| Email | `ariesiky8@gmail.com` | ✅ kontak resmi |
| WhatsApp | `+62 856-1003-780` dan `+62 831-4171-9713` | 🟡 dua nomor berbeda; perlu dipilih satu |
| Discord | [discord.gg/a5gwKtYg](https://discord.gg/a5gwKtYg) | 🟡 belum jelas perlu tampil di landing |

Catatan:

- Semua URL merespons HTTP 200, tetapi itu hanya berarti halamannya hidup — isi akun
  belum diperiksa dan tidak diverifikasi oleh pemeriksaan ini.
- **Tidak dimasukkan ke landing:** link referral/afiliasi pada Linktree (CapCut,
  AKOOL, OiiOii, WhatsApp group, dan sejenisnya). Itu materi program kreator,
  sedangkan section prestasi/program kreator sudah dikeluarkan dari scope.

---

## 3. Struktur halaman (terkunci)

| Urutan | Section | Anchor | Wajib | Perilaku |
| --- | --- | --- | --- | --- |
| 1 | Navigation | — | ✅ | Identitas, Work, About, Contact, serta toggle bahasa; satu baris, tinggi ≤ 80 px di desktop |
| 2 | Hero | `#top` | ✅ | Judul ≤ 2 baris, subteks ≤ 20 kata, dua CTA |
| 3 | Showreel | `#showreel` | 🟡 opsional | Tampil hanya jika ada aset; tanpa pemutar kosong |
| 4 | Selected Works | `#work` | ✅ | 6–8 karya terkurasi lintas empat kategori; tanpa filter dulu |
| 5 | Impact | `#impact` | ✅ | Enam kelompok metrik + waktu pembaruan |
| 6 | About & Process | `#about` | ✅ | Bio, kemampuan, **Creative Partner** dengan baris logo, satu contoh proses |
| 7 | Contact | `#contact` | ✅ | Email + link sosial; tanpa form backend |

Section prestasi/program kreator **tidak dibuat**; nominasi masuk ke Impact.
Tidak ada halaman publik tambahan, blog, atau page builder.

---

## 4. Copy (draft)

| Elemen | Draft | Status |
| --- | --- | --- |
| Identity | Ikymian Studios — Caisart Felix · AI Filmmaker & Content Creator | 🟡 titel masih draft |
| Hero | Cerita, musik, dan ide yang menjadi visual. | 🟡 |
| Supporting line | Series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI. | 🟡 |
| CTA utama | Lihat Karya | 🟡 |
| CTA sekunder | Diskusi Kolaborasi | 🟡 |
| About | Saya membuat series, music video, short film, dan tutorial, mengeksplorasi cara ide berkembang menjadi cerita dan visual melalui AI. | 🟡 sesuaikan dengan proses dan peran yang benar |
| Bio alternatif (EN) | AI Filmmaker & Visual Storyteller. I create cinematic worlds, characters, and stories with AI. Making the impossible feel real. | 🟡 dari Linktree; perlu dipilih bahasanya |
| Label kategori | Series · Music Video · Short Film · Tutorial | ✅ |
| Label partner | ID: **Mitra Kreatif** · EN: **Creative Partner** | 🟡 bisa disamakan bila diinginkan |
| CTA kartu series | Tonton series | ✅ |

Aturan: jangan menulis klaim performa, nama klien, kutipan testimoni, atau
pengalaman yang belum punya bukti. Setiap baris copy di atas harus ada versi **ID dan
EN**; `fallback` ke ID dipakai selama terjemahan EN belum tersedia.

---

## 5. Arah visual (token)

```css
:root {
  --cream: #faf7f2;
  --milk-blue: #b8d4f2;
  --pale-pink: #f0cbdc;
  --indigo: #51439a;
  --ink: #252541;
  --muted: #606074;
  --page-width: 1160px;
}
```

| Aturan | Nilai |
| --- | --- |
| Latar | Krim `#faf7f2`; warna cair hanya pada hero dan aksen kontak |
| Teks | Indigo gelap `#252541`; teks sekunder `#606074` |
| Tipografi | Sistem sans; heading besar, `letter-spacing` negatif, jarak lapang |
| Grid karya | 2 kolom ≥ 640 px, 1 kolom di bawahnya |
| Gerak | Maksimal satu pola hover sederhana; hormati `prefers-reduced-motion` |
| Dilarang | Marquee, scroll hijacking, cursor khusus, animasi terus-menerus, generator gambar/canvas |
| Kontras | Teks normal ≥ 4.5:1 — diperiksa saat implementasi |

Target hero: judul maksimal dua baris, subteks maksimal 20 kata.
Referensi visual: Aura (pilih 3–5 contoh saat Phase 3). Panduan FE: Taste Skill v2.

Komposisi hero memakai potret cutout transparan di sisi kanan dan teks di kiri —
lihat bagian 6.1.

### Baris Creative Partner

- Label kecil di atas logo: EN **Creative Partner**, ID **Mitra Kreatif**.
- Logo disusun satu baris dengan tinggi optis sama (20–24 px), gap 32–40 px,
  dan wrap rapi di mobile.
- Gunakan berkas resmi; jangan mengubah warna bila brand guideline melarang.
- Tanpa marquee. Hover maksimal satu pola sederhana (mis. opacity 0.6 → 1).
- Setiap logo punya `alt` = nama partner dan opsional tautan ke situs partner.

---

## 6. Inventaris karya

Skema kolom. Setiap karya harus lengkap sesuai kolom sebelum dipublikasikan.
Judul dan konteks karya wajib tersedia dalam **ID dan EN** (bagian 9.9); nama series
seperti "Berondong Sebelah Rumah" tetap memakai judul aslinya bila tidak ada padanan.

| # | Judul | Kategori | Peran | Tools | Link | Poster | Durasi | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Berondong Sebelah Rumah — EP 01 | Series | Elian (Caisart Felix); Aurelia (Aluna) | CapCut + Seedance 2.5 | [video](https://www.tiktok.com/@damiann101/video/7692173774682131733) | `ep01.jpg` | 1:59 | ✅ |
| 2 | Berondong Sebelah Rumah — EP 02 "Terlalu Dekat" | Series | sama | sama | [video](https://www.tiktok.com/@damiann101/video/7692619848244890900) | `ep02.jpg` | 2:01 | ✅ |
| 3 | Berondong Sebelah Rumah — EP 03 "Mantan Suami" | Series | sama | sama | [video](https://www.tiktok.com/@damiann101/video/7692863785836678421) | `ep03.jpg` | 2:03 | ✅ |
| 4 | Berondong Sebelah Rumah — EP 04 "Jangan Bikin Gue Nyaman" | Series | sama | sama | [video](https://www.tiktok.com/@damiann101/video/7693810204948974869) | `ep04.jpg` | 2:03 | ✅ |
| 5 | Berondong Sebelah Rumah — EP 05 "Bukan Tempat Gue" | Series | sama | sama | [video](https://www.tiktok.com/@damiann101/video/7695612157299379476) | `ep05.jpg` | 1:56 | ✅ |
| 6 | Belum tersedia | Tutorial | ❌ | ❌ | [Instagram](https://www.instagram.com/reel/Dd89pg1SnHS/) | ❌ | ❌ | 🟡 link saja |
| 7 | Belum tersedia | Short Film | ❌ | ❌ | [Instagram](https://www.instagram.com/reel/DcfJ7wEyVAA/) | ❌ | ❌ | 🟡 link saja |
| 8 | Belum tersedia | Music Video | ❌ | ❌ | [Instagram](https://www.instagram.com/reel/DejefTNSRs7/) | ❌ | ❌ | 🟡 link saja |

Total **8 karya**, memenuhi target kurasi 6–8 dan mencakup keempat kategori.

Catatan:

- Playlist series terverifikasi berisi **5 video**. Judul, nomor episode, dan durasi
  diambil dari metadata TikTok pada 18 Oktober 2026; durasi dalam menit:detik.
- Poster episode disimpan di `images/works/berondong/ep01.jpg`–`ep05.jpg`, ukuran
  540 × 960 (9:16). Semua memakai key art series yang sama; EP 02 semula berupa still
  pintu dari TikTok lalu diseragamkan. Still berbeda per episode perlu disediakan
  sebelum publish agar kartu tidak tampak berulang.
- Tiga reel Instagram baru berupa **link**. Judul, durasi, dan poster belum terbaca
  karena Instagram tidak membuka metadata untuk pembaca non-login. Jangan menebak
  judulnya; minta judul dari pengguna.
- Semua series adalah AI Micro-Drama oleh Ikymian Studios. Peran "Elian" dipegang
  Caisart Felix; "Aurelia" diperankan Aluna. Jangan menambah peran lain yang belum
  disebut.
- Tautan memakai URL kanonik; parameter pelacakan (`?dlrf=`, `?rpxt=`, `?psln=`) dibuang.
- Terjemahan EN judul episode belum ada. Ajukan terjemahan untuk disetujui; jangan
  mengarang judul resmi berbahasa Inggris.
- Karya yang hanya punya link tanpa video yang dapat diputar ditampilkan sebagai
  kartu tautan dengan poster — tanpa mengklaim ada player.

### 6.1 Aset hero (diterima)

Tiga kandidat potret cutout, semua berlatar transparan sehingga dapat menyatu dengan
latar krim tanpa kotak putih.

| File | Ukuran | Transparansi | Komposisi | Status |
| --- | --- | --- | --- | --- |
| `images/hero-1.png` | 1200 × 896 | 78% | Setengah badan, blazer hitam, ruang kosong di kiri | ✅ **dipilih sebagai hero utama** |
| `images/hero-2.png` | 1152 × 928 | 78% | Setengah badan, jaket hitam, ruang kosong di kiri | Alternatif |
| `images/hero-3.webp` | 3504 × 2336 | 56% | Potret dada, ruang kosong di kiri | Alternatif; resolusi tertinggi |

Pilihan utama: **`hero-1.png`** — komposisinya paling seimbang dan menyisakan ruang
teks paling lega di kiri. Dua berkas lain disimpan sebagai cadangan, bukan dihapus.

Implikasi layout: subjek berada di kanan, teks hero di kiri. Ini menguntungkan karena
judul dan CTA bisa memakai ruang kosong tanpa menutupi subjek.

Catatan implementasi:

- Nama file akan diganti mengikuti slug aset saat masuk CMS, bukan `hero-1`.
- Ukuran dioptimalkan (WebP/AVIF + varian responsif) saat Phase 3, bukan sekarang.
- Teks alternatif wajib diisi di CMS; subjek adalah karakter visual, bukan klaim
  identitas seseorang.
- Ketiga berkas sudah masuk repo pada `images/` sebagai aset sumber. Saat aplikasi
  dibuat, aset ini akan disalin ke lokasi upload persisten atau `public/`.

### 6.2 Creative partner

Enam mitra yang dikonfirmasi pengguna. Logo disimpan lokal di `images/partners/`,
bukan di-hotlink.

| Partner | Berkas | Kualitas | Status |
| --- | --- | --- | --- |
| CapCut | `capcut.svg` | SVG dari situs resmi, memakai `currentColor` sehingga bisa monokrom | ✅ siap |
| OiiOii | `oiioii.png` | PNG 196 × 66, warna pink | 🟡 resolusi rendah, minta versi SVG |
| Pixmax | `pixmax.svg` | SVG 555 × 120, **isi putih** — tidak terlihat di latar krim | 🟡 butuh varian gelap |
| TopMediai | `topmediai.png` | PNG 512 × 512, ungu, berbentuk ikon | 🟡 ikon, bukan wordmark |
| OpenArt | `openart.png` | PNG 415 × 415, hitam, berbentuk ikon | 🟡 ikon, bukan wordmark |
| AKOOL | — | Logo di situs resmi mengembalikan 404 | ❌ butuh berkas resmi |

Catatan:

- Campuran wordmark dan ikon membuat baris terlihat tidak rata; idealnya semua
  memakai wordmark dengan tinggi optis sama.
- Minta **brand kit resmi** (SVG, versi terang dan gelap) dari masing-masing program
  mitra. Berkas saat ini dipakai sebagai placeholder, bukan final.
- Jangan mengubah warna logo jika brand guideline melarang; gunakan varian resmi.
- Hanya tampilkan mitra yang benar-benar bekerja sama. Jangan menambah logo pihak
  lain untuk memenuhi baris.

---

## 7. Media & aturan tayang

Berlaku untuk semua video: upload, URL file langsung, embed provider, preview karya,
dan showreel.

| # | Aturan | Gagal publish jika dilanggar |
| --- | --- | --- |
| 1 | Admin dapat mengunggah file atau memasukkan URL | — |
| 2 | URL file langsung → native player; URL halaman platform → embed resmi | — |
| 3 | Setiap video wajib punya thumbnail/poster | ✅ ya |
| 4 | Sebelum Play hanya thumbnail + tombol Play yang jelas | — (perilaku FE) |
| 5 | Tidak ada autoplay saat load, scroll, atau hover — termasuk muted | — (perilaku FE) |
| 6 | Sumber rusak/privat → pesan singkat + tautan karya; tidak pura-pura berhasil | — |
| 7 | Rasio portrait/landscape mengikuti sumber, tidak diregangkan/dipotong | — |
| 8 | Kontrol: play/pause, seek, volume, fullscreen sesuai dukungan sumber | — |
| 9 | Tombol Play dapat diakses keyboard dan punya label | — (perilaku FE) |

Field minimum per item media: jenis sumber (upload/URL), jenis media (gambar/video),
file atau URL, judul, teks alternatif untuk gambar, thumbnail wajib untuk video.

Daftar provider, format file, dan batas ukuran ditetapkan saat implementasi
berdasarkan sumber nyata yang diberikan — bukan sekarang.

---

## 8. Inventaris statistik

| Metrik | Definisi | Sumber data | Status |
| --- | --- | --- | --- |
| Total views | Akumulasi views konten pada akun/platform yang disebut; bukan page views | API resmi, otomatis | 🟡 platform diketahui; cakupan & akses ❌ |
| Followers/subscribers | Per platform + total akun terverifikasi; bukan unique audience | API resmi | ❌ |
| Engagement | Engagement rate per platform, periode 30 hari, rumus disebut | API resmi | ❌ |
| Videos created | Jumlah karya video unik yang dibuat | Editorial (admin) | ❌ angka belum ada |
| Completed campaigns | Jumlah campaign selesai, bukan jumlah konten | Editorial (admin) | ❌ |
| Nominations | Jumlah nominasi terverifikasi + acara/tahun/kategori/bukti | Editorial (admin) | ❌ |

Kanal yang sudah diketahui: Instagram `@ikymianvt`, TikTok `@caisarttfelix`,
YouTube `@ikymian_dramas`, X `@ikymianstudios`, Threads `@ikymian_series`.
Akun mana yang masuk cakupan total views belum diputuskan, dan akses API belum ada.

Kelayakan API yang sudah diperiksa (dari rencana):

- **YouTube** — Channels API menyediakan view count channel, subscriber count, dan
  public video count. Subscriber dibulatkan; public video count ≠ total karya.
- **TikTok** — Get User Info menyediakan follower count, likes count, public video
  count (scope `user.info.stats`, otorisasi pengguna). **Tidak** menyediakan total
  views akun; penjumlahan views video butuh verifikasi endpoint terpisah.
- **Instagram** — dokumentasi Insights belum terbaca; **belum terverifikasi**.
  Jangan menjanjikan sinkronisasi Instagram sebelum diperiksa.

Bentuk data publik (konsep, bukan berkas yang dibuat sekarang):

```json
{
  "updatedAt": null,
  "totalViews": null,
  "platforms": [],
  "engagement": [],
  "videosCreated": null,
  "completedCampaigns": null,
  "nominations": null
}
```

`null` = belum tersedia. Nilai views otomatis tidak boleh ditimpa editor manual.
Tampilkan tanggal pembaruan sebenarnya; saat refresh gagal, pertahankan snapshot
terakhir beserta waktunya.

---

## 9. Peta field CMS

Next.js + Payload CMS, database SQLite, route admin `/adminku`.
Collections: **Users, Media, Projects**. Globals: **Header, Home, Footer, Stats**.

Semua teks yang tampil di header, body, dan footer harus berasal dari field di bawah —
termasuk label navigasi dan tombol. Layout dan komponen tetap dikendalikan kode.
Seluruh field teks bersifat **localized ID/EN**; aturannya ada di bagian 9.9.

### 9.1 Collection: Users

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `email` | email | ✅ | Login pengelola |
| `password` | password | ✅ | Dikelola Payload, bukan teks biasa |
| `name` | text | ✅ | Nama tampilan di admin |

Satu pengelola untuk scope awal. Tidak ada registrasi pengunjung, tidak ada
Collection user kedua.

### 9.2 Collection: Media

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `title` | text | ✅ | Label di admin |
| `sourceType` | select: `upload` \| `url` | ✅ | Menentukan field mana yang dipakai |
| `mediaType` | select: `image` \| `video` | ✅ | |
| `file` | upload | ✅ jika `upload` | Disimpan persisten di luar checkout Git |
| `url` | text (URL) | ✅ jika `url` | Divalidasi skema URL |
| `provider` | select: `direct-file` \| `youtube` \| `vimeo` \| `tiktok` \| `other` | ✅ jika `url` | Menentukan native player vs embed |
| `thumbnail` | upload → Media (image) | ✅ jika `mediaType=video` | Dasar aturan publish video |
| `alt` | text | ✅ jika `mediaType=image` | Teks alternatif |
| `caption` | text | — | Opsional, tidak wajib tampil |

Aturan: `sourceType=upload` mengosongkan `url` dan sebaliknya. Tidak ada dua sumber
aktif sekaligus. Video tanpa `thumbnail` boleh disimpan sebagai draft, tidak boleh
dipublikasikan sebagai video playable.

### 9.3 Collection: Projects

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `title` | text | ✅ | Judul karya |
| `slug` | text (unique) | ✅ | Untuk anchor/URL stabil |
| `category` | select: `Series` \| `Music Video` \| `Short Film` \| `Tutorial` | ✅ | Empat kategori tetap |
| `context` | textarea | ✅ | Satu kalimat konteks |
| `role` | text | 🟡 | Peran kreator — isi hanya jika terverifikasi |
| `tools` | array of text | — | Tools yang benar dipakai, bukan daftar lengkap |
| `link` | text (URL) | — | Link karya lengkap |
| `linkLabel` | text | — | Label CTA, mis. "Tonton series" |
| `media` | relationship → Media (hasMany, ordered) | ✅ | Item pertama = visual kartu |
| `preview` | group: `enabled` (checkbox), `media` (relationship), `durationSeconds` (number) | — | Durasi 6–8 detik masih usulan |
| `featured` | checkbox | — | Untuk kurasi tampil lebih dulu |
| `order` | number | — | Urutan manual di Selected Works |
| `_status` | draft/published (Payload drafts) | ✅ | Draft tidak boleh tampil di publik |

Tidak ada field `thumbnail` terpisah di Projects — poster kartu memakai thumbnail
dari Media yang terhubung. Ini mencegah dua sumber kebenaran untuk aset yang sama.

### 9.4 Global: Header

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `studioName` | text | ✅ | Wordmark jika tidak ada logo |
| `logo` | upload → Media | — | Opsional |
| `navItems` | array: `label` (text), `href` (text) | ✅ | Work, About, Contact |
| `cta` | group: `label` (text), `href` (text) | — | Tombol header, jika dipakai |
| `showLanguageToggle` | checkbox | — | Tampilkan pemilih bahasa ID/EN di header |

### 9.5 Global: Home

| Group | Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- | --- |
| `hero` | `title` | text | ✅ | Maks. 2 baris |
| | `subtitle` | textarea | ✅ | Maks. ~20 kata |
| | `visual` | upload → Media | — | Hero still |
| | `ctaPrimary` | group: label, href | ✅ | Lihat Karya |
| | `ctaSecondary` | group: label, href | ✅ | Diskusi Kolaborasi |
| `showreel` | `enabled` | checkbox | — | Section disembunyikan jika false |
| | `title` | text | — | |
| | `media` | relationship → Media | — | Wajib jika `enabled` |
| `works` | `title` | text | ✅ | |
| | `intro` | textarea | — | |
| `impact` | `title` | text | ✅ | |
| | `intro` | textarea | — | |
| | `showUpdatedAt` | checkbox | — | Tampilkan waktu pembaruan |
| `about` | `title` | text | ✅ | |
| | `body` | richText (tanpa HTML mentah) | ✅ | |
| | `skills` | array of text | — | Kemampuan nyata saja |
| | `partnersLabel` | text (localized) | — | Default EN "Creative Partner", ID "Mitra Kreatif" |
| | `partners` | array: `name` (text), `logo` (upload → Media image), `url` (URL), `visible` (checkbox) | — | Logo resmi; hanya mitra yang benar-benar bekerja sama |
| | `process` | group: `title` (text), `body` (richText) | — | Satu contoh proses |
| `contact` | `title` | text | ✅ | |
| | `body` | textarea | — | Email & sosial diambil dari Footer global |
| `seo` | `metaTitle` | text | 🟡 | Usulan tambahan, belum ada di tabel admin asli |
| | `metaDescription` | textarea | 🟡 | |
| | `ogImage` | upload → Media | 🟡 | |

### 9.6 Global: Footer

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `copyright` | text | ✅ | Teks copyright |
| `email` | email | ✅ | Sumber tunggal email bisnis (dipakai juga oleh Contact) |
| `socials` | array: `platform` (select: Instagram, TikTok, YouTube, X, Threads, Facebook, WhatsApp, Email, Discord), `label` (text), `url` (URL), `visible` (checkbox) | ✅ | Minimal satu |
| `note` | textarea | — | Catatan kecil, opsional |

Email dan sosial hanya didefinisikan **sekali** di Footer, lalu dibaca oleh section
Contact. Tidak diduplikasi di Home agar tidak ada dua nilai yang bisa berbeda.

### 9.7 Global: Stats

| Field | Tipe | Wajib | Catatan |
| --- | --- | --- | --- |
| `updatedAt` | date | — | Diisi proses sinkronisasi |
| `totalViews` | number | — | `admin.readOnly` — hanya proses otomatis |
| `platforms` | array: `name`, `url`, `followers` (number), `updatedAt` (date), `source` (text) | — | `followers` null ≠ 0 |
| `engagement` | array: `platform`, `value` (number), `formula` (text), `period` (text), `source` (text) | — | Jangan ratakan persentase lintas platform |
| `videosCreated` | number | — | Editorial, dari data terverifikasi |
| `completedCampaigns` | number | — | Editorial |
| `nominations` | number | — | Editorial, nominasi bukan kemenangan |

### 9.8 Validasi lintas field

1. Project berstatus `published` wajib punya minimal satu `media`.
2. Project dengan video di `media` atau `preview` wajib punya thumbnail pada item
   Media video tersebut.
3. Media `video` tanpa `thumbnail` tidak dapat dipilih sebagai video playable di
   Project published.
4. `sourceType` menentukan field wajib: `upload` → `file`, `url` → `url` + `provider`.
5. `slug` unik dan stabil — dipakai untuk anchor, jangan berubah setelah publish.
6. `totalViews` tidak dapat diedit dari admin.
7. Semua field bertipe URL divalidasi skema `https://`.

### 9.9 Dua bahasa (ID/EN)

Keputusan pengguna: toggle bahasa **tanpa mengubah URL**, dan **semua konten** —
termasuk judul serta deskripsi karya — punya versi ID dan EN.

**Konfigurasi Payload**

| Setelan | Nilai |
| --- | --- |
| `localization.locales` | `id`, `en` |
| `localization.defaultLocale` | `id` |
| `localization.fallback` | `true` — field EN kosong memakai nilai ID |
| Field `localized` | semua `text`, `textarea`, `richText`, dan label di dalam array |

**Perilaku frontend**

1. Bahasa disimpan di cookie `lang` (`id` atau `en`), bukan di URL.
2. Server membaca cookie saat render, sehingga tidak ada kedipan bahasa yang salah.
3. Kunjungan pertama tanpa cookie → `id`.
4. Toggle di header menulis cookie lalu me-render ulang halaman.
5. Nilai cookie tidak valid → jatuh ke `id`.
6. Atribut `html lang` mengikuti bahasa aktif.
7. Label toggle `ID` dan `EN` statis karena berupa kode bahasa, bukan field CMS.

**Konsekuensi yang diterima**

| Konsekuensi | Dampak |
| --- | --- |
| URL tidak berubah | Tautan yang dibagikan terbuka dalam bahasa default penerima, bukan bahasa pengirim |
| Satu URL untuk dua bahasa | Tidak ada `hreflang`; crawler hanya melihat versi `id` |
| Cache halaman | Cache harus memperhitungkan cookie `lang` (`Vary: Cookie`) atau di-bypass untuk halaman ini |
| Konten ganda | Setiap field teks diisi dua kali; `fallback` mencegah halaman kosong saat EN belum ada |

**Admin:** editor memilih bahasa (ID/EN) di Payload. Draft/publish berlaku untuk satu
dokumen, bukan per bahasa — publikasi EN dan ID terjadi bersamaan.

---

## 10. Alur konten

```
login /adminku → tambah/edit → simpan draft → preview → publish
                                                          ↓
                                        landing publik diperbarui tanpa deploy
```

- Landing publik hanya membaca konten `published`.
- Perubahan field CMS wajib memperbarui cache halaman bila caching dipakai.
- Admin dan operasi tulis memeriksa autentikasi/otorisasi **di server**, bukan hanya
  menyembunyikan tombol atau URL.
- Draft tidak boleh muncul di halaman publik dalam kondisi apa pun.

---

## 11. Yang dibutuhkan dari pengguna

### P0 — memblokir copy dan layout

| # | Kebutuhan | Untuk |
| --- | --- | --- |
| 1 | Ejaan brand final — ✅ "Ikymian Studios" | Semua copy, metadata |
| 2 | Email bisnis — ✅ `ariesiky8@gmail.com` | Contact, Footer |
| 3 | URL sosial asli — ✅ terisi, lihat bagian 2.1 | Contact, Footer |
| 4 | Link karya MV, Short Film, Tutorial — ✅ terisi (3 reel Instagram) | Selected Works |
| 5 | Poster/thumbnail — ✅ 5 episode series, ❌ 3 reel | Aturan publish video |
| 6 | Foto hero (still) — ✅ `images/hero-1.png` dipilih, 2 cadangan | Hero |
| 7 | Logo partner resmi — 5 dari 6 terkumpul, AKOOL belum; lihat 6.2 | Baris Creative Partner |
| 8 | Judul dan durasi 3 reel Instagram | Kartu karya |

Sudah diputuskan: bilingual ID/EN dengan toggle (bagian 9.9), nama kreator
Caisart Felix ditampilkan bersama brand, dan `@damiann101` adalah akun pengguna.

### P1 — memblokir Impact

| # | Kebutuhan | Untuk |
| --- | --- | --- |
| 7 | Akun/platform yang dihitung untuk total views | Sinkronisasi Phase 4 |
| 8 | Akses/izin API per platform | Sinkronisasi Phase 4 |
| 9 | Jumlah video unik yang dibuat | Stats editorial |
| 10 | Jumlah completed campaigns | Stats editorial |
| 11 | Nominasi + acara/tahun/kategori/bukti | Stats editorial |

### P2 — opsional

| # | Kebutuhan | Untuk |
| --- | --- | --- |
| 12 | Showreel 30–60 detik | Section showreel |
| 13 | Logo (jika ada) | Header |
| 14 | Klip preview 6–8 detik per karya | Preview kartu |

Selama P0 belum lengkap, Phase 2 (scaffold aplikasi) masih bisa dikerjakan dengan
konten placeholder yang ditandai jelas, tetapi landing belum boleh dianggap selesai.

---

## 12. Definition of done Phase 1

Phase 1 selesai ketika:

1. Ejaan brand, nama/titel kreator, bio, email bisnis, dan strategi bilingual final.
2. Struktur section serta copy final ID dan EN disetujui.
3. Palet serta arah visual disetujui.
4. Setiap karya tervalidasi: judul, kategori, peran, link, sumber media, thumbnail.
5. Akun/platform statistik dan cakupan total views tercatat, termasuk status akses API.
6. Peta field CMS di bagian 9 ditinjau dan disetujui.
7. Berkas logo resmi keenam mitra Creative Partner tersedia.

**Belum termasuk:** membuat halaman, mengolah video, menghubungkan API, deployment,
atau menambah dependencies.
