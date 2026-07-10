import { readFileSync } from 'node:fs';

const SHOP = 'happy-kinetik.myshopify.com';
const TOKEN = process.env.SHOP_TOKEN;
const API = `https://${SHOP}/admin/api/2026-04/graphql.json`;
if (!TOKEN) { console.error('SHOP_TOKEN env required'); process.exit(1); }

async function gql(query, variables) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) console.error('GQL errors:', JSON.stringify(j.errors).slice(0, 400));
  return j.data;
}

function loadCatalog() {
  const src = readFileSync(new URL('../lib/shopify/fixtures.ts', import.meta.url), 'utf8');
  const items = [];
  for (const line of src.split('\n')) {
    const h = line.match(/handle:\s*"([^"]+)"/);
    const codeM = line.match(/\bcode:\s*"([^"]+)"/);
    if (!h || !codeM) continue;
    items.push({
      handle: h[1],
      code: codeM[1],
      spec: (line.match(/\bspec:\s*"([^"]+)"/) || [])[1] || '',
      badge: (line.match(/\bbadge:\s*"([^"]+)"/) || [])[1] || '',
      type: (line.match(/\btype:\s*"([^"]+)"/) || [])[1] || '',
    });
  }
  return items;
}

async function productIdsByHandle() {
  const d = await gql('{ products(first:50){ edges{ node{ id handle } } } }');
  const m = {};
  d.products.edges.forEach((e) => { m[e.node.handle] = e.node.id; });
  return m;
}

async function ensureMetafieldDefinitions() {
  const defs = [
    { name: 'Product code', key: 'product_code', type: 'single_line_text_field' },
    { name: 'Spec', key: 'spec', type: 'single_line_text_field' },
    { name: 'Badge', key: 'badge', type: 'single_line_text_field' },
  ];
  for (const def of defs) {
    const d = await gql(
      `mutation($d:MetafieldDefinitionInput!){ metafieldDefinitionCreate(definition:$d){ createdDefinition{id} userErrors{code message} } }`,
      { d: { name: def.name, namespace: 'custom', key: def.key, type: def.type, ownerType: 'PRODUCT' } }
    );
    const res = d?.metafieldDefinitionCreate;
    const errs = (res?.userErrors || []).filter((e) => e.code !== 'TAKEN');
    if (errs.length) console.log('  def', def.key, 'ERR', JSON.stringify(errs));
    else console.log('  def', def.key, res?.createdDefinition ? 'created' : 'exists');
  }
}

async function setProductMetafields(catalog, ids) {
  let set = 0;
  for (const c of catalog) {
    const id = ids[c.handle];
    if (!id) { console.log('  no product for', c.handle); continue; }
    const mfs = [];
    if (c.code) mfs.push({ ownerId: id, namespace: 'custom', key: 'product_code', type: 'single_line_text_field', value: c.code });
    if (c.spec) mfs.push({ ownerId: id, namespace: 'custom', key: 'spec', type: 'single_line_text_field', value: c.spec });
    if (c.badge) mfs.push({ ownerId: id, namespace: 'custom', key: 'badge', type: 'single_line_text_field', value: c.badge });
    if (!mfs.length) continue;
    const d = await gql(
      `mutation($m:[MetafieldsSetInput!]!){ metafieldsSet(metafields:$m){ userErrors{field message} } }`,
      { m: mfs }
    );
    const errs = d?.metafieldsSet?.userErrors || [];
    if (errs.length) console.log('  mf', c.handle, 'ERR', JSON.stringify(errs));
    else { set += mfs.length; }
  }
  console.log('  metafields set:', set);
}

