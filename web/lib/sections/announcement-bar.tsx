import type { SectionProps } from "../registry";
import { sectionStyle } from "../section-style";

export function AnnouncementBar({ section }: SectionProps) {
  const messages = section.blocks.filter((b) => b.type === "message");
  const items = messages.length ? messages : [{ id: "default", type: "message", settings: { text: "Free shipping on orders over $50" } }];
  return (
    <div
      data-color-scheme={(section.settings.color_scheme as string) ?? "scheme-2"}
      style={sectionStyle(section.settings)}
      className="bg-ink-950 text-paper"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-center gap-6 px-6 py-2">
        {items.map((b) => (
          <span key={b.id} className="font-mono text-xs uppercase tracking-label">
            {(b.settings.text as string) ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}
