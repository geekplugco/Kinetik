# KINETIK — Uncompromising 10/10 Theme Store Scorecard

> The release rubric. Every category must score **10/10** before Kinetik ships to the Shopify Theme Store.
> 10/10 means **no known critical or high-severity issue** in that category — not "good enough."
> Pairs with the [Originality Manifesto](./originality-manifesto.md) (the law) and the
> [Originality Review Gate](./originality-review-gate.md) (the per-section procedure).

**Status:** canonical · **bd:** `Kinetik-4ef` · **Final gate:** `Kinetik-z9p0` cannot close without an updated copy of this scorecard showing **every category at 10/10**.

---

## How to score

- Each category has **concrete pass/fail checks**. A check is `✓` only with evidence (a command output, a screenshot, a file).
- **10** = every pass/fail check is `✓`; no known critical/high issue. **8** = all criticals clear, ≤2 medium issues. **5** = works but has a high-severity gap. **0** = missing or broken.
- **A single unresolved critical or high issue caps the category at 5.** No averaging around a real defect.
- Severity: **Critical** = broken/blocks purchase/inaccessible/invalid theme. **High** = visibly wrong, fails a core flow, or fails the clone test. **Medium** = polish gap. **Low** = nit.
- The overall theme score is the **minimum** category score, not the average. One 7 means the theme is a 7.

### Standing validation commands (run from repo root)

```bash
shopify theme check --path theme --output json            # → 0 offenses
npm --prefix theme run smoke                              # → schema/settings/options/blocks/templates pass
node web/scripts/guard-comments.mjs theme                 # → [PASS] no prose comments
shopify theme push --store happy-kinetik.myshopify.com --theme 147544178748 --path theme   # 0 errors/0 warnings
# Visual + a11y: load the preview, run axe, test keyboard + reduced-motion + mobile widths.
```

---

## The categories (17)

### 1. Shopify readiness & validity
Theme is a valid, push-clean Shopify theme with no platform violations.
- [ ] `shopify theme check --path theme` → **0 offenses**.
- [ ] `shopify theme push … --path theme` → **0 errors, 0 warnings** (server-side schema is stricter than local check).
- [ ] No deprecated/forbidden Liquid; no `ParserBlockingScript` (JS loaded via `<script src defer>`, not `| script_tag`).
- [ ] `theme/` contains only standard top-level dirs (Theme-Store-clean).
- **Validate:** the two `shopify` commands above; `ls theme/`.

### 2. Liquid completeness
Every standard template, section group, and snippet a merchant expects exists and renders.
- [ ] All standard templates present: index, product, collection, list-collections, cart, search, blog, article, page, 404, gift_card, password + all `customers/*`.
- [ ] header-group + footer-group; shared snippets (icon, button, price, product-card, quick-add, structured-data, meta-tags).
- [ ] No template renders a Liquid error or blank state with real data.
- **Validate:** `ls theme/templates theme/sections theme/snippets`; load each template on the preview.

### 3. Section design quality
Every section is premium, on-brand, and passes the originality gate.
- [ ] Each section passes [Gate B](./originality-review-gate.md) — **clone test PASS** (identifiable as Kinetik with logo removed).
- [ ] Hairline grid, square corners, single Volt accent, Space Grotesk display + Space Mono labels — per manifesto P1–P12.
- [ ] No section is generic-but-claiming-premium; primitives are executed with Kinetik restraint.
- **Validate:** Originality Note attached per section; visual review of all 49 sections / 7 blocks.

### 4. Schema & theme-editor UX
Merchants can configure everything in the editor without friction or invalid states.
- [ ] `npm --prefix theme run smoke` → **0 errors** across settings_schema, settings_data, templates, section schema, blocks, presets, translations, assets and snippets.
- [ ] Range `max` < 10000; `inline_richtext` settings carry no block tags (`<p>` only in `richtext`).
- [ ] Sensible setting groups, labels, defaults, `info` help text; presets per section where useful.
- [ ] Editor-added/removed blocks and reordering never break layout.
- **Validate:** `npm --prefix theme run smoke`; add/remove/reorder blocks in the editor.

