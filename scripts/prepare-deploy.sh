#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY="$ROOT/deploy"
APP="$ROOT/Web Application"

mkdir -p "$DEPLOY"
cp "$APP/SprintKitchen_WebApp.html" "$DEPLOY/index.html"

if [ -n "${EMAILJS_PUBLIC_KEY:-}" ]; then
  cat > "$DEPLOY/emailjs-config.js" << EOF
const EMAILJS_PUBLIC_KEY           = '${EMAILJS_PUBLIC_KEY}';
const EMAILJS_SERVICE_ID           = '${EMAILJS_SERVICE_ID}';
const EMAILJS_TEMPLATE_ID          = '${EMAILJS_TEMPLATE_ID}';
const EMAILJS_CONFIRM_TEMPLATE_ID  = '${EMAILJS_CONFIRM_TEMPLATE_ID}';
const ADMIN_EMAIL = 'admin@sprintkitchen.pk';
const ADMIN_PASS  = 'Sprint@Admin2025';
const Staff_EMAIL = 'staff@sprintkitchen.pk';
const Staff_PASS = 'Staff@2025';
const Customer_EMAIL = 'customer@sprintkitchen.pk';
const Customer_PASS = 'Customer@2025';
EOF
else
  cp "$APP/emailjs-config.example.js" "$DEPLOY/emailjs-config.js"
fi

echo "Deploy bundle ready in deploy/"
