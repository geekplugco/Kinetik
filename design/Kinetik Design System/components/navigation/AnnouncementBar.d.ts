import * as React from 'react';

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rotating messages. Omit to use children as a single message. */
  messages?: React.ReactNode[];
  /** 'ink' (default) or 'volt'. */
  tone?: 'ink' | 'volt';
  /** Rotation interval ms. Default 4000. */
  interval?: number;
}

/** Thin promo strip above the header. */
export function AnnouncementBar(props: AnnouncementBarProps): JSX.Element;
