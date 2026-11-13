import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { dailyRhythm } from "@/content/training";

export function DailyRhythm() {
  return (
    <ol className="relative flex flex-col gap-6 border-l pl-6">
      {dailyRhythm.map((item, i) => (
        <li key={item.phase} className="relative">
          <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full border bg-background text-[10px] font-semibold text-muted-foreground">
            {i + 1}
          </span>
          <h3 className="font-medium">{item.phase}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.text}
          </p>
          {item.see.length > 0 ? (
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                See
              </span>
              {item.see.map((l) =>
                l.href ? (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="inline-flex items-center gap-0.5 font-medium text-primary underline underline-offset-4"
                  >
                    {l.label}
                    <ArrowUpRightIcon className="size-3" />
                  </Link>
                ) : (
                  <span key={l.label} className="text-foreground/80">
                    {l.label}
                  </span>
                ),
              )}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
