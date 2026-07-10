# FAQ

**My product pages look plain compared to the demo. What am I missing?**
The demo's spec-sheet content comes from optional product metafields (`product_code`, `spec`, `material`, and friends). Create the definitions listed in the [setup guide](/docs/waypoint/setup#metafields) and fill them per product. Sections like Field spec and Product loadout stay hidden until their data exists.

**Why is the Related products section empty?**
It uses Shopify's recommendations engine, which needs sales and browsing data to produce results. On a new store it can be empty for a while; it fills in on its own. Complementary products is separate and only shows pairings you set in the Search and Discovery app.

**How do I get color swatches on cards and product pages?**
Name a product option Color (or change the trigger name in Theme settings, Color swatches), then either set native swatches on the option values or add `Name:#hex` lines to the Swatch list setting.

**Sale badges are not showing.**
Set a compare-at price on the variant and check Theme settings, Badges, where sale and sold-out badges can be toggled.

**Can I show different colors per section?**
Yes. Every section has a Color scheme setting. The three style presets each define five schemes you can assign per section.

**How do I set up the mega menu?**
Header section, Submenu style set to Mega, then add a Mega menu panel block whose Menu item to replace matches your top-level item title exactly. Details in the [setup guide](/docs/waypoint/setup#mega-menu).

**Does the kit builder discount actually apply at checkout?**
The section displays the discount live, and checkout applies it when you create a matching automatic discount in your admin (for example, a percentage off at a minimum quantity). Without one, the display is informational only.

**Which apps does Waypoint support?**
Any app that ships app blocks can be added to the product page and the Product apps / reviews section. Review apps that write the standard rating metafield (Judge.me, Loox, Okendo and similar) feed the built-in star display. The Custom Liquid section and block accept embed codes from other apps.

**Is the theme translatable?**
Yes. All storefront text ships in the theme's locale file and can be translated through Shopify's translation tools or a translations app. Selling in multiple currencies and languages shows the country and language selectors in the announcement bar and footer.

**How fast is it?**
Waypoint ships no external scripts, lazy-loads all below-the-fold imagery with responsive sizes, and keeps JavaScript per feature in small isolated files. Layout shift is designed out with fixed media ratios.

**How do I update the theme?**
Shopify notifies you when a new version is available in your admin. Updates install as a new unpublished copy so your customizations can be carried over before you publish.

**Something looks broken. What should I include in a support request?**
Your store URL, the theme version (Theme settings, footer of the editor sidebar), the page where the issue appears, a screenshot, and the steps to reproduce it. See [Support](/docs/waypoint/support).
