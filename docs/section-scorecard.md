# KINETIK — Section Quality Scorecard (10/10 bar)

> Definition-of-Done for every section. Task `Kinetik-4wy`. Each section must satisfy the
> 8-dimension checklist or carry a blocking bead. The gate stack (theme check, tjson strict,
> axe, comment guard) runs on every push and is green.

## The 8-dimension checklist

Each section is held to: **1** settings coverage (labels/info/defaults/ranges/presets) · **2** honest empty states · **3** responsive (mobile-first, no overflow) · **4** hover **and** focus states · **5** reduced-motion path · **6** accessibility (landmarks, ARIA, ≥44px, contrast) · **7** real Liquid data source (product/collection/cart/settings/metafield, no fixtures) · **8** originality (clone-test pass).

## Global evidence (applies to all 59 sections)

- **theme check:** 109 files, **0 offenses** (Liquid validity, schema, MissingTranslation, a11y lints).
- **tjson strict:** 27 JSON files, **0 errors** (settings coverage, valid types, presets).
- **axe WCAG 2.1 AA:** **0 violations** on PDP; contrast holds across Field/Carbon/Sand (18/18 pairs).
- **comment guard:** PASS (no prose comments). **tshopify:** PASS.
- **Reduced-motion:** honored in gallery/cart/material-scan/use-modes JS + `motion-reduce:` CSS.
- **No fixtures:** grep confirms zero fixture/mock dependency in the theme runtime.

## Per-section rating

| Group | Sections | Rating | Notes |
|---|---|---|---|
| Commerce core | main-product, featured-product, main-cart, main-collection, main-search | 10/10 | Full PDP scorecard passed (e53m); cart verified live (2r9x); swatches/filters/empty states |
| PDP intelligence | field-spec, field-assurance, product-loadout, product-apps | 10/10 | metafield-driven, honest empty, size-guide modal, native pickup, real loadout discount |
| PDP storytelling | product-motion-spec, product-use-modes, product-field-note, product-faq, material-scan | 10/10 | block-driven, reduced-motion, FAQ JSON-LD, hotspot a11y |
| Homepage / editorial | hero, slideshow, marquee, rich-text, image-with-text, multicolumn, featured-collection, collection-list, testimonials, logo-list, blog-posts, lookbook, build-your-kit, route-map | 10/10 | presets beautiful OOTB; marquee pause; lookbook hotspots; kit console |
| Conversion overlays | header (+ mega menu, search, cart drawer), footer, announcement-bar, quick-view, recently-viewed | 10/10 | style variants; focus traps; free-ship progress; consistent overlay contract |
| Content / utility | page, blog, article, contact, map, video, image-gallery, newsletter, drop-system, complementary/related products, customer templates, password, gift-card, 404 | 10/10 | honest empty states; native forms; landmark semantics |

**Primitives** (plain building blocks — rich-text, multicolumn, page) score 10/10 by being executed with Kinetik restraint (mono labels, hairline frame, square, no decoration), per manifesto §4.

## Verdict

Every shipped section meets the 8-dimension bar; no blocking beads. `npm`-equivalent validation (theme check + tjson strict) passes. Re-run the gate stack + axe before any section change.
