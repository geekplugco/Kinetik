"use client";

import { useState } from "react";

const sel = "cursor-pointer bg-transparent font-mono text-xs uppercase tracking-label text-current outline-none";

export function Localization({ showCountry = true, showLanguage = true }: { showCountry?: boolean; showLanguage?: boolean }) {
  const [country, setCountry] = useState("US");
  const [lang, setLang] = useState("EN");
  return (
    <div className="flex items-center gap-4">
      {showCountry && (
        <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Country/region" className={sel}>
          <option value="US">United States (USD $)</option>
          <option value="CA">Canada (CAD $)</option>
          <option value="GB">United Kingdom (GBP £)</option>
          <option value="DE">Germany (EUR €)</option>
          <option value="JP">Japan (JPY ¥)</option>
        </select>
      )}
      {showLanguage && (
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language" className={sel}>
          <option value="EN">English</option>
          <option value="FR">Français</option>
          <option value="DE">Deutsch</option>
        </select>
      )}
    </div>
  );
}
