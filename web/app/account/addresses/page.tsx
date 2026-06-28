import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import tmpl from "@/theme/templates/customers/addresses.json";

export default function Page() {
  return (
    <ThemeShell>
      <SectionRenderer template={tmpl as Template} />
    </ThemeShell>
  );
}
