import type { ReactNode } from "react";

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "accent" }) {
  const cls = tone === "accent" ? "bg-accent text-accent-ink" : "border border-border-strong text-text-strong";
  return (
    <span className={`inline-flex items-center px-2 py-1 font-mono text-xs uppercase tracking-label ${cls}`}>
      {children}
    </span>
  );
}
