"use client";

import { useEffect, useState } from "react";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Localization } from "@/components/Localization";

const aligns: Record<string, string> = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

export function AnnouncementBar({ section }: SectionProps) {
  const s = section.settings;
  const messages = section.blocks.filter((b) => b.type === "message");
  const items = messages.length ? messages : [{ id: "default", type: "message", settings: { text: "Free shipping on orders over $50" } }];
  const showLoc = s.show_localization === true;
  const rotate = (s.display as string) === "rotate" && items.length > 1;
  const delay = typeof s.rotate_speed === "number" ? s.rotate_speed * 1000 : 4000;
  const alignClass = aligns[(s.text_alignment as string) ?? "center"] ?? aligns.center;
  const full = (s.width as string) === "full";

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!rotate) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), delay);
    return () => window.clearInterval(t);
  }, [rotate, delay, items.length]);

  const renderMessage = (b: { id: string; settings: Record<string, unknown> }) => {
    const text = (b.settings.text as string) ?? "";
    const link = typeof b.settings.link === "string" ? (b.settings.link as string) : "";
    const label = <span className="font-mono text-xs uppercase tracking-label">{text}</span>;
    return link ? (
      <a key={b.id} href={link} className="inline-flex min-h-[44px] items-center transition-opacity hover:opacity-70">{label}</a>
    ) : (
      <span key={b.id} className="inline-flex min-h-[44px] items-center">{label}</span>
    );
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      data-color-scheme={(s.color_scheme as string) ?? "scheme-2"}
      style={sectionStyle(s)}
      className="bg-ink-950 pb-[var(--pb,0.5rem)] pt-[var(--pt,0.5rem)] text-paper"
    >
      <div className={`mx-auto flex items-center justify-between gap-6 px-6 ${full ? "max-w-none" : "max-w-[var(--page-width)]"}`}>
        {showLoc ? <span className="hidden w-32 md:block" /> : null}
        <div className={`flex flex-1 items-center gap-6 ${alignClass}`}>
          {rotate ? renderMessage(items[index]) : items.map((b) => renderMessage(b))}
        </div>
        {showLoc ? <div className="hidden md:flex"><Localization /></div> : null}
      </div>
    </div>
  );
}
