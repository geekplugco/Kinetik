# KINETIK — Premium Theme Benchmark (transform, don't copy)

> What Theme-Store buyers expect from a premium theme (Hyper, Prestige, Impulse, Broadcast,
> Symmetry, Dawn+), and how Kinetik **meets the bar and transforms the pattern** through
> P1–P12 rather than cloning it. Every row records the expectation, Kinetik's answer (with the
> shipped surface), and what was deliberately dropped. Per `originality-manifesto.md` §3, no
> benchmark pattern enters the theme un-transformed.

**Status:** canonical · **Task:** `Kinetik-9un` · Feeds `apx4` (moat matrix), the 10/10 scorecards, and section design.

---

## 1. Feature-expectation matrix

| Expectation (premium bar) | Kinetik answer (shipped surface) | Dropped / refused |
|---|---|---|
| **PDP media gallery** w/ zoom, video, thumbnails | Media Lab: scroll-snap gallery, stacked/thumbnail/slider, image/video/model, cursor+tap zoom, mobile swipe+dots, keyboard (`main-product` + `product-gallery.js`) | carousel libs, spinner on variant swap |
| **Variant swatches + quick add** | swatch/dropdown picker, unavailable-marking, inventory, instant media/price/**SKU** swap; quick-view modal (`variant-picker.js`, `quick-view`) | fake stock, second accent |
| **Sticky add-to-cart** | sticky mobile ATC, hairline top, square, single Volt, safe-area, 44px | soft shadow, pill |
| **Metafield / spec rendering** | Spec Intelligence cell grid + size-guide modal, 10 metafield defs on 18 products (`field-spec`) | generic Description/Shipping/Reviews accordion clone |
| **Trust / shipping / pickup blocks** | native pickup, real policy links, merchant blocks — **zero fake claims** (`field-assurance`) | fake "247 viewing", stock badges |
| **Free-shipping progress + cart drawer** | drawer w/ progress bar, inline qty/remove, order note, cart state = Shopify (`cart-drawer.js`) | optimistic fake cart state, fake urgency |
| **Bundles / frequently-bought** | Field Loadout (per-product metafield, multi-add, in-cart dedup) + Kit console w/ **real** Shopify automatic discount | fake bundle "save X%" |
| **Editorial storytelling sections** | motion-spec, use-modes tabs, field-note, FAQ+JSON-LD, material-scan hotspots, route-map | parallax/reveal-on-scroll theater |
| **Reviews / app blocks** | `@app` slots + standard `reviews.rating` path, honest-empty (`product-apps`) | hardcoded fake ratings |
| **Multi-style / presets** | 3 native color-scheme presets (Field/Carbon/Sand), header/footer style variants | React style switcher, `data-preset` runtime |
| **Mega menu + search** | mega menu w/ in-menu promo + featured product, predictive search combobox | gradient wash headers |
| **Performance** | LCP `fetchpriority=high`, 0 CLS (dimensioned imgs), all JS deferred, native scroll-snap | render-blocking JS, carousel weight |
| **Accessibility** | 0 axe WCAG 2.1 AA violations, focus traps, ARIA tabs/dialog, ≥44px, reduced-motion | a11y as afterthought |
| **Merchant customizability** | every section: settings + blocks + presets + color_scheme, metafield-first w/ block fallback, `t:` localized | over-complicated setting sprawl |

## 2. Quality bars (the 10/10 gates)

Premium buyers reject themes that fail *any* of: no fake content, mobile ≥44px + no overflow, WCAG AA, LCP/CLS clean, theme-check 0, app-block ready, real Shopify objects (no fixtures). Kinetik holds all of these as **gates**, not aspirations — see `pdp-scorecard.md` (11 categories 10/10) and the gate stack (theme check 0, tjson strict 0, comment guard, tshopify, axe 0) run on every push.

## 3. The transform rule

Studying premium themes is encouraged; copying is forbidden. Each benchmark insight is re-expressed through the twelve principles before code — the recorded SAW/PRINCIPLE/KINETIK/DROPPED transform (manifesto §3). The decisive check: **with the `KINETIK.` logo removed, the theme must still read as Kinetik** — by exposed hairline grid, mono spec-sheet voice, oversized Space Grotesk, rationed Volt, and square edges. A section that could sit unchanged in Dawn/Prestige/Impulse is not yet Kinetik.

## 4. Where Kinetik is deliberately *narrower*

Kinetik does not chase every premium feature. It refuses: multiple accent colors, gradient/glass surfaces, decorative motion, fake social proof, and rounded-everything softness. The moat is **restraint executed at premium fidelity** — a spec sheet that happens to be beautiful — not feature maximalism.
