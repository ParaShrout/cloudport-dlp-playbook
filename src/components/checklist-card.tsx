"use client";

import Link from "next/link";
import { RotateCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { guideHref } from "@/content/guides";
import type { Checklist } from "@/content/types";
import { useCompletedSet } from "@/lib/use-local-storage";
import { cn } from "cn";

export function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const { ids, toggle, reset, has, hydrated } = useCompletedSet(
    `dlp-playbook:checklist:${checklist.id}`,
  );
  const done = hydrated ? ids.length : 0;
  const total = checklist.items.length;

  return (
    <Card id={checklist.id} className="scroll-mt-24">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{checklist.title}</CardTitle>
            <CardDescription>{checklist.description}</CardDescription>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 text-xs tabular-nums",
              done === total && total > 0
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "text-muted-foreground",
            )}
          >
            {done}/{total}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ul className="flex flex-col">
          {checklist.items.map((item) => {
            const checked = hydrated && has(item.id);
            const id = `${checklist.id}-${item.id}`;
            return (
              <li key={item.id}>
                <div className="flex items-start gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={() => toggle(item.id)}
                    className="mt-0.5"
                  />
                  <span
                    className={cn(
                      "flex-1",
                      checked ? "text-muted-foreground line-through" : "",
                    )}
                  >
                    <label htmlFor={id} className="cursor-pointer">
                      {item.text}
                    </label>
                    {item.guide ? (
                      <>
                        {" "}
                        <Link
                          href={guideHref(item.guide)}
                          className="text-xs text-primary underline underline-offset-4"
                        >
                          guide
                        </Link>
                      </>
                    ) : null}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={done === 0}
          >
            <RotateCcwIcon data-icon="inline-start" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
