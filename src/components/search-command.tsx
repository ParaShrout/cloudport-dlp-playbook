"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { buildSearchIndex, type SearchItem } from "@/lib/search";

const GROUP_ORDER: SearchItem["group"][] = [
  "Guides",
  "Steps",
  "Troubleshooting",
  "Escalations",
  "Operations",
  "Training",
  "Glossary",
];

/*
 * One dialog per page, many triggers. The open state lives in a tiny
 * module-level store so the header button, the dashboard hero button and the
 * keyboard shortcut all drive the same dialog.
 */
let isOpen = false;
const listeners = new Set<() => void>();
function setOpen(next: boolean) {
  isOpen = next;
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
function useSearchOpen() {
  return React.useSyncExternalStore(
    subscribe,
    () => isOpen,
    () => false,
  );
}

export function SearchTrigger({ className }: { className?: string }) {
  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => setOpen(true)}
      aria-label="Search the playbook"
    >
      <SearchIcon data-icon="inline-start" />
      <span className="hidden text-muted-foreground sm:inline">Search steps, terms, escalations…</span>
      <span className="text-muted-foreground sm:hidden">Search</span>
      <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground md:inline-block">
        /
      </kbd>
    </Button>
  );
}

function matchScore(value: string, search: string, keywords?: string[]): number {
  const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return 1;
  const title = value.toLowerCase();
  const rest = (keywords ?? []).join(" ").toLowerCase();
  const all = `${title} ${rest}`;
  if (!terms.every((t) => all.includes(t))) return 0;
  if (terms.every((t) => title.includes(t))) return 1;
  return 0.5;
}

export function SearchDialog() {
  const open = useSearchOpen();
  const router = useRouter();
  const index = React.useMemo(() => buildSearchIndex(), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search the playbook"
      description="Jump to a guide, a step, a glossary term or an escalation path"
      className="sm:max-w-xl"
    >
      <Command filter={matchScore}>
        <CommandInput placeholder="Type what you are trying to do…" autoFocus />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No matches. Try a different word, or check the Glossary.</CommandEmpty>
          {GROUP_ORDER.map((group) => {
            const items = index.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    keywords={[item.subtitle ?? "", item.keywords ?? ""]}
                    onSelect={() => go(item.href)}
                    className="flex-col items-start gap-0.5 py-2"
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.subtitle ? (
                      <span className="line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</span>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
