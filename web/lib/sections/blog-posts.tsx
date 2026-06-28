"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

export function BlogPosts({ section }: SectionProps) {
  const { articles } = useShopify();
  const s = section.settings;
  const limit = typeof s.posts_to_show === "number" ? s.posts_to_show : 3;
  const posts = articles.slice(0, limit);
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle({ padding_top: 64, padding_bottom: 64, ...s })} className="bg-surface-page pt-[var(--pt,64px)] pb-[var(--pb,64px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-h2 tracking-tight text-text-strong">{(s.heading as string) ?? "Journal"}</h2>
          <Button href="/blog" variant="link" size="sm">All posts</Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((a) => (
            <article key={a.id} className="group flex flex-col gap-3">
              <a href={a.url} className="relative block aspect-[3/2] overflow-hidden bg-surface-sunken">
                <Image src={a.image} alt={a.title} fill sizes="(min-width:750px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </a>
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">{a.published_at}</span>
              <a href={a.url} className="font-display text-h4 tracking-tight text-text-strong hover:text-accent-press">{a.title}</a>
              <p className="text-sm text-text-muted">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
