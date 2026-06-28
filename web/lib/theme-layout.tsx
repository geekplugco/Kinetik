import type { ReactNode } from "react";
import { SectionRenderer } from "./section-renderer";
import { ShopifyProvider } from "./shopify-context";
import { UIProvider } from "./ui-context";
import { Overlays } from "./overlays";
import { shopifyFixture } from "./shopify/fixtures";
import type { SectionGroup } from "./types";
import type { ShopifyContextValue } from "./shopify/objects";
import "./sections";
import headerGroup from "@/theme/sections/header-group.json";
import footerGroup from "@/theme/sections/footer-group.json";

export function ThemeShell({ children, context = shopifyFixture }: { children: ReactNode; context?: ShopifyContextValue }) {
  return (
    <ShopifyProvider value={context}>
      <UIProvider>
        <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
        <SectionRenderer template={headerGroup as SectionGroup} />
        <main id="main">{children}</main>
        <SectionRenderer template={footerGroup as SectionGroup} />
        <Overlays />
      </UIProvider>
    </ShopifyProvider>
  );
}
