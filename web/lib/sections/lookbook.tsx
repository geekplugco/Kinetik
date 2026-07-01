"use client";

import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import type { Product } from "../shopify/objects";
import { Icon } from "@/components/Icon";

const RATIO: Record<string, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

const WIDTH: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-4xl",
};

type Hotspot = { product: Product; x: number; y: number };

export function Lookbook({ section }: SectionProps) {
  const s = section.settings;
  const products = useShopify().products;
  const money = useMoney();
  const ui = useUI();
  const shots = section.blocks.filter((b) => b.type === "shot");
  const ratio = RATIO[(s.image_ratio as string) ?? "portrait"] ?? RATIO.portrait;
  const grid = ((s.layout as string) ?? "single") === "grid";

  const hotspotsFor = (settings: Record<string, unknown>): Hotspot[] => {
    const out: Hotspot[] = [];
    for (let i = 1; i <= 4; i++) {
      const handle = settings[`product_${i}`] as string | undefined;
      const product = handle ? products[handle] : undefined;
      if (product) out.push({ product, x: Number(settings[`x_${i}`] ?? 50), y: Number(settings[`y_${i}`] ?? 50) });
    }
    return out;
  };

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]"
    >
      <div className={`mx-auto ${WIDTH[(s.width as string) ?? "page"] ?? WIDTH.page} px-6`}>
        <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.kicker as string) ?? "Lookbook"}</span>
            {typeof s.heading === "string" && s.heading && (
              <h2 className="mt-3 font-display text-display-2 uppercase text-text-strong">{s.heading}</h2>
            )}
          </div>
          {typeof s.text === "string" && s.text && (
            <div className="max-w-sm text-body text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.text }} />
          )}
        </div>

        <div className={grid ? "grid gap-6 md:grid-cols-2" : "flex flex-col gap-16 md:gap-24"}>
          {shots.map((b) => {
            const hotspots = hotspotsFor(b.settings as Record<string, unknown>);
            const caption = b.settings.caption as string | undefined;
            return (
              <figure key={b.id} className="flex flex-col">
                <div className={`relative ${ratio} w-full overflow-hidden bg-surface-sunken`}>
                  <Image
                    src={(b.settings.image as string) ?? "/uploads/onmodel/08-hero-back-wide.png"}
                    alt={(b.settings.image_alt as string) ?? ""}
                    fill
                    sizes={grid ? "(min-width:750px) 50vw, 100vw" : "(min-width:990px) 80vw, 100vw"}
                    className="object-cover"
                  />
                  {hotspots.map((h, i) => (
                    <div
                      key={i}
                      className="group/hs absolute z-10 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    >
                      <button
                        type="button"
                        aria-label={`Shop ${h.product.title}`}
                        className="relative flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink-950 shadow-[0_2px_10px_rgba(10,10,10,0.35)] outline-none ring-accent transition-transform hover:scale-110 focus-visible:ring-2"
                      >
                        <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" aria-hidden />
                        <Icon name="plus" size={14} />
                      </button>
                      <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-56 -translate-x-1/2 translate-y-1 border border-border-hairline bg-surface-page p-3 opacity-0 shadow-xl transition-all duration-200 group-hover/hs:pointer-events-auto group-hover/hs:translate-y-0 group-hover/hs:opacity-100 group-focus-within/hs:pointer-events-auto group-focus-within/hs:translate-y-0 group-focus-within/hs:opacity-100">
                        <a href={h.product.url} className="flex gap-3">
                          <span className="relative block h-16 w-14 shrink-0 overflow-hidden bg-surface-sunken">
                            <Image src={h.product.featured_image.src} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="font-mono text-[10px] uppercase tracking-label text-text-muted">{h.product.code}</span>
                            <span className="truncate font-sans text-sm text-text-strong">{h.product.title}</span>
                            <span className="font-mono text-sm text-text-strong">{money(h.product.price)}</span>
                          </span>
                        </a>
                        <button
                          type="button"
                          onClick={() => { ui.addToCart(h.product, h.product.variants[0], 1); ui.openCart(); }}
                          className="mt-3 flex w-full items-center justify-center gap-2 bg-accent px-3 py-2 font-mono text-[11px] uppercase tracking-label text-accent-ink transition-colors hover:bg-accent-hover"
                        >
                          Add to cart <Icon name="arrow" size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile-first shoppable rail */}
                {hotspots.length > 0 && (
                  <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 md:hidden">
                    {hotspots.map((h, i) => (
                      <li key={i} className="shrink-0">
                        <a href={h.product.url} className="flex w-44 items-center gap-3 border border-border-hairline p-2">
                          <span className="relative block h-14 w-12 shrink-0 overflow-hidden bg-surface-sunken">
                            <Image src={h.product.featured_image.src} alt="" fill sizes="48px" className="object-cover" />
                          </span>
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate font-sans text-sm text-text-strong">{h.product.title}</span>
                            <span className="font-mono text-xs text-text-muted">{money(h.product.price)}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {caption && (
                  <figcaption className="mt-4 font-mono text-xs uppercase tracking-label text-text-muted">{caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
