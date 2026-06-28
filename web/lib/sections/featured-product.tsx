"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { useUI } from "../ui-context";
import { sectionStyle } from "../section-style";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";

export function FeaturedProduct({ section }: SectionProps) {
  const { products } = useShopify();
  const ui = useUI();
  const handle = (section.settings.product as string) ?? Object.keys(products)[0];
  const product = products[handle];
  if (!product) return null;
  return (
    <section data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"} style={sectionStyle({ padding_top: 64, padding_bottom: 64, ...section.settings })} className="bg-surface-page pt-[var(--pt,64px)] pb-[var(--pb,64px)]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-surface-sunken">
          <Image src={product.featured_image.src} alt={product.featured_image.alt} fill sizes="50vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          {typeof section.settings.heading === "string" && section.settings.heading && (
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{section.settings.heading}</span>
          )}
          <h2 className="font-display text-h1 tracking-tight text-text-strong">{product.title}</h2>
          <Price price={product.price} compareAt={product.compare_at_price} className="text-body-lg" />
          <p className="max-w-prose text-body text-text-body">{product.description}</p>
          <div className="flex gap-3">
            <Button onClick={() => ui.addToCart(product, product.variants[0], 1)}>Add to cart</Button>
            <Button href={product.url} variant="secondary">View details</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
