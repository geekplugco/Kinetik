# Kinetik signature section concepts

These concepts are Kinetik-native section ideas. They are not generic "hero / image with text / product rail" variants; each one must pass the clone test from `docs/originality-manifesto.md`.

## 1. Field System Builder

- Purpose: let shoppers assemble a complete kit by use case instead of browsing isolated products.
- Merchant use case: outerwear, streetwear capsules, EDC gear, audio/tech bundles.
- Data source: `product_list`, product type/metafields, optional collection fallback.
- Settings model: kit slots, required/optional slots, discount messaging, CTA mode, section density.
- Mobile behavior: horizontal slot selector above a sticky kit summary.
- Motion idea: selected items snap into a technical loadout grid; summary updates instantly.
- Distinctness: a "loadout console", not a generic bundle carousel.

## 2. Motion Spec Story

- Purpose: tell a product's technical story through specs, media, and proof points.
- Merchant use case: product pages, campaign pages, technical apparel launches.
- Data source: product metafields, image/video blocks, rich text blocks.
- Settings model: spec rows, media alignment, proof caption, story intensity.
- Mobile behavior: stacked media/spec cards with jump links.
- Motion idea: spec values reveal as instrument readouts; media uses technical mask reveal.
- Distinctness: a product spec sheet presented as editorial commerce.

## 3. Drop Telemetry Wall

- Purpose: make launch/drop pages feel live without fake urgency.
- Merchant use case: capsule releases, restocks, limited seasonal drops.
- Data source: collection, product availability, real countdown setting, merchant text blocks.
- Settings model: launch time, collection, status rows, signup form, no-fake-social-proof toggle.
- Mobile behavior: compressed command panel with product rail below.
- Motion idea: status indicators pulse only for real state changes.
- Distinctness: "mission control" for commerce, not a generic countdown.

## 4. Kit Matrix

- Purpose: compare products by role and technical attribute.
- Merchant use case: jackets, pants, bags, footwear, tech accessories.
- Data source: product list and metafields.
- Settings model: row attributes, compare columns, highlight attribute, CTA per item.
- Mobile behavior: pinned attribute column with horizontal product columns.
- Motion idea: column hover draws a hairline route through matching attributes.
- Distinctness: a buying decision grid, not a normal comparison table.

## 5. Material Scan

- Purpose: show construction details and material benefits with visual evidence.
- Merchant use case: technical fabrics, hardware, waterproofing, audio internals.
- Data source: section blocks, product metafields, image hotspots.
- Settings model: scan points, labels, detail copy, proof image, CTA.
- Mobile behavior: image first, detail cards as accessible accordion.
- Motion idea: scan line passes once on reveal; hotspots settle into place.
- Distinctness: lab-style proof instead of lifestyle feature text.

## 6. City / Trail Mode Switcher

- Purpose: let a product or collection present two contexts without changing the product.
- Merchant use case: commuter/trail apparel, hybrid shoes, bags, headphones.
- Data source: two image sets, collection/product blocks, optional metafields.
- Settings model: mode labels, mode-specific copy, products per mode, default mode.
- Mobile behavior: segmented control at top; one mode visible at a time.
- Motion idea: mode switch uses a hard technical wipe, not a fade.
- Distinctness: context switching as a brand mechanic, not tabs for tabs' sake.

## 7. Variant Lab

- Purpose: make color/size/material variants feel deliberate and inspectable.
- Merchant use case: product pages and featured product sections.
- Data source: product variants/options/media/metafields.
- Settings model: option display mode, swatch source, variant spec rows, availability display.
- Mobile behavior: swatch rail plus selected variant card.
- Motion idea: swatch changes trigger instant media/spec swap with no spinner.
- Distinctness: variants become a mini product lab, not just buttons.

## 8. Editorial Route Map

- Purpose: tell a lookbook or campaign as a route through places, use cases, or product moments.
- Merchant use case: lookbooks, brand pages, collection launches.
- Data source: image/video blocks, product references, coordinate/step labels.
- Settings model: route steps, linked products, map density, editorial captions.
- Mobile behavior: vertical route timeline with shoppable cards.
- Motion idea: hairline route draws as the user scrolls.
- Distinctness: story navigation built from the Kinetik grid, not a magazine layout clone.

## 9. Gear Loadout Compare

- Purpose: compare complete outfits/kits instead of single products.
- Merchant use case: "commute kit vs storm kit", "city pack vs trail pack".
- Data source: product_list blocks grouped by loadout.
- Settings model: loadout names, products, highlight stats, add-all CTA.
- Mobile behavior: accordion per loadout with sticky total.
- Motion idea: switching loadout slides a compact spec summary, not the whole page.
- Distinctness: decision support for complete systems.

## 10. Kinetic Launch Sequence

- Purpose: create an original launch page rhythm for drops and campaigns.
- Merchant use case: homepage hero, drop page, password/prelaunch page.
- Data source: collection, countdown setting, media, copy, signup form.
- Settings model: stage labels, launch date, media frame, CTA, signup behavior.
- Mobile behavior: stage cards stack with current stage pinned first.
- Motion idea: staged reveal: status, media, products, CTA. No autoplay theater.
- Distinctness: launch choreography grounded in real commerce state.

## 11. Signal Proof Strip

- Purpose: present trust, press, policy, and operational proof without generic badges.
- Merchant use case: homepage, PDP, cart, footer.
- Data source: text/icon blocks, policy links, optional image/logo blocks.
- Settings model: proof type, link, mono value, supporting label, density.
- Mobile behavior: two-column compact telemetry.
- Motion idea: values draw in once; no decorative icon bounce.
- Distinctness: proof as instrument readout, not badge soup.

## 12. Field Notes FAQ

- Purpose: turn FAQs into product/brand operational notes.
- Merchant use case: PDP, collection, support page, drop pages.
- Data source: FAQ blocks, metafields, policy pages.
- Settings model: categories, default open item, support link, compact mode.
- Mobile behavior: accordion with large tap targets.
- Motion idea: height changes are instant or minimal; no elastic accordion.
- Distinctness: support content written as field notes with spec labels.

## Strongest implementation candidates

1. Field System Builder: highest brand distinctness and conversion value.
2. Motion Spec Story: strongest PDP gap filler.
3. Drop Telemetry Wall: unique launch/drop moat if kept honest.
4. Material Scan: turns technical products into proof-led storytelling.
5. Variant Lab: directly improves the currently simple product page.
6. Editorial Route Map: differentiates lookbook/story pages.
