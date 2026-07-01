import React from 'react';

/**
 * Variant selector — the "seamless variant switching" control.
 * `kind="color"` renders a swatch dot; `kind="size"`/`kind="label"` renders
 * a square chip. Selected = ink frame; volt tick on color.
 */
export function OptionSwatch({
  kind = 'label',
  value,
  selected = false,
  disabled = false,
  swatch,
  onSelect,
  style,
  children,
  ...rest
}) {
  const common = {
    position: 'relative',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'var(--surface-card)',
    transition: 'box-shadow var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)',
    opacity: disabled ? 0.4 : 1,
  };

  if (kind === 'color') {
    return (
      <button
        type="button" disabled={disabled} aria-pressed={selected}
        onClick={() => !disabled && onSelect?.(value)}
        title={value}
        style={{
          ...common,
          width: 32, height: 32, padding: 3, borderRadius: 'var(--radius-pill)',
          border: `1px solid ${selected ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
          ...style,
        }}
        {...rest}
      >
        <span style={{
          width: '100%', height: '100%', borderRadius: 'var(--radius-pill)',
          background: swatch, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
          display: 'block',
        }} />
        {disabled && <span style={{ position: 'absolute', inset: 0, borderTop: '1px solid var(--ink-400)', transform: 'rotate(45deg)' }} />}
      </button>
    );
  }

  // size / label chip
  return (
    <button
      type="button" disabled={disabled} aria-pressed={selected}
      onClick={() => !disabled && onSelect?.(value)}
      style={{
        ...common,
        minWidth: 44, height: 40, padding: '0 12px',
        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
        color: selected ? 'var(--text-strong)' : 'var(--text-body)',
        border: `1px solid ${selected ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
        boxShadow: selected ? 'inset 0 0 0 1px var(--border-strong)' : 'none',
        borderRadius: 'var(--radius-0)',
        textDecoration: disabled ? 'line-through' : 'none',
        ...style,
      }}
      {...rest}
    >
      {children ?? value}
    </button>
  );
}
