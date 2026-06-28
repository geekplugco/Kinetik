export function SocialIcons({ items }: { items?: { label: string; url: string }[] }) {
  const links = items?.length ? items : [
    { label: "IG", url: "#" },
    { label: "TT", url: "#" },
    { label: "YT", url: "#" },
    { label: "X", url: "#" },
  ];
  return (
    <div className="flex gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.url} aria-label={l.label} className="flex h-8 w-8 items-center justify-center border border-border-strong font-mono text-xs text-text-strong transition-colors hover:bg-surface-sunken">
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function PaymentIcons() {
  const methods = ["Visa", "MC", "Amex", "PayPal", "Shop Pay", "Apple Pay", "G Pay"];
  return (
    <div className="flex flex-wrap gap-2">
      {methods.map((m) => (
        <span key={m} className="border border-border-hairline px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted">{m}</span>
      ))}
    </div>
  );
}

export function FollowOnShop() {
  return (
    <a href="#" className="inline-flex items-center gap-2 bg-[#5a31f4] px-4 py-2 font-mono text-xs uppercase tracking-wide text-white transition-opacity hover:opacity-90">
      <span className="text-base leading-none">&#10022;</span> Follow on Shop
    </a>
  );
}
