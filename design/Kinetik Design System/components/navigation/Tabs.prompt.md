Underline tabs with an ink active marker. Pass `content` per tab, or render your own panel from `onChange`.

```jsx
<Tabs tabs={[
  { id: 'desc', label: 'Description', content: <p>…</p> },
  { id: 'specs', label: 'Specs', content: <SpecTable/> },
  { id: 'ship', label: 'Shipping', content: <p>Ships in 24h.</p> },
]} />
```

Controlled via `value` + `onChange` when the active panel lives elsewhere.
