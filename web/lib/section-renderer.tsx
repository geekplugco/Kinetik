import { resolveTemplate } from "./resolve";
import { getSection } from "./registry";
import type { Template, SectionGroup } from "./types";

export function SectionRenderer({ template }: { template: Template | SectionGroup }) {
  const sections = resolveTemplate(template);
  return (
    <>
      {sections.map((section) => {
        const Component = getSection(section.type);
        if (!Component) {
          if (process.env.NODE_ENV === "production") return null;
          return (
            <div
              key={section.id}
              data-unregistered-section={section.type}
              className="border border-dashed border-negative px-4 py-3 font-mono text-xs text-negative"
            >
              Unregistered section: {section.type}
            </div>
          );
        }
        return <Component key={section.id} section={section} />;
      })}
    </>
  );
}
