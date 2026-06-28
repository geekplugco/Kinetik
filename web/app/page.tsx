import { ThemeToggle } from "./theme-toggle";

const swatches = [
  { label: "surface-page", className: "bg-surface-page border-border-hairline" },
  { label: "surface-sunken", className: "bg-surface-sunken border-border-hairline" },
  { label: "ink-950", className: "bg-ink-950 border-ink-950" },
  { label: "ink-500", className: "bg-ink-500 border-ink-500" },
  { label: "volt-500", className: "bg-volt-500 border-volt-500" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1200px] flex-col gap-12 px-6 py-16">
      <header className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-label text-text-muted">
          Kinetik / design tokens
        </span>
        <ThemeToggle />
      </header>

      <section className="flex flex-col gap-6">
        <h1 className="font-display text-fluid-hero leading-[0.95] tracking-hero text-text-strong">
          Tokens wired.
        </h1>
        <p className="max-w-prose text-body-lg text-text-body">
          Tailwind v4 utilities resolve from the Kinetik design-system CSS variables.
          Toggle the theme — every token re-resolves through <code className="font-mono text-sm text-accent-press">data-theme</code>.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-accent px-6 py-3 font-mono text-sm uppercase tracking-wide text-accent-ink transition-colors hover:bg-accent-hover">
            Add to cart
          </button>
          <button className="border border-border-strong px-6 py-3 font-mono text-sm uppercase tracking-wide text-text-strong">
            View
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {swatches.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <div className={`h-20 border ${s.className}`} />
            <span className="font-mono text-xs tracking-wide text-text-muted">{s.label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
