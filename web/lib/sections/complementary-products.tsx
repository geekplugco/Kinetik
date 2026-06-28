"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import { Button } from "@/components/Button";

export function ComplementaryProducts({ section }: SectionProps) {
  const { product, products } = useShopify();
  const money = useMoney();
  const ui = useUI();
  const limit = typeof section.settings.products_to_show === "number" ? section.settings.products_to_show : 3;
  const items = Object.values(products).filter((p) => p.handle !== product?.handle).slice(0, limit);
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-label text-text-muted">{(section.settings.heading as string) ?? "Pairs well with"}</h2>
      <div className="flex flex-col divide-y divide-border-hairline border-y border-border-hairline">
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-surface-sunken">
              <Image src={p.featured_image.src} alt={p.featured_image.alt} fill sizes="56px" className="object-cover" />
            </div>
            <a href={p.url} className="flex-1 font-sans text-body text-text-strong hover:text-accent-press">{p.title}</a>
            <span className="font-mono text-sm text-text-muted">{money(p.price)}</span>
            <Button variant="secondary" size="sm" onClick={() => ui.addToCart(p, p.variants[0], 1)}>Add</Button>
          </div>
        ))}
      </div>
    </section>
  );
}
