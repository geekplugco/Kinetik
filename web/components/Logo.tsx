export function Logo({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <a href="/" aria-label="Kinetik" className={`inline-flex items-center gap-2.5 text-text-strong ${className}`}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
        <rect x="2.5" y="2" width="4.5" height="20" />
        <polygon points="7,12 17.5,2 23,2 12.5,12" />
        <polygon points="7,12 17.5,22 23,22 12.5,12" />
      </svg>
      <span className="font-display text-h4 font-bold uppercase leading-none tracking-[-0.03em]">Kinetik</span>
    </a>
  );
}
