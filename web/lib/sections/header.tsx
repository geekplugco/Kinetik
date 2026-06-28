"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { useUI } from "../ui-context";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export function Header({ section }: SectionProps) {
  const { menus } = useShopify();
  const ui = useUI();
  const handle = (section.settings.menu as string) ?? "main-menu";
  const menu = menus[handle];
  const sticky = section.settings.sticky_header !== false;
  return (
    <header
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"}
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-border-hairline bg-surface-page/90 backdrop-blur`}
    >
      <div className="mx-auto flex max-w-[var(--page-width)] items-center justify-between gap-6 px-6 py-4">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {menu?.links.map((link) => (
            <div key={link.title} className="group relative">
              <a href={link.url} className="flex items-center gap-1 py-2 font-mono text-xs uppercase tracking-label text-text-body hover:text-text-strong">
                {link.title}
              </a>
              {link.links && link.links.length > 0 && (
                <div className="invisible absolute left-0 top-full z-50 min-w-48 border border-border-hairline bg-surface-page opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <ul className="flex flex-col py-2">
                    {link.links.map((sub) => (
                      <li key={sub.title}>
                        <a href={sub.url} className="block px-4 py-2 font-sans text-sm text-text-body hover:bg-surface-sunken hover:text-text-strong">
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-text-strong">
          <button type="button" aria-label="Search" onClick={ui.openSearch} className="hover:text-accent-press"><Icon name="search" /></button>
          <a href="/account" aria-label="Account" className="hover:text-accent-press"><Icon name="user" /></a>
          <button type="button" aria-label="Cart" onClick={ui.openCart} className="relative hover:text-accent-press">
            <Icon name="cart" />
            {ui.cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-accent px-1 font-mono text-[10px] text-accent-ink">{ui.cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
