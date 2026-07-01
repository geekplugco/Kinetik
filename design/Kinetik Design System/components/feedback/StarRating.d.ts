import * as React from 'react';

export interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–5, fractional allowed. */
  value: number;
  /** Review count shown as "(N)". */
  count?: number;
  /** Star px size. Default 15. */
  size?: number;
  /** Show the numeric value. */
  showValue?: boolean;
  /** Star color. Default --text-strong (ink). */
  color?: string;
}

/** Read-only star rating with fractional fill. */
export function StarRating(props: StarRatingProps): JSX.Element;
