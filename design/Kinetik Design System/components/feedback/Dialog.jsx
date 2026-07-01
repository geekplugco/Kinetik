import React, { useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Centered modal — size guide, quick view, confirmations. Scale + opacity in.
 */
export function Dialog({ open, onClose, title, footer, width = 520, children, style, ...rest }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div aria-hidden={!open} style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      pointerEvents: open ? 'auto' : 'none',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'var(--surface-overlay)',
        opacity: open ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-standard)',
      }} />
      <div role="dialog" aria-modal="true" style={{
        position: 'relative', width: '100%', maxWidth: width,
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)', border: '1px solid var(--border-strong)',
        boxShadow: 'var(--shadow-dialog)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
        transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }} {...rest}>
        {title != null && (
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-hairline)', flex: 'none' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{title}</span>
            <button type="button" aria-label="Close" onClick={onClose} style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-strong)' }}>
              <Icon name="close" size={20} />
            </button>
          </header>
        )}
        <div style={{ padding: 'var(--space-6)', overflowY: 'auto' }}>{children}</div>
        {footer && <footer style={{ flex: 'none', borderTop: '1px solid var(--border-hairline)', padding: 'var(--space-5)' }}>{footer}</footer>}
      </div>
    </div>
  );
}
