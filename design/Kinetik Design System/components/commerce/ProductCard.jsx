import React, { useState } from 'react';
import { MediaTile } from './MediaTile.jsx';
import { PriceTag } from './PriceTag.jsx';
import { Tag } from '../core/Tag.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Product card — exposed grid cell. Hover plays media and slides up a volt
 * Add-to-Cart bar; color dots preview variants. The whole tile is one
 * conversion unit.
 */
export function ProductCard({
  name,
  category,
  price,
  compareAt,
  colors = [],
  src,
  videoSrc,
  code,
  badge,
  wished = false,
  onAdd,
  onWishlist,
  onOpen,
  style,
  // swallow catalog fields that aren't DOM attributes (from {...product} spreads)
  id, sizes, soldOut, blurb, specs, rating, reviews, unavailable, lowStock,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const onSale = compareAt != null && compareAt > price;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-0)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onOpen}>
        <MediaTile src={src} videoSrc={videoSrc} code={code || name} ratio="4 / 5" alt={name} />

        {/* flags */}
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
          {onSale && <Tag tone="sale">−{Math.round((1 - price / compareAt) * 100)}%</Tag>}
          {badge && <Tag tone="solid">{badge}</Tag>}
        </div>

        {/* wishlist */}
        <button
          type="button" aria-label="Add to wishlist"
          onClick={(e) => { e.stopPropagation(); onWishlist?.(); }}
          style={{
            position: 'absolute', top: 8, right: 8, width: 36, height: 36,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface-card)', border: '1px solid var(--border-hairline)',
            color: wished ? 'var(--text-strong)' : 'var(--text-muted)', cursor: 'pointer',
            opacity: hovered || wished ? 1 : 0,
            transform: hovered || wished ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
          }}
        >
          <Icon name="heart" size={17} style={wished ? { fill: 'currentColor' } : undefined} />
        </button>

        {/* add-to-cart reveal */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onAdd?.(); }}
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            height: 48, border: 'none', cursor: 'pointer',
            background: 'var(--accent)', color: 'var(--accent-ink)',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform var(--dur-base) var(--ease-out)',
          }}
        >
          <Icon name="bag" size={16} /> Add to Cart
        </button>
      </div>

      {/* meta */}
      <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {category && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{category}</span>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <h4 onClick={onOpen} style={{ fontSize: 16, lineHeight: 1.15, cursor: onOpen ? 'pointer' : 'default' }}>{name}</h4>
        </div>
        <PriceTag price={price} compareAt={compareAt} size="sm" />
        {colors.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
            {colors.slice(0, 5).map((c, i) => (
              <span key={i} title={c.name} style={{
                width: 14, height: 14, borderRadius: 'var(--radius-pill)',
                background: c.swatch, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
              }} />
            ))}
            {colors.length > 5 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>+{colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
