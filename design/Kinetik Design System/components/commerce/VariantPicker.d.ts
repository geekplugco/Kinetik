import * as React from 'react';
import type { ColorOption } from './ProductCard';

export interface VariantValue {
  color?: string;
  size?: string;
}

export interface VariantPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  colors?: ColorOption[];
  sizes?: string[];
  /** Sold-out combos as `"${color}|${size}"`; use `"${color}|*"` for a whole color. */
  unavailable?: string[];
  /** Current selection. */
  value?: VariantValue;
  onChange?: (value: VariantValue) => void;
  /** Show a Size Guide link beside the size label. */
  onGuide?: () => void;
}

/** Color × size variant picker with a live availability matrix. */
export function VariantPicker(props: VariantPickerProps): JSX.Element;

/** Helper: is a color+size combo sold out for the given `unavailable` list? */
export function isUnavailable(unavailable: string[] | undefined, color?: string, size?: string): boolean;
