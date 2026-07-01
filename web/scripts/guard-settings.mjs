#!/usr/bin/env node
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const themeDir = process.argv[2] || 'theme';
const asJson = process.argv.includes('--json');

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

const SIDEBAR_TYPES = new Set(['header', 'paragraph']);
const SHOPIFY_AUTO_SECTION = new Set(['id']);

function stripSchema(src) {
  return src.replace(/\{%-?\s*schema\s*-?%\}[\s\S]*?\{%-?\s*endschema\s*-?%\}/g, '');
}

function extractSchema(src) {
  const m = src.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch (e) {
    return { __parseError: e.message };
  }
}

function collectSettingIds(settings) {
  const ids = [];
  for (const s of settings || []) {
    if (!s || typeof s !== 'object') continue;
    if (SIDEBAR_TYPES.has(s.type)) continue;
    if (s.id) ids.push(s.id);
  }
  return ids;
}

function aliasVars(body, root) {
  const re = new RegExp('assign\\s+([a-zA-Z0-9_]+)\\s*=\\s*' + root.replace('.', '\\.') + '(?![.\[a-zA-Z0-9_])', 'g');
  const vars = new Set();
  let m;
  while ((m = re.exec(body))) vars.add(m[1]);
  return vars;
}

function refs(body, prefix) {
  const found = new Set();
  let src = body;
  let m;
  if (prefix === 'settings') {
    src = body.replace(/section\.settings/g, '§S§').replace(/block\.settings/g, '§B§');
  }
  const direct = new RegExp('(?<![.a-zA-Z0-9_])' + prefix.replace('.', '\\.') + '\\.([a-zA-Z0-9_]+)', 'g');
  while ((m = direct.exec(src))) found.add(m[1]);
  for (const v of aliasVars(body, prefix)) {
    const re = new RegExp('(?<![.a-zA-Z0-9_])' + v + '\\.([a-zA-Z0-9_]+)', 'g');
    while ((m = re.exec(body))) found.add(m[1]);
  }
  return found;
}

function blockHandles(body) {
  const collections = new Set(['section.blocks']);
  let m;
  const aliasRe = /assign\s+([a-zA-Z0-9_]+)\s*=\s*section\.blocks\b/g;
  while ((m = aliasRe.exec(body))) collections.add(m[1]);
  const handles = new Set(['block']);
  for (const coll of collections) {
    const forRe = new RegExp('for\\s+([a-zA-Z0-9_]+)\\s+in\\s+' + coll.replace('.', '\\.') + '\\b', 'g');
    while ((m = forRe.exec(body))) handles.add(m[1]);
  }
  return handles;
}

function blockRefs(body) {
  const found = new Set();
  let m;
  for (const h of blockHandles(body)) {
    const re = new RegExp('(?<![.a-zA-Z0-9_])' + h + '\\.settings\\.([a-zA-Z0-9_]+)', 'g');
    while ((m = re.exec(body))) found.add(m[1]);
    const aliasRe = new RegExp('assign\\s+([a-zA-Z0-9_]+)\\s*=\\s*' + h + '\\.settings(?![.\[a-zA-Z0-9_])', 'g');
    const av = new Set();
    let a;
    while ((a = aliasRe.exec(body))) av.add(a[1]);
    for (const v of av) {
      const re2 = new RegExp('(?<![.a-zA-Z0-9_])' + v + '\\.([a-zA-Z0-9_]+)', 'g');
      while ((m = re2.exec(body))) found.add(m[1]);
    }
  }
  return found;
}

function settingsAliasVars(body) {
  const vars = new Set(aliasVars(body, 'section.settings'));
  for (const h of blockHandles(body)) {
    const re = new RegExp('assign\\s+([a-zA-Z0-9_]+)\\s*=\\s*' + h + '\\.settings(?![.\[a-zA-Z0-9_])', 'g');
    let a;
    while ((a = re.exec(body))) vars.add(a[1]);
  }
  return vars;
}

const errors = [];
const warnings = [];

