import type { Metadata } from "next";
import Link from "next/link";
import { ClockIcon, ListChecksIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { countSteps, guides } from "@/content/guides";
import type { Guide } from "@/content/types";

export const metadata: Metadata = { title: "Step-by-step guides" };

const CATEGORY_ORDER: Guide["category"][] = ["Live Operations", "Scheduling", "Content", "Shift"];

export default function GuidesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Guides"
        title="Step-by-step guides"
        description="Every procedure a DLP runs in Cloudport, written to be followed under pressure: one action per step, what you should see when it worked, and what to do when it did not."
      />
      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((category) => {
          const list = guides.filter((g) => g.category === category);
          if (list.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {list.map((g) => (
                  <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                    <Card className="h-full transition-colors group-hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <StatusBadge status={g.status} />
                          {g.status !== "coming-soon" ? (
                            <span className="inline-flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <ListChecksIcon className="size-3.5" /> {countSteps(g)} steps
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <ClockIcon className="size-3.5" /> ~{g.estimatedMinutes} min
                              </span>
                            </span>
                          ) : null}
                        </div>
                        <CardTitle className="mt-2 text-lg group-hover:text-primary">{g.title}</CardTitle>
                        <CardDescription>{g.summary}</CardDescription>
                      </CardHeader>
                      {g.whenToUse.length > 0 ? (
                        <CardContent>
                          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Use when</p>
                          <ul className="flex flex-wrap gap-1.5">
                            {g.whenToUse.slice(0, 3).map((w) => (
                              <Badge key={w} variant="outline" className="h-auto whitespace-normal py-0.5 text-left font-normal">
                                {w}
                              </Badge>
                            ))}
                          </ul>
                        </CardContent>
                      ) : null}
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
