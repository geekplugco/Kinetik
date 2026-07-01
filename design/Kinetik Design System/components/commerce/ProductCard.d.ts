import * as React from 'react';

export interface ColorOption {
  name: string;
  /** CSS color for the dot. */
  swatch: string;
}

/**
 * Storefront product card with hover-to-play media and a volt Add-to-Cart reveal.
 */
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  /** Mono category eyebrow. */
  category?: string;
  price: number;
  /** Original price — drives the sale flag + struck price. */
  compareAt?: number;
  /** Color dots shown under the price. */
  colors?: ColorOption[];
  /** Still image URL. */
  src?: string;
  /** Hover-to-play video URL. */
  videoSrc?: string;
  /** Placeholder caption when no media. */
  code?: string;
  /** Corner flag e.g. "New Drop". */
  badge?: string;
  /** Wishlist filled state. */
  wished?: boolean;
  onAdd?: () => void;
  onWishlist?: () => void;
  onOpen?: () => void;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
