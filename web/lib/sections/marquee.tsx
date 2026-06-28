import type { SectionProps } from "../registry";

export function Marquee({ section }: SectionProps) {
  const text = (section.settings.text as string) ?? "KINETIK";
  const repeated = Array.from({ length: 8 }, (_, i) => i);
  return (
    <div
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"}
      className="overflow-hidden border-y border-border-strong bg-accent py-3"
    >
      <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-8">
        {repeated.map((i) => (
          <span key={i} className="font-display text-h3 font-bold uppercase tracking-tight text-accent-ink">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
