import { ShopifyProvider } from "@/lib/shopify-context";
import { UIProvider } from "@/lib/ui-context";
import { Overlays } from "@/lib/overlays";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import "@/lib/sections";
import indexTemplate from "@/theme/templates/index.json";

export default function PreviewPage() {
  return (
    <ShopifyProvider value={shopifyFixture}>
      <UIProvider>
        <SectionRenderer template={indexTemplate as Template} />
        <Overlays />
      </UIProvider>
    </ShopifyProvider>
  );
}
