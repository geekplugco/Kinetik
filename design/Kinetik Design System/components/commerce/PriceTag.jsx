import React from 'react';

/** Format a number as USD with no trailing cents when whole. */
function fmt(n, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(n);
  } catch { return '$' + n; }
}

/**
 * Price block — mono numerals. Optional compare-at (struck) reveals a volt
 * discount; the sale price inherits ink (never colored) to keep volt scarce.
 */
export function PriceTag({ price, compareAt, currency = 'USD', size = 'md', align = 'left', style, ...rest }) {
  const onSale = compareAt != null && compareAt > price;
  const fs = size === 'lg' ? 28 : size === 'sm' ? 14 : 18;

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, justifyContent: align === 'right' ? 'flex-end' : 'flex-start', ...style }} {...rest}>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: fs, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>
        {fmt(price, currency)}
      </span>
      {onSale && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: fs * 0.62, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
          {fmt(compareAt, currency)}
        </span>
      )}
    </div>
  );
}
