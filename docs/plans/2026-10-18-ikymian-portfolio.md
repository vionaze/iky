# Ikymian Studio Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membuat webapp portfolio di `https://ikymianstudios.si` dengan landing page publik dan admin `/adminku` untuk mengelola karya serta mengedit konten dari header sampai footer tanpa mengubah kode.

**Architecture:** Satu aplikasi Next.js dengan Payload CMS terintegrasi, satu repo, dan SQLite pada VPS EZTOPUP. Landing page membaca konten terpublikasi dari CMS; `/adminku` menyediakan login, pengelolaan portfolio/media, serta editor konten per bagian. Upload dan database disimpan secara persisten di luar checkout Git. Total views diperbarui otomatis ke snapshot pada database; sumber metrik mengikuti keputusan Phase 4 (API resmi atau sumber gratis tidak resmi). Landing tersedia dalam dua bahasa (ID/EN) dengan toggle tanpa mengubah URL, memakai localization Payload dan cookie bahasa.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Payload CMS, SQLite melalui adapter resmi Payload, serta Nginx dan SSL yang sudah tersedia di VPS. Native HTML video untuk upload/file video langsung dan embed player untuk platform yang mendukung. Versi paket yang kompatibel ditetapkan saat implementasi. Stack ini sudah disetujui pengguna; aplikasi CMS belum dibuat.

---

## Intent, scope, dan batas pekerjaan

Permintaan awal adalah analisis dan rencana portfolio, dilanjutkan bootstrap domain, `index.html`, SSL, serta pull request yang sudah dibuat. Pengguna kemudian menyetujui stack CMS dan meminta portfolio dinamis, editor header/body/footer, serta media upload/URL. **Instruksi terbaru: simpan seluruh keputusan ke docs; jangan koding dulu.** Pada pembaruan ini hanya dokumen ini yang boleh berubah; kode, dependencies, konfigurasi deployment, dan server tetap.

- **Scope:** satu landing page portfolio, admin `/adminku` dengan login, CRUD portfolio, editor teks/gambar per bagian, media upload/URL, thumbnail wajib untuk video, player responsif tanpa autoplay, statistik, link sosial, kontak, metadata domain, dan tampilan dua bahasa (ID/EN).
- **Non-goals:** multipage portfolio, blog, akun/registrasi pengunjung, booking/payment, page builder bebas/drag-and-drop, editor kode HTML, episode player sendiri, scraping statistik, animasi WebGL, dan dashboard analytics terpisah.
- **Untouched:** akun sosial, video asli, kredensial, serta konfigurasi situs lain di VPS. DNS dan hosting domain ini hanya diubah dalam bootstrap yang kemudian diminta pengguna, bukan saat analisis awal.
- **Definition of done untuk tahap ini:** semua keputusan terbaru, batas media, admin, stack, bilingual, acceptance criteria, dan lima phase terdokumentasi konsisten; tidak ada perubahan kode atau server.

Git terhubung ke `https://github.com/vionaze/iky.git`. Branch dasar `main` berisi rencana awal; pekerjaan bootstrap domain berada pada `setup/domain-bootstrap` untuk ditinjau melalui PR. Workspace saat ini berisi halaman status, konfigurasi Nginx, README deployment, dan dokumen ini; belum ada package atau framework tes. Instruksi handoff di atas adalah format skill; pada lingkungan ini skill yang tersedia bernama `executing-plans`, bukan namespace `superpowers`.

### Bootstrap domain yang diminta pengguna

- Domain terbaru: **https://ikymianstudios.si/**, menggantikan target awal `ikymian.studio`.
- Server: VPS EZTOPUP, diidentifikasi dari sesi Termius; deployment memakai SSH ke server yang sama.
- Folder situs dan document root saat bootstrap: `/var/www/ikymianstudios.si`; halaman langsung pada `index.html`, tanpa folder `www` tambahan sesuai koreksi pengguna. Saat aplikasi Next.js dibuat, Nginx perlu diarahkan ke proses aplikasi; perubahan itu belum dilakukan.
- Cloudflare: record A domain utama menuju `161.97.130.68`, DNS only. Tidak menambah subdomain `www`.
- Situs memakai konfigurasi Nginx terpisah dan SSL Let's Encrypt. HTTP dialihkan ke HTTPS; timer renewal Certbot tersedia.
- Halaman publik kini menampilkan portfolio statis: hero, lima episode series, tiga tautan karya, About dengan logo mitra, serta Contact. Statistik tetap menampilkan "Belum tersedia" sampai sinkronisasi API dibuat; tidak ada angka fiktif.
- Detail operasional ada pada `README.md`. Bootstrap ini mendahului Phase 1–5 dan tidak menyatakan portfolio lengkap sudah selesai.

## Sumber dan fakta yang diketahui

