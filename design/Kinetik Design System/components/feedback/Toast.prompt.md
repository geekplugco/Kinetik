Transient confirmation, typically after Add-to-Cart. Self-positions bottom-center and auto-dismisses.

```jsx
<Toast open={added} onClose={() => setAdded(false)}
  message="Added to cart"
  action={{ label: 'View Cart', onClick: openCart }} />
```

Keep messages to a few words. The leading check sits in a volt chip; pass `icon={null}` to drop it.
