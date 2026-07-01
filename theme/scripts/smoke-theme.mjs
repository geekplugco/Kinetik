#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

function rel(file) {
  return file.split(path.sep).join('/');
}

function full(file) {
  return path.join(root, file);
}

function exists(file) {
  return fs.existsSync(full(file));
}

function read(file) {
  return fs.readFileSync(full(file), 'utf8');
}

function addError(file, message) {
  errors.push(`${rel(file)}: ${message}`);
}

function addWarning(file, message) {
  warnings.push(`${rel(file)}: ${message}`);
}

function parseJson(file) {
  try {
    return JSON.parse(read(file));
  } catch (error) {
    addError(file, `Invalid JSON (${error.message})`);
    return null;
  }
}

function walk(dir, predicate = () => true) {
  if (!exists(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(full(dir), { withFileTypes: true })) {
    const file = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(file, predicate));
    } else if (predicate(file)) {
      out.push(file);
    }
  }
  return out.sort();
}

function getPath(obj, dotted) {
  return dotted.split('.').reduce((value, key) => {
    if (value && Object.prototype.hasOwnProperty.call(value, key)) return value[key];
    return undefined;
  }, obj);
}

const localeSchema = parseJson('locales/en.default.schema.json') || {};
const localeText = parseJson('locales/en.default.json') || {};
const allowedSettingsDataMetadata = new Set(['mode']);

function validateTranslation(file, value, context) {
  if (typeof value !== 'string' || !value.startsWith('t:')) return;
  const key = value.slice(2);
  if (getPath(localeSchema, key) === undefined && getPath(localeText, key) === undefined) {
    addError(file, `Missing translation key "${value}" in ${context}`);
  }
}

function validateTranslatedFields(file, obj, context) {
  for (const key of ['label', 'name', 'info', 'content']) {
    validateTranslation(file, obj?.[key], `${context}.${key}`);
  }
}

