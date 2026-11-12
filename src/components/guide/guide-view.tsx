"use client";

import type * as React from "react";
import Link from "next/link";
import { CheckCircle2Icon, ClockIcon, ListChecksIcon, PrinterIcon, RotateCcwIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Callout } from "@/components/callout";
import { StepScreenshots } from "@/components/screenshot";
import { StationStrip } from "@/components/station/station-path";
import type { StepScreenshots as StepScreenshotMap } from "@/lib/screenshots";
import { StatusBadge } from "@/components/status-badge";
import { SectionHeading } from "@/components/page-header";
import { countSteps, getGuide } from "@/content/guides";
import type { Guide, Screenshot, Step } from "@/content/types";
import { useCompletedSet } from "@/lib/use-local-storage";
import { cn } from "cn";

export function GuideView({ guide, screenshots }: { guide: Guide; screenshots: StepScreenshotMap }) {
  const { ids, toggle, reset, has, hydrated } = useCompletedSet(`dlp-playbook:guide:${guide.slug}`);
  const total = countSteps(guide);
  const done = hydrated ? ids.length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const related = (guide.related ?? []).map(getGuide).filter((g): g is Guide => Boolean(g));
  const stepNumbers = new Map<string, number>();
  guide.phases.forEach((p) => p.steps.forEach((s) => stepNumbers.set(s.id, stepNumbers.size + 1)));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{guide.category}</Badge>
            <StatusBadge status={guide.status} />
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{guide.title}</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">{guide.summary}</p>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <div className="inline-flex items-center gap-1.5">
              <ListChecksIcon className="size-3.5" />
              <dt className="sr-only">Steps</dt>
              <dd>{total} steps</dd>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" />
              <dt className="sr-only">Time</dt>
              <dd>~{guide.estimatedMinutes} min</dd>
            </div>
            <div>
              <dt className="inline">Updated </dt>
              <dd className="inline">{guide.lastUpdated}</dd>
            </div>
            <div>
              <dt className="inline">Owner </dt>
              <dd className="inline">{guide.owner}</dd>
            </div>
          </dl>
          {guide.status === "review" && guide.reviewNote ? (
            <Alert className="mt-5 border-amber-200 bg-amber-50 text-amber-950">
              <AlertTitle>Pending review</AlertTitle>
              <AlertDescription className="text-amber-900/90">{guide.reviewNote}</AlertDescription>
            </Alert>
          ) : null}
        </header>

        <StationStrip className="mb-6" />

        {guide.whenToUse.length > 0 || guide.prerequisites.length > 0 ? (
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {guide.whenToUse.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">When to use this</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm text-foreground/90">
                    {guide.whenToUse.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
            {guide.prerequisites.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Before you start</CardTitle>
                  <CardDescription>All of these should be true.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-1.5 text-sm text-foreground/90">
                    {guide.prerequisites.map((p) => (
                      <li key={p} className="flex gap-2">
                        <CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-12">
          {guide.phases.map((phase) => (
            <section key={phase.id} id={phase.id} className="scroll-mt-24">
              {guide.phases.length > 1 || phase.description ? (
                <div className="mb-5 border-b pb-3">
                  <h2 className="text-xl font-semibold tracking-tight">{phase.title}</h2>
                  {phase.description ? <p className="mt-1 text-sm text-muted-foreground">{phase.description}</p> : null}
                </div>
              ) : null}
              <ol className="flex flex-col gap-6">
                {phase.steps.map((step) => {
                  return (
                    <StepCard
                      key={step.id}
                      step={step}
                      number={stepNumbers.get(step.id) ?? 0}
                      guideSlug={guide.slug}
                      shots={screenshots[step.id] ?? []}
                      done={hydrated && has(step.id)}
                      onToggle={() => toggle(step.id)}
                    />
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        {guide.troubleshooting.length > 0 ? (
          <section id="troubleshooting" className="mt-14 scroll-mt-24">
            <SectionHeading
              title="Troubleshooting"
              description="Match what you see on the left. Escalate when the fix does not work within the time stated."
            />
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">What you see</TableHead>
                    <TableHead>What to do</TableHead>
                    <TableHead className="w-[25%]">When to escalate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guide.troubleshooting.map((t) => (
                    <TableRow key={t.symptom} className="align-top">
                      <TableCell className="whitespace-normal font-medium">{t.symptom}</TableCell>
                      <TableCell className="whitespace-normal text-foreground/90">{t.fix}</TableCell>
                      <TableCell className="whitespace-normal text-muted-foreground">
                        {t.escalate ?? "Not usually needed."}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Not listed here?{" "}
              <Link href="/escalations" className="text-primary underline underline-offset-4">
                Use the escalation path
              </Link>
              .
            </p>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-12">
            <SectionHeading title="Related guides" />
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <Button key={r.slug} variant="outline" render={<Link href={`/guides/${r.slug}`} />}>
                  {r.title}
                  <StatusBadge status={r.status} className="ml-1" />
                </Button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <aside className="no-print lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your progress</CardTitle>
            <CardDescription>
              {done === total && total > 0
                ? "All steps ticked. Do not forget the shift log."
                : `${done} of ${total} steps ticked. Saved in this browser.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Progress value={pct} className="flex-1" />
              <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
            </div>
            <nav aria-label="Steps" className="flex flex-col gap-3">
              {guide.phases.map((phase) => (
                <div key={phase.id}>
                  <a href={`#${phase.id}`} className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                    {guide.phases.length > 1 ? phase.title : "Steps"}
                  </a>
                  <ul className="mt-1 flex flex-col">
                    {phase.steps.map((s) => {
                      const isDone = hydrated && has(s.id);
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={cn(
                              "flex items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-muted",
                              isDone ? "text-muted-foreground line-through" : "text-foreground/90",
                            )}
                          >
                            <span
                              className={cn(
                                "size-1.5 shrink-0 rounded-full",
                                isDone ? "bg-emerald-500" : "bg-border",
                              )}
                            />
                            <span className="truncate">{s.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {guide.troubleshooting.length > 0 ? (
                <a href="#troubleshooting" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                  Troubleshooting
                </a>
              ) : null}
            </nav>
            <div className="flex flex-col gap-2 border-t pt-4">
              <Button variant="outline" size="sm" onClick={reset} disabled={done === 0}>
                <RotateCcwIcon data-icon="inline-start" />
                Reset checklist
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.print()}>
                <PrinterIcon data-icon="inline-start" />
                Print this guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function StepCard({
  step,
  number,
  guideSlug,
  shots,
  done,
  onToggle,
}: {
  step: Step;
  number: number;
  guideSlug: string;
  shots: Screenshot[];
  done: boolean;
  onToggle: () => void;
}) {
  const checkboxId = `done-${step.id}`;
  const slotPath =
    step.wantsScreenshot === false ? undefined : `public/screenshots/${guideSlug}/${String(number).padStart(2, "0")}.png`;
  return (
    <li id={step.id} className="scroll-mt-24">
      <article
        className={cn(
          "rounded-xl border bg-card transition-colors",
          done ? "border-emerald-200 bg-emerald-50/30" : "",
        )}
      >
        <div className="flex items-start gap-4 p-5">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
              done ? "bg-emerald-600 text-white" : "bg-primary text-primary-foreground",
            )}
            aria-hidden
          >
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-tight">{step.title}</h3>
              <div className="no-print inline-flex items-center gap-2 rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted">
                <Checkbox id={checkboxId} checked={done} onCheckedChange={onToggle} />
                <label htmlFor={checkboxId} className="cursor-pointer select-none">
                  Done
                </label>
              </div>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/90">{linkify(step.summary)}</p>
            {step.details && step.details.length > 0 ? (
              <ul className="mt-3 flex list-disc flex-col gap-1 pl-5 text-sm text-foreground/85">
                {step.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            ) : null}
            {step.expected ? (
              <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/60 px-3.5 py-2.5 text-sm text-emerald-950">
                <span className="font-medium">You should see: </span>
                {step.expected}
              </div>
            ) : null}
            {step.callout ? <Callout callout={step.callout} className="mt-4" /> : null}
            <StepScreenshots shots={shots} slotPath={slotPath} className="mt-4" />
          </div>
        </div>
      </article>
    </li>
  );
}

const URL_RE = /(https?:\/\/[^\s]+)/g;
const URL_TEST = /^https?:\/\/[^\s]+$/;

/** Turn bare URLs in step text into links that open in a new tab. */
function linkify(text: string): React.ReactNode {
  const parts = text.split(URL_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    URL_TEST.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer" className="break-all text-primary underline underline-offset-4">
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
