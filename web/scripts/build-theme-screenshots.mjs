import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = resolve(WEB, '..');
const STORE = process.argv[2] || 'waypoint-demo.myshopify.com';
const PASSWORD = process.argv[3] || 'pass';
const BASE = `https://${STORE}`;
const OUT_DIR = resolve(ROOT, 'docs/screenshots/sections');
const MANIFEST_PATH = resolve(ROOT, 'docs/screenshots/sections-manifest.json');

mkdirSync(OUT_DIR, { recursive: true });

// Reachable (url, key) per section type, derived from a `shopify theme pull`
// of the live templates on STORE (ground truth for section keys, since
// pushed live templates can drift from the repo's own copies) crossed with
// which templates are actually assigned to a live page/collection/product on
// this store. Sections not listed here have no reachable live URL on this
// store -- see docs/merchant/sections.md "Coverage" note for why.
const COVERAGE = [
  { type: 'header', url: '/', key: 'header' },
  { type: 'footer', url: '/', key: 'footer' },
  { type: 'hero', url: '/', key: 'hero' },
  { type: 'marquee', url: '/', key: 'marquee' },
  { type: 'featured-collection', url: '/', key: 'arrivals' },
  { type: 'promo-grid', url: '/', key: 'systems' },
  { type: 'material-scan', url: '/', key: 'material_scan' },
  { type: 'build-your-kit', url: '/', key: 'kit' },
  { type: 'image-with-text', url: '/', key: 'editorial' },
  { type: 'statement', url: '/', key: 'manifesto' },
  { type: 'route-map', url: '/', key: 'route' },
  { type: 'lookbook', url: '/', key: 'lookbook' },
  { type: 'multicolumn', url: '/', key: 'trust' },
  { type: 'newsletter', url: '/', key: 'newsletter' },
  { type: 'drop-system', url: '/', key: 'drop' },
  { type: 'featured-product', url: '/', key: 'featured_product' },
  { type: 'testimonials', url: '/', key: 'testimonials' },
  { type: 'blog-posts', url: '/', key: 'journal' },
  { type: 'hero-motion', url: '/?view=carbon', key: 'hero' },
  { type: 'hero-split', url: '/?view=sand', key: 'hero' },
  { type: 'collection-list', url: '/?view=sand', key: 'roles' },
  { type: 'field-assurance', url: '/products/shell-jacket', key: 'field_assurance' },
  { type: 'main-collection', url: '/collections/all', key: 'main' },
  { type: 'breadcrumb', url: '/collections/all', key: 'breadcrumb' },
  { type: 'collection-nav', url: '/collections/all', key: 'collection_nav' },
  { type: 'main-product', url: '/products/shell-jacket', key: 'main' },
  { type: 'field-spec', url: '/products/shell-jacket', key: 'field_spec' },
  { type: 'recently-viewed', url: '/products/shell-jacket', key: 'recently_viewed' },
  { type: 'product-faq', url: '/products/shell-jacket', key: 'faq' },
  { type: 'product-loadout', url: '/products/shell-jacket', key: 'loadout' },
  { type: 'product-apps', url: '/products/shell-jacket', key: 'reviews' },
  { type: 'complementary-products', url: '/products/shell-jacket', key: 'complementary' },
  { type: 'related-products', url: '/products/shell-jacket', key: 'related' },
  { type: 'image-gallery', url: '/products/shell-jacket?view=campaign', key: 'detail' },
  { type: 'product-field-note', url: '/products/shell-jacket?view=campaign', key: 'field_note' },
  { type: 'product-motion-spec', url: '/products/shell-jacket?view=carbon', key: 'motion_spec' },
  { type: 'product-use-modes', url: '/products/shell-jacket?view=editorial', key: 'use_modes' },
  { type: 'main-cart', url: '/cart', key: 'main' },
  { type: 'main-search', url: '/search?q=jacket', key: 'main' },
  { type: 'main-blog', url: '/blogs/news', key: 'main' },
  { type: 'main-article', url: '/blogs/news/layering-for-the-shoulder-season', key: 'main' },
  { type: 'main-page', url: '/pages/shipping', key: 'main' },
  { type: 'contact-form', url: '/pages/contact', key: 'contact_form' },
  { type: 'hero-manifesto', url: '/pages/about', key: 'hero_manifesto' },
  { type: 'hero-collage', url: '/pages/lookbook', key: 'hero_collage' },
  { type: 'collection-story', url: '/pages/lookbook', key: 'collection_story' },
  { type: 'compare-slider', url: '/pages/lookbook', key: 'compare_slider' },
  { type: 'hero-video', url: '/pages/lookbook', key: 'film_break' },
  { type: 'main-list-collections', url: '/collections', key: 'main' },
  { type: 'main-404', url: '/this-page-does-not-exist-xyz', key: 'main' },
];

