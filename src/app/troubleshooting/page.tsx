import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, BookOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Callout } from "@/components/callout";
import { PageHeader } from "@/components/page-header";
import { Screenshot } from "@/components/screenshot";
import {
  troubleshooting,
  type TroubleshootingEntry,
  type TroubleshootingImage,
  type TroubleshootingOption,
} from "@/content/troubleshooting";
import { cn } from "cn";

export const metadata: Metadata = { title: "Quick troubleshooting" };

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function TroubleshootingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Quick reference"
        title="Quick troubleshooting"
        description="The situations DLPs hit most often, with the fix for each. Every section says when it applies, gives the recommended option first and links to the full step-by-step guide. If it is on air and you cannot fix it in a minute, post in your station channel and let Ops take it."
        actions={
          <Button
            variant="outline"
            render={<Link href="/escalations#report" />}
          >
            Issue post template
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Contents" className="rounded-xl border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contents
            </p>
            <ol className="mt-3 flex flex-col">
              {troubleshooting.map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="flex gap-2 rounded px-2 py-1.5 text-sm leading-snug text-foreground/85 hover:bg-muted"
                  >
                    <span className="w-4 shrink-0 tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    <span>{t.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
              Need the full procedure?{" "}
              <Link
                href="/guides"
                className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
              >
                <BookOpenIcon className="size-3" /> Step-by-step guides
              </Link>
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-col gap-8">
          {troubleshooting.map((t, i) => (
            <Entry key={t.id} entry={t} number={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Entry({
  entry: t,
  number,
}: {
  entry: TroubleshootingEntry;
  number: number;
}) {
  return (
    <Card id={t.id} className="scroll-mt-24">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Section {number}
        </p>
        <CardTitle className="text-lg">{t.title}</CardTitle>
        <CardDescription className="text-foreground/80">
          <span className="font-medium text-foreground">When: </span>
          {t.when}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {t.overview?.map((p) => (
          <p key={p} className="text-sm leading-relaxed text-foreground/90">
            {p}
          </p>
        ))}

        {t.steps ? <Steps steps={t.steps} /> : null}

        {t.images ? <Images images={t.images} /> : null}

        {t.tips?.map((tip) => (
          <Callout key={tip} callout={{ kind: "tip", text: tip }} />
        ))}

        {t.options?.map((o) => (
          <Option key={o.title} option={o} />
        ))}

        {t.reminder ? (
          <div className="rounded-lg border border-primary/30 bg-primary/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Quick reminder
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm font-medium">
              {t.reminder.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {t.related && t.related.length > 0 ? (
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-4 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Full guide
            </span>
            {t.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-0.5 font-medium text-primary underline underline-offset-4"
              >
                {r.label}
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            ))}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Option({ option: o }: { option: TroubleshootingOption }) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        o.recommended ? "border-primary/30 bg-primary/[0.03]" : "",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {o.option ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Option {o.option}
          </span>
        ) : null}
        <h3 className="font-semibold leading-snug">{o.title}</h3>
        {o.recommended ? <Badge>Recommended</Badge> : null}
      </div>
      {o.note ? (
        <p className="mt-1.5 text-sm text-muted-foreground">{o.note}</p>
      ) : null}
      {o.text?.map((p) => (
        <p key={p} className="mt-2 text-sm leading-relaxed text-foreground/90">
          {p}
        </p>
      ))}
      {o.steps ? <Steps steps={o.steps} className="mt-3" /> : null}
      {o.images ? <Images images={o.images} className="mt-4" /> : null}
      {o.tips?.map((tip) => (
        <Callout
          key={tip}
          callout={{ kind: "tip", text: tip }}
          className="mt-3"
        />
      ))}
    </div>
  );
}

function Steps({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol className={cn("flex flex-col gap-2", className)}>
      {steps.map((s, i) => (
        <li key={s} className="flex gap-3 text-sm leading-relaxed">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
            {i + 1}
          </span>
          <span className="text-foreground/90">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/** The guide's screenshots are small crops, so they render at natural size. */
function Images({
  images,
  className,
}: {
  images: TroubleshootingImage[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-3", className)}>
      {images.map((img) => (
        <Screenshot
          key={img.file}
          shot={{
            src: `${BASE_PATH}/screenshots/troubleshooting/${img.file}`,
            alt: img.alt,
            caption: img.caption,
          }}
          className="w-fit max-w-full"
        />
      ))}
    </div>
  );
}
