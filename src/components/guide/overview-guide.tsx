import Link from "next/link";
import { ArrowRightIcon, ClockIcon, ListChecksIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { StationStrip } from "@/components/station/station-path";
import { countSteps, getGuide } from "@/content/guides";
import type { Guide } from "@/content/types";

/** A guide that introduces a topic and lets the DLP pick between methods. */
export function OverviewGuide({ guide }: { guide: Guide }) {
  const methods = (guide.methods ?? [])
    .map((m) => ({ ...m, guide: getGuide(m.slug) }))
    .filter((m): m is typeof m & { guide: Guide } => Boolean(m.guide));

  return (
    <div>
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{guide.category}</Badge>
          <StatusBadge status={guide.status} />
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {guide.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{guide.summary}</p>
        {guide.status === "review" && guide.reviewNote ? (
          <Alert className="mt-5 border-amber-200 bg-amber-50 text-amber-950">
            <AlertTitle>Pending review</AlertTitle>
            <AlertDescription className="text-amber-900/90">
              {guide.reviewNote}
            </AlertDescription>
          </Alert>
        ) : null}
      </header>

      {guide.intro && guide.intro.length > 0 ? (
        <section className="mb-8 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Note on usage
          </h2>
          <div className="mt-2 flex flex-col gap-3 text-[15px] leading-relaxed text-foreground/90">
            {guide.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      ) : null}

      <StationStrip className="mb-8" />

      {methods.length > 0 ? (
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Choose a method
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {methods.map((m, i) => (
              <Card key={m.slug} className={i === 0 ? "border-primary/40" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={i === 0 ? "default" : "secondary"}>
                      {i === 0 ? "Preferred" : `Method ${i + 1}`}
                    </Badge>
                    <StatusBadge status={m.guide.status} />
                  </div>
                  <CardTitle className="mt-2 text-lg">
                    {m.guide.shortTitle ?? m.guide.title}
                  </CardTitle>
                  <CardDescription className="text-foreground/80">
                    {m.note}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    {m.guide.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <ListChecksIcon className="size-3.5" />{" "}
                      {countSteps(m.guide)} steps
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="size-3.5" /> ~
                      {m.guide.estimatedMinutes} min
                    </span>
                  </div>
                  <Button
                    variant={i === 0 ? "default" : "outline"}
                    render={<Link href={`/guides/${m.slug}`} />}
                  >
                    Open steps
                    <ArrowRightIcon data-icon="inline-end" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
