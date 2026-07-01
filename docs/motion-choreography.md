# Kinetik motion choreography

Kinetik motion should feel engineered and quiet: fast acknowledgement, smooth settlement, no bounce, no layout movement during animation.

## Tokens

- Micro interactions: `--motion-micro` with `--ease-technical`.
- Buttons, chips, tabs, accordions: `--motion-fast` or `--motion-ui`.
- Drawers and mobile menus: `--motion-drawer` with `--ease-drawer`.
- Center modals and quick view: `--motion-modal` with `--ease-modal`.
- Backdrops: `--motion-overlay` with `--ease-enter`; exit uses `--motion-exit` with `--ease-exit`.
- Product/editorial media: `--motion-media` with `--ease-image`.

## Choreography

- Drawers enter with transform on one axis and backdrop opacity. Content may fade after `--motion-content-delay`.
- Center modals enter with opacity, `translateY(var(--motion-modal-y))`, and `scale(var(--motion-modal-scale))`.
- Bottom sheets enter with `translateY(var(--motion-sheet-y))`.
- Hover lift uses `translateY(var(--motion-hover-lift))`.
- Image effects use transform and opacity only; avoid animating width, height, top, left, margin, padding, or box-shadow.

## Reduced Motion

`prefers-reduced-motion: reduce` collapses motion durations to `1ms`, removes travel distances, and disables scale effects. Required interactions must still open, close, focus, and update state.

## Overlay Requirements

Every drawer, modal, quick view, popup, and menu must support:

- Open and close animation before unmount.
- Body scroll lock without layout jump.
- Escape close and backdrop close where appropriate.
- Focus trap while open and focus restore on close.
- No hidden content left inaccessible after close.
- No forced layout work during the transition.
