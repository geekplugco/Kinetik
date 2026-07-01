Color × size variant selector with a live availability matrix. Selecting a color re-evaluates which sizes are in stock; sold-out sizes strike through, fully-out colors get a slash. Controlled — own the `value` and react to `onChange`.

```jsx
const [variant, setVariant] = useState({ color: 'Volt', size: 'M' });

<VariantPicker
  colors={product.colors}
  sizes={product.sizes}
  unavailable={product.unavailable}   // ['Volt|XS', 'Ink|*']
  value={variant}
  onChange={setVariant}
  onGuide={() => setGuideOpen(true)}
/>

// gate the CTA:
const soldOut = isUnavailable(product.unavailable, variant.color, variant.size);
<Button variant="primary" disabled={!variant.size || soldOut}>
  {soldOut ? 'Sold Out' : !variant.size ? 'Select a Size' : 'Add to Cart'}
</Button>
```

`unavailable` entries are `"${color}|${size}"`; use `"${color}|*"` to mark an entire colorway out.
