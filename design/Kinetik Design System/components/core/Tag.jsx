import React from 'react';

function toneStyle(tone) {
  switch (tone) {
    case 'sale': // volt — the only colored tag
      return { background: 'var(--accent)', color: 'var(--accent-ink)', border: '1px solid transparent' };
    case 'solid': // ink block — "NEW", "DROP"
      return { background: 'var(--surface-inverse)', color: 'var(--text-inverse)', border: '1px solid var(--surface-inverse)' };
    case 'outline': // hairline spec chip
      return { background: 'transparent', color: 'var(--text-body)', border: '1px solid var(--border-hairline)' };
    case 'muted':
    default:
      return { background: 'var(--surface-sunken)', color: 'var(--text-muted)', border: '1px solid transparent' };
  }
}

/**
 * Mono uppercase tag/badge — sale flags, status, spec chips.
 */
export function Tag({ tone = 'outline', shape = 'square', children, style, ...rest }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        lineHeight: 1,
        padding: '5px 9px',
        borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-0)',
        whiteSpace: 'nowrap',
        ...toneStyle(tone),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
