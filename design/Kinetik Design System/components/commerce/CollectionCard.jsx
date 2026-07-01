import React, { useState } from 'react';
import { MediaTile } from './MediaTile.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Collection tile — media with an overlaid label + item count. For the homepage
 * category bento and collection-list sections.
 */
export function CollectionCard({ name, count, src, code, ratio = '4 / 5', onOpen, style, ...rest }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'block', cursor: 'pointer', overflow: 'hidden', background: 'var(--ink-100)', ...style }}
      {...rest}
    >
      <MediaTile src={src} code={code || name} ratio={ratio} tone="dark"
        style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform var(--dur-slow) var(--ease-out)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.55), rgba(10,10,10,0) 55%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--space-5) var(--space-5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: 24, color: 'var(--paper)', lineHeight: 1 }}>{name}</h3>
          {count != null && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{count} Items</span>
          )}
        </div>
        <span style={{ display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', color: 'var(--ink-950)', transform: hovered ? 'translate(2px,-2px)' : 'none', transition: 'transform var(--dur-fast) var(--ease-out)' }}>
          <Icon name="arrowUpRight" size={20} />
        </span>
      </div>
    </a>
  );
}
