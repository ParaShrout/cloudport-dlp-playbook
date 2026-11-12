import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { GuideList } from "@/components/guide/guide-list";
import { guides } from "@/content/guides";
import type { Guide } from "@/content/types";

export const metadata: Metadata = { title: "Step-by-step guides" };

const CATEGORY_ORDER: Guide["category"][] = ["Live Operations", "Programming Hours", "Troubleshooting"];

export default function GuidesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Guides"
        title="Step-by-step guides"
        description="The User Manual procedures from the Streaming Google Site, one action per step. Open a section to read its steps here, or open the full guide for the tick-off checklist and screenshots. Pages not yet transferred are marked Coming soon."
      />
      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((category) => {
          const list = guides.filter((g) => g.category === category);
          if (list.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{category}</h2>
              <GuideList guides={list} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
