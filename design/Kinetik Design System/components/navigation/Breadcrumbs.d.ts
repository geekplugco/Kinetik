import * as React from 'react';

export type Crumb = string | { label: string; href?: string };

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Trail, root first. Last is the current page. */
  items: Crumb[];
  /** Called with (crumb, index) when a non-last crumb is clicked. */
  onNavigate?: (crumb: Crumb, index: number) => void;
}

/** Mono chevron-separated breadcrumb trail. */
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
