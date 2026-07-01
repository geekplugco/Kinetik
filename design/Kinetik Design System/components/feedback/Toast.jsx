import React, { useEffect } from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Toast — transient confirmation ("Added to cart"). Self-positions bottom-center.
 * Auto-dismisses after `duration` (0 to disable).
 */
export function Toast({ open, onClose, message, action, icon = 'check', duration = 3000, position = 'bottom', style, ...rest }) {
  useEffect(() => {
    if (!open || !duration) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  const hiddenY = position === 'top' ? '-16px' : '16px';

  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, [position]: 24, zIndex: 1200,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 16px',
    }}>
      <div role="status" style={{
        pointerEvents: 'auto',
        display: 'inline-flex', alignItems: 'center', gap: 12,
        background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
        border: '1px solid var(--surface-inverse)',
        padding: '12px 14px 12px 16px',
        boxShadow: 'var(--shadow-dialog)',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : `translateY(${hiddenY})`,
        transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
        ...style,
      }} {...rest}>
        {icon && (
          <span style={{ display: 'flex', width: 22, height: 22, alignItems: 'center', justifyContent: 'center', background: 'var(--accent)', color: 'var(--accent-ink)', borderRadius: 'var(--radius-pill)' }}>
            <Icon name={icon} size={14} strokeWidth={2.25} />
          </span>
        )}
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500 }}>{message}</span>
        {action && (
          <button onClick={action.onClick} style={{
            marginLeft: 4, background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--volt-500)',
          }}>{action.label}</button>
        )}
        <button aria-label="Dismiss" onClick={onClose} style={{ display: 'flex', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-400)', padding: 0 }}>
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  );
}
