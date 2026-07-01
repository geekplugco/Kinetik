import * as React from 'react';

export interface DrawerProps extends React.HTMLAttributes<HTMLElement> {
  /** Visibility. */
  open: boolean;
  /** Called on overlay click, close button, or Escape. */
  onClose?: () => void;
  /** Anchor edge. Default 'right'. */
  side?: 'right' | 'left';
  /** Max panel width in px. Default 420. */
  width?: number;
  /** Header title — omit for a chromeless panel. */
  title?: React.ReactNode;
  /** Pinned footer (totals, checkout CTA). */
  footer?: React.ReactNode;
}

/** Slide-in overlay panel — cart, filters, mobile menu. */
export function Drawer(props: DrawerProps): JSX.Element;
