Row of reassurance signals for under the Add-to-Cart, the cart drawer, or the footer. Hairline cells, mono labels, no payment-brand logos (keep it on-brand).

```jsx
<TrustBar />  {/* defaults: 24h ship · secure · returns · warranty */}
<TrustBar columns={2} items={[
  { icon: 'package', label: 'Ships in 24h' },
  { icon: 'shield', label: 'Secure checkout' },
]} />
```
