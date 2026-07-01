---
name: kinetik-design
description: Use this skill to generate well-branded interfaces and assets for Kinetik — a minimalist, premium-magazine commerce brand for high-end techwear, streetwear & tech accessories. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping production UI or throwaway mocks.
user-invocable: true
---

Read the `readme.md` file within this skill first — it carries the brand voice, the full visual foundations, the iconography rules, and an index of everything available. Then explore the other files as needed:

- `styles.css` + `tokens/` — the CSS custom properties (colors, type, spacing, effects) and `@font-face`. Link `styles.css` and build with the semantic aliases (`--text-strong`, `--surface-card`, `--accent`).
- `components/*` — reusable React primitives (Button, Tag, Input, OptionSwatch, ProductCard, Drawer, …). Each has a `.prompt.md` with a usage example and a `.d.ts` with the props contract.
- `ui_kits/storefront/` — a full interactive shop (Home, PLP, PDP, smart cart) to copy patterns from.
- `guidelines/*.html` — foundation specimen cards.

Core brand rules to honor: monochrome paper/ink canvas; **one** accent (Volt `#CCFF00`) used *only* for conversion (Add-to-Cart, Sale, focus); oversized angular Space Grotesk headings; Inter body; Space Mono for prices/specs/labels in uppercase wide tracking; exposed 1px hairline grid; square corners; flat backgrounds (no gradients); snappy transform/opacity motion; no emoji.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and apply the rules here to design natively in the brand.

If the user invokes this skill without other guidance, ask what they want to build, ask a few sharp questions, then act as an expert Kinetik designer who outputs HTML artifacts or production code as the need dictates.
