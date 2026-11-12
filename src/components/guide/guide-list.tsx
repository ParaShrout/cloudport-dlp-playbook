"use client";

import Link from "next/link";
import { ArrowRightIcon, ClockIcon, ListChecksIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/callout";
import { StatusBadge } from "@/components/status-badge";
import { countSteps, getGuide } from "@/content/guides";
import type { Guide } from "@/content/types";

/**
 * Plain list of guides. Each row shows the title and description; opening a
 * row reveals every step inline. The full guide page still holds the
 * tick-off checklist, screenshots and troubleshooting table.
 */
export function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <Accordion className="rounded-lg border bg-card px-4 sm:px-5">
      {guides.map((g) => (
        <AccordionItem key={g.slug} value={g.slug}>
          <AccordionTrigger
            className="items-start gap-4 py-4 hover:no-underline"
            disabled={g.status === "coming-soon"}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold leading-snug tracking-tight">
                  {g.title}
                </span>
                <StatusBadge status={g.status} />
              </div>
              <p className="mt-1 text-sm font-normal leading-relaxed text-muted-foreground">
                {g.summary}
              </p>
              {g.status !== "coming-soon" && g.kind !== "overview" ? (
                <p className="mt-1.5 inline-flex items-center gap-3 text-xs font-normal text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <ListChecksIcon className="size-3.5" /> {countSteps(g)}{" "}
                    steps
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="size-3.5" /> ~{g.estimatedMinutes} min
                  </span>
                </p>
              ) : null}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            {g.kind === "overview" ? (
              <OverviewBody guide={g} />
            ) : (
              <StepsBody guide={g} />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function StepsBody({ guide }: { guide: Guide }) {
  const numbers = new Map<string, number>();
  guide.phases.forEach((p) =>
    p.steps.forEach((s) => numbers.set(s.id, numbers.size + 1)),
  );
  return (
    <div className="flex flex-col gap-6">
      {guide.phases.map((phase) => (
        <div key={phase.id}>
          {guide.phases.length > 1 || phase.description ? (
            <div className="mb-3">
              <h3 className="font-semibold">{phase.title}</h3>
              {phase.description ? (
                <div className="mt-0.5 text-muted-foreground">
                  {phase.description}
                </div>
              ) : null}
            </div>
          ) : null}
          <ol className="flex flex-col divide-y">
            {phase.steps.map((step) => (
              <li
                key={step.id}
                className="flex gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span className="w-6 shrink-0 pt-px text-right text-sm font-semibold tabular-nums text-muted-foreground">
                  {numbers.get(step.id)}.
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">
                    {step.title}
                  </div>
                  {step.summary !== step.title ? (
                    <div className="mt-0.5 leading-relaxed text-foreground/85">
                      {step.summary}
                    </div>
                  ) : null}
                  {step.details && step.details.length > 0 ? (
                    <ul className="mt-1.5 flex list-disc flex-col gap-0.5 pl-5 text-foreground/80">
                      {step.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ) : null}
                  {step.expected ? (
                    <div className="mt-1.5 text-emerald-800">
                      <span className="font-medium">You should see: </span>
                      {step.expected}
                    </div>
                  ) : null}
                  {step.callout ? (
                    <Callout callout={step.callout} className="mt-2" />
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <OpenGuideLink
        slug={guide.slug}
        label="Open full guide with checklist and screenshots"
      />
    </div>
  );
}

function OverviewBody({ guide }: { guide: Guide }) {
  const methods = (guide.methods ?? [])
    .map((m) => ({ ...m, guide: getGuide(m.slug) }))
    .filter((m): m is typeof m & { guide: Guide } => Boolean(m.guide));
  return (
    <div className="flex flex-col gap-4">
      {guide.intro?.map((p) => (
        <div key={p} className="leading-relaxed text-foreground/85">
          {p}
        </div>
      ))}
      {methods.length > 0 ? (
        <ul className="flex flex-col divide-y">
          {methods.map((m, i) => (
            <li
              key={m.slug}
              className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">
                  {m.guide.shortTitle ?? m.guide.title}
                  {i === 0 ? (
                    <span className="ml-2 text-xs font-normal text-primary">
                      Preferred
                    </span>
                  ) : null}
                </div>
                <div className="mt-0.5 text-muted-foreground">{m.note}</div>
              </div>
              <Link
                href={`/guides/${m.slug}`}
                className="shrink-0 text-sm text-primary"
              >
                {countSteps(m.guide)} steps
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <OpenGuideLink slug={guide.slug} label="Open full page" />
    </div>
  );
}

function OpenGuideLink({ slug, label }: { slug: string; label: string }) {
  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        render={<Link href={`/guides/${slug}`} />}
      >
        {label}
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
