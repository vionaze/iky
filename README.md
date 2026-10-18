# Ikymian Studios

Halaman awal untuk pemeriksaan domain `https://ikymianstudios.si/`.
Rencana portfolio tersedia di `docs/plans/2026-10-18-ikymian-portfolio.md`.

## Preview lokal

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Buka `http://127.0.0.1:4173/`.

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

## Pemasangan awal

Gunakan Nginx dan Certbot yang sudah tersedia di VPS. Jangan ubah konfigurasi
situs lain. Untuk repo kosong, buat branch dasar `main` sebelum membuka PR.

```sh
git clone --branch setup/domain-bootstrap https://github.com/vionaze/iky.git /var/www/ikymianstudios.si
install -m 644 /var/www/ikymianstudios.si/deploy/ikymianstudios.si.nginx.conf /etc/nginx/sites-available/ikymianstudios.si
ln -s /etc/nginx/sites-available/ikymianstudios.si /etc/nginx/sites-enabled/ikymianstudios.si
nginx -t && systemctl reload nginx
```

Aktifkan sertifikat setelah DNS mengarah ke VPS dan halaman HTTP dapat diakses.
Status penerbitan sertifikat dan perintah pembaruan dicatat setelah verifikasi.

Tidak ada auto-deploy atau workflow GitHub Actions pada tahap ini. Perubahan
ditinjau lewat pull request, lalu checkout VPS dapat diperbarui secara manual.
