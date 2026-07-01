import * as React from 'react';

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Font size in px. Default 24. */
  size?: number;
  /** Wordmark color. Default --text-strong. */
  color?: string;
  /** Color of the trailing full-stop. Default --accent (volt). */
  dotColor?: string;
  /** Show the volt full-stop. Default true. */
  showDot?: boolean;
}

/** The Kinetik typographic wordmark. */
export function Logo(props: LogoProps): JSX.Element;
