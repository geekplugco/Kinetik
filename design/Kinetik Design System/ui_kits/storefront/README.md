# Storefront UI Kit

An interactive, high-fidelity recreation of the Kinetik techwear storefront. Built entirely from the system's own component primitives — no view re-implements a Button or a card.

> No real product media was provided, so every image is a branded `MediaTile` placeholder (exposed-grid pattern + SKU code). Drop real `src`/`videoSrc` into the product data to light up hover-to-play.

## Run
Open `index.html`. It loads `../../styles.css` and `../../_ds_bundle.js`, then mounts the app.

## Surfaces
- **Header.jsx** — sticky announcement bar + nav + utilities (search, account, theme toggle, cart with live count).
- **HomeView.jsx** — oversized split hero, category bento, "New Arrivals" product grid.
- **PlpView.jsx** — sticky filter rail (category / color / size), sort bar, 3-up product grid.
- **PdpView.jsx** — scrolling media column beside a **sticky** info panel: variant swatches, quantity, full-width volt Add-to-Cart, mono spec table.
- **Footer.jsx** — link columns + newsletter capture.
- **index.html** — `App` wiring view routing, the **smart cart Drawer** (line items, subtotal, Frequently-Bought-Together upsell carousel), and light/dark theming.

## Interactions to try
- Hover a product tile → Add-to-Cart bar slides up; wishlist appears.
- Add items → cart drawer opens with live subtotal; adjust quantities; add an upsell.
- Open a product → PDP with sticky buy column; switch color/size instantly.
- Toggle **DK/LT** in the header → full dark-mode repaint.

## Data
`data.js` exposes `window.KINETIK_PRODUCTS` — eight techwear SKUs with colors, sizes, sold-out flags, specs, and copy.
