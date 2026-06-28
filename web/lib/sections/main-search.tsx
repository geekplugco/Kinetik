"use client";

import { useMemo, useState } from "react";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";

export function MainSearch(_props: SectionProps) {
  const { products } = useShopify();
  const [query, setQuery] = useState("");
  const all = useMemo(() => Object.values(products), [products]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return all.filter((p) => `${p.title} ${p.vendor} ${p.type} ${p.tags.join(" ")}`.toLowerCase().includes(q));
  }, [all, query]);

  return (
    <section className="mx-auto max-w-[var(--page-width)] px-6 py-12">
      <h1 className="font-display text-h1 tracking-tight text-text-strong">Search</h1>
      <div className="mt-6 flex items-center gap-3 border-b border-border-strong pb-3">
        <Icon name="search" className="text-text-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          aria-label="Search products"
          className="w-full bg-transparent font-sans text-h4 text-text-strong outline-none placeholder:text-text-faint"
        />
      </div>
      {query.trim() && (
        <p className="mt-4 font-mono text-xs text-text-muted">{results.length} results for “{query}”</p>
      )}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
