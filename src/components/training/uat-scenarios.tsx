"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  RotateCcwIcon,
  WrenchIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  UAT_STORAGE_KEY,
  countScenarios,
  uatHowTo,
  uatPart1,
  uatPart2,
  type UatGroup,
} from "@/content/uat";
import { useCompletedSet } from "@/lib/use-local-storage";
import { cn } from "cn";

/**
 * Practice scenarios checklist. One checkbox per scenario ("I can do this
 * without help"); the bullets describe what the scenario covers. Progress is
 * saved in the browser. Part 2 is for station engineering and is collapsed.
 */
export function UatScenarios() {
  const { ids, toggle, reset, has, hydrated } =
    useCompletedSet(UAT_STORAGE_KEY);
  const part1Ids = uatPart1.flatMap((g) => g.scenarios.map((s) => s.id));
  const total = part1Ids.length;
  const done = hydrated ? part1Ids.filter((id) => ids.includes(id)).length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const [showEngineering, setShowEngineering] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-sm font-medium">
                {done === total && total > 0
                  ? "All DLP scenarios signed off"
                  : `${done} of ${total} DLP scenarios signed off`}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={pct} className="flex-1" />
                <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                  {pct}%
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              disabled={!hydrated || ids.length === 0}
            >
              <RotateCcwIcon data-icon="inline-start" />
              Reset
            </Button>
          </div>
          <div className="grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <p>{uatHowTo.intro}</p>
            <p>{uatHowTo.notes}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Part 1: Digital Line Producer scenarios
          </h3>
          <div className="flex flex-col gap-6">
            {uatPart1.map((g) => (
              <GroupBlock
                key={g.id}
                group={g}
                has={(id) => hydrated && has(id)}
                toggle={toggle}
              />
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowEngineering((v) => !v)}
            aria-expanded={showEngineering}
            className="flex w-full items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-left hover:bg-muted/60"
          >
            <span className="flex items-center gap-2">
              <WrenchIcon className="size-4 text-muted-foreground" />
              <span className="font-semibold">
                Part 2: Engineering checklist
              </span>
              <Badge variant="secondary">
                {countScenarios(uatPart2)} blocks
              </Badge>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                For station engineering, not DLPs
              </span>
            </span>
            <ChevronDownIcon
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform",
                showEngineering ? "rotate-180" : "",
              )}
            />
          </button>
          {showEngineering ? (
            <div className="mt-4 flex flex-col gap-6">
              {uatPart2.map((g) => (
                <GroupBlock
                  key={g.id}
                  group={g}
                  has={(id) => hydrated && has(id)}
                  toggle={toggle}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function GroupBlock({
  group: g,
  has,
  toggle,
}: {
  group: UatGroup;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}) {
  const done = g.scenarios.filter((s) => has(s.id)).length;
  const complete = done === g.scenarios.length;
  return (
    <Card
      id={`uat-${g.id}`}
      className={cn("scroll-mt-24", complete ? "border-emerald-200" : "")}
    >
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle>{g.title}</CardTitle>
            {g.note ? (
              <CardDescription className="mt-1 text-foreground/80">
                {g.note}
              </CardDescription>
            ) : null}
          </div>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs tabular-nums text-muted-foreground",
              complete
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "",
            )}
          >
            {done}/{g.scenarios.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col divide-y">
          {g.scenarios.map((s) => {
            const checked = has(s.id);
            const inputId = `uat-${s.id}`;
            return (
              <li key={s.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={inputId}
                    checked={checked}
                    onCheckedChange={() => toggle(s.id)}
                    className="mt-1"
                    aria-label={`I can do this: ${s.title}`}
                  />
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor={inputId}
                      className="flex cursor-pointer flex-wrap items-baseline gap-x-2"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {s.number}
                      </span>
                      <span
                        className={cn(
                          "font-medium",
                          checked ? "text-muted-foreground line-through" : "",
                        )}
                      >
                        {s.title}
                      </span>
                      {s.skipNote ? (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          {s.skipNote}
                        </Badge>
                      ) : null}
                    </label>
                    {s.intro ? (
                      <p className="mt-1.5 text-sm text-foreground/85">
                        {s.intro}
                      </p>
                    ) : null}
                    <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 text-sm text-foreground/85">
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                    {s.related && s.related.length > 0 ? (
                      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                          Learn it
                        </span>
                        {s.related.map((r) => (
                          <Link
                            key={r.href}
                            href={r.href}
                            className="inline-flex items-center gap-0.5 font-medium text-primary underline underline-offset-4"
                          >
                            {r.label}
                            <ArrowUpRightIcon className="size-3" />
                          </Link>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
