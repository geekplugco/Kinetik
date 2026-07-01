import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function Testimonials({ section }: SectionProps) {
  const s = section.settings;
  const items = section.blocks.filter((b) => b.type === "testimonial");
  const [featured, ...rest] = items;
  const supporting = rest.slice(0, 3);

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-3"}
      style={sectionStyle(s)}
      className="theme-dark bg-surface-page text-text-body pt-[var(--pt,clamp(4.5rem,8vw,7rem))] pb-[var(--pb,clamp(4.5rem,8vw,7rem))]"
    >
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">
            {(s.kicker as string) ?? "Field reports"}
          </span>
          {typeof s.heading === "string" && s.heading && (
            <span className="sr-only">{s.heading}</span>
          )}
        </div>

        {featured && (
          <figure className="mt-8 grid gap-6 md:grid-cols-[4rem_1fr] md:gap-10">
            <span aria-hidden className="font-display text-[5rem] leading-[0.6] text-accent md:text-[7rem]">&ldquo;</span>
            <div>
              <blockquote
                className="font-display text-[clamp(1.75rem,4.2vw,3.25rem)] font-bold leading-[1.04] tracking-tight text-text-strong [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: (featured.settings.quote as string) ?? "" }}
              />
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-label text-text-muted">
                <span className="text-text-strong">{(featured.settings.author as string) ?? ""}</span>
                {typeof featured.settings.role === "string" && featured.settings.role && (
                  <span aria-hidden>/ {featured.settings.role}</span>
                )}
              </figcaption>
            </div>
          </figure>
        )}

        {supporting.length > 0 && (
          <ul className="mt-14 grid border-t border-border-hairline md:grid-cols-3">
            {supporting.map((b) => (
              <li
                key={b.id}
                className="flex flex-col gap-4 border-border-hairline py-7 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"
              >
                <blockquote
                  className="text-body-lg leading-snug text-text-body [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: (b.settings.quote as string) ?? "" }}
                />
                <figcaption className="mt-auto font-mono text-xs uppercase tracking-label text-text-muted">
                  {(b.settings.author as string) ?? ""}
                </figcaption>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
