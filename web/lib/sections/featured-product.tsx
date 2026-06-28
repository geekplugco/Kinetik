"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { useUI } from "../ui-context";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";

export function FeaturedProduct({ section }: SectionProps) {
  const { products } = useShopify();
  const ui = useUI();
  const handle = (section.settings.product as string) ?? Object.keys(products)[0];
  const product = products[handle];
  if (!product) return null;
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} className="bg-surface-sunken">
      <div className="mx-auto grid max-w-[var(--page-width)] items-stretch md:grid-cols-2">
        <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[640px]">
          <Image src={product.featured_image.src} alt={product.featured_image.alt} fill sizes="50vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-5 px-6 py-16 md:px-16">
          {typeof section.settings.heading === "string" && section.settings.heading && (
            <span className="font-mono text-xs uppercase tracking-label text-accent-press">{section.settings.heading}</span>
          )}
          <h2 className="font-display text-display-2 leading-[0.95] tracking-tight text-text-strong">{product.title}</h2>
          <Price price={product.price} compareAt={product.compare_at_price} className="text-body-lg" />
          <p className="max-w-md text-body text-text-body">{product.description}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button onClick={() => ui.addToCart(product, product.variants[0], 1)} className="px-8">Add to cart</Button>
            <Button href={product.url} variant="secondary">View details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
