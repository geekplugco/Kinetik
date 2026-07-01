import React, { useState } from 'react';

/**
 * Text input — square, hairline, ink focus block. Optional leading icon.
 */
export function Input({
  label,
  hint,
  iconLeft,
  invalid = false,
  size = 'md',
  style,
  containerStyle,
  id,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const pad = size === 'lg' ? '14px 14px' : size === 'sm' ? '8px 10px' : '11px 12px';
  const fieldId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = invalid ? 'var(--negative)' : focused ? 'var(--border-strong)' : 'var(--border-hairline)';

  return (
    <label htmlFor={fieldId} style={{ display: 'block', ...containerStyle }}>
      {label && (
        <span style={{
          display: 'block', marginBottom: 6,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{label}</span>
      )}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: pad,
        background: 'var(--surface-card)',
        border: `1px solid ${borderColor}`,
        boxShadow: focused ? 'inset 0 0 0 1px ' + borderColor : 'none',
        borderRadius: 'var(--radius-0)',
        transition: 'border-color var(--dur-fast) var(--ease-standard)',
      }}>
        {iconLeft && <span style={{ color: 'var(--text-muted)', display: 'flex' }}>{iconLeft}</span>}
        <input
          id={fieldId}
          onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
          {...rest}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-strong)',
            padding: 0, ...style,
          }}
        />
      </span>
      {hint && (
        <span style={{
          display: 'block', marginTop: 6, fontSize: 12,
          color: invalid ? 'var(--negative)' : 'var(--text-muted)',
        }}>{hint}</span>
      )}
    </label>
  );
}
