import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import giftTemplate from "@/theme/templates/gift_card.json";

export default function GiftCardPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={giftTemplate as Template} />
    </ThemeShell>
  );
}
