# Ikymian Studio Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Membuat landing page portfolio di `https://ikymianstudios.si` untuk menampilkan Series, Music Video, Short Film, dan Tutorial dalam tampilan kalem yang membantu calon kolaborator memahami karya dan menghubungi kreatornya.

**Architecture:** Satu halaman statis dengan HTML semantik, CSS responsif, dan JavaScript kecil untuk statistik. Karya dan narasi utama ditulis langsung di HTML; statistik publik dibaca dari satu snapshot JSON. Total views media sosial wajib diperbarui otomatis melalui API resmi dan proses di server; platform, izin, serta hosting diperiksa sebelum menentukan implementasi proses tersebut.

**Tech Stack:** HTML, CSS, JavaScript ES modules, native HTML video. Python HTTP server hanya untuk preview lokal. Tidak membutuhkan framework, package manager, database, atau sistem login untuk halaman dasar.

---

## Intent, scope, dan batas pekerjaan

Permintaan awal adalah analisis dan rencana portfolio. Pengguna kemudian meminta bootstrap domain, halaman `index.html`, SSL, serta pull request. Halaman status sementara sudah dibuat; Phase 1–5 untuk portfolio lengkap tetap merupakan rencana pekerjaan berikutnya.

- **Scope:** satu landing page portfolio, empat kategori karya, preview video, statistik, link sosial, kontak bisnis, dan persiapan metadata domain.
- **Non-goals:** multipage portfolio, admin/CMS, blog, login, booking/payment, episode player sendiri, scraping statistik, animasi WebGL, dan dashboard analytics.
- **Untouched:** akun sosial, video asli, kredensial, serta konfigurasi situs lain di VPS. DNS dan hosting domain ini hanya diubah dalam bootstrap yang kemudian diminta pengguna, bukan saat analisis awal.
- **Definition of done untuk tahap ini:** arah desain, susunan konten, definisi metrik, kebutuhan aset, langkah implementasi, dan keputusan terbuka terdokumentasi tanpa klaim palsu.

Git terhubung ke `https://github.com/vionaze/iky.git`. Branch dasar `main` berisi rencana awal; pekerjaan bootstrap domain berada pada `setup/domain-bootstrap` untuk ditinjau melalui PR. Workspace saat ini berisi halaman status, konfigurasi Nginx, README deployment, dan dokumen ini; belum ada package atau framework tes. Instruksi handoff di atas adalah format skill; pada lingkungan ini skill yang tersedia bernama `executing-plans`, bukan namespace `superpowers`.

### Bootstrap domain yang diminta pengguna

- Domain terbaru: **https://ikymianstudios.si/**, menggantikan target awal `ikymian.studio`.
- Server: VPS EZTOPUP, diidentifikasi dari sesi Termius; deployment memakai SSH ke server yang sama.
- Folder situs dan document root: `/var/www/ikymianstudios.si`; halaman langsung pada `index.html`, tanpa folder `www` tambahan sesuai koreksi pengguna.
- Cloudflare: record A domain utama menuju `161.97.130.68`, DNS only. Tidak menambah subdomain `www`.
- Situs memakai konfigurasi Nginx terpisah dan SSL Let's Encrypt. HTTP dialihkan ke HTTPS; timer renewal Certbot tersedia.
- Tampilan saat ini hanya pemberitahuan bahwa portfolio sedang disiapkan. Tidak ada statistik, karya, atau klaim performa fiktif.
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

**Urutan kerja minimum:** kunci aset/konten → susun halaman dan warna → pasang preview serta kontak → hubungkan snapshot statistik sesuai keputusan sumber → cek browser. Integrasi otomatis hanya dikerjakan setelah akses platform dan hosting jelas. Tahap analisis ini hanya memperbarui dokumen yang sama, tanpa menambah kode, dependencies, tes, atau berkas desain kedua.

## Arah desain

