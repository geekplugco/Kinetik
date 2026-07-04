#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const themeDir = args.find((a) => !a.startsWith('--')) || join(repoRoot, 'theme');
const asJson = args.includes('--json');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';

const WINDOW = 45;
const RAW_ACCENT = /(?:^|[\s"'{:])((?:hover|focus|group-hover|group-focus-within)[^\s"']*:)?text-accent(?![-\w])/;
const DARK_MARKER = /theme-dark|bg-ink-9|from-ink-950|via-ink-950|mix-blend-difference|text-paper/;
const OPT_OUT = 'data-accent-ok';

const errors = [];
const dirs = ['sections', 'snippets', 'layout'].map((d) => join(themeDir, d)).filter(existsSync);

for (const dir of dirs) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.liquid')) continue;
    const path = join(dir, file);
    const lines = readFileSync(path, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (!RAW_ACCENT.test(line)) return;
      if (line.includes(OPT_OUT)) return;
      const lo = Math.max(0, i - WINDOW);
      const hi = Math.min(lines.length, i + WINDOW + 1);
      const context = lines.slice(lo, hi).join('\n');
      if (DARK_MARKER.test(context)) return;
      errors.push({ file: path.replace(themeDir + '/', ''), line: i + 1, text: line.trim().slice(0, 100) });
    });
  }
}

if (asJson) {
  console.log(JSON.stringify({ errors, warnings: [] }, null, 2));
} else {
  for (const e of errors) {
    console.log(`${RED}[FAIL]${RESET} ${e.file}:${e.line} raw text-accent on non-dark surface`);
    console.log(`       ${e.text}`);
  }
  if (errors.length === 0) {
    console.log(`${GREEN}[PASS]${RESET} contrast guard — raw text-accent only on dark surfaces (use text-accent-press on scheme backgrounds; ${OPT_OUT} for brand marks)`);
  } else {
    console.log(`${RED}${errors.length} violation(s)${RESET} — volt on light fails 4.5:1. Fix: text-accent-press, or add ${OPT_OUT} for logo/decorative exemptions.`);
  }
}
process.exit(errors.length > 0 ? 1 : 0);
