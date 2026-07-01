"use client";

import { useState } from "react";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

const WIDTH: Record<string, string> = {
  narrow: "max-w-[760px]",
  wide: "max-w-[960px]",
  page: "max-w-[var(--page-width)]",
};

export function CollapsibleContent({ section }: SectionProps) {
  const s = section.settings;
  const items = section.blocks.filter((b) => b.type === "item");
  const openDefault = (s.open_first as boolean) === false ? -1 : 0;
  const [open, setOpen] = useState(openDefault);
  const width = WIDTH[(s.width as string) ?? "narrow"] ?? WIDTH.narrow;
  const layout = (s.layout as string) ?? "stacked";
  const rowStyle = (s.row_style as string) ?? "divided";
  const split = layout === "split";
  const dark = (s.color_scheme as string) === "scheme-3" || (s.color_scheme as string) === "scheme-dark";
  const listClass =
    rowStyle === "boxed"
      ? "space-y-3"
      : rowStyle === "plain"
        ? "divide-y divide-border-hairline"
        : "divide-y divide-border-hairline border-y border-border-hairline";
  const itemPad = rowStyle === "boxed" ? "border border-border-hairline px-5" : "";
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className={`${dark ? "theme-dark " : ""}bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]`}>
      <div className={`mx-auto ${width} px-6 ${split ? "lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12" : ""}`}>
        <div className={split ? "lg:pt-2" : ""}>
          {typeof s.subheading === "string" && s.subheading && (
            <p className="mb-3 font-mono text-xs uppercase tracking-label text-text-muted">{s.subheading}</p>
          )}
          {typeof s.heading === "string" && s.heading && (
            <h2 className="mb-8 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{s.heading}</h2>
          )}
        </div>
        <div className={listClass}>
          {items.map((b, i) => (
            <div key={b.id} className={itemPad}>
              <button type="button" onClick={() => setOpen((o) => (o === i ? -1 : i))} aria-expanded={open === i} className="flex min-h-[44px] w-full items-center justify-between gap-4 py-5 text-left">
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
