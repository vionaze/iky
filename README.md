# Ikymian Studios

Halaman awal untuk pemeriksaan domain `https://ikymianstudios.si/`.
Rencana portfolio tersedia di `docs/plans/2026-10-18-ikymian-portfolio.md`.
Inventaris konten dan peta field CMS (Phase 1) ada di
`docs/plans/2026-10-18-ikymian-content-inventory.md`.

## Preview lokal

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Buka `http://127.0.0.1:4173/`.

Halaman `index.html` kini menampilkan portfolio statis: hero, lima episode series,
tiga tautan karya, Impact, About dengan logo mitra, dan Contact. Toggle bahasa
memakai `localStorage`; versi CMS nanti memakai cookie. CMS (Phase 2) berjalan
terpisah di port 3000 dan belum menggantikan halaman statis ini.
Seluruh halaman memakai latar terang. Bahasa default **Inggris (EN)**; toggle ke
Indonesia (ID) tersimpan di `localStorage`.

## VPS

- Server: koneksi EZTOPUP di Termius.
- Repository: `https://github.com/vionaze/iky.git`.
- Checkout: `/var/www/ikymianstudios.si`.
- Document root: `/var/www/ikymianstudios.si`.
- Domain utama: `ikymianstudios.si`.
- Cloudflare: record A domain utama ke `161.97.130.68`, DNS only.
- Nginx: `/etc/nginx/sites-available/ikymianstudios.si`.

Halaman berada langsung di `/var/www/ikymianstudios.si/index.html`.
Tidak ada folder `www` tambahan. Nginx menolak akses ke dotfiles, `docs`, dan `deploy`.

## Status deployment

- Halaman status sudah terpasang dari branch `setup/domain-bootstrap`.
- HTTPS memakai sertifikat Let's Encrypt, berlaku sampai 16 Januari 2027.
- HTTP dialihkan ke HTTPS.
- Renewal otomatis memakai Certbot dan timer yang sudah tersedia di VPS.
- Konfigurasi Nginx di repo adalah konfigurasi HTTPS final; sertifikat di server
  harus sudah tersedia sebelum konfigurasi ini dimuat.

Sertifikat pertama diterbitkan setelah konfigurasi HTTP dan DNS aktif:

```sh
certbot --nginx --non-interactive --redirect -d ikymianstudios.si
certbot renew --cert-name ikymianstudios.si --dry-run --non-interactive --no-random-sleep-on-renew
```

## Pembaruan manual

Sesuaikan branch setelah PR digabung. Jangan ubah konfigurasi situs lain.

```sh
cd /var/www/ikymianstudios.si
git pull --ff-only
```

Jika konfigurasi Nginx pada repo berubah, setelah ditinjau:

```sh
install -m 644 deploy/ikymianstudios.si.nginx.conf /etc/nginx/sites-available/ikymianstudios.si
nginx -t && systemctl reload nginx
```

Tidak ada auto-deploy atau workflow GitHub Actions pada tahap ini. Perubahan
ditinjau lewat pull request, lalu checkout VPS dapat diperbarui secara manual.

## Landing (Phase 3)

Landing baru berjalan di `http://localhost:3000/` (Next.js). Halaman statis
`index.html` masih menjadi halaman live di domain sampai deployment diarahkan ke
aplikasi Next.

- Tailwind CSS v4 dengan token di `src/app/(frontend)/globals.css`
- Display: Bricolage Grotesque; body: Instrument Sans (`next/font`)
- Hero memakai Three.js (`src/components/LiquidScene.tsx`): blob cair biru-pink,
  menghormati `prefers-reduced-motion`, berhenti saat tab/elemen tidak terlihat
- Bahasa via cookie `lang` (`en` default, `id`), tombol di header
- Responsif 390 / 768 / 1440 px
- Konten utama dibaca dari globals Payload (Header, Home, Footer) dengan fallback
  kamus di `src/lib/i18n.ts`; locale dari cookie `lang`

## CMS (Phase 2)

Aplikasi Next.js + Payload CMS + SQLite berada di root repo. Halaman statis
`index.html` tetap dipakai sampai landing dipindahkan ke Next.js pada Phase 3.

```sh
pnpm install
pnpm dev
```

- Admin: `http://localhost:3000/adminku`
- Akun pertama sudah dibuat: `admin@ikymianstudios.si` (ganti password lewat menu Account)
- Database: `data/ikymian.db` — di luar Git
- Upload: `media/` — di luar Git
- Rahasia: `.env` — di luar Git, contoh pada `.env.example`
- Bahasa admin: default `en`, tersedia `id`

Catatan Payload 3.91: upload lewat REST mengirim field tambahan sebagai satu field
`_payload` berisi JSON, bukan field terpisah.
