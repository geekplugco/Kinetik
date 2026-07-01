import * as React from 'react';

export interface CartLineItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onQty'> {
  name: string;
  /** e.g. "Volt · M". */
  variant?: string;
  /** Unit price. */
  price: number;
  /** Unit compare-at. */
  compareAt?: number;
  qty?: number;
  src?: string;
  code?: string;
  /** Called with next qty. */
  onQty?: (qty: number) => void;
  onRemove?: () => void;
}

/** Cart drawer line item — thumb, stepper, line total, remove. */
export function CartLineItem(props: CartLineItemProps): JSX.Element;
