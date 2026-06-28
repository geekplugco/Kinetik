import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function CustomLiquid({ section }: SectionProps) {
  const html = (section.settings.custom_html as string) ?? "";
  if (!html) return null;
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle(section.settings)} className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]">
      <div className="mx-auto max-w-[var(--page-width)] px-6" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
