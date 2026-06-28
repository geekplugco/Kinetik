"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { Localization } from "@/components/Localization";
import { SocialIcons, PaymentIcons, FollowOnShop } from "@/components/StoreFooterMeta";

export function Footer({ section }: SectionProps) {
  const { shop, menus } = useShopify();
  const s = section.settings;
  const menu = menus[(s.menu as string) ?? "main-menu"];
  return (
    <footer
      data-color-scheme={(s.color_scheme as string) ?? "scheme-2"}
      className="border-t border-border-hairline bg-surface-sunken"
    >
      <div className="mx-auto grid max-w-[var(--page-width)] gap-10 px-6 py-16 md:grid-cols-[1.5fr_1fr_1.5fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-text-muted">{(s.tagline as string) ?? "Engineered for movement."}</p>
        </div>
        <nav className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.menu_heading as string) ?? "Shop"}</span>
          {menu?.links.map((link) => (
            <a key={link.title} href={link.url} className="text-sm text-text-body hover:text-text-strong">
              {link.title}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.newsletter_heading as string) ?? "Get the drop"}</span>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Email"
              aria-label="Email"
              className="min-w-0 flex-1 border border-border-strong bg-surface-page px-3 py-2 font-mono text-sm text-text-strong placeholder:text-text-faint"
            />
            <Button type="submit" size="sm">
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-border-hairline">
        <div className="mx-auto flex max-w-[var(--page-width)] flex-col items-center justify-between gap-5 px-6 py-6 md:flex-row">
          <div className="flex items-center gap-4">
            {s.show_social !== false && <SocialIcons />}
            {s.enable_follow_on_shop !== false && <FollowOnShop />}
          </div>
          {(s.enable_country_selector !== false || s.enable_language_selector !== false) && (
            <Localization showCountry={s.enable_country_selector !== false} showLanguage={s.enable_language_selector !== false} />
          )}
        </div>
      </div>
      <div className="border-t border-border-hairline">
        <div className="mx-auto flex max-w-[var(--page-width)] flex-col items-center justify-between gap-3 px-6 py-4 font-mono text-xs text-text-muted md:flex-row">
          <span>© {shop.name}. All rights reserved.</span>
          {s.show_payment_icons !== false && <PaymentIcons />}
        </div>
      </div>
    </footer>
  );
}
