import React, { useState, useEffect } from 'react';

/**
 * Announcement bar — the thin promo strip above the header. Single message or
 * an auto-rotating list. Ink by default; `tone="volt"` for a drop alert.
 */
export function AnnouncementBar({ messages, children, tone = 'ink', interval = 4000, style, ...rest }) {
  const list = messages && messages.length ? messages : (children != null ? [children] : []);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), interval);
    return () => clearInterval(t);
  }, [list.length, interval]);

  const pal = tone === 'volt'
    ? { background: 'var(--accent)', color: 'var(--accent-ink)' }
    : { background: 'var(--surface-inverse)', color: 'var(--text-inverse)' };

  return (
    <div
      role="status"
      style={{
        textAlign: 'center', padding: '7px 16px',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
        ...pal, ...style,
      }}
      {...rest}
    >
      {list[i]}
    </div>
  );
}
