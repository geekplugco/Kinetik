import React from 'react';
import { Icon } from '../core/Icon.jsx';

function fmt(n, currency = 'USD') {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n); }
  catch { return '$' + n; }
}

/**
 * Free-shipping progress bar for the cart. Volt fill; flips to an unlocked
 * state at the threshold. A quiet, persistent CRO nudge.
 */
export function ShippingBar({ current = 0, threshold = 200, currency = 'USD', style, ...rest }) {
  const pct = Math.max(0, Math.min(1, current / threshold)) * 100;
  const unlocked = current >= threshold;
  const remaining = Math.max(0, threshold - current);

  return (
    <div style={{ padding: 'var(--space-4) var(--space-5)', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-body)' }}>
        <Icon name={unlocked ? 'check' : 'package'} size={15} style={{ color: unlocked ? 'var(--text-strong)' : 'var(--text-muted)' }} />
        {unlocked
          ? <span>Free shipping unlocked</span>
          : <span>{fmt(remaining, currency)} away from free shipping</span>}
      </div>
      <div style={{ position: 'relative', height: 6, background: 'var(--surface-sunken)', border: '1px solid var(--border-hairline)' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`,
          background: 'var(--accent)',
          transition: 'width var(--dur-slow) var(--ease-out)',
        }} />
      </div>
    </div>
  );
}
