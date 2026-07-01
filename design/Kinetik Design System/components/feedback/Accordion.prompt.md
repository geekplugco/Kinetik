Hairline accordion with a +/− toggle and smooth grid-rows reveal. Ideal for PDP detail sections, shipping/returns, and FAQ.

```jsx
<Accordion defaultOpen={['desc']} items={[
  { id: 'desc', title: 'Description', content: <p>3-layer Gore-Tex shell…</p> },
  { id: 'fit', title: 'Fit & Sizing', content: 'Boxed regular. Size up for layering.' },
  { id: 'ship', title: 'Shipping & Returns', content: 'Ships in 24h · 60-day returns.' },
]} />
```

Pass `multi` for FAQ lists where several can be open.
