"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ShopifyContextValue } from "./shopify/objects";
import { money as formatMoney, t as translate } from "./shopify/filters";

const ShopifyCtx = createContext<ShopifyContextValue | null>(null);

export function ShopifyProvider({ value, children }: { value: ShopifyContextValue; children: ReactNode }) {
  return <ShopifyCtx.Provider value={value}>{children}</ShopifyCtx.Provider>;
}

export function useShopify(): ShopifyContextValue {
  const ctx = useContext(ShopifyCtx);
  if (!ctx) throw new Error("useShopify must be used within a ShopifyProvider");
  return ctx;
}

export function useMoney() {
  const { shop, locale } = useShopify();
  return (cents: number) => formatMoney(cents, { currency: shop.currency, locale });
}

export function useTranslate() {
  const { translations } = useShopify();
  return (key: string, fallback?: string) => translate(translations, key, fallback);
}
