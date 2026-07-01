import React, { useState } from 'react';

/**
 * Tabs — underline-style, ink active marker. Controlled or uncontrolled.
 * Use for PDP detail panels (Description / Specs / Shipping) or collection views.
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, children, style, ...rest }) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = (id) => { if (value === undefined) setInternal(id); onChange?.(id); };
  const current = tabs.find((t) => t.id === active);

  return (
    <div style={style} {...rest}>
      <div role="tablist" style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-hairline)' }}>
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id} role="tab" aria-selected={on}
              onClick={() => select(t.id)}
              style={{
                position: 'relative', background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '12px 18px',
                fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                boxShadow: on ? 'inset 0 -2px 0 0 var(--border-strong)' : 'none',
                transition: 'color var(--dur-fast) var(--ease-standard)',
              }}
            >{t.label}</button>
          );
        })}
      </div>
      {(current?.content || children) && (
        <div role="tabpanel" style={{ padding: 'var(--space-5) 0' }}>
          {current?.content ?? children}
        </div>
      )}
    </div>
  );
}
