"use client";

import { useEffect, useState } from "react";
import { useUI } from "./shared";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export function NewsletterPopup() {
  const ui = useUI();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ui.popupOpen === false && typeof window !== "undefined" && window.sessionStorage.getItem("kinetik-popup")) return;
    const timer = window.setTimeout(() => {
      if (!window.sessionStorage.getItem("kinetik-popup")) setOpen(true);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [ui.popupOpen]);

  const dismiss = () => {
    setOpen(false);
    window.sessionStorage.setItem("kinetik-popup", "1");
  };

  return (
    <>
      <div onClick={dismiss} className={`fixed inset-0 z-50 bg-ink-950/60 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden />
      <div className={`fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-surface-page p-8 text-center shadow-xl transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} role="dialog" aria-label="Newsletter">
        <button type="button" aria-label="Close" onClick={dismiss} className="absolute right-4 top-4 text-text-strong hover:text-accent-press"><Icon name="close" /></button>
        <h2 className="font-display text-h2 tracking-tight text-text-strong">10% off your first order</h2>
        <p className="mt-3 text-body text-text-muted">Join the list for early access to drops.</p>
        <form className="mt-6 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); dismiss(); }}>
          <input type="email" required placeholder="Email address" aria-label="Email" className="border border-border-strong bg-surface-page px-4 py-3 font-sans text-body text-text-strong placeholder:text-text-faint" />
          <Button type="submit">Get 10% off</Button>
        </form>
      </div>
    </>
  );
}
