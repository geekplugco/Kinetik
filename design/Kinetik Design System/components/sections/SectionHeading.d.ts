import * as React from 'react';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mono uppercase eyebrow. */
  eyebrow?: string;
  title: React.ReactNode;
  /** Trailing link, e.g. { label: 'View All', onClick }. */
  action?: { label: string; onClick?: () => void };
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
}

/** Eyebrow + oversized title lead-in for page sections. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
