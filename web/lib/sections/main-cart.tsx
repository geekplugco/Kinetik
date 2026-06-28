"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import { Button } from "@/components/Button";

export function MainCart({ section }: SectionProps) {
  const money = useMoney();
  const ui = useUI();
  const lines = ui.lines;
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; amount: number } | null>(null);
  const threshold = typeof section.settings.free_shipping_threshold === "number" ? section.settings.free_shipping_threshold : 15000;

  const setQty = ui.updateQty;
  const remove = ui.removeLine;

  const subtotal = ui.cartTotal;
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

      <div className="mt-8 grid gap-8 border-t border-border-strong pt-8 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="cart-note" className="font-mono text-xs uppercase tracking-label text-text-muted">Order note</label>
            <textarea id="cart-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note to your order" className="border border-border-strong bg-surface-page px-4 py-3 font-sans text-sm text-text-strong placeholder:text-text-faint" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="cart-code" className="font-mono text-xs uppercase tracking-label text-text-muted">Discount code</label>
            <div className="flex gap-2">
              <input id="cart-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" className="min-w-0 flex-1 border border-border-strong bg-surface-page px-4 py-2 font-mono text-sm uppercase text-text-strong placeholder:text-text-faint" />
              <Button variant="secondary" size="sm" onClick={() => code && setApplied({ code: code.toUpperCase(), amount: Math.round(subtotal * 0.1) })}>Apply</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex w-full max-w-xs items-center justify-between font-mono text-sm">
            <span className="uppercase tracking-label text-text-muted">Subtotal</span>
            <span className="text-text-strong">{money(subtotal)}</span>
          </div>
          {applied && (
            <div className="flex w-full max-w-xs items-center justify-between font-mono text-sm text-text-strong">
              <span className="uppercase tracking-label">Discount · {applied.code}</span>
              <span>−{money(applied.amount)}</span>
            </div>
          )}
          <div className="flex w-full max-w-xs items-center justify-between border-t border-border-hairline pt-3 font-mono">
            <span className="text-sm uppercase tracking-label text-text-muted">Total</span>
            <span className="text-h4 text-text-strong">{money(Math.max(0, subtotal - (applied?.amount ?? 0)))}</span>
          </div>
          <p className="w-full max-w-xs text-right font-mono text-[10px] text-text-faint">Taxes and shipping calculated at checkout</p>
          <Button size="md" className="w-full max-w-xs">Checkout</Button>
          <a href="#" className="flex w-full max-w-xs items-center justify-center bg-[#5a31f4] px-6 py-3 font-mono text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90">Buy with Shop Pay</a>
        </div>
      </div>
    </section>
  );
}
