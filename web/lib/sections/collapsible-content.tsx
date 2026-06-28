"use client";

import { useState } from "react";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

export function CollapsibleContent({ section }: SectionProps) {
  const items = section.blocks.filter((b) => b.type === "item");
  const [open, setOpen] = useState(0);
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle({ padding_top: 64, padding_bottom: 64, ...section.settings })} className="bg-surface-page pt-[var(--pt,64px)] pb-[var(--pb,64px)]">
      <div className="mx-auto max-w-[760px] px-6">
        {typeof section.settings.heading === "string" && section.settings.heading && (
          <h2 className="mb-8 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{section.settings.heading}</h2>
        )}
        <div className="divide-y divide-border-hairline border-y border-border-hairline">
          {items.map((b, i) => (
            <div key={b.id}>
              <button type="button" onClick={() => setOpen((o) => (o === i ? -1 : i))} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                <span className="font-sans text-h4 text-text-strong">{(b.settings.heading as string) ?? "Question"}</span>
                <Icon name={open === i ? "close" : "arrow"} className={open === i ? "" : "rotate-90"} />
              </button>
              {open === i && typeof b.settings.content === "string" && (
                <div className="pb-5 text-body text-text-body" dangerouslySetInnerHTML={{ __html: b.settings.content }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