function scanSection(file) {
  const path = join(themeDir, 'sections', file);
  const src = readFileSync(path, 'utf8');
  const schema = extractSchema(src);
  const rel = `sections/${file}`;
  if (!schema) return;
  if (schema.__parseError) {
    errors.push(`${rel}: schema JSON parse error — ${schema.__parseError}`);
    return;
  }
  const body = stripSchema(src);
  const dynamicSettings =
    /\.settings\s*\[/.test(body) ||
    [...settingsAliasVars(body)].some((v) => new RegExp('(?<![.a-zA-Z0-9_])' + v + '\\s*\\[').test(body));
  const sink = dynamicSettings ? warnings : errors;
  const dynNote = dynamicSettings ? ' (dynamic settings[] access — verify manually)' : '';

  const sectionIds = collectSettingIds(schema.settings);
  const sectionRefs = refs(body, 'section.settings');
  for (const id of sectionIds) {
    if (!sectionRefs.has(id)) {
      sink.push(`${rel}: dead setting — section.settings.${id} declared in schema but never used in Liquid${dynNote}`);
    }
  }
  for (const r of sectionRefs) {
    if (SHOPIFY_AUTO_SECTION.has(r)) continue;
    if (!sectionIds.includes(r)) {
      errors.push(`${rel}: phantom reference — section.settings.${r} used in Liquid but not declared in schema`);
    }
  }

  const blockIds = new Set();
  let hasLocalBlocks = false;
  for (const b of schema.blocks || []) {
    if (!b || !b.settings) continue;
    if (typeof b.type === 'string' && (b.type.startsWith('@') )) continue;
    hasLocalBlocks = true;
    for (const id of collectSettingIds(b.settings)) blockIds.add(id);
  }
  const usedBlock = blockRefs(body);
  if (hasLocalBlocks) {
    for (const id of blockIds) {
      if (!usedBlock.has(id)) {
        sink.push(`${rel}: dead block setting — block.settings.${id} declared but never used in Liquid${dynNote}`);
      }
    }
  }
  for (const r of usedBlock) {
    if (!blockIds.has(r)) {
      errors.push(`${rel}: phantom block reference — block.settings.${r} used in Liquid but not declared in any block schema`);
    }
  }

  if (Array.isArray(schema.presets)) {
    for (const preset of schema.presets) {
      for (const k of Object.keys(preset.settings || {})) {
        if (!sectionIds.includes(k)) {
          errors.push(`${rel}: preset sets unknown setting "${k}" (not in schema.settings)`);
        }
      }
    }
  }
}

function scanGlobal() {
  const cfg = join(themeDir, 'config', 'settings_schema.json');
  if (!existsSync(cfg)) return;
  let schema;
  try {
    schema = JSON.parse(readFileSync(cfg, 'utf8'));
  } catch (e) {
    errors.push(`config/settings_schema.json: parse error — ${e.message}`);
    return;
  }
  const globalIds = new Set();
  for (const group of schema) {
    if (group.name === 'theme_info') continue;
    for (const id of collectSettingIds(group.settings)) globalIds.add(id);
  }

  const used = new Set();
  const dirs = ['sections', 'snippets', 'layout', 'blocks'];
  for (const d of dirs) {
    const dp = join(themeDir, d);
    if (!existsSync(dp)) continue;
    for (const f of readdirSync(dp)) {
      if (!f.endsWith('.liquid')) continue;
      const body = stripSchema(readFileSync(join(dp, f), 'utf8'));
      for (const r of refs(body, 'settings')) used.add(r);
    }
  }
  for (const id of globalIds) {
    if (!used.has(id)) {
      warnings.push(`config/settings_schema.json: global setting "${id}" declared but never referenced as settings.${id}`);
    }
  }
}

const sectionsDir = join(themeDir, 'sections');
const files = readdirSync(sectionsDir).filter((f) => f.endsWith('.liquid'));
for (const f of files) scanSection(f);
scanGlobal();

if (asJson) {
  console.log(JSON.stringify({ errors, warnings, sections: files.length }, null, 2));
} else {
  console.log(`${DIM}guard-settings — scanned ${files.length} sections in ${themeDir}${RESET}`);
  for (const w of warnings) console.log(`${YELLOW}[warn]${RESET} ${w}`);
  for (const e of errors) console.log(`${RED}[error]${RESET} ${e}`);
  if (errors.length === 0) {
    console.log(`${GREEN}[PASS]${RESET} settings guard — every schema setting is wired, no phantom references${warnings.length ? ` (${warnings.length} warnings)` : ''}`);
  } else {
    console.log(`${RED}[FAIL]${RESET} ${errors.length} settings binding error(s)`);
  }
}

process.exit(errors.length ? 1 : 0);
