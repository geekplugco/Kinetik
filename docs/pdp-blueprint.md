# KINETIK — PDP Architecture Blueprint

> The canonical product-detail-page design. Every PDP implementation task builds to this
> document; if an impl decision contradicts the blueprint, the blueprint is updated first,
> then the code follows.

**Status:** canonical · **Owner:** Kinetik design · **Task:** `Kinetik-34cm`
**Governs:** `Kinetik-fvsw` (media lab), `Kinetik-a9y0` (variant lab / purchase panel),
`Kinetik-49st` (fit/size/material), `Kinetik-nf4c` (trust/fulfillment), `Kinetik-a3mc`
(storytelling), `Kinetik-vctj` (loadout/bundle), `Kinetik-bnz3` (app block / reviews),
`Kinetik-5c8t` (mobile QA), `Kinetik-e53m` (10/10 scorecard).
**Measured against:** [`originality-manifesto.md`](./originality-manifesto.md) P1–P12.

---

## 0. Thesis

The current PDP is generic: gallery-left / buy-box-right / fixed accordions — it could drop into
Dawn and look native (fails the clone test). The Kinetik PDP is **a product dossier you can buy
from**: a fast commerce deck on top, then a descending technical brief — media → purchase →
spec intelligence → field evidence → loadout — every claim merchant-owned and rendered only when
real (P10). It reads top-to-bottom like a spec sheet (P4), framed by the hairline grid (P2),
oversized where it sells the silhouette (P3), dense where the customer is deciding (P9).

The decisive test (manifesto §2): **with the `KINETIK.` logo removed, a reviewer must still
identify this PDP as Kinetik** — by grid, mono telemetry voice, Volt rationing, and square edges.

---

## 1. Zone map

A PDP is a **template** (`templates/product.json`) composed of independent sections (P11), not one
monolith. Top zone is `main-product`; everything below is a separate, reorderable, removable section
so a merchant can compose the dossier per product type (a jacket needs material-scan; an accessory
may not).

```
DESKTOP (≥990px)                                   MOBILE (<750px, single column)
┌───────────────────────────────────────────┐     ┌─────────────────────────────┐
│ ZONE A · COMMERCE DECK   (main-product)     │     │ A1 Media Lab (swipe gallery)│
│ ┌─────────────────┐ ┌─────────────────────┐ │     │  breadcrumb · code · badge  │
│ │ A1 MEDIA LAB    │ │ A2 PURCHASE PANEL    │ │     ├─────────────────────────────┤
│ │  thumb rail +   │ │  code · title · price│ │     │ A2 Purchase Panel           │
│ │  sticky main    │ │  swatches · sizes    │ │     │  title·price·swatch·size·qty│
│ │  zoom · video   │ │  qty · ADD (Volt)    │ │     │  ADD (inline)               │
│ │  variant-linked │ │  dynamic checkout    │ │     │  ── fit/fulfil micro-strip  │
│ │                 │ │  ── fit micro-facts  │ │     ├─────────────────────────────┤
│ │  (sticky info   │ │  ── fulfillment strip│ │     │ B Spec Intelligence (tabs/  │
│ │   column scrolls│ │  ── trust row        │ │     │    stacked panels)          │
│ │   with panel)   │ │                      │ │     ├─────────────────────────────┤
│ └─────────────────┘ └─────────────────────┘ │     │ C Trust & Fulfillment       │
├───────────────────────────────────────────┤     ├─────────────────────────────┤
│ ZONE B · SPEC INTELLIGENCE  (field-spec)    │     │ D Product Story (stacked)   │
│   spec table · material · care · size guide │     ├─────────────────────────────┤
├───────────────────────────────────────────┤     │ E Loadout + related         │
│ ZONE C · TRUST & FULFILLMENT (field-assurance)│   ├─────────────────────────────┤
├───────────────────────────────────────────┤     │ F Recently viewed           │
│ ZONE D · PRODUCT STORY  (4+ story sections) │     └─────────────────────────────┘
├───────────────────────────────────────────┤     + STICKY ATC bar appears once the
│ ZONE E · LOADOUT + complementary + related  │       inline ADD scrolls out of view
├───────────────────────────────────────────┤       (hairline top, square, Volt,
│ ZONE F · RECENTLY VIEWED                    │        mono "ADD · $336", expo-out 220ms)
└───────────────────────────────────────────┘
```

---

## 2. Zone-by-zone specification

