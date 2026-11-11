"use client";

import Link from "next/link";
import { ArrowRightIcon, GraduationCapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trainingModules } from "@/content/training";
import { useCompletedSet } from "@/lib/use-local-storage";

export const TRAINING_STORAGE_KEY = "dlp-playbook:training";

export function TrainingProgressCard() {
  const { ids, hydrated } = useCompletedSet(TRAINING_STORAGE_KEY);
  const total = trainingModules.reduce((n, m) => n + m.items.length, 0);
  const done = hydrated ? ids.length : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const nextModule = trainingModules.find((m) => m.items.some((i) => !ids.includes(i.id)));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCapIcon className="size-4 text-primary" />
          <CardTitle>New to the team?</CardTitle>
        </div>
        <CardDescription>
          {done === 0
            ? "Work through the training path at your own pace. Progress saves in this browser."
            : done === total
              ? "Training path complete. You are ready for sign-off."
              : `${done} of ${total} training items done. Next up: ${nextModule?.title ?? ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Progress value={pct} className="flex-1" />
          <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
        </div>
        <Button variant="outline" render={<Link href="/training" />}>
          {done === 0 ? "Start training" : "Continue training"}
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  );
}
