import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = resolve(WEB, '..');
const THEME_SRC = resolve(ROOT, 'theme');
const DIST_DIR = resolve(ROOT, 'dist');
const STAGE_DIR = resolve(DIST_DIR, 'kinetik-submission');

const SHOPIFY_REF_PREFIX = 'shopify://';
const SAFE_SYSTEM_HANDLES = new Set(['frontpage']);
const SCHEMA_RE = /\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/;

const settingsSchema = JSON.parse(readFileSync(resolve(THEME_SRC, 'config/settings_schema.json'), 'utf8'));
const themeInfo = settingsSchema.find((block) => block.name === 'theme_info') || {};
const themeName = themeInfo.theme_name || 'theme';
const themeVersion = themeInfo.theme_version || '0.0.0';
const ZIP_NAME = `${themeName}-${themeVersion}.zip`;
const ZIP_PATH = resolve(DIST_DIR, ZIP_NAME);

function logStrip(relPath, fieldPath, oldValue) {
  console.log(`stripped: ${relPath} -> ${fieldPath}  ("${oldValue}" -> "")`);
}

function stripShopifyRefs(node, path, relPath, tally) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const childPath = `${path}[${i}]`;
      if (typeof item === 'string' && item.startsWith(SHOPIFY_REF_PREFIX)) {
        logStrip(relPath, childPath, item);
        node[i] = '';
        tally.count++;
      } else {
        stripShopifyRefs(item, childPath, relPath, tally);
      }
    });
    return;
  }
  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      const value = node[key];
      const childPath = path ? `${path}.${key}` : key;
      if (typeof value === 'string' && value.startsWith(SHOPIFY_REF_PREFIX)) {
        logStrip(relPath, childPath, value);
        node[key] = '';
        tally.count++;
      } else {
        stripShopifyRefs(value, childPath, relPath, tally);
      }
    }
  }
}

function extractSchema(liquidSource) {
  const match = liquidSource.match(SCHEMA_RE);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

const RESOURCE_SETTING_KINDS = ['product', 'collection', 'product_list', 'collection_list', 'page', 'blog', 'article'];

function collectResourceSettingIds(settingsArray) {
  const ids = Object.fromEntries(RESOURCE_SETTING_KINDS.map((kind) => [kind, []]));
  for (const setting of settingsArray || []) {
    if (setting && ids[setting.type]) ids[setting.type].push(setting.id);
  }
  return ids;
}

function buildSectionSchemaIndex(sectionsDir) {
  const index = {};
  if (!existsSync(sectionsDir)) return index;
  for (const file of readdirSync(sectionsDir).filter((name) => name.endsWith('.liquid'))) {
    const type = file.replace(/\.liquid$/, '');
    const schema = extractSchema(readFileSync(join(sectionsDir, file), 'utf8'));
    if (!schema) continue;
    const blocks = {};
    for (const block of schema.blocks || []) {
      if (!block.type || !block.settings) continue;
      blocks[block.type] = collectResourceSettingIds(block.settings);
    }
    index[type] = { ...collectResourceSettingIds(schema.settings), blocks };
  }
  return index;
}

function stripResourceSetting(settings, id, relPath, fieldPath, tally) {
  const value = settings[id];
  if (typeof value === 'string' && value !== '' && !SAFE_SYSTEM_HANDLES.has(value)) {
    logStrip(relPath, fieldPath, value);
    settings[id] = '';
    tally.count++;
  } else if (Array.isArray(value) && value.length) {
    logStrip(relPath, fieldPath, JSON.stringify(value));
    settings[id] = [];
    tally.count++;
  }
}

function stripDemoResourceRefs(data, relPath, schemaIndex, tally) {
  const sections = data.sections || {};
  for (const sectionKey of Object.keys(sections)) {
    const section = sections[sectionKey];
    const sectionSchema = schemaIndex[section.type];
    if (sectionSchema && section.settings) {
      for (const kind of RESOURCE_SETTING_KINDS) {
        for (const id of sectionSchema[kind]) {
          stripResourceSetting(section.settings, id, relPath, `sections.${sectionKey}.settings.${id}`, tally);
        }
      }
    }
    const blocks = section.blocks || {};
    for (const blockKey of Object.keys(blocks)) {
      const block = blocks[blockKey];
      const blockSchema = sectionSchema && sectionSchema.blocks[block.type];
      if (!blockSchema || !block.settings) continue;
      for (const kind of RESOURCE_SETTING_KINDS) {
        for (const id of blockSchema[kind]) {
          stripResourceSetting(block.settings, id, relPath, `sections.${sectionKey}.blocks.${blockKey}.settings.${id}`, tally);
        }
      }
    }
  }
}

function processJsonFile(absPath, relPath, tally, schemaIndex) {
  const data = JSON.parse(readFileSync(absPath, 'utf8'));
  stripShopifyRefs(data, '', relPath, tally);
  stripDemoResourceRefs(data, relPath, schemaIndex, tally);
  writeFileSync(absPath, `${JSON.stringify(data, null, 2)}\n`);
}

function listJsonFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isFile());
}

