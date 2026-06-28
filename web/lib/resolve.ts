import type { Template, SectionGroup, ResolvedSection, ResolvedBlock } from "./types";

export function resolveTemplate(tpl: Template | SectionGroup): ResolvedSection[] {
  const out: ResolvedSection[] = [];
  for (const id of tpl.order) {
    const sec = tpl.sections[id];
    if (!sec || sec.disabled) continue;
    const order = sec.block_order ?? (sec.blocks ? Object.keys(sec.blocks) : []);
    const blocks: ResolvedBlock[] = [];
    for (const bid of order) {
      const b = sec.blocks?.[bid];
      if (!b || b.disabled) continue;
      blocks.push({ id: bid, type: b.type, settings: b.settings ?? {} });
    }
    out.push({ id, type: sec.type, settings: sec.settings ?? {}, blocks });
  }
  return out;
}
