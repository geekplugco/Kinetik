# Kinetik — Build Architecture (public Theme-Store theme)

Reference theme: **Shopify Dawn** (structure, settings, a11y, performance conventions).
Styling: **Tailwind v4, no-build** (pattern from `tomblanchard/shopify-theme-no-build`).
Fonts: **Shopify `font_picker` + `font_face`** (Dawn standard — no external CDN).

## 1. No-build Tailwind (Theme-Store compliant)

Single source `assets/tailwind.css` is **generated** from the prototype's modular CSS:
`node web/scripts/build-theme-css.mjs` inlines `app/globals.css` + `tokens/*.css` into one file
(strips the Google-Fonts `@import` — fonts come from Shopify, see §2).

`theme.liquid` head toggles on `settings.mode` (exactly like the ref):
```liquid
{% case settings.mode %}
  {% when 'production' %}
    <link rel="stylesheet" href="{{ 'tailwind.min.css' | asset_url }}">
  {% when 'production-css-inline' %}        {%- comment -%} default — best Lighthouse {%- endcomment -%}
    <style>{{ 'tailwind.min.css' | inline_asset_content }}</style>
  {% when 'development' %}                  {%- comment -%} live compile, dev only {%- endcomment -%}
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">{{ 'tailwind.css' | inline_asset_content }}</style>
{% endcase %}
```
- **Production ships the committed `assets/tailwind.min.css`** (~65 KB) — no runtime CDN, Theme-Store-safe.
- `development` uses `@tailwindcss/browser@4` to compile `tailwind.css` live → zero build loop in `shopify theme dev`.
- Regenerate prod CSS after porting (when `.liquid` exists for content scanning):
  `cd theme && npm run build` (= `css:gen` + `@tailwindcss/cli --minify`). Tailwind v4 auto-scans `**/*.liquid`.
- `package.json` + `README.md` + `schema/` are in `.shopifyignore` (not uploaded).

## 2. Fonts — Shopify standard (always)

NEVER a Google-Fonts `@import`. Fonts are Shopify-hosted via `font_picker` + `font_face`.
Settings (`config/settings_schema.json` → Typography): `font_heading` (`space_grotesk_n7`),
`font_body` (`inter_n4`), `font_accent`/mono (`space_mono_n4`) + heading/body scale ranges.

`theme.liquid` head (Dawn pattern) emits faces + sets the CSS vars the tokens consume:
```liquid
{%- unless settings.font_heading.system? and settings.font_body.system? -%}
  {{ settings.font_heading | font_face: font_display: 'swap' }}
  {{ settings.font_body | font_face: font_display: 'swap' }}
  {{ settings.font_accent | font_face: font_display: 'swap' }}
{%- endunless -%}
<style>
  :root {
    --font-heading-family: {{ settings.font_heading.family }}, {{ settings.font_heading.fallback_families }};
    --font-body-family: {{ settings.font_body.family }}, {{ settings.font_body.fallback_families }};
    --font-accent-family: {{ settings.font_accent.family }}, {{ settings.font_accent.fallback_families }};
    --font-heading-scale: {{ settings.font_heading_scale | divided_by: 100.0 }};
    --font-body-scale: {{ settings.font_body_scale | divided_by: 100.0 }};
  }
</style>
```
`tokens/typography.css` defines `--font-display: var(--font-heading-family, 'Space Grotesk', …)` etc., so the
**prototype** falls back to the brand fonts and the **Liquid theme** uses the merchant's pick. One source.

> Validate the default handles with `shopify theme check` during the port; if `space_grotesk_n7` /
> `space_mono_n4` aren't in Shopify's font library, swap to the nearest available handle.

## 3. Dawn-standard structure (the port targets)

`layout/theme.liquid` · `config/{settings_schema,settings_data}.json` · `sections/*.liquid` (with `{% schema %}`) ·
`blocks/` · `snippets/` · `templates/*.json` (OS 2.0) · `assets/` · `locales/`. Sections-everywhere, color
schemes via `color_scheme_group`, `t:` locale labels, WCAG AA, Lighthouse ≥ 60. JSON already passes `/tjson` 70/70.
