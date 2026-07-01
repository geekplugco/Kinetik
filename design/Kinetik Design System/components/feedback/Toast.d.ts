import * as React from 'react';
import type { IconName } from '../core/Icon';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  message: React.ReactNode;
  /** Optional inline action e.g. { label: 'View Cart', onClick }. */
  action?: { label: string; onClick: () => void };
  /** Leading icon, shown in a volt chip. Default 'check'. */
  icon?: IconName | null;
  /** Auto-dismiss ms; 0 disables. Default 3000. */
  duration?: number;
  /** 'bottom' (default) or 'top'. */
  position?: 'bottom' | 'top';
}

/** Transient confirmation toast. */
export function Toast(props: ToastProps): JSX.Element;
