import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Select — styled native dropdown (sort, country, etc). Square, hairline,
 * mono label, chevron affordance.
 */
export function Select({ label, hint, options = [], size = 'md', invalid = false, style, containerStyle, id, ...rest }) {
  const pad = size === 'lg' ? '14px 40px 14px 14px' : size === 'sm' ? '8px 34px 8px 10px' : '11px 38px 11px 12px';
  const fieldId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = invalid ? 'var(--negative)' : 'var(--border-hairline)';

  return (
    <label htmlFor={fieldId} style={{ display: 'block', ...containerStyle }}>
      {label && (
        <span style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      )}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          id={fieldId}
          {...rest}
          style={{
            width: '100%', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
            padding: pad, background: 'var(--surface-card)',
            border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-0)',
            fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-strong)',
            cursor: 'pointer', outline: 'none',
            ...style,
          }}
        >
          {options.map((o) => {
            const value = typeof o === 'string' ? o : o.value;
            const labelText = typeof o === 'string' ? o : o.label;
            return <option key={value} value={value}>{labelText}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', display: 'flex' }}>
          <Icon name="chevronDown" size={16} />
        </span>
      </span>
      {hint && <span style={{ display: 'block', marginTop: 6, fontSize: 12, color: invalid ? 'var(--negative)' : 'var(--text-muted)' }}>{hint}</span>}
    </label>
  );
}
