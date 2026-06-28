import { notFound } from "next/navigation";
import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture, productsByHandle, products } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import productTemplate from "@/theme/templates/product.json";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = productsByHandle[handle];
  if (!product) notFound();
  return (
    <ThemeShell context={{ ...shopifyFixture, product }}>
      <SectionRenderer template={productTemplate as Template} />
    </ThemeShell>
  );
}
