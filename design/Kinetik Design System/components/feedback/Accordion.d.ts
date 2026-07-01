import * as React from 'react';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Allow multiple panels open at once. Default false (single). */
  multi?: boolean;
  /** Item ids open on mount. */
  defaultOpen?: string[];
}

/** Hairline accordion with a +/− toggle. */
export function Accordion(props: AccordionProps): JSX.Element;
