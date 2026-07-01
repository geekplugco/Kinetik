import React from 'react';

/**
 * Quantity stepper — square hairline group, ink press feedback.
 */
export function QuantityStepper({ value = 1, min = 1, max = 99, onChange, size = 'md', style, ...rest }) {
  const dim = size === 'sm' ? 32 : 40;
  const dec = () => onChange?.(Math.max(min, value - 1));
  const inc = () => onChange?.(Math.min(max, value + 1));

  const btn = (disabled) => ({
    width: dim, height: dim, flex: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled ? 'var(--text-faint)' : 'var(--text-strong)',
    transition: 'background var(--dur-fast) var(--ease-standard)',
  });

  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center',
        border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-0)',
        ...style,
      }}
      {...rest}
    >
      <button type="button" aria-label="Decrease" onClick={dec} disabled={value <= min} style={btn(value <= min)}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 12h14"/></svg>
      </button>
      <span style={{
        minWidth: dim, textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: 14, color: 'var(--text-strong)',
        borderLeft: '1px solid var(--border-hairline)', borderRight: '1px solid var(--border-hairline)',
        height: dim, lineHeight: `${dim}px`,
      }}>{value}</span>
      <button type="button" aria-label="Increase" onClick={inc} disabled={value >= max} style={btn(value >= max)}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </button>
    </div>
  );
}
