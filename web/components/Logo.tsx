export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="/"
      aria-label="Kinetik"
      className={`font-display text-[1.375rem] font-bold leading-none tracking-[-0.04em] text-text-strong ${className}`}
    >
      KINETIK<span className="text-accent">.</span>
    </a>
  );
}
