import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { GlossaryList } from "@/components/glossary-list";

export const metadata: Metadata = { title: "Glossary" };

export default function GlossaryPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Glossary"
        title="Cloudport and newsroom terms"
        description="Plain-language definitions of the words used in the guides, in Cloudport's UI and on the shift channel."
      />
      <GlossaryList />
    </div>
  );
}
