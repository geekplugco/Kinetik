# Theme Guards & Smoke Tests

Strict, deterministic quality gates for the Shopify theme in `theme/`. Every guard exits non-zero
on a violation so it can block a push. Run the whole suite with `npm run gate:theme` (from `web/`).

| Command (from `web/`) | Script | Enforces |
|---|---|---|
| `npm run guard:comments` | `scripts/guard-comments.mjs` | No prose comments in Liquid/JS/JSON (names carry meaning) |
| `npm run guard:settings` | `scripts/guard-settings.mjs` | Every schema setting is wired to output; no phantom refs |
| `npm run guard:perf` | `scripts/guard-perf.mjs` | No render-blocking / layout-shift patterns |
| `npm run smoke:sections` | `scripts/smoke-sections.mjs` | Every template + configured section renders live, no Liquid errors |
| `npm run gate:theme` | — | comments + settings + perf + `theme check` + JSON strict gate |

## guard-settings — no hardcoded-where-a-setting-exists, no dead settings

Parses each section's inline `{% schema %}` and cross-checks it against the rendered Liquid body:

- **Dead setting** — a `settings`/`blocks[].settings` `id` declared in schema but never read in Liquid.
  A setting that does nothing misleads the merchant. Either wire it or remove it.
- **Phantom reference** — `section.settings.x` / `block.settings.x` used in Liquid with no matching
  schema `id` (typo → renders blank, or a value that should be a global `settings.x`).
- **Preset mismatch** — a preset sets a setting the schema doesn't declare.
- **Global coverage** — `config/settings_schema.json` ids never referenced anywhere (warning).

It resolves the theme's real Liquid idioms so it doesn't false-positive: `assign s = section.settings`
aliases, renamed block loop vars (`for point in points` where `points = section.blocks | where: …`),
and dynamic `block.settings[key]` / aliased-bracket access (downgraded to a manual-verify warning).

## guard-perf — performance is a hard gate

Flags, as errors: `<img>` missing `width`/`height` (CLS) or `loading`; `<script src>` without
`defer`/`async`; `<iframe>` without `loading="lazy"`; the render-blocking `| script_tag` filter;
any Google Fonts reference (use `font_picker` + `font_url`). Warnings: `autoplay` video without
`muted`, `preload="auto"` media, `image_url` with no `width:` (serves the master image), CSS `@import`.

## smoke-sections — bind real settings + data, never hardcode

Authenticates against the storefront password, pulls **live** handles via Admin GraphQL
(product / collection / page / blog / article — no hardcoded values), then for the unpublished
preview theme:

1. Renders every standard template (index, product, collection, list-collections, page, blog,
   article, search, cart, 404) and asserts status + zero `Liquid error` / `translation missing`.
2. Re-renders every section configured in `templates/index.json` through the **Section Rendering
   API** (`?sections=` in batches of 5 — Shopify's per-request cap) and asserts each is non-empty
   and clean.
3. Binding checks: confirms real `settings_data.json` values reach the DOM (`--page-width`,
   `data-color-scheme`).

Env overrides: `SMOKE_STORE`, `SMOKE_THEME`, `SMOKE_PASSWORD`, `SMOKE_THEME_DIR`. Admin token is
read from `$TMPDIR/admin-token.txt` (falls back to skipping data-bound templates if absent).

## Wired global settings

All previously-unwired globals now drive output (verified live):

| Setting | Wiring |
|---|---|
| `cart_type` | header cart icon → drawer button vs `/cart` link; `<cart-drawer>` only renders in drawer mode |
| `settings.cart_type` | global choice between cart page and drawer |
| `sections/header.liquid > show_free_shipping_goal` | gates the cart-drawer free-shipping progress bar |
| `sections/header.liquid > free_shipping_threshold` | drawer threshold in store currency units |
| `sections/header.liquid > show_cart_note` | gates the cart-drawer order-note field |
| `sections/main-cart.liquid > free_shipping_threshold` | cart page threshold in store currency units |
| `search_show_count` | gates the search results-count line |
| `button_uppercase` | conditional `uppercase` class in `snippets/button.liquid` (link variant excluded) |
| `animate_reveal` | `body[data-animate-reveal="false"]` forces `.hp-reveal` visible (no scroll animation) |
| `animate_hover` | `body[data-animate-hover="none"]` neutralizes card image zoom / shimmer / lift |
| `section_divider` | `body[data-section-divider="hairline"]` adds a hairline between `#MainContent` sections |

The only remaining `guard:settings` warnings are `lookbook.liquid` block settings accessed via
dynamic `block.settings[key]` keys — flagged for manual verify, confirmed used.
