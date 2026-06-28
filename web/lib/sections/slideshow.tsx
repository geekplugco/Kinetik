"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

const positions: Record<string, string> = {
  "top-left": "items-start justify-start text-left",
  "middle-center": "items-center justify-center text-center",
  "bottom-left": "items-end justify-start text-left",
};

const heights: Record<string, string> = {
  adapt: "aspect-[16/9]",
  small: "min-h-[50vh]",
  medium: "min-h-[70vh]",
  large: "min-h-[88vh]",
};

export function Slideshow({ section }: SectionProps) {
  const slides = section.blocks.filter((b) => b.type === "slide");
  const [index, setIndex] = useState(0);
  const autoplay = section.settings.autoplay === true;
  const delay = typeof section.settings.autoplay_delay === "number" ? section.settings.autoplay_delay * 1000 : 5000;
  const heightClass = heights[(section.settings.slide_height as string) ?? "medium"] ?? heights.medium;

  const go = useCallback((n: number) => setIndex((i) => (slides.length ? (n + slides.length) % slides.length : 0)), [slides.length]);

  useEffect(() => {
    if (!autoplay || slides.length < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), delay);
    return () => window.clearInterval(t);
  }, [autoplay, delay, slides.length]);

  if (!slides.length) return null;

  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} className="relative isolate overflow-hidden bg-ink-950">
      <div className={`relative ${heightClass}`}>
        {slides.map((slide, i) => {
          const s = slide.settings;
          const overlay = typeof s.image_overlay_opacity === "number" ? s.image_overlay_opacity / 100 : 0.3;
          const align = positions[(s.content_position as string) ?? "bottom-left"] ?? positions["bottom-left"];
          return (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={i !== index}>
              {typeof s.image === "string" && s.image && (
                <Image src={s.image as string} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/35 to-ink-950/10" aria-hidden />
              {overlay > 0.5 && <div className="absolute inset-0 bg-ink-950" style={{ opacity: overlay - 0.5 }} aria-hidden />}
              <div className={`relative mx-auto flex h-full max-w-[var(--page-width)] flex-col gap-6 px-6 pb-20 pt-16 ${align}`}>
                <span className="h-1 w-12 bg-accent" aria-hidden />
                {typeof s.subheading === "string" && s.subheading && <span className="font-mono text-xs uppercase tracking-label text-paper/90">{s.subheading}</span>}
                <h2 className="max-w-3xl font-display text-fluid-hero font-bold leading-[0.92] tracking-hero text-paper">{(s.heading as string) ?? ""}</h2>
                {typeof s.button_label === "string" && s.button_label && (
                  <Button href={(s.button_link as string) ?? "#"} variant="primary" size="md" className="mt-2 px-8 py-4 text-sm">{s.button_label}</Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && section.settings.show_controls !== false && (
        <>
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-paper/40 bg-ink-950/40 p-2 text-paper hover:bg-ink-950/70"><Icon name="arrow" className="rotate-180" /></button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-paper/40 bg-ink-950/40 p-2 text-paper hover:bg-ink-950/70"><Icon name="arrow" /></button>
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((slide, i) => (
              <button key={slide.id} type="button" aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)} className={`h-1.5 w-6 transition-colors ${i === index ? "bg-accent" : "bg-paper/40"}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
