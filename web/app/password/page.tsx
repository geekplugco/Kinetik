import { ShopifyProvider } from "@/lib/shopify-context";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture } from "@/lib/shopify/fixtures";
import "@/lib/sections";
import type { Template } from "@/lib/types";
import passwordTemplate from "@/theme/templates/password.json";

export default function PasswordPage() {
  return (
    <ShopifyProvider value={shopifyFixture}>
      <SectionRenderer template={passwordTemplate as Template} />
    </ShopifyProvider>
  );
}
