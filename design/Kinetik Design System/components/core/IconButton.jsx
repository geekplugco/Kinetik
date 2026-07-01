import React, { useState } from 'react';

const SIZES = { sm: 32, md: 40, lg: 48 };

/**
 * Square icon-only action — header utilities, card wishlist, stepper controls.
 */
export function IconButton({
  size = 'md',
  variant = 'ghost',
  bordered = false,
  active = false,
  disabled = false,
  'aria-label': ariaLabel,
  children,
  style,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const dim = SIZES[size] || SIZES.md;
  const isInverse = variant === 'inverse';

  const bg = active
    ? 'var(--accent)'
    : isInverse
      ? (hovered ? 'var(--ink-800)' : 'var(--surface-inverse)')
      : (hovered ? 'var(--surface-sunken)' : 'transparent');
  const color = active
    ? 'var(--accent-ink)'
    : isInverse ? 'var(--text-inverse)' : 'var(--text-strong)';

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: dim, height: dim,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: bg, color,
        border: bordered ? '1px solid var(--border-strong)' : '1px solid transparent',
        borderRadius: 'var(--radius-0)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--dur-fast) var(--ease-standard)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
