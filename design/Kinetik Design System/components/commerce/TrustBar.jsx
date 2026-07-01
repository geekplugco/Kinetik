import React from 'react';
import { Icon } from '../core/Icon.jsx';

const DEFAULTS = [
  { icon: 'package', label: 'Ships in 24h' },
  { icon: 'shield', label: 'Secure checkout' },
  { icon: 'arrowRight', label: '60-day returns' },
  { icon: 'star', label: '2-year warranty' },
];

/**
 * Trust bar — a row of reassurance signals (shipping, security, returns,
 * warranty). Hairline-divided cells, mono labels. No payment-brand logos.
 */
export function TrustBar({ items = DEFAULTS, columns, style, ...rest }) {
  const cols = columns || items.length;
  return (
    <div
      style={{
        display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px', background: 'var(--border-hairline)',
        border: '1px solid var(--border-hairline)', ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 'var(--space-4) var(--space-5)', background: 'var(--surface-card)',
        }}>
          <Icon name={it.icon} size={18} style={{ color: 'var(--text-strong)', flex: 'none' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-body)' }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}
