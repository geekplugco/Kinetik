#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const STORE = process.env.SMOKE_STORE || 'happy-kinetik.myshopify.com';
const THEME = process.env.SMOKE_THEME || '147544178748';
const PASSWORD = process.env.SMOKE_PASSWORD || 'pass';
const THEME_DIR = process.env.SMOKE_THEME_DIR || 'theme';
const API = '2026-04';
const asJson = process.argv.includes('--json');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const results = [];
function pass(name, detail) { results.push({ name, ok: true, detail }); }
function fail(name, detail) { results.push({ name, ok: false, detail }); }

function readToken() {
  const p = join(process.env.TMPDIR || '/tmp', 'admin-token.txt');
  return existsSync(p) ? readFileSync(p, 'utf8').trim() : null;
}

function cookieHeader(list) {
  return (list || []).filter(Boolean).map((c) => c.split(';')[0]).join('; ');
}

async function auth() {
  const res = await fetch(`https://${STORE}/password`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `form_type=storefront_password&utf8=%E2%9C%93&password=${encodeURIComponent(PASSWORD)}`,
    redirect: 'manual',
  });
  const set = res.headers.getSetCookie ? res.headers.getSetCookie() : [res.headers.get('set-cookie')];
  return cookieHeader(set);
}

async function realHandles(token) {
  if (!token) return {};
  const query = `{
    products(first:1,query:"status:active"){nodes{handle}}
    collections(first:1){nodes{handle}}
    pages(first:1){nodes{handle}}
    blogs(first:1){nodes{handle articles(first:1){nodes{handle}}}}
  }`;
  try {
    const res = await fetch(`https://${STORE}/admin/api/${API}/graphql.json`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ query }),
    });
    const d = (await res.json()).data || {};
    const blog = d.blogs?.nodes?.[0];
    return {
      product: d.products?.nodes?.[0]?.handle,
      collection: d.collections?.nodes?.[0]?.handle,
      page: d.pages?.nodes?.[0]?.handle,
      blog: blog?.handle,
      article: blog?.articles?.nodes?.[0]?.handle,
    };
  } catch (e) {
    return {};
  }
}

function withPreview(path) {
  return `https://${STORE}${path}${path.includes('?') ? '&' : '?'}preview_theme_id=${THEME}`;
}

