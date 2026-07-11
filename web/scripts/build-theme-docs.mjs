import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DESCRIPTIONS, GAP_REASONS } from './theme-section-descriptions.mjs';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = resolve(WEB, '..');
const THEME = resolve(ROOT, process.argv[2] || 'theme');
const OUT = resolve(ROOT, 'docs/merchant');
const SCREENSHOTS_DIR = resolve(ROOT, 'docs/screenshots/sections');
const SCHEMA_RE = /\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/;

const schemaLocale = existsSync(join(THEME, 'locales/en.default.schema.json'))
  ? JSON.parse(readFileSync(join(THEME, 'locales/en.default.schema.json'), 'utf8'))
  : {};

function t(value) {
  if (typeof value !== 'string' || !value.startsWith('t:')) return value ?? '';
  let node = schemaLocale;
  for (const key of value.slice(2).split('.')) {
    node = node && typeof node === 'object' ? node[key] : undefined;
  }
  return typeof node === 'string' ? node : value;
}

function humanType(setting) {
  const opts = setting.options;
  switch (setting.type) {
    case 'checkbox': return 'Toggle';
    case 'range': return `Slider ${setting.min}–${setting.max}${setting.unit || ''}`;
    case 'select': case 'radio': return `Choose: ${(opts || []).map((o) => t(o.label)).join(' / ')}`;
    case 'color': case 'color_background': return 'Color';
    case 'color_scheme': return 'Color scheme';
    case 'color_scheme_group': return 'Palette editor (per scheme)';
    case 'font_picker': return 'Font';
    case 'image_picker': return 'Image';
    case 'video': case 'video_url': return 'Video';
    case 'collection': case 'collection_list': return 'Collection';
    case 'product': case 'product_list': return 'Product';
    case 'blog': return 'Blog';
    case 'article': return 'Article';
    case 'page': return 'Page';
    case 'url': return 'Link';
    case 'link_list': return 'Menu';
    case 'richtext': case 'inline_richtext': case 'html': case 'liquid': return 'Rich text';
    case 'number': return 'Number';
    case 'text': return 'Text';
    case 'textarea': return 'Text (multi-line)';
    default: return setting.type;
  }
}

function fmtDefault(setting) {
  if (setting.default === undefined || setting.default === '') return '—';
  if (setting.type === 'range') return `${setting.default}${setting.unit || ''}`;
  if (setting.type === 'checkbox') return setting.default ? 'On' : 'Off';
  const s = String(setting.default).replace(/<[^>]+>/g, '').trim();
  return s.length > 40 ? s.slice(0, 40) + '…' : (s || '—');
}

function settingsTable(settings) {
  const rows = (settings || []).filter((s) => s.id);
  if (!rows.length) return '_No configurable settings._\n';
  let out = '| Setting | Control | Default |\n|---|---|---|\n';
  for (const s of rows) {
    const label = t(s.label) || s.id.replace(/[_-]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    const info = t(s.info);
    out += `| ${label}${info ? ` <br/><sub>${info}</sub>` : ''} | ${humanType(s)} | ${fmtDefault(s)} |\n`;
  }
  return out;
}

const themeInfo = JSON.parse(readFileSync(join(THEME, 'config/settings_schema.json'), 'utf8'));
const info = themeInfo.find((b) => b.name === 'theme_info') || {};
const NAME = info.theme_name || 'Theme';
const VERSION = info.theme_version || '';
mkdirSync(OUT, { recursive: true });

// ---- Global settings reference ----
let g = `# ${NAME} — theme settings reference\n\n> Auto-generated from \`config/settings_schema.json\` (v${VERSION}). Theme settings → **Settings** panel in the editor.\n\n`;
for (const group of themeInfo) {
  if (group.name === 'theme_info') continue;
  g += `## ${t(group.name)}\n\n${settingsTable(group.settings)}\n`;
}
writeFileSync(join(OUT, 'settings-reference.md'), g);

// ---- Sections reference ----
const sectionsDir = join(THEME, 'sections');
const files = readdirSync(sectionsDir).filter((f) => f.endsWith('.liquid')).sort();
let sec = `# ${NAME} — sections reference\n\n> Auto-generated from each section's schema (v${VERSION}). Add sections via **Add section** in the theme editor.\n> Screenshots are captured live from waypoint-demo.myshopify.com by \`web/scripts/build-theme-screenshots.mjs\`; sections with no screenshot say why below their table.\n\n`;
let count = 0;
let withScreenshot = 0;
for (const f of files) {
  const src = readFileSync(join(sectionsDir, f), 'utf8');
  const m = src.match(SCHEMA_RE);
  if (!m) continue;
  let schema;
  try { schema = JSON.parse(m[1]); } catch { continue; }
  const type = basename(f, '.liquid');
  const name = t(schema.name) || type;
  const presets = (schema.presets || []).map((p) => t(p.name)).filter(Boolean);
  const blocks = (schema.blocks || []).map((b) => t(b.name) || b.type).filter(Boolean);
  sec += `## ${name}\n\n`;
  sec += `\`sections/${f}\`${presets.length ? ` · Presets: ${presets.join(', ')}` : ''}\n\n`;
  if (DESCRIPTIONS[type]) sec += `${DESCRIPTIONS[type]}\n\n`;
  const screenshotPath = resolve(SCREENSHOTS_DIR, `${type}.png`);
  if (existsSync(screenshotPath)) {
    sec += `![${name} section on Waypoint](/screenshots/sections/${type}.png)\n\n`;
    withScreenshot++;
  } else if (GAP_REASONS[type]) {
    sec += `_No screenshot: ${GAP_REASONS[type]}_\n\n`;
  }
  if (blocks.length) sec += `**Content blocks:** ${blocks.join(', ')}\n\n`;
  sec += settingsTable(schema.settings) + '\n';
  count++;
}
writeFileSync(join(OUT, 'sections-reference.md'), sec);

console.log(`docs generated for ${NAME} v${VERSION}:`);
console.log(`  docs/merchant/settings-reference.md (${themeInfo.length - 1} setting groups)`);
console.log(`  docs/merchant/sections-reference.md (${count} sections, ${withScreenshot} with a live screenshot)`);
