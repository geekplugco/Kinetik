"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export function Header({ section }: SectionProps) {
  const { menus, cart } = useShopify();
  const handle = (section.settings.menu as string) ?? "main-menu";
  const menu = menus[handle];
  const sticky = section.settings.sticky_header !== false;
  return (
    <header
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"}
      className={`${sticky ? "sticky top-0 z-40" : ""} border-b border-border-hairline bg-surface-page/90 backdrop-blur`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {menu?.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              className="font-mono text-xs uppercase tracking-label text-text-body hover:text-text-strong"
            >
              {link.title}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-text-strong">
          <button type="button" aria-label="Search" className="hover:text-accent-press">
            <Icon name="search" />
          </button>
          <a href="/account" aria-label="Account" className="hover:text-accent-press">
            <Icon name="user" />
          </a>
          <button type="button" aria-label="Cart" className="relative hover:text-accent-press">
            <Icon name="cart" />
            {cart.item_count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-accent px-1 font-mono text-[10px] text-accent-ink">
                {cart.item_count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
