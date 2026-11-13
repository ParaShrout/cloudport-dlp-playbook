import Link from "next/link";
import {
  ChevronRightIcon,
  ClockIcon,
  ImageIcon,
  ListChecksIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { countSteps, guideTree } from "@/content/guides";
import { countScreenshots } from "@/lib/screenshots";
import type { Guide } from "@/content/types";
import { cn } from "cn";

/**
 * Index of guides. Each procedure row links to its guide page. An overview
 * (e.g. Live Cut-Ins) is not a page of its own: it renders as a section
 * header carrying its usage notes, with its method guides indented beneath.
 */
export function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {guideTree(guides).map(({ guide: g, parent }) => {
        if (g.kind === "overview") {
          return (
            <li
              key={g.slug}
              id={g.slug}
              className="scroll-mt-24 px-4 py-4 sm:px-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold leading-snug tracking-tight">
                  {g.title}
                </span>
                <StatusBadge status={g.status} />
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {g.summary}
              </p>
              {g.intro && g.intro.length > 0 ? (
                <div className="mt-3 rounded-lg border bg-muted/40 p-3.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Note on usage
                  </p>
                  <div className="mt-1.5 flex flex-col gap-2 text-sm leading-relaxed text-foreground/90">
                    {g.intro.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              ) : null}
              <p className="mt-2.5 text-xs text-muted-foreground">
                {g.methods?.length ?? 0} methods, below.
              </p>
            </li>
          );
        }

        const comingSoon = g.status === "coming-soon";
        const shots = comingSoon ? 0 : countScreenshots(g);
        const note = parent?.methods?.find((m) => m.slug === g.slug)?.note;
        return (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className={cn(
                "group flex items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/60 sm:px-5",
                parent ? "pl-10 sm:pl-14" : "",
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "font-semibold leading-snug tracking-tight group-hover:text-primary",
                      parent ? "text-[15px]" : "text-base",
                    )}
                  >
                    {parent ? (g.shortTitle ?? g.title) : g.title}
                  </span>
                  <StatusBadge status={g.status} />
                </div>
                {note ? (
                  <p className="mt-1 text-sm font-medium leading-relaxed text-foreground/85">
                    {note}
                  </p>
                ) : null}
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {g.summary}
                </p>
                {!comingSoon ? (
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <ListChecksIcon className="size-3.5" /> {countSteps(g)}{" "}
                      steps
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="size-3.5" /> ~{g.estimatedMinutes}{" "}
                      min
                    </span>
                    {shots > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <ImageIcon className="size-3.5" /> {shots} screenshot
                        {shots === 1 ? "" : "s"}
                      </span>
                    ) : null}
                  </p>
                ) : null}
              </div>
              <ChevronRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
