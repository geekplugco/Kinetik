# KINETIK — Originality Manifesto & Anti-Copy Rules

> The creative north star for the Kinetik Shopify theme.
> Every section, setting, preset, and interaction is measured against this document
> before it is built and again before it ships. If a thing cannot pass the
> [Anti-Copy Checklist](#anti-copy-checklist), it is redesigned or removed — not shipped.

**Status:** canonical · **Owner:** Kinetik design · **Referenced by:** `Kinetik-m13e` (originality review gate), `Kinetik-4ef` (10/10 scorecard, Originality category), `Kinetik-34cm` (PDP blueprint), and every section/feature task downstream of those.

Grounded in `design/Kinetik Design System/` (the brand bible) — this document does not restate the design system; it defines *what makes Kinetik unmistakably itself* and *what we refuse to copy.*

---

## 0. The premise in one line

Kinetik is **a spec sheet that happens to be beautiful** — a brutalist-but-elegant commerce system for high-end techwear, streetwear, and tech accessories, where high-resolution media lives inside an interface that feels instant.

It is not a soft, rounded, gradient-washed lifestyle theme. It is not Dawn with a hero image. It is a precision instrument that sells precision goods.

---

## 1. The twelve principles

Each principle is **original = a deliberate, Kinetik-specific position** — not a generic best practice. A section is "on-brand" only when it can be traced back to at least one of these.

### P1 — Monochrome canvas, one charged accent

The entire interface is pure paper (`#FFFFFF`) or pure ink (`#0A0A0A`) with a neutral ramp. **Exactly one** accent exists — **Volt `#CCFF00`** — and it is rationed: Add-to-Cart, the sale flag, focus rings, the logo full-stop. Volt is a verb (it means *act*), never decoration. If Volt appears in two non-conversion places on one screen, one of them is wrong.

### P2 — The grid is exposed, never hidden

Layout is built from 1px hairline borders on a strict 4px grid. Sections and cards are *cells* with visible edges — content never floats in soft, borderless whitespace. Elevation comes from a hairline first, an **ink** border for emphasis, and shadow **only** for things that genuinely float (drawer, popover, dialog). A drop shadow used for "depth" on a static card is off-brand.

### P3 — Type is oversized and angular, set tight

Display and headings are **Space Grotesk**, pushed large with tight tracking (−0.04em on hero, 0.92 line-height). The size *is* the hierarchy — we don't decorate headings, we enlarge them. Hero copy is 1–3 words. Reading text is **Inter**. There is no script, no serif, no soft humanist display face.

### P4 — The spec-sheet voice carries every label

Prices, SKUs, sizes, stock, tags, sale flags, and section eyebrows are **Space Mono, uppercase, 0.10–0.12em tracking**. Numbers do the selling — `480g`, `GORE-TEX 3L`, `40H`, `SHIPS IN 24H`, `−20%`. This mono "instrument readout" is a Kinetik signature: a competitor can copy a layout but not the discipline of treating every functional string as telemetry. Marketing filler and exclamation stacking are banned (`SALE!!!` → `−20%`).

### P5 — Square by default, pill only for what is already round

Default corner radius is **0**. Controls and cards may take 2–4px. Pills are reserved for tags and avatars. "Rounded-everything" — the friendly 12–16px radius that every SaaS-flavored theme defaults to — is explicitly off-brand because it reads soft, and Kinetik is sharp.

### P6 — Motion is app-like, transform-only, and snappy

Signature easing is expo-out **`cubic-bezier(.16,1,.3,1)`** at ~140–340ms (220ms baseline); drawers/menus use a standard ease. We animate **transform and opacity only — never layout**. Variant swaps are *instant* (no spinner). The Add-to-Cart bar slides up on card hover; the cart drawer translates in. Motion confirms an action happened fast; it never performs for its own sake. `prefers-reduced-motion` is always honored. Decorative parallax, auto-playing carousels that hijack scroll, and "reveal-on-scroll" theatrics are forbidden.

### P7 — Media is content, framed by hairlines — never wallpaper

Full-bleed imagery and hover-to-play muted MP4s are welcome **as content** (lookbook, product, drop story), always framed by the hairline grid. Imagery is cool, sharp, high-contrast, editorial. There is **no** photographic wash behind text, no gradient overlay to force contrast, no ambient background video. If text needs a scrim to be readable, the composition is wrong.

### P8 — The `KINETIK.` lockup is the smallest possible logo system

The wordmark is `KINETIK.` in Space Grotesk 700 at −0.04em, with the **full-stop rendered in Volt**. That single charged period is the entire logo language — no badge, no emblem, no gradient mark, no mascot. It states the name and stops. Period.

### P9 — Density with air: architectural whitespace around dense data

Kinetik is information-dense (specs, swatches, stock, fulfillment) **and** generous with space. The resolution of that tension is *architecture*: bento/card cells, a 1440px max container, and large negative space around oversized type. We are neither a cramped marketplace grid nor an airy single-product landing page. Dense where the customer is deciding; spacious where they are feeling the brand.

### P10 — Every claim is real and merchant-owned

No hardcoded fake trust badges, invented review counts, fake "247 people viewing", or placeholder testimonials in shipped Liquid. Trust, fulfillment, fit, and material content are **merchant-editable** (settings, blocks, metafields) and rendered only when present, with honest empty states. Substance over theater — this is both an originality stance and a Theme Store requirement.

### P11 — Sections are independent, named like a system

Every section/block is self-contained, reusable, performance-reviewed, and ships zero runtime icon/font dependency where avoidable. Section and setting names use the Kinetik lexicon (*field, drop, system, lab, loadout, spec*) — not the generic Shopify defaults ("Image with text", "Rich text") where a sharper name fits the brand. Naming is part of the product.

### P12 — Accessibility is part of the aesthetic, not a tax

Monochrome + one accent makes WCAG AA *easy* — so we hold AA as a floor, not a goal. Focus is a visible ink ring on light / Volt ring on dark. Reduced motion is a first-class path. Sharp, high-contrast, keyboard-navigable, screen-reader-labeled — accessible *is* the premium look, not a compromise against it.

---

## 2. Anti-Copy Checklist

A section fails review if it does **any** of the following. These are the patterns that make a theme feel generic, derivative, or like a direct clone of another premium Shopify theme/demo.

**Visual tells of a clone**
- [ ] Uses a second accent color, a gradient, or a multicolor scheme (violates P1).
- [ ] Adds drop shadows for "depth" on static cards instead of hairline/ink borders (P2).
- [ ] Default radius > 4px on cards/controls, or pill-shaped buttons (P5).
- [ ] Photographic/gradient wash behind text, or a scrim added to force contrast (P7).
- [ ] A logo badge/emblem/gradient mark instead of the `KINETIK.` wordmark (P8).
- [ ] Decorative gradients, blobs, soft drop-shadow "floating" UI, or glassmorphism.

**Typographic tells**
- [ ] Headings rely on weight/color/underline for hierarchy instead of size + Space Grotesk (P3).
- [ ] Prices/specs/labels set in the body font instead of the mono spec-sheet voice (P4).
- [ ] Marketing filler, emoji, or exclamation stacking in copy (P4).
- [ ] A serif, script, or soft humanist display face anywhere.

**Interaction tells**
- [ ] Animates layout (height/width/top/margin) instead of transform+opacity (P6).
- [ ] Auto-advancing carousel that hijacks scroll, parallax theater, or reveal-on-scroll choreography (P6).
- [ ] A spinner on variant change instead of an instant swap (P6).
- [ ] No `prefers-reduced-motion` path (P6, P12).

**Substance tells**
- [ ] Any hardcoded fake claim, badge, review count, urgency counter, or placeholder testimonial in shipped Liquid (P10).
- [ ] Generic Shopify default section/setting names where a Kinetik-lexicon name fits (P11).

**The clone test (the decisive one)**
- [ ] **Could this section be dropped into Dawn, Impulse, Prestige, Pipeline, Broadcast, or Symmetry and look native there?** If yes, it is not yet Kinetik. A reviewer must be able to identify the section as Kinetik *with the logo removed* — by grid, type, voice, and Volt discipline alone.

---

## 3. Benchmark-transformation protocol

Studying premium themes is encouraged. **Copying them is forbidden.** Every benchmark insight must be *transformed* into a Kinetik-specific idea before any code is written. The transform is recorded, not skipped.

For each borrowed insight, write one line:

```
SAW:        <pattern observed in benchmark theme/demo>
PRINCIPLE:  <the underlying reason it works — the commerce/UX truth>
KINETIK:    <how that truth is re-expressed through P1–P12>
DROPPED:    <what we deliberately did NOT carry over, and why>
```

Example:
```
SAW:        Prestige's sticky add-to-cart with a soft drop-shadow and rounded pill button.
PRINCIPLE:  Keep the buy action reachable during long PDP scroll → fewer abandoned carts.
KINETIK:    Sticky ATC bar, hairline top border (no shadow), square button, Volt fill,
            mono "ADD · $336" label; slides up with expo-out 220ms. (P2,P4,P5,P6)
DROPPED:    The shadow and the pill — they read soft; the hairline + square reads sharp.
```

Rule: **no benchmark pattern enters the theme un-transformed.** "We did it like <Theme>" is never a justification — only "we transformed <Theme>'s insight into Kinetik via P#".

---

## 4. The originality note (required per section)

Every new premium section ships with an originality note in its task / PR description (this is what `Kinetik-m13e`, the review gate, validates):

```
ORIGINALITY NOTE
  Inspiration:   <sources studied, if any>
  Transformed:   <what benchmark insight was re-expressed, via which principles>
  Unique:        <what is specifically Kinetik here that exists nowhere else>
  Avoided:       <generic patterns deliberately rejected — cite Anti-Copy items>
  Clone test:    PASS — identifiable as Kinetik with the logo removed because <reason>
```

A section that cannot fill "Unique" with something real is a **primitive** — a best-practice building block (e.g. a plain rich-text block). Primitives are allowed, but only when executed with Kinetik restraint (mono labels, hairline frame, square corners, no decoration). A section that is generic *and* claims to be premium is redesigned or removed.

---

## 5. Final-review rejection rule

At final design QA, the reviewer runs the [Clone test](#anti-copy-checklist) and the [Anti-Copy Checklist](#anti-copy-checklist) against every shipped section.

- **No copied layout, copy, naming, or interaction survives.** If a section reads as a direct clone of another theme or demo, it is rejected regardless of how polished it is.
- A section blocks release if any Anti-Copy item is checked and not justified by a recorded benchmark-transform.
- The Originality category of the 10/10 scorecard (`Kinetik-4ef`) cannot score 10 while any shipped section fails the clone test.

Originality is not the final coat of polish. It is the gate every section passes through on the way in.
