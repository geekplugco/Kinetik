"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

const widthMap: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-4xl",
};

const ratioMap: Record<string, string> = {
  "3-2": "aspect-[3/2]",
  "1-1": "aspect-square",
  "4-3": "aspect-[4/3]",
  "16-9": "aspect-video",
};

export function BlogPosts({ section }: SectionProps) {
  const { articles } = useShopify();
  const s = section.settings;
  const limit = typeof s.posts_to_show === "number" ? s.posts_to_show : 3;
  const posts = articles.slice(0, limit);
  const width = widthMap[(s.width as string) ?? "page"] ?? widthMap.page;
  const cardStyle = (s.card_style as string) ?? "minimal";
  const ratio = ratioMap[(s.image_ratio as string) ?? "3-2"] ?? ratioMap["3-2"];
  const overlay = cardStyle === "overlay";
  const bordered = cardStyle === "bordered";

  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]">
      <div className={`mx-auto ${width} px-6`}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{(s.heading as string) ?? "Journal"}</h2>
          {((s.show_view_all as boolean) ?? true) && <Button href="/blog" variant="link" size="sm">All posts</Button>}
        </div>
        <div className="grid grid-cols-[repeat(var(--cols-mobile,1),minmax(0,1fr))] gap-8 lg:grid-cols-[repeat(var(--cols-desktop,3),minmax(0,1fr))]">
          {posts.map((a) =>
            overlay ? (
              <a key={a.id} href={a.url} className={`group relative flex flex-col justify-end overflow-hidden ${ratio} bg-surface-sunken`}>
                <Image src={a.image} alt={a.title} fill sizes="(min-width:990px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                <div className="relative flex flex-col gap-2 p-5 text-paper">
                  <span className="font-mono text-xs uppercase tracking-label text-paper/70">{a.published_at}</span>
                  <span className="font-display text-h4 tracking-tight">{a.title}</span>
                </div>
              </a>
            ) : (
              <article key={a.id} className={`group flex flex-col gap-3 ${bordered ? "border border-border-hairline p-4" : ""}`}>
                <a href={a.url} className={`relative block ${ratio} overflow-hidden bg-surface-sunken`}>
                  <Image src={a.image} alt={a.title} fill sizes="(min-width:990px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </a>
                <span className="font-mono text-xs uppercase tracking-label text-text-muted">{a.published_at}</span>
                <a href={a.url} className="font-display text-h4 tracking-tight text-text-strong hover:text-accent-press">{a.title}</a>
                {((s.show_excerpt as boolean) ?? true) && <p className="text-sm text-text-muted">{a.excerpt}</p>}
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
