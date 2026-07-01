import * as React from 'react';

export interface ShippingBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current cart subtotal. */
  current: number;
  /** Free-shipping threshold. Default 200. */
  threshold?: number;
  currency?: string;
}

/** Free-shipping progress nudge for the cart drawer. */
export function ShippingBar(props: ShippingBarProps): JSX.Element;
