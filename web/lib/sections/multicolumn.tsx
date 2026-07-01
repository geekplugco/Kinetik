import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function Multicolumn({ section }: SectionProps) {
  const s = section.settings;
  const columns = section.blocks.filter((b) => b.type === "column");
  const kicker = (s.subheading as string) ?? "The system";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="border-y border-border-hairline bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className="mx-auto grid max-w-[var(--page-width)] gap-x-12 gap-y-10 px-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">{kicker}</span>
          {typeof s.heading === "string" && s.heading && (
            <h2 className="mt-4 font-display text-display-2 uppercase text-text-strong">{s.heading}</h2>
          )}
          {typeof s.text === "string" && s.text && (
            <div className="mt-5 max-w-sm text-body-lg leading-snug text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
        </div>

        <ol className="flex flex-col">
          {columns.map((b, i) => (
            <li
              key={b.id}
              className="grid grid-cols-[2.5rem_1fr] gap-x-5 gap-y-2 border-t border-border-hairline py-6 first:border-t-0 first:pt-0 md:grid-cols-[3rem_1fr] md:py-7"
            >
              <span className="font-mono text-sm tabular-nums text-text-muted md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-h3 text-text-strong">{(b.settings.title as string) ?? ""}</h3>
              {typeof b.settings.text === "string" && b.settings.text && (
                <div className="col-start-2 max-w-md text-body leading-relaxed text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: b.settings.text }} />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
