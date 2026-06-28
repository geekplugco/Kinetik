"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";

export function MainBlog(_props: SectionProps) {
  const { articles } = useShopify();
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="font-display text-h1 tracking-tight text-text-strong">Journal</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {articles.map((a) => (
          <article key={a.id} className="group flex flex-col gap-3">
            <a href={a.url} className="relative block aspect-[3/2] overflow-hidden bg-surface-sunken">
              <Image src={a.image} alt={a.title} fill sizes="(min-width:750px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </a>
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{a.published_at} · {a.author}</span>
            <a href={a.url} className="font-display text-h4 tracking-tight text-text-strong hover:text-accent-press">{a.title}</a>
            <p className="text-sm text-text-muted">{a.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
