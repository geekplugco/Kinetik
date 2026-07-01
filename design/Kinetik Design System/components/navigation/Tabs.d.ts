import * as React from 'react';

export interface TabItem {
  id: string;
  label: string;
  /** Optional panel content rendered when active. */
  content?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  /** Controlled active id. */
  value?: string;
  /** Uncontrolled initial id. */
  defaultValue?: string;
  onChange?: (id: string) => void;
}

/** Underline tabs with an ink active marker. */
export function Tabs(props: TabsProps): JSX.Element;
