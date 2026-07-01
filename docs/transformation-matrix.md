# KINETIK — Anti-Derivative Transformation Matrix

> Every benchmarked premium-theme pattern must be **transformed into an original Kinetik version
> or rejected** before it enters implementation. No benchmark item ships un-transformed.
> Task `Kinetik-jdt1` · feeds from `benchmark-expectations.md` (9un) · governed by `originality-manifesto.md` §3.

**Columns:** Source pattern category · Copy risk (looks derivative?) · Kinetik transformation (via P#) · Implementation (shipped surface / issue) · Originality verdict.

| Source pattern | Copy risk | Kinetik transformation (P#) | Implementation | Verdict |
|---|---|---|---|---|
| Product image zoom | Med — every theme has it | Cursor-zoom **+ touch tap-zoom**, reduced-motion aware; framed by hairline media cells, mono technical caption (P4/P7/P12) | `product-gallery.js` (fvsw) | ORIGINAL |
| "Complete the look" product rail | High — ubiquitous carousel | **Field Loadout matrix** — base + checkbox add-ons, hairline checklist, telemetry total, real multi-add + in-cart dedup (P2/P4) | `product-loadout` (vctj) | ORIGINAL |
| Bundle "save X%" builder | High — fake-discount trap | **Loadout console** with slots + a **real Shopify automatic discount** (no theme-side fake) (P10) | `build-your-kit` + discount (vahs) | ORIGINAL |
| Countdown / drop urgency | High — fake urgency | Drop telemetry: honest timestamps only, no invented "247 viewing" (P10) | manifesto §Drop; no fake counters | REJECT fake / TRANSFORM honest |
| Sticky add-to-cart | Med | Hairline-top, square, single Volt, mono "ADD", slide-up, safe-area (P2/P5/P6) | `main-product` sticky ATC | ORIGINAL |
| Spec/description accordions | Med — Dawn default | **Spec cell grid** — telemetry cells on the exposed grid, metafield-driven, not tabs (P2/P4) | `field-spec` (49st) | ORIGINAL |
| Trust badges strip | High — stock clipart | Data-backed assurance cells: native pickup, real policy links, no badge clipart (P10/P11) | `field-assurance` (nf4c) | ORIGINAL |
| Lifestyle "shop the look" hotspots | Med | **Material scan** — Volt pins over macro image, lab-proof detail cards (P4/P7) | `material-scan` (bns8) | ORIGINAL |
| Testimonial slider | High — fake reviews | Single attributed **field note** (merchant-owned, no fabricated reviews) + standard review-app slot (P10) | `product-field-note`, `product-apps` (a3mc/bnz3) | ORIGINAL / honest |
| Editorial journey / lookbook | Med — magazine clone | **Route map** — numbered stops on a hairline route, mono coordinates, shoppable cells, no scroll theater (P2/P6) | `route-map` (8y4x) | ORIGINAL |
| Mega menu w/ imagery | Med | In-menu promo + featured product, hairline framed, instant reveal, no gradient wash (P6/P7) | `header` mega menu (jckq) | ORIGINAL |
| Free-shipping progress bar | Low-Med | 1px hairline track filling with the one Volt accent toward a real reward, mono readout (P1/P2) | `cart-drawer` (2r9x) | ORIGINAL |
| Multi-style / theme presets | Med | 3 native color-scheme presets (Field/Carbon/Sand), no runtime `data-preset` switcher (P1) | `settings_data` (ai1k, 8mc0) | ORIGINAL |
| Oversized stat storytelling | Low | Instrument-readout numerals in Space Grotesk beside hairline media + proof caption (P3/P4) | `product-motion-spec` (0t4u) | ORIGINAL |

## Rule

A row scores **REJECT** if it can only be shipped as a clone (fake urgency, fake reviews, fake discounts) — those are refused, not transformed. Everything else must carry a transformation note (SAW/PRINCIPLE/KINETIK/DROPPED, manifesto §3) and pass the clone test: **with the logo removed, is it identifiably Kinetik?** No implementation bead proceeds without its row here or an Originality Note in its close.
