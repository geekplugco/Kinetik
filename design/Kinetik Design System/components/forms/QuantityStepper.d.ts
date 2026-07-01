import * as React from 'react';

export interface QuantityStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current quantity. */
  value?: number;
  /** Default 1. */
  min?: number;
  /** Default 99. */
  max?: number;
  /** Called with the next value. */
  onChange?: (value: number) => void;
  /** Default 'md'. */
  size?: 'sm' | 'md';
}

/** −/＋ quantity control with mono readout. */
export function QuantityStepper(props: QuantityStepperProps): JSX.Element;
