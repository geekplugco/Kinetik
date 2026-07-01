Square −/＋ quantity control with a mono readout. Used on PDP and in cart line items.

```jsx
const [qty, setQty] = useState(1);
<QuantityStepper value={qty} min={1} max={10} onChange={setQty} />
<QuantityStepper value={qty} onChange={setQty} size="sm" /> {/* in cart rows */}
```

Clamps to `min`/`max` and disables the relevant button at the bounds.
