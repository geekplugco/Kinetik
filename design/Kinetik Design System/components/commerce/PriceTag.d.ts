import * as React from 'react';

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current price (number). */
  price: number;
  /** Original price — struck through when higher than `price`. */
  compareAt?: number;
  /** ISO currency. Default 'USD'. */
  currency?: string;
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Default 'left'. */
  align?: 'left' | 'right';
}

/** Mono price block with optional compare-at. */
export function PriceTag(props: PriceTagProps): JSX.Element;
