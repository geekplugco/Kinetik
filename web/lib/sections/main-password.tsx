"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";

export function MainPassword(_props: SectionProps) {
  const { shop } = useShopify();
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink-950 px-6 text-center text-paper">
      <Logo className="text-paper" />
      <h1 className="max-w-2xl font-display text-fluid-h1 tracking-hero">Something is coming.</h1>
      <p className="font-mono text-xs uppercase tracking-label text-paper/60">{shop.name} opens soon</p>
      <form className="mt-2 flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
        <input type="password" placeholder="Password" aria-label="Store password" className="min-w-0 flex-1 border border-paper/40 bg-transparent px-4 py-3 font-mono text-sm text-paper placeholder:text-paper/50" />
        <Button type="submit">Enter</Button>
      </form>
    </section>
  );
}
