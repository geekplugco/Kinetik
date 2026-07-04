# Setup guide

## Installation

Install Kinetik from the Shopify Theme Store, or upload the theme zip in your admin under Online Store, Themes, Add theme. On install the theme matches the demo store's layout and color settings. Demo imagery does not transfer; image slots show placeholders until you upload your own media.

## Style presets

Theme settings, Colors, holds the color scheme group. Three presets ship with the theme:

| Preset | Character |
|---|---|
| Kinetik | White paper, near-black ink, volt lime accent |
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

The Footer's Support links group has four page pickers (contact, shipping and returns, FAQ, warranty). Unset pickers fall back to `/pages/contact`, `/pages/shipping`, `/pages/faq`, and `/pages/warranty`, so create pages with those handles or point the pickers at your own pages.

## Product setup

### Metafields

Kinetik reads optional product metafields for spec-sheet content. Create definitions under Settings, Custom data, Products, in the `custom` namespace, with storefront access enabled:

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
