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
 * Index of guides. Each row is a link to the guide page, which holds the
 * steps, screenshots, checklist and troubleshooting table. Method guides are
 * indented under their parent overview.
 */
export function GuideList({ guides }: { guides: Guide[] }) {
  return (
    <ul className="divide-y rounded-lg border bg-card">
      {guideTree(guides).map(({ guide: g, parent }) => {
        const comingSoon = g.status === "coming-soon";
        const shots =
          comingSoon || g.kind === "overview" ? 0 : countScreenshots(g);
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
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {g.summary}
                </p>
                {!comingSoon ? (
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    {g.kind === "overview" ? (
                      <span>{g.methods?.length ?? 0} methods</span>
                    ) : (
                      <>
                        <span className="inline-flex items-center gap-1">
                          <ListChecksIcon className="size-3.5" />{" "}
                          {countSteps(g)} steps
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon className="size-3.5" /> ~
                          {g.estimatedMinutes} min
                        </span>
                        {shots > 0 ? (
                          <span className="inline-flex items-center gap-1">
                            <ImageIcon className="size-3.5" /> {shots}{" "}
                            screenshot{shots === 1 ? "" : "s"}
                          </span>
                        ) : null}
                      </>
                    )}
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
