"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { Icon } from "@/components/Icon";

export function MainProduct({ section }: SectionProps) {
  const { product } = useShopify();
  const ui = useUI();
  const money = useMoney();
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
          <Button size="md" disabled={!variant.available} className="w-full" onClick={() => ui.addToCart(product, variant, qty)}>
            {variant.available ? "Add to cart" : "Sold out"}
          </Button>
          <a href="#" className="flex w-full items-center justify-center gap-2 bg-[#5a31f4] px-6 py-3 font-mono text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90">
            Buy with Shop Pay
          </a>
          <p className="text-center font-mono text-xs text-text-muted">
            Pay in 4 interest-free payments of {money(Math.round(variant.price / 4))} with Shop Pay.{" "}
            <a href="#" className="underline underline-offset-2 hover:text-text-strong">Learn more</a>
          </p>

          <div className="flex items-start gap-2 border border-border-hairline p-4 text-sm text-text-body">
            <Icon name="user" size={18} className="mt-0.5 text-positive" />
            <span><strong className="text-text-strong">Pickup available</strong> at Kinetik Studio · Usually ready in 24 hours</span>
          </div>

          <div className="flex items-center gap-4 border-t border-border-hairline pt-4 font-mono text-xs uppercase tracking-label text-text-muted">
            <span>Share</span>
            {["Copy link", "Facebook", "Pinterest", "X"].map((p) => (
              <button key={p} type="button" className="hover:text-text-strong">{p}</button>
            ))}
          </div>

          <div className="border-t border-border-hairline pt-5 text-body text-text-body" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </section>
  );
}
