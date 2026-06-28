import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

export function MapSection({ section }: SectionProps) {
  const s = section.settings;
  const address = (s.address as string) ?? "382 NE 191st St, Miami, FL";
  const query = encodeURIComponent(address);
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className="bg-surface-page">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 px-6 py-16 md:px-16">
          <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.subheading as string) ?? "Visit us"}</span>
          <h2 className="font-display text-h2 tracking-tight text-text-strong">{(s.heading as string) ?? "The studio"}</h2>
          <p className="flex items-start gap-2 text-body text-text-body"><Icon name="user" size={18} className="mt-1 text-accent-press" />{address}</p>
          <a href={`https://maps.google.com/?q=${query}`} target="_blank" rel="noopener noreferrer" className="font-mono text-xs uppercase tracking-label text-text-strong underline underline-offset-4 hover:text-accent-press">Get directions</a>
        </div>
        <div className="min-h-[320px] bg-surface-sunken">
          <iframe title="Map" src={`https://maps.google.com/maps?q=${query}&output=embed`} className="h-full min-h-[320px] w-full grayscale" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
