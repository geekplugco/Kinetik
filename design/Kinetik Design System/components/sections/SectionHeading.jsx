import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Section heading — mono eyebrow + oversized display title + optional action.
 * The standard lead-in for any homepage / editorial section.
 */
export function SectionHeading({ eyebrow, title, action, align = 'left', size = 'md', style, ...rest }) {
  const fs = size === 'lg' ? 'clamp(2rem, 4vw, 3.25rem)' : size === 'sm' ? 24 : 32;
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: align === 'center' ? 'center' : 'space-between',
      gap: 24, flexWrap: 'wrap', textAlign: align === 'center' ? 'center' : 'left', ...style,
    }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {eyebrow && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{eyebrow}</span>
        )}
        <h2 style={{ fontSize: fs, lineHeight: 1.0, letterSpacing: '-0.03em', margin: 0 }}>{title}</h2>
      </div>
      {action && (
        <a onClick={action.onClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>
          {action.label} <Icon name="arrowRight" size={15} />
        </a>
      )}
    </div>
  );
}
