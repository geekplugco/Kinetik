# Setup guide

## Installation

Install Waypoint from the Shopify Theme Store, or upload the theme zip in your admin under Online Store, Themes, Add theme. On install the theme matches the demo store's layout and color settings. Demo imagery does not transfer; image slots show placeholders until you upload your own media.

## Style presets

Theme settings, Colors, holds the color scheme group. Three presets ship with the theme:

| Preset | Character |
|---|---|
| Waypoint | White paper, near-black ink, volt lime accent |
| Carbon | Blackout surfaces, volt accent on dark |
| Sand | Warm paper, umber text, burnt-orange accent |

Each scheme defines background, text, button, button label, and shadow roles. The theme derives its full token set (muted text, hairlines, hover states) from those roles, so custom schemes stay coherent automatically. Every section has its own Color scheme setting, so you can mix light and dark bands down a page.

## Theme settings reference

| Group | Controls |
|---|---|
| Logo and favicon | Logo, mobile logo, logo width, favicon |
| Colors | Color scheme group (the presets above) |
| Typography | Heading, body, and accent fonts, size scales, letter spacing, uppercase headings |
| Layout | Page width, section spacing, corner radius, section dividers |
| Animations | Reveal on scroll, hover effect, transition speed |
| Badges | Corner radius, position, show sale badge, show sold-out badge |
| Buttons | Style (square or rounded), border thickness, uppercase labels |
| Cart | Cart type (drawer, page, or modal) |
| Drawers | Drawer width, overlay opacity |
| Icons | Stroke weight |
| Input fields | Corner radius, border thickness |
| Popovers and modals | Corner radius |
| Prices | Show currency code, highlight sale prices |
| Product cards | Card mode (technical, commerce, editorial), image ratio, vendor, second image on hover, swatches, quick add |
| Color swatches | Trigger option name, swatch shape, maximum swatches on cards, fallback swatch list |
| Search | Enable predictive search, show result count |
| Social media | Instagram, TikTok, YouTube, Facebook, X profile links |

All fonts come from Shopify's font library and load with `font-display` handling built in.

## Navigation

### Main menu

The header reads the menu you select in the Header section (default `main-menu`). Nested menu items render as dropdowns automatically.

### Mega menu

Set the Header section's Submenu style to Mega, then add one **Mega menu panel** block per top-level item you want to expand:

1. **Menu item to replace** must match the top-level menu item title exactly (for example `Apparel`).
2. Pick a **Featured collection**, or hand-pick up to four **Featured products**. Products win when both are set.
3. Optional: kicker, heading, text, an override link list, a promo image with badge and label, and a button label and link.

Panels without a matching block fall back to a standard dropdown of the item's child links.

### Footer support links

The Footer's Support column is a block list (Support link blocks), so you can add, remove, and reorder links freely instead of being limited to a fixed set. Each block has a Label and a URL. The default preset ships five: Contact, Shipping & returns, FAQ, Warranty, and Field guide.

## Product setup

### Metafields

Waypoint reads optional product metafields for spec-sheet content. Create definitions under Settings, Custom data, Products, in the `custom` namespace, with storefront access enabled:

| Key | Type | Where it appears |
|---|---|---|
| `product_code` | Single line text | Card and product page code eyebrow, spec sheet |
| `spec` | Single line text | Card subtitle, spec sheet Build row |
| `badge` | Single line text | Product badge on cards and tiles |
| `material`, `weight`, `dimensions`, `compatibility`, `fit_notes` | Single line text | Field spec cells |
| `care` | Multi-line text | Care accordion on the product page |
| `size_chart` | Multi-line text | Size guide overlay |
| `use_cases` | List of single line text | Use-case badges |
| `loadout` | List of product references | Product loadout companion products |

Fields you leave empty simply do not render. A product with no metafields still gets a complete product page.

### Size guide

The Field spec section can show a "Size guide" link that opens a modal with sizing information. It checks three sources, in this order:

1. **The product's `size_chart` metafield** (multi-line text/HTML, listed in the metafield table above). If you've filled this in, it always wins and shows on that product regardless of what variant options the product has — use it for a one-off exception or a product that needs custom sizing notes.
2. **Size chart row blocks** on the Field spec section. Add one block per size (row label S, M, L, and so on) with a value for each column, and the theme renders a real table. Column headings — Chest, Waist, plus up to four optional extra columns — are section settings, so the table is shared across every product using that template. To avoid showing an irrelevant chest/waist table on accessories, this chart only appears on products that actually have a Size variant option.
3. **The Size guide page** setting. Pick any page you've built in Online Store, Pages, for cases that need more than a table — fit notes, a sizing video, international conversions, and so on.

