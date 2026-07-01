import React from 'react';
import { Icon } from '../core/Icon.jsx';

function range(total, current, span = 1) {
  const pages = new Set([1, total, current]);
  for (let i = 1; i <= span; i++) { pages.add(current - i); pages.add(current + i); }
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) { if (p - prev > 1) out.push('…'); out.push(p); prev = p; }
  return out;
}

/**
 * Pagination — square numbered cells, ink for current. Prev/next chevrons.
 */
export function Pagination({ page = 1, total = 1, onChange, style, ...rest }) {
  const cell = (active) => ({
    minWidth: 40, height: 40, padding: '0 8px',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: active ? 'var(--surface-inverse)' : 'transparent',
    color: active ? 'var(--text-inverse)' : 'var(--text-strong)',
    border: '1px solid var(--border-hairline)', marginLeft: -1, cursor: 'pointer',
    fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
  });
  const go = (p) => { if (p >= 1 && p <= total && p !== page) onChange?.(p); };

  return (
    <nav aria-label="Pagination" style={{ display: 'inline-flex', alignItems: 'center', ...style }} {...rest}>
      <button aria-label="Previous" onClick={() => go(page - 1)} disabled={page <= 1}
        style={{ ...cell(false), marginLeft: 0, opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>
        <Icon name="chevronRight" size={16} style={{ transform: 'rotate(180deg)' }} />
      </button>
      {range(total, page).map((p, i) => p === '…'
        ? <span key={`e${i}`} style={{ ...cell(false), cursor: 'default', color: 'var(--text-faint)' }}>…</span>
        : <button key={p} onClick={() => go(p)} aria-current={p === page} style={cell(p === page)}>{p}</button>
      )}
      <button aria-label="Next" onClick={() => go(page + 1)} disabled={page >= total}
        style={{ ...cell(false), opacity: page >= total ? 0.4 : 1, cursor: page >= total ? 'not-allowed' : 'pointer' }}>
        <Icon name="chevronRight" size={16} />
      </button>
    </nav>
  );
}
