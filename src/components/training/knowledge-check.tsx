"use client";

import * as React from "react";
import { CheckCircle2Icon, RotateCcwIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quiz } from "@/content/training";
import { cn } from "cn";

export function KnowledgeCheck() {
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const answered = Object.keys(answers).length;
  const correct = quiz.filter((q) => answers[q.id] === q.answerIndex).length;
  const finished = answered === quiz.length;

  return (
    <div className="flex flex-col gap-4">
      <Card className={cn(finished ? (correct === quiz.length ? "border-emerald-200 bg-emerald-50/40" : "border-amber-200 bg-amber-50/40") : "")}>
        <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            {finished
              ? correct === quiz.length
                ? `All ${quiz.length} correct. Ask your Lead DLP to sign off module 4.`
                : `${correct} of ${quiz.length} correct. Re-read the explanations below, then reset and try again.`
              : `${answered} of ${quiz.length} answered. Pick an answer to see the explanation straight away.`}
          </p>
          <Button variant="ghost" size="sm" onClick={() => setAnswers({})} disabled={answered === 0}>
            <RotateCcwIcon data-icon="inline-start" />
            Reset quiz
          </Button>
        </CardContent>
      </Card>

      <ol className="flex flex-col gap-4">
        {quiz.map((q, qi) => {
          const chosen = answers[q.id];
          const isAnswered = chosen !== undefined;
          const isCorrect = chosen === q.answerIndex;
          return (
            <li key={q.id}>
              <Card>
                <CardHeader>
                  <CardDescription className="text-xs uppercase tracking-wide">Question {qi + 1}</CardDescription>
                  <CardTitle className="text-base leading-snug">{q.question}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {q.options.map((opt, oi) => {
                    const selected = chosen === oi;
                    const showCorrect = isAnswered && oi === q.answerIndex;
                    const showWrong = isAnswered && selected && !isCorrect;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                          !isAnswered && "hover:border-primary/60 hover:bg-muted",
                          showCorrect && "border-emerald-300 bg-emerald-50 text-emerald-950",
                          showWrong && "border-red-300 bg-red-50 text-red-950",
                          isAnswered && !showCorrect && !showWrong && "opacity-60",
                        )}
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showCorrect ? <CheckCircle2Icon className="size-4 text-emerald-600" /> : null}
                        {showWrong ? <XCircleIcon className="size-4 text-red-600" /> : null}
                      </button>
                    );
                  })}
                  {isAnswered ? (
                    <p
                      className={cn(
                        "mt-1 rounded-lg px-3 py-2 text-sm",
                        isCorrect ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950",
                      )}
                    >
                      <span className="font-medium">{isCorrect ? "Correct. " : "Not quite. "}</span>
                      {q.explanation}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
