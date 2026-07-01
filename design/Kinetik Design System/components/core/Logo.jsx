import React from 'react';

/**
 * Kinetik wordmark — typographic, Space Grotesk, tight tracking,
 * with the signature volt full-stop.
 */
export function Logo({ size = 24, color, dotColor = 'var(--accent)', showDot = true, className = '', style, ...rest }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: color || 'var(--text-strong)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      KINETIK{showDot && <span style={{ color: dotColor }}>.</span>}
    </span>
  );
}
