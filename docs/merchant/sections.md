# Sections reference

Add sections in the theme editor with Add section. Every section has its own color scheme, padding, and (where relevant) layout settings. This page groups them by job and walks through the signature ones in detail.

## Layout

| Section | What it does |
|---|---|
| Header | Logo, navigation, search, account, cart. Styles: utility, editorial, commerce. Supports mega menu panels, a free shipping bar, and the cart drawer |
| Footer | Menu, support links, newsletter signup, social, region and payment icons. Styles: system, compact, editorial, split |
| Announcement bar | Rotating messages with optional country and language selectors |
| Breadcrumb | Configurable breadcrumb trail for inner pages |

## Homepage and campaign

| Section | What it does |
|---|---|
| Hero | Full-bleed image with headline, buttons, and optional visual effect |
| Slideshow | Multi-slide hero with per-slide content |
| Lookbook | Editorial image grid with shoppable hotspots (detailed below) |
| Drop system | Product drop with live countdown (detailed below) |
| Build your kit | Multi-slot bundle builder (detailed below) |
| Route map | Day-in-the-life timeline with imagery and featured products (detailed below) |
| Statement | Full-width banner with quote, background image, and button; repeatable banner blocks |
| Marquee | Scrolling text ribbon |
| Promo grid | Mixed grid of promotional tiles |
| Welcome | Intro band for landing pages |
| Featured collection | Product grid or carousel from any collection |
| Featured product | Single product spotlight with a working buy form |
| Collection list | Collection tiles with captions |
| Compare slider | Before-and-after image comparison |
| Image gallery | Uniform or full-bleed image grids |
| Image with text | Split media and copy band |
| Material scan | Macro image with positioned annotation points |
| Field assurance | Trust and guarantee band |
| Collection story | Numbered chapter timeline |
| Testimonials | Customer quotes |
| Logo list | Press or partner logos |
| Blog posts | Recent articles feed |
| Video | Hosted or embedded video with cover image |
| Map | Store location with stockist details |
| Rich text | Headline and prose band |
| Multicolumn | Icon or text columns |
| Collapsible content | Accordion rows |
| Newsletter | Email signup band |
| Contact form | Name, email, phone, message form |
| Custom Liquid | Raw Liquid slot for app embeds or custom markup |

## Product page

The Product section renders vendor, title, rating, price, and description as reorderable blocks, plus collapsible rows, app blocks, and a Custom Liquid block. Companion sections:

| Section | What it does |
|---|---|
| Field spec | Spec-sheet grid from product metafields, plus the size guide (metafield, table blocks, or linked page — see the [setup guide](/docs/waypoint/setup#size-guide)) |
| Product loadout | Companion products from the `loadout` metafield |
| Product use modes | Scenario tabs for one product |
| Product motion spec | Animated spec callouts |
| Product field note | Editorial aside |
| Product FAQ | Per-product questions |
| Product apps / reviews | Host block for review apps (Judge.me, Loox, Okendo). The star rating on the product page reads the app's rating metafield |
| Related products | Automatic recommendations, loaded on scroll |
| Complementary products | "Pairs with" products from Search and Discovery |
| Recently viewed | Browsing history row |
| Quick view | The modal opened from card quick-view buttons |

## Signature sections

### Lookbook

Add Shot blocks (image, caption, optional focal point) and up to two hotspots per shot. Each hotspot takes a product plus horizontal and vertical position sliders; customers tap the marker to open a product tooltip with price and a quick-view link. Editorial note blocks drop pull-quotes between shots. Three layout modes: editorial (mixed spans), grid, and single column.

### Build your kit

Add one Slot block per kit position (Shell, Layer, Bottom, Footwear, Carry, Gear). Each slot sources products three ways, in priority order: hand-picked products, a collection, or a comma-separated list of product types. Set the bundle discount percentage and minimum pieces on the section; the summary card updates live as customers add pieces, and the whole kit goes to the cart in one action. Pair the display discount with a real automatic discount in your admin.

### Drop system

Set a target date and time; the countdown runs live and the section flips its state when the date passes. Blocks cover the drop product list, a signup form for notifications, and stat callouts.

### Route map

Add Stop blocks: a time and place label, heading, caption, an image, and an optional featured product with live pricing. Two layouts (board and timeline) and two visual styles (signal, with volt viewfinder framing, or quiet). Rows alternate media and copy sides by default (toggle off for a single-side layout), a Row density setting controls how tall each stop reads, and a sticky step index tracks position as customers scroll. Stops without an image show a route diagram placeholder, so the section never looks broken while you gather photography.

### Material scan

Upload a macro fabric or hardware image, then add scan-point blocks positioned by percentage coordinates. Each point carries a label and detail line rendered in the theme's instrument style.

### Mega menu

Configured on the Header section rather than as its own section. One panel block per top-level menu item; see the [setup guide](/docs/waypoint/setup#mega-menu).

## Templates

Every template is sectioned, so you can add any section above to product, collection, page, blog, cart, and search templates. Waypoint ships alternate demo templates (editorial and campaign product layouts, carbon and sand collection styles) you can assign per product or collection, plus a contact page template with the form wired in.
