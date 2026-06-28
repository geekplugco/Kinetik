"use client";

import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Localization } from "@/components/Localization";

export function AnnouncementBar({ section }: SectionProps) {
  const messages = section.blocks.filter((b) => b.type === "message");
  const items = messages.length ? messages : [{ id: "default", type: "message", settings: { text: "Free shipping on orders over $50" } }];
  const showLoc = section.settings.show_localization === true;
  return (
    <div
      role="region"
      aria-label="Announcement"
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-2"}
      style={sectionStyle(section.settings)}
      className="bg-ink-950 text-paper"
    >
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-between gap-6 px-6 py-2">
        {showLoc ? <span className="hidden w-32 md:block" /> : null}
        <div className="flex flex-1 items-center justify-center gap-6">
          {items.map((b) => (
            <span key={b.id} className="font-mono text-xs uppercase tracking-label">{(b.settings.text as string) ?? ""}</span>
          ))}
        </div>
        {showLoc ? <div className="hidden md:flex"><Localization /></div> : null}
      </div>
    </div>
  );
}
