import "@/lib/sections";
import { registeredTypes } from "@/lib/registry";

const routes = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collections/new-arrivals" },
  { label: "All collections", href: "/collections" },
  { label: "Product", href: "/products/shell-jacket" },
  { label: "Search", href: "/search" },
  { label: "Cart", href: "/cart" },
  { label: "Blog", href: "/blog" },
  { label: "Article", href: "/blog/fw26-shell" },
  { label: "Page", href: "/pages/about" },
  { label: "Contact", href: "/pages/contact" },
  { label: "Account", href: "/account" },
  { label: "Gift card", href: "/gift-card" },
  { label: "Password", href: "/password" },
  { label: "404", href: "/this-does-not-exist" },
  { label: "Engine demo", href: "/preview" },
];

export default function Dashboard() {
  const sections = registeredTypes().sort();
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-label text-text-muted">Kinetik / theme dashboard</span>
      <h1 className="mt-2 font-display text-h1 tracking-tight text-text-strong">Preview</h1>

      <h2 className="mt-12 font-mono text-xs uppercase tracking-label text-text-muted">Templates &amp; routes</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {routes.map((r) => (
          <a key={r.href} href={r.href} className="border border-border-hairline px-4 py-3 font-sans text-body text-text-strong transition-colors hover:bg-surface-sunken">
            {r.label}
            <span className="block font-mono text-xs text-text-muted">{r.href}</span>
          </a>
        ))}
      </div>

      <h2 className="mt-12 font-mono text-xs uppercase tracking-label text-text-muted">Registered sections ({sections.length})</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {sections.map((s) => (
          <span key={s} className="border border-border-strong px-3 py-1 font-mono text-xs text-text-strong">{s}</span>
        ))}
      </div>
    </main>
  );
}