**Sumber referensi utama pilihan pengguna: [Aura](https://aura.build).** Mayoritas referensi visual untuk Phase 2 diambil dari Aura, terutama komposisi hero, tipografi, jarak antar elemen, penataan karya, dan transisi ringan. Saat mulai desain, pilih 3–5 contoh yang paling cocok dengan portfolio kalem lalu catat URL serta aspek yang diadaptasi pada dokumen ini. Belum ada template tertentu yang dipilih atau ditinjau secara visual pada tahap pencatatan preferensi ini.

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

Tipografi besar dan lapang, navigasi pendek, garis pembatas tipis, sudut media lembut, dan maksimal satu pola hover sederhana. Tidak ada marquee, scroll hijacking, cursor khusus, atau efek gerak terus-menerus. Hormati `prefers-reduced-motion` bila transisi ditambahkan.

## Struktur satu halaman

| Urutan | Isi | Perilaku |
| --- | --- | --- |
| 1. Navigation | Identitas, Work, About, Contact | Anchor biasa, tanpa menu overlay untuk tiga link |
| 2. Hero | Identitas AI Filmmaker & Content Creator, kalimat pendek, karya visual utama | CTA Lihat Karya dan Diskusi Kolaborasi |
| 3. Showreel | Ringkasan karya lintas format | Saran 30–60 detik, diputar setelah klik |
| 4. Selected Works | 6–8 karya terpilih yang mewakili empat kategori | Label Series, Music Video, Short Film, Tutorial; tidak perlu filter dulu |
| 5. Impact | Views, followers, engagement, videos created, campaigns, nominations | Angka nyata, periode dan sumber jelas |
| 6. About & Process | Bio singkat, kemampuan, tools terverifikasi, satu contoh proses | Ringkas, tidak menjadi daftar semua tools |
| 7. Contact | Email bisnis dan link Instagram, TikTok, YouTube atau akun lain yang diberikan | CTA langsung, tanpa form backend |

Brand collaboration dan testimonial dari referensi tidak menjadi section wajib. Hanya tampilkan jika ada bukti dan materi nyata. Jangan mengisi logo, nama klien, kutipan, atau pengalaman dari contoh referensi seolah sudah terverifikasi.

### Isi dan perilaku kartu karya

Setiap karya memiliki judul, label kategori, satu kalimat konteks, peran kreator, tools relevan, poster, dan link hasil akhir. Pilih materi nyata untuk semua kategori; jangan memaksakan jumlah sama jika kualitas aset berbeda.

Untuk series yang sudah dikirim, gunakan satu kartu **Berondong Sebelah Rumah**, label **Series**, dan CTA **Tonton series** ke playlist canonical di atas. Jangan menebak sinopsis, episode count, atau peran produksi. MV, tutorial, dan short film memerlukan tautan serta poster masing-masing.

Preview per karya disarankan **6–8 detik**, dengan **8 detik** sebagai target awal untuk klip yang dipilih. Ini saran desain, belum durasi yang disetujui pengguna. Gunakan berkas preview yang sudah dipotong, native `video controls playsinline preload="none"` dan poster. Tulis durasi sesuai berkas sebenarnya, bukan angka hardcode yang salah. Tidak autoplay seluruh grid, tidak unduh video TikTok sebagai aset tanpa sumber asli dari pengguna. Jika belum ada klip, tampilkan poster dan link asli.

Showreel berbeda dengan preview tiap karya: 30–60 detik untuk ringkasan lintas format. Tidak wajib membuat showreel baru agar tahap layout dapat berjalan. Jika belum ada, jangan menampilkan pemutar kosong di versi publik.

### Draft copy untuk dibahas

- Identity: **Ikymian Studio · AI Filmmaker & Content Creator**. Ejaan brand final perlu dipastikan karena referensi memakai “Ikymian Studios”.
- Hero: **Cerita, musik, dan ide yang menjadi visual.**
- Supporting line: **Series, music video, short film, dan tutorial dengan pendekatan kreatif berbasis AI.**
- CTA: **Lihat Karya** / **Diskusi Kolaborasi**.
- About awal: **Saya membuat series, music video, short film, dan tutorial, mengeksplorasi cara ide berkembang menjadi cerita dan visual melalui AI.** Sesuaikan lagi dengan proses dan peran yang benar.

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

Simpan snapshot publik dalam `data/stats.json` dan tampilkan tanggal pembaruan. Proses otomatis mengisi views; jumlah karya unik, completed campaigns, serta nominations dapat diisi dari catatan terverifikasi. Otomatisasi followers dan engagement ditentukan sesuai data serta akses platform yang tersedia. Selama sumber views belum terhubung, tampilkan belum tersedia; pengisian manual hanya boleh untuk preview lokal yang ditandai jelas, bukan dianggap penyelesaian fitur. Bentuk data minimum:

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

Lakukan pemeriksaan akses akun lebih dulu. Tentukan platform, akun pemilik, field tersedia, izin aplikasi, dan hosting yang mendukung pekerjaan server. Setelah lolos pemeriksaan itu, tambahkan rencana endpoint serta jadwal sinkronisasi dengan path yang sesuai hosting yang benar-benar dipilih. Jangan membangun endpoint spekulatif sekarang.

Alur minimum: API resmi → pembaruan di server → satu snapshot publik → halaman. Token tetap di server. Usulan interval awal 30–60 menit, disesuaikan kuota serta kebutuhan; jangan menjanjikan realtime per detik. Tampilkan tanggal pembaruan per sumber. Saat refresh gagal, pertahankan snapshot terakhir beserta waktunya; jika belum pernah ada data, tampilkan belum tersedia. Tidak menggunakan angka yang naik sendiri untuk menyimulasikan views.

Dasar kelayakan yang telah diperiksa:

- [YouTube Channels API](https://developers.google.com/youtube/data/reference/rest/v3/channels) menyediakan channel view count, subscriber count, dan public video count. Subscriber count dibulatkan, dan public video count bukan jumlah semua karya yang pernah dibuat.
- [TikTok Get User Info](https://developers.tiktok.com/docs/en/tiktok-api-v2-get-user-info) menyediakan follower count, likes count, dan public video count dengan scope `user.info.stats` serta otorisasi pengguna. Ini tidak menyediakan total views akun sebagai field pada endpoint tersebut. Penjumlahan views video perlu verifikasi endpoint video, pagination, cakupan, serta aksesnya secara terpisah.
- Dokumentasi Instagram Insights tidak berhasil dibaca pada pemeriksaan ini. Dukungan metrik dan kelayakan akun Instagram belum terverifikasi. Jangan menjanjikan sinkronisasi Instagram tanpa pemeriksaan lanjutan.

Jika akses salah satu platform tidak tersedia, laporkan batasannya dan tentukan cakupan yang bisa ditampilkan bersama pengguna. Jangan menyebut total lintas semua platform jika yang tersinkron hanya sebagian. Tampilkan waktu pembaruan sebenarnya; badge Live tidak boleh mengesankan pembaruan per detik atau menutupi data yang sudah lama.

## Aset yang dibutuhkan

Prioritas pertama: ejaan brand, logo jika ada, satu hero still, tautan karya dari empat kategori, poster karya, peran pada setiap karya, kontak bisnis, serta URL sosial asli. Series TikTok sudah memiliki tautan playlist tetapi belum memiliki aset lokal.

Prioritas berikutnya: klip preview 6–8 detik, showreel bila tersedia, bio final, daftar tools yang benar dipakai, data statistik beserta periode/sumber, bukti campaign selesai, dan bukti nominations. Pilih 6–8 karya setelah meninjau semua kategori; bukan mengarang karya untuk memenuhi kuota.

Setiap karya menggunakan nama folder stabil, misalnya `assets/works/berondong-sebelah-rumah/`. Target pertama di folder itu adalah `poster.webp` dan `preview.mp4` hanya ketika berkas asli tersedia. Hindari hotlink poster sementara yang URL-nya bisa kedaluwarsa.

## Acceptance criteria implementasi

1. Halaman langsung menjelaskan identitas kreator, empat format karya, dan cara menghubungi.
2. Hero terasa kalem dengan biru susu/pink/indigo di atas latar krim; teks tetap jelas.
3. Selected Works mewakili Series, Music Video, Short Film, dan Tutorial menggunakan karya nyata yang tersedia. Jika kategori belum memiliki aset, itu dicatat sebagai kebutuhan konten, bukan diisi karya palsu.
4. Playlist series yang diberikan dapat dibuka dari kartu karya. Tidak ada episode count yang ditebak.
5. Preview yang tersedia berdurasi sesuai label, diputar setelah tindakan pengguna, dan link karya lengkap tetap mudah ditemukan.
6. Enam kelompok metrik terwadahi. Nilai tidak tersedia tidak berubah menjadi angka palsu atau nol; total tidak dinyatakan lengkap jika sumbernya belum lengkap.
7. Tidak ada section prestasi/program kreator; nominations muncul pada Impact.
8. Link sosial dan email bisnis berasal dari data pengguna, bukan handle/email tebakan.
9. Layout berfungsi di lebar 375, 768, dan 1440 px, tanpa horizontal overflow; navigasi, link, dan pemutar dapat dipakai dengan keyboard. Teks normal memenuhi kontras minimum 4.5:1.
10. Website publik memiliki metadata domain yang benar, aset yang dapat dimuat, dan tidak membocorkan token. Deployment dan perubahan DNS tetap merupakan langkah terpisah yang memerlukan konfirmasi pengguna.
11. Total views diperbarui otomatis dari platform yang disepakati, dengan cakupan dan waktu pembaruan terlihat. Verifikasi sinkronisasi menggunakan respons API nyata; jika refresh gagal, snapshot terakhir tetap tersedia beserta waktunya. Angka manual dan animasi counter tidak membuktikan acceptance ini.

## Pembagian proyek: total 5 phase

Pembagian ini mengikuti Task 1–5 di bawah; tidak menambah fitur atau jalur implementasi kedua. Tujuan akhirnya satu landing page portfolio yang siap dipublikasikan di `ikymianstudios.si`, dengan total views media sosial diperbarui otomatis. Blog, CMS, dashboard admin, serta halaman tambahan berada di luar scope. Video asli, akun sosial, dan kredensial tetap tidak diubah selama perencanaan. Bootstrap DNS/SSL yang diminta terpisah dicatat di atas.

| Phase | Pekerjaan | Hasil dan syarat selesai |
| --- | --- | --- |
| 1 — Fondasi konten dan arah visual | Kunci identitas, susunan section, copy awal, palet warna, kandidat karya, kontak, akun sosial, dan daftar kebutuhan metrik | Brief implementasi pada rencana ini dan inventaris konten di `README.md` saat dieksekusi; data tersedia dan kebutuhan yang masih kurang dibedakan dengan jelas |
| 2 — Landing page responsif | Bangun navigasi, hero, struktur karya, Impact, About, dan Contact dengan warna krim/biru susu/pink/indigo | Preview lokal yang dapat ditinjau pada mobile dan desktop; struktur terbaca meski video dan data API belum tersedia |
| 3 — Karya dan preview video | Masukkan karya nyata, poster, kategori, peran, link video lengkap, serta preview dengan usulan durasi 8 detik | Karya dapat dilihat dan link dapat dibuka; tidak ada player kosong atau aset fiktif; showreel hanya jika tersedia |
| 4 — Statistik dan views otomatis | Periksa API serta hosting, bangun sinkronisasi views, tampilkan followers, engagement, jumlah video, completed campaigns, dan nominations sesuai sumbernya | Views benar-benar diperbarui otomatis pada platform yang disepakati; cakupan dan waktu pembaruan terlihat; snapshot terakhir tetap tersedia saat refresh gagal |
| 5 — Pemeriksaan akhir dan peluncuran | Finalisasi kontak, metadata, tampilan mobile, akses keyboard, performa pemuatan, serta kesiapan hosting/domain | Preview final lolos pemeriksaan terkait; peluncuran dan perubahan DNS dilakukan setelah konfirmasi pengguna |

### Rincian Phase 1

1. **Identitas:** pastikan ejaan Ikymian Studio/Studios, titel kreator, bio singkat, serta email bisnis.
2. **Struktur:** tetapkan Hero → Selected Works → Impact → About & Process → Contact. Showreel bersifat opsional; section poin 8 tidak dibuat.
3. **Arah visual:** tetapkan latar krim, campuran biru susu/pink/indigo pada hero, teks indigo gelap, serta tipografi dan jarak yang lapang. Tahap ini belum membuat UI final.
4. **Inventaris karya:** tinjau kandidat dari Series, Music Video, Short Film, dan Tutorial; catat judul, peran, link asli, poster, serta ketersediaan klip. Jumlah 6–8 adalah target kurasi, bukan alasan membuat konten fiktif.
5. **Inventaris statistik:** daftar akun/platform yang ingin dihitung, cakupan total views, sumber angka lain, serta kebutuhan akses API. Views otomatis sudah menjadi requirement; kelayakan koneksi dibuktikan di Phase 4.
6. **Kesiapan implementasi:** pisahkan materi yang siap dipakai dan yang belum tersedia, lalu dokumentasikan cara preview lokal. Phase 1 selesai ketika fondasi untuk mulai layout jelas; tidak perlu menunggu semua kredensial API.

**Batas Phase 1:** belum membuat halaman, mengolah video, menghubungkan API, atau melakukan deployment. Pemeriksaan cukup meninjau kelengkapan brief dan sumber konten; tidak perlu menambah tes atau dependencies. Setelah Phase 1, pekerjaan visual dapat dimulai menggunakan materi yang tersedia.

## Langkah implementasi

Langkah ini baru dijalankan setelah pengguna meminta implementasi. **Pilihan skill FE dari pengguna: Taste Skill v2 dari [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill), install name `design-taste-frontend`, mengikuti [guide v2](https://www.tasteskill.dev/guide).** Pengguna memberikan perintah `npx skills add Leonxlnx/taste-skill` sebagai sumber skill. Guide memberikan perintah terarah `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`. Gunakan skill ini sebagai panduan FE utama pada Phase 2–3, menggantikan pilihan @frontend-design sebelumnya, serta @executing-plans untuk menjalankan rencana. Pada saat pencatatan preferensi, skill lokal bernama `design-taste-frontend` sudah tersedia; belum ada instalasi atau upgrade yang dilakukan dan versi lokal belum dipastikan sebagai v2. Sebelum pengerjaan FE, pastikan versi yang akan dipakai sesuai sumber pilihan pengguna; jika instalasi diperlukan, pilih skill FE tersebut saja, bukan seluruh paket repo.

Brief pengguna tetap menjadi acuan: kalem, sederhana, campuran krim/biru susu/pink/indigo, dan gerak ringan. Default skill tentang palet, intensitas animasi, stack, atau proses tidak boleh menambah scope maupun mengganti keputusan proyek tanpa kebutuhan nyata. Tidak perlu mengaktifkan banyak skill desain sekaligus. Kerjakan satu alur, tanpa subagent secara default.

### Task 1: Kunci konten minimum

**Files:** Create `README.md`.

1. Catat brand, empat kategori, kontak, URL sosial, serta tautan playlist series yang sudah diketahui.
2. Susun daftar 6–8 kandidat karya dengan judul, kategori, peran, link asli, serta status poster dan preview. Periksa ulang URL dan kepemilikan kandidat playlist dari docs sebelum memublikasikannya sebagai karya kreator. Tandai kebutuhan aset yang belum diberikan.
3. Catat bahwa views wajib diperbarui otomatis. Tetapkan akun/platform, cakupan total, dan akses sumber metrik. Jangan memblokir pekerjaan layout pada kredensial yang belum tersedia.
4. Tuliskan cara preview lokal: `python3 -m http.server 4173 --bind 127.0.0.1`. Expected: server melayani folder di `http://127.0.0.1:4173`.

**Acceptance:** tidak ada fakta hasil tebakan; seluruh kebutuhan konten terlihat pada satu tempat.

### Task 2: Buat struktur halaman

**Files:** Create `index.html` and `styles.css`.

1. Buat HTML dengan `lang="id"`, viewport metadata, satu H1, skip link, header/nav, main, dan footer.
2. Isi section `#work`, `#impact`, `#about`, dan `#contact`, dengan hero dan showreel di bagian awal. Link CTA menggunakan anchor yang benar.
3. Terapkan token CSS di atas, heading responsif memakai `clamp()`, lebar konten, jarak section, dan grid karya 2 kolom/1 kolom.
4. Buka halaman pada 375 dan 1440 px. Expected: navigasi muat, hero terbaca, warna tidak menutupi teks, tidak ada overflow.

**Acceptance:** struktur dan arah visual dapat ditinjau tanpa JavaScript dan tanpa memerlukan video.

### Task 3: Masukkan karya dan preview

**Files:** Modify `index.html` and `styles.css`; create only asset files actually supplied under `assets/works/<slug>/`.

1. Masukkan karya yang sudah dipilih, dengan label kategori dan peran terverifikasi. Gunakan `loading="lazy"` serta dimensi/aspect ratio untuk poster di bawah fold.
2. Untuk Berondong Sebelah Rumah, hubungkan CTA ke URL playlist canonical. Gunakan layout kartu yang sama dengan karya lain.
3. Pasang native `<video controls playsinline preload="none">` hanya pada kartu dengan klip asli tersedia; poster dan link karya menjadi fallback saat tidak ada klip.
4. Periksa satu preview, video penuh, dan playlist pada desktop serta mobile. Expected: tidak autoplay, durasi cocok, orientasi portrait/landscape tidak terdistorsi, link dapat dibuka.

**Acceptance:** karya empat kategori terbaca sebagai satu portfolio dan aset yang belum ada tidak menghasilkan player rusak.

### Task 4: Tampilkan statistik yang benar

**Files:** Create `data/stats.json` and `main.js`; modify `index.html`.

1. Lakukan pemeriksaan kelayakan API untuk akun/platform yang disepakati dan pilih hosting yang mendukung sinkronisasi otomatis. Tulis task integrasi dengan path serta perintah konkret untuk hosting tersebut sebelum membuat kode server. Pembaruan otomatis views sudah diputuskan; yang belum diputuskan adalah sumber dan implementasinya.
2. Buat JSON sesuai kontrak di atas dan isi hanya data terverifikasi. Tambahkan elemen metrik di HTML dengan atribut `data-stat` serta elemen waktu pembaruan.
3. Untuk membaca snapshot publik, implementasi minimum `main.js` berikut. Total followers dan engagement dirender sebagai baris per platform saat datanya telah ditetapkan, menggunakan `textContent`, tanpa menyisipkan HTML dari respons.

```js
const formatter = new Intl.NumberFormat("id-ID");
const keys = [
  "totalViews", "videosCreated", "completedCampaigns", "nominations"
];

async function loadStats() {
  try {
    const response = await fetch("./data/stats.json");
    if (!response.ok) throw new Error("Stats unavailable");
    const stats = await response.json();

    for (const key of keys) {
      const element = document.querySelector(`[data-stat="${key}"]`);
      if (!element) continue;
      const value = stats[key];
      element.textContent = Number.isSafeInteger(value) && value >= 0
        ? formatter.format(value)
        : "Belum tersedia";
    }

    const updated = document.querySelector("[data-stats-updated]");
    const date = stats.updatedAt ? new Date(stats.updatedAt) : null;
    if (updated) {
      updated.textContent = date && !Number.isNaN(date.getTime())
        ? `Diperbarui ${date.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB`
        : "Waktu pembaruan belum tersedia";
    }
  } catch {
    document.querySelectorAll("[data-stat]").forEach((element) => {
      element.textContent = "Belum tersedia";
    });
  }
}

loadStats();
```

4. Periksa angka terverifikasi dan ulangi dengan request JSON diblokir melalui DevTools. Expected: angka serta tanggal benar pada jalur utama; kondisi gagal tetap menampilkan konten utama dan tidak menghasilkan angka palsu. Teks awal HTML harus sudah berbunyi “Belum tersedia” agar tetap benar tanpa JavaScript.

**Acceptance:** semua kelompok metrik terwadahi dengan sumber/periode jelas; total views benar-benar diperbarui melalui sinkronisasi API pada server. Cuplikan di atas hanya pembaca snapshot. Task ini belum selesai sebelum proses otomatis dan perilaku saat refresh gagal diverifikasi.

### Task 5: Kontak, metadata, dan pemeriksaan akhir

**Files:** Modify `index.html`, `styles.css`, `main.js`, and `README.md` only as needed; create `assets/og-cover.webp` only after a real approved image exists.

1. Pasang email dan URL sosial yang diberikan, bio final, tools yang benar dipakai, serta satu contoh proses nyata. Jangan tampilkan link `#` sebagai kontak.
2. Tambahkan title, description, canonical `https://ikymianstudios.si/`, dan Open Graph. Referensikan OG image hanya jika berkasnya benar tersedia.
3. Lakukan browser QA pada 375/768/1440 px, keyboard, kontras, network assets, serta console. Periksa poster, satu preview, satu link per kategori, playlist series, dan kontak. Expected: tidak ada overflow, aset 404, fokus hilang, atau error JavaScript.
4. Perbarui README dengan cara mengganti karya, metrik, aset, dan daftar kebutuhan yang tersisa. Siapkan catatan deployment; jangan mengubah DNS atau memublikasikan sebelum pengguna meminta dan mengonfirmasi langkah tersebut.

**Acceptance:** preview lokal siap ditinjau dan kebutuhan peluncuran jelas.

## Verifikasi dan batas tes

Tidak ada existing tests karena kode aplikasi belum dibuat. Untuk halaman statis ini, gunakan pemeriksaan browser yang langsung membuktikan acceptance, bukan menambah framework test, screenshot matrix, atau suite e2e. Dua pemeriksaan perilaku terpenting: jalur karya/preview/kontak normal dan kegagalan data statistik. Bila nanti ada integrasi server yang mengubah perilaku, tentukan paling banyak satu tes jalur utama dan satu jalur kegagalan kritis sesuai aturan pengguna; jangan membuat test infrastructure hanya demi rencana ini.

Tidak ada perintah npm/build/lint karena belum ada toolchain aplikasi. Halaman status sudah dibuat dan diperiksa melalui HTTP/HTTPS serta browser; portfolio lengkap belum diimplementasikan. Git sudah tersedia; ketika melakukan commit, sertakan hanya berkas terkait setelah unit pekerjaan selesai, dengan pesan sederhana seperti `feat: add portfolio layout`; jangan menggunakan `git add .` untuk mencakup aset atau kredensial yang belum ditinjau.

## Handoff

Rencana dapat dijalankan berurutan dalam sesi ini setelah diminta, atau di sesi terpisah menggunakan @executing-plans. Tidak perlu subagent untuk scope ini. Views otomatis sudah terkonfirmasi. Kelayakan API, akun/platform, hosting, serta kelengkapan aset masih harus ditetapkan untuk fitur yang bergantung padanya; hal tersebut tidak menghalangi peninjauan layout awal.
