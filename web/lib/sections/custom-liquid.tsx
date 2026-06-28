import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function CustomLiquid({ section }: SectionProps) {
  const html = (section.settings.custom_html as string) ?? "";
  if (!html) return null;
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle({ padding_top: 32, padding_bottom: 32, ...section.settings })} className="bg-surface-page pt-[var(--pt,32px)] pb-[var(--pb,32px)]">
      <div className="mx-auto max-w-[1200px] px-6" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
