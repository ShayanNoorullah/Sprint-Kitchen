/*
 * Sprint Kitchen — EmailJS Configuration TEMPLATE
 * ─────────────────────────────────────────────────────────────────
 * Copy this file to emailjs-config.js and fill in your real keys.
 * The real emailjs-config.js is gitignored — only this example
 * file gets committed.
 * ─────────────────────────────────────────────────────────────────
 *
 * HOW TO GET EACH VALUE:
 *
 *  EMAILJS_PUBLIC_KEY
 *    dashboard.emailjs.com → Account → General → Public Key
 *    Looks like: "yiEF63NsRSIvsfVPJ"
 *
 *  EMAILJS_SERVICE_ID
 *    dashboard.emailjs.com → Email Services → your service row → Service ID
 *    Looks like: "service_rptz17g"
 *
 *  EMAILJS_TEMPLATE_ID  (Feedback-request email — sent automatically on delivery)
 *    dashboard.emailjs.com → Email Templates → your template row → Template ID
 *    Looks like: "template_p1pagsb"
 *    Required template variables:
 *      {{to_email}}       — recipient email address
 *      {{customer_name}}  — customer's full name
 *      {{order_id}}       — e.g. SK-500001
 *      {{order_items}}    — comma-separated list of ordered items
 *      {{order_total}}    — e.g. Rs.1249
 *      {{feedback_link}}  — full URL to the feedback page with the order pre-filled
 *
 *  EMAILJS_CONFIRM_TEMPLATE_ID  (Thank-you confirmation — sent after customer submits feedback)
 *    Create a second template in EmailJS for this purpose.
 *    Looks like: "template_xxxxxxx"
 *    Required template variables:
 *      {{to_email}}       — recipient email address
 *      {{customer_name}}  — customer's full name
 *      {{order_id}}       — e.g. SK-500001
 *      {{rating}}         — e.g. 5/5
 *      {{comment}}        — the feedback comment the customer wrote
 *
 *  PRODUCTION (GitHub Pages):
 *    1. EmailJS dashboard → Account → Security → Allowed Origins:
 *       https://shayannoorullah.github.io
 *    2. Add the four EMAILJS_* values as GitHub Actions secrets (see docs/EMAILJS_PRODUCTION_SETUP.md)
 *    3. Re-run the "Deploy to GitHub Pages" workflow
 */

const EMAILJS_PUBLIC_KEY           = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID           = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID          = 'YOUR_FEEDBACK_REQUEST_TEMPLATE_ID';
const EMAILJS_CONFIRM_TEMPLATE_ID  = 'YOUR_CONFIRM_TEMPLATE_ID';

/* ════════════════════════════════
   ADMIN CREDENTIALS (hardcoded, no registration)
════════════════════════════════ */
const ADMIN_EMAIL = 'admin@sprintkitchen.pk';
const ADMIN_PASS  = 'Sprint@Admin2025';

const Staff_EMAIL = 'staff@sprintkitchen.pk';
const Staff_PASS = 'Staff@2025';

const Customer_EMAIL = 'customer@sprintkitchen.pk';
const Customer_PASS = 'Customer@2025';
