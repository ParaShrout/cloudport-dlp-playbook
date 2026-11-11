import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ClockIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  ListChecksIcon,
  PhoneCallIcon,
  SirenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { SectionHeading } from "@/components/page-header";
import { SearchCommand } from "@/components/search-command";
import { TrainingProgressCard } from "@/components/training-progress-card";
import { site } from "@/content/site";
import { countSteps, guides } from "@/content/guides";
import { severities } from "@/content/escalations";
import { checklists } from "@/content/operations";

export default function DashboardPage() {
  const readyGuides = guides.filter((g) => g.status !== "coming-soon");
  const comingSoon = guides.filter((g) => g.status === "coming-soon");
  const sev1 = severities[0];
  const preShift = checklists.find((c) => c.id === "pre-shift");

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{site.program}</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          What do you need to do in {site.toolName} right now?
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Step-by-step procedures, daily operations and escalation paths for Digital Line Producers running station
          streams. Search for the step you need, or start the training path if you are new.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchCommand className="h-10 w-full justify-start sm:w-96" />
          <Button variant="default" size="lg" render={<Link href="/guides/live-cut-ins" />}>
            Open Live Cut-Ins guide
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="border-red-200 bg-red-50/60 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SirenIcon className="size-4 text-red-600" />
              <CardTitle className="text-red-900">Something is wrong on air?</CardTitle>
            </div>
            <CardDescription className="text-red-900/80">
              {sev1.definition} That is a <strong>{sev1.level}</strong>: {sev1.firstAction}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="destructive" render={<Link href="/escalations#severity" />}>
              <PhoneCallIcon data-icon="inline-start" />
              Severity levels and who to call
            </Button>
            <Button variant="outline" render={<Link href="/guides/live-cut-ins#troubleshooting" />}>
              Live cut-in troubleshooting
            </Button>
          </CardContent>
        </Card>
        <TrainingProgressCard />
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            title="Step-by-step guides"
            description="Each guide has a checklist you can tick off while you work, plus a troubleshooting table."
          />
          <Button variant="ghost" size="sm" className="no-print mb-4" render={<Link href="/guides" />}>
            All guides
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {readyGuides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary">{g.category}</Badge>
                    <StatusBadge status={g.status} />
                  </div>
                  <CardTitle className="mt-2 text-lg group-hover:text-primary">{g.title}</CardTitle>
                  <CardDescription>{g.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ListChecksIcon className="size-3.5" /> {countSteps(g)} steps
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="size-3.5" /> ~{g.estimatedMinutes} min
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
          {comingSoon.length > 0 ? (
            <Card className="h-full border-dashed">
              <CardHeader>
                <CardTitle className="text-base">Being documented next</CardTitle>
                <CardDescription>
                  Summaries exist so you know what is coming. Steps and screenshots are in progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-1.5 text-sm">
                  {comingSoon.map((g) => (
                    <li key={g.slug}>
                      <Link href={`/guides/${g.slug}`} className="text-foreground/80 hover:text-primary hover:underline">
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListChecksIcon className="size-4 text-primary" />
              <CardTitle>{preShift?.title} checklist</CardTitle>
            </div>
            <CardDescription>{preShift?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid gap-2 text-sm sm:grid-cols-2">
              {preShift?.items.map((item, i) => (
                <li key={item.id} className="flex gap-2">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90">{item.text}</span>
                </li>
              ))}
            </ol>
            <Button variant="link" className="mt-3 px-0" render={<Link href="/operations#checklists" />}>
              Open interactive checklists
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick links</CardTitle>
            <CardDescription>Everything else you might need during a shift.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-sm">
            <QuickLink href="/operations" icon={ListChecksIcon} label="Operations: daily rhythm, stations, norms" />
            <QuickLink href="/escalations" icon={SirenIcon} label="Escalation tiers and contacts" />
            <QuickLink href="/training" icon={GraduationCapIcon} label="New DLP training path" />
            <QuickLink href="/glossary" icon={BookOpenIcon} label="Glossary of terms" />
            <div className="my-2 border-t" />
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
          </CardContent>
        </Card>
      </section>
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
    <Link href={href} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
      <Icon className="size-4 text-muted-foreground" />
      <span>{label}</span>
    </Link>
  );
}
