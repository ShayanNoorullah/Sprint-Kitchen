import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appDir = join(root, 'Web Application');
const deployDir = join(root, 'deploy');

const {
  EMAILJS_PUBLIC_KEY = '',
  EMAILJS_SERVICE_ID = '',
  EMAILJS_TEMPLATE_ID = '',
  EMAILJS_CONFIRM_TEMPLATE_ID = '',
} = process.env;

await mkdir(deployDir, { recursive: true });
await copyFile(
  join(appDir, 'SprintKitchen_WebApp.html'),
  join(deployDir, 'index.html')
);

if (EMAILJS_PUBLIC_KEY) {
  await writeFile(
    join(deployDir, 'emailjs-config.js'),
    `const EMAILJS_PUBLIC_KEY           = '${EMAILJS_PUBLIC_KEY}';
const EMAILJS_SERVICE_ID           = '${EMAILJS_SERVICE_ID}';
const EMAILJS_TEMPLATE_ID          = '${EMAILJS_TEMPLATE_ID}';
const EMAILJS_CONFIRM_TEMPLATE_ID  = '${EMAILJS_CONFIRM_TEMPLATE_ID}';
const ADMIN_EMAIL = 'admin@sprintkitchen.pk';
const ADMIN_PASS  = 'Sprint@Admin2025';
const Staff_EMAIL = 'staff@sprintkitchen.pk';
const Staff_PASS = 'Staff@2025';
const Customer_EMAIL = 'customer@sprintkitchen.pk';
const Customer_PASS = 'Customer@2025';
`
  );
} else {
  await copyFile(
    join(appDir, 'emailjs-config.example.js'),
    join(deployDir, 'emailjs-config.js')
  );
}

console.log('Deploy bundle ready in deploy/');
