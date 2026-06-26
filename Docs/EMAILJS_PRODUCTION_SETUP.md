# Live Email on Production — Setup Guide

This guide enables **real EmailJS emails** on the deployed site:

**https://shayannoorullah.github.io/Sprint-Kitchen/**

The app sends two emails:

1. **Feedback request** — when staff marks an order as *Delivered*
2. **Feedback confirmation** — when a customer submits feedback

---

## Part 1 — EmailJS account (you do this)

### Step 1: Create an account

1. Go to [https://www.emailjs.com](https://www.emailjs.com) and sign up (free tier: 200 emails/month).
2. Open the [EmailJS dashboard](https://dashboard.emailjs.com).

### Step 2: Connect an email service

1. Dashboard → **Email Services** → **Add New Service**.
2. Choose **Gmail** (easiest) or another provider.
3. Follow the connection steps and note the **Service ID** (e.g. `service_abc123`).

### Step 3: Allow your production domain

**Required** — without this, emails fail from the live site.

1. Dashboard → **Account** → **Security**.
2. Under **Allowed Origins**, add:
   ```
   https://shayannoorullah.github.io
   ```
3. For local testing, also add:
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   ```
4. Save.

### Step 4: Get your Public Key

1. Dashboard → **Account** → **General**.
2. Copy the **Public Key** (e.g. `yiEF63NsRSIvsfVPJ`).

### Step 5: Create Template 1 — Feedback Request

1. Dashboard → **Email Templates** → **Create New Template**.
2. Set **To Email** to: `{{to_email}}`
3. Set **Subject** to:
   ```
   Your Sprint Kitchen order {{order_id}} has been delivered — share your feedback
   ```
4. Switch to **HTML** mode and paste the body from:
   `docs/email-templates/feedback-request.html`
5. Save and copy the **Template ID** (e.g. `template_xyz789`).

### Step 6: Create Template 2 — Feedback Confirmation

1. Create another template.
2. Set **To Email** to: `{{to_email}}`
3. Set **Subject** to:
   ```
   Thank you for your feedback — Sprint Kitchen ({{order_id}})
   ```
4. Paste the body from:
   `docs/email-templates/feedback-confirmation.html`
5. Save and copy the **Template ID**.

---

## Part 2 — GitHub secrets (you do this)

Production keys are injected at deploy time — they are **never committed** to the repo.

1. Open: [github.com/ShayanNoorullah/Sprint-Kitchen/settings/secrets/actions](https://github.com/ShayanNoorullah/Sprint-Kitchen/settings/secrets/actions)
2. Click **New repository secret** for each row:

| Secret name | Value (from EmailJS) |
|-------------|----------------------|
| `EMAILJS_PUBLIC_KEY` | Public Key |
| `EMAILJS_SERVICE_ID` | Service ID |
| `EMAILJS_TEMPLATE_ID` | Feedback Request template ID |
| `EMAILJS_CONFIRM_TEMPLATE_ID` | Feedback Confirmation template ID |

---

## Part 3 — Redeploy (you do this)

1. Go to [Actions → Deploy to GitHub Pages](https://github.com/ShayanNoorullah/Sprint-Kitchen/actions/workflows/deploy.yml).
2. Click **Run workflow** → **Run workflow** (branch: `main`).
3. Wait for the job to finish. The build log should say:
   `EmailJS secrets detected — live email enabled on production.`

---

## Part 4 — Test on the live site

1. Open [https://shayannoorullah.github.io/Sprint-Kitchen/](https://shayannoorullah.github.io/Sprint-Kitchen/)
2. Log in as **Customer** (`customer@sprintkitchen.pk` / `Customer@2025`).
3. Place an order using **your real email address** at checkout.
4. Log in as **Staff** (`staff@sprintkitchen.pk` / `Staff@2025`).
5. Go to **Orders** → change that order’s status to **Delivered**.
6. Check your inbox for the feedback-request email.
7. Click the feedback link, submit a rating — you should receive the confirmation email.

**If email fails:** open browser DevTools (F12) → **Console** and look for `EmailJS` errors. Common fixes:

| Problem | Fix |
|---------|-----|
| `Origin not allowed` | Add `https://shayannoorullah.github.io` to EmailJS Allowed Origins |
| Wrong template variables | Ensure templates use `{{to_email}}`, `{{customer_name}}`, etc. exactly |
| Gmail not connected | Reconnect the email service in EmailJS dashboard |
| Free tier exceeded | Check usage under EmailJS → Account |

---

## Optional — Local development with live email

```bash
cd Sprint-Kitchen
cp "Web Application/emailjs-config.example.js" "Web Application/emailjs-config.js"
# Edit emailjs-config.js with your real keys
npm run preview
```

Or build with env vars:

```powershell
$env:EMAILJS_PUBLIC_KEY="your_key"
$env:EMAILJS_SERVICE_ID="your_service"
$env:EMAILJS_TEMPLATE_ID="your_template"
$env:EMAILJS_CONFIRM_TEMPLATE_ID="your_confirm_template"
npm run prepare:deploy
npm run preview:deploy
```
