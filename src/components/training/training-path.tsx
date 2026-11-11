"use client";

import Link from "next/link";
import { ExternalLinkIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { trainingModules } from "@/content/training";
import { useCompletedSet } from "@/lib/use-local-storage";
import { TRAINING_STORAGE_KEY } from "@/components/training-progress-card";
import { cn } from "cn";

export function TrainingPath() {
  const { ids, toggle, reset, has, hydrated } = useCompletedSet(TRAINING_STORAGE_KEY);
  const total = trainingModules.reduce((n, m) => n + m.items.length, 0);
  const done = hydrated ? ids.length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium">
              {done === total && total > 0 ? "Training path complete" : `${done} of ${total} items complete`}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <Progress value={pct} className="flex-1" />
              <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} disabled={done === 0}>
            <RotateCcwIcon data-icon="inline-start" />
            Reset progress
          </Button>
        </CardContent>
      </Card>

      <ol className="flex flex-col gap-4">
        {trainingModules.map((m) => {
          const moduleDone = m.items.filter((i) => hydrated && has(i.id)).length;
          const complete = moduleDone === m.items.length;
          return (
            <li key={m.id} id={m.id} className="scroll-mt-24">
              <Card className={cn(complete ? "border-emerald-200" : "")}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle>{m.title}</CardTitle>
                      <CardDescription className="mt-1 text-foreground/80">{m.goal}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{m.duration}</span>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 tabular-nums",
                          complete ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "",
                        )}
                      >
                        {moduleDone}/{m.items.length}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col">
                    {m.items.map((item) => {
                      const checked = hydrated && has(item.id);
                      const id = `training-${item.id}`;
                      const external = item.href?.startsWith("http");
                      return (
                        <li key={item.id}>
                          <div className="flex items-start gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted">
                            <Checkbox id={id} checked={checked} onCheckedChange={() => toggle(item.id)} className="mt-0.5" />
                            <span className={cn("flex-1", checked ? "text-muted-foreground line-through" : "")}>
                              <label htmlFor={id} className="cursor-pointer">
                                {item.text}
                              </label>
                              {item.href ? (
                                <>
                                  {" "}
                                  {external ? (
                                    <a
                                      href={item.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-0.5 text-xs text-primary underline underline-offset-4"
                                    >
                                      {item.hrefLabel ?? "Open"}
                                      <ExternalLinkIcon className="size-3" />
                                    </a>
                                  ) : (
                                    <Link href={item.href} className="text-xs text-primary underline underline-offset-4">
                                      {item.hrefLabel ?? "Open"}
                                    </Link>
                                  )}
                                </>
                              ) : null}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
