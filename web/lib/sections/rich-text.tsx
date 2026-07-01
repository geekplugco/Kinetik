import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

const widthClass: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-3xl",
};

export function RichText({ section }: SectionProps) {
  const s = section.settings;
  const centered = s.content_alignment === "center";
  const align = centered ? "items-center text-center" : "items-start text-left";
  const width = widthClass[(s.width as string) ?? "page"] ?? widthClass.page;
  const dark = s.style === "panel";
  const accentRule = s.style === "accent-rule";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className="mx-auto px-6">
        <div
          className={`mx-auto flex flex-col gap-4 ${width} ${align} ${dark ? "theme-dark rounded-sm bg-surface-page p-8 md:p-14" : ""} ${accentRule ? "border-l-2 border-accent pl-6 md:pl-8" : ""}`}
        >
          {typeof s.subheading === "string" && s.subheading && (
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{s.subheading}</span>
          )}
          {typeof s.heading === "string" && s.heading && (
            <h2 className="font-display text-h1 tracking-tight text-text-strong">{s.heading}</h2>
          )}
          {typeof s.text === "string" && s.text && (
            <div className="max-w-prose text-body-lg text-text-body" dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
        </div>
      </div>
    </section>
  );
}
