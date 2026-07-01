import type { CSSProperties } from "react";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";
import { Icon } from "@/components/Icon";

const widthMap: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  full: "max-w-none",
  narrow: "max-w-4xl",
};

export function MapSection({ section }: SectionProps) {
  const s = section.settings;
  const address = (s.address as string) ?? "382 NE 191st St, Miami, FL";
  const query = encodeURIComponent(address);
  const width = widthMap[(s.width as string) ?? "page"] ?? widthMap.page;
  const imageLeft = ((s.layout as string) ?? "image-right") === "image-left";
  const grayscale = ((s.map_style as string) ?? "grayscale") === "grayscale";
  const mapHeight = typeof s.map_height === "number" ? s.map_height : 320;
  const style = { ...sectionStyle(s), "--map-h": `${mapHeight}px` } as CSSProperties;

  const info = (
    <div className="flex flex-col justify-center gap-4 px-6 py-16 md:px-16">
      <span className="font-mono text-xs uppercase tracking-label text-text-muted">{(s.subheading as string) ?? "Visit us"}</span>
      <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-[0.95] tracking-tight text-text-strong">{(s.heading as string) ?? "The studio"}</h2>
      <p className="flex items-start gap-2 text-body text-text-body"><Icon name="user" size={18} className="mt-1 text-accent-press" />{address}</p>
      {typeof s.hours === "string" && s.hours && (
        <div className="text-body text-text-muted [&_p]:m-0" dangerouslySetInnerHTML={{ __html: s.hours }} />
      )}
      {((s.show_directions as boolean) ?? true) && (
        <a href={`https://maps.google.com/?q=${query}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-mono text-xs uppercase tracking-label text-text-strong underline underline-offset-4 hover:text-accent-press">{(s.directions_label as string) ?? "Get directions"}</a>
      )}
    </div>
  );

  const map = (
    <div className="min-h-[var(--map-h,320px)] bg-surface-sunken">
      <iframe title="Map" src={`https://maps.google.com/maps?q=${query}&output=embed`} className={`h-full min-h-[var(--map-h,320px)] w-full ${grayscale ? "grayscale" : ""}`} loading="lazy" />
    </div>
  );

  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={style} className="bg-surface-page pt-[var(--pt,0)] pb-[var(--pb,0)]">
      <div className={`mx-auto grid ${width} md:grid-cols-2`}>
        {imageLeft ? (
          <>
            <div className="order-2 md:order-1">{map}</div>
            <div className="order-1 md:order-2">{info}</div>
          </>
        ) : (
          <>
            {info}
            {map}
          </>
        )}
      </div>
    </section>
  );
}
