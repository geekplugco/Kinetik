"use client";

import Image from "next/image";
import type { Product } from "@/lib/shopify/objects";
import { Price } from "./Price";
import { Button } from "./Button";
import { useUI } from "@/lib/ui-context";

export function ProductCard({ product, ratio = "portrait" }: { product: Product; ratio?: "square" | "portrait" }) {
  const ui = useUI();
  const aspect = ratio === "square" ? "aspect-square" : "aspect-[4/5]";
  return (
    <article className="group flex flex-col gap-3">
      <div className={`relative ${aspect} overflow-hidden bg-surface-sunken`}>
        <a href={product.url} aria-label={product.title}>
          <Image
            src={product.featured_image.src}
            alt={product.featured_image.alt}
            fill
            sizes="(min-width: 990px) 25vw, (min-width: 750px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </a>
        <button
          type="button"
          onClick={() => ui.openQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 border border-border-strong bg-surface-page/95 px-4 py-2 font-mono text-xs uppercase tracking-wide text-text-strong opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick view
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-label text-text-muted">{product.vendor}</span>
        <a href={product.url} className="font-sans text-body text-text-strong hover:text-accent-press">{product.title}</a>
        <Price price={product.price} compareAt={product.compare_at_price} />
      </div>
      <Button variant="secondary" size="sm" className="w-full" onClick={() => ui.addToCart(product, product.variants[0], 1)}>
        Add to cart
      </Button>
    </article>
  );
}
