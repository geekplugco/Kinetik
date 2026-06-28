import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function ImageGallery({ section }: SectionProps) {
  const images = section.blocks.filter((b) => b.type === "image");
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle({ padding_top: 56, padding_bottom: 56, ...section.settings })} className="bg-surface-page pt-[var(--pt,56px)] pb-[var(--pb,56px)]">
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        {typeof section.settings.heading === "string" && section.settings.heading && (
          <h2 className="mb-8 font-display text-h2 tracking-tight text-text-strong">{section.settings.heading}</h2>
        )}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((b, i) => {
            const wide = b.settings.size === "wide" || i === 0;
            return (
              <a key={b.id} href={(b.settings.link as string) ?? "#"} className={`group relative overflow-hidden bg-surface-sunken ${wide ? "col-span-2 row-span-2" : ""}`}>
                {typeof b.settings.image === "string" && b.settings.image && (
                  <Image src={b.settings.image as string} alt={(b.settings.alt as string) ?? ""} fill sizes="50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
