import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

export function Hero({ section }: SectionProps) {
  const s = section.settings;
  const image = (s.image as string) ?? "/uploads/hero-editorial.png";
  const align = s.content_alignment === "center" ? "items-center text-center" : "items-start text-left";
  const overlay = typeof s.overlay_opacity === "number" ? s.overlay_opacity / 100 : 0.35;
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-dark"}
      style={sectionStyle(s)}
      className="relative isolate flex min-h-[70vh] items-end overflow-hidden bg-ink-950"
    >
      <Image src={image} alt={(s.image_alt as string) ?? ""} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-ink-950" style={{ opacity: overlay }} aria-hidden />
      <div className={`relative mx-auto flex w-full max-w-[var(--page-width)] flex-col gap-6 px-6 py-16 ${align}`}>
        {typeof s.subheading === "string" && s.subheading && (
          <span className="font-mono text-xs uppercase tracking-label text-paper/80">{s.subheading}</span>
        )}
        <h1 className="max-w-3xl font-display text-fluid-hero leading-[0.95] tracking-hero text-paper">
          {(s.heading as string) ?? "Move different."}
        </h1>
        {typeof s.button_label === "string" && s.button_label && (
          <Button href={(s.button_link as string) ?? "#"} variant="primary" size="md">
            {s.button_label}
          </Button>
        )}
      </div>
    </section>
  );
}