function errorMarkers(html) {
  const found = [];
  if (/Liquid error/i.test(html)) found.push(html.match(/Liquid error[^<\n]{0,120}/i)[0]);
  if (/Liquid syntax error/i.test(html)) found.push(html.match(/Liquid syntax error[^<\n]{0,120}/i)[0]);
  if (/translation missing:/i.test(html)) found.push(html.match(/translation missing:[^<\n"]{0,80}/i)[0]);
  return found;
}

async function getHtml(cookie, path) {
  const res = await fetch(withPreview(path), { headers: { cookie, 'user-agent': 'kinetik-smoke/1.0' } });
  const html = await res.text();
  return { status: res.status, html };
}

async function smokePage(cookie, name, path, expectRoots = [], expectStatus = 200) {
  if (!path) { fail(name, 'no real handle available (skipped binding)'); return; }
  try {
    const { status, html } = await getHtml(cookie, path);
    if (status !== expectStatus) { fail(name, `HTTP ${status} (expected ${expectStatus}) at ${path}`); return; }
    const errs = errorMarkers(html);
    if (errs.length) { fail(name, `render errors: ${errs.join(' | ')}`); return; }
    const missing = expectRoots.filter((r) => !html.includes(r));
    if (missing.length) { fail(name, `missing expected roots: ${missing.join(', ')}`); return; }
    pass(name, `${path} → ${status}, clean${expectRoots.length ? `, ${expectRoots.length} roots` : ''}`);
  } catch (e) {
    fail(name, `${path} → ${e.message}`);
  }
}

async function smokeSectionApi(cookie, byKey) {
  const entries = Object.entries(byKey);
  const BATCH = 5;
  for (let i = 0; i < entries.length; i += BATCH) {
    const chunk = entries.slice(i, i + BATCH);
    const ids = chunk.map(([, id]) => id).join(',');
    let data;
    try {
      const res = await fetch(withPreview(`/?sections=${encodeURIComponent(ids)}`), { headers: { cookie } });
      if (res.status !== 200) { chunk.forEach(([key]) => fail(`section:${key}`, `Section API HTTP ${res.status}`)); continue; }
      data = await res.json();
    } catch (e) {
      chunk.forEach(([key]) => fail(`section:${key}`, e.message));
      continue;
    }
    for (const [key, id] of chunk) {
      const html = data[id];
      if (typeof html !== 'string') { fail(`section:${key}`, 'not returned by Section Rendering API'); continue; }
      const errs = errorMarkers(html);
      if (errs.length) { fail(`section:${key}`, `render errors: ${errs.join(' | ')}`); continue; }
      if (html.replace(/\s/g, '').length < 20) { fail(`section:${key}`, 'rendered empty'); continue; }
      pass(`section:${key}`, `${html.length} bytes, clean`);
    }
  }
}

function bindingChecks(html, settingsData) {
  const cur = settingsData.current || {};
  if (cur.page_width) {
    if (html.includes('--page-width')) pass('binding:page_width', 'CSS var --page-width present');
    else fail('binding:page_width', 'settings.page_width set but --page-width missing in output');
  }
  const schemeCount = (html.match(/data-color-scheme=/g) || []).length;
  if (schemeCount > 0) pass('binding:color_scheme', `${schemeCount} data-color-scheme bindings rendered`);
  else fail('binding:color_scheme', 'no data-color-scheme attributes rendered');
}

async function main() {
  const cookie = await auth();
  if (!cookie) { fail('auth', 'no storefront cookie obtained'); }
  const token = readToken();
  const handles = await realHandles(token);

  const idx = JSON.parse(readFileSync(join(THEME_DIR, 'templates/index.json'), 'utf8'));
  const settingsData = JSON.parse(readFileSync(join(THEME_DIR, 'config/settings_data.json'), 'utf8'));

  const { status: homeStatus, html: homeHtml } = await getHtml(cookie, '/');
  const renderedIds = [...homeHtml.matchAll(/id="(shopify-section-[^"]*)"/g)].map((m) => m[1]);
  const idByKey = {};
  for (const full of renderedIds) {
    const mm = full.match(/__([a-zA-Z0-9_-]+)$/);
    if (mm) idByKey[mm[1]] = full.replace('shopify-section-', '');
  }
  if (homeStatus !== 200) fail('template:index', `HTTP ${homeStatus}`);
  else {
    const errs = errorMarkers(homeHtml);
    const missing = idx.order.filter((k) => !idByKey[k]);
    if (errs.length) fail('template:index', `render errors: ${errs.join(' | ')}`);
    else if (missing.length) fail('template:index', `configured sections not rendered: ${missing.join(', ')}`);
    else pass('template:index', `/ → 200, all ${idx.order.length} configured sections rendered`);
  }

  await smokePage(cookie, 'template:product', handles.product ? `/products/${handles.product}` : null, ['shopify-section']);
  await smokePage(cookie, 'template:collection', handles.collection ? `/collections/${handles.collection}` : null, ['shopify-section']);
  await smokePage(cookie, 'template:list-collections', '/collections', ['shopify-section']);
  await smokePage(cookie, 'template:page', handles.page ? `/pages/${handles.page}` : null, ['shopify-section']);
  await smokePage(cookie, 'template:blog', handles.blog ? `/blogs/${handles.blog}` : null, ['shopify-section']);
  await smokePage(cookie, 'template:article', handles.blog && handles.article ? `/blogs/${handles.blog}/${handles.article}` : null, ['shopify-section']);
  await smokePage(cookie, 'template:search', '/search?q=jacket&type=product', ['shopify-section']);
  await smokePage(cookie, 'template:cart', '/cart', ['shopify-section']);
  await smokePage(cookie, 'template:404', '/does-not-exist-x9', ['shopify-section'], 404);

  const homeByKey = {};
  for (const k of idx.order) if (idByKey[k]) homeByKey[k] = idByKey[k];
  await smokeSectionApi(cookie, homeByKey);

  bindingChecks(homeHtml, settingsData);

  const failed = results.filter((r) => !r.ok);
  if (asJson) {
    console.log(JSON.stringify({ store: STORE, theme: THEME, handles, results }, null, 2));
  } else {
    console.log(`${DIM}smoke-sections — ${STORE} theme ${THEME} · handles: ${JSON.stringify(handles)}${RESET}`);
    for (const r of results) {
      const tag = r.ok ? `${GREEN}[ok]${RESET}` : `${RED}[FAIL]${RESET}`;
      console.log(`${tag} ${r.name} ${DIM}— ${r.detail}${RESET}`);
    }
    if (failed.length === 0) console.log(`${GREEN}[PASS]${RESET} ${results.length} checks — every template + configured section renders clean with live settings/data`);
    else console.log(`${RED}[FAIL]${RESET} ${failed.length}/${results.length} checks failed`);
  }
  process.exit(failed.length ? 1 : 0);
}

main();
