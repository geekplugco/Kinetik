import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";
type Size = "sm" | "md";

const base = "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wide transition-colors disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "border border-border-strong text-text-strong hover:bg-surface-sunken",
  link: "text-text-strong underline underline-offset-4 hover:text-accent-press",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function Button({ children, variant = "primary", size = "md", href, onClick, type = "button", disabled, className = "" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
