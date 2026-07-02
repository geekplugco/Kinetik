#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const themeDir = args.find((a) => !a.startsWith('--')) || join(repoRoot, 'theme');
const asJson = args.includes('--json');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

const errors = [];
const warnings = [];
const stylesheetLinks = [];
const JS_WARN = 30 * 1024;
const JS_ERROR = 60 * 1024;
const CSS_WARN = 150 * 1024;

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
    if (/\bsrc\s*=\s*["'](https?:)?\/\//.test(tag)) {
      errors.push(`${rel}:${lineOf(body, index)}: external <script src> — third-party JS adds a blocking origin and fails Theme Store review; bundle it as an asset`);
    }
  }

  for (const { tag, index } of tags(body, 'link')) {
    if (!/\brel\s*=\s*["']stylesheet["']/i.test(tag)) continue;
    if (/\bonload\s*=/.test(tag) || /\bmedia\s*=\s*["']print["']/.test(tag)) continue;
    stylesheetLinks.push(`${rel}:${lineOf(body, index)}`);
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
  const fontFace = /\|\s*font_face(?::[^}%]*)?/g;
  while ((m = fontFace.exec(body))) {
    if (!/font_display/.test(m[0])) {
      warnings.push(`${rel}:${lineOf(body, m.index)}: font_face without font_display — pass font_display: 'swap' to avoid invisible text while fonts load`);
    }
  }
  const imageTag = /\|\s*image_tag(?::[^}%]*)?/g;
  while ((m = imageTag.exec(body))) {
    if (!/\bloading\s*:/.test(m[0])) {
      errors.push(`${rel}:${lineOf(body, m.index)}: image_tag without loading: — decide lazy (below fold) or eager (LCP) explicitly`);
    }
    if (!/\bwidths\s*:/.test(m[0])) {
      warnings.push(`${rel}:${lineOf(body, m.index)}: image_tag without widths: — no srcset means one fixed payload for every viewport and DPR`);
    }
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

if (stylesheetLinks.length > 1) {
  warnings.push(`${stylesheetLinks.length} render-blocking <link rel="stylesheet"> tags (${stylesheetLinks.join(', ')}) — bundle into a single theme stylesheet`);
}

const assetsDir = join(themeDir, 'assets');
if (existsSync(assetsDir)) {
  for (const f of readdirSync(assetsDir)) {
    const size = statSync(join(assetsDir, f)).size;
    if (f.endsWith('.js')) {
      if (size > JS_ERROR) errors.push(`assets/${f}: ${(size / 1024).toFixed(1)}KB JS — exceeds ${JS_ERROR / 1024}KB budget; split or trim before it taxes every page`);
      else if (size > JS_WARN) warnings.push(`assets/${f}: ${(size / 1024).toFixed(1)}KB JS — over the ${JS_WARN / 1024}KB soft budget`);
    } else if (f.endsWith('.css') && size > CSS_WARN) {
      warnings.push(`assets/${f}: ${(size / 1024).toFixed(1)}KB CSS — over the ${CSS_WARN / 1024}KB soft budget`);
    }
  }
}

if (asJson) {
  console.log(JSON.stringify({ errors, warnings }, null, 2));
} else {
  console.log(`${DIM}guard-perf — scanned ${themeDir} (img/image_tag/script/iframe/video/fonts/css/budgets)${RESET}`);
  for (const w of warnings) console.log(`${YELLOW}[warn]${RESET} ${w}`);
  for (const e of errors) console.log(`${RED}[error]${RESET} ${e}`);
  if (errors.length === 0) {
    console.log(`${GREEN}[PASS]${RESET} perf guard — no render-blocking/CLS violations${warnings.length ? ` (${warnings.length} warnings)` : ''}`);
  } else {
    console.log(`${RED}[FAIL]${RESET} ${errors.length} performance violation(s)`);
  }
}

process.exit(errors.length ? 1 : 0);
