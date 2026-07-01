import { readFileSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

const SHOP = 'happy-kinetik.myshopify.com';
const TOKEN = process.env.SHOP_TOKEN;
const API = `https://${SHOP}/admin/api/2026-04/graphql.json`;
if (!TOKEN) { console.error('SHOP_TOKEN env required'); process.exit(1); }

const files = process.argv.slice(2);
if (!files.length) { console.error('usage: node upload-files.mjs <path.png> ...'); process.exit(1); }

async function gql(query, variables) {
  const r = await fetch(API, { method: 'POST', headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify({ query, variables }) });
  const j = await r.json();
  if (j.errors) console.error('GQL:', JSON.stringify(j.errors).slice(0, 300));
  return j.data;
}

async function existing(filename) {
  const d = await gql(`{ files(first:1, query:"filename:${filename}"){ edges{ node{ ... on MediaImage{ fileStatus image{url} } } } } }`);
  const n = d?.files?.edges?.[0]?.node;
  return n && n.image ? n : null;
}
async function poll(filename, tries = 24) {
  for (let i = 0; i < tries; i++) { const f = await existing(filename); if (f && f.fileStatus === 'READY' && f.image?.url) return f.image.url; await new Promise((r) => setTimeout(r, 1500)); }
  return null;
}

for (const path of files) {
  const filename = basename(path);
  if (!existsSync(path)) { console.log('  MISSING', path); continue; }
  if (await existing(filename)) { console.log('  exists', filename); continue; }
  const buf = readFileSync(path);
  const staged = await gql(`mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){ stagedTargets{ url resourceUrl parameters{name value} } userErrors{message} } }`, { input: [{ filename, mimeType: 'image/png', httpMethod: 'POST', resource: 'FILE' }] });
  const target = staged?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) { console.log('  STAGE FAIL', filename); continue; }
  const form = new FormData();
  for (const p of target.parameters) form.append(p.name, p.value);
  form.append('file', new Blob([buf], { type: 'image/png' }), filename);
  const up = await fetch(target.url, { method: 'POST', body: form });
  if (!up.ok && ![201, 204].includes(up.status)) { console.log('  UPLOAD FAIL', filename, up.status); continue; }
  const created = await gql(`mutation($files:[FileCreateInput!]!){ fileCreate(files:$files){ files{ fileStatus } userErrors{message} } }`, { files: [{ originalSource: target.resourceUrl, contentType: 'IMAGE', alt: filename.replace(/\.[a-z]+$/, '').replace(/[-_]/g, ' ') }] });
  if (created?.fileCreate?.userErrors?.length) { console.log('  CREATE ERR', filename, JSON.stringify(created.fileCreate.userErrors)); continue; }
  const url = await poll(filename);
  console.log('  uploaded', filename, url ? 'READY' : '(processing)');
}
console.log('done.');
