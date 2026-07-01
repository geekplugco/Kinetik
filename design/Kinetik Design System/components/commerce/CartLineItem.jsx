import React from 'react';
import { MediaTile } from './MediaTile.jsx';
import { QuantityStepper } from '../forms/QuantityStepper.jsx';
import { PriceTag } from './PriceTag.jsx';
import { Icon } from '../core/Icon.jsx';

/**
 * Cart line item — thumb, meta, stepper, price, remove. For the smart drawer.
 */
export function CartLineItem({
  name,
  variant,
  price,
  compareAt,
  qty = 1,
  src,
  code,
  onQty,
  onRemove,
  style,
  ...rest
}) {
  return (
    <div
      style={{
        display: 'flex', gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: '1px solid var(--border-hairline)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ width: 72, flex: 'none' }}>
        <MediaTile src={src} code={code || name} ratio="4 / 5" />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <h4 style={{ fontSize: 14, lineHeight: 1.2 }}>{name}</h4>
          <button type="button" aria-label="Remove" onClick={onRemove} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-faint)',
            padding: 0, height: 18, flex: 'none',
          }}>
            <Icon name="close" size={16} />
          </button>
        </div>
        {variant && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{variant}</span>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: 8 }}>
          <QuantityStepper value={qty} size="sm" onChange={onQty} />
          <PriceTag price={price * qty} compareAt={compareAt != null ? compareAt * qty : undefined} size="sm" align="right" />
        </div>
      </div>
    </div>
  );
}
