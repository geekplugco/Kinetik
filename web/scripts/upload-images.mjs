import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const SHOP = 'happy-kinetik.myshopify.com';
const TOKEN = process.env.SHOP_TOKEN;
const API = `https://${SHOP}/admin/api/2026-04/graphql.json`;
if (!TOKEN) { console.error('SHOP_TOKEN env required'); process.exit(1); }

const UPLOADS = new URL('../public/uploads/', import.meta.url).pathname;

const TARGETS = [
  'onmodel/08-hero-back-wide.png',
  'onmodel/02-fulllook-cropped.png',
  'onmodel/03b-vest-alt.png',
  'bundle/08-dark-set-banner.png',
  'bundle/09-paired-hero.png',
  'bundle/06-detail-trio.png',
];

async function gql(query, variables) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) console.error('GQL errors:', JSON.stringify(j.errors).slice(0, 300));
  return j.data;
}

async function existingFile(filename) {
  const d = await gql(`{ files(first:1, query:"filename:${filename}"){ edges{ node{ ... on MediaImage{ id fileStatus image{url} } } } } }`);
  const node = d?.files?.edges?.[0]?.node;
  return node && node.image ? node : null;
}

async function pollReady(filename, tries = 20) {
  for (let i = 0; i < tries; i++) {
    const f = await existingFile(filename);
    if (f && f.fileStatus === 'READY' && f.image?.url) return f.image.url;
    await new Promise((r) => setTimeout(r, 1500));
  }
  return null;
}

async function stageAndCreate(relPath) {
  const filename = basename(relPath);
  const existing = await existingFile(filename);
  if (existing) {
    const url = existing.fileStatus === 'READY' ? existing.image.url : await pollReady(filename);
    console.log('  exists', filename);
    return { filename, url };
  }
  const buf = readFileSync(UPLOADS + relPath);
  const staged = await gql(
    `mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){ stagedTargets{ url resourceUrl parameters{name value} } userErrors{field message} } }`,
    { input: [{ filename, mimeType: 'image/png', httpMethod: 'POST', resource: 'FILE' }] }
  );
  const target = staged?.stagedUploadsCreate?.stagedTargets?.[0];
  if (!target) { console.log('  STAGE FAIL', filename, JSON.stringify(staged)); return null; }
  const form = new FormData();
  for (const p of target.parameters) form.append(p.name, p.value);
  form.append('file', new Blob([buf], { type: 'image/png' }), filename);
  const up = await fetch(target.url, { method: 'POST', body: form });
  if (!up.ok && up.status !== 201 && up.status !== 204) {
    console.log('  UPLOAD FAIL', filename, up.status); return null;
  }
  const created = await gql(
    `mutation($files:[FileCreateInput!]!){ fileCreate(files:$files){ files{ alt fileStatus } userErrors{field message} } }`,
    { files: [{ originalSource: target.resourceUrl, contentType: 'IMAGE', alt: filename.replace(/\.[a-z]+$/, '').replace(/[-_]/g, ' ') }] }
  );
  const errs = created?.fileCreate?.userErrors || [];
  if (errs.length) { console.log('  CREATE ERR', filename, JSON.stringify(errs)); return null; }
  const url = await pollReady(filename);
  console.log('  uploaded', filename, url ? 'READY' : '(processing)');
  return { filename, url };
}

const results = {};
console.log(`== uploading ${TARGETS.length} editorial images ==`);
for (const t of TARGETS) {
  const r = await stageAndCreate(t);
  if (r) results[r.filename] = r.url;
}

console.log('== setting collection images ==');
const COLLECTION_IMG = {
  'new-arrivals': '02-fulllook-cropped.png',
  'apparel': '03-vest-torso.png',
  'tech': '06-headphones-back.png',
};
const colData = await gql('{ collections(first:30){ edges{ node{ id handle } } } }');
const colByHandle = {};
colData.collections.edges.forEach((e) => { colByHandle[e.node.handle] = e.node.id; });
for (const [handle, fname] of Object.entries(COLLECTION_IMG)) {
  const id = colByHandle[handle];
  if (!id) { console.log('  no collection', handle); continue; }
  let url = results[fname];
  if (!url) { const f = await existingFile(fname); url = f?.image?.url || (await pollReady(fname)); }
  if (!url) { console.log('  no image url for', handle, fname); continue; }
  const d = await gql(
    `mutation($input:CollectionInput!){ collectionUpdate(input:$input){ collection{handle} userErrors{field message} } }`,
    { input: { id, image: { src: url } } }
  );
  const errs = d?.collectionUpdate?.userErrors || [];
  console.log('  collection', handle, errs.length ? 'ERR ' + JSON.stringify(errs) : '→ ' + fname);
}

console.log('done.');
