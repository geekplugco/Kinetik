import React from 'react';

const STAR = 'M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2Z';

function Stars({ filled, size }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size}
          fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
}

/**
 * Star rating — fractional fill via clip. Optional review count.
 * Stars inherit currentColor; default ink (volt is reserved for conversion).
 */
export function StarRating({ value = 0, count, size = 15, showValue = false, color = 'var(--text-strong)', style, ...rest }) {
  const pct = Math.max(0, Math.min(1, value / 5)) * 100;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color, ...style }} {...rest}>
      <div style={{ position: 'relative', lineHeight: 0 }} aria-label={`${value} out of 5`}>
        <div style={{ color: 'var(--border-hairline)' }}><Stars filled size={size} /></div>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, overflow: 'hidden' }}>
          <Stars filled size={size} />
        </div>
      </div>
      {showValue && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700 }}>{value.toFixed(1)}</span>}
      {count != null && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>({count})</span>
      )}
    </div>
  );
}