function numeric(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function collectSettings(file, settings, context) {
  const map = new Map();
  const seen = new Set();

  for (const setting of settings || []) {
    validateTranslatedFields(file, setting, context);

    if (setting.options) {
      const values = new Set();
      for (const option of setting.options) {
        validateTranslation(file, option.label, `${context}.${setting.id || setting.type}.option`);
        if (option.value === undefined || option.value === '') {
          addError(file, `${context}: ${setting.id || setting.type} has an option with an empty value`);
        } else if (values.has(option.value)) {
          addError(file, `${context}: ${setting.id || setting.type} has duplicate option value "${option.value}"`);
        }
        values.add(option.value);
      }
    }

    if (setting.type === 'range') {
      for (const key of ['min', 'max', 'step']) {
        if (!numeric(setting[key])) addError(file, `${context}: range setting "${setting.id}" must have numeric ${key}`);
      }
      if (numeric(setting.min) && numeric(setting.max) && setting.min > setting.max) {
        addError(file, `${context}: range setting "${setting.id}" has min greater than max`);
      }
      if (numeric(setting.step) && setting.step <= 0) {
        addError(file, `${context}: range setting "${setting.id}" must have a positive step`);
      }
    }

    if (!setting.id) continue;
    if (seen.has(setting.id)) {
      addError(file, `${context}: duplicate setting id "${setting.id}"`);
    }
    seen.add(setting.id);
    map.set(setting.id, setting);

    if (Object.prototype.hasOwnProperty.call(setting, 'default')) {
      validateSettingValue(file, `${context}.${setting.id}.default`, setting, setting.default);
    }
  }

  return map;
}

function optionValues(setting) {
  return new Set((setting.options || []).map((option) => option.value));
}

function validateSettingValue(file, context, setting, value) {
  if (value === null || value === undefined) return;

  if ((setting.type === 'select' || setting.type === 'radio') && setting.options) {
    if (!optionValues(setting).has(value)) {
      addError(file, `${context}: "${value}" is not one of the allowed options for "${setting.id}"`);
    }
  }

  if (setting.type === 'range') {
    if (!numeric(value)) {
      addError(file, `${context}: expected a number for range setting "${setting.id}"`);
    } else {
      if (numeric(setting.min) && value < setting.min) addError(file, `${context}: ${value} is below min ${setting.min}`);
      if (numeric(setting.max) && value > setting.max) addError(file, `${context}: ${value} is above max ${setting.max}`);
    }
  }

  if (setting.type === 'checkbox' && typeof value !== 'boolean') {
    addError(file, `${context}: expected a boolean for checkbox setting "${setting.id}"`);
  }

  if (setting.type === 'number' && !numeric(value)) {
    addError(file, `${context}: expected a number for number setting "${setting.id}"`);
  }
}

function validateSettingsObject(file, context, values, settingMap) {
  if (!values) return;
  for (const [key, value] of Object.entries(values)) {
    const setting = settingMap.get(key);
    if (!setting) {
      addError(file, `${context}: unknown setting "${key}"`);
      continue;
    }
    validateSettingValue(file, `${context}.${key}`, setting, value);
  }
}

function extractSectionSchema(file) {
  const source = read(file);
  const match = source.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (!match) {
    addWarning(file, 'No schema block found');
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    addError(file, `Invalid section schema JSON (${error.message})`);
    return null;
  }
}

function sectionTypeFromFile(file) {
  return path.basename(file, '.liquid');
}

function validateBlockDefinition(file, sectionType, block) {
  validateTranslatedFields(file, block, `section ${sectionType} block ${block.type}`);
  const settingMap = collectSettings(file, block.settings || [], `section ${sectionType} block ${block.type}`);
  return { ...block, settingMap };
}

const sectionSchemas = new Map();
const themeBlockSchemas = new Map();

for (const file of walk('blocks', (item) => item.endsWith('.liquid'))) {
  const schema = extractSectionSchema(file);
  if (!schema) continue;

  const blockType = path.basename(file, '.liquid');
  validateTranslatedFields(file, schema, `theme block ${blockType}`);
  const settingMap = collectSettings(file, schema.settings || [], `theme block ${blockType}`);
  themeBlockSchemas.set(blockType, { file, schema, settingMap });

  for (const [index, preset] of (schema.presets || []).entries()) {
    validateTranslatedFields(file, preset, `theme block ${blockType} preset ${index + 1}`);
    validateSettingsObject(file, `theme block ${blockType} preset ${index + 1}`, preset.settings, settingMap);
  }
}

for (const file of walk('sections', (item) => item.endsWith('.liquid'))) {
  const schema = extractSectionSchema(file);
  if (!schema) continue;

  const sectionType = sectionTypeFromFile(file);
  validateTranslatedFields(file, schema, `section ${sectionType}`);
  const settingMap = collectSettings(file, schema.settings || [], `section ${sectionType}`);
  const blocks = new Map();

  for (const block of schema.blocks || []) {
    if (!block.type) {
      addError(file, `section ${sectionType}: block definition is missing type`);
      continue;
    }
    if (blocks.has(block.type)) {
      addError(file, `section ${sectionType}: duplicate block type "${block.type}"`);
    }
    blocks.set(block.type, validateBlockDefinition(file, sectionType, block));
  }

  sectionSchemas.set(sectionType, { file, schema, settingMap, blocks });

  for (const [index, preset] of (schema.presets || []).entries()) {
    validateTranslatedFields(file, preset, `section ${sectionType} preset ${index + 1}`);
    validateSettingsObject(file, `section ${sectionType} preset ${index + 1}`, preset.settings, settingMap);
    validatePresetBlocks(file, sectionType, preset, blocks);
  }
}

function presetBlockEntries(blocks) {
  if (!blocks) return [];
  if (Array.isArray(blocks)) return blocks.map((block, index) => [`${index}`, block]);
  return Object.entries(blocks);
}

function validatePresetBlocks(file, sectionType, preset, blockDefs) {
  for (const [blockId, block] of presetBlockEntries(preset.blocks)) {
    if (!block?.type) {
      addError(file, `section ${sectionType} preset block "${blockId}" is missing type`);
      continue;
    }
    const definition = blockDefs.get(block.type);
    const themeDefinition = blockDefs.has('@theme') ? themeBlockSchemas.get(block.type) : null;
    if (!definition && !themeDefinition) {
      addError(file, `section ${sectionType} preset block "${blockId}" uses unknown block type "${block.type}"`);
      continue;
    }
    validateSettingsObject(file, `section ${sectionType} preset block ${blockId}`, block.settings, (definition || themeDefinition).settingMap);
  }
}

const settingsSchema = parseJson('config/settings_schema.json') || [];
const globalSettings = new Map();
const colorSchemeDefinition = new Map();

for (const [groupIndex, group] of settingsSchema.entries()) {
  validateTranslation('config/settings_schema.json', group.name, `settings_schema group ${groupIndex + 1}.name`);
  for (const setting of group.settings || []) {
    if (setting.type === 'color_scheme_group') {
      for (const roleSetting of setting.definition || []) {
        colorSchemeDefinition.set(roleSetting.id, roleSetting);
      }
      continue;
    }
  }
  const groupMap = collectSettings('config/settings_schema.json', group.settings || [], `settings_schema group ${groupIndex + 1}`);
  for (const [id, setting] of groupMap) {
    if (globalSettings.has(id)) addError('config/settings_schema.json', `duplicate global setting id "${id}"`);
    globalSettings.set(id, setting);
  }
}

const settingsData = parseJson('config/settings_data.json') || {};
validateSettingsDataScope('config/settings_data.json', 'current', settingsData.current || {});
for (const [presetName, presetValues] of Object.entries(settingsData.presets || {})) {
  validateSettingsDataScope('config/settings_data.json', `preset "${presetName}"`, presetValues);
}

function validateSettingsDataScope(file, context, values) {
  for (const [key, value] of Object.entries(values || {})) {
    const setting = globalSettings.get(key);
    if (!setting) {
      if (allowedSettingsDataMetadata.has(key)) continue;
      addError(file, `${context}: unknown global setting "${key}"`);
      continue;
    }
    if (setting.type === 'color_scheme_group') {
      validateColorSchemes(file, `${context}.${key}`, value);
    } else {
      validateSettingValue(file, `${context}.${key}`, setting, value);
    }
  }
}

function validateColorSchemes(file, context, schemes) {
  if (!schemes || typeof schemes !== 'object' || Array.isArray(schemes)) {
    addError(file, `${context}: expected an object of color schemes`);
    return;
  }
  for (const [schemeId, scheme] of Object.entries(schemes)) {
    if (!scheme.settings || typeof scheme.settings !== 'object') {
      addError(file, `${context}.${schemeId}: expected settings object`);
      continue;
    }
    for (const key of Object.keys(scheme.settings)) {
      if (!colorSchemeDefinition.has(key)) {
        addError(file, `${context}.${schemeId}: unknown color role "${key}"`);
      }
    }
  }
}

function validateSectionInstance(file, sectionId, instance) {
  if (!instance?.type) {
    addError(file, `section "${sectionId}" is missing type`);
    return;
  }

  const section = sectionSchemas.get(instance.type);
  if (!section) {
    addError(file, `section "${sectionId}" references missing section type "${instance.type}"`);
    return;
  }

  validateSettingsObject(file, `section "${sectionId}"`, instance.settings, section.settingMap);

  const blocks = instance.blocks || {};
  const blockIds = new Set(Object.keys(blocks));
  for (const [blockId, block] of Object.entries(blocks)) {
    if (!block?.type) {
      addError(file, `section "${sectionId}" block "${blockId}" is missing type`);
      continue;
    }
    if (block.type === '@app') continue;
    const definition = section.blocks.get(block.type);
    const themeDefinition = section.blocks.has('@theme') ? themeBlockSchemas.get(block.type) : null;
    if (!definition && !themeDefinition) {
      addError(file, `section "${sectionId}" block "${blockId}" references unknown block type "${block.type}"`);
      continue;
    }
    validateSettingsObject(file, `section "${sectionId}" block "${blockId}"`, block.settings, (definition || themeDefinition).settingMap);
  }

  for (const blockId of instance.block_order || []) {
    if (!blockIds.has(blockId)) {
      addError(file, `section "${sectionId}" block_order references missing block "${blockId}"`);
    }
  }
}

function validateJsonTemplate(file, json) {
  const sections = json?.sections || {};
  const sectionIds = new Set(Object.keys(sections));
  for (const [sectionId, instance] of Object.entries(sections)) {
    validateSectionInstance(file, sectionId, instance);
  }
  for (const sectionId of json?.order || []) {
    if (!sectionIds.has(sectionId)) {
      addError(file, `order references missing section "${sectionId}"`);
    }
  }
}

for (const file of walk('templates', (item) => item.endsWith('.json'))) {
  const json = parseJson(file);
  if (json) validateJsonTemplate(file, json);
}

for (const file of walk('sections', (item) => item.endsWith('.json'))) {
  const json = parseJson(file);
  if (json) validateJsonTemplate(file, json);
}

const liquidFiles = [
  ...walk('layout', (item) => item.endsWith('.liquid')),
  ...walk('sections', (item) => item.endsWith('.liquid')),
  ...walk('snippets', (item) => item.endsWith('.liquid')),
  ...walk('blocks', (item) => item.endsWith('.liquid')),
];

for (const file of liquidFiles) {
  const source = read(file);
  validateAssetReferences(file, source);
  validateSnippetReferences(file, source);
  validateLiquidTranslations(file, source);
}

function validateAssetReferences(file, source) {
  const assetPattern = /['"]([^'"]+)['"]\s*\|\s*asset_url/g;
  for (const match of source.matchAll(assetPattern)) {
    const asset = match[1];
    if (!exists(path.posix.join('assets', asset))) {
      addError(file, `references missing asset "${asset}"`);
    }
  }
}

function validateSnippetReferences(file, source) {
  const renderPattern = /{%-?\s*render\s+['"]([^'"]+)['"]/g;
  for (const match of source.matchAll(renderPattern)) {
    const snippet = match[1];
    const snippetFile = path.posix.join('snippets', `${snippet}.liquid`);
    const blockFile = path.posix.join('blocks', `${snippet}.liquid`);
    if (!exists(snippetFile) && !exists(blockFile)) {
      addError(file, `renders missing snippet/block "${snippet}"`);
    }
  }
}

function validateLiquidTranslations(file, source) {
  const translationPattern = /['"]([^'"]+)['"]\s*\|\s*t\b/g;
  for (const match of source.matchAll(translationPattern)) {
    const key = match[1];
    if (getPath(localeText, key) === undefined && getPath(localeSchema, key) === undefined) {
      addError(file, `Missing Liquid translation key "${key}"`);
    }
  }
}

if (warnings.length) {
  console.log(`Shopify theme smoke warnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
  console.log('');
}

if (errors.length) {
  console.error(`Shopify theme smoke failed (${errors.length} errors):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Shopify theme smoke passed: ${sectionSchemas.size} section schemas, ${walk('templates', (item) => item.endsWith('.json')).length} templates, ${walk('sections', (item) => item.endsWith('.json')).length} section groups.`);