### 5. Mobile responsiveness
Launch-ready on phones first, then scales up.
- [ ] No horizontal scroll, no clipped content, tap targets ≥ 44px at 360/390/414px widths.
- [ ] Mobile sticky ATC is present and non-obtrusive; drawers/menus are usable one-handed.
- [ ] Type/image hierarchy holds at every breakpoint up to 1440px container.
- **Validate:** preview at 360/390/768/1024/1440; real-device spot check.

### 6. Accessibility (WCAG 2.1 AA floor)
Accessible *is* the premium look (manifesto P12).
- [ ] axe → **0 critical/serious** violations on home, PLP, PDP, cart, search.
- [ ] Contrast AA on all text (monochrome + Volt makes this easy — hold it).
- [ ] Visible focus (ink ring light / Volt ring dark); full keyboard nav; correct landmarks/roles/labels.
- [ ] `prefers-reduced-motion` honored everywhere motion exists.
- **Validate:** axe run; keyboard-only pass; reduced-motion pass.

### 7. Performance
Fast, app-like, 60fps.
- [ ] Lighthouse mobile **Performance ≥ 90**; CLS < 0.1; LCP image prioritized.
- [ ] Transform/opacity-only animation (never layout); no scroll-jank.
- [ ] No render-blocking JS; images responsive (`srcset`/sizes) and lazy below the fold; fonts self-hosted with `font-display`.
- **Validate:** Lighthouse on the preview; DevTools performance panel for jank.

### 8. Commerce conversion
The storefront is built to sell.
- [ ] Add-to-Cart works via Shopify-native form/AJAX; cart drawer updates without reload.
- [ ] Dynamic checkout button available; clear price/compare-at/sale (`−20%`, never `SALE!!!`).
- [ ] Variant change updates media + price + availability; sold-out/unavailable states honest.
- [ ] No fake urgency/scarcity/trust claims (manifesto P10).
- **Validate:** complete a purchase flow on the preview; toggle variants/sold-out.

### 9. Product / collection / search / cart flows
The core shopping journeys are complete and robust.
- [ ] PDP: gallery+zoom, swatches, qty, sticky ATC, recommendations, metafield/spec rendering, back-in-stock path.
- [ ] PLP/collection: filtering, sorting, pagination, empty state.
- [ ] Search: predictive + results + **empty state** ("No results" + browse CTA).
- [ ] Cart: line edit/remove (AJAX), gift note, upsell, **empty state**.
- **Validate:** exercise each flow incl. zero-result/empty paths on the preview.

### 10. Media & effects quality
Media is content, framed by hairlines (manifesto P7).
- [ ] Hover-to-play muted MP4 where used; images sharp, cool, editorial; no gradient/photo wash behind text.
- [ ] Effects are transform/opacity, snappy (expo-out `cubic-bezier(.16,1,.3,1)`), reduced-motion safe.
- [ ] Placeholders render cleanly until real media exists.
- **Validate:** visual review of media-bearing sections; reduced-motion pass.

### 11. Content pages
Pages, blog, and article are premium, not afterthoughts.
- [ ] Page template(s) with rich-text/section composition; blog index + article with author/date/share.
- [ ] On-brand type rhythm and hairline framing; readable measure on body text.
- **Validate:** load page/blog/article on the preview.

### 12. Customer pages
The account surface is complete and on-brand.
- [ ] All `customers/*` templates present (login, register, account, addresses, order, reset, activate).
- [ ] Forms styled to system; honest errors (`role="alert"`, `border-negative`) and success (`role="status"`).
- **Validate:** `ls theme/templates/customers`; walk the account flow.

### 13. SEO & structured data
Discoverable and correctly marked up.
- [ ] `snippets/structured-data.liquid` emits valid Product+Offers+BreadcrumbList (PDP), Organization+WebSite (home), Article (blog) — **0 errors** in Rich Results Test.
- [ ] Semantic headings/landmarks; meta-tags snippet; canonical + OG/Twitter tags.
- **Validate:** Google Rich Results Test on PDP/home/article; view-source meta.