Turn the whole feature off with the section's **Show size guide** checkbox, and change the trigger text with **Size guide label** (default "Size guide").

![Size guide trigger link next to the Field spec badges](/screenshots/size-guide-trigger.png)

![Size guide modal open, showing the size chart table](/screenshots/size-guide-modal.png)

### Swatches

Color options resolve to swatches in this order:

1. Native variant swatches (Shopify's color taxonomy on the option value).
2. The **Swatch list** in Theme settings, Color swatches: one `Name:#hex` or `Name:image-filename` per line, for example `Volt:#CCFF00`.
3. A generated tone from the color name as a last resort.

The **Trigger option name** setting decides which option is treated as color (default Color).

### Variant images

Assign an image to each variant and the product gallery, cards, and quick view switch to it when that variant is selected.

### Sale and sold-out badges

Set a compare-at price to show the sale badge and strikethrough pricing everywhere prices appear, including kit tiles and mega menu products. Badge visibility is controlled in Theme settings, Badges.

### Subscriptions

If you sell selling plans, the product form shows a Purchase options selector (one-time purchase plus each plan). The cart and customer order pages display the selected plan and its delivery frequency. This requires a subscriptions app that creates selling plans; the theme handles display and checkout wiring.

### Recommendations

- **Related products** uses Shopify's product recommendations engine and loads as customers scroll. New stores may show few or no results until the engine has data.
- **Complementary products** reads the pairings you set in the Shopify Search and Discovery app. The section stays hidden until pairings exist.

## Cart

- **Cart type** (Theme settings, Cart): drawer, page, or modal.
- **Free shipping bar**: enable it in the Header section and set the threshold in your store currency. It also appears on the cart page.
- Discount codes entered at checkout display as line-level and cart-level amounts on the cart page. Automatic discounts appear the same way.
- Order notes and gift notes are on by default.
- Accelerated checkout buttons (Shop Pay and wallets) render when a compatible payment provider is enabled in your Payments settings.

## Image guidelines

| Surface | Ratio | Notes |
|---|---|---|
| Product media | 4:5 recommended | The first image is the page's largest element; upload at least 1600px wide |
| Cards and tiles | 4:5 | Consistent grid; 2x size for retina |
| Hero and slideshow | Wide, 16:9 or wider | Add a separate mobile image only when the crop differs |
| Route map and material scan | 4:3 | Editorial and macro imagery |
| Lookbook | Mixed | The editorial layout mixes portrait and landscape slots |

The theme lazy-loads all below-the-fold images and generates responsive sizes automatically, so upload the largest clean source you have.

## Bundle pricing in Build your kit

The Build your kit section shows a running discount when customers pick the minimum number of pieces. The percentage and minimum are section settings, and the display is informational: create a matching automatic discount in your admin (for example, 12% off orders of 3 or more items) so the price applies at checkout.

## Known limitations

- **New Customer Accounts.** If your store has Shopify's New Customer Accounts enabled, `/account/login`, `/account/register`, and password-reset pages redirect to Shopify's hosted account UI instead of the theme's own login, register, and reset-password templates. Those templates render fully on stores using Classic customer accounts. The account, addresses, and order-history pages work the same on both.
- **Related products needs store history.** The Related products section calls Shopify's product recommendations engine, which returns nothing for a brand-new store or a product with no browsing or sales data. This is expected — the section stays hidden rather than showing an empty state, and fills in as the store gets traffic.
- **Complementary products needs Search & Discovery pairings.** The section only appears once you've set "Pairs with" recommendations for a product in the Shopify Search and Discovery app. It does not generate pairings on its own.
- **Bundle and free-shipping thresholds are display-only.** The Build your kit discount and the header's free-shipping bar both show a threshold you set in theme settings, but neither creates the underlying discount or shipping rate. Create a matching automatic discount / shipping rate in your admin so what customers see matches what they pay.
- **Demo imagery does not transfer.** Installing the theme reproduces the demo's layout, color presets, and settings, but not its photography — image slots on a fresh install show placeholder art until you upload your own media.
