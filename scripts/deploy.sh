#!/usr/bin/env bash
# Zero(ish)-downtime deploy: build to .next-build, swap, restart, health check + rollback.
set -euo pipefail

APP_DIR="/var/www/ikymianstudios.si"
BRANCH="${BRANCH:-setup/domain-bootstrap}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:3001/}"

cd "$APP_DIR"

echo "==> Pull $BRANCH"
sudo -u ikymian git -C "$APP_DIR" pull --ff-only origin "$BRANCH"

echo "==> Load env"
set -a
# shellcheck disable=SC1091
. /etc/ikymianstudios/env
set +a

echo "==> Install"
pnpm install --frozen-lockfile

echo "==> Migrate"
pnpm payload migrate

echo "==> Build to .next-build (server stays online)"
rm -rf .next-build
NEXT_DIST_DIR=.next-build pnpm build

echo "==> Swap build"
pm2 stop ikymian >/dev/null 2>&1 || true
rm -rf .next-prev
mv .next .next-prev
mv .next-build .next
pm2 start ikymian >/dev/null 2>&1 || pm2 restart ikymian >/dev/null 2>&1

echo "==> Health check"
for _ in $(seq 1 10); do
  if curl -fsS -o /dev/null --max-time 5 "$HEALTH_URL"; then
    pm2 save >/dev/null 2>&1 || true
    rm -rf .next-prev
    echo "Deploy OK"
    exit 0
  fi
  sleep 2
done

echo "!! Health check failed — rolling back"
pm2 stop ikymian >/dev/null 2>&1 || true
rm -rf .next
mv .next-prev .next
pm2 start ikymian >/dev/null 2>&1 || true
exit 1
