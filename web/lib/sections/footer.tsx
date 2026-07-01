"use client";

import type { SectionProps } from "../registry";
import { useShopify } from "../shopify-context";
import { Button } from "@/components/Button";
import { Localization } from "@/components/Localization";
import { SocialIcons, PaymentIcons, FollowOnShop } from "@/components/StoreFooterMeta";

export function Footer({ section }: SectionProps) {
  const { shop, menus } = useShopify();
  const s = section.settings;
  const menu = menus[(s.menu as string) ?? "main-menu"];

  return (
    <footer
      data-color-scheme={(s.color_scheme as string) ?? "scheme-3"}
      className="theme-dark bg-surface-page text-text-body"
    >
      {/* CTA band */}
      <div className="border-b border-border-hairline">
        <div className="mx-auto grid max-w-[var(--page-width)] gap-8 px-6 py-14 md:grid-cols-[1.25fr_1fr] md:items-end md:py-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">
              {(s.newsletter_heading as string) ?? "The drop list"}
            </span>
            <h2 className="mt-3 font-display text-display-2 uppercase text-text-strong">
              {(s.cta_heading as string) ?? "Stay in the system"}
            </h2>
          </div>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email</label>
            <div className="flex gap-2">
              <input
                id="footer-email"
                type="email"
                required
                placeholder="you@domain.com"
                className="min-w-0 flex-1 border border-border-strong bg-transparent px-4 py-3 font-mono text-sm text-text-strong outline-none placeholder:text-text-muted focus-visible:border-accent"
              />
              <Button type="submit" size="md">Subscribe</Button>
            </div>
            <p className="font-mono text-xs text-text-muted">{(s.tagline as string) ?? "No noise. Drops, restocks, field notes."}</p>
          </form>
        </div>
      </div>

      {/* Link columns + meta */}
      <div className="border-b border-border-hairline">
        <div className="mx-auto grid max-w-[var(--page-width)] gap-8 px-6 py-12 md:grid-cols-4">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.menu_heading as string) ?? "Shop"}</span>
            {menu?.links.map((link) => (
              <a key={link.title} href={link.url} className="text-sm text-text-body transition-colors hover:text-text-strong">
                {link.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">Support</span>
            <a href="/pages/contact" className="text-sm text-text-body transition-colors hover:text-text-strong">Contact</a>
            <a href="/pages/shipping" className="text-sm text-text-body transition-colors hover:text-text-strong">Shipping &amp; returns</a>
            <a href="/pages/faq" className="text-sm text-text-body transition-colors hover:text-text-strong">FAQ</a>
            <a href="/pages/warranty" className="text-sm text-text-body transition-colors hover:text-text-strong">Warranty</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-label text-text-muted">Follow</span>
            {s.show_social !== false && <SocialIcons />}
            {s.enable_follow_on_shop !== false && <FollowOnShop />}
          </div>

          {(s.enable_country_selector !== false || s.enable_language_selector !== false) && (
            <div className="flex flex-col gap-3 md:items-end">
              <span className="font-mono text-xs uppercase tracking-label text-text-muted">Region</span>
              <Localization showCountry={s.enable_country_selector !== false} showLanguage={s.enable_language_selector !== false} />
            </div>
          )}
        </div>
      </div>

      {/* Oversized wordmark signature */}
      <div aria-hidden className="overflow-hidden border-b border-border-hairline px-6">
        <div className="mx-auto max-w-[var(--page-width)]">
          <span className="block select-none whitespace-nowrap font-display text-[clamp(4rem,19vw,17rem)] font-bold uppercase leading-[0.78] tracking-[-0.05em] text-text-strong">
            Kinetik<span className="text-accent">.</span>
          </span>
        </div>
      </div>

      {/* Legal / payment meta */}
      <div className="mx-auto flex max-w-[var(--page-width)] flex-col items-center justify-between gap-3 px-6 py-5 font-mono text-xs text-text-muted md:flex-row">
        <span>© {shop.name}. Engineered for movement.</span>
        {s.show_payment_icons !== false && <PaymentIcons />}
      </div>
    </footer>
  );
}
