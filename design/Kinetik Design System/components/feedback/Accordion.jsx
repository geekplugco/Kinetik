import React, { useState } from 'react';

/**
 * Accordion — hairline rows with a +/− toggle. For PDP details, FAQ, shipping.
 * Single-open by default; set `multi` to allow several.
 */
export function Accordion({ items = [], multi = false, defaultOpen = [], style, ...rest }) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(multi ? prev : []);
      if (prev.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ borderTop: '1px solid var(--border-hairline)', ...style }} {...rest}>
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <div key={it.id} style={{ borderBottom: '1px solid var(--border-hairline)' }}>
            <button
              aria-expanded={isOpen}
              onClick={() => toggle(it.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: '16px 0',
                fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em',
                color: 'var(--text-strong)',
              }}
            >
              {it.title}
              <span style={{ position: 'relative', width: 14, height: 14, flex: 'none' }}>
                <span style={{ position: 'absolute', top: 6, left: 0, width: 14, height: 2, background: 'var(--text-strong)' }} />
                <span style={{
                  position: 'absolute', top: 0, left: 6, width: 2, height: 14, background: 'var(--text-strong)',
                  transform: isOpen ? 'scaleY(0)' : 'scaleY(1)', transformOrigin: 'center',
                  transition: 'transform var(--dur-fast) var(--ease-out)',
                }} />
              </span>
            </button>
            <div style={{
              overflow: 'hidden', display: 'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows var(--dur-base) var(--ease-out)',
            }}>
              <div style={{ minHeight: 0 }}>
                <div style={{ padding: '0 0 18px', fontSize: 14, lineHeight: 1.6, color: 'var(--text-body)' }}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
