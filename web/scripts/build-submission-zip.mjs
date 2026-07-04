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
const MEGA_PANEL_TYPE = 'mega_panel';

const settingsSchema = JSON.parse(readFileSync(resolve(THEME_SRC, 'config/settings_schema.json'), 'utf8'));
const themeInfo = settingsSchema.find((block) => block.name === 'theme_info') || {};
const themeVersion = themeInfo.theme_version || '0.0.0';
const ZIP_PATH = resolve(DIST_DIR, `kinetik-theme-${themeVersion}-submission.zip`);

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

function stripMegaPanelCollections(data, relPath, tally) {
  const sections = data.sections || {};
  for (const sectionKey of Object.keys(sections)) {
    const blocks = sections[sectionKey].blocks || {};
    for (const blockKey of Object.keys(blocks)) {
      const block = blocks[blockKey];
      if (block.type !== MEGA_PANEL_TYPE) continue;
      const settings = block.settings || {};
      if (typeof settings.collection === 'string' && settings.collection !== '') {
        const fieldPath = `sections.${sectionKey}.blocks.${blockKey}.settings.collection`;
        logStrip(relPath, fieldPath, settings.collection);
        settings.collection = '';
        tally.count++;
      }
    }
  }
}

function processJsonFile(absPath, relPath, tally, extra) {
  const data = JSON.parse(readFileSync(absPath, 'utf8'));
  stripShopifyRefs(data, '', relPath, tally);
  if (extra) extra(data, relPath, tally);
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

for (const absPath of listJsonFiles(resolve(STAGE_DIR, 'templates'))) {
  processJsonFile(absPath, relative(STAGE_DIR, absPath), tally);
}

for (const absPath of listJsonFiles(resolve(STAGE_DIR, 'sections'))) {
  const relPath = relative(STAGE_DIR, absPath);
  const extra = absPath.endsWith('header-group.json') ? stripMegaPanelCollections : undefined;
  processJsonFile(absPath, relPath, tally, extra);
}

const PRESET_LISTINGS = [
  { preset: 'Kinetik', folder: 'kinetik', template: 'index.json' },
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
execSync(`zip -r -X -q "${ZIP_PATH}" .`, { cwd: STAGE_DIR, stdio: 'inherit' });

const zipStats = statSync(ZIP_PATH);
console.log('---');
console.log(`${tally.count} demo-only refs stripped (shopify:// resource URLs + header-group.json mega_panel collection handles)`);
console.log(`submission zip: ${relative(ROOT, ZIP_PATH)} (${(zipStats.size / 1024).toFixed(1)} KB)`);
console.log(`source theme/ left untouched — staged copy at ${relative(ROOT, STAGE_DIR)}`);
