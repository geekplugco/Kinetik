Slide-in panel for the smart cart, filters, and mobile menu. Animates with transform + opacity (no layout shift). Closes on overlay click, the header ✕, or Escape.

```jsx
<Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Cart · 2"
  footer={<Button variant="inverse" block>Checkout — $756</Button>}>
  {items.map(it => <CartLineItem key={it.id} {...it} />)}
</Drawer>
```

Use `side="left"` for nav. Put the upsell carousel and totals in the scroll body / footer respectively.
