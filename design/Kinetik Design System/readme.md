# KINETIK — Design System

> Phong cách Tối giản mang âm hưởng Tạp chí cao cấp — sharp visuals, instant response.
> A minimalist, premium-magazine commerce system for **high-end techwear, streetwear & tech accessories** (audio, smart gear).

Kinetik dresses very high-resolution media in an interface that feels instant. The aesthetic is **"Brutalist but elegant"**: oversized angular type, an exposed 1px hairline grid, a strictly monochrome canvas, and a single Volt-green accent reserved for conversion. The look is held up by a disciplined component system — every module is independent, reusable, and performance-reviewed before it ships.

## Sources
This system was authored from a written brand brief only — **no codebase, Figma, or media library was attached.** All product copy, imagery, and catalog data here are representative placeholders. If you have the real brand assets (logo files, product photography/video, font licenses, a Figma library), share them and they'll be wired in.

---

## CONTENT FUNDAMENTALS — how Kinetik writes

**Voice:** confident, technical, spare. The brand sounds like a spec sheet that happens to be beautiful. It states capability and gets out of the way.

- **Person:** Speaks in the imperative and about the product ("Move faster.", "Engineered for movement."), rarely "we", almost never "I". Addresses the customer as "you" only in utility microcopy ("Your cart is empty").
- **Casing:** Two registers. Display headlines are often **ALL CAPS** and oversized ("MOVE FASTER."). Functional labels, SKUs, prices, specs, and tags are **uppercase mono with wide tracking** ("GORE-TEX 3L", "SHIPS IN 24H", "−20%"). Body copy is sentence case.
- **Length:** Short. Headlines are 1–3 words. Product blurbs are one tight sentence of real material/engineering detail ("3-layer Gore-Tex shell, laser-cut vents, fully taped seams"). No marketing filler, no exclamation stacking.
- **Numbers as voice:** Specs do the talking — weights (480g), membranes (Gore-Tex 3L), battery (40h), measurements. Always in the mono face. They signal precision and substantiate the price.
- **Emoji:** Never. No emoji anywhere. The icon set + mono labels carry all ornament.
- **Tone words:** engineered, system, instant, field, drop, movement, resolution.
- **Examples:**
  - Hero: `SS26 / FIELD SYSTEM` → **MOVE FASTER.** → "High-resolution techwear that loads in a blink."
  - CTA: `ADD TO CART · $336`
  - Stock: `IN STOCK · SHIPS IN 24H`
  - Sale flag: `−20%` (never "SALE!!!")

---

## VISUAL FOUNDATIONS

**Color.** Monochrome and adaptive. Pure paper (`#FFFFFF`) or pure ink (`#0A0A0A`) canvas with a full neutral ramp (`--ink-050…950`) for text, surfaces, and hairlines. Exactly **one** accent — **Volt** `#CCFF00` — used *only* for conversion: the Add-to-Cart CTA, the Sale tag, focus, and the logo full-stop. Scarcity is the rule; if volt is everywhere it stops directing the eye. Semantic red exists for hard errors only, never for sale flags. Dark mode inverts surfaces to true black; volt is unchanged because it reads on both.

**Type.** Three families. **Space Grotesk** (geometric, angular) for all display/headings, pushed oversized with tight tracking (−0.04em on hero). **Inter** for UI and reading text. **Space Mono** for the recurring "spec-sheet" voice — prices, SKUs, labels, tags — uppercase with 0.10–0.12em tracking. Hero type uses 0.92 line-height; body 1.5–1.6.

**Spacing & layout.** Strict 4px grid. The grid is *exposed*, not hidden: sections and cards are separated by 1px hairline borders (`--border-hairline`, ink-200) and laid out as bento/card cells — content never floats freely. Generous architectural whitespace around oversized type. Max container 1440px.

**Backgrounds.** Flat. No gradients, no photographic wash behind text, no repeating decorative texture. The only "pattern" is the subtle 28px grid inside empty media placeholders. Full-bleed imagery is welcome *as content* (lookbook, product), framed by hairlines — never as an ambient backdrop.

**Borders & elevation.** Hairline first. Elevation comes from 1px borders, not shadow. Shadow is reserved for things that genuinely float: `--shadow-pop` (popovers), `--shadow-drawer` (cart), `--shadow-dialog` (modals). Emphasis borders step up to 1px **ink** (`--border-strong`), not a heavier gray.

