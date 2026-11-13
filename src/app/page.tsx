import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  ListChecksIcon,
  PhoneCallIcon,
  SirenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/page-header";
import { SearchTrigger } from "@/components/search-command";
import { ChecklistCard } from "@/components/checklist-card";
import { TrainingProgressCard } from "@/components/training-progress-card";
import { StationStrip } from "@/components/station/station-path";
import { site } from "@/content/site";
import { severities } from "@/content/escalations";
import { checklists } from "@/content/operations";

const DASHBOARD_CHECKLISTS = ["initial-setup", "pre-shift", "handoff"];

export default function DashboardPage() {
  const sev1 = severities[0];
  const setupChecklists = DASHBOARD_CHECKLISTS.map((id) =>
    checklists.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {site.program}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Get set up in {site.toolName} and run your shift
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The set-up tasks for your first sign-in, the checks to run at the
          start and end of every shift, and the escalation path when something
          is wrong on air. Step-by-step procedures live under Step-by-step
          guides in the sidebar.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchTrigger className="h-10 w-full justify-start sm:w-96" />
          <Button
            variant="default"
            size="lg"
            render={<a href={site.toolUrl} target="_blank" rel="noreferrer" />}
          >
            Open Cloudport
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
          <Button variant="outline" size="lg" render={<Link href="/guides" />}>
            Step-by-step guides
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section>
        <SectionHeading
          id="checklists"
          title="Cloudport set-up and shift checks"
          description="Tick items off as you go. Progress is saved in this browser; reset the shift checks at the start of each shift."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {setupChecklists.map((c) => (
            <ChecklistCard key={c.id} checklist={c} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-red-200 bg-red-50/60 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SirenIcon className="size-4 text-red-600" />
              <CardTitle className="text-red-900">
                Something is wrong on air?
              </CardTitle>
            </div>
            <CardDescription className="text-red-900/80">
              {sev1.definition} That is a <strong>{sev1.level}</strong>:{" "}
              {sev1.firstAction}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <StationStrip />
            <div className="flex flex-wrap gap-2">
              <Button
                variant="destructive"
                render={<Link href="/escalations#severity" />}
              >
                <PhoneCallIcon data-icon="inline-start" />
                Severity levels and who to call
              </Button>
              <Button
                variant="outline"
                render={<Link href="/guides/live-cut-ins#troubleshooting" />}
              >
                Live cut-in troubleshooting
              </Button>
            </div>
          </CardContent>
        </Card>
        <TrainingProgressCard />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Quick links</CardTitle>
          <CardDescription>
            Everything else you might need during a shift.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <QuickLink
              href="/operations"
              icon={ListChecksIcon}
              label="Operations: daily rhythm, stations, norms"
            />
            <QuickLink
              href="/escalations"
              icon={SirenIcon}
              label="Escalation tiers and contacts"
            />
            <QuickLink
              href="/training"
              icon={GraduationCapIcon}
              label="New DLP training path"
            />
            <QuickLink
              href="/glossary"
              icon={BookOpenIcon}
              label="Glossary of terms"
            />
          </div>
          <div className="flex flex-col gap-1 border-t pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            {site.externalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ExternalLinkIcon className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="block text-foreground/90">{l.label}</span>
                  <span className="block text-xs">{l.description}</span>
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: "/operations" | "/escalations" | "/training" | "/glossary";
  icon: typeof ListChecksIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span>{label}</span>
    </Link>
  );
}
