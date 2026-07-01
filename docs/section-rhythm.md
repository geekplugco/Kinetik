# KINETIK — Section Rhythm System

> A cohesive spacing/heading/density system so the site reads as one composition, not a stack of
> independently-styled sections. Task `Kinetik-4wy.2`.

## 1. Vertical rhythm (section spacing)

- Every section exposes `padding_top` / `padding_bottom` as a **range, min 0, max 120/160, step 4** (the 4px grid). Defaults cluster around **72px** (editorial), **48px** (utility), **32px** (dense) so adjacent sections breathe consistently.
- Sections scale padding **down on mobile** in CSS via `clamp()` where fluid, not with extra settings.
- No section adds ad-hoc margins — spacing lives in the padding controls only, so merchants tune rhythm from one place.

## 2. Heading scale + intro treatment

Shared, tokenized type scale (`--text-h1/h2/h3`, `--text-display-1/2`, all `clamp()`): every section header is the same pattern — **mono eyebrow (subheading, tracking-label)** → **Space Grotesk heading (tracking-tight)** → optional richtext. This makes intros feel authored by one hand.

## 3. Gutters + grid gaps

- Container: `max-w-[var(--page-width)]` (1440) + `px-6` gutter everywhere.
- Grid gaps: `gap-x-6` / `gap-y-10` families on the 4px grid; card grids reflow `columns_mobile` (1–2) → `columns_desktop` (range) mobile-first.

## 4. Color-scheme sequencing

Sections alternate `color_scheme` (scheme-1 light / scheme-2 tint / scheme-3 dark) to create tonal rhythm down a page — e.g. homepage: light hero → dark drop → light featured → tinted kit → dark editorial. Each scheme derives its full token set from 6 role keys (`color-schemes.liquid`), so sequencing works identically across Field/Carbon/Sand.

## 5. Density rules

- **Dense where deciding** (PDP spec grid, cart, collection): tight cells on the hairline grid.
- **Spacious where feeling brand** (hero, editorial, lookbook): oversized type + generous negative space.
- Card density is one shared `product-card` snippet + `card_image_ratio` / `card_show_second_image` settings — never per-section card styling.

**Result:** homepage, collection, PDP, and content templates share one spacing scale, one heading pattern, one gutter, one card, and a deliberate scheme sequence — a cohesive rhythm, not fragments.

## 6. Flagship homepage sequence

The canonical demo homepage now follows this rhythm:

1. **Hero**: first viewport brand/product signal and primary shop action.
2. **Marquee + drop telemetry**: compact operational proof before the product grid.
3. **New arrivals + categories**: direct shopping and discovery.
4. **Hero product + build-your-kit**: conversion and AOV.
5. **Material proof + route map + lookbook**: technical storytelling with shoppable context.
6. **Gallery + trust + testimonials**: social and product proof.
7. **Journal + newsletter**: retention and drop access.

This order alternates dense commerce modules with proof-led editorial modules so the page does not feel like a random section stack.
