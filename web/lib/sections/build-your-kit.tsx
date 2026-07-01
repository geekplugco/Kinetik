"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import type { Product } from "../shopify/objects";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

type Slot = { key: string; label: string; types: string[] };

const DEFAULT_SLOTS: Slot[] = [
  { key: "shell", label: "Shell", types: ["Outerwear"] },
  { key: "layer", label: "Layer", types: ["Tops"] },
  { key: "bottom", label: "Bottom", types: ["Bottoms"] },
  { key: "footwear", label: "Footwear", types: ["Footwear"] },
  { key: "carry", label: "Carry", types: ["Bags"] },
  { key: "gear", label: "Gear", types: ["Accessories", "Audio", "Tech", "Wearables"] },
];

export function BuildYourKit({ section }: SectionProps) {
  const s = section.settings;
  const { products } = useShopify();
  const money = useMoney();
  const ui = useUI();

  const slotBlocks = section.blocks.filter((b) => b.type === "slot");
  const slots: Slot[] = slotBlocks.length
    ? slotBlocks.map((b, i) => ({
        key: b.id || `slot-${i}`,
        label: (b.settings.label as string) ?? `Slot ${i + 1}`,
        types: String(b.settings.types ?? "").split(",").map((t) => t.trim()).filter(Boolean),
      }))
    : DEFAULT_SLOTS;

  const all = useMemo(() => Object.values(products), [products]);
  const optionsBySlot = useMemo(
    () => slots.map((slot) => all.filter((p) => slot.types.includes(p.type))),
    [slots, all],
  );

  const [selected, setSelected] = useState<Record<string, string | null>>({});
  const discountPct = typeof s.bundle_discount === "number" ? s.bundle_discount : 10;
  const minForDiscount = typeof s.min_pieces === "number" ? s.min_pieces : 3;

  const kit = slots
    .map((slot) => (selected[slot.key] ? products[selected[slot.key] as string] : null))
    .filter(Boolean) as Product[];
  const subtotal = kit.reduce((sum, p) => sum + p.price, 0);
  const discountActive = kit.length >= minForDiscount && discountPct > 0;
  const discount = discountActive ? Math.round(subtotal * (discountPct / 100)) : 0;
  const total = subtotal - discount;

  const pick = (slotKey: string, handle: string) =>
    setSelected((prev) => ({ ...prev, [slotKey]: prev[slotKey] === handle ? null : handle }));

  const addKit = () => {
    kit.forEach((p) => ui.addToCart(p, p.variants[0], 1));
    if (kit.length) ui.openCart();
  };

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="border-y border-border-hairline bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className="mx-auto max-w-[var(--page-width)] px-6">
        <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.kicker as string) ?? "The system"}</span>
            <h2 className="mt-3 font-display text-display-2 uppercase text-text-strong">{(s.heading as string) ?? "Build your kit"}</h2>
          </div>
          {typeof s.text === "string" && s.text && (
            <div className="max-w-sm text-body text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          {/* Slots */}
          <ol className="flex min-w-0 flex-col">
            {slots.map((slot, i) => {
              const opts = optionsBySlot[i];
              if (!opts.length) return null;
              const chosen = selected[slot.key];
              return (
                <li key={slot.key} className="border-t border-border-hairline py-6 first:border-t-0 first:pt-0">
                  <div className="mb-4 flex items-baseline gap-3">
                    <span className="font-mono text-sm tabular-nums text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-xs uppercase tracking-label text-text-strong">{slot.label}</span>
                    <span className="font-mono text-[11px] uppercase tracking-label text-text-muted">{chosen ? products[chosen]?.title : "Optional"}</span>
                  </div>
                  <ul className="flex gap-3 overflow-x-auto pb-2">
                    {opts.map((p) => {
                      const active = chosen === p.handle;
                      return (
                        <li key={p.id} className="shrink-0">
                          <button
                            type="button"
                            onClick={() => pick(slot.key, p.handle)}
                            aria-pressed={active}
                            className={`group/opt block w-32 border text-left transition-colors ${active ? "border-border-strong" : "border-border-hairline hover:border-border-strong"}`}
                          >
                            <div className="relative aspect-[4/5] overflow-hidden bg-surface-sunken">
                              <Image src={p.featured_image.src} alt="" fill sizes="128px" className="object-cover" />
                              <span className={`absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center transition-colors ${active ? "bg-accent text-accent-ink" : "bg-surface-page/80 text-text-muted"}`}>
                                <Icon name={active ? "close" : "plus"} size={12} />
                              </span>
                            </div>
                            <div className="flex flex-col gap-0.5 p-2">
                              <span className="truncate font-sans text-xs text-text-strong">{p.title}</span>
                              <span className="font-mono text-[11px] text-text-muted">{money(p.price)}</span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ol>

          {/* Kit summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border-strong bg-surface-card p-5">
              <div className="flex items-center justify-between border-b border-border-hairline pb-3">
                <span className="font-mono text-xs uppercase tracking-label text-text-strong">Your kit</span>
                <span className="font-mono text-xs tabular-nums text-text-muted">{kit.length} {kit.length === 1 ? "piece" : "pieces"}</span>
              </div>

              {kit.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">Select pieces to build your kit.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-border-hairline">
                  {kit.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 py-3">
                      <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-surface-sunken">
                        <Image src={p.featured_image.src} alt="" fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="min-w-0 flex-1 truncate font-sans text-sm text-text-strong">{p.title}</span>
                      <span className="font-mono text-sm text-text-muted">{money(p.price)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-3 flex flex-col gap-1.5 border-t border-border-hairline pt-3 font-mono text-xs">
                <div className="flex justify-between text-text-muted"><span>Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></div>
                <div className={`flex justify-between ${discountActive ? "text-text-strong" : "text-text-muted"}`}>
                  <span>Kit discount −{discountPct}%{!discountActive && ` (${minForDiscount}+ pieces)`}</span>
                  <span className="tabular-nums">−{money(discount)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-border-hairline pt-2 text-base text-text-strong"><span className="uppercase tracking-label">Total</span><span className="tabular-nums">{money(total)}</span></div>
              </div>

              <Button className="mt-4 w-full" disabled={kit.length === 0} onClick={addKit}>
                Add kit to cart <Icon name="arrow" size={15} />
              </Button>
              <p className="mt-2 text-center font-mono text-[11px] text-text-muted">Mix any pieces. Discount applies at {minForDiscount}+.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
