import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import searchTemplate from "@/theme/templates/search.json";

export default function SearchPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={searchTemplate as Template} />
    </ThemeShell>
  );
}
