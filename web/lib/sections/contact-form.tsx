"use client";

import type { SectionProps } from "../registry";
import { Button } from "@/components/Button";

export function ContactForm(_props: SectionProps) {
  const field = "border border-border-strong bg-surface-page px-4 py-3 font-sans text-body text-text-strong placeholder:text-text-faint";
  return (
    <section className="mx-auto max-w-[640px] px-6 pb-16">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" required placeholder="Name" aria-label="Name" className={field} />
        <input type="email" required placeholder="Email" aria-label="Email" className={field} />
        <textarea required rows={5} placeholder="Message" aria-label="Message" className={field} />
        <Button type="submit" className="self-start">Send message</Button>
      </form>
    </section>
  );
}
