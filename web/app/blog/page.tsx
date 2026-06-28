import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import blogTemplate from "@/theme/templates/blog.json";

export default function BlogPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={blogTemplate as Template} />
    </ThemeShell>
  );
}
