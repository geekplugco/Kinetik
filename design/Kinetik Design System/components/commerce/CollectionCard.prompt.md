Collection tile — media with an overlaid name + item count and a hover zoom. For the homepage category bento and collection-list sections.

```jsx
<CollectionCard name="Outerwear" count={24} code="Outerwear" ratio="16 / 9" onOpen={() => goCollection('outerwear')} />
```

Lay these in a `gap:1px` hairline grid for the bento look.
