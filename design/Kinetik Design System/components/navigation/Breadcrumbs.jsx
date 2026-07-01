import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Breadcrumb trail — mono, uppercase, chevron-separated. Last item is current.
 */
export function Breadcrumbs({ items = [], onNavigate, style, ...rest }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, ...style }} {...rest}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const label = typeof it === 'string' ? it : it.label;
        return (
          <React.Fragment key={i}>
            <a
              onClick={() => !last && onNavigate?.(it, i)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: last ? 'var(--text-strong)' : 'var(--text-muted)',
                cursor: last ? 'default' : 'pointer',
              }}
            >{label}</a>
            {!last && <Icon name="chevronRight" size={13} style={{ color: 'var(--text-faint)' }} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