rmSync(STAGE_DIR, { recursive: true, force: true });
mkdirSync(DIST_DIR, { recursive: true });
cpSync(THEME_SRC, STAGE_DIR, {
  recursive: true,
  filter: (src) => !src.endsWith('.DS_Store'),
});

const tally = { count: 0 };
const schemaIndex = buildSectionSchemaIndex(resolve(STAGE_DIR, 'sections'));

for (const absPath of listJsonFiles(resolve(STAGE_DIR, 'templates'))) {
  processJsonFile(absPath, relative(STAGE_DIR, absPath), tally, schemaIndex);
}

for (const absPath of listJsonFiles(resolve(STAGE_DIR, 'sections'))) {
  processJsonFile(absPath, relative(STAGE_DIR, absPath), tally, schemaIndex);
}

const settingsDataPath = resolve(STAGE_DIR, 'config/settings_data.json');
if (existsSync(settingsDataPath)) {
  const relPath = relative(STAGE_DIR, settingsDataPath);
  const data = JSON.parse(readFileSync(settingsDataPath, 'utf8'));
  stripShopifyRefs(data, '', relPath, tally);
  writeFileSync(settingsDataPath, `${JSON.stringify(data, null, 2)}\n`);
}

const PRESET_LISTINGS = [
  { preset: 'Waypoint', folder: 'waypoint', template: 'index.json' },
  { preset: 'Carbon', folder: 'carbon', template: 'index.carbon.json' },
  { preset: 'Sand', folder: 'sand', template: 'index.sand.json' },
];
for (const { preset, folder, template } of PRESET_LISTINGS) {
  const src = resolve(STAGE_DIR, 'templates', template);
  if (!existsSync(src)) {
    console.log(`listings: skipped ${preset} (templates/${template} missing)`);
    continue;
  }
  const dest = resolve(STAGE_DIR, 'listings', folder, 'templates', 'index.json');
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, readFileSync(src));
  console.log(`listings: ${preset} (folder: ${folder}) <- templates/${template}`);
}

rmSync(ZIP_PATH, { force: true });
execSync('shopify theme package', { cwd: STAGE_DIR, stdio: 'inherit' });
cpSync(resolve(STAGE_DIR, ZIP_NAME), ZIP_PATH);
rmSync(resolve(STAGE_DIR, ZIP_NAME));

const zipStats = statSync(ZIP_PATH);
console.log('---');
console.log(`${tally.count} demo-only refs stripped (shopify:// resource URLs incl. config/settings_data.json + ${RESOURCE_SETTING_KINDS.join('/')} settings resolved from each section's schema)`);
console.log(`submission zip: ${relative(ROOT, ZIP_PATH)} (${(zipStats.size / 1024).toFixed(1)} KB)`);
console.log(`source theme/ left untouched — staged copy at ${relative(ROOT, STAGE_DIR)}`);
