"use client";

import { useMoney } from "@/lib/shopify-context";

export function Price({ price, compareAt, className = "" }: { price: number; compareAt?: number; className?: string }) {
  const money = useMoney();
  const onSale = typeof compareAt === "number" && compareAt > price;
  return (
    <span className={`flex items-baseline gap-2 font-mono text-sm ${className}`}>
      <span className="text-text-strong">{money(price)}</span>
      {onSale && <s className="text-text-muted">{money(compareAt!)}</s>}
    </span>
  );
}
