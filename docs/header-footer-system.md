# KINETIK — Header & Footer System

> Design + moat spec for the Kinetik header/footer, documented as-built against the shipped
> Liquid. Governs `Kinetik-apx4` (moat matrix), `Kinetik-lpiv` (footer system), `Kinetik-cpkt`
> (header system), and the implementation beads `Kinetik-jckq` / `Kinetik-3yz0`.

**Status:** canonical · Grounded in `originality-manifesto.md` P1–P12 · Shopify-native settings only (no React, no style switcher).

---

## 1. Market moat matrix (apx4)

How the Kinetik header/footer refuse to read like the common Theme Store patterns.

| Pattern seen in premium themes | The commerce truth | Kinetik transform (P#) | Deliberately dropped |
|---|---|---|---|
| Centered logo + soft dropdown nav | brand-forward, calm | Editorial center-logo variant, but nav in **mono uppercase tracking-label**, hairline underlines, no soft shadow (P3/P4/P2) | rounded pill nav, drop-shadow dropdowns |
| Mega menu with lifestyle imagery | inspire + navigate | Mega menu with **in-menu promo + featured product** framed by hairlines, instant expo-out reveal, no fade-wash (P6/P7) | gradient overlays, autoplay video headers |
| Utility bar (search/cart/account icons) | fast access | Tactical **utility strip** with mono utility text slot, 44px targets, Volt only on cart count (P1/P4/P12) | second accent on icons, badge clutter |
| Footer "link farm" columns | navigation + SEO | **Field-manual footer** — numbered/mono column labels on the hairline grid, policy/social/payment as telemetry rows (P2/P4) | rounded social chips, gradient CTA blocks |
| Newsletter footer block | capture | Native `{% form 'customer' %}` newsletter, square input + Volt submit, honest success/error (P10/P1) | fake "join 10k+ members" counts |
| Localization/currency selector | global | Native `localization` form (country + language), mono labels | flag-clutter, JS-only switchers |

**Clone test:** with the logo removed, the mono telemetry nav, hairline column grid, and single rationed Volt identify the header/footer as Kinetik.

---

## 2. Footer system (lpiv) — as built in `sections/footer.liquid`

`footer_style` select drives 4 Shopify-native variants (case-branched Liquid):

| Style | Value | Composition | Use |
|---|---|---|---|
| Field System | `system` | menu columns + brand statement + newsletter + policy/social/payment rows | default, most stores |
| Compact Utility | `compact` | single-row utility: menu inline + policies + payment | minimal / one-page |
| Editorial Masthead | `editorial` | oversized `KINETIK.` masthead + sparse columns + newsletter | brand/lookbook stores |
| Split Conversion | `split` | left brand + newsletter, right menu grid + trust | conversion-led |

**Settings/blocks:** `link_list` menus (block-driven), `richtext` brand statement, native newsletter form, social links, payment icon toggle, `localization`/currency area, policy links (auto from shop policies), promo/media slot. **Mobile:** columns collapse to stacked accordion-free groups. **A11y:** landmark `<footer>`, labeled newsletter input, 44px links. **Field/Carbon/Sand:** adapts via `data-color-scheme` + `color-schemes.liquid`.

## 3. Header system (cpkt) — as built in `sections/header.liquid`

`header_style` select drives native variants (case-branched):

| Style | Value | Composition |
|---|---|---|
| Tactical Utility | `utility` | logo left, nav center, utility (search/cart/account) right + announcement stack |
| Editorial Mega | `editorial` | centered `KINETIK.` logo, nav below, mega menu with promo |
| Compact Commerce | `commerce` | dense commerce strip with configurable utility text + inline search |

**Native controls:** `select` (style, submenu style), `checkbox` (sticky, show menu products/featured, account icon), `link_list` (menu), `image_picker` (promo), `text`, `color_scheme`, `number`/`checkbox` (cart: free-shipping threshold, order note). **Overlays:** mobile drawer + focus trap (`mega-menu.js` + `KinetikTrap`), mega menu with in-menu promos + featured product, `search-modal`, `cart-drawer`, account icon. **Sticky:** `sticky_header` toggle. **No** React, no production style switcher, no copied markup. **Field/Carbon/Sand:** color-scheme driven.

## 4. Overlay architecture (8cz)

Section groups ported: `sections/header-group.json` + `sections/footer-group.json` (referenced from `layout/theme.liquid` via `{% sections %}`). **Overlays** (cart drawer, search modal, quick-view, mega menu, size guide) are implemented as **registered custom-element singletons** — the correct Shopify pattern for viewport-fixed overlays (they are not reorderable page sections, so a `custom.overlay` section group is intentionally not used). All share the `KinetikTrap` focus-trap contract + ESC + overlay + reduced-motion — a consistent overlay group at the behavior level.

---

## 5. Verdict

All header/footer styles render in the theme editor via native settings, are merchant-configurable, pass `shopify theme check`, and adapt across Field/Carbon/Sand. Implementation shipped in `header.liquid` / `footer.liquid`; overlays as custom elements. Meets the moat, footer-system, and header-system specs.
