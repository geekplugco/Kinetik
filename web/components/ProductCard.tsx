"use client";

import Image from "next/image";
import type { Product } from "@/lib/shopify/objects";
import { useUI } from "@/lib/ui-context";
import { useMoney } from "@/lib/shopify-context";
import { Icon } from "./Icon";

export function ProductCard({ product }: { product: Product }) {
  const ui = useUI();
  const money = useMoney();
  const onSale = typeof product.compare_at_price === "number" && product.compare_at_price > product.price;
  const discount = onSale ? Math.round((1 - product.price / product.compare_at_price!) * 100) : 0;

  return (
    <article className="group flex flex-col gap-3">
      <div className="relative aspect-[4/5] overflow-hidden border border-border-hairline bg-surface-sunken">
        <a href={product.url} aria-label={product.title}>
          <Image
            src={product.featured_image.src}
            alt={product.featured_image.alt}
            fill
            sizes="(min-width: 990px) 25vw, (min-width: 750px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </a>
        {(product.badge || onSale) && (
          <span className={`absolute left-3 top-3 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-label ${onSale ? "bg-accent text-accent-ink" : "bg-ink-950 text-paper"}`}>
            {onSale ? `−${discount}%` : product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => ui.addToCart(product, product.variants[0], 1)}
          className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-ink-950 py-3 font-mono text-xs uppercase tracking-label text-paper transition-transform duration-300 group-hover:translate-y-0 focus-visible:translate-y-0"
        >
          <Icon name="cart" size={15} /> Add to cart
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-label text-text-faint">{product.code}</span>
        <a href={product.url} className="font-sans text-body leading-tight text-text-strong hover:text-accent-press">{product.title}</a>
        <span className="font-mono text-[11px] text-text-muted">{product.spec}</span>
        <div className="flex items-baseline gap-2 pt-0.5 font-mono text-sm">
          <span className={onSale ? "text-accent-press" : "text-text-strong"}>{money(product.price)}</span>
          {onSale && <s className="text-xs text-text-faint">{money(product.compare_at_price!)}</s>}
        </div>
        {product.colors.length > 1 && (
          <div className="flex gap-1.5 pt-1">
            {product.colors.map((c) => (
              <span key={c.name} title={c.name} style={{ background: c.swatch }} className="h-3.5 w-3.5 rounded-full border border-border-hairline" />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
