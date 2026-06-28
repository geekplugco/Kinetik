"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      className="border border-border-strong px-4 py-2 font-mono text-xs tracking-label uppercase text-text-strong transition-colors hover:bg-surface-sunken"
    >
      {dark ? "Light" : "Dark"} mode
    </button>
  );
}
