import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

const widths: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-[var(--page-width-narrow,72rem)]",
};

const ratios: Record<string, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
};

export function Hero({ section }: SectionProps) {
  const s = section.settings;
  const image = (s.image as string) ?? "/uploads/hero-editorial.png";
  const alt = (s.image_alt as string) ?? "";
  const layout = (s.layout as string) ?? "split";
  const width = widths[(s.width as string) ?? "page"] ?? widths.page;
  const ratio = ratios[(s.image_ratio as string) ?? "16/9"] ?? ratios["16/9"];
  const imageLeft = (s.image_position as string) === "left";

  const subheading = (s.subheading as string) ?? "SS26 / Field System";
  const heading = (s.heading as string) ?? "Move faster.";
  const bodyHtml = (s.text as string) ?? "<p>High-resolution techwear that loads in a blink. Engineered for the city, the trail, and everything in transit.</p>";
  const caption = (s.image_caption as string) ?? "SS26 · Lookbook 01";
  const tag = typeof s.tag === "string" ? s.tag : "";

  const eyebrow = <Reveal as="span" variant="fade" className="font-mono text-xs uppercase tracking-label text-accent">{subheading}</Reveal>;
  const headingEl = (
    <Reveal as="h1" variant="mask" delay={80} className="font-display text-[clamp(3rem,8.5vw,6rem)] font-bold uppercase leading-[0.88] tracking-hero">{heading}</Reveal>
  );
  const bodyBlock = (
    <Reveal variant="up" delay={200} className="flex flex-col gap-7">
      <div
        className="max-w-sm text-body-lg leading-snug text-ink-300 [&_p]:m-0"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <div className="flex flex-wrap gap-3">
        <Button href={(s.button_link as string) ?? "/collections/new-arrivals"} variant="primary" size="md" className="min-h-[44px] gap-3 px-8 py-4 text-sm">
          {(s.button_label as string) ?? "Shop the drop"} <Icon name="arrow" size={18} />
        </Button>
        {typeof s.button_label_2 === "string" && s.button_label_2 && (
          <a href={(s.button_link_2 as string) ?? "#"} className="inline-flex min-h-[44px] items-center justify-center border border-ink-600 px-8 py-4 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:bg-ink-900">
            {s.button_label_2}
          </a>
        )}
      </div>
    </Reveal>
  );
  const imageBits = (
    <>
      <span className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-label text-paper/85">{caption}</span>
      {tag && (
        <span className="absolute right-5 top-5 bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-label text-accent-ink">{tag}</span>
      )}
    </>
  );

  if (layout === "overlay") {
    const align = (s.text_alignment as string) === "center" ? "items-center text-center" : "items-start text-left";
    return (
      <section
        data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
        style={sectionStyle(s)}
        className="theme-dark border-b border-border-strong pb-[var(--pb,0px)] pt-[var(--pt,0px)]"
      >
        <div className={`relative mx-auto min-h-[440px] bg-ink-900 text-paper md:min-h-[640px] ${width} ${ratio}`}>
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/45 to-ink-950/15" aria-hidden />
          <div className={`absolute inset-0 mx-auto flex max-w-[var(--page-width)] flex-col justify-end gap-6 px-7 py-12 md:px-14 md:py-16 ${align}`}>
            {eyebrow}
            {headingEl}
            {bodyBlock}
          </div>
          {imageBits}
        </div>
      </section>
    );
  }

  if (layout === "stacked") {
    return (
      <section
        data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
        style={sectionStyle(s)}
        className="border-b border-border-strong pb-[var(--pb,0px)] pt-[var(--pt,0px)]"
      >
        <div className={`mx-auto ${width}`}>
          <div className={`relative w-full bg-ink-900 ${ratio}`}>
            <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
            {imageBits}
          </div>
          <div className="flex flex-col gap-7 bg-ink-950 px-7 py-12 text-paper md:px-14 md:py-14">
            {eyebrow}
            {headingEl}
            {bodyBlock}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="border-b border-border-strong pb-[var(--pb,0px)] pt-[var(--pt,0px)]"
    >
      <div className={`mx-auto grid ${width} md:grid-cols-[1.05fr_1.25fr]`}>
        <div className={`flex flex-col justify-between gap-8 bg-ink-950 px-7 py-12 text-paper md:min-h-[640px] md:px-14 md:py-14 ${imageLeft ? "order-2 md:order-2" : "order-2 md:order-1"}`}>
          {eyebrow}
          {headingEl}
          {bodyBlock}
        </div>
        <div className={`relative min-h-[440px] bg-ink-900 md:min-h-[640px] ${imageLeft ? "order-1 md:order-1" : "order-1 md:order-2"}`}>
          <Image src={image} alt={alt} fill priority sizes="(min-width:768px) 56vw, 100vw" className="object-cover" />
          {imageBits}
        </div>
      </div>
    </section>
  );
}
