import * as React from 'react';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page (1-based). */
  page: number;
  /** Total page count. */
  total: number;
  onChange?: (page: number) => void;
}

/** Square numbered pagination with prev/next. */
export function Pagination(props: PaginationProps): JSX.Element;
