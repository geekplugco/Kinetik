import React from 'react';
import { OptionSwatch } from '../forms/OptionSwatch.jsx';

/** Is this color+size combination sold out? Supports `${color}|*` for a whole color. */
export function isUnavailable(unavailable, color, size) {
  if (!unavailable) return false;
  return unavailable.includes(`${color}|${size}`) || unavailable.includes(`${color}|*`);
}
/**
 * Variant picker — color × size with a live availability matrix. Selecting a
 * color re-evaluates which sizes are in stock; out-of-stock sizes strike through.
 * Controlled: owns no state, drives selection through `value` / `onChange`.
 */
export function VariantPicker({
  colors = [],
  sizes = [],
  unavailable = [],
  value = {},
  onChange,
  onGuide,
  style,
  ...rest
}) {
  const { color, size } = value;
  const set = (patch) => onChange?.({ ...value, ...patch });
  const hasSizes = sizes.length > 0 && !(sizes.length === 1 && /one size/i.test(sizes[0]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, ...style }} {...rest}>
      {colors.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Colorway</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{color || '—'}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {colors.map((c) => {
              const fullyOut = unavailable.includes(`${c.name}|*`) || (sizes.length > 0 && sizes.every((s) => isUnavailable(unavailable, c.name, s)));
              return (
                <OptionSwatch key={c.name} kind="color" value={c.name} swatch={c.swatch}
                  selected={color === c.name} disabled={fullyOut}
                  onSelect={(v) => set({ color: v })} />
              );
            })}
          </div>
        </div>
      )}

      {hasSizes && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Size{size ? ` · ${size}` : ''}</span>
            {onGuide && (
              <a onClick={onGuide} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-strong)', cursor: 'pointer', textDecoration: 'underline' }}>Size Guide</a>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sizes.map((s) => (
              <OptionSwatch key={s} kind="size" value={s}
                selected={size === s} disabled={isUnavailable(unavailable, color, s)}
                onSelect={(v) => set({ size: v })} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Expose the helper on the (capitalized) component so DS-namespace consumers
// can reach it — lowercase exports aren't attached to window.<Namespace>.
VariantPicker.isUnavailable = isUnavailable;
