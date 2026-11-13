import type { Metadata } from "next";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { ChecklistCard } from "@/components/checklist-card";
import { checklists } from "@/content/operations";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Cloudport set-up" };

const ORDER = ["initial-setup", "pre-shift", "handoff"];

export default function SetupPage() {
  const list = ORDER.map((id) => checklists.find((c) => c.id === id)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Cloudport set-up"
        title="First sign-in and shift checks"
        description="Run the initial set-up tasks once, the first time you sign in to Cloudport. Run the start and end of shift checks every shift. Tick items off as you go; progress is saved in this browser, so reset the shift checks when you come on."
        actions={
          <Button
            variant="default"
            render={<a href={site.toolUrl} target="_blank" rel="noreferrer" />}
          >
            Open Cloudport
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {list.map((c) => (
          <ChecklistCard key={c.id} checklist={c} />
        ))}
      </div>
    </div>
  );
}
