"use client";

import Image from "next/image";
import { useUI, useMoneyFromUI } from "./shared";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export function CartDrawer() {
  const ui = useUI();
  const money = useMoneyFromUI();
  const threshold = 15000;
  const remaining = Math.max(0, threshold - ui.cartTotal);
  const progress = Math.min(100, (ui.cartTotal / threshold) * 100);

  return (
    <>
      <div
        onClick={ui.closeCart}
        className={`fixed inset-0 z-50 bg-ink-950/50 transition-opacity ${ui.cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label="Cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface-page shadow-xl transition-transform duration-300 ${ui.cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-border-hairline px-6 py-4">
          <span className="font-mono text-xs uppercase tracking-label text-text-strong">Cart · {ui.cartCount}</span>
          <button type="button" aria-label="Close" onClick={ui.closeCart} className="text-text-strong hover:text-accent-press"><Icon name="close" /></button>
        </header>

        {ui.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-text-muted">Your cart is empty.</p>
            <Button href="/collections/new-arrivals" onClick={ui.closeCart}>Shop now</Button>
          </div>
        ) : (
          <>
            <div className="border-b border-border-hairline px-6 py-3">
              <p className="font-mono text-xs uppercase tracking-label text-text-muted">
                {remaining > 0 ? `${money(remaining)} to free shipping` : "Free shipping unlocked"}
              </p>
              <div className="mt-2 h-1 w-full bg-surface-sunken"><div className="h-full bg-accent" style={{ width: `${progress}%` }} /></div>
            </div>
            <ul className="flex-1 divide-y divide-border-hairline overflow-y-auto px-6">
              {ui.lines.map((l) => (
                <li key={l.id} className="flex gap-3 py-4">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-surface-sunken">
                    <Image src={l.product.featured_image.src} alt={l.product.featured_image.alt} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="font-sans text-sm text-text-strong">{l.product.title}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border-strong">
                        <button type="button" aria-label="Decrease" onClick={() => ui.updateQty(l.id, l.quantity - 1)} className="px-2 py-1 text-text-strong">−</button>
                        <span className="w-6 text-center font-mono text-xs">{l.quantity}</span>
                        <button type="button" aria-label="Increase" onClick={() => ui.updateQty(l.id, l.quantity + 1)} className="px-2 py-1 text-text-strong">+</button>
                      </div>
                      <span className="font-mono text-sm text-text-strong">{money(l.line_price)}</span>
                    </div>
                  </div>
                  <button type="button" aria-label="Remove" onClick={() => ui.removeLine(l.id)} className="self-start text-text-muted hover:text-negative"><Icon name="close" size={16} /></button>
                </li>
              ))}
            </ul>
            <footer className="border-t border-border-strong px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-label text-text-muted">Subtotal</span>
                <span className="font-mono text-h4 text-text-strong">{money(ui.cartTotal)}</span>
              </div>
              <Button className="w-full">Checkout</Button>
              <a href="#" className="mt-2 flex w-full items-center justify-center bg-[#5a31f4] px-6 py-3 font-mono text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90">Buy with Shop Pay</a>
              <a href="/cart" onClick={ui.closeCart} className="mt-3 block text-center font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">View cart</a>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
