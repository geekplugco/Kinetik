"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { SectionProps } from "../registry";
import { useShopify, useMoney } from "../shopify-context";
import { useUI } from "../ui-context";
import type { LinkItem, Product } from "../shopify/objects";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export function Header({ section }: SectionProps) {
  const { menus, collections } = useShopify();
  const money = useMoney();
  const ui = useUI();
  const s = section.settings;
  const menu = menus[(s.menu as string) ?? "main-menu"];
  const sticky = s.sticky_header !== false;
  const links = menu?.links ?? [];
  const mega = ((s.submenu_style as string) ?? "mega") !== "dropdown";
  const showFeatured = mega && s.show_menu_featured !== false;
  const showProducts = mega && s.show_menu_products !== false;

  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setActive(null); setMobileOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const collectionFor = (url: string) => {
    const m = /\/collections\/([\w-]+)/.exec(url || "");
    return m ? collections[m[1]] : undefined;
  };
  const productsFor = (url: string, n: number): Product[] => collectionFor(url)?.products.slice(0, n) ?? [];
  const activeLink = links.find((l) => l.title === active && l.links && l.links.length > 0);

  const megaCols = !mega
    ? ""
    : showProducts && showFeatured
      ? "lg:grid-cols-[0.8fr_1.85fr_0.9fr]"
      : showProducts
        ? "lg:grid-cols-[0.9fr_2fr]"
        : showFeatured
          ? "lg:grid-cols-[1.6fr_1fr]"
          : "";

  return (
    <header
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      className={`${sticky ? "sticky top-0 z-40" : "relative z-40"} border-b border-border-hairline bg-surface-page/90 backdrop-blur`}
    >
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="-ml-1 flex h-11 w-11 items-center justify-center text-text-strong md:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
          <Logo />
        </div>

        <nav
          aria-label="Primary"
          onMouseLeave={() => setActive(null)}
          className="hidden items-center gap-8 md:flex"
        >
          {links.map((link) => {
            const hasMega = !!(link.links && link.links.length > 0);
            return (
              <div key={link.title} onMouseEnter={() => setActive(hasMega ? link.title : null)}>
                <a
                  href={link.url}
                  aria-haspopup={hasMega || undefined}
                  aria-expanded={hasMega ? active === link.title : undefined}
                  onFocus={() => setActive(hasMega ? link.title : null)}
                  className="flex items-center gap-1.5 py-2 font-mono text-xs uppercase tracking-label text-text-body transition-colors hover:text-text-strong aria-expanded:text-text-strong"
                >
                  {link.title}
                  {hasMega && <Icon name="chevron" size={12} className={`transition-transform ${active === link.title ? "rotate-180" : ""}`} />}
                </a>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 text-text-strong">
          <button type="button" aria-label="Search" onClick={ui.openSearch} className="flex h-11 w-11 items-center justify-center hover:text-accent-press"><Icon name="search" /></button>
          {s.show_account_icon !== false && (
            <a href="/account" aria-label="Account" className="hidden h-11 w-11 items-center justify-center hover:text-accent-press md:flex"><Icon name="user" /></a>
          )}
          <button type="button" aria-label="Cart" onClick={ui.openCart} className="relative flex h-11 w-11 items-center justify-center hover:text-accent-press">
            <Icon name="cart" />
            {ui.cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center bg-accent px-1 font-mono text-[10px] text-accent-ink">{ui.cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop mega panel */}
      {activeLink && (
        <div
          onMouseEnter={() => setActive(activeLink.title)}
          onMouseLeave={() => setActive(null)}
          className={`absolute top-full hidden origin-top animate-[megaIn_.18s_ease] border-b border-border-hairline bg-surface-page shadow-[0_24px_40px_-24px_rgba(10,10,10,0.25)] md:block ${mega ? "left-0 right-0" : "left-6 w-80"}`}
        >
          <div className={`mx-auto px-6 py-10 ${mega ? `grid max-w-[var(--page-width)] gap-x-12 gap-y-8 ${megaCols}` : "w-80 px-6 py-6"}`}>
            {/* Zone 1 — sublinks */}
            <div>
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">{activeLink.title}</span>
              <ul className="mt-5 flex flex-col">
                {activeLink.links!.map((sub) => (
                  <li key={sub.title}>
                    <a href={sub.url} className="group/sub flex items-center justify-between border-b border-border-hairline py-3 font-display text-h4 text-text-strong transition-colors hover:text-accent-press">
                      {sub.title}
                      <Icon name="arrow" size={16} className="-translate-x-1 opacity-0 transition-all group-hover/sub:translate-x-0 group-hover/sub:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
              <a href={activeLink.url} className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-label text-text-body hover:text-text-strong">
                View all {activeLink.title} <Icon name="arrow" size={14} />
              </a>
            </div>

            {/* Zone 2 — featured products */}
            {showProducts && productsFor(activeLink.url, 3).length > 0 && (
              <div>
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-label text-text-muted">Featured</span>
                  <a href={activeLink.url} className="font-mono text-[11px] uppercase tracking-label text-text-body hover:text-text-strong">Shop all</a>
                </div>
                <ul className="grid grid-cols-3 gap-4">
                  {productsFor(activeLink.url, 3).map((p) => (
                    <li key={p.id}>
                      <a href={p.url} className="group/p block">
                        <div className="relative aspect-[4/5] overflow-hidden bg-surface-sunken">
                          <Image src={p.featured_image.src} alt="" fill sizes="200px" className="object-cover transition-transform duration-500 group-hover/p:scale-105" />
                          {p.badge && <span className="absolute left-2 top-2 bg-accent px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-accent-ink">{p.badge}</span>}
                        </div>
                        <span className="mt-2 block font-mono text-[10px] uppercase tracking-label text-text-muted">{p.code}</span>
                        <span className="block truncate font-sans text-sm text-text-strong">{p.title}</span>
                        <span className="font-mono text-xs text-text-muted">{money(p.price)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Zone 3 — promo tile */}
            {showFeatured && (
              <a href={activeLink.url} className="group/feat relative block aspect-[4/5] overflow-hidden bg-surface-sunken lg:aspect-auto">
                <Image
                  src={collectionFor(activeLink.url)?.featured_image?.src ?? "/uploads/onmodel/08-hero-back-wide.png"}
                  alt=""
                  fill
                  sizes="(min-width:990px) 24vw, 0px"
                  className="object-cover transition-transform duration-500 group-hover/feat:scale-105"
                />
                <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-label text-paper mix-blend-difference">The drop</span>
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-ink-950/85 px-3 py-2 font-mono text-[11px] uppercase tracking-label text-paper">
                  Shop {activeLink.title}
                  <Icon name="arrow" size={14} className="text-accent" />
                </span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-50 bg-ink-950/50 transition-opacity md:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col bg-surface-page transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-border-hairline px-5 py-4">
          <Logo />
          <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)} className="flex h-11 w-11 items-center justify-center text-text-strong"><Icon name="close" /></button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-2">
          <ul className="flex flex-col">
            {links.map((link) => {
              const hasSub = !!(link.links && link.links.length > 0);
              const open = expanded === link.title;
              const railProducts = open ? productsFor(link.url, 5) : [];
              return (
                <li key={link.title} className="border-b border-border-hairline">
                  <div className="flex items-center justify-between">
                    <a href={link.url} onClick={() => setMobileOpen(false)} className="flex-1 py-4 font-display text-h4 text-text-strong">{link.title}</a>
                    {hasSub && (
                      <button type="button" aria-label={open ? `Collapse ${link.title}` : `Expand ${link.title}`} aria-expanded={open} onClick={() => setExpanded(open ? null : link.title)} className="flex h-11 w-11 items-center justify-center text-text-strong">
                        <Icon name={open ? "minus" : "plus"} size={18} />
                      </button>
                    )}
                  </div>
                  {hasSub && open && (
                    <div className="pb-4">
                      <ul className="pl-1">
                        {link.links!.map((sub: LinkItem) => (
                          <li key={sub.title}>
                            <a href={sub.url} onClick={() => setMobileOpen(false)} className="block py-2.5 font-sans text-body text-text-body">{sub.title}</a>
                          </li>
                        ))}
                      </ul>
                      {railProducts.length > 0 && (
                        <ul className="mt-2 flex gap-3 overflow-x-auto pb-1">
                          {railProducts.map((p) => (
                            <li key={p.id} className="shrink-0">
                              <a href={p.url} onClick={() => setMobileOpen(false)} className="block w-24">
                                <div className="relative aspect-[4/5] overflow-hidden bg-surface-sunken">
                                  <Image src={p.featured_image.src} alt="" fill sizes="96px" className="object-cover" />
                                </div>
                                <span className="mt-1 block truncate font-sans text-xs text-text-body">{p.title}</span>
                                <span className="font-mono text-[11px] text-text-muted">{money(p.price)}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3 border-t border-border-hairline px-5 py-2 font-mono text-xs uppercase tracking-label text-text-body">
          <a href="/account" onClick={() => setMobileOpen(false)} className="flex h-11 items-center gap-2 px-1"><Icon name="user" size={16} /> Account</a>
          <button type="button" onClick={() => { setMobileOpen(false); ui.openSearch(); }} className="flex h-11 items-center gap-2 px-1"><Icon name="search" size={16} /> Search</button>
        </div>
      </div>
    </header>
  );
}
