import * as React from 'react';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options: SelectOption[];
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  containerStyle?: React.CSSProperties;
}

/** Styled native select with chevron. */
export function Select(props: SelectProps): JSX.Element;
