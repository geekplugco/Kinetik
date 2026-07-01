"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

export function CollectionList({ section }: SectionProps) {
  const { collections } = useShopify();
  const s = section.settings;
  const list = Object.values(collections);
  const layout = (s.layout as string) ?? "overlay";
  const width = (s.width as string) ?? "page";
  const ratio = (s.image_ratio as string) ?? "tall";
  const containerWidth = width === "full" ? "max-w-none" : width === "narrow" ? "max-w-[72rem]" : "max-w-[var(--page-width)]";
  const ratioClass = ratio === "square" ? "aspect-square" : ratio === "portrait" ? "aspect-[4/5]" : ratio === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]";
  const eyebrow = typeof s.eyebrow === "string" && s.eyebrow ? s.eyebrow : "Browse the system";
  const isBelow = layout === "below";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className={`mx-auto ${containerWidth} px-6`}>
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">{eyebrow}</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-text-strong">
            {(s.heading as string) ?? "Collections"}
          </h2>
        </div>
        <div className="grid gap-3 grid-cols-[repeat(var(--cols-mobile,1),minmax(0,1fr))] md:grid-cols-[repeat(var(--cols-desktop,3),minmax(0,1fr))]">
          {list.map((c) => (
            <a key={c.id} href={c.url} className="group block">
              <div className={`relative overflow-hidden bg-ink-950 ${ratioClass}`}>
                {c.featured_image && (
                  <Image
                    src={c.featured_image.src}
                    alt={c.title}
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {!isBelow && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/5 to-transparent" aria-hidden />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[11px] uppercase tracking-label text-paper/70">{c.products_count} pieces</span>
                        <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-paper">{c.title}</span>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/40 text-paper transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                        <Icon name="arrow" size={18} />
                      </span>
                    </div>
                  </>
                )}
              </div>
              {isBelow && (
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-label text-text-muted">{c.products_count} pieces</span>
                    <span className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-text-strong">{c.title}</span>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border-hairline text-text-strong transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
