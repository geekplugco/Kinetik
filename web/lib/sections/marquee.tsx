import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

const styles: Record<string, string> = {
  accent: "bg-accent text-accent-ink",
  ink: "theme-dark bg-ink-950 text-paper",
  outline: "bg-paper text-ink-950",
};

const speeds: Record<string, string> = {
  slow: "60s",
  normal: "38s",
  fast: "22s",
};

export function Marquee({ section }: SectionProps) {
  const s = section.settings;
  const raw = (s.text as string) ?? "KINETIK";
  const separator = typeof s.separator === "string" && s.separator ? s.separator : "—";
  const styleClass = styles[(s.style as string) ?? "accent"] ?? styles.accent;
  const duration = speeds[(s.speed as string) ?? "normal"] ?? speeds.normal;
  const reverse = (s.direction as string) === "right";
  const fixed = (s.width as string) === "page";

  const items = raw.split("·").map((t) => t.trim()).filter(Boolean);
  const list = items.length > 1 ? items : [raw];
  const seq = Array.from({ length: 4 }).flatMap((_, r) => list.map((t, i) => ({ key: `${r}-${i}`, t })));

  return (
    <div
      data-color-scheme={(s.color_scheme as string) ?? "scheme-1"}
      style={sectionStyle(s)}
      className={`overflow-hidden border-y border-border-strong pb-[var(--pb,0.75rem)] pt-[var(--pt,0.75rem)] ${styleClass}`}
    >
      <div className={`overflow-hidden ${fixed ? "mx-auto max-w-[var(--page-width)] px-6" : ""}`}>
        <div
          className="flex w-max animate-[marquee_38s_linear_infinite] items-center"
          style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : undefined }}
        >
          {seq.map(({ key, t }) => (
            <span key={key} className="flex items-center font-mono text-xs font-bold uppercase tracking-label">
              {t}
              <span className="px-6 opacity-50" aria-hidden>{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