Legend for **Source**: `product` = native product fields · `variant` = variant fields ·
`mf:<ns.key>` = product metafield · `block` = merchant section block · `setting` = section setting ·
`app` = `@app` block / app block · `derived` = computed in Liquid.

### ZONE A — Commerce Deck · `sections/main-product.liquid`

The only above-the-fold zone. Two columns desktop, stacked mobile. Owns the buy decision; carries
nothing that isn't decision-relevant. Sticky-info column (desktop) keeps the panel in view during
media scroll; sticky ATC (mobile) keeps the action reachable.

#### A1 — Media Lab  → **`Kinetik-fvsw`**
| Element | Source | Merchant control | Empty state |
|---|---|---|---|
| Gallery layout (stacked / thumbnail rail / slider) | `setting gallery_layout` | select | thumbnail default |
| Main media (image / video / external_video / model) | `product.media` | — | `product.featured_image`; else hairline placeholder cell |
| Thumbnail rail | `product.media` | `setting` show/hide | hidden if ≤1 media |
| Variant-linked media | `variant.featured_media` | auto | falls back to first media |
| Zoom / lightbox | `setting enable_image_zoom` | checkbox | off → no cursor-zoom |
| Caption / alt | `media.alt` | per-image (Files) | omitted |
| Technical reveal overlay (mono dimension callouts) | `mf:custom.media_notes` (list) | block | no overlay |

Behavior (P6/P7/P12): variant change swaps media **instantly** (no spinner); first image is the LCP
target (`fetchpriority=high`, explicit width/height → no CLS); thumbnails are buttons with
`aria-selected`; **mobile = swipe + dot index**, never hover-only; zoom has a tap path on touch;
`prefers-reduced-motion` disables the zoom transform. Media is framed by hairlines, never bled under text.

#### A2 — Purchase Panel  → **`Kinetik-a9y0`**
| Element | Source | Merchant control | Empty state |
|---|---|---|---|
| Eyebrow: product code | `mf:custom.product_code` | block | hidden |
| Badge (e.g. `NEW`, `−20%`) | `mf:custom.badge` / `derived` sale | block | hidden |
| Title | `product.title` | block | — |
| Review stars (placeholder for app) | `app` / `block` | — | hidden until app present (P10) |
| Price · compare-at · unit price | `product.price` `compare_at` | block | — |
| Color swatches | `variant options` + `mf` swatch / `setting swatch_list` | block | dropdown fallback |
| Size / option buttons | `variant options` | block | dropdown fallback |
| Size-guide trigger | links to Zone B size guide modal | `setting` | hidden if no guide |
| Sold-out / unavailable per combo | `variant.available` | auto | disabled + mono `SOLD OUT` |
| Inventory message | `variant.inventory_quantity` policy | `setting low_stock_threshold` | hidden |
| Quantity | `product` + qty rules | `setting` | default 1 |
| **Add to cart** (Volt, square) | form | block | `SOLD OUT` disabled |
| Dynamic checkout / Shop Pay | `{{ form | payment_button }}` | `setting` (native, no hardcoded link) | hidden |
| Fit micro-facts (1-line) | `mf:custom.fit_summary` | block | hidden |
| Fulfillment strip (ships-in, returns) | Zone C settings, condensed | `setting` | hidden |

Behavior: all variant state Shopify-native via `variant-picker.js` (dispatches `variant:change`);
ATC shows loading + error states; **sticky mobile ATC** mirrors price + ADD, appears only after the
inline ADD scrolls away, and **never covers** critical content (respects safe-area). Volt appears
**once** here — on ADD (P1). Keyboard: full tab order, visible ink/Volt focus ring (P12).

### ZONE B — Spec Intelligence · `sections/field-spec.liquid` (new)  → **`Kinetik-49st`**

The dossier's data core — the spec-sheet voice made literal (P4). Metafield-driven with block
fallback so it works on any store; renders only rows that have data (P10).

| Module | Source (primary → fallback) | Empty state |
|---|---|---|
| Field spec table (rows of `LABEL · value`) | `mf:custom.spec` (multiline / list) → `block spec_row` | section hidden if 0 rows |
| Material composition | `mf:custom.material` → `block` | row omitted |
| Weight / dimensions | `mf:custom.weight`, `mf:custom.dimensions` → `block` | row omitted |
| Care instructions | `mf:custom.care` → `block` | row omitted |
| Use-case / weather badges | `mf:custom.use_cases` (list) → `block` | strip hidden |
| Compatibility | `mf:custom.compatibility` → `block` | row omitted |
| **Size guide** (accessible modal) | `mf:custom.size_chart` (table) → `block size_row` → linked `page` | trigger hidden if none |
| Fit notes (runs small/true/large) | `mf:custom.fit_notes` → `block` | hidden |

