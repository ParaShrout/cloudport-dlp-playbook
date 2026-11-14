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
import {
  TROUBLESHOOTING_GROUPS,
  troubleshooting,
  type TroubleshootingEntry,
} from "@/content/troubleshooting";
import { cn } from "cn";

export const metadata: Metadata = { title: "Quick troubleshooting" };

export default function TroubleshootingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Quick reference"
        title="Quick troubleshooting"
        description="The situations DLPs actually hit on a normal day, written symptom-first so you can find the fix fast. Each entry gives the recommended option first and links to the full step-by-step guide. If it is on air and you cannot fix it in a minute, post in your station channel and let Ops take it."
        actions={
          <Button
            variant="outline"
            render={<Link href="/escalations#report" />}
          >
            Report an issue
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          <nav
            aria-label="Situations"
            className="rounded-xl border bg-card p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              What is happening?
            </p>
            <div className="mt-3 flex flex-col gap-4">
              {TROUBLESHOOTING_GROUPS.map((group) => {
                const list = troubleshooting.filter((t) => t.group === group);
                if (list.length === 0) return null;
                return (
                  <div key={group}>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                      {group}
                    </p>
                    <ul className="flex flex-col">
                      {list.map((t) => (
                        <li key={t.id}>
                          <a
                            href={`#${t.id}`}
                            className="block rounded px-2 py-1 text-sm leading-snug text-foreground/85 hover:bg-muted"
                          >
                            {t.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
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

        <div className="flex min-w-0 flex-col gap-10">
          {TROUBLESHOOTING_GROUPS.map((group) => {
            const list = troubleshooting.filter((t) => t.group === group);
            if (list.length === 0) return null;
            return (
              <section key={group}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {group}
                </h2>
                <div className="flex flex-col gap-6">
                  {list.map((t) => (
                    <Entry key={t.id} entry={t} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Entry({ entry: t }: { entry: TroubleshootingEntry }) {
  return (
    <Card id={t.id} className="scroll-mt-24">
      <CardHeader>
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

        {t.options?.map((o, i) => (
          <div
            key={o.title}
            className={cn(
              "rounded-lg border p-4",
              o.recommended ? "border-primary/30 bg-primary/[0.03]" : "",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Option {i + 1}
              </span>
              <h3 className="font-semibold leading-snug">{o.title}</h3>
              {o.recommended ? <Badge>Recommended</Badge> : null}
            </div>
            {o.note ? (
              <p className="mt-1.5 text-sm text-muted-foreground">{o.note}</p>
            ) : null}
            <Steps steps={o.steps} className="mt-3" />
            {o.tips?.map((tip) => (
              <Callout
                key={tip}
                callout={{ kind: "tip", text: tip }}
                className="mt-3"
              />
            ))}
          </div>
        ))}

        {t.tips?.map((tip) => (
          <Callout key={tip} callout={{ kind: "tip", text: tip }} />
        ))}

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
