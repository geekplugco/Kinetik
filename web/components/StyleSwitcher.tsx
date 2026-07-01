"use client";

import { useEffect, useState } from "react";

type Preset = { key: string; label: string; page: string; accent: string };

const PRESETS: Preset[] = [
  { key: "field", label: "Field System", page: "#FFFFFF", accent: "#CCFF00" },
  { key: "carbon", label: "Carbon", page: "#0A0A0A", accent: "#CCFF00" },
  { key: "sand", label: "Sand", page: "#F3EFE7", accent: "#D9531E" },
];

export function StyleSwitcher() {
  const [preset, setPreset] = useState("field");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPreset(document.documentElement.getAttribute("data-preset") || "field");
  }, []);

  const apply = (key: string) => {
    setPreset(key);
    const d = document.documentElement;
    if (key === "field") d.removeAttribute("data-preset");
    else d.setAttribute("data-preset", key);
    try { localStorage.setItem("hp-preset", key); } catch { /* ignore */ }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 print:hidden">
      {open && (
        <div className="hp-reveal is-in flex flex-col gap-1 border border-border-strong bg-surface-card p-2 shadow-[0_18px_40px_-20px_rgba(10,10,10,0.4)]">
          <span className="hp-label px-1 pb-1">Theme style</span>
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => apply(p.key)}
              aria-pressed={preset === p.key}
              className={`flex items-center gap-3 px-2 py-1.5 text-left transition-colors ${preset === p.key ? "bg-surface-sunken" : "hover:bg-surface-sunken"}`}
            >
              <span className="relative flex h-6 w-6 items-center justify-center border border-border-hairline" style={{ background: p.page }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
              </span>
              <span className="font-sans text-sm text-text-strong">{p.label}</span>
              {preset === p.key && <span className="ml-auto font-mono text-[10px] uppercase tracking-label text-text-muted">On</span>}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Theme style switcher"
        className="flex h-11 items-center gap-2 border border-border-strong bg-surface-card px-4 font-mono text-xs uppercase tracking-label text-text-strong shadow-[0_18px_40px_-20px_rgba(10,10,10,0.4)]"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        Style
      </button>
    </div>
  );
}
