export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`font-display text-h4 font-bold uppercase tracking-tight text-text-strong ${className}`}>
      Kinetik
    </a>
  );
}
