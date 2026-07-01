import * as React from 'react';
import type { IconName } from '../core/Icon';

export interface TrustItem {
  icon: IconName;
  label: string;
}

export interface TrustBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reassurance signals. Defaults to shipping / security / returns / warranty. */
  items?: TrustItem[];
  /** Grid columns. Defaults to item count. */
  columns?: number;
}

/** Row of trust signals — hairline cells, mono labels. */
export function TrustBar(props: TrustBarProps): JSX.Element;
