"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { Icon } from "@/components/Icon";

export function MainProduct({ section }: SectionProps) {
  const { product } = useShopify();
  const ui = useUI();
  const money = useMoney();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [openTabs, setOpenTabs] = useState<Record<string, boolean>>({ details: true });
  const [showSticky, setShowSticky] = useState(false);
  const atcRef = useRef<HTMLDivElement>(null);
  const sticky = section.settings.enable_sticky_info !== false;
  const stickyBar = section.settings.enable_sticky_atc !== false;

  useEffect(() => {
    const el = atcRef.current;
    if (!el || !stickyBar) return;
    const io = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { rootMargin: "-80px 0px 0px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [stickyBar]);

  if (!product) return null;
  const variant = product.variants[variantIndex] ?? product.variants[0];
  const gallery = product.images.length ? product.images : [product.featured_image];
  const colors = product.colors ?? [];
  const add = () => ui.addToCart(product, variant, qty);
  const toggle = (k: string) => setOpenTabs((o) => ({ ...o, [k]: !o[k] }));

  const tabs = [
    { key: "details", title: "Details", node: <div className="text-body text-text-body [&_p]:m-0 [&_p+p]:mt-3" dangerouslySetInnerHTML={{ __html: product.description }} /> },
    {
      key: "spec", title: "Spec sheet", node: (
        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2.5 font-mono text-xs">
          {[["Code", product.code], ["Type", product.type], ["Build", product.spec], ["Maker", product.vendor]].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="uppercase tracking-label text-text-muted">{k}</dt>
              <dd className="text-text-strong">{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { key: "care", title: "Care", node: <p className="text-body text-text-body">Machine wash cold, hang dry. Do not bleach or tumble dry. Re-proof technical shells with a DWR wash-in to restore water repellency.</p> },
    { key: "shipping", title: "Shipping & returns", node: <p className="text-body text-text-body">Free carbon-neutral shipping over $150. 60-day returns on unworn items. Lifetime warranty on every seam.</p> },
  ];

  return (
    <>
      <section className="mx-auto grid max-w-[var(--page-width)] gap-10 px-6 py-12 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          {gallery.map((img, i) => (
            <div key={img.id ?? i} className="relative aspect-[4/5] overflow-hidden bg-surface-sunken">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width:990px) 50vw, 100vw" priority={i === 0} className="object-cover" />
            </div>
          ))}
        </div>

        <div className={sticky ? "md:sticky md:top-24 md:self-start" : ""}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">{product.vendor} · {product.code}</span>
              <h1 className="font-display text-h1 tracking-tight text-text-strong">{product.title}</h1>
              <Price price={variant.price} compareAt={variant.compare_at_price} className="text-body-lg" />
            </div>

            {colors.length > 1 ? (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-label text-text-muted">Color — {colors[variantIndex]?.name ?? variant.title}</span>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      aria-pressed={i === variantIndex}
                      onClick={() => setVariantIndex(i)}
                      className={`h-9 w-9 rounded-full border transition-transform hover:scale-110 ${i === variantIndex ? "border-transparent ring-2 ring-text-strong ring-offset-2 ring-offset-surface-page" : "border-border-hairline"}`}
                      style={{ backgroundColor: c.swatch }}
                    />
                  ))}
                </div>
              </div>
            ) : product.variants.length > 1 ? (
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button key={v.id} type="button" onClick={() => setVariantIndex(i)} className={`border px-4 py-2 font-mono text-xs uppercase tracking-wide ${i === variantIndex ? "border-border-strong bg-surface-sunken text-text-strong" : "border-border-hairline text-text-muted"}`}>{v.title}</button>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border-strong">
                <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-text-strong">−</button>
                <span className="w-8 text-center font-mono text-sm">{qty}</span>
                <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="flex h-11 w-11 items-center justify-center text-text-strong">+</button>
              </div>
              {variant.available ? <Tag tone="accent">In stock</Tag> : <Tag>Sold out</Tag>}
            </div>

            <div ref={atcRef} className="flex flex-col gap-3">
              <Button size="md" disabled={!variant.available} className="w-full" onClick={add}>
                {variant.available ? "Add to cart" : "Sold out"}
              </Button>
              <a href="#" className="flex w-full items-center justify-center gap-2 bg-[#5a31f4] px-6 py-3 font-mono text-sm uppercase tracking-wide text-white transition-opacity hover:opacity-90">Buy with Shop Pay</a>
            </div>

            <p className="text-center font-mono text-xs text-text-muted">
              Pay in 4 interest-free payments of {money(Math.round(variant.price / 4))} with Shop Pay.{" "}
              <a href="#" className="underline underline-offset-2 hover:text-text-strong">Learn more</a>
            </p>

            <div className="flex items-start gap-2 border border-border-hairline p-4 text-sm text-text-body">
              <Icon name="user" size={18} className="mt-0.5 text-positive" />
              <span><strong className="text-text-strong">Pickup available</strong> at Waypoint Studio · Usually ready in 24 hours</span>
            </div>

            {/* Spec-sheet collapsible tabs (forked from Hyper product-collapsible-tab) */}
            <div className="border-t border-border-hairline">
              {tabs.map((t) => (
                <div key={t.key} className="border-b border-border-hairline">
                  <button type="button" aria-expanded={!!openTabs[t.key]} onClick={() => toggle(t.key)} className="flex w-full items-center justify-between py-4 font-mono text-xs uppercase tracking-label text-text-strong">
                    {t.title}
                    <Icon name={openTabs[t.key] ? "minus" : "plus"} size={16} />
                  </button>
                  {openTabs[t.key] && <div className="pb-5">{t.node}</div>}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-label text-text-muted">
              <span>Share</span>
              {["Copy link", "Facebook", "Pinterest", "X"].map((p) => (
                <button key={p} type="button" className="hover:text-text-strong">{p}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky add-to-cart bar (forked from Hyper sticky-atc-bar — mobile-first) */}
      {stickyBar && (
        <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-border-hairline bg-surface-page/95 backdrop-blur transition-transform duration-300 ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
          <div className="mx-auto flex max-w-[var(--page-width)] items-center gap-3 px-4 py-3 md:px-6">
            <div className="relative hidden h-12 w-10 shrink-0 overflow-hidden bg-surface-sunken sm:block">
              <Image src={product.featured_image.src} alt="" fill sizes="40px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-sm text-text-strong">{product.title}</p>
              <Price price={variant.price} compareAt={variant.compare_at_price} className="text-xs" />
            </div>
            {product.variants.length > 1 && (
              <select
                aria-label="Variant"
                value={variantIndex}
                onChange={(e) => setVariantIndex(Number(e.target.value))}
                className="hidden h-11 max-w-[8rem] border border-border-strong bg-surface-page px-2 font-mono text-xs uppercase tracking-wide text-text-strong sm:block"
              >
                {product.variants.map((v, i) => <option key={v.id} value={i}>{v.title}</option>)}
              </select>
            )}
            <Button size="sm" disabled={!variant.available} className="shrink-0" onClick={add}>
              {variant.available ? "Add to cart" : "Sold out"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
