"use client";

import Image from "next/image";
import { useUI } from "./shared";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export function QuickView() {
  const ui = useUI();
  const product = ui.quickView;
  return (
    <>
      <div onClick={ui.closeQuickView} className={`fixed inset-0 z-50 bg-ink-950/60 transition-opacity ${product ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden />
      <div className={`fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-surface-page shadow-xl transition-opacity ${product ? "opacity-100" : "pointer-events-none opacity-0"}`} role="dialog" aria-label="Quick view">
        {product && (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-surface-sunken">
              <Image src={product.featured_image.src} alt={product.featured_image.alt} fill sizes="50vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-4 p-8">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-label text-text-muted">{product.vendor}</span>
                <button type="button" aria-label="Close" onClick={ui.closeQuickView} className="text-text-strong hover:text-accent-press"><Icon name="close" /></button>
              </div>
              <h2 className="font-display text-h2 tracking-tight text-text-strong">{product.title}</h2>
              <Price price={product.price} compareAt={product.compare_at_price} className="text-body-lg" />
              <p className="text-body text-text-body">{product.description}</p>
              <Button className="mt-2 w-full" onClick={() => ui.addToCart(product, product.variants[0], 1)}>Add to cart</Button>
              <a href={product.url} onClick={ui.closeQuickView} className="text-center font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">View full details</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
