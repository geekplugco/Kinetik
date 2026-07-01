#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const themeDir = process.argv[2] || 'theme';
const asJson = process.argv.includes('--json');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

const errors = [];
const warnings = [];

function stripSchema(src) {
  return src.replace(/\{%-?\s*schema\s*-?%\}[\s\S]*?\{%-?\s*endschema\s*-?%\}/g, '');
}
function stripJson(src) {
  return src.replace(/<script[^>]*type=["']application\/(ld\+)?json["'][^>]*>[\s\S]*?<\/script>/gi, '');
}
function lineOf(src, index) {
  return src.slice(0, index).split('\n').length;
}

function tags(body, name) {
  const re = new RegExp('<' + name + '\\b[^>]*>', 'gi');
  const out = [];
  let m;
  while ((m = re.exec(body))) out.push({ tag: m[0], index: m.index });
  return out;
}

function scanLiquid(rel, raw) {
  const body = stripJson(stripSchema(raw));

  for (const { tag, index } of tags(body, 'img')) {
    const ln = lineOf(body, index);
    if (!/\bwidth\s*=/.test(tag) || !/\bheight\s*=/.test(tag)) {
      errors.push(`${rel}:${ln}: <img> missing width/height (causes layout shift / CLS) — add both or use the image_tag filter`);
    }
    if (!/\bloading\s*=/.test(tag)) {
      errors.push(`${rel}:${ln}: <img> missing loading attribute — set loading="lazy" (or "eager" for the LCP image)`);
    }
  }

  for (const { tag, index } of tags(body, 'script')) {
    if (!/\bsrc\s*=/.test(tag)) continue;
    if (!/\bdefer\b/.test(tag) && !/\basync\b/.test(tag)) {
      errors.push(`${rel}:${lineOf(body, index)}: render-blocking <script src> without defer/async — add defer="defer"`);
    }
  }

  for (const { index } of tags(body, 'iframe')) {
    const tag = body.slice(index, body.indexOf('>', index) + 1);
    if (!/\bloading\s*=/.test(tag)) {
      errors.push(`${rel}:${lineOf(body, index)}: <iframe> missing loading="lazy" (blocks main thread on load)`);
    }
  }

  for (const { tag, index } of tags(body, 'video')) {
    if (/\bautoplay\b/.test(tag) && !/\bmuted\b/.test(tag)) {
      warnings.push(`${rel}:${lineOf(body, index)}: autoplay <video> without muted — browsers block it and it wastes bandwidth`);
    }
    if (/\bpreload\s*=\s*["']?auto/.test(tag)) {
      warnings.push(`${rel}:${lineOf(body, index)}: <video preload="auto"> eagerly downloads full media — prefer preload="metadata"/"none"`);
    }
  }

  let m;
  const scriptTag = /\|\s*script_tag\b/g;
  while ((m = scriptTag.exec(body))) {
    errors.push(`${rel}:${lineOf(body, m.index)}: | script_tag renders a render-blocking <script> — emit <script ... defer="defer"> instead`);
  }
  const stylesheetTag = /\|\s*stylesheet_tag\b/g;
  while ((m = stylesheetTag.exec(body))) {
    warnings.push(`${rel}:${lineOf(body, m.index)}: | stylesheet_tag is render-blocking — consider preload + onload swap or a single theme stylesheet`);
  }
  const noWidthImg = /\|\s*image_url\s*(?:\|\|)?\s*}}/g;
  while ((m = noWidthImg.exec(body))) {
    warnings.push(`${rel}:${lineOf(body, m.index)}: image_url without a width: serves the master image — pass width: to cap payload`);
  }
}

function scanFonts(rel, raw) {
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(raw)) {
    const idx = raw.search(/fonts\.g(oogleapis|static)\.com/);
    errors.push(`${rel}:${lineOf(raw, idx)}: Google Fonts reference — use Shopify font_picker + font_url (self-hosted) for performance & Theme Store compliance`);
  }
}

function scanCss(rel, raw) {
  scanFonts(rel, raw);
  let m;
  const atImport = /@import\s+(url\()?["']/g;
  while ((m = atImport.exec(raw))) {
    warnings.push(`${rel}:${lineOf(raw, m.index)}: CSS @import is render-blocking and serializes downloads — inline or bundle instead`);
  }
}

function walk(dir, exts, fn) {
  const dp = join(themeDir, dir);
  if (!existsSync(dp)) return;
  for (const f of readdirSync(dp)) {
    if (!exts.some((e) => f.endsWith(e))) continue;
    fn(`${dir}/${f}`, readFileSync(join(dp, f), 'utf8'));
  }
}

for (const dir of ['layout', 'sections', 'snippets', 'blocks']) {
  walk(dir, ['.liquid'], (rel, raw) => {
    scanLiquid(rel, raw);
    scanFonts(rel, raw);
  });
}
walk('assets', ['.css'], scanCss);

if (asJson) {
  console.log(JSON.stringify({ errors, warnings }, null, 2));
} else {
  console.log(`${DIM}guard-perf — scanned ${themeDir} (img/script/iframe/video/fonts/css)${RESET}`);
  for (const w of warnings) console.log(`${YELLOW}[warn]${RESET} ${w}`);
  for (const e of errors) console.log(`${RED}[error]${RESET} ${e}`);
  if (errors.length === 0) {
    console.log(`${GREEN}[PASS]${RESET} perf guard — no render-blocking/CLS violations${warnings.length ? ` (${warnings.length} warnings)` : ''}`);
  } else {
    console.log(`${RED}[FAIL]${RESET} ${errors.length} performance violation(s)`);
  }
}

process.exit(errors.length ? 1 : 0);