Size guide modal is a focus-trapped dialog (reuse `KinetikTrap`), ESC/backdrop close, returns focus.
Presented as Kinetik telemetry, **not** a generic accordion stack — labeled cells on the hairline grid.

**Proposed product metafields (namespace `custom`, single-line/list/rich-text as noted):**
`product_code` (✓ exists), `spec` (✓), `badge` (✓), `material`, `care`, `weight`, `dimensions`,
`fit_summary`, `fit_notes`, `use_cases` (list.single_line), `compatibility`, `size_chart`
(rich-text/table), `media_notes` (list). `Kinetik-49st` defines these in the store-setup script and
the section reads them defensively (`if mf != blank`).

### ZONE C — Trust & Fulfillment · `sections/field-assurance.liquid` (new)  → **`Kinetik-nf4c`**

Every line is merchant-owned or Shopify-backed — **zero fake claims ship by default** (P10).

| Element | Source | Default when unset |
|---|---|---|
| Store pickup availability | Shopify `pickup_availability` (native) | hidden (no invented location) |
| Shipping / returns note | `block` + linked `policy`/`page` | hidden |
| Warranty / promise | `block richtext` | hidden (no fake warranty) |
| Installments / Shop Pay messaging | native payment terms | hidden |
| Low-stock signal | `variant.inventory` + `setting threshold` | hidden |
| Delivery-estimate placeholder | `setting` (merchant text) | hidden |
| Support / contact | `block` link | hidden |
| Trust badges | merchant-uploaded `image` blocks | hidden (no stock badges) |

Compact, non-distracting hairline row of cells; mono labels; no urgency theater (no "247 viewing").

### ZONE D — Product Story · 4+ sections  → **`Kinetik-a3mc`**

Signature storytelling, each a primitive-plus with a real **Unique** (manifesto §4). Ships as presets
on `product.json` but each degrades cleanly when content is absent. Target ≥4 of:

1. **Motion-spec story** (`product-motion-spec.liquid`) — oversized mono stat callouts (`480g · 40H · IPX4`) over editorial media; numbers do the selling (P4).
2. **Material scan** (`product-material-scan.liquid`) — macro detail image(s) with hairline-framed annotation pins; reduced-motion safe.
3. **Construction detail** (`product-construction.liquid`) — exploded/feature list paired to images; block-driven.
4. **Field-test quote** (`product-field-note.liquid`) — single attributed quote in display type; merchant content only (not a fake testimonial).
5. **Use-case mode switcher** (`product-use-modes.liquid`) — transform-only tab swap between scenarios (e.g. `URBAN / TRAIL / TRANSIT`).
6. **Route map / editorial close** — optional brand beat.
7. **Product FAQ** (`product-faq.liquid`) — collapsible, metafield or block driven; ships structured-data FAQ when content present.

All animate transform/opacity only, honor reduced-motion, and pass the clone test individually.

### ZONE E — Loadout & Cross-sell  → **`Kinetik-vctj`** + existing
| Module | Source | Section |
|---|---|---|
| Build-the-loadout bundle | `mf:custom.loadout` product list → `block` | `product-loadout.liquid` (new) |
| Complementary products | Shopify Search & Discovery recommendations (`intent: complementary`) | `complementary-products.liquid` (exists) |
| Related products | recommendations (`intent: related`) | `related-products.liquid` (exists) |

Loadout = the Kinetik take on "complete the kit": pick a base, add modules, one combined ATC; honest
about availability; no fake discount unless a real Shopify bundle/discount exists.

### ZONE F — Recently Viewed · `recently-viewed.liquid` (exists)
Client-side from `localStorage`; hidden when empty. Already shipped.

### App-block / reviews compatibility (cross-zone) → **`Kinetik-bnz3`**
`@app` blocks accepted in `main-product` (A2) and as standalone sections in Zones B/D so review apps
(Judge.me, Loox, Okendo), bundle apps, and subscription apps mount without theme edits. Review summary
slot under the title (A2) and a full review section in Zone D — both render **nothing** until an app
provides content (P10). No hardcoded review markup.

---

