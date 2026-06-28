import type { SectionProps } from "../registry";

export function Marquee({ section }: SectionProps) {
  const raw = (section.settings.text as string) ?? "KINETIK";
  const items = raw.split("·").map((s) => s.trim()).filter(Boolean);
  const list = items.length > 1 ? items : [raw];
  const seq = Array.from({ length: 4 }).flatMap((_, r) => list.map((t, i) => ({ key: `${r}-${i}`, t })));
  return (
    <div
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-1"}
      className="overflow-hidden border-y border-border-strong bg-accent py-3"
    >
      <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center">
        {seq.map(({ key, t }) => (
          <span key={key} className="flex items-center font-mono text-xs font-bold uppercase tracking-label text-accent-ink">
            {t}
            <span className="px-6 opacity-50" aria-hidden>—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
