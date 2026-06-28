"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";

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
      <div className="mx-auto max-w-[1200px] px-6">
        {typeof s.heading === "string" && s.heading && (
          <h2 className="mb-8 font-display text-h2 tracking-tight text-text-strong">{s.heading}</h2>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <a key={c.id} href={c.url} className="group relative block aspect-[3/2] overflow-hidden bg-surface-sunken">
              {c.featured_image && (
                <Image src={c.featured_image.src} alt={c.title} fill sizes="(min-width:990px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              )}
              <span className="absolute inset-0 bg-ink-950/30" aria-hidden />
              <span className="absolute bottom-4 left-4 font-display text-h3 uppercase tracking-tight text-paper">{c.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
