import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = new URL('../../theme/', import.meta.url).pathname;
const WRITE = process.argv.includes('--write');

const TRANSLATABLE = ['label', 'info', 'placeholder'];

function setDeep(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const k = path[i];
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
    cur = cur[k];
  }
  cur[path[path.length - 1]] = value;
}

function isLiteral(v) {
  return typeof v === 'string' && v.trim() !== '' && !v.startsWith('t:');
}

function transformSettings(settings, baseKey, locale, stats) {
  if (!Array.isArray(settings)) return;
  const counters = {};
  for (const s of settings) {
    if (!s || typeof s !== 'object') continue;
    if (!s.id) {
      const tag = s.type === 'paragraph' ? 'paragraph' : s.type === 'header' ? 'header' : null;
      if (!tag) continue;
      counters[tag] = (counters[tag] || 0) + 1;
      const slot = `${tag}__${counters[tag]}`;
      if (isLiteral(s.content)) {
        const path = [...baseKey, 'settings', slot, 'content'];
        setDeep(locale, path, s.content);
        s.content = 't:' + path.join('.');
        stats.n++;
      }
      continue;
    }
    for (const field of TRANSLATABLE) {
      if (isLiteral(s[field])) {
        const path = [...baseKey, 'settings', s.id, field];
        setDeep(locale, path, s[field]);
        s[field] = 't:' + path.join('.');
        stats.n++;
      }
    }
    if (Array.isArray(s.options)) {
      s.options.forEach((opt, i) => {
        if (opt && isLiteral(opt.label)) {
          const path = [...baseKey, 'settings', s.id, `options__${i + 1}`, 'label'];
          setDeep(locale, path, opt.label);
          opt.label = 't:' + path.join('.');
          stats.n++;
        }
      });
    }
  }
}

function transformSchema(schema, rootKey, locale, stats) {
  if (isLiteral(schema.name)) {
    const path = [...rootKey, 'name'];
    setDeep(locale, path, schema.name);
    schema.name = 't:' + path.join('.');
    stats.n++;
  }
  transformSettings(schema.settings, rootKey, locale, stats);

  if (Array.isArray(schema.blocks)) {
    for (const b of schema.blocks) {
      if (!b || typeof b !== 'object') continue;
      if (typeof b.type === 'string' && b.type.startsWith('@')) continue;
      if (!b.type) continue;
      const bkey = [...rootKey, 'blocks', b.type];
      if (isLiteral(b.name)) {
        const path = [...bkey, 'name'];
        setDeep(locale, path, b.name);
        b.name = 't:' + path.join('.');
        stats.n++;
      }
      transformSettings(b.settings, bkey, locale, stats);
    }
  }

  if (Array.isArray(schema.presets)) {
    const named = schema.presets.filter((p) => p && isLiteral(p.name));
    schema.presets.forEach((p, i) => {
      if (!p || !isLiteral(p.name)) return;
      const slot = named.length === 1 ? 'name' : `name__${i + 1}`;
      const path = [...rootKey, 'presets', slot];
      setDeep(locale, path, p.name);
      p.name = 't:' + path.join('.');
      stats.n++;
    });
  }
}

const SCHEMA_RE = /({%-?\s*schema\s*-?%})([\s\S]*?)({%-?\s*endschema\s*-?%})/;

function processLiquid(dir, kind, locale, stats) {
  const files = readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.liquid'));
  for (const file of files) {
    const full = join(ROOT, dir, file);
    const src = readFileSync(full, 'utf8');
    const m = src.match(SCHEMA_RE);
    if (!m) continue;
    let schema;
    try {
      schema = JSON.parse(m[2]);
    } catch (e) {
      stats.errors.push(`${dir}/${file}: ${e.message}`);
      continue;
    }
    const type = basename(file, '.liquid');
    const rootKey = kind === 'section' ? ['sections', type] : ['blocks', type];
    transformSchema(schema, rootKey, locale, stats);
    const out = m[1] + '\n' + JSON.stringify(schema, null, 2) + '\n' + m[3];
    const newSrc = src.replace(SCHEMA_RE, () => out);
    if (WRITE) writeFileSync(full, newSrc);
  }
}

function processSettingsSchema(locale, stats) {
  const full = join(ROOT, 'config/settings_schema.json');
  const arr = JSON.parse(readFileSync(full, 'utf8'));
  for (const group of arr) {
    if (!group || group.name === 'theme_info') continue;
    if (!isLiteral(group.name)) continue;
    const slug = group.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    const gkey = ['settings_schema', slug];
    const path = [...gkey, 'name'];
    setDeep(locale, path, group.name);
    group.name = 't:' + path.join('.');
    stats.n++;
    transformSettings(group.settings, gkey, locale, stats);
  }
  if (WRITE) writeFileSync(full, JSON.stringify(arr, null, 2) + '\n');
}

const locale = {};
const stats = { n: 0, errors: [] };

processLiquid('sections', 'section', locale, stats);
processLiquid('blocks', 'block', locale, stats);
processSettingsSchema(locale, stats);

const sorted = JSON.stringify(locale, null, 2) + '\n';
if (WRITE) writeFileSync(join(ROOT, 'locales/en.default.schema.json'), sorted);

console.log(`[i18n-schema] ${WRITE ? 'WROTE' : 'DRY-RUN'} — ${stats.n} labels keyed`);
console.log(`  sections: ${readdirSync(join(ROOT, 'sections')).filter((f) => f.endsWith('.liquid')).length}, blocks: ${readdirSync(join(ROOT, 'blocks')).filter((f) => f.endsWith('.liquid')).length}`);
const topKeys = Object.keys(locale).map((k) => `${k}(${Object.keys(locale[k]).length})`).join(', ');
console.log(`  locale roots: ${topKeys}`);
if (stats.errors.length) {
  console.log(`  PARSE ERRORS (${stats.errors.length}):`);
  stats.errors.forEach((e) => console.log('   - ' + e));
}
