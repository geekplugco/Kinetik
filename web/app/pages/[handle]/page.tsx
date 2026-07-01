import { notFound } from "next/navigation";
import { ThemeShell } from "@/lib/theme-layout";
import { SectionRenderer } from "@/lib/section-renderer";
import { shopifyFixture, pagesByHandle } from "@/lib/shopify/fixtures";
import type { Template } from "@/lib/types";
import pageTemplate from "@/theme/templates/page.json";
import contactTemplate from "@/theme/templates/page.contact.json";
import lookbookTemplate from "@/theme/templates/page.lookbook.json";

export function generateStaticParams() {
  return Object.keys(pagesByHandle).map((handle) => ({ handle }));
}

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const page = pagesByHandle[handle];
  if (!page) notFound();
  const tpl = handle === "contact" ? contactTemplate : handle === "lookbook" ? lookbookTemplate : pageTemplate;
  return (
    <ThemeShell context={{ ...shopifyFixture, page }}>
      <SectionRenderer template={tpl as Template} />
    </ThemeShell>
  );
}
