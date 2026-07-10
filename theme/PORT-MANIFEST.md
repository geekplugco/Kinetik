# Kinetik — Section Port Manifest

The contract for porting the React prototype (`web/lib/sections/*.tsx`) → Liquid sections
(`theme/sections/*.liquid`). Every lane agent reads this first. Foundation (Wave 0) is **done** —
shared snippets, JS architecture, JSON-LD, and branding settings exist and pass all gates.

## Rules of engagement (prevents parallel conflicts)

1. **One agent owns one section file.** Never edit another lane's section. No two agents write the same file.
2. **Reuse foundation snippets — never re-implement.** Button/icon/price/card/tag already exist (below). If you need a new shared primitive, add a snippet and note it here; don't inline a divergent copy.
3. **Do NOT edit `assets/tailwind.css`.** Tokens + utilities are frozen. Need a new utility? Use existing tokens, or queue a request in this file under "CSS additions".
4. **Do NOT edit the global `assets/theme.js`.** Section-specific JS = its own `assets/<section>.js` custom element (see JS architecture). Self-guarding, loaded per-section.
5. **Schema is the source of truth.** Embed the matching `web/theme/schema/<name>.json` into the section's `{% schema %}`. These already pass `/tjson` (70/70). Don't invent settings.
6. **Do NOT edit `locales/*` or `layout/theme.liquid`.** These are shared — concurrent edits collide.
   For section text use: literal English in schema `label`/`info`, existing `t:` keys, or `{{ 'x' | t | default: 'English' }}`.
   Load section JS from inside your own section file via `<script src="{{ '<name>.js' | asset_url }}" defer="defer"></script>` — never the `| script_tag` filter (theme-check rejects it as parser-blocking) and never from the layout.
   Need a new locale key? List it under "Locale additions" at the bottom; Lane D adds it in the final pass.
