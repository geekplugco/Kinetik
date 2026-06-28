"use client";

import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

export function Newsletter({ section }: SectionProps) {
  const s = section.settings;
  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-inverse"}
      style={sectionStyle(s)}
      className="bg-ink-950 pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))] text-paper"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <h2 className="font-display text-h1 tracking-tight">{(s.heading as string) ?? "Join the movement"}</h2>
        {typeof s.text === "string" && s.text && <div className="text-body-lg text-paper/70 [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.text }} />}
        <form className="mt-2 flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Email address"
            aria-label="Email address"
            className="min-w-0 flex-1 border border-paper/40 bg-transparent px-4 py-3 font-mono text-sm text-paper placeholder:text-paper/50"
          />
          <Button type="submit">{(s.button_label as string) ?? "Subscribe"}</Button>
        </form>
      </div>
    </section>
  );
}
