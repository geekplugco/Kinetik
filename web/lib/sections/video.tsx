"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return null;
}

const WIDTH: Record<string, string> = {
  wide: "max-w-[1100px]",
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-[820px]",
};

const RATIO: Record<string, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

export function Video({ section }: SectionProps) {
  const s = section.settings;
  const [playing, setPlaying] = useState(false);
  const embed = typeof s.video_url === "string" ? embedUrl(s.video_url) : null;
  const cover = (s.cover_image as string) ?? "/uploads/banner-dark-flatlay.png";
  const width = WIDTH[(s.width as string) ?? "wide"] ?? WIDTH.wide;
  const ratio = RATIO[(s.media_ratio as string) ?? "16/9"] ?? RATIO["16/9"];
  const align = (s.heading_alignment as string) ?? "left";
  const overlay = (s.overlay_style as string) ?? "tint";
  const dark = (s.color_scheme as string) === "scheme-3" || (s.color_scheme as string) === "scheme-dark";
  const overlayClass =
    overlay === "none" ? "bg-transparent" : overlay === "strong" ? "bg-ink-950/55" : "bg-ink-950/30";
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className={`${dark ? "theme-dark " : ""}bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]`}>
      <div className={`mx-auto ${width} px-6`}>
        {typeof s.heading === "string" && s.heading && (
          <h2 className={`mb-8 font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong ${align === "center" ? "text-center" : "text-left"}`}>{s.heading}</h2>
        )}
        <div className={`relative ${ratio} overflow-hidden bg-ink-950`}>
          {playing && embed ? (
            <iframe src={embed} title={(s.heading as string) ?? "Video"} allow="autoplay; fullscreen" className="absolute inset-0 h-full w-full" />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label="Play video">
              <Image src={cover} alt="" fill sizes="100vw" className="object-cover" />
              <span className={`absolute inset-0 flex items-center justify-center ${overlayClass}`}>
                <span className="flex h-[max(44px,4rem)] w-[max(44px,4rem)] items-center justify-center rounded-full bg-accent text-accent-ink transition-transform group-hover:scale-110"><Icon name="arrow" size={28} /></span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
