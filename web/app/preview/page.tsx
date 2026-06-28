import { SectionRenderer } from "@/lib/section-renderer";
import { ShopifyProvider } from "@/lib/shopify-context";
import { shopifyFixture } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import "@/lib/sections";
import indexTemplate from "@/theme/templates/index.json";

export default function PreviewPage() {
  const template = indexTemplate as Template;
  const { collections, products, cart } = shopifyFixture;
  return (
    <ShopifyProvider value={shopifyFixture}>
      <SectionRenderer template={template} />
      <section className="mx-auto max-w-[1200px] px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-label text-text-muted">
          fixtures: {Object.keys(products).length} products · {Object.keys(collections).length} collection ·
          cart {cart.item_count} items
        </p>
      </section>
    </ShopifyProvider>
  );
}
