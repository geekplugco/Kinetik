"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";

export function FeaturedCollection({ section }: SectionProps) {
  const { collections } = useShopify();
  const s = section.settings;
  const handle = (s.collection as string) ?? Object.keys(collections)[0];
  const collection = collections[handle];
  const limit = typeof s.products_to_show === "number" ? s.products_to_show : 8;
  const products = collection ? collection.products.slice(0, limit) : [];
  const layout = (s.layout as string) ?? "split";
  const width = (s.width as string) ?? "page";
  const density = (s.grid_density as string) ?? "comfortable";
  const containerWidth = width === "full" ? "max-w-none" : width === "narrow" ? "max-w-[72rem]" : "max-w-[var(--page-width)]";
  const headerClass =
    layout === "stacked"
      ? "mb-10 flex flex-col items-center gap-3 text-center"
      : layout === "editorial"
      ? "mb-12 flex flex-col gap-3 border-b border-border-hairline pb-8"
      : "mb-10 flex items-end justify-between gap-4";
  const gridGap = density === "compact" ? "gap-x-2 gap-y-6" : density === "spacious" ? "gap-x-6 gap-y-14" : "gap-x-4 gap-y-10";
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className={`mx-auto ${containerWidth} px-6`}>
        <div className={headerClass}>
          <div className={`flex flex-col gap-2 ${layout === "stacked" ? "items-center" : ""}`}>
            {collection && (
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">SS26 — {collection.products_count} styles</span>
            )}
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-text-strong">
              {(s.heading as string) ?? collection?.title ?? "Featured"}
            </h2>
          </div>
          {collection && (
            <a href={collection.url} className="flex min-h-[44px] shrink-0 items-center gap-2 pb-2 font-mono text-xs uppercase tracking-label text-text-strong hover:text-accent-press">
              View all <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
        <div className={`grid grid-cols-[repeat(var(--cols-mobile,2),minmax(0,1fr))] lg:grid-cols-[repeat(var(--cols-desktop,4),minmax(0,1fr))] ${gridGap}`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
