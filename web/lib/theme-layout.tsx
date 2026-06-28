import type { ReactNode } from "react";
import { SectionRenderer } from "./section-renderer";
import { ShopifyProvider } from "./shopify-context";
import { shopifyFixture } from "./shopify/fixtures";
import type { SectionGroup } from "./types";
import "./sections";
import headerGroup from "@/theme/sections/header-group.json";
import footerGroup from "@/theme/sections/footer-group.json";

export function ThemeShell({ children }: { children: ReactNode }) {
  return (
    <ShopifyProvider value={shopifyFixture}>
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <SectionRenderer template={headerGroup as SectionGroup} />
      <main id="main">{children}</main>
      <SectionRenderer template={footerGroup as SectionGroup} />
    </ShopifyProvider>
  );
}
