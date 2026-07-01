import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

const widthClass: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-4xl",
};

const ratioClass: Record<string, string> = {
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

export function ImageWithText({ section }: SectionProps) {
  const s = section.settings;
  const image = (s.image as string) ?? "/uploads/banner-dark-flatlay.png";
  const reverse = s.layout === "text_first";
  const width = widthClass[(s.width as string) ?? "page"] ?? widthClass.page;
  const ratio = ratioClass[(s.image_ratio as string) ?? "landscape"] ?? ratioClass.landscape;
  const centered = s.content_alignment === "center";
  const overlap = s.media_style === "overlap";
  const dark = s.text_panel === "dark";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,0px)] pb-[var(--pb,0px)]"
    >
      <div className={`mx-auto grid items-stretch md:grid-cols-2 ${width} ${reverse ? "md:[direction:rtl]" : ""}`}>
        <div className={`relative ${ratio} md:aspect-auto md:min-h-[60vh] [direction:ltr] ${overlap ? "md:scale-[1.02]" : ""}`}>
          <Image src={image} alt={(s.image_alt as string) ?? ""} fill sizes="50vw" className="object-cover" />
        </div>
        <div
          className={`flex flex-col gap-5 px-6 py-16 md:px-16 [direction:ltr] ${dark ? "theme-dark bg-surface-page" : ""} ${centered ? "items-center justify-center text-center" : "items-start justify-center"} ${overlap ? "md:-ml-12 md:py-20" : ""}`}
        >
          {typeof s.subheading === "string" && s.subheading && (
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{s.subheading}</span>
          )}
          <h2 className="font-display text-h1 tracking-tight text-text-strong">{(s.heading as string) ?? "Built to last"}</h2>
          {typeof s.text === "string" && s.text && (
            <div className="max-w-prose text-body-lg text-text-body" dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
          {typeof s.button_label === "string" && s.button_label && (
            <Button href={(s.button_link as string) ?? "#"} variant="secondary">{s.button_label}</Button>
          )}
        </div>
      </div>
    </section>
  );
}
