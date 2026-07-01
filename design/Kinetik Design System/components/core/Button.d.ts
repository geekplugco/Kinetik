import * as React from 'react';

/**
 * Primary action button — volt, the conversion color. One per view.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual role. `primary` = volt CTA (use sparingly). Default 'secondary'. */
  variant?: 'primary' | 'secondary' | 'inverse' | 'ghost';
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Element rendered before the label (e.g. <Icon/>). */
  iconLeft?: React.ReactNode;
  /** Element rendered after the label. */
  iconRight?: React.ReactNode;
  /** Stretch to full container width. */
  block?: boolean;
  /** Uppercase tracked label. Default true. */
  uppercase?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps): JSX.Element;
