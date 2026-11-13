import Link from "next/link";
import { CATEGORY_ORDER, guideTree, guides } from "@/content/guides";
import { cn } from "cn";

/** Compact list of every guide, with the current one highlighted. */
export function GuideNav({
  currentSlug,
  className,
}: {
  currentSlug: string;
  className?: string;
}) {
  return (
    <nav
      aria-label="All guides"
      className={cn("rounded-xl border bg-card p-4", className)}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        All guides
      </p>
      <div className="mt-3 flex flex-col gap-4">
        {CATEGORY_ORDER.map((category) => {
          const list = guides.filter((g) => g.category === category);
          if (list.length === 0) return null;
          return (
            <div key={category}>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">
                {category}
              </p>
              <ul className="flex flex-col">
                {guideTree(list).map(({ guide: g, parent }) => {
                  if (g.kind === "overview") {
                    return (
                      <li key={g.slug}>
                        <Link
                          href={`/guides#${g.slug}`}
                          className="block rounded px-2 py-1 text-sm font-medium leading-snug text-foreground/85 hover:bg-muted"
                        >
                          {g.title}
                        </Link>
                      </li>
                    );
                  }
                  const current = g.slug === currentSlug;
                  return (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "block rounded px-2 py-1 text-sm leading-snug",
                          parent ? "ml-3" : "",
                          current
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-foreground/85 hover:bg-muted",
                          g.status === "coming-soon" && !current
                            ? "text-muted-foreground"
                            : "",
                        )}
                      >
                        {parent ? (g.shortTitle ?? g.title) : g.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
