import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { GuideList } from "@/components/guide/guide-list";
import { CATEGORY_ORDER, guides } from "@/content/guides";

export const metadata: Metadata = { title: "Step-by-step guides" };

export default function GuidesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Guides"
        title="Step-by-step guides"
        description="The User Manual procedures from the Streaming Google Site, one action per step with screenshots and a tick-off checklist. Pick a guide to open it. For the everyday fixes, see Quick troubleshooting."
      />
      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((category) => {
          const list = guides.filter((g) => g.category === category);
          if (list.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {category}
              </h2>
              <GuideList guides={list} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
