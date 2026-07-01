Styled native dropdown for sort order, country, and other single-choice fields. Native `<select>` under the hood for accessibility + mobile pickers.

```jsx
<Select label="Sort" value={sort} onChange={e => setSort(e.target.value)}
  options={[
    { value: 'featured', label: 'Featured' },
    { value: 'new', label: 'Newest' },
    { value: 'price-asc', label: 'Price · Low to High' },
  ]} />
```

Options accept strings or `{ value, label }`.
