import React from 'react';

/**
 * Kinetik icon set — Lucide-style 24px line glyphs.
 * Stroke 1.75, round joins, currentColor. No fills except solid `play`.
 * Substitution note: these are Lucide-derived (ISC) paths, redrawn inline so
 * the system ships zero runtime icon dependency.
 */
const PATHS = {
  search:      '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bag:         '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  menu:        '<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>',
  close:       '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight:'<path d="m9 18 6-6-6-6"/>',
  arrowRight:  '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  plus:        '<path d="M5 12h14"/><path d="M12 5v14"/>',
  minus:       '<path d="M5 12h14"/>',
  heart:       '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
  check:       '<path d="M20 6 9 17l-5-5"/>',
  filter:      '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z"/>',
  user:        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  play:        '<path d="M6 3 20 12 6 21V3Z" fill="currentColor" stroke="none"/>',
  star:        '<path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2Z"/>',
  package:     '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  trash:       '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  shield:      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
};

export function Icon({ name, size = 20, strokeWidth = 1.75, className = '', style, ...rest }) {
  const inner = PATHS[name] || '';
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'block', flex: 'none', ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
}

/** Names available in the Kinetik icon set. */
export const ICON_NAMES = Object.keys(PATHS);
