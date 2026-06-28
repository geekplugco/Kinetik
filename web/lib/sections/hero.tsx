import Image from "next/image";
import type { SectionProps } from "../registry";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export function Hero({ section }: SectionProps) {
  const s = section.settings;
  const image = (s.image as string) ?? "/uploads/hero-editorial.png";
  return (
    <section className="border-b border-border-strong">
      <div className="mx-auto grid max-w-[var(--page-width)] md:grid-cols-[1.05fr_1.25fr]">
        <div className="order-2 flex flex-col justify-between gap-8 bg-ink-950 px-7 py-12 text-paper md:order-1 md:min-h-[640px] md:px-14 md:py-14">
          <span className="font-mono text-xs uppercase tracking-label text-accent">{(s.subheading as string) ?? "SS26 / Field System"}</span>
          <h1 className="font-display text-[clamp(3rem,8.5vw,6rem)] font-bold uppercase leading-[0.88] tracking-hero">
            {(s.heading as string) ?? "Move faster."}
          </h1>
          <div className="flex flex-col gap-7">
            <div
              className="max-w-sm text-body-lg leading-snug text-ink-300 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: (s.text as string) ?? "<p>High-resolution techwear that loads in a blink. Engineered for the city, the trail, and everything in transit.</p>" }}
            />
            <div className="flex flex-wrap gap-3">
              <Button href={(s.button_link as string) ?? "/collections/new-arrivals"} variant="primary" size="md" className="gap-3 px-8 py-4 text-sm">
                {(s.button_label as string) ?? "Shop the drop"} <Icon name="arrow" size={18} />
              </Button>
              {typeof s.button_label_2 === "string" && s.button_label_2 && (
                <a href={(s.button_link_2 as string) ?? "#"} className="inline-flex items-center justify-center border border-ink-600 px-8 py-4 font-mono text-sm uppercase tracking-wide text-paper transition-colors hover:bg-ink-900">
                  {s.button_label_2}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="relative order-1 min-h-[440px] bg-ink-900 md:order-2 md:min-h-[640px]">
          <Image src={image} alt={(s.image_alt as string) ?? ""} fill priority sizes="(min-width:768px) 56vw, 100vw" className="object-cover" />
          <span className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-label text-paper/85">
            {(s.image_caption as string) ?? "SS26 · Lookbook 01"}
          </span>
          {typeof s.tag === "string" && s.tag && (
            <span className="absolute right-5 top-5 bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-label text-accent-ink">{s.tag}</span>
          )}
        </div>
      </div>
    </section>
  );
}
