"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { ProductCard } from "@/components/ProductCard";

export function RelatedProducts({ section }: SectionProps) {
  const { product, products } = useShopify();
  const limit = typeof section.settings.products_to_show === "number" ? section.settings.products_to_show : 4;
  const related = Object.values(products)
    .filter((p) => p.handle !== product?.handle)
    .slice(0, limit);
  if (!related.length) return null;
  return (
    <section className="border-t border-border-hairline bg-surface-page py-16">
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        <h2 className="mb-8 font-display text-h2 tracking-tight text-text-strong">
          {(section.settings.heading as string) ?? "You might also like"}
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
