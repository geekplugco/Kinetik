import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function LogoList({ section }: SectionProps) {
  const logos = section.blocks.filter((b) => b.type === "logo");
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle(section.settings)} className="border-y border-border-hairline bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]">
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        {typeof section.settings.heading === "string" && section.settings.heading && (
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-label text-text-muted">{section.settings.heading}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((b) => (
            <div key={b.id} className="relative h-8 w-28 opacity-60 transition-opacity hover:opacity-100">
              {typeof b.settings.image === "string" && b.settings.image ? (
                <Image src={b.settings.image as string} alt={(b.settings.alt as string) ?? ""} fill className="object-contain" />
              ) : (
                <span className="flex h-full items-center justify-center font-display text-h4 uppercase tracking-tight text-text-strong">{(b.settings.alt as string) ?? "Logo"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
