import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Mono uppercase label above the field. */
  label?: string;
  /** Helper / error text below. */
  hint?: string;
  /** Leading icon node. */
  iconLeft?: React.ReactNode;
  /** Error styling. */
  invalid?: boolean;
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  containerStyle?: React.CSSProperties;
}

/** Square hairline text input. */
export function Input(props: InputProps): JSX.Element;
