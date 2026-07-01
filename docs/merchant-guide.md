# KINETIK — Merchant Setup Guide

> Everything needed to reproduce the demo and run Kinetik at Theme-Store quality.
> Kinetik uses **Shopify-native settings only** — no app required, no code editing.

---

## 1. Quick start

1. **Choose a style.** Theme editor → **Theme settings → Colors**. Pick a preset: **Field System** (mono ink/paper + Volt), **Carbon** (blackout), or **Sand** (warm). Each is a full color-scheme set — your media and content stay the same.
2. **Fonts.** Theme settings → Typography. Defaults: Space Grotesk (display), Inter (body), Space Mono (labels). All Shopify-hosted.
3. **Menus.** Navigation → create `main-menu` (header) and footer menus. The header supports a mega menu with an in-menu promo + featured product.
4. **Header/Footer style.** Header and Footer sections each have a **Style** select (utility/editorial/commerce; system/compact/editorial/split).

## 2. Image ratios

| Surface | Ratio | Notes |
|---|---|---|
| Product media | 4:5 | portrait; first image is the LCP hero |
| Collection / product cards | 4:5 | consistent grid |
| Hero / slideshow | wide / full-bleed | add a mobile image only if the crop differs |
| Material scan / route map | 4:3 | macro/editorial |
| Motion-spec / lookbook media | 4:5 or 4:3 | framed by hairlines |

Upload logos/trust images at 2× for retina.

## 3. Product metafields (power the PDP)

Create these **product metafield definitions** (Settings → Custom data → Products), namespace `custom`, with **Storefront access = true**. The demo populates them via `web/scripts`.

| Key | Type | Powers |
|---|---|---|
| `product_code` | single line text | PDP eyebrow / spec code |
| `spec` | single line text | spec "Build" row |
| `badge` | single line text | product badge |
| `material` `weight` `dimensions` `compatibility` `fit_notes` | single line text | Field Spec cells |
| `care` `size_chart` | multi-line text | care cell / size-guide modal |
| `use_cases` | list.single line text | use-case badges |
| `loadout` | list.product reference | Field Loadout companions |

Empty metafields simply don't render (honest empty states) — nothing breaks.

## 4. Swatches

Theme settings → set **Swatch list** as `Name:#hex` per line (e.g. `Volt:#CCFF00`). Or set native variant swatches in Products → Variants. The PDP + cards resolve color options to swatches automatically.

## 5. Cart & recommendations

- **Free shipping bar:** Header section → Cart → **Free shipping threshold** (in your currency; 0 = off). Also on the cart page.
- **Recommendations** (complementary / related) use Shopify's **Search & Discovery** app data — install it and set recommendations; the theme falls back to same-collection products.
- **Order note / gift note:** enabled by default in the cart drawer + page.

## 6. Advanced sections

- **Field Loadout (PDP):** set the `custom.loadout` product-list metafield per product, or add companion product blocks to the section.
- **Build your kit (Field System Builder):** add slot blocks (label + comma-separated product **types**). For a real bundle discount, set the section's discount % **and** create a matching **Shopify automatic discount** (e.g. 12% off at 3+ items) so it actually applies at checkout — display-only otherwise.
- **Material scan:** add scan-point blocks; set each point's X/Y % over your proof image + label + detail.
- **Route map / lookbook hotspots:** add stop blocks with place label, image, caption, and an optional featured product.
- **Reviews / apps:** add a review app block (Judge.me, Loox, Okendo) to the "Product apps / reviews" section; the star rating shows automatically from the app's `reviews.rating`.

## 7. Performance

Kinetik ships one minified stylesheet, defers all scripts, lazy-loads all but the first product image, and uses native scroll-snap (no carousel library). Keep uploaded images reasonably sized; the theme generates responsive `srcset` automatically.

## 8. Troubleshooting

- **A metafield section is missing:** confirm the metafield definition has **Storefront access = true** and a value is set — definition-less metafields don't render in Liquid.
- **A PDP section not showing on some products:** apparel uses the `editorial` product template, others use the default — assign the right template in the product's Theme template dropdown.
- **Bundle discount not applying at checkout:** create the matching Shopify automatic discount (§6).
- **Reviews not showing:** install a review app; the theme has no built-in reviews (honest by design — no fake ratings).

No local prototype / fixture dependency exists in the theme — everything above uses standard Shopify objects and settings.
