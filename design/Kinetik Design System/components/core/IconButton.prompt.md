Square icon-only control for header utilities (search, cart, menu), card wishlist toggles, and stepper buttons. Always pass `aria-label`.

```jsx
<IconButton aria-label="Open cart"><Icon name="bag" /></IconButton>
<IconButton aria-label="Wishlist" active><Icon name="heart" /></IconButton>
<IconButton aria-label="Menu" bordered><Icon name="menu" /></IconButton>
```

`active` fills it volt. `variant="inverse"` for dark headers.
