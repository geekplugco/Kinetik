import React, { useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Slide-in panel (cart, filters, menu). Transform + opacity only for 60fps.
 * Renders an overlay + a panel anchored to `side`.
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  width = 420,
  title,
  footer,
  children,
  style,
  ...rest
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const hidden = side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  return (
    <div aria-hidden={!open} style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: open ? 'auto' : 'none' }}>
      {/* overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, background: 'var(--surface-overlay)',
          opacity: open ? 1 : 0,
          transition: 'opacity var(--dur-base) var(--ease-standard)',
        }}
      />
      {/* panel */}
      <aside
        role="dialog" aria-modal="true"
        style={{
          position: 'absolute', top: 0, bottom: 0, [side]: 0,
          width: '100%', maxWidth: width,
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface-card)',
          boxShadow: 'var(--shadow-drawer)',
          transform: open ? 'translateX(0)' : hidden,
          transition: 'transform var(--dur-slow) var(--ease-out)',
          ...style,
        }}
        {...rest}
      >
        {title != null && (
          <header style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-hairline)', flex: 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>{title}</span>
            <button type="button" aria-label="Close" onClick={onClose} style={{
              width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-strong)',
            }}>
              <Icon name="close" size={20} />
            </button>
          </header>
        )}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>{children}</div>
        {footer && (
          <footer style={{ flex: 'none', borderTop: '1px solid var(--border-hairline)', padding: 'var(--space-5)' }}>{footer}</footer>
        )}
      </aside>
    </div>
  );
}
