import * as React from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  /** Header title — omit for chromeless. */
  title?: React.ReactNode;
  /** Pinned footer (actions). */
  footer?: React.ReactNode;
  /** Max width px. Default 520. */
  width?: number;
}

/** Centered modal for size guide, quick view, confirmations. */
export function Dialog(props: DialogProps): JSX.Element;
