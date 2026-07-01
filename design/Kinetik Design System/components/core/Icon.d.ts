import * as React from 'react';

export type IconName =
  | 'search' | 'bag' | 'menu' | 'close' | 'chevronDown' | 'chevronRight'
  | 'arrowRight' | 'arrowUpRight' | 'plus' | 'minus' | 'heart' | 'check'
  | 'filter' | 'user' | 'play' | 'star' | 'package' | 'trash' | 'shield';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Glyph name from the Kinetik set. */
  name: IconName;
  /** Pixel size (width & height). Default 20. */
  size?: number;
  /** Stroke weight. Default 1.75. */
  strokeWidth?: number;
}

/** 24px line icon, currentColor stroke. Inherits text color. */
export function Icon(props: IconProps): JSX.Element;

export const ICON_NAMES: IconName[];