7. **No prose comments in code.** Explanatory comments drift from the code when requirements change, then mislead. Make the code self-explain through names instead. Banned everywhere: `//`, `/* */`, `<!-- -->`, `{% comment %}`. Allowed because the toolchain validates them against the code (so they can't silently drift): `{% doc %}` snippet contracts (theme-check `ValidDoc`) and `{%- # theme-check-disable/enable -%}` directives.
8. **Definition of Done (every section):**
   - `shopify theme check --path theme` → 0 offenses for the file
   - `node ~/.claude/skills/teifi-theme-json/src/validate.mjs section <extracted-schema.json>` → pass (the `auto`-on-`.liquid` form feeds raw Liquid to JSON.parse and fails; extract the `{% schema %}` body first)
   - `node web/scripts/guard-comments.mjs theme` → PASS (no prose comments)
   - WCAG AA contrast on text (no token on a too-light bg; use semantic tokens like `text-accent-ink` on `bg-accent`)
   - Visual parity with the React source (same layout/classes; data bound to Shopify objects)
   - Mobile-first: base = mobile, layer up at `md:` / `lg:` (breakpoints 750/990/1200)

## Foundation snippet API (Wave 0 — ready to use)

| Snippet | Call | Notes |
|---------|------|-------|
| `icon` | `{% render 'icon', name: 'cart', size: 20 %}` | set: cart search menu user arrow close star chevron arrow-up-right plus minus |
| `button` | `{% render 'button', label: x, href: y %}` or `type:'submit', name:, variant:'primary'\|'secondary'\|'link', size:'sm'\|'md'\|'lg', icon:, disabled: %}` | honors `settings.button_style` |
| `price` | `{% render 'price', product: product %}` or `variant: v` | native compare-at sale handling |
| `tag` | `{% render 'tag', label: x, tone:'default'\|'accent' %}` | mono uppercase pill |
| `product-card` | `{% render 'product-card', product: product, sizes:, ratio:, show_quick_add: %}` | metafield-driven code/spec/badge + native color swatches + quick-add; uses price/icon/quick-add internally |
| `quick-add` | (used by product-card) | `<quick-add>` custom element → POST /cart/add.js |
| `structured-data` | (rendered once in layout) | Product+Offers+Breadcrumb on PDP, Org+WebSite on home |

Rich product fields map to metafields with fallback: `custom.product_code`→sku, `custom.spec`→type, `custom.badge`→none. Colors = the product's "Color" option values (native swatches).

## JS architecture (Wave 0 convention)

- **Global** (`assets/theme.js`, loaded in layout): scroll-reveal + cart event bus. Dispatch/listen on `document` for `cart:added` / `cart:updated`. `window.Kinetik.refreshCart()` available.
- **Reference impl**: `assets/quick-add.js` defines `<quick-add>` (self-guards with `customElements.get`).
- **Section JS** (slideshow, mega-menu, cart-drawer, accordion): each ships `assets/<name>.js` defining ONE custom element; the section's `.liquid` loads it via `{{ '<name>.js' | asset_url | script_tag }}` (deferred). Custom elements self-guard, so duplicate loads are harmless. **No two sections share a JS file.**

## Production CSS (no-build) — rebuild after adding classes

Tailwind only emits classes it finds while scanning. The committed `assets/tailwind.css` is compiled **from the Liquid** by `node web/scripts/build-theme-min.mjs` (scans `theme/**/*.liquid`, strips Google Fonts). **Any new utility class you add to a section is invisible in Production mode until you re-run that script** — so after a batch of sections, rebuild before pushing. During dev, set `settings.mode = development` (theme editor → Theme CSS) to skip the rebuild loop: the browser compiles live against the DOM. Ship on `production`/`production-css-inline` only.

## Theme Store submission zip (demo vs. shipped defaults)

`theme/templates/*.json` and `theme/sections/header-group.json` intentionally reference the connected demo store (`shopify://shop_images/...`, `shopify://collections/...`, `shopify://pages/...`, `shopify://blogs/...`, plus hardcoded `new-arrivals`/`apparel`/`tech` collection handles in the header mega_panel blocks). **Do not strip these from the live files** — they're what make happy-kinetik.myshopify.com's install state show realistic, complete content, which the Theme Store demo-store requirement expects. They are also unreachable on a fresh merchant install, which Shopify's own submission tips flag directly.

`node web/scripts/build-submission-zip.mjs` builds the actual upload artifact: it copies `theme/` into `dist/kinetik-submission/` (git-ignored, untracked — never edits the live `theme/` tree), blanks every `shopify://`-prefixed string in the copy's `templates/*.json` + `sections/*.json` to `""`, and blanks every `product`/`collection`/`product_list`/`collection_list` setting value resolved from each section's own `{% schema %}` (section- and block-level, skipping Shopify system handles like `frontpage`), logs every file+field it stripped, generates `listings/<preset-folder>/templates/index.json` for each preset, then hands the staged copy to `shopify theme package` (the official CLI packager — respects the required theme folder structure, drops non-standard top-level dirs like `scripts/`, includes `listings/` automatically) and copies the result to `dist/<theme_name>-<version>.zip`. `config/settings_data.json` / `config/settings_schema.json` are untouched. **Run this only right before an actual Theme Store zip upload — not needed for day-to-day dev or demo-store `shopify theme push`.**

## Section map — 38 sections across 4 lanes

Status: ✅ base exists (minimal, enhance to parity) · ⬜ to build. Source = `web/lib/sections/<name>.tsx`, Schema = `web/theme/schema/<name>.json`.

### Lane A — Static / content (no commerce data, low risk; depends on icon/button only)
| Section | Status | Snippets | JS |
|---------|--------|----------|-----|
| rich-text | ⬜ | button | — |
| image-with-text | ⬜ | button | — |
| multicolumn | ⬜ | icon, button | — |
| logo-list | ⬜ | — | — |
| marquee | ⬜ | — | — |
| newsletter | ⬜ | button | — |
| map | ⬜ | — | — |
| video | ⬜ | icon | `video.js` (lazy poster→iframe) |
| image-gallery | ⬜ | — | — |
| collapsible-content | ⬜ | icon | `accordion.js` |
| blog-posts | ⬜ | — | — |
| testimonials | ⬜ | icon(star) | — |
| footer | ⬜ | icon, button | — |
| announcement-bar | ⬜ | icon | `announcement.js` (rotate/dismiss) |
| contact-form | ⬜ | button | — |
| custom-liquid | ⬜ | — | — |

### Lane B — Commerce (depends on product-card / price)
| Section | Status | Snippets | JS |
|---------|--------|----------|-----|
| featured-collection | ⬜ | product-card, button | — |
| featured-product | ⬜ | price, button, icon | `variant-picker.js` |
| collection-list | ⬜ | button | — |
| related-products | ⬜ | product-card | — |
| complementary-products | ⬜ | product-card | — |
| main-product | ✅ enhance | price, button, tag, product-media* | `variant-picker.js`, `product-gallery.js` |
| main-collection | ✅ uses product-card | product-card | `facets.js` (filter/sort) |
| main-cart | ✅ uses button | button, price | `cart.js` (qty/remove) |
| main-search | ✅ enhance | product-card | `predictive-search.js` |

### Lane C — Interactive (depends on JS architecture)
| Section | Status | Snippets | JS |
|---------|--------|----------|-----|
| header | ⬜ | icon, button | `mega-menu.js`, `cart-drawer.js`, `search-modal.js` |
| slideshow | ⬜ | icon, button | `slideshow.js` (custom element carousel) |
| hero | ⬜ | button | — |
| build-your-kit | ⬜ | product-card, price | `build-your-kit.js` (moat feature) |
| drop-system | ⬜ | button | `drop-countdown.js` (moat feature) |
| lookbook | ⬜ | icon | `lookbook.js` (hotspots) |

### Lane D — QA / gate (cross-cutting, runs continuously)
Runs DoD on every section PR: theme check + `/tjson` + contrast + Lighthouse (needs store password). Maintains this manifest's status column. Owns `snippets/product-media.liquid` (shared PDP gallery) as a foundation follow-up.

### Low-priority polish (base main-* already pass; enhance after lanes A–C)
main-page, main-blog, main-article, main-account, main-password, main-gift-card (`templates/gift_card.liquid`).

## CSS additions (queue — Lane D approves before touching tailwind.css)
- Lane B (commerce): sections use React-parity arbitrary utilities not yet in `tailwind.css` (e.g. `aspect-[3/4]`, `aspect-[4/3]`, `max-w-[72rem]`, `max-w-[64rem]`, `grid-cols-[repeat(var(--cols-desktop,4),minmax(0,1fr))]`, `min-h-[640px]`, `text-[clamp(...)]`, `md:[direction:rtl]`, `translate-y-full`, `backdrop-blur`, `bg-surface-page/95`, `from-ink-950/85`, `text-paper/70`, `border-paper/40`, `ring-offset-surface-page`, `peer-focus-visible:ring-accent-press`, `shadow-[var(--shadow-pop)]`). These compile in dev (browser Tailwind) like the foundation card; **regenerate `tailwind.css` (`@tailwindcss/cli` scanning `theme/`) before shipping `production-css-inline`**. No `tailwind.css` edits made.

## Locale additions (queue — Lane D adds to locales/en.default.json in final pass)
- Lane A used `newsletter.label` + `newsletter.success` (already present). The following user-facing strings are currently hardcoded English literals (theme-check `TranslationKeyExists` forbids `| t` for non-existent keys); Lane D may add keys and swap them in: `localization.country_label` = "Country/region", `localization.language_label` = "Language", `localization.update` = "Update" (footer + announcement-bar), `video.play` = "Play video" (video), `announcement.default` = "Free shipping on orders over $50" (announcement-bar), `contact.success` = "Thanks — we will be in touch." (contact-form).
- Lane B (commerce): no NEW locale keys introduced. Reused existing keys with `| default` fallbacks (`products.product.add_to_cart`/`sold_out`, `sections.cart.title`/`subtotal`/`checkout`/`empty`/`continue`/`remove`, `general.search.title`/`search`/`placeholder`, `sections.featured_collection.view_all`). All other section copy (e.g. "Order note", "Spec sheet", "Pickup available", "Pairs well with", "You might also like", "In stock") is literal English per rule 6 — Lane D may optionally promote to keys. NOTE: main-product schema's `t:sections.main-product.*` / `t:labels.*` / `t:blocks.*` keys do not exist in `locales/en.default.schema.json` (frozen) and theme-check `ValidSchemaTranslations` errors on them, so they were rendered as literal English labels instead of the source `t:` refs.
