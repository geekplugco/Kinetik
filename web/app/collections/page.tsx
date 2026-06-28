import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import listTemplate from "@/theme/templates/list-collections.json";

export default function CollectionsPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={listTemplate as Template} />
    </ThemeShell>
  );
}
