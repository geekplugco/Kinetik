import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function RichText({ section }: SectionProps) {
  const s = section.settings;
  const align = s.content_alignment === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,48px)] pb-[var(--pb,48px)]"
    >
      <div className={`mx-auto flex max-w-[1200px] flex-col gap-4 px-6 ${align}`}>
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
    </section>
  );
}