async function ensurePages() {
  const pages = [
    { handle: 'about', title: 'About Waypoint', body: '<p>Waypoint builds field-tested apparel and audio for people who move. Technical materials, considered construction, zero noise.</p><p>Designed in studio, tested in the world.</p>' },
    { handle: 'contact', title: 'Contact', body: '<p>Questions, press, or wholesale — send a note and the studio will reply within two business days.</p>' },
    { handle: 'lookbook', title: 'Lookbook', body: '<p>SS26 — shot in the field.</p>' },
  ];
  for (const p of pages) {
    const ex = await gql(`{ pages(first:1, query:"handle:${p.handle}"){ edges{ node{ id } } } }`);
    if (ex?.pages?.edges?.length) { console.log('  page', p.handle, 'exists'); continue; }
    const d = await gql(
      `mutation($p:PageCreateInput!){ pageCreate(page:$p){ page{handle} userErrors{field message} } }`,
      { p: { title: p.title, handle: p.handle, body: p.body } }
    );
    const res = d?.pageCreate;
    if (res?.userErrors?.length) console.log('  page', p.handle, 'ERR', JSON.stringify(res.userErrors));
    else console.log('  page', p.handle, 'created');
  }
}

async function ensureSwatches() {
  const COLOR_HEX = { ink: '#0A0A0A', volt: '#CCFF00', graphite: '#3A3A3A', bone: '#EFECE2', charcoal: '#3A3A3A' };
  const d = await gql('{ products(first:50){ edges{ node{ id handle options{ id name optionValues{ id name swatch{ color } } } } } } }');
  let updated = 0;
  for (const e of d.products.edges) {
    const p = e.node;
    const colorOpt = p.options.find((o) => /colou?r/i.test(o.name));
    if (!colorOpt) continue;
    const toUpdate = [];
    for (const v of colorOpt.optionValues) {
      const hex = COLOR_HEX[v.name.toLowerCase()];
      if (hex && (!v.swatch || v.swatch.color?.toUpperCase() !== hex)) {
        toUpdate.push({ id: v.id, swatch: { color: hex } });
      }
    }
    if (!toUpdate.length) continue;
    const r = await gql(
      `mutation($productId:ID!,$option:OptionUpdateInput!,$vals:[OptionValueUpdateInput!]){ productOptionUpdate(productId:$productId, option:$option, optionValuesToUpdate:$vals){ userErrors{field message} } }`,
      { productId: p.id, option: { id: colorOpt.id }, vals: toUpdate }
    );
    const errs = r?.productOptionUpdate?.userErrors || [];
    if (errs.length) console.log('  swatch', p.handle, 'ERR', JSON.stringify(errs));
    else { updated += toUpdate.length; }
  }
  console.log('  option-value swatches set:', updated);
}

async function ensureMetaobjects() {
  const def = await gql(
    `mutation($def:MetaobjectDefinitionCreateInput!){ metaobjectDefinitionCreate(definition:$def){ metaobjectDefinition{type} userErrors{code field message} } }`,
    { def: {
      name: 'Store feature',
      type: 'store_feature',
      access: { storefront: 'PUBLIC_READ' },
      capabilities: { publishable: { enabled: true } },
      fieldDefinitions: [
        { key: 'title', name: 'Title', type: 'single_line_text_field' },
        { key: 'body', name: 'Body', type: 'multi_line_text_field' },
        { key: 'icon', name: 'Icon', type: 'single_line_text_field' },
      ],
    } }
  );
  const derr = (def?.metaobjectDefinitionCreate?.userErrors || []).filter((e) => e.code !== 'TAKEN');
  if (derr.length) console.log('  def store_feature ERR', JSON.stringify(derr));
  else console.log('  def store_feature', def?.metaobjectDefinitionCreate?.metaobjectDefinition ? 'created' : 'exists');

  const entries = [
    { handle: 'free-returns', title: 'Free 60-day returns', body: 'Unworn, with tags. We cover the label.', icon: 'refresh' },
    { handle: 'fast-shipping', title: 'Ships in 24 hours', body: 'Carbon-neutral delivery on every order.', icon: 'truck' },
    { handle: 'lifetime-repairs', title: 'Lifetime repairs', body: 'Replaceable zips, reinforced seams, repaired for as long as you own it.', icon: 'shield' },
    { handle: 'spec-sheet', title: 'Materials with a spec sheet', body: 'Gore-Tex 3L, ripstop nylon, recycled hardware. Published builds.', icon: 'document' },
  ];
  for (const e of entries) {
    const d = await gql(
      `mutation($mo:MetaobjectCreateInput!){ metaobjectCreate(metaobject:$mo){ metaobject{handle} userErrors{code field message} } }`,
      { mo: { type: 'store_feature', handle: e.handle, capabilities: { publishable: { status: 'ACTIVE' } }, fields: [
        { key: 'title', value: e.title }, { key: 'body', value: e.body }, { key: 'icon', value: e.icon },
      ] } }
    );
    const errs = (d?.metaobjectCreate?.userErrors || []).filter((x) => x.code !== 'TAKEN');
    if (errs.length) console.log('  entry', e.handle, 'ERR', JSON.stringify(errs));
    else console.log('  entry', e.handle, d?.metaobjectCreate?.metaobject ? 'created' : 'exists');
  }
}

