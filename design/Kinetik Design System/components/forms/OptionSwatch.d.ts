import * as React from 'react';

export interface OptionSwatchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** 'color' = round swatch dot; 'size'/'label' = square chip. Default 'label'. */
  kind?: 'color' | 'size' | 'label';
  /** The option value passed back to onSelect. */
  value: string;
  /** Selected state — draws an ink frame. */
  selected?: boolean;
  /** Out-of-stock — dims + struck through / crossed. */
  disabled?: boolean;
  /** CSS color for kind="color". */
  swatch?: string;
  /** Called with `value` on click. */
  onSelect?: (value: string) => void;
}

/** Product variant selector (color dot or size chip). */
export function OptionSwatch(props: OptionSwatchProps): JSX.Element;
