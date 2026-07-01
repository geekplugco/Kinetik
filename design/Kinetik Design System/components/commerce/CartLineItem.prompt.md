Line item for the cart drawer — thumbnail, name + variant, quantity stepper, line total, and remove. `price`/`compareAt` are per-unit; the component multiplies by `qty`.

```jsx
<CartLineItem
  name="Shell-01 Hardshell" variant="Volt · M"
  price={336} compareAt={420} qty={1}
  onQty={(q) => setQty(id, q)} onRemove={() => remove(id)}
/>
```