async function fileUrl(filename) {
  const d = await gql(`{ files(first:1, query:"filename:${filename}"){ edges{ node{ ... on MediaImage{ image{url} } } } } }`);
  return d?.files?.edges?.[0]?.node?.image?.url || null;
}

async function ensureArticles() {
  const blogs = await gql('{ blogs(first:1, query:"handle:news"){ edges{ node{ id } } } }');
  const blogId = blogs?.blogs?.edges?.[0]?.node?.id;
  if (!blogId) { console.log('  no "news" blog'); return; }
  const articles = [
    { handle: 'fw26-shell', title: 'Field notes: building the FW26 shell', summary: "How the season's flagship jacket came together.", body: '<p>The shell started as a question: how light can technical protection get?</p><p>Eighteen prototypes later, we had our answer.</p>', img: '01-jacket-hood-back.png', date: '2026-05-12T09:00:00Z' },
    { handle: 'utility-restraint', title: 'On utility and restraint', summary: 'Why we cut three pockets from the cargo pant.', body: '<p>Good design is as much about subtraction as addition.</p>', img: '04-lowerbody-cargo.png', date: '2026-04-28T09:00:00Z' },
    { handle: 'sound-of-the-city', title: 'The sound of the city', summary: 'Tuning the Studio Headphones for the street.', body: '<p>We tuned for movement, not the lab.</p>', img: '06-headphones-back.png', date: '2026-04-10T09:00:00Z' },
  ];
  for (const a of articles) {
    const ex = await gql(`{ articles(first:1, query:"handle:${a.handle}"){ edges{ node{ id } } } }`);
    if (ex?.articles?.edges?.length) { console.log('  article', a.handle, 'exists'); continue; }
    const url = await fileUrl(a.img);
    const input = { blogId, title: a.title, handle: a.handle, body: a.body, summary: a.summary, author: { name: 'Studio' }, isPublished: true };
    if (url) input.image = { url };
    const d = await gql(
      `mutation($article:ArticleCreateInput!){ articleCreate(article:$article){ article{handle id} userErrors{field message} } }`,
      { article: input }
    );
    const res = d?.articleCreate;
    if (!res) console.log('  article', a.handle, 'FAILED (request error)');
    else if (res.userErrors?.length) console.log('  article', a.handle, 'ERR', JSON.stringify(res.userErrors));
    else console.log('  article', a.handle, res.article ? 'created ' + (url ? '[img]' : '[no-img]') : 'no-article');
  }
}

const cmd = process.argv[2] || 'all';
const catalog = loadCatalog();
console.log(`catalog: ${catalog.length} products (codes:${catalog.filter((c) => c.code).length} specs:${catalog.filter((c) => c.spec).length} badges:${catalog.filter((c) => c.badge).length})`);

if (cmd === 'metafields' || cmd === 'all') {
  console.log('== metafield definitions ==');
  await ensureMetafieldDefinitions();
  console.log('== product metafield values ==');
  const ids = await productIdsByHandle();
  await setProductMetafields(catalog, ids);
}
if (cmd === 'pages' || cmd === 'all') {
  console.log('== pages ==');
  await ensurePages();
}
if (cmd === 'articles' || cmd === 'all') {
  console.log('== articles ==');
  await ensureArticles();
}
if (cmd === 'swatches' || cmd === 'all') {
  console.log('== option-value swatches ==');
  await ensureSwatches();
}
if (cmd === 'metaobjects' || cmd === 'all') {
  console.log('== metaobjects ==');
  await ensureMetaobjects();
}
console.log('done.');