### 14. Localization
Fully translatable, no hardcoded strings.
- [ ] Storefront strings via `locales/en.default.json`; schema labels via `t:` keys in `en.default.schema.json` (~1043 keys).
- [ ] `theme check` `ValidSchemaTranslations` → no errors; no literal user-facing strings in Liquid.
- [ ] ⚠️ Do **not** re-run `i18n-schema.mjs --write` on the converted theme (drops already-keyed sections).
- **Validate:** `shopify theme check --path theme`; grep sections for literal labels.

### 15. App-block compatibility
Plays well with the app ecosystem.
- [ ] PDP and key templates expose `{% schema %}` app-block targets / `@app` blocks where Shopify expects them.
- [ ] Reviews/upsell/etc. apps can inject without breaking layout.
- **Validate:** add a test app block in the editor; confirm clean render.

### 16. Merchant documentation & demo content
A merchant can reproduce the demo and operate the theme.
- [ ] Setup/handoff docs: settings overview, presets, section guide, metafield/metaobject requirements, demo-content steps.
- [ ] Theme editor presets reproduce the flagship demo home/PDP.
- **Validate:** follow the docs from a clean store; confirm the demo rebuilds.

### 17. Originality
The theme is unmistakably Kinetik, not a clone (manifesto + gate).
- [ ] **Every shipped section passes the clone test** (Gate B PASS) with a finalized Originality Note.
- [ ] No copied layout, copy, naming, or interaction survives; no unresolved FIX/REJECT.
- [ ] Benchmark insights are all recorded as transforms (`SAW/PRINCIPLE/KINETIK/DROPPED`), none un-transformed.
- **Validate:** [Originality Review Gate](./originality-review-gate.md) Gate B across all sections.

---

## Final release gate (`Kinetik-z9p0`)

```
[ ] All 17 categories scored, each with evidence
[ ] Every category = 10/10 (overall score = MIN of categories = 10)
[ ] No open critical or high issue in any category
[ ] This scorecard updated, dated, and attached to the release
```

**The final gate cannot close while any category is below 10.** A category drops below 10 the moment a critical/high regression is found — release is blocked until it returns to 10. Quality here is binary at the gate: 10/10 across the board, or not shipped.

## UX acceptance matrix (`Kinetik-z9p0.1`)

Use this as the measurable UX/CRO gate before closing any release or major UX bead. A page passes only when every row is green on desktop and at 360/390/430/768px mobile widths.

| Surface | Must pass | Evidence |
|---|---|---|
| Homepage | First viewport sells a product/drop immediately; every fold has either shop action, proof, or brand story; section spacing follows `docs/section-rhythm.md`; no decorative-only modules. | Screenshot set + `theme/templates/index.json` section order. |
| Collection | Shopify-native filters and sort work with active chips, clear-all, no-result recovery, keyboard drawer close, and no local-only fake filtering. | Filter/sort URL test + mobile drawer screenshot. |
| PDP | Code/spec/material/fit/status visible near ATC; variant changes update price/availability/media; sticky ATC does not overlap content; trust/delivery/returns visible without accordion hunting. | PDP screenshot + variant/sold-out test. |
| Cart | AJAX qty/remove, free-shipping ladder, empty recovery, note, checkout CTA, and merchant-configurable upsell/kit continuation remain usable on mobile. | Cart add/change/remove test + empty cart screenshot. |
| Search | Predictive search opens smoothly, has loading/empty states, result links are keyboard reachable, and full search results can recover from no matches. | Search query/no-query/no-result tests. |
| Account | Login/register/reset/account/order/address pages use system forms, readable errors, 44px controls, no clipped labels. | Account template walkthrough. |
| Content | Page/blog/article/contact/map/video templates preserve readable measure, semantic headings, and brand rhythm without card nesting or text overlap. | Content screenshots at mobile and desktop. |
| Motion/accessibility | Drawers/modals/quick view/menu/search trap focus, restore focus, close on Escape/overlay, honor reduced motion, and never leave body scroll locked. | Keyboard pass + reduced-motion pass. |
