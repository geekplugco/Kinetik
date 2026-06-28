import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import indexTemplate from "@/theme/templates/index.json";

export default function Home() {
  return (
    <ThemeShell>
      <SectionRenderer template={indexTemplate as Template} />
    </ThemeShell>
  );
}