async function unlockPassword(context) {
  // POST the storefront password form via the context's own APIRequestContext
  // -- Playwright stores the resulting Set-Cookie in the context's shared
  // cookie jar automatically, so subsequent page.goto() calls in this
  // context are already authenticated.
  await context.request.post(`${BASE}/password`, {
    form: { form_type: 'storefront_password', utf8: '✓', password: PASSWORD },
  });
}

// The email-capture popup (promo-popup) opens itself a few seconds after
// load and floats above everything else -- it must be suppressed while
// capturing every *other* section, then captured on its own with its
// `.is-open` state forced so its own screenshot isn't just an empty div.
const POPUP_SELECTOR = '[data-delay][data-frequency]';

async function captureAt(context, url, entries, manifest, { showPopup = false } = {}) {
  const page = await context.newPage();
  try {
    await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle', timeout: 30000 });
  } catch {
    await page.goto(`${BASE}${url}`, { waitUntil: 'load', timeout: 30000 });
  }
  if (showPopup) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.removeAttribute('hidden');
        el.classList.add('is-open');
      }
    }, POPUP_SELECTOR);
    await page.waitForTimeout(400);
  } else {
    await page.addStyleTag({ content: `${POPUP_SELECTOR} { display: none !important; }` });
  }
  for (const entry of entries) {
    try {
      // promo-popup's shopify-section wrapper collapses to zero size because
      // its only child is `position: fixed` (removed from normal flow) --
      // screenshot the fixed element itself, not its non-sized wrapper.
      const locator = entry.selector
        ? page.locator(entry.selector).first()
        : page.locator(`[id$="__${entry.key}"]`).first();
      await locator.scrollIntoViewIfNeeded({ timeout: 5000 });
      await page.waitForTimeout(350);
      const filePath = resolve(OUT_DIR, `${entry.type}.png`);
      await locator.screenshot({ path: filePath });
      manifest.push({ type: entry.type, screenshot: `sections/${entry.type}.png`, ok: true });
      console.log('OK  ', entry.type);
    } catch (err) {
      manifest.push({ type: entry.type, ok: false, error: err.message });
      console.error('FAIL', entry.type, '-', err.message);
    }
  }
  await page.close();
}

async function main() {
  const browser = await chromium.launch();
  const manifest = [];

  // Authenticated context for every normal page.
  const authContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await unlockPassword(authContext);

  const byUrl = new Map();
  for (const entry of COVERAGE) {
    if (!byUrl.has(entry.url)) byUrl.set(entry.url, []);
    byUrl.get(entry.url).push(entry);
  }
  for (const [url, entries] of byUrl) {
    await captureAt(authContext, url, entries, manifest);
  }
  // Dedicated pass for the popup itself, forced open (see captureAt).
  await captureAt(authContext, '/', [{ type: 'promo-popup', key: 'promo_popup', selector: 'promo-popup' }], manifest, {
    showPopup: true,
  });
  await authContext.close();

  // main-password is not captured: this dev store's password protection is
  // Shopify's own hosted gate (checked before the theme renders anything),
  // not the theme's templates/password.json -- that template is unreachable
  // here regardless of how it's requested. Documented as a gap, not retried.
  manifest.push({
    type: 'main-password',
    ok: false,
    error:
      'unreachable on this store: dev-store password protection is a Shopify-hosted gate, not the theme\'s own password.json template',
  });

  await browser.close();

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  const ok = manifest.filter((m) => m.ok).length;
  console.log(`\n${ok}/${manifest.length} section screenshots captured -> ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
