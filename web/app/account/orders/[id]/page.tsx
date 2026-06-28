import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import orderTemplate from "@/theme/templates/customers/order.json";

export default function OrderPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={orderTemplate as Template} />
    </ThemeShell>
  );
}
