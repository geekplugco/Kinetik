import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import cartTemplate from "@/theme/templates/cart.json";

export default function CartPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={cartTemplate as Template} />
    </ThemeShell>
  );
}
