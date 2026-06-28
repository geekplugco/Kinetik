"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";

export function MainProduct({ section }: SectionProps) {
  const { product } = useShopify();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const sticky = section.settings.enable_sticky_info !== false;
  if (!product) return null;
  const variant = product.variants[variantIndex] ?? product.variants[0];
  const gallery = product.images.length ? product.images : [product.featured_image];
  return (
    <section className="mx-auto grid max-w-[1200px] gap-10 px-6 py-12 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        {gallery.map((img, i) => (
          <div key={img.id ?? i} className="relative aspect-[4/5] overflow-hidden bg-surface-sunken">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width:990px) 50vw, 100vw" priority={i === 0} className="object-cover" />
          </div>
        ))}
      </div>
      <div className={sticky ? "md:sticky md:top-24 md:self-start" : ""}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{product.vendor}</span>
            <h1 className="font-display text-h1 tracking-tight text-text-strong">{product.title}</h1>
            <Price price={variant.price} compareAt={variant.compare_at_price} className="text-body-lg" />
          </div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">Variant</span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantIndex(i)}
                    className={`border px-4 py-2 font-mono text-xs uppercase tracking-wide ${i === variantIndex ? "border-border-strong bg-surface-sunken text-text-strong" : "border-border-hairline text-text-muted"}`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border-strong">
              <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-text-strong">−</button>
              <span className="w-8 text-center font-mono text-sm">{qty}</span>
              <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-text-strong">+</button>
            </div>
            {variant.available ? <Tag tone="accent">In stock</Tag> : <Tag>Sold out</Tag>}
          </div>
          <Button size="md" disabled={!variant.available} className="w-full">
            {variant.available ? "Add to cart" : "Sold out"}
          </Button>
          <div className="border-t border-border-hairline pt-5 text-body text-text-body" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </section>
  );
}
