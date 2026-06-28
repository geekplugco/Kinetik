import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

export function Testimonials({ section }: SectionProps) {
  const items = section.blocks.filter((b) => b.type === "testimonial");
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle(section.settings)} className="bg-surface-sunken pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]">
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        {typeof section.settings.heading === "string" && section.settings.heading && (
          <h2 className="mb-10 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{section.settings.heading}</h2>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((b) => (
            <figure key={b.id} className="flex flex-col gap-4 border border-border-hairline bg-surface-page p-6">
              <div className="flex gap-1 text-accent-press">
                {Array.from({ length: typeof b.settings.rating === "number" ? b.settings.rating : 5 }, (_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <blockquote className="text-body-lg text-text-body [&_p]:m-0" dangerouslySetInnerHTML={{ __html: (b.settings.quote as string) ?? "" }} />
              <figcaption className="mt-auto font-mono text-xs uppercase tracking-label text-text-muted">{(b.settings.author as string) ?? ""}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
