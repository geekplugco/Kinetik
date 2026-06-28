import { notFound } from "next/navigation";
import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture, articles } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import articleTemplate from "@/theme/templates/article.json";

export function generateStaticParams() {
  return articles.map((a) => ({ handle: a.handle }));
}

export default async function ArticlePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const article = articles.find((a) => a.handle === handle);
  if (!article) notFound();
  return (
    <ThemeShell context={{ ...shopifyFixture, article }}>
      <SectionRenderer template={articleTemplate as Template} />
    </ThemeShell>
  );
}
