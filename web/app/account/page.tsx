import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import type { Template } from "@/lib/types";
import accountTemplate from "@/theme/templates/account.json";

export default function AccountPage() {
  return (
    <ThemeShell>
      <SectionRenderer template={accountTemplate as Template} />
    </ThemeShell>
  );
}
