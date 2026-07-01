The product media frame. Pass `src` for a still, `videoSrc` for hover-to-play (muted, looped, inline). With neither it renders a branded grid placeholder so layouts hold shape before real media exists.

```jsx
<MediaTile videoSrc="/media/shell-01.mp4" src="/media/shell-01.jpg" ratio="4 / 5" />
<MediaTile code="KX-SHELL-01" ratio="1 / 1" />        {/* placeholder */}
<MediaTile tone="dark" code="Audio" />                {/* dark placeholder */}
```

Children render on top (use for Tag flags / wishlist buttons positioned absolutely).
