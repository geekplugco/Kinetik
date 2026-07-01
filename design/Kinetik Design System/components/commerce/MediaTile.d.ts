import * as React from 'react';

export interface MediaTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. */
  src?: string;
  /** Video URL — plays muted/looped on hover (hover-to-play). */
  videoSrc?: string;
  alt?: string;
  /** CSS aspect-ratio. Default '4 / 5'. */
  ratio?: string;
  /** Placeholder caption when no media is set. */
  code?: string;
  /** 'light' (default) or 'dark' placeholder. */
  tone?: 'light' | 'dark';
  /** Apply --radius-lg corners. Default false (square). */
  rounded?: boolean;
}

/** Product media frame with hover-to-play and a branded placeholder fallback. */
export function MediaTile(props: MediaTileProps): JSX.Element;
