# Kinetik — Shopify Port Reference

Detailed manifest so the Next.js prototype ports to a Shopify Liquid theme **without confusion**.
All theme JSON validates against the Shopify schema spec via `/tjson` (**70/70 PASS, 0 errors**).

---

## 1. The 3 styles — READ THIS FIRST (avoid confusion)

The theme ships **3 selectable styles**: **Field System** (default), **Carbon**, **Sand**.

- They are **pure CSS-token re-skins** in `web/tokens/presets.css`, applied via `data-preset` on the root.
  Field = no attribute; Carbon = `data-preset="carbon"`; Sand = `data-preset="sand"`.
- **Images are STYLE-AGNOSTIC and SHARED across all 3 styles.** The product/lifestyle photography is
  neutral studio + editorial; the styles only change **colors via tokens**, never the images.
  → **Do NOT generate or maintain separate image sets per style.** One image set serves all 3.
- All 3 are **WCAG 2.1 AA verified** (axe 0 violations each).

**Shopify port:** map the 3 styles to **`config/settings_data.json` presets** + a `color_scheme_group`
in `settings_schema.json`. Each preset = the token values from `presets.css`. The merchant picks one at
install (Shopify's native "theme style" mechanism). The `data-preset` overrides become `color_scheme`
role values; component CSS already reads semantic tokens (`--accent`, `--surface-page`, …) so nothing
in the sections changes per style.

---

## 2. Product catalog (18 products) → Shopify `product`

Source of truth: `web/lib/shopify/fixtures.ts` (`catalog` array). Images: `web/public/uploads/card-NN-<handle>.png`.

| handle | title | code (SKU) | type | price | image |
|--------|-------|-----------|------|-------|-------|
| shell-jacket | Shell-01 Hardshell | KX-SHELL-01 | Outerwear | $336 / was $420 | card-01-shell-jacket.png |
| cargo-pants | Cargo Tech Pant | KX-PANT-02 | Bottoms | $210 | card-02-cargo-pants.png |
| utility-vest | Utility Vest 6P | KX-VEST-03 | Outerwear | $188 / was $235 | card-03-utility-vest.png |
| sling-bag | Sling 4L | KX-BAG-04 | Bags | $145 | card-04-sling-bag.png |
| sneakers | Trail Runner XS | KX-SHOE-05 | Footwear | $240 / was $300 | card-05-sneakers.png |
| cap | 6-Panel Field Cap | KX-CAP-06 | Accessories | $65 | card-06-cap.png |
| headphones | Field Monitors | KX-AUD-07 | Audio | $290 / was $340 | card-07-headphones.png |
| earbuds | Pulse Earbuds | KX-AUD-08 | Audio | $160 | card-08-earbuds.png |
| smartwatch | Kinetik Watch | KX-WTCH-09 | Wearables | $380 | card-09-smartwatch.png |
| speaker | Field Speaker 02 | KX-SPK-10 | Audio | $175 / was $215 | card-10-speaker.png |
| tech-hoodie | Storm Hoodie | KX-HOOD-11 | Tops | $148 | card-11-tech-hoodie.png |
| insulated-parka | Field Parka 3L | KX-PARKA-12 | Outerwear | $480 / was $560 | card-12-parka.png |
| base-layer | Merino Base LS | KX-BASE-13 | Tops | $90 | card-13-base-layer.png |
| backpack | Roll-Top 22L | KX-PACK-14 | Bags | $195 | card-14-backpack.png |
| hip-pack | Hip Pack 2L | KX-HIP-15 | Bags | $85 | card-15-hip-pack.png |
| beanie | Merino Beanie | KX-BEAN-16 | Accessories | $45 | card-16-beanie.png |
| tech-gloves | Touch Gloves | KX-GLOVE-17 | Accessories | $55 | card-17-gloves.png |
| power-bank | Power Cell 10K | KX-POWER-18 | Tech | $79 | card-18-power-bank.png |

**Field mapping → Shopify product:**
| prototype field | Shopify field |
|---|---|
| `handle` | `product.handle` |
| `title` | `product.title` |
| `description` (from `descriptions.ts`) | `product.body_html` |
| `code` | a variant SKU or `custom.code` metafield |
| `type` | `product.product_type` |
| `spec` | `custom.spec` metafield (single line) |
| `price` / `compareAt` | `variant.price` / `variant.compare_at_price` (in cents) |
| `colors[]` | the `Color` option + `variant`s; swatch hex → `color-pattern` metaobject |
| `img` | `product.featured_image` / `product.media` |
| `badge` | `custom.badge` metafield (e.g. "New") |

**Full descriptions** live in `web/lib/shopify/descriptions.ts` (`productDescriptions[handle]` → HTML).
These are written port-ready: `<p>` intro + `<p>` construction + `<ul>` of concrete specs. → `product.body_html`.

---

## 3. Images → Shopify assets / media

| folder | content | port target |
|---|---|---|
| `uploads/card-NN-*.png` | 18 product cards (ghost-mannequin studio, neutral gray) | `product.featured_image` per handle |
| `uploads/onmodel/*.png` | editorial on-model lifestyle (hero, lookbook, collection cards) | section image settings / `assets/` |
| `uploads/bundle/*.png` | flat-lay / paired product imagery | section image settings |

All images are **style-agnostic** (see §1). Studio cards on a light-gray seamless background read on
Field (white), Carbon (near-black) and Sand (warm bone) alike.

---

## 4. Sections → Liquid `{% schema %}`

43 sections registered (`web/lib/sections/index.ts`). Each has a JSON schema in `web/theme/schema/<name>.json`
that becomes the Liquid `{% schema %}` block. Custom/flagship sections to port:
`build-your-kit`, `drop-system`, `lookbook` (shoppable hotspots), plus the upgraded `header` (mega-menu)
and `main-product` (sticky ATC + spec tabs + swatches). Native-Liquid feasibility is recorded per feature
(Kit = `/cart/add.js` multi-add + automatic-discount/Function; Drop = countdown/inventory/forms, live
social-proof stubbed). All section schemas **PASS `/tjson auto`**.

---

## 5. Shopify schema compliance

- `/tjson` per-file: **70/70 PASS, 0 errors, 0 warnings.**
- `/tjson gate --strict`: content **0 errors**; the only "structure errors" are the not-yet-created Liquid
  `layout/theme.liquid`, `config/settings_data.json`, and `templates/404` — produced during the L01 port.
- Setting types used are all in the Shopify spec; ids unique; presets present; limits respected.

Re-validate after any JSON edit:
`node ~/.claude/skills/teifi-theme-json/src/validate.mjs auto <file>` (or `gate web/theme --strict`).
