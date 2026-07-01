import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Default 'md' (40px). */
  size?: 'sm' | 'md' | 'lg';
  /** 'ghost' (default) or 'inverse' (ink block). */
  variant?: 'ghost' | 'inverse';
  /** Add a hairline ink border. */
  bordered?: boolean;
  /** Volt-filled active/selected state. */
  active?: boolean;
  /** Accessible label — required for icon-only controls. */
  'aria-label': string;
}

/** Square icon-only button. */
export function IconButton(props: IconButtonProps): JSX.Element;
