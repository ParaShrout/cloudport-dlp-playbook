import Link from "next/link";
import { RadioTowerIcon } from "lucide-react";
import { site } from "@/content/site";
import { SidebarNav } from "./sidebar-nav";
import { SearchDialog, SearchTrigger } from "./search-command";
import { MobileNav } from "./mobile-nav";
import { StationSwitcher } from "./station-switcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1">
      <aside className="no-print sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <Brand />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav />
        </div>
        <div className="border-t px-5 py-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">{site.program}</p>
          <p>{site.team}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <MobileNav />
          <div className="lg:hidden">
            <Brand compact />
          </div>
          <div className="ml-auto flex min-w-0 items-center gap-2">
            <SearchTrigger className="hidden justify-start sm:inline-flex sm:w-64 lg:w-80" />
            <SearchTrigger iconOnly className="sm:hidden" />
            <StationSwitcher />
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
            <span>Found something wrong? Post it in the DLP support channel as a Sev 4.</span>
          </div>
        </footer>
      </div>
      <SearchDialog />
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <RadioTowerIcon className="size-4" />
      </span>
      <span className="flex flex-col leading-tight whitespace-nowrap">
        <span className="text-sm font-semibold">{site.name}</span>
        {!compact ? <span className="text-xs text-muted-foreground">{site.toolName} user guide</span> : null}
      </span>
    </Link>
  );
}
