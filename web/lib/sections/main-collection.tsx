"use client";

import { useMemo, useState } from "react";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { ProductCard } from "@/components/ProductCard";
import { Tag } from "@/components/Tag";

type Sort = "featured" | "price-asc" | "price-desc" | "title";

export function MainCollection({ section }: SectionProps) {
  const { collection, collections } = useShopify();
  const active = collection ?? Object.values(collections)[0];
  const [type, setType] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const types = useMemo(() => ["all", ...new Set(active.products.map((p) => p.type))], [active]);
  const products = useMemo(() => {
    let list = active.products.filter((p) => type === "all" || p.type === type);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [active, type, sort]);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <header className="flex flex-col gap-2 border-b border-border-hairline pb-8">
        <span className="font-mono text-xs uppercase tracking-label text-text-muted">Collection</span>
        <h1 className="font-display text-h1 tracking-tight text-text-strong">{active.title}</h1>
        {active.description && <p className="max-w-prose text-body text-text-muted">{active.description}</p>}
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <div className="flex flex-wrap items-center gap-2">
          {types.map((tType) => (
            <button key={tType} type="button" onClick={() => setType(tType)} className="cursor-pointer">
              <Tag tone={tType === type ? "accent" : "default"}>{tType}</Tag>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-label text-text-muted">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-border-strong bg-surface-page px-3 py-2 text-text-strong">
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="title">A–Z</option>
          </select>
        </label>
      </div>

      <p className="mb-6 font-mono text-xs text-text-muted">{products.length} products</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
