import * as React from 'react';

export interface CollectionCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  name: string;
  /** Item count badge. */
  count?: number;
  src?: string;
  code?: string;
  /** CSS aspect-ratio. Default '4 / 5'. */
  ratio?: string;
  onOpen?: () => void;
}

/** Collection tile with overlaid label + count. */
export function CollectionCard(props: CollectionCardProps): JSX.Element;
