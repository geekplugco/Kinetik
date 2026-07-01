import React, { useState } from 'react';
import { MediaTile } from '../commerce/MediaTile.jsx';
import { Tag } from '../core/Tag.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Article card — blog/editorial teaser. `layout="row"` for a featured wide
 * post, `layout="stack"` (default) for the grid.
 */
export function ArticleCard({
  title, excerpt, category, date, readTime, author,
  src, code, layout = 'stack', onOpen, style, ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const row = layout === 'row';

  const Media = (
    <div style={{ position: 'relative', overflow: 'hidden', flex: row ? '1 1 0' : 'none' }}>
      <MediaTile src={src} code={code || category} ratio={row ? '4 / 3' : '16 / 10'}
        style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform var(--dur-slow) var(--ease-out)' }} />
      {category && <div style={{ position: 'absolute', top: 12, left: 12 }}><Tag tone="solid">{category}</Tag></div>}
    </div>
  );

  const Body = (
    <div style={{ flex: row ? '1 1 0' : 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: row ? 'var(--space-8)' : 'var(--space-4) 0 0', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {date && <span>{date}</span>}
        {readTime && <span>· {readTime} read</span>}
      </div>
      <h3 style={{ fontSize: row ? 'clamp(1.5rem, 3vw, 2.25rem)' : 19, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{title}</h3>
      {excerpt && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-body)', maxWidth: 520 }}>{excerpt}</p>}
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>
        Read Article <Icon name="arrowRight" size={14} />
      </span>
    </div>
  );

  return (
    <a
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: row ? 'row' : 'column', gap: row ? 0 : undefined, background: 'var(--surface-card)', ...style }}
      {...rest}
    >
      {Media}
      {Body}
    </a>
  );
}
