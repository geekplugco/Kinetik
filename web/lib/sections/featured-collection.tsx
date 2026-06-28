"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";

export function FeaturedCollection({ section }: SectionProps) {
  const { collections } = useShopify();
  const s = section.settings;
  const handle = (s.collection as string) ?? Object.keys(collections)[0];
  const collection = collections[handle];
  const limit = typeof s.products_to_show === "number" ? s.products_to_show : 8;
  const products = collection ? collection.products.slice(0, limit) : [];
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle({ padding_top: 64, padding_bottom: 64, ...s })}
      className="bg-surface-page pt-[var(--pt,64px)] pb-[var(--pb,64px)]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-h2 tracking-tight text-text-strong">
            {(s.heading as string) ?? collection?.title ?? "Featured"}
          </h2>
          {collection && (
            <Button href={collection.url} variant="link" size="sm">
              View all
            </Button>
          )}
        </div>
        <div className="grid grid-cols-[repeat(var(--cols-mobile,2),minmax(0,1fr))] gap-x-4 gap-y-10 lg:grid-cols-[repeat(var(--cols-desktop,4),minmax(0,1fr))]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
