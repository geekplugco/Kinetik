import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(WEB, 'tailwind-theme-entry.css');
const out = resolve(WEB, '../theme/assets/tailwind.css');

execSync(`bunx @tailwindcss/cli@4 -i "${entry}" -o "${out}"`, { stdio: 'inherit', cwd: WEB });

const googleFonts = /@import\s+(url\()?["']?[^"']*fonts\.googleapis\.com[^"']*["']?\)?\s*;/g;
const css = readFileSync(out, 'utf8').replace(googleFonts, '');
writeFileSync(out, css);
console.log(`theme/assets/tailwind.css — ${css.length} bytes, scanned theme/**/*.liquid, Google Fonts stripped`);
