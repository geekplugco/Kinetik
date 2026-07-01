import Image from "next/image";
import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

const WIDTH: Record<string, string> = {
  page: "max-w-[var(--page-width)]",
  narrow: "max-w-[820px]",
  full: "max-w-none",
};

const SIZE: Record<string, string> = {
  small: "h-6 w-24",
  medium: "h-8 w-28",
  large: "h-10 w-36",
};

export function LogoList({ section }: SectionProps) {
  const s = section.settings;
  const logos = section.blocks.filter((b) => b.type === "logo");
  const width = WIDTH[(s.width as string) ?? "page"] ?? WIDTH.page;
  const size = SIZE[(s.logo_size as string) ?? "medium"] ?? SIZE.medium;
  const layout = (s.layout as string) ?? "row";
  const style = (s.logo_style as string) ?? "muted";
  const dark = (s.color_scheme as string) === "scheme-3" || (s.color_scheme as string) === "scheme-dark";
  const styleClass =
    style === "full"
      ? "opacity-100"
      : style === "grayscale"
        ? "opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
        : "opacity-60 transition-opacity hover:opacity-100";
  const containerClass =
    layout === "grid"
      ? "grid items-center justify-items-center gap-x-8 gap-y-8 grid-cols-[repeat(var(--cols-mobile,2),minmax(0,1fr))] lg:grid-cols-[repeat(var(--cols-desktop,5),minmax(0,1fr))]"
      : "flex flex-wrap items-center justify-center gap-x-12 gap-y-8";
  return (
    <section data-color-scheme={(s.color_scheme as string) ?? "scheme-1"} style={sectionStyle(s)} className={`${dark ? "theme-dark " : ""}border-y border-border-hairline bg-surface-page pt-[var(--pt,clamp(4rem,7vw,6rem))] pb-[var(--pb,clamp(4rem,7vw,6rem))]`}>
      <div className={`mx-auto ${width} px-6`}>
        {typeof s.heading === "string" && s.heading && (
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-label text-text-muted">{s.heading}</p>
        )}
        <div className={containerClass}>
          {logos.map((b) => (
            <div key={b.id} className={`relative ${size} ${styleClass}`}>
              {typeof b.settings.image === "string" && b.settings.image ? (
                <Image src={b.settings.image as string} alt={(b.settings.alt as string) ?? ""} fill className="object-contain" />
              ) : (
                <span className="flex h-full items-center justify-center font-display text-h4 uppercase tracking-tight text-text-strong">{(b.settings.alt as string) ?? "Logo"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
