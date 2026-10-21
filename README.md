# Ikymian Studios

Portfolio di `https://ikymianstudios.si/` — Next.js + Payload CMS + SQLite,
Tailwind CSS v4, dan hero Three.js.

- Rencana: `docs/plans/2026-10-18-ikymian-portfolio.md`
- Inventaris konten & peta field CMS: `docs/plans/2026-10-18-ikymian-content-inventory.md`

## Stack

| Bagian | Teknologi |
| --- | --- |
| App | Next.js 15 (App Router) |
| CMS | Payload 3 + SQLite (`@payloadcms/db-sqlite`) |
| Style | Tailwind CSS v4 (token di `src/app/(frontend)/globals.css`) |
| Font | Bricolage Grotesque (display) + Instrument Sans (body) |
| Hero | Three.js blob cair (`src/components/LiquidScene.tsx`) |
| Bahasa | Cookie `lang` — `en` default, `id` |

## Lokal

```sh
pnpm install
pnpm dev
```

- Landing: `http://localhost:3000/`
- Admin: `http://localhost:3000/adminku`
- Database: `data/ikymian.db` — di luar Git
- Upload: `media/` — di luar Git
- Rahasia: `.env` (contoh di `.env.example`)

Seed idempoten:

```sh
ADMIN_EMAIL=admin@ikymianstudios.si ADMIN_PASSWORD='...' node scripts/seed.mjs
```

Jika database lokal perlu dibuat ulang: hentikan dev, hapus `data/ikymian.db`,
jalankan `pnpm dev`, lalu seed lagi.

## Produksi (VPS EZTOPUP)

| Item | Nilai |
| --- | --- |
| Server | `root@161.97.130.68` (host `vmi3330948`) |
| Domain | `ikymianstudios.si` — Cloudflare A record, DNS only |
| Checkout | `/var/www/ikymianstudios.si` (branch `setup/domain-bootstrap`) |
| Service | `ikymianstudios.service` (systemd, user `ikymian`) |
| App | `next start` di `127.0.0.1:3001` |
| Env | `/etc/ikymianstudios/env` (root:ikymian, 640) |
| Database | `/var/lib/ikymianstudios/data/ikymian.db` |
| Media | `/var/lib/ikymianstudios/media` |
| Nginx | reverse proxy ke `127.0.0.1:3001`, SSL Let's Encrypt |
| Password admin | `/root/ikymian-admin.txt` (root only) |

Port 3000 dipakai proyek lain (`eztu`) lewat PM2. Jangan mengubah PM2 atau
konfigurasi situs lain.

### Deploy pembaruan

```sh
sudo -u ikymian env HOME=/var/lib/ikymianstudios \
  git -C /var/www/ikymianstudios.si pull --ff-only

sudo -u ikymian bash -lc 'export HOME=/var/lib/ikymianstudios; \
  set -a; . /etc/ikymianstudios/env; set +a; \
  cd /var/www/ikymianstudios.si && \
  pnpm install --frozen-lockfile && pnpm payload migrate && pnpm build'

systemctl restart ikymianstudios
systemctl status ikymianstudios --no-pager
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3001/
```

Jalankan `pnpm payload migrate` setiap ada migrasi baru di `src/migrations`.
Saat ini Payload berjalan dengan `push: false` di production, jadi skema hanya
berubah lewat migrasi.

### Backup

```sh
STAMP=$(date +%F-%H%M)
sqlite3 /var/lib/ikymianstudios/data/ikymian.db \
  ".backup '/var/backups/ikymianstudios/ikymian-$STAMP.db'"
tar czf /var/backups/ikymianstudios/media-$STAMP.tar.gz \
  -C /var/lib/ikymianstudios media
```

Backup pertama sudah ada di `/var/backups/ikymianstudios/`.

### Rollback ke halaman statis

```sh
systemctl stop ikymianstudios
cp /root/backups-ikymian-*/nginx.conf.bak /etc/nginx/sites-available/ikymianstudios.si
nginx -t && systemctl reload nginx
```

Backup konfigurasi Nginx dan `index.html` lama ada di `/root/backups-ikymian-*`.

### Nginx

Konfigurasi di repo (`deploy/ikymianstudios.si.nginx.conf`) sudah berupa reverse
proxy. Pasang setelah ditinjau:

```sh
install -m 644 deploy/ikymianstudios.si.nginx.conf /etc/nginx/sites-available/ikymianstudios.si
nginx -t && systemctl reload nginx
```

## Statistik (Phase 4)

Sumber gratis **tidak resmi** (bisa berubah sewaktu-waktu):

- YouTube: Innertube `videos` tab (view video long-form) + socialcounts (subscriber)
- TikTok: markup profil publik (followers, likes, jumlah video)
- Instagram: biasanya diblokir, dilewati

```sh
sudo -u ikymian env HOME=/var/lib/ikymianstudios BASE_URL=http://127.0.0.1:3001 \
  ADMIN_EMAIL=admin@ikymianstudios.si ADMIN_PASSWORD='...' \
  node /var/www/ikymianstudios.si/scripts/sync-stats.mjs
```

`totalViews` hanya menjumlahkan platform yang menyediakan view; follower tetap
ditampilkan per platform. Penjadwalan otomatis belum dipasang.

## Catatan

- Metadata memakai `noindex, nofollow` sampai konten final. Hapus di
  `generateMetadata` (`src/app/(frontend)/page.tsx`) saat siap diindeks.
- Upload REST Payload 3.91 mengirim field tambahan sebagai satu field `_payload`
  berisi JSON, bukan field terpisah.

## Mengedit konten di admin

Masuk ke `/adminku` → **Globals → Home** untuk mengubah:

- **Hero stage** — teks kecil, ghost word, label CTA
- **Selected Works → Carousel** — kartu (judul, kicker, meta, gambar, link); urutan mengikuti daftar
- **About Me** — judul, lead, 3 paragraf, closing
- **About → Process Words** — kata yang berputar
- **About → Partners** — nama, logo (upload Media), invert, square
- **Contact** — email tujuan dan label CTA
- **Footer Marquee** — teks marquee besar

Header (nav), Footer (social & copyright), Stats, Projects, dan Media juga tetap bisa diedit dari admin.
Setelah mengubah skema, buat migration (`pnpm payload migrate:create <nama>`) dan jalankan `pnpm payload migrate` di production.
