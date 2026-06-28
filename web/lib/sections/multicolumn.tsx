import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon, type IconName } from "@/components/Icon";

export function Multicolumn({ section }: SectionProps) {
  const s = section.settings;
  const columns = section.blocks.filter((b) => b.type === "column");
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="border-y border-border-hairline bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        {typeof s.heading === "string" && s.heading && (
          <h2 className="mb-8 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{s.heading}</h2>
        )}
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {columns.map((b) => (
            <div key={b.id} className="flex flex-col gap-3">
              <Icon name={((b.settings.icon as IconName) ?? "star")} size={28} className="text-accent-press" />
              <h3 className="font-sans text-h4 text-text-strong">{(b.settings.title as string) ?? ""}</h3>
              {typeof b.settings.text === "string" && b.settings.text && (
                <div className="text-sm text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: b.settings.text }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
