import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

const widthClass: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-4xl",
};

const colsDesktop: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "md:grid-cols-4",
  "5": "md:grid-cols-5",
};

const colsMobile: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-2",
};

const ratioClass: Record<string, string> = {
  masonry: "auto-rows-[200px]",
  square: "auto-rows-fr [&>a]:aspect-square",
  portrait: "auto-rows-fr [&>a]:aspect-[3/4]",
  landscape: "auto-rows-fr [&>a]:aspect-[4/3]",
};

export function ImageGallery({ section }: SectionProps) {
  const s = section.settings;
  const images = section.blocks.filter((b) => b.type === "image");
  const width = widthClass[(s.width as string) ?? "page"] ?? widthClass.page;
  const desktop = colsDesktop[String(s.columns_desktop ?? "4")] ?? colsDesktop["4"];
  const mobile = colsMobile[String(s.columns_mobile ?? "2")] ?? colsMobile["2"];
  const layout = (s.layout as string) ?? "masonry";
  const rows = ratioClass[layout] ?? ratioClass.masonry;
  const masonry = layout === "masonry";
  const gapClass = s.spacing === "none" ? "gap-0" : s.spacing === "wide" ? "gap-6" : "gap-3";
  const rounded = s.image_style === "rounded" ? "rounded-sm" : "";
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]">
      <div className={`mx-auto px-6 ${width}`}>
        {typeof s.heading === "string" && s.heading && (
          <h2 className="mb-8 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{s.heading}</h2>
        )}
        <div className={`grid ${mobile} ${desktop} ${rows} ${gapClass}`}>
          {images.map((b, i) => {
            const wide = masonry && (b.settings.size === "wide" || i === 0);
            return (
              <a key={b.id} href={(b.settings.link as string) ?? "#"} aria-label={(b.settings.alt as string) || `Gallery image ${i + 1}`} className={`group relative overflow-hidden bg-surface-sunken ${rounded} ${wide ? "col-span-2 row-span-2" : ""}`}>
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
