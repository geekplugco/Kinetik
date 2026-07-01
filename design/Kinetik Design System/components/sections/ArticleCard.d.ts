import * as React from 'react';

export interface ArticleCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: React.ReactNode;
  excerpt?: string;
  /** Section/category tag. */
  category?: string;
  /** e.g. "Mar 12". */
  date?: string;
  /** e.g. "4 min". */
  readTime?: string;
  author?: string;
  src?: string;
  code?: string;
  /** 'stack' (default, grid) or 'row' (featured wide). */
  layout?: 'stack' | 'row';
  onOpen?: () => void;
}

/** Blog / editorial teaser card. */
export function ArticleCard(props: ArticleCardProps): JSX.Element;
