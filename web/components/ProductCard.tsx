"use client";

import Image from "next/image";
import type { Product } from "@/lib/shopify/objects";
import { Price } from "./Price";
import { Button } from "./Button";

export function ProductCard({ product, ratio = "portrait" }: { product: Product; ratio?: "square" | "portrait" }) {
  const aspect = ratio === "square" ? "aspect-square" : "aspect-[4/5]";
  return (
    <article className="group flex flex-col gap-3">
      <a href={product.url} className={`relative block ${aspect} overflow-hidden bg-surface-sunken`}>
        <Image
          src={product.featured_image.src}
          alt={product.featured_image.alt}
          fill
          sizes="(min-width: 990px) 25vw, (min-width: 750px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </a>
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs uppercase tracking-label text-text-muted">{product.vendor}</span>
        <a href={product.url} className="font-sans text-body text-text-strong hover:text-accent-press">
          {product.title}
        </a>
        <Price price={product.price} compareAt={product.compare_at_price} />
      </div>
      <Button variant="secondary" size="sm" className="w-full">
        Add to cart
      </Button>
    </article>
  );
}
