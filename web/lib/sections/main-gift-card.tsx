"use client";

import type { SectionProps } from "../registry";
import { useMoney } from "../shopify-context";
import { Button } from "@/components/Button";

export function MainGiftCard(_props: SectionProps) {
  const money = useMoney();
  return (
    <section className="mx-auto max-w-[480px] px-6 py-16 text-center">
      <span className="font-mono text-xs uppercase tracking-label text-text-muted">Gift card</span>
      <div className="mt-4 flex flex-col items-center gap-4 border border-border-strong bg-surface-sunken p-8">
        <span className="font-display text-display-2 tracking-hero text-text-strong">{money(10000)}</span>
        <div className="font-mono text-sm tracking-wide text-text-body">XXXX · XXXX · XXXX · 1024</div>
      </div>
      <p className="mt-6 text-sm text-text-muted">Use this code at checkout. Never expires.</p>
      <Button className="mt-6" href="/collections/new-arrivals">Shop now</Button>
    </section>
  );
}
