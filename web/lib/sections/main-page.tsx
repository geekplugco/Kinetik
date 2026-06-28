"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";

export function MainPage(_props: SectionProps) {
  const { page } = useShopify();
  if (!page) return null;
  return (
    <section className="mx-auto max-w-[760px] px-6 py-16">
      <h1 className="font-display text-h1 tracking-tight text-text-strong">{page.title}</h1>
      <div className="mt-8 flex flex-col gap-4 text-body-lg text-text-body" dangerouslySetInnerHTML={{ __html: page.content }} />
    </section>
  );
}
