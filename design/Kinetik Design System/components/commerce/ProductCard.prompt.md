The signature storefront tile. Sits in an exposed grid; on hover it plays the media and slides up a volt Add-to-Cart bar. Pass a `compareAt` above `price` and it auto-computes the sale flag.

```jsx
<ProductCard
  name="Shell-01 Hardshell"
  category="Outerwear"
  price={336} compareAt={420}
  badge="New Drop"
  colors={[{name:'Volt',swatch:'#CCFF00'},{name:'Ink',swatch:'#0A0A0A'}]}
  videoSrc="/media/shell-01.mp4"
  onAdd={() => addToCart(id)}
  onOpen={() => goToPdp(id)}
/>
```

Lay them out in a `display:grid` with `gap:1px` on a hairline background for the bento look. Leave `src`/`videoSrc` empty to get the branded placeholder.
