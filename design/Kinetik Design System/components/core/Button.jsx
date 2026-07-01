import React, { useState } from 'react';

const SIZES = {
  sm: { padding: '8px 14px', fontSize: 12, gap: 6, icon: 15 },
  md: { padding: '12px 20px', fontSize: 13, gap: 8, icon: 17 },
  lg: { padding: '16px 28px', fontSize: 15, gap: 10, icon: 19 },
};

function palette(variant, hovered, pressed) {
  switch (variant) {
    case 'primary': // volt — conversion
      return {
        background: pressed ? 'var(--accent-press)' : hovered ? 'var(--accent-hover)' : 'var(--accent)',
        color: 'var(--accent-ink)',
        border: '1px solid transparent',
      };
    case 'inverse': // ink block
      return {
        background: pressed ? 'var(--ink-700)' : hovered ? 'var(--ink-800)' : 'var(--surface-inverse)',
        color: 'var(--text-inverse)',
        border: '1px solid var(--surface-inverse)',
      };
    case 'ghost':
      return {
        background: hovered ? 'var(--surface-sunken)' : 'transparent',
        color: 'var(--text-strong)',
        border: '1px solid transparent',
      };
    case 'secondary': // hairline outline
    default:
      return {
        background: hovered ? 'var(--surface-sunken)' : 'transparent',
        color: 'var(--text-strong)',
        border: '1px solid var(--border-strong)',
      };
  }
}

/**
 * Kinetik button. Square by default, display type, uppercase tracked label.
 * Primary = volt and is reserved for the page's main conversion action.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  iconLeft,
  iconRight,
  block = false,
  uppercase = true,
  disabled = false,
  children,
  style,
  onMouseEnter, onMouseLeave, onMouseDown, onMouseUp,
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const s = SIZES[size] || SIZES.md;
  const pal = palette(variant, hovered && !disabled, pressed && !disabled);

  return (
    <button
      disabled={disabled}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); setPressed(false); onMouseLeave?.(e); }}
      onMouseDown={(e) => { setPressed(true); onMouseDown?.(e); }}
      onMouseUp={(e) => { setPressed(false); onMouseUp?.(e); }}
      style={{
        display: block ? 'flex' : 'inline-flex',
        width: block ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: s.fontSize,
        letterSpacing: uppercase ? '0.06em' : '-0.01em',
        textTransform: uppercase ? 'uppercase' : 'none',
        lineHeight: 1,
        borderRadius: 'var(--radius-0)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-out)',
        ...pal,
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
