import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 'sale' = volt, 'solid' = ink block, 'outline' = hairline (default), 'muted' = soft fill. */
  tone?: 'sale' | 'solid' | 'outline' | 'muted';
  /** 'square' (default) or 'pill'. */
  shape?: 'square' | 'pill';
}

/** Mono uppercase tag/badge. */
export function Tag(props: TagProps): JSX.Element;