1. [Percakapan referensi](https://chatgpt.com/share/6ad367bc-d254-83ec-986b-cf10e623dee6?ogimg=plain), dibaca dari data percakapan pada HTML publik. Referensi memberi bahan portfolio AI filmmaker, tetapi usulan presentasi 10–12 halaman disederhanakan menjadi satu landing page sesuai permintaan terbaru.
2. Poin 8 referensi adalah prestasi dan program kreator. **Tidak dibuat section tersebut.** Nominations tetap masuk sebagai statistik karena pengguna memintanya secara terpisah.
3. Poin 9 dipertahankan: views, engagement, followers, jumlah video dibuat, completed campaigns, serta nominations. Link sosial harus tersedia.
4. Dokumen awal mencatat empat kategori: Series, MV, Tutorial, dan Short Film. Pertahankan sebagai konteks proyek; kategori Tutorial berasal dari dokumen awal, bukan pesan pada shared chat yang dibaca ulang. Jangan mengubah keempat kategori menjadi empat layanan berbayar tanpa konfirmasi.
5. Dokumen awal menyimpan [tautan pendek series](https://vt.tiktok.com/ZS9U5fU9PpM2m-zKLX9/) dan hasil redirect sebelumnya ke [playlist Berondong Sebelah Rumah](https://www.tiktok.com/@damiann101/playlist/BerondongSebelahRumah-7692418796472109844). URL playlist dipertahankan sebagai kandidat dari docs, belum diperiksa ulang pada analisis ini. Daftar episode, isi video, sinopsis, poster, kepemilikan akun, serta angka performa belum dapat diverifikasi. Belum ada analisis visual terhadap filmnya.
6. Target awal `ikymian.studio` gagal di-resolve pada pemeriksaan awal. Pengguna kemudian memilih `ikymianstudios.si` untuk deployment; gunakan domain terbaru ini untuk metadata dan operasional berikutnya.

## Hasil analisis referensi dan tambahan brief

Referensi berguna sebagai daftar bahan portfolio, tetapi usulan 10–12 halaman tidak perlu diterapkan pada landing page. Pengunjung cukup dapat mengenali kreator, menilai karya, melihat bukti performa, lalu menghubungi. Karya menjadi fokus utama; statistik mendukung kepercayaan tanpa membuat halaman terasa seperti dashboard.

| Bagian referensi | Keputusan untuk landing page |
| --- | --- |
| Pembuka | Hero dengan identitas, visual utama, dan dua CTA |
| About, skills, tools | Gabungkan dalam About yang ringkas; hanya kemampuan nyata |
| Showreel dan featured projects | Preview singkat pada karya; showreel opsional jika aset tersedia |
| Case study | Satu contoh proses singkat di About, tanpa halaman detail tambahan |
| Poin 8 | Dikeluarkan sesuai instruksi pengguna |
| Poin 9 | Impact: total views, engagement, followers total/per platform, videos created, completed campaigns, nominations |
| Brand collaboration dan testimonial | Opsional dengan bukti; bukan syarat versi pertama |
| Contact | Email bisnis serta link akun sosial asli |

Rekomendasi durasi **8 detik per preview karya** adalah keputusan desain awal untuk ditinjau, bukan angka dari referensi. Showreel kompilasi adalah aset terpisah dan tidak perlu dibuat agar halaman bisa mulai dikerjakan. Pengguna telah mengonfirmasi bahwa “live” berarti **views media sosial diperbarui otomatis**. Angka manual tidak memenuhi kebutuhan total views ini.

**Urutan kerja minimum:** kunci konten dan field editor → siapkan CMS/admin → bangun landing dan player media → hubungkan statistik otomatis → verifikasi dan deploy. Integrasi otomatis hanya dikerjakan setelah akses platform jelas. Saat ini hanya memperbarui dokumen yang sama, tanpa menambah kode, dependencies, tes, atau berkas desain kedua.

## Keputusan CMS dan konten dinamis yang disetujui

Pengguna menyetujui **Next.js + TypeScript + Tailwind CSS + Payload CMS + SQLite**. Pilihan ini menggantikan rencana HTML/CSS/JavaScript statis untuk portfolio lengkap. Halaman `index.html` yang sudah live tetap menjadi halaman sementara sampai implementasi berikutnya diminta.

Payload dipilih karena admin, autentikasi, form konten, upload, dan draft/publish dapat berada dalam aplikasi Next.js yang sama. SQLite dipilih untuk kebutuhan awal satu pengelola di satu VPS, tanpa service database terpisah. Admin custom dari nol menambah pekerjaan autentikasi dan form; PostgreSQL belum dibutuhkan untuk scope yang disepakati. Ini keputusan untuk kebutuhan sekarang, bukan janji migrasi database otomatis di kemudian hari.

| Menu `/adminku` | Konten yang dapat dikelola |
| --- | --- |
| Header | Logo/nama studio, label dan tujuan navigasi, teks dan link tombol |
| Landing Page | Hero, deskripsi, CTA, judul serta teks setiap section body, About, Process, dan Contact |
| Portfolio | Tambah/edit/hapus karya, kategori, deskripsi, peran, tools, link lengkap, media, urutan, featured, dan status draft/published |
| Media | Upload gambar/video atau masukkan URL gambar/video; pilih thumbnail/poster dan isi teks alternatif |
| Statistik | Metrik editorial seperti jumlah karya, completed campaigns, nominations; views otomatis mengikuti sumber API |
| Footer & Socials | Teks footer/copyright, email, label dan URL akun sosial |
| Bahasa | Pilihan ID/EN untuk setiap field teks, termasuk judul dan deskripsi karya; label toggle `ID`/`EN` statis |

Editor berupa form per bagian dengan field yang jelas. Semua teks yang tampil pada header, body, dan footer harus terhubung ke field CMS; label navigasi dan tombol juga termasuk. Layout dan komponen tetap dikendalikan desain aplikasi. Gunakan Collections untuk Users, Media, dan Projects; Globals untuk Header, Home, Footer, serta Stats. Tidak membuat CMS/admin kedua.

**Dua bahasa (ID/EN) tanpa mengubah URL.** Payload memakai `localization` dengan locale `id` dan `en`, default `en`, serta `fallback: true`. Semua field teks, termasuk judul dan konteks karya, bersifat `localized`. Bahasa aktif disimpan pada cookie `lang`; server membaca cookie saat render sehingga tidak ada kedipan bahasa salah, dan toggle di header hanya menulis cookie lalu me-render ulang. Kunjungan pertama tanpa cookie memakai `en`; nilai cookie yang tidak valid juga jatuh ke `en`. Konsekuensi yang diterima: URL berbagi tidak membawa bahasa, tidak ada `hreflang` karena satu URL untuk dua bahasa, dan crawler melihat versi `en`. Cache halaman harus memperhitungkan cookie tersebut (`Vary: Cookie`) atau di-bypass untuk halaman ini.

Alur konten: login → tambah/edit → simpan draft → preview → publish → konten publik diperbarui tanpa deploy kode. Landing publik hanya membaca konten yang sudah dipublikasikan; perubahan field CMS harus memperbarui cache halaman bila caching digunakan. Admin serta operasi tulis wajib memeriksa autentikasi/otorisasi di server, bukan hanya menyembunyikan URL atau tombol.

Database SQLite dan berkas upload ditempatkan di direktori persisten di luar checkout Git, misalnya `/var/lib/ikymianstudios/data/` dan `/var/lib/ikymianstudios/media/`. Lokasi final ditentukan saat implementasi. Deploy/pull kode tidak boleh menimpa database, upload, atau rahasia server. Backup mencakup database yang konsisten dan berkas media; pemulihannya diperiksa sebelum peluncuran CMS.

Rujukan teknis yang sudah dibaca: [Payload Admin](https://payloadcms.com/docs/admin/overview), [SQLite adapter](https://payloadcms.com/docs/database/sqlite), [Globals](https://payloadcms.com/docs/configuration/globals), [Drafts](https://payloadcms.com/docs/versions/drafts), serta [deployment dan penyimpanan persisten](https://payloadcms.com/docs/production/deployment).

## Arah desain

**Sumber referensi utama pilihan pengguna: [Aura](https://aura.build).** Mayoritas referensi visual untuk landing pada Phase 3 diambil dari Aura, terutama komposisi hero, tipografi, jarak antar elemen, penataan karya, dan transisi ringan. Saat mulai desain, pilih 3–5 contoh yang paling cocok dengan portfolio kalem lalu catat URL serta aspek yang diadaptasi pada dokumen ini. Belum ada template tertentu yang dipilih atau ditinjau secara visual pada tahap pencatatan preferensi ini.

Referensi Aura dipadukan menjadi desain Ikymian sendiri dengan brief krim/biru susu/pink/indigo. **Taste Skill v2** menjadi panduan pengerjaan FE, dengan [guide resmi pilihan pengguna](https://www.tasteskill.dev/guide) sebagai rujukan penggunaan. Pemilihan Aura sebagai sumber referensi tidak mengubah stack, hosting, scope, atau kebutuhan views otomatis.

Guide menyebut v2 sebagai experimental dan memberi contoh prompt untuk proyek baru. Terapkan bagian yang relevan: nyatakan pembacaan brief sebelum membangun, jaga satu tema, buat hierarki hero ringkas dengan CTA mudah ditemukan, variasikan komposisi berdasarkan konten, lalu periksa hasil di browser. Target hero: judul maksimal dua baris dan subteks maksimal 20 kata; navigasi desktop satu baris dengan tinggi maksimal 80 px. Gerak tetap ringan mengikuti brief.

Template prompt pada guide menyebut Next.js dan minimal delapan section. Untuk proyek ini, keputusan scope dan stack dalam rencana tetap berlaku: jumlah section mengikuti konten yang diperlukan. Saat mulai FE, baca SKILL.md v2 yang ditautkan guide dan cocokkan versi instalasinya sebelum menjalankan workflow; nama lokal `design-taste-frontend` saja belum membuktikan versi 2. Pemeriksaan akhir mencakup keterbacaan hero, variasi layout yang berguna, responsivitas, dan kualitas visual sesuai brief.

### Pilihan yang direkomendasikan: editorial dengan warna susu

Latar off-white bernuansa krim, teks indigo gelap, dan campuran biru susu, pink pucat, serta indigo pada hero. Bentuk warnanya menyerupai cairan lembut yang berbaur, tidak berupa garis gradasi pelangi. Area karya tetap tenang supaya poster dan video menjadi pusat perhatian.

Alternatif yang dipertimbangkan: latar gelap cinematic memberi kontras kuat pada film tetapi kurang sesuai permintaan kalem dan krim; seluruh halaman bermotif cair terasa ekspresif tetapi lebih mudah mengganggu konten. Pilih warna cair hanya pada hero dan aksen kontak.

Token awal yang akan diperiksa kontrasnya saat implementasi:

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

body {
  margin: 0;
  color: var(--ink);
  background: var(--cream);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.hero {
  background:
    radial-gradient(ellipse at 18% 28%, #b8d4f2cc, transparent 62%),
    radial-gradient(ellipse at 80% 40%, #f0cbdcb3, transparent 58%),
    radial-gradient(ellipse at 62% 85%, #51439a30, transparent 65%),
    var(--cream);
}

.container {
  width: min(var(--page-width), calc(100% - 40px));
  margin-inline: auto;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media (max-width: 640px) {
  .works-grid { grid-template-columns: 1fr; }
}
```

Ini baseline CSS, bukan klaim bahwa tekstur cair sudah selesai secara visual. Pertajam penempatan warna melalui browser preview; jangan menambah generator gambar atau canvas jika CSS sudah cukup.

**Pembaruan 18 Oktober 2026 — tema lebih bold.** Setelah meninjau halaman statis, pengguna meminta arah yang lebih bold dengan referensi [Gween Studios](https://gweenstudios.xyz/). Implementasi memakai **Instrument Serif** untuk display, aksen **wine/blush/gold** di atas krim, blok gelap untuk Selected Works dan Impact, blok blush untuk Contact, stiker kecil, dan watermark tipografi. Token di atas tetap dicatat sebagai riwayat; warna dan tipografi final mengikuti implementasi terbaru.

**Revisi kedua, 18 Oktober 2026.** Pengguna menegaskan situs harus tetap **terang**, bukan dark. Varian gelap `/v2/` yang sempat dibuat sebagai percobaan sudah dihapus.

**Revisi ketiga, 19 Oktober 2026 — kembali ke brief awal.** Pengguna menilai arah serif/wine/gold tidak sesuai brief. Tema dikembalikan ke token awal: krim, biru susu, pink pucat, dan indigo; tipografi sans (Instrument Sans), hero dengan bidang warna cair, area karya tenang, garis pembatas tipis. Tidak ada serif display, stiker, watermark, atau blok wine. Selected Works memakai satu poster series + daftar lima episode agar tidak menampilkan poster yang sama berulang.

**Revisi keempat, 19 Oktober 2026 — biru dan pink dominan.** Pengguna meminta warna dominan situs adalah biru dan pink. Hero memakai gradien biru susu ke pink pucat, Selected Works berlatar biru lembut, Impact berlatar pink lembut, dan Contact bergradien pink ke biru. Krem dipakai sebagai aksen permukaan (nav, kartu, footer) dan indigo tetap warna teks. Tidak ada blok gelap.

**Revisi ketujuh belas, 21 Oktober 2026 — konten bisa diedit dari admin.** Home global ditambah field: `heroStage`, `works.carousel` (judul, kicker, meta, gambar, href), `aboutMe`, `about.processWords`, `about.partners` (logo upload, invert, square), `contact.email`/`ctaLabel`, dan `footerMarquee`. LandingPage memakai nilai CMS dengan fallback ke kamus. Migration `20261021_133144_editable_content` dibuat, dan `scripts/seed-editable.mjs` mengisi konten awal (8 kartu carousel, about, hero, process, footer) untuk EN/ID.

**Revisi keenam belas, 21 Oktober 2026 — About Me.** Isi About diganti narasi personal M. Rizki Firmansyah (EN/ID): heading "About Me", lead "Where imagination meets cinematic innovation.", tiga paragraf keahlian, dan closing. Layout dibuat kompak, process looping words tetap di samping, partner di bawah.

**Revisi kelima belas, 21 Oktober 2026 — process looping words.** Daftar proses di About diganti komponen looping words bergaya Osmo: kata (STORY DIRECTION, VISUALS & CHARACTERS, EDITING & SOUND, PUBLISHING) bergerak vertikal dengan easing elastic, frame sudut pink mengikuti lebar kata, dan fade mask atas/bawah. Berhenti otomatis saat `prefers-reduced-motion`.

**Revisi keempat belas, 21 Oktober 2026 — halaman 404.** URL tak dikenal sekarang menampilkan 404 kustom: teks "404, page not found." diketik karakter demi karakter dengan kursor blok pink, angka 404 raksasa sebagai ghost di belakang, tombol replay animasi, dan "Back home". Karena route group punya root layout masing-masing, boundary not-found bawaan tidak dipakai; middleware me-rewrite path tak dikenal ke `/not-found` dengan status 404 asli.

**Revisi ketiga belas, 21 Oktober 2026 — Selected Works jadi carousel.** Section Works diganti infinite card swipe berbasis GSAP seamless loop. Scroll-pin dihapus karena mengganggu scroll halaman; navigasi memakai tombol panah kiri/kanan di sisi layar, dan halaman tetap bisa di-scroll normal. Urutan mulai Berondong Sebelah Rumah, lalu episode 02–05 dengan thumbnail sama dan judul berbeda, lalu Tutorial AI, Short Film, Music Video. Kartu tampil 3D-ish dengan skala/opacity dan label di bawah. Mode reduced-motion menampilkan grid statis.

**Revisi kedua belas, 21 Oktober 2026 — bubble field (dibatalkan).** Section bubble sempat dibuat, lalu pengguna meminta di-revert karena tidak diperlukan. Komponen, style, dan string terkait dihapus; alur kembali langsung dari hero ke Works.

**Revisi kesebelas, 21 Oktober 2026 — soft + header/footer baru.** Pengguna minta lebih soft dan menilai header/footer jelek. Palet diturunkan lagi ke indigo `#161c4c` dengan pink lembut `#ff8ac1`, glow diperhalus. Header dirombak: monogram gradien pink→biru, label brand dua baris, nav berbentuk pil berisi link dan toggle bahasa. Logo partner dibesarkan, di-center, dan diberi animasi mengambang; warna logo dipertahankan (CapCut & OpenArt di-invert karena monokrom hitam). Daftar partner ditambah Nemo Video, Wizstar, dan Pollo AI (total 9). Setelah itu pink ditambah tanpa menggeser dominasi biru: label section jadi pink, tint Impact dan glow pink diperkuat, dot pink di subline hero, hover link pink, label footer pink, dan back-to-top pink. Footer dirombak: brand + tagline + email, kolom Explore dan Social, serta baris copyright dengan tautan kembali ke atas.

**Revisi kesepuluh, 21 Oktober 2026 — biru elektrik + pink.** Pengguna menegaskan temanya bukan "dark" atau "light", melainkan identitas biru elektrik dan pink. Kanvas jadi indigo lembut `#161c4c`, permukaan `#0f1438`, teks `#f4f3ff`, muted putih 66%, pink lembut `#ff8ac1`, indigo `#ffa3d0`, biru `#6f8dff`. Hero memakai glow cyan/pink di atas biru, ghost `rgba(255,255,255,0.12)`, CTA pil pink dengan orb putih, dan kartu label biru/pink. `color-scheme: dark` tetap agar kontrol native menyatu.

**Revisi kesembilan, 21 Oktober 2026 — tema gelap.** Pengguna meminta tema tidak lagi light. Dasar jadi indigo-hitam (`#0b0a18`), permukaan `#121022`, teks `#f5f3ff`, muted `#a9a4c9`, aksen biru `#5b8cff`, pink `#ff8fc4`, indigo `#9b8bff`. Hero memakai glow biru/pink di atas gelap, ghost text `#2c2749`, kartu label bertint gelap, dan `color-scheme: dark` diaktifkan.

**Revisi kedelapan, 21 Oktober 2026 — palet biru-pink baru.** Dasar krem diganti periwinkle muda (`#f6f4ff`) dengan wash radial biru di kiri atas dan pink di kanan atas. Aksen jadi biru elektrik (`#4d7cfe`) dan pink (`#ffd1e6`), indigo `#5b4bff`, ink `#15132b`. Kartu hero memakai gradasi biru → ungu → pink, label format biru/pink/lavender/indigo, ghost text lavender.

**Revisi ketujuh, 20 Oktober 2026 — preloader minimal.** Pengguna menilai animasi logotype besar berlebihan. Preloader diganti menjadi teks kecil **Montserrat** di tengah: "IKYMIAN STUDIOS" + heart biru + teks loading berganti cepat (AI SERIES → AI MUSIC VIDEO → AI SHORT FILM → AI EDUCATION) masing-masing ±420 ms. Keluar dengan transisi 1 detik: logo membesar 1,45x lalu memudar, overlay krem memudar, dan halaman masuk dari skala 1,03 tanpa blur. Total ±2,7 detik. Preloader hanya tampil sekali per sesi (`sessionStorage`), refresh berikutnya langsung ke halaman. Ukuran logotype 48px (mengecil di mobile), heart biru filled, konsisten di tengah. Tanpa audio, menghormati `prefers-reduced-motion`, dan responsif di mobile.

**Revisi keenam, 20 Oktober 2026 — hero gaya kartu + GSAP.** Hero diganti mengikuti referensi pengguna: judul kecil di tengah, teks ghost italic raksasa, 8 kartu karya tersebar, CTA pil, grain halus. Animasi memakai GSAP (intro stagger, float, parallax pointer, tilt 3D, fan-out saat scroll) dan dimatikan saat `prefers-reduced-motion`. Kartu memakai 3 potret hero, 1 poster series, dan 4 kartu format. Copy hero sementara berasal dari kamus `src/lib/i18n.ts` (`heroStage`), bukan CMS.

**Revisi kelima, 19 Oktober 2026 — frontend akan dirombak.** Pengguna menyatakan ingin merombak frontend. Brief di bagian ini (krim, biru susu, pink, indigo, kalem, tipografi lapang, gerak ringan) tetap menjadi acuan; implementasi saat ini adalah iterasi, bukan hasil final. Skill yang terpasang dan boleh dipakai: `frontend-design`, `tailwind-design-system`, `responsive-design`, dan `threejs-*`.

Tipografi besar dan lapang, navigasi pendek, garis pembatas tipis, sudut media lembut, dan maksimal satu pola hover sederhana. Tidak ada marquee, scroll hijacking, cursor khusus, atau efek gerak terus-menerus. Hormati `prefers-reduced-motion` bila transisi ditambahkan.

## Struktur satu halaman

| Urutan | Isi | Perilaku |
| --- | --- | --- |
| 1. Navigation | Identitas, Work, About, Contact, toggle ID/EN | Anchor biasa, tanpa menu overlay untuk tiga link; toggle menulis cookie tanpa mengubah URL |
| 2. Hero | Identitas AI Filmmaker & Content Creator, kalimat pendek, karya visual utama | CTA Lihat Karya dan Diskusi Kolaborasi |
| 3. Showreel | Ringkasan karya lintas format | Saran 30–60 detik, diputar setelah klik |
| 4. Selected Works | 6–8 karya terpilih yang mewakili empat kategori | Label Series, Music Video, Short Film, Tutorial; tidak perlu filter dulu |
| 5. Impact | Views, followers, engagement, videos created, campaigns, nominations | Angka nyata, periode dan sumber jelas |
| 6. About & Process | Bio singkat, kemampuan, baris logo Creative Partner, satu contoh proses | Ringkas; logo hanya untuk mitra yang benar-benar bekerja sama |
| 7. Contact | Email bisnis dan link Instagram, TikTok, YouTube atau akun lain yang diberikan | CTA langsung, tanpa form backend |

Brand collaboration dan testimonial dari referensi tidak menjadi section wajib. Hanya tampilkan jika ada bukti dan materi nyata. Jangan mengisi logo, nama klien, kutipan, atau pengalaman dari contoh referensi seolah sudah terverifikasi. Pengguna mengonfirmasi enam mitra kreatif — **CapCut, OiiOii, Pixmax, TopMediai, OpenArt, AKOOL** — yang tampil sebagai baris logo berlabel **Creative Partner** di About. Hanya logo resmi keenam mitra itu yang boleh dipakai; jangan menambah logo lain. Detail aset ada pada inventaris Phase 1.

### Isi dan perilaku kartu karya

Setiap karya memiliki judul, label kategori, satu kalimat konteks, peran kreator, tools relevan, poster, dan link hasil akhir. Pilih materi nyata untuk semua kategori; jangan memaksakan jumlah sama jika kualitas aset berbeda.

Untuk series yang sudah dikirim, gunakan satu kartu **Berondong Sebelah Rumah**, label **Series**, dan CTA **Tonton series** ke playlist canonical di atas. Jangan menebak sinopsis, episode count, atau peran produksi. MV, tutorial, dan short film memerlukan tautan serta poster masing-masing.

Preview per karya disarankan **6–8 detik**, dengan **8 detik** sebagai target awal untuk klip yang dipilih. Durasi ini belum disetujui pengguna dan bukan batas durasi video lengkap. **Thumbnail/poster sebelum Play sudah diwajibkan pengguna untuk semua video.** Native player upload/file langsung menggunakan controls, playsinline, preload none, serta poster; embed mengikuti aturan sumber di bawah. Tulis durasi sesuai media sebenarnya. Jika hanya ada poster dan link karya, kartu tetap dapat ditampilkan sebagai tautan, tanpa mengklaim menyediakan video yang dapat diputar di halaman.

### Media, thumbnail, dan pemutaran video

1. **Sumber media:** admin dapat mengunggah gambar/video atau memasukkan URL. Media video dari upload dan URL yang didukung harus dapat diputar di landing saat pengunjung memilih Play.
2. **Jenis URL:** URL file gambar/video langsung ditangani sebagai file media; URL halaman platform video ditangani melalui embed resmi jika platform mengizinkan. Tidak menjanjikan semua URL halaman web dapat menjadi video. Daftar provider, format file, dan batas ukuran ditetapkan saat implementasi berdasarkan sumber nyata yang diberikan.
3. **Thumbnail wajib:** setiap item video harus memiliki gambar thumbnail/poster yang dipilih dari admin. Berlaku untuk video upload, URL video langsung, video embed, preview karya, dan showreel jika ada. Video boleh disimpan sebagai draft saat thumbnail belum tersedia, tetapi tidak boleh dipublikasikan sebagai video playable tanpa thumbnail.
4. **Sebelum Play:** pengunjung melihat thumbnail dengan tombol Play yang jelas; bukan layar player kosong atau cuplikan yang bergerak sendiri. Video/iframe aktif setelah tindakan Play. Poster tetap menjadi tampilan awal meskipun provider tidak menyediakan thumbnail otomatis.
5. **Tanpa autoplay:** video tidak dimulai ketika website dibuka, saat scroll, atau ketika hover; tidak ada autoplay diam-diam dalam keadaan muted. Pengunjung memulai pemutaran sendiri. Terapkan aturan ini pada semua sumber media.
6. **Player menyesuaikan sumber:** gunakan native player untuk upload/file langsung dan embed player untuk provider yang didukung. Jangan memaksa URL halaman platform menjadi sumber native video. Jika sumber privat, rusak, atau embed ditolak, tampilkan pesan singkat dan tautan karya lengkap bila tersedia, tanpa status seolah pemutaran berhasil.
7. **Responsif:** portrait dan landscape mengikuti rasio sumber, tidak diregangkan atau memotong isi video. Kontrol dapat digunakan pada mobile/desktop; tersedia play/pause, seek, volume, dan fullscreen sejauh didukung sumber/player. Tombol Play dapat diakses dengan keyboard dan punya label yang jelas.
8. **Field minimum:** jenis sumber (upload/URL), jenis media (gambar/video), file atau URL sesuai sumber yang dipilih, judul, teks alternatif untuk gambar, dan thumbnail wajib untuk video. Karya menghubungkan item Media yang relevan, bukan menyalin file atau membuat implementasi player kedua.

Showreel berbeda dengan preview tiap karya: 30–60 detik untuk ringkasan lintas format. Tidak wajib membuat showreel baru agar tahap layout dapat berjalan. Jika belum ada, jangan menampilkan pemutar kosong di versi publik.

### Draft copy untuk dibahas

- Identity: **Ikymian Studios — Caisart Felix · AI Filmmaker & Content Creator**. Ejaan brand sudah dikonfirmasi "Ikymian Studios"; nama kreator ditampilkan bersama brand.
- Hero: **Cerita, musik, dan ide yang menjadi visual.**
- Supporting line: **Series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.**
- CTA: **Lihat Karya** / **Diskusi Kolaborasi**.
- About awal: **Saya membuat series, music video, short film, dan tutorial, mengeksplorasi cara ide berkembang menjadi cerita dan visual melalui AI.** Sesuaikan lagi dengan proses dan peran yang benar.

Semua baris copy di atas wajib punya versi EN sebelum dianggap final; selama terjemahan belum ada, `fallback` menampilkan versi ID.

## Definisi statistik dan arti “live”

Pada 18 Oktober 2026, pengguna mengonfirmasi: **“Views media sosial diperbarui otomatis.”** Kebutuhan ini adalah sinkronisasi views akun/konten media sosial. Statistik penonton live streaming berada di luar scope. Platform dan akun yang dihitung, cakupan total views, akses API, serta interval pembaruan masih perlu ditetapkan. Rencana layout dapat berjalan sambil kelayakan sumber diperiksa; fitur total views belum selesai jika masih memakai angka manual.

| Metrik | Definisi yang dipakai |
| --- | --- |
| Total views | Akumulasi views konten pada akun dan platform yang disebut; bukan page views website atau jumlah penonton unik. Sertakan cakupan serta waktu pembaruan. |
| Followers/subscribers | Tampilkan per platform dan total akun yang sudah terverifikasi. Total lintas platform bukan unique audience. Data platform yang belum tersedia jangan dianggap nol. |
| Engagement | Saran awal: engagement rate per platform untuk periode 30 hari, dengan rumus dan cakupan sampel yang disebut. Contoh berbasis views: `(likes + comments + shares) / views × 100%`, hanya jika semua komponennya tersedia untuk sampel yang sama. Jangan merata-ratakan persentase lintas platform. |
| Videos created | Jumlah karya video unik yang dibuat, input terverifikasi. Upload ulang lintas platform tidak otomatis dihitung sebagai karya baru. |
| Completed campaigns | Jumlah campaign yang selesai, bukan jumlah konten campaign. |
| Nominations | Jumlah nominasi terverifikasi; bukan kemenangan. Catat acara, tahun, kategori, dan bukti dalam materi sumber. |

Untuk engagement, denominator dan data harus cocok dengan sumber. Jika data hanya mendukung likes/comments, gunakan label dan rumus yang menyebut komponen sebenarnya; jangan mengklaim total engagement lengkap.

### Snapshot publik dan metrik editorial

Simpan snapshot metrik pada database melalui CMS dan tampilkan tanggal pembaruan. Proses otomatis mengisi views; jumlah karya unik, completed campaigns, serta nominations dapat diisi dari admin berdasarkan catatan terverifikasi. Otomatisasi followers dan engagement ditentukan sesuai akses platform. Nilai views otomatis tidak ditimpa editor manual. Selama sumber views belum terhubung, tampilkan belum tersedia; pengisian manual hanya boleh untuk preview lokal yang ditandai jelas, bukan dianggap penyelesaian fitur. Bentuk data konseptual minimum, bukan berkas JSON yang harus dibuat:

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

`null` berarti belum tersedia, bukan nol. Elemen `platforms` yang sudah diketahui memiliki `name`, `url`, `followers`, dan `updatedAt`. Elemen `engagement` yang terverifikasi memiliki `platform`, `value`, `formula`, `period`, dan `source`. Jangan isi angka dummy pada versi publik. JSON hanya berisi data yang memang boleh dipublikasikan.

### Pembaruan views otomatis — kebutuhan terkonfirmasi

Lakukan pemeriksaan akses akun lebih dulu. Tentukan platform, akun pemilik, field tersedia, izin aplikasi, serta mekanisme scheduler pada VPS yang sudah dipilih. Setelah lolos pemeriksaan itu, tambahkan rencana proses sinkronisasi dan jadwalnya dengan path yang sesuai aplikasi. Jangan membangun endpoint spekulatif sekarang.

Alur minimum: sumber metrik (API resmi atau tidak resmi) → pembaruan di server → satu snapshot publik → halaman. Token tetap di server. Usulan interval awal 30–60 menit, disesuaikan kuota serta kebutuhan; jangan menjanjikan realtime per detik. Tampilkan tanggal pembaruan per sumber. Saat refresh gagal, pertahankan snapshot terakhir beserta waktunya; jika belum pernah ada data, tampilkan belum tersedia. Tidak menggunakan angka yang naik sendiri untuk menyimulasikan views.

Dasar kelayakan yang telah diperiksa:

- [YouTube Channels API](https://developers.google.com/youtube/data/reference/rest/v3/channels) menyediakan channel view count, subscriber count, dan public video count. Subscriber count dibulatkan, dan public video count bukan jumlah semua karya yang pernah dibuat.
- [TikTok Get User Info](https://developers.tiktok.com/docs/en/tiktok-api-v2-get-user-info) menyediakan follower count, likes count, dan public video count dengan scope `user.info.stats` serta otorisasi pengguna. Ini tidak menyediakan total views akun sebagai field pada endpoint tersebut. Penjumlahan views video perlu verifikasi endpoint video, pagination, cakupan, serta aksesnya secara terpisah.
- Dokumentasi Instagram Insights tidak berhasil dibaca pada pemeriksaan ini. Dukungan metrik dan kelayakan akun Instagram belum terverifikasi. Jangan menjanjikan sinkronisasi Instagram tanpa pemeriksaan lanjutan.

Jika akses salah satu platform tidak tersedia, laporkan batasannya dan tentukan cakupan yang bisa ditampilkan bersama pengguna. Jangan menyebut total lintas semua platform jika yang tersinkron hanya sebagian. Tampilkan waktu pembaruan sebenarnya; badge Live tidak boleh mengesankan pembaruan per detik atau menutupi data yang sudah lama.

## Aset yang dibutuhkan

Prioritas pertama: ejaan brand (✅ **Ikymian Studios**), logo jika ada, satu hero still, tautan karya dari empat kategori, poster karya, peran pada setiap karya, kontak bisnis (✅ `ariesiky8@gmail.com`), serta URL sosial asli (✅ terdaftar di Linktree). Series TikTok sudah memiliki tautan playlist tetapi belum memiliki aset lokal.

Prioritas berikutnya: klip preview 6–8 detik, showreel bila tersedia, bio final, logo resmi mitra Creative Partner, data statistik beserta periode/sumber, bukti campaign selesai, dan bukti nominations. Pilih 6–8 karya setelah meninjau semua kategori; bukan mengarang karya untuk memenuhi kuota.

Setiap karya mengacu ke Media pada CMS. Upload disimpan secara persisten di luar checkout; URL eksternal disimpan sebagai URL dengan jenis sumber yang jelas. Siapkan thumbnail yang stabil untuk setiap video. Hindari hotlink poster sementara yang URL-nya bisa kedaluwarsa, dan jangan mengunduh video platform menjadi aset lokal tanpa sumber asli/izin pengguna.

## Acceptance criteria implementasi

1. Halaman langsung menjelaskan identitas kreator, empat format karya, dan cara menghubungi.
2. Hero terasa kalem dengan biru susu/pink/indigo di atas latar krim; teks tetap jelas.
3. Selected Works mewakili Series, Music Video, Short Film, dan Tutorial menggunakan karya nyata yang tersedia. Jika kategori belum memiliki aset, itu dicatat sebagai kebutuhan konten, bukan diisi karya palsu.
4. Playlist series yang diberikan dapat dibuka dari kartu karya. Tidak ada episode count yang ditebak.
5. Semua video menampilkan thumbnail sebelum Play, tidak autoplay pada load/scroll/hover, dan memiliki player yang sesuai sumber serta responsif untuk portrait/landscape. Preview berdurasi sesuai label; link karya lengkap tetap mudah ditemukan.
6. Enam kelompok metrik terwadahi. Nilai tidak tersedia tidak berubah menjadi angka palsu atau nol; total tidak dinyatakan lengkap jika sumbernya belum lengkap.
7. Tidak ada section prestasi/program kreator; nominations muncul pada Impact.
8. Link sosial dan email bisnis berasal dari data pengguna, bukan handle/email tebakan.
9. Layout berfungsi di lebar 375, 768, dan 1440 px, tanpa horizontal overflow; navigasi, link, dan pemutar dapat dipakai dengan keyboard. Teks normal memenuhi kontras minimum 4.5:1.
10. Website publik memiliki metadata domain yang benar, aset yang dapat dimuat, dan tidak membocorkan token. Deployment dan perubahan DNS tetap merupakan langkah terpisah yang memerlukan konfirmasi pengguna.
11. Total views diperbarui otomatis dari platform yang disepakati, dengan cakupan dan waktu pembaruan terlihat. Verifikasi sinkronisasi menggunakan respons API nyata; jika refresh gagal, snapshot terakhir tetap tersedia beserta waktunya. Angka manual dan animasi counter tidak membuktikan acceptance ini.
12. `/adminku` mewajibkan login. Pengguna yang belum terautentikasi tidak dapat menambah, mengubah, atau menghapus konten melalui admin maupun API.
13. Admin dapat mengelola portfolio serta mengedit teks header, body, footer, tombol, kontak, dan sosial. Publish memperbarui landing tanpa mengubah kode atau deploy ulang; draft tidak muncul pada halaman publik.
14. Media mendukung upload dan URL: video upload, URL file video langsung, serta embed provider yang disepakati dapat diputar setelah Play. Video tanpa thumbnail tidak dapat dipublikasikan sebagai video playable; sumber yang gagal menampilkan fallback yang jujur.
15. Database, upload, dan rahasia tetap aman saat deploy/pull kode. Backup database/media dapat dipulihkan sebelum CMS diluncurkan.
16. Toggle bahasa ID/EN bekerja tanpa mengubah URL: cookie `lang` dihormati saat render, `html lang` sesuai, tidak ada kedipan bahasa salah, teks yang belum diterjemahkan jatuh ke versi ID, dan pilihan bahasa bertahan saat halaman dimuat ulang.
17. Baris Creative Partner hanya menampilkan enam mitra yang dikonfirmasi memakai berkas logo resmi, dengan `alt` yang benar, tinggi optis rata, dan tanpa marquee. Tidak ada logo atau klaim kemitraan tambahan.

## Pembagian proyek: total 5 phase

Tetap **total 5 phase**, diperbarui mengikuti kebutuhan CMS yang disetujui. Tujuan akhirnya landing page dinamis dan `/adminku` pada satu aplikasi di `ikymianstudios.si`, dengan views otomatis serta media ber-thumbnail tanpa autoplay. Blog, registrasi pengunjung, page builder bebas, dan halaman publik tambahan berada di luar scope. Bootstrap DNS/SSL sudah tersedia; aplikasi CMS belum boleh dikerjakan sampai pengguna meminta lanjut.

| Phase | Pekerjaan | Hasil dan syarat selesai |
| --- | --- | --- |
| 1 — Fondasi konten dan arah visual ✅ | Kunci identitas, section, copy, palet, kandidat karya, thumbnail, akun sosial, dan field editor | Brief serta inventaris konten/field jelas; kebutuhan yang belum tersedia ditandai |
| 2 — Fondasi aplikasi dan admin ✅ | Siapkan Next.js, Payload, SQLite, login `/adminku`, Collections, Globals, media upload/URL, dan draft/publish | Admin dapat mengelola konten; akses tulis terlindungi; video tanpa thumbnail tidak lolos publish |
| 3 — Landing page dan player media ✅ | Bangun UI dua bahasa dengan Taste Skill v2 dan referensi Aura; hubungkan konten CMS, portfolio, thumbnail, serta player sesuai sumber | Landing responsif dan dapat dialihkan ID/EN; edit/publish tampil tanpa deploy; video baru aktif setelah Play dan mengikuti rasio sumber |
| 4 — Statistik dan views otomatis 🟡 | Periksa API serta scheduler VPS, bangun sinkronisasi views, tampilkan followers, engagement, jumlah video, completed campaigns, dan nominations sesuai sumbernya | Views benar-benar diperbarui otomatis pada platform yang disepakati; cakupan dan waktu pembaruan terlihat; snapshot terakhir tetap tersedia saat refresh gagal |
| 5 — Pemeriksaan akhir dan peluncuran ✅ | Verifikasi edit/publish, akses admin, media, metadata, backup/pemulihan, serta deployment aplikasi di balik Nginx/SSL | Preview final dan alur utama lolos; data bertahan saat deploy; peluncuran aplikasi setelah diminta pengguna |

### Status implementasi per 19 Oktober 2026

| Phase | Status | Catatan |
| --- | --- | --- |
| 1 | ✅ ditutup | Gap tercatat: poster episode berbeda + judul/poster 3 reel ditunda |
| 2 | ✅ | Next.js, Payload, SQLite, `/adminku`, 3 collection + 4 global, draft/publish |
| 3 | ✅ | Landing CMS-driven, bilingual cookie, Tailwind v4, Three.js, responsif |
| 4 | 🟡 | Sumber tidak resmi (YouTube/TikTok), manual, production belum disinkronkan, IG diblokir |
| 5 | ✅ | Live di VPS: systemd port 3001, Nginx proxy, migrasi, backup + uji restore |

Detail operasional (service, path, deploy, rollback) ada di `README.md`.

### Rincian Phase 1

1. **Identitas:** ejaan brand ✅ **Ikymian Studios**, nama kreator ✅ **Caisart Felix** (ditampilkan bersama brand), email bisnis ✅ `ariesiky8@gmail.com`, serta titel dan bio yang masih draft. Semua copy harus tersedia dalam ID dan EN.
2. **Struktur:** tetapkan Hero → Selected Works → Impact → About & Process → Contact. Showreel bersifat opsional; section poin 8 tidak dibuat.
3. **Arah visual:** tetapkan latar krim, campuran biru susu/pink/indigo pada hero, teks indigo gelap, serta tipografi dan jarak yang lapang. Tahap ini belum membuat UI final.
4. **Inventaris karya/media:** tinjau kandidat dari Series, Music Video, Short Film, dan Tutorial; catat judul, peran, link asli, sumber upload/URL, serta thumbnail wajib untuk setiap video. Jumlah 6–8 adalah target kurasi, bukan alasan membuat konten fiktif. Durasi preview 8 detik masih usulan.
5. **Inventaris statistik:** daftar akun/platform yang ingin dihitung, cakupan total views, sumber angka lain, serta kebutuhan akses API. Views otomatis sudah menjadi requirement; kelayakan koneksi dibuktikan di Phase 4.
6. **Field CMS dan kesiapan implementasi:** petakan seluruh teks header/body/footer ke form admin; bedakan data editorial dan data API otomatis. Pisahkan materi siap pakai dan yang belum tersedia. Phase 1 selesai ketika konten serta struktur editor jelas; tidak perlu menunggu semua kredensial API.

**Batas Phase 1:** belum membuat halaman, mengolah video, menghubungkan API, atau melakukan deployment. Pemeriksaan cukup meninjau kelengkapan brief dan sumber konten; tidak perlu menambah tes atau dependencies. Setelah Phase 1, pekerjaan visual dapat dimulai menggunakan materi yang tersedia.

## Langkah implementasi

Langkah ini baru dijalankan setelah pengguna meminta implementasi. **Pilihan skill FE dari pengguna: Taste Skill v2 dari [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), install name `design-taste-frontend`, mengikuti [guide v2](https://www.tasteskill.dev/guide).** Pengguna memberikan perintah `npx skills add Leonxlnx/taste-skill` sebagai sumber skill. Guide memberikan perintah terarah `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`. Gunakan skill ini sebagai panduan FE utama pada Phase 2–3, menggantikan pilihan @frontend-design sebelumnya, serta @executing-plans untuk menjalankan rencana. Pada saat pencatatan preferensi, skill lokal bernama `design-taste-frontend` sudah tersedia; belum ada instalasi atau upgrade yang dilakukan dan versi lokal belum dipastikan sebagai v2. Sebelum pengerjaan FE, pastikan versi yang akan dipakai sesuai sumber pilihan pengguna; jika instalasi diperlukan, pilih skill FE tersebut saja, bukan seluruh paket repo.

Brief pengguna tetap menjadi acuan: kalem, sederhana, campuran krim/biru susu/pink/indigo, dan gerak ringan. Default skill tentang palet, intensitas animasi, stack, atau proses tidak boleh menambah scope maupun mengganti keputusan proyek tanpa kebutuhan nyata. Tidak perlu mengaktifkan banyak skill desain sekaligus. Kerjakan satu alur, tanpa subagent secara default.

Path berikut adalah rencana berkas untuk implementasi berikutnya, bukan berkas yang dibuat sekarang. Detail scaffold dan command build mengikuti versi Next.js/Payload yang dipilih saat implementasi; jangan menjalankan scaffolding untuk pekerjaan dokumentasi ini.

### Task 1: Kunci konten dan field editor

**Files:** Modify `docs/plans/2026-10-18-ikymian-portfolio.md`; update `README.md` saat implementasi benar-benar dimulai. Inventaris kerja Phase 1 ada di `docs/plans/2026-10-18-ikymian-content-inventory.md`.

1. Catat brand, empat kategori, kontak, URL sosial, serta kandidat karya dan kepemilikannya.
2. Petakan teks/gambar header, setiap section body, dan footer ke field CMS pada tabel admin di atas.
3. Catat sumber tiap video, thumbnail, ketersediaan klip, serta URL/provider yang perlu didukung. Usulan 8 detik belum menjadi batas wajib.
4. Tetapkan akun/platform serta cakupan views otomatis; tandai akses dan aset yang belum tersedia.

**Acceptance:** konten, kebutuhan media, dan editor per bagian jelas tanpa fakta tebakan atau pekerjaan kode.

### Task 2: Siapkan aplikasi, CMS, dan admin

**Files yang direncanakan:** `package.json`, lockfile package manager terpilih, `.env.example`, `src/payload.config.ts`, `src/collections/Users.ts`, `src/collections/Media.ts`, `src/collections/Projects.ts`, `src/globals/Header.ts`, `src/globals/Home.ts`, `src/globals/Footer.ts`, `src/globals/Stats.ts`, dan route Payload `src/app/(payload)/adminku/[[...segments]]/page.tsx` beserta route API/layout hasil scaffold resmi.

1. Pilih versi Next.js/Payload yang kompatibel; scaffold satu aplikasi TypeScript, Tailwind, dan adapter SQLite resmi. Pertahankan halaman sementara yang live selama proses pengembangan.
2. Konfigurasikan route admin `/adminku`, login pengelola, dan izin server untuk Collections/Globals; publik hanya dapat membaca konten terpublikasi yang memang diperbolehkan. Aktifkan `localization` dengan locale `id`/`en`, default `en`, dan `fallback: true`.
3. Buat form konten, portfolio, serta media sesuai field minimum yang disepakati. Upload dan URL dipilih berdasarkan jenis sumber. Terapkan kewajiban thumbnail ketika memublikasikan video.
4. Hubungkan draft/preview/publish dan pembaruan cache landing. Simpan SQLite serta upload pada lokasi persisten di luar checkout.
5. Verifikasi admin dapat menyimpan draft dan publish; request tulis tanpa autentikasi ditolak. Tidak membuka registrasi pengunjung.

**Acceptance:** CMS dan editor berfungsi lokal, draft tidak bocor ke publik, dan video tanpa thumbnail tidak dapat dipublikasikan sebagai video playable.

### Task 3: Bangun landing dan pemutaran media

**Files yang direncanakan:** `src/app/(frontend)/layout.tsx`, `src/app/(frontend)/page.tsx`, `src/app/(frontend)/globals.css`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Portfolio.tsx`, `src/components/VideoPlayer.tsx`, dan `src/components/LanguageToggle.tsx`. Buat komponen tambahan hanya jika konten/perilakunya benar-benar memerlukan pemisahan.

1. Tinjau referensi Aura yang cocok dan gunakan Taste Skill v2 dengan palet serta suasana pengguna. Render konten publik dari CMS melalui komponen Next.js, memakai locale dari cookie `lang` dan `fallback` ke `id`.
2. Hubungkan label navigasi, hero, teks section, CTA, kontak, serta footer ke field admin. Pertahankan HTML semantik, satu H1, dan anchor yang jelas.
3. Tampilkan karya nyata dari Projects. Untuk video, tampilkan thumbnail dan tombol Play terlebih dulu; native player atau embed dipilih sesuai sumber. Jangan memulai video pada load/scroll/hover.
4. Periksa upload video, URL file langsung, dan URL provider yang disepakati dengan sumber nyata. Pastikan rasio portrait/landscape tidak terdistorsi dan fallback muncul bila sumber tidak dapat diputar.
5. Periksa mobile/desktop dan keyboard, lalu uji toggle ID/EN tanpa perubahan URL beserta `html lang` dan persistensi cookie. Kemudian ubah satu teks serta satu karya melalui admin untuk membuktikan publish memperbarui landing tanpa deploy kode.

**Acceptance:** landing dinamis sesuai brief; semua video memiliki thumbnail, tidak autoplay, dan player sesuai sumber dapat digunakan pengunjung.

### Task 4: Hubungkan statistik otomatis

**Files yang direncanakan:** Modify `src/globals/Stats.ts` dan `src/app/(frontend)/page.tsx`; create `src/lib/sync-stats.ts`. Path konektor dan konfigurasi scheduler ditetapkan setelah platform serta mekanisme proses server benar-benar dipilih.

1. Periksa akses API untuk akun/platform yang disepakati; dokumentasikan field, cakupan total views, serta interval yang layak.
2. Hubungkan sumber metrik yang disetujui ke proses sinkronisasi server dan simpan snapshot pada database. Kredensial (jika ada) tetap di environment server.
3. Tampilkan nilai, cakupan, dan waktu pembaruan pada landing. Bedakan views otomatis dari metrik editorial yang bisa diedit melalui admin. Cakupan yang disetujui pengguna pada 19 Oktober 2026: **semua kanal** (Instagram, TikTok, YouTube, X, Threads; Facebook menyusul).

**Revisi 19 Oktober 2026 — sumber tidak resmi.** Pengguna memilih API tidak resmi yang gratis. Implementasi: Innertube (YouTube), socialcounts (subscriber), markup profil TikTok. Hasil uji: YouTube 8.200 subscriber + 254 views (2 video long-form), TikTok 31.100 follower / 733.700 likes / 83 video; Instagram diblokir. Konsekuensi yang diterima: rawan berubah, cakupan parsial, tanpa SLA, dan acceptance Phase 4 belum terpenuhi penuh (belum otomatis terjadwal).
4. Verifikasi respons API nyata memperbarui snapshot. Saat refresh gagal, snapshot terakhir dan waktunya tetap tersedia; data yang belum ada tidak berubah menjadi nol atau angka fiktif.

**Acceptance:** views benar-benar diperbarui otomatis untuk cakupan yang disepakati; data manual bukan pengganti penyelesaian fitur.

### Task 5: Verifikasi dan deploy aplikasi

**Files:** Modify `README.md` dan `deploy/ikymianstudios.si.nginx.conf` sesuai kebutuhan aplikasi; konfigurasi proses Node dan migrasi database mengikuti mekanisme deployment yang dipilih saat implementasi.

1. Jalankan pemeriksaan/build yang tersedia pada scaffold terpilih. Verifikasi alur edit → draft → preview → publish → landing, pemutaran media, serta penolakan akses tulis tanpa login.
2. Periksa tampilan 375/768/1440 px, keyboard, thumbnail sebelum Play, tanpa autoplay, metadata domain, dan link sosial/karya. Tidak ada player kosong, aset 404, atau error aplikasi yang belum ditangani.
3. Verifikasi backup/pemulihan database dan media; perubahan kode tidak boleh menimpa konten atau rahasia. Catat cara menjalankan aplikasi, migrasi, dan rollback di README.
4. Setelah pengguna meminta peluncuran, jalankan proses aplikasi pada port lokal yang tersedia dan arahkan Nginx ke proses tersebut. Pertahankan domain/SSL dan konfigurasi situs lain; verifikasi landing serta `/adminku` lewat HTTPS.

#### TODO runtime service (diputuskan di Phase 5)

**Status 18 Oktober 2026:** belum dipakai. Halaman publik masih statis dan disajikan
langsung oleh Nginx, sehingga belum ada proses Node yang perlu dijaga. Menambahkan
PM2 sekarang hanya menambah satu titik gagal tanpa manfaat.

**Pilihan yang ditunda:** PM2 atau systemd. Ditetapkan saat aplikasi Next.js/Payload
benar-benar berjalan, bukan sebelum scaffold dibuat.

| Opsi | Kelebihan | Konsekuensi |
| --- | --- | --- |
| PM2 | `pm2 logs`, restart otomatis, cluster mode, dokumentasi luas | dependency tambahan; daemon harus dijalankan sebagai user aplikasi, bukan root |
| systemd | sudah tersedia di VPS, start otomatis saat boot, tanpa dependency | log lewat `journalctl`, tanpa cluster bawaan |

**Syarat wajib untuk kedua opsi:**

1. Proses berjalan sebagai user aplikasi, **bukan root**.
2. `/var/lib/ikymianstudios/` (SQLite dan media) dimiliki user tersebut dan berada di
   luar checkout Git.
3. Nginx menjadi reverse proxy ke `127.0.0.1:3000`; port aplikasi tidak dibuka ke
   publik dan SSL tetap ditangani Nginx.
4. Rahasia (`PAYLOAD_SECRET`, token API) hanya ada di environment server, tidak di repo.
5. Backup database dan media tersedia sebelum peluncuran; `git pull` tidak boleh
   menimpa data atau berkas upload.

**Skeleton PM2 — hanya jika PM2 dipilih; jangan dibuat sekarang:**

```js
// ecosystem.config.js
module.exports = {
  apps: [{
    name: "ikymian",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 3000",
    cwd: "/var/www/ikymianstudios.si",
    env: { NODE_ENV: "production" },
    max_memory_restart: "512M",
    out_file: "/var/log/ikymian/out.log",
    error_file: "/var/log/ikymian/error.log"
  }]
};
```

```sh
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u <user-aplikasi> --hp /home/<user-aplikasi>
```

**Acceptance:** aplikasi siap ditinjau, konten persisten, admin terlindungi, dan deployment yang diminta pengguna terbukti bekerja. Halaman sementara tidak dinyatakan sebagai portfolio CMS yang sudah selesai.

## Verifikasi dan batas tes

Saat ini belum ada existing tests atau toolchain CMS. Pembaruan docs cukup diverifikasi lewat diff dan konsistensi kebutuhan; tidak menambahkan tes atau dependencies. Saat implementasi diminta, gunakan pemeriksaan/build yang tersedia dari stack terpilih dan browser untuk acceptance. Jalur utama adalah admin mengedit/publish konten lalu pengunjung melihat perubahan dan memutar video setelah thumbnail; jalur kegagalan kritis adalah akses tulis tanpa login ditolak. Perilaku media yang disepakati serta snapshot saat API gagal diperiksa langsung, tanpa membuat matriks snapshot atau suite e2e. Tes baru hanya jika existing checks tidak dapat membuktikan perilaku yang berubah: paling banyak satu jalur utama dan satu kegagalan kritis, tanpa framework baru hanya demi kelengkapan.

Tidak ada perintah npm/build/lint karena belum ada toolchain aplikasi. Halaman status sudah dibuat dan diperiksa melalui HTTP/HTTPS serta browser; portfolio lengkap belum diimplementasikan. Git sudah tersedia; ketika melakukan commit, sertakan hanya berkas terkait setelah unit pekerjaan selesai, dengan pesan sederhana seperti `feat: add portfolio layout`; jangan menggunakan `git add .` untuk mencakup aset atau kredensial yang belum ditinjau.

## Handoff

Aplikasi sudah live di `https://ikymianstudios.si/` (Phase 2, 3, 5 selesai; Phase 4
sebagian). Dokumen ini tetap menjadi sumber keputusan: stack CMS, `/adminku`, editor
per bagian, media upload/URL, thumbnail wajib sebelum Play, tanpa autoplay, dua
bahasa ID/EN, brief visual krim/biru susu/pink/indigo, dan cakupan statistik semua
kanal.

**Pekerjaan berikutnya:** frontend dirombak ulang mengikuti brief dan skill yang
terpasang (`frontend-design`, `tailwind-design-system`, `responsive-design`,
`threejs-*`). Setelah itu: poster episode berbeda, judul/poster tiga reel,
penjadwal statistik, dan penghapusan `noindex` saat konten final.

**Jangan** mengubah konfigurasi situs lain di VPS, PM2 `deploy`, atau port 3000.
