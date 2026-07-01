"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "up" | "fade" | "mask" | "zoom";

const VARIANT: Record<Variant, string> = {
  up: "hp-reveal",
  fade: "hp-reveal hp-reveal--fade",
  mask: "hp-reveal hp-reveal--mask",
  zoom: "hp-reveal hp-reveal--zoom",
};

type RevealProps = {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  index?: number;
  once?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * Scroll-reveal primitive from the hp- house library.
 * Renders an `hp-reveal` element and toggles `is-in` via IntersectionObserver.
 * CSS-driven (tokens/hp.css) + reduced-motion + no-JS safe.
 */
export function Reveal({ as = "div", variant = "up", delay, index, once = true, className = "", children, ...rest }: RevealProps & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            if (once) io.unobserve(el);
          } else if (!once) {
            el.classList.remove("is-in");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const ms = delay ?? (index != null ? index * 70 : 0);
  const style = ms ? ({ "--reveal-delay": `${ms}ms` } as CSSProperties) : undefined;

  return createElement(as, { ref, className: `${VARIANT[variant]} ${className}`.trim(), style, ...rest }, children);
}