## 3. `templates/product.json` — target composition

Default product (general). Specialized templates (`product.jacket.json`, etc.) reorder/remove zones.

```
order: [
  "main",              # Zone A  · main-product
  "field-spec",        # Zone B  · Kinetik-49st
  "field-assurance",   # Zone C  · Kinetik-nf4c   (compact; may also inline into A2)
  "motion-spec",       # Zone D1 · Kinetik-a3mc
  "material-scan",     # Zone D2
  "construction",      # Zone D3
  "use-modes",         # Zone D5
  "product-faq",       # Zone D7
  "loadout",           # Zone E  · Kinetik-vctj
  "complementary",     # Zone E  · exists
  "related",           # Zone E  · exists
  "recently_viewed"    # Zone F  · exists
]
```

Every section ships an empty/honest state, so this full stack renders cleanly even on a product with
only an image, a title, and a price.

---

## 4. Mobile-first rules (governs `Kinetik-5c8t`)

- Single column; zones stack in the order above. No hover-only affordance has a desktop-only path (P6).
- Media Lab = swipe + dot index + tap-zoom. Thumbnails collapse to dots <750px.
- Purchase Panel inline ADD first; **sticky ATC** appears on scroll-away, respects safe-area, never
  overlaps the inline form or footer.
- Spec Intelligence panels are tap-to-expand cells (not nested accordions); size-guide modal is full-screen on mobile.
- Tap targets ≥44px; focus order matches visual order; `prefers-reduced-motion` honored everywhere.
- No layout-animating reveal; first image LCP-optimized; defer non-critical section JS.

---

## 5. Data-source discipline (the P10 contract)

1. **Real or absent.** Every claim traces to `product` / `variant` / `metafield` / merchant `block`/`setting`
   / native Shopify (pickup, payment terms, recommendations). If a source is empty, the element does not render.
2. **No fake defaults.** No invented location, warranty, review count, urgency counter, or testimonial in shipped Liquid.
3. **Metafield → block fallback.** Technical content reads metafields first (scales to the merchant's catalog),
   falls back to section blocks (works with zero metafield setup), then renders nothing.
4. **Native over custom.** Shop Pay/installments via `payment_button`/native terms (no hardcoded links);
   recommendations via the Search & Discovery API; pickup via `pickup_availability`.

---

## 6. Originality alignment (per zone, manifesto §4)

| Zone | Unique to Kinetik | Avoided (anti-copy) |
|---|---|---|
| A1 Media Lab | hairline-framed media with mono technical-reveal callouts; instant variant swap | no scrim/gradient wash (P7), no spinner on swap (P6) |
| A2 Purchase Panel | mono telemetry buy box, Volt used exactly once (ADD), square controls | no second accent, no pill button, no fake review stars (P1/P5/P10) |
| B Spec Intelligence | spec-sheet-as-interface: labeled cells on the grid, not accordions | no generic "Description / Shipping / Reviews" tab clone (P11) |
| C Trust & Fulfillment | every line data-backed; honest empty states | no stock trust badges, no "247 viewing" urgency (P10) |
| D Product Story | oversized stat storytelling (`480g · 40H`) as the hero device | no parallax theater, no reveal-on-scroll choreography (P6) |
| E Loadout | "build the loadout" framed in Kinetik lexicon | no fake bundle discount; native recommendations only (P10) |

**Clone test:** PASS — with the logo removed, the descending spec-dossier rhythm, mono telemetry labels,
hairline cell grid, square edges, and single rationed Volt identify this as Kinetik and nothing else.

---

## 7. Build order (how impl tasks consume this blueprint)

1. `Kinetik-fvsw` — A1 Media Lab (rebuild `main-product` media column).
2. `Kinetik-a9y0` — A2 Purchase Panel (rebuild buy box; sticky mobile ATC).
3. `Kinetik-49st` — Zone B `field-spec` + size-guide modal + metafield set.
4. `Kinetik-nf4c` — Zone C `field-assurance`.
5. `Kinetik-a3mc` — Zone D story sections (≥4).
6. `Kinetik-vctj` — Zone E `loadout`.
7. `Kinetik-bnz3` — app-block/review slots across A2/B/D.
8. `Kinetik-5c8t` — mobile-first QA pass against §4.
9. `Kinetik-e53m` — 10/10 scorecard + ruthless review against this blueprint + the manifesto.

Each task opens by reading this file and the originality manifesto, and ships its **Originality Note**.
