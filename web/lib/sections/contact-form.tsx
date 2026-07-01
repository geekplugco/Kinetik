"use client";

import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Button } from "@/components/Button";

const widthMap: Record<string, string> = {
  narrow: "max-w-[640px]",
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
};

export function ContactForm({ section }: SectionProps) {
  const s = section.settings;
  const field = "min-h-[44px] border border-border-strong bg-surface-page px-4 py-3 font-sans text-body text-text-strong placeholder:text-text-faint";
  const width = widthMap[(s.width as string) ?? "narrow"] ?? widthMap.narrow;
  const split = ((s.layout as string) ?? "stacked") === "split";
  const heading = (s.heading as string) ?? "";
  const subheading = (s.subheading as string) ?? "";

  const form = (
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <input type="text" required placeholder={(s.name_placeholder as string) ?? "Name"} aria-label="Name" className={field} />
      <input type="email" required placeholder={(s.email_placeholder as string) ?? "Email"} aria-label="Email" className={field} />
      {((s.show_phone as boolean) ?? false) && (
        <input type="tel" placeholder={(s.phone_placeholder as string) ?? "Phone"} aria-label="Phone" className={field} />
      )}
      <textarea required rows={5} placeholder={(s.message_placeholder as string) ?? "Message"} aria-label="Message" className={field} />
      <Button type="submit" className="self-start">{(s.button_label as string) ?? "Send message"}</Button>
    </form>
  );

  return (
    <section
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className="bg-surface-page pt-[var(--pt,0)] pb-[var(--pb,4rem)]"
    >
      <div className={`mx-auto ${width} px-6 ${split ? "grid gap-10 md:grid-cols-2" : ""}`}>
        {(heading || subheading || split) && (
          <div className="mb-8 flex flex-col gap-3 md:mb-0">
            {subheading && <span className="font-mono text-xs uppercase tracking-label text-text-muted">{subheading}</span>}
            {heading && <h2 className="font-display text-h2 tracking-tight text-text-strong">{heading}</h2>}
            {typeof s.details === "string" && s.details && (
              <div className="text-body text-text-body [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.details }} />
            )}
          </div>
        )}
        {form}
      </div>
    </section>
  );
}
