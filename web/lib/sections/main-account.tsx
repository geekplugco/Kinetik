"use client";

import { useState } from "react";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { useMoney } from "../shopify-context";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";

export function MainAccount(_props: SectionProps) {
  const { shop } = useShopify();
  const money = useMoney();
  const [signedIn, setSignedIn] = useState(false);
  const field = "border border-border-strong bg-surface-page px-4 py-3 font-sans text-body text-text-strong placeholder:text-text-faint";

  if (!signedIn) {
    return (
      <section className="mx-auto max-w-[420px] px-6 py-16">
        <h1 className="font-display text-h1 tracking-tight text-text-strong">Sign in</h1>
        <form className="mt-8 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }}>
          <input type="email" required placeholder="Email" aria-label="Email" className={field} />
          <input type="password" required placeholder="Password" aria-label="Password" className={field} />
          <Button type="submit">Sign in</Button>
          <a href="#" className="font-mono text-xs uppercase tracking-label text-text-muted hover:text-text-strong">Create account</a>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[900px] px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-h1 tracking-tight text-text-strong">Account</h1>
        <Button variant="link" size="sm" onClick={() => setSignedIn(false)}>Sign out</Button>
      </div>
      <h2 className="mt-10 font-mono text-xs uppercase tracking-label text-text-muted">Order history</h2>
      <table className="mt-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-strong font-mono text-xs uppercase tracking-label text-text-muted">
            <th className="py-3">Order</th><th>Date</th><th>Status</th><th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border-hairline text-text-body">
            <td className="py-4 font-mono">#1024</td><td>2026-05-02</td><td><Tag tone="accent">Fulfilled</Tag></td><td className="text-right font-mono">{money(38800)}</td>
          </tr>
          <tr className="border-b border-border-hairline text-text-body">
            <td className="py-4 font-mono">#1019</td><td>2026-04-18</td><td><Tag>Delivered</Tag></td><td className="text-right font-mono">{money(14000)}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-8 font-mono text-xs text-text-muted">Signed in to {shop.name}.</p>
    </section>
  );
}
