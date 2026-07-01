"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

const pad = (n: number) => String(n).padStart(2, "0");

const DEFAULT_TICKER = [
  "A. Mercer just bought Shell-01 Hardshell",
  "14 people viewing Cargo Tech Pant",
  "Only 3 left — Field Monitors",
  "S. Haddad just bought Trail Runner XS",
  "Restocked — Utility Vest 6P",
  "9 people viewing Sling 4L",
];

export function DropSystem({ section }: SectionProps) {
  const s = section.settings;
  const target = useMemo(() => new Date((s.target_date as string) ?? "2026-07-15T10:00:00").getTime(), [s.target_date]);
  const [now, setNow] = useState<number | null>(null);
  const [joined, setJoined] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  const diff = now != null ? Math.max(0, target - now) : null;
  const live = now != null && diff === 0;
  const d = diff != null ? Math.floor(diff / 86400000) : 0;
  const h = diff != null ? Math.floor(diff / 3600000) % 24 : 0;
  const m = diff != null ? Math.floor(diff / 60000) % 60 : 0;
  const sec = diff != null ? Math.floor(diff / 1000) % 60 : 0;

  const units: [string, number][] = [["Days", d], ["Hrs", h], ["Min", m], ["Sec", sec]];
  const ticker = DEFAULT_TICKER;
  const showTicker = s.show_ticker !== false;

  return (
    <section
      className="theme-dark bg-surface-page text-text-body"
      data-color-scheme={(s.color_scheme as string) ?? "scheme-3"}
      style={sectionStyle(s)}
    >
      <div className="mx-auto max-w-[var(--page-width)] px-6 pt-[var(--pt,clamp(3.5rem,6vw,5rem))] pb-[var(--pb,clamp(3.5rem,6vw,5rem))]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-label text-accent">{(s.kicker as string) ?? "Next drop"}</span>
            <h2 className="mt-3 font-display text-display-2 uppercase text-text-strong">{(s.heading as string) ?? "Drop 05 · Field System"}</h2>
            {typeof s.text === "string" && s.text && (
              <div className="mt-4 max-w-md text-body text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.text }} />
            )}
          </div>

          <div className="flex flex-col gap-6">
            {live ? (
              <div className="flex items-center gap-3 font-display text-h1 uppercase text-text-strong">
                <span className="h-3 w-3 animate-pulse rounded-full bg-accent" /> Live now
              </div>
            ) : (
              <div className="flex gap-3" aria-label="Time until drop">
                {units.map(([label, val]) => (
                  <div key={label} className="flex min-w-[4.5rem] flex-1 flex-col items-center border border-border-hairline py-3">
                    <span className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tabular-nums leading-none text-text-strong">{now != null ? pad(val) : "--"}</span>
                    <span className="mt-2 font-mono text-[10px] uppercase tracking-label text-text-muted">{label}</span>
                  </div>
                ))}
              </div>
            )}

            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
            >
              <label htmlFor="drop-email" className="sr-only">Email</label>
              {joined ? (
                <p className="flex items-center gap-2 border border-accent px-4 py-3 font-mono text-xs uppercase tracking-label text-text-strong">
                  <Icon name="arrow" size={14} className="text-accent" /> You&rsquo;re on the list — we&rsquo;ll ping you at drop.
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    id="drop-email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="min-w-0 flex-1 border border-border-strong bg-transparent px-4 py-3 font-mono text-sm text-text-strong outline-none placeholder:text-text-muted focus-visible:border-accent"
                  />
                  <Button type="submit" size="md">{(s.button_label as string) ?? "Notify me"}</Button>
                </div>
              )}
              <p className="font-mono text-[11px] text-text-muted">Early access + restock alerts. No noise.</p>
            </form>
          </div>
        </div>

        {showTicker && (
          <div className="mt-10 flex items-center gap-3 border-t border-border-hairline pt-5">
            <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-label text-text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" /> Live
            </span>
            <p key={tick} className="hp-reveal hp-reveal--fade is-in truncate font-mono text-xs text-text-body">
              {ticker[tick % ticker.length]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
