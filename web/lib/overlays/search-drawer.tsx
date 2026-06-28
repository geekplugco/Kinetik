"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useUI } from "./shared";
import { useShopify, useMoney } from "../shopify-context";
import { Icon } from "@/components/Icon";

export function SearchDrawer() {
  const ui = useUI();
  const { products } = useShopify();
  const money = useMoney();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.values(products)
      .filter((p) => `${p.title} ${p.vendor} ${p.type}`.toLowerCase().includes(q))
      .slice(0, 6);
  }, [products, query]);

  return (
    <>
      <div onClick={ui.closeSearch} className={`fixed inset-0 z-50 bg-ink-950/50 transition-opacity ${ui.searchOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label="Search" className={`fixed inset-x-0 top-0 z-50 bg-surface-page shadow-xl transition-transform duration-300 ${ui.searchOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto max-w-[900px] px-6 py-6">
          <div className="flex items-center gap-3 border-b border-border-strong pb-3">
            <Icon name="search" className="text-text-muted" />
            <input autoFocus={ui.searchOpen} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" aria-label="Search" className="w-full bg-transparent font-sans text-h4 text-text-strong outline-none placeholder:text-text-faint" />
            <button type="button" aria-label="Close" onClick={ui.closeSearch} className="text-text-strong hover:text-accent-press"><Icon name="close" /></button>
          </div>
          {results.length > 0 && (
            <ul className="mt-4 divide-y divide-border-hairline">
              {results.map((p) => (
                <li key={p.id}>
                  <a href={p.url} onClick={ui.closeSearch} className="flex items-center gap-4 py-3 hover:bg-surface-sunken">
                    <div className="relative h-14 w-12 shrink-0 overflow-hidden bg-surface-sunken"><Image src={p.featured_image.src} alt={p.featured_image.alt} fill sizes="48px" className="object-cover" /></div>
                    <span className="flex-1 font-sans text-body text-text-strong">{p.title}</span>
                    <span className="font-mono text-sm text-text-muted">{money(p.price)}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {query.trim() && results.length === 0 && <p className="mt-4 font-mono text-xs text-text-muted">No results for “{query}”.</p>}
        </div>
      </div>
    </>
  );
}
