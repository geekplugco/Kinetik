"use client";

import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

const widthMap: Record<string, string> = {
  narrow: "max-w-2xl",
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
};

export function Newsletter({ section }: SectionProps) {
  const s = section.settings;
  const layout = (s.layout as string) ?? "centered";
  const width = widthMap[(s.width as string) ?? "narrow"] ?? widthMap.narrow;
  const dark = ((s.background_style as string) ?? "dark") === "dark";
  const split = layout === "split";

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-inverse"}
      style={sectionStyle(s)}
      className={`pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))] ${dark ? "bg-ink-950 text-paper" : "bg-surface-page text-text-strong"}`}
    >
      <div
        className={`mx-auto ${width} px-6 ${
          split
            ? "flex flex-col gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left"
            : "flex flex-col items-center gap-5 text-center"
        }`}
      >
        <div className={`flex flex-col gap-3 ${split ? "md:max-w-md" : "items-center"}`}>
          {typeof s.subheading === "string" && s.subheading && (
            <span className={`font-mono text-xs uppercase tracking-label ${dark ? "text-paper/60" : "text-text-muted"}`}>{s.subheading}</span>
          )}
          <h2 className="font-display text-h1 tracking-tight">{(s.heading as string) ?? "Join the movement"}</h2>
          {typeof s.text === "string" && s.text && (
            <div className={`text-body-lg [&_p]:m-0 ${dark ? "text-paper/70" : "text-text-muted"}`} dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
        </div>
        <form className={`mt-2 flex w-full max-w-md gap-2 ${split ? "md:mt-0 md:shrink-0" : ""}`} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder={(s.input_placeholder as string) ?? "Email address"}
            aria-label="Email address"
            className={`min-h-[44px] min-w-0 flex-1 border bg-transparent px-4 py-3 font-mono text-sm ${dark ? "border-paper/40 text-paper placeholder:text-paper/50" : "border-border-strong text-text-strong placeholder:text-text-faint"}`}
          />
          <Button type="submit">{(s.button_label as string) ?? "Subscribe"}</Button>
        </form>
      </div>
    </section>
  );
}
