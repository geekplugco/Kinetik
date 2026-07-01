import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';

const root = process.argv[2] || 'theme';
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
  text.split('\n').forEach((line, i) => {
    const code = line.replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '');
    if (/(^|[^:])\/\//.test(code)) record(file, i, 'js-line-comment', line);
    if (/\/\*/.test(code)) record(file, i, 'js-block-comment', line);
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

walk(root);

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