**Corners.** Tight. Default is **square** (`--radius-0`). Controls/cards may take 2–4px. Only tags/avatars go pill. Rounded-everything is off-brand.

**Motion.** Snappy and app-like, 60fps. Transform + opacity only — never animate layout. Signature easing is expo-out `cubic-bezier(.16,1,.3,1)` at ~140–340ms; drawers/menus use a standard ease. Examples: Add-to-Cart bar slides up on card hover; cart drawer translates in; variant swaps are instant (no spinner). Respect `prefers-reduced-motion`.

**States.**
- *Hover:* primary/volt → lighter (`--accent-hover`); neutral surfaces → faint sunken fill; media → hover-to-play.
- *Press:* darker (`--accent-press`) + a subtle `scale(0.98)`.
- *Selected:* an ink frame (`box-shadow: inset 0 0 0 1px ink`), not a fill — except volt for active toggles.
- *Focus:* ink ring on light, volt ring on dark.

**Imagery vibe.** Cool, sharp, high-contrast, editorial. Product on neutral seamless; lookbook with hard light. Hover-to-play short muted MP4s reveal material and movement. Placeholders stand in until real media exists.

**Cards.** A card is a hairline-bordered, square-cornered cell with no shadow. Padding `--pad-card` (24px). Product cards put media flush to the top edge and meta below.

---

## ICONOGRAPHY

- **System:** A compact **Lucide-style line set**, redrawn inline in `components/core/Icon.jsx` so the system ships **zero runtime icon dependency**. 24px viewbox, **1.75 stroke**, round joins, `currentColor` — icons inherit text color and never carry their own. (Lucide is ISC-licensed; paths were reproduced, not bundled.)
- **Names:** search, bag, menu, close, chevronDown, chevronRight, arrowRight, arrowUpRight, plus, minus, heart, check, filter, user, play, star, package, trash, shield. `play` is the only filled glyph.
- **Sizing:** 16 beside labels, 20 default, 22–24 in nav/feature rows. Match the optical weight of adjacent mono labels.
- **No emoji, no unicode dingbats, no multicolor/duotone icons.** If you need a glyph that isn't here, add it to the `PATHS` map in `Icon.jsx` at the same stroke weight rather than importing a second icon style.
- **Substitution flag:** because no brand icon font was provided, this set is a stand-in for whatever the brand actually uses. Swap in the real set if there is one.

---

## INDEX — what's in this system

**Foundations (root)**
- `styles.css` — the single entry point consumers link. `@import`s everything below.
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `effects.css` · `base.css`

**Components** (`components/`) — `window.KinetikDesignSystem_fefe1a.*`
- `core/` — **Icon, Logo, Button, IconButton, Tag**
- `forms/` — **Input, Select, OptionSwatch, QuantityStepper**
- `navigation/` — **AnnouncementBar, Breadcrumbs, Tabs, Pagination**
- `feedback/` — **Accordion, StarRating, Dialog, Toast**
- `commerce/` — **MediaTile, PriceTag, ProductCard, VariantPicker, CartLineItem, Drawer, ShippingBar, CollectionCard, TrustBar**
- `sections/` — **SectionHeading, ArticleCard**

Each component ships `.jsx` + `.d.ts` (props) + `.prompt.md` (usage). Each directory has a `@dsCard` showcase.

**UI Kit** (`ui_kits/storefront/`) — interactive techwear shop: Home, PLP, PDP, smart cart drawer, light/dark. See its `README.md`.

**Guidelines** (`guidelines/`) — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**Skill** — `SKILL.md` makes this folder usable as a downloadable Claude Skill.

---

## Using the tokens
```css
@import "styles.css";
```
```jsx
// React, via the compiled bundle
const { Button, ProductCard } = window.KinetikDesignSystem_fefe1a;
<Button variant="primary">Add to Cart</Button>
```
Always reach for semantic aliases (`--text-strong`, `--surface-card`, `--accent`) over raw ramp values so dark mode and future retints come for free.

---

## CAVEATS
- **Fonts load from the Google Fonts CDN** (`tokens/fonts.css`), so the system manifest reports 0 local fonts. For production / offline, self-host the `.woff2` files and swap to local `@font-face`. Share licensed files and they'll be embedded.
- **Icons are a Lucide-style substitute** — replace with the real brand set if one exists.
- **All media and catalog data are placeholders.**
