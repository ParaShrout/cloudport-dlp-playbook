import Link from "next/link";
import { CbsNewsLogo } from "./cbs-news-logo";
import { site } from "@/content/site";
import { SidebarNav } from "./sidebar-nav";
import { SearchDialog, SearchTrigger } from "./search-command";
import { MobileNav } from "./mobile-nav";
import { cn } from "cn";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <aside className="no-print sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-20 items-center border-b border-sidebar-border px-5">
          <Brand onDark />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav />
        </div>
        <div className="border-t border-sidebar-border px-5 py-4 text-xs text-sidebar-foreground/60">
          <p className="font-medium text-sidebar-foreground">{site.program}</p>
          <p>{site.team}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 shadow-[inset_0_3px_0_0_var(--cbs-navy)] backdrop-blur sm:px-6 lg:shadow-none">
          <MobileNav />
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <div className="ml-auto flex min-w-0 items-center gap-2">
            <SearchTrigger className="hidden justify-start sm:inline-flex sm:w-64 lg:w-80" />
            <SearchTrigger iconOnly className="sm:hidden" />
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
        <footer className="no-print border-t px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
            <span>
              {site.name} · {site.toolName} by {site.vendorName}
            </span>
            <span>
              Found something wrong? Post it in the DLP support channel as a P3.
            </span>
          </div>
        </footer>
      </div>
      <SearchDialog />
    </div>
  );
}

function Brand({
  compact = false,
  onDark = false,
}: {
  compact?: boolean;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className="flex flex-col gap-1.5 whitespace-nowrap"
      aria-label={`${site.name} home`}
    >
      <CbsNewsLogo onDark={onDark} className={compact ? "h-4" : "h-5"} />
      <span className="flex items-baseline gap-2 leading-none">
        <span
          className={cn(
            "text-sm font-semibold tracking-tight",
            onDark ? "text-white" : "text-foreground",
          )}
        >
          {site.name}
        </span>
        {!compact ? (
          <span
            className={cn(
              "text-[11px] font-medium uppercase tracking-wider",
              onDark ? "text-sidebar-foreground/60" : "text-muted-foreground",
            )}
          >
            {site.toolName} user guide
          </span>
        ) : null}
      </span>
    </Link>
  );
}
