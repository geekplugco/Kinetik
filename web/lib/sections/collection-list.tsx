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
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle({ padding_top: 64, padding_bottom: 64, ...s })}
      className="bg-surface-page pt-[var(--pt,64px)] pb-[var(--pb,64px)]"
    >
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">Browse the system</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-text-strong">
            {(s.heading as string) ?? "Collections"}
          </h2>
        </div>
        <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {list.map((c) => (
            <a key={c.id} href={c.url} className="group relative block aspect-[3/4] overflow-hidden bg-ink-950">
              {c.featured_image && (
                <Image
                  src={c.featured_image.src}
                  alt={c.title}
                  fill
                  sizes="(min-width:768px) 33vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/25 to-transparent" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-label text-paper/70">{c.products_count} pieces</span>
                  <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-paper">{c.title}</span>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-paper/40 text-paper transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                  <Icon name="arrow" size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
