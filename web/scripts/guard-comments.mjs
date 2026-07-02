import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const root = args.find((a) => !a.startsWith('--')) || join(repoRoot, 'theme');
const scanExts = ['.liquid', '.js'];
const skipDirs = new Set(['scripts', 'node_modules', '.git']);
const violations = [];

function blankRanges(text, re) {
  return text.replace(re, (m) => m.replace(/[^\n]/g, ' '));
}

function record(file, line, kind, text) {
  violations.push({ file, line: line + 1, kind, text: text.trim().slice(0, 72) });
}

function scanLiquid(file, text) {
  let masked = blankRanges(text, /\{%-?\s*doc\s*-?%\}[\s\S]*?\{%-?\s*enddoc\s*-?%\}/g);
  masked.split('\n').forEach((line, i) => {
    if (/\{%-?\s*comment\s*-?%\}/.test(line)) record(file, i, 'liquid-comment-tag', line);
    if (/<!--/.test(line)) record(file, i, 'html-comment', line);
    const inline = line.match(/\{%-?\s*#\s*([\s\S]*?)-?%\}/);
    if (inline && !/theme-check-(disable|enable)/.test(inline[1])) record(file, i, 'liquid-inline-comment', line);
  });
}

function scanJs(file, text) {
  const masked = blankRanges(text, /(['"`])(?:\\[\s\S]|(?!\1)[^\\])*\1/g);
  masked.split('\n').forEach((line, i) => {
    if (/(^|[^:])\/\//.test(line)) record(file, i, 'js-line-comment', text.split('\n')[i]);
    if (/\/\*/.test(line)) record(file, i, 'js-block-comment', text.split('\n')[i]);
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const ext = extname(p);
    if (!scanExts.includes(ext)) continue;
    const text = readFileSync(p, 'utf8');
    if (ext === '.liquid') scanLiquid(p, text);
    else scanJs(p, text);
  }
}

if (!existsSync(root)) {
  console.error('[FAIL] comment guard — root not found: ' + root);
  process.exit(1);
}

walk(root);

if (asJson) {
  const errors = violations.map((v) => relative(root, v.file) + ':' + v.line + ' [' + v.kind + '] ' + v.text);
  console.log(JSON.stringify({ errors, warnings: [] }, null, 2));
  process.exit(violations.length ? 1 : 0);
}

if (violations.length === 0) {
  console.log('[PASS] comment guard — no disallowed comments under ' + root);
  process.exit(0);
}

const byKind = {};
for (const v of violations) byKind[v.kind] = (byKind[v.kind] || 0) + 1;
console.log('[FAIL] comment guard — ' + violations.length + ' disallowed comment(s)');
for (const k of Object.keys(byKind).sort()) console.log('  ' + k + ': ' + byKind[k]);
console.log('---');
for (const v of violations) console.log('  ' + relative(root, v.file) + ':' + v.line + '  [' + v.kind + ']  ' + v.text);
process.exit(1);
