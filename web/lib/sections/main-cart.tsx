"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { useMoney } from "../shopify-context";
import { Button } from "@/components/Button";

export function MainCart({ section }: SectionProps) {
  const { cart } = useShopify();
  const money = useMoney();
  const [lines, setLines] = useState(cart.items.map((i) => ({ ...i })));
  const threshold = typeof section.settings.free_shipping_threshold === "number" ? section.settings.free_shipping_threshold : 15000;

  const setQty = (id: string, qty: number) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, quantity: Math.max(1, qty), line_price: l.variant.price * Math.max(1, qty) } : l)));
  const remove = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));

  const subtotal = lines.reduce((sum, l) => sum + l.line_price, 0);
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  if (!lines.length) {
    return (
      <section className="mx-auto max-w-[800px] px-6 py-24 text-center">
        <h1 className="font-display text-h1 tracking-tight text-text-strong">Your cart is empty</h1>
        <div className="mt-6"><Button href="/collections/new-arrivals">Continue shopping</Button></div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[900px] px-6 py-12">
      <h1 className="font-display text-h1 tracking-tight text-text-strong">Cart</h1>
      <div className="mt-6 border border-border-hairline p-4">
        <p className="font-mono text-xs uppercase tracking-label text-text-muted">
          {remaining > 0 ? `${money(remaining)} away from free shipping` : "You’ve unlocked free shipping"}
        </p>
        <div className="mt-2 h-1 w-full bg-surface-sunken">
          <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ul className="mt-8 divide-y divide-border-hairline">
        {lines.map((l) => (
          <li key={l.id} className="flex gap-4 py-6">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-surface-sunken">
              <Image src={l.product.featured_image.src} alt={l.product.featured_image.alt} fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <a href={l.product.url} className="font-sans text-body text-text-strong hover:text-accent-press">{l.product.title}</a>
              <span className="font-mono text-xs text-text-muted">{l.variant.title}</span>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center border border-border-strong">
                  <button type="button" aria-label="Decrease" onClick={() => setQty(l.id, l.quantity - 1)} className="px-3 py-1 text-text-strong">−</button>
                  <span className="w-8 text-center font-mono text-sm">{l.quantity}</span>
                  <button type="button" aria-label="Increase" onClick={() => setQty(l.id, l.quantity + 1)} className="px-3 py-1 text-text-strong">+</button>
                </div>
                <span className="font-mono text-sm text-text-strong">{money(l.line_price)}</span>
              </div>
            </div>
            <button type="button" onClick={() => remove(l.id)} className="self-start font-mono text-xs uppercase tracking-label text-text-muted hover:text-negative">Remove</button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-end gap-4 border-t border-border-strong pt-6">
        <div className="flex w-full max-w-xs items-center justify-between">
          <span className="font-mono text-sm uppercase tracking-label text-text-muted">Subtotal</span>
          <span className="font-mono text-h4 text-text-strong">{money(subtotal)}</span>
        </div>
        <Button size="md" className="w-full max-w-xs">Checkout</Button>
      </div>
    </section>
  );
}
