import { notFound } from "next/navigation";
import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture, collectionsByHandle } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import collectionTemplate from "@/theme/templates/collection.json";

export function generateStaticParams() {
  return Object.keys(collectionsByHandle).map((handle) => ({ handle }));
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = collectionsByHandle[handle];
  if (!collection) notFound();
  return (
    <ThemeShell context={{ ...shopifyFixture, collection }}>
      <SectionRenderer template={collectionTemplate as Template} />
    </ThemeShell>
  );
}
