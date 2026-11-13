import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { TrainingPath } from "@/components/training/training-path";
import { KnowledgeCheck } from "@/components/training/knowledge-check";
import { DailyRhythm } from "@/components/training/daily-rhythm";

export const metadata: Metadata = { title: "New DLP training" };

export default function TrainingPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Training"
        title="New DLP training path"
        description="Five modules that take a new Digital Line Producer from first login to running a shift alone. Tick items off as you go; progress is saved in this browser so you can come back to it."
      />
      <section id="daily-rhythm" className="scroll-mt-24">
        <SectionHeading
          title="Daily rhythm"
          description="What a shift looks like from start to finish. Each station runs its own schedule under its own news director, so these are phases, not clock times. Each phase links to where it is covered in the playbook."
        />
        <DailyRhythm />
      </section>
      <section>
        <SectionHeading
          title="Modules"
          description="Work top to bottom. Each module assumes the one before it."
        />
        <TrainingPath />
      </section>
      <section id="knowledge-check" className="scroll-mt-24">
        <SectionHeading
          title="Knowledge check"
          description="Six scenario questions drawn from the Live Cut-Ins guide and the escalation rules. Explanations appear as soon as you answer."
        />
        <KnowledgeCheck />
      </section>
    </div>
  );
}
