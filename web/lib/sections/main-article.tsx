"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";

export function MainArticle(_props: SectionProps) {
  const { article } = useShopify();
  if (!article) return null;
  return (
    <article className="mx-auto max-w-[760px] px-6 py-12">
      <span className="font-mono text-xs uppercase tracking-label text-text-muted">{article.published_at} · {article.author}</span>
      <h1 className="mt-3 font-display text-h1 tracking-tight text-text-strong">{article.title}</h1>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-surface-sunken">
        <Image src={article.image} alt={article.title} fill sizes="760px" priority className="object-cover" />
      </div>
      <div className="prose mt-8 flex flex-col gap-4 text-body-lg text-text-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
