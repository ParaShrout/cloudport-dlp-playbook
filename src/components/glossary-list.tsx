"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { glossary } from "@/content/glossary";
import { slugify } from "@/lib/search";

export function GlossaryList() {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const terms = React.useMemo(
    () =>
      [...glossary]
        .sort((a, b) => a.term.localeCompare(b.term))
        .filter(
          (t) =>
            q === "" ||
            t.term.toLowerCase().includes(q) ||
            t.definition.toLowerCase().includes(q) ||
            (t.aka ?? []).some((a) => a.toLowerCase().includes(q)),
        ),
    [q],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="relative max-w-md">
        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter terms…"
          className="pl-8"
          aria-label="Filter glossary"
        />
      </div>
      {terms.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No terms match &ldquo;{query}&rdquo;. If it is a term DLPs use, ask for it to be added (Sev 4).
        </p>
      ) : (
        <dl className="divide-y rounded-lg border bg-card">
          {terms.map((t) => (
            <div key={t.term} id={slugify(t.term)} className="scroll-mt-24 grid gap-1 px-4 py-3 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
              <dt>
                <span className="font-medium">{t.term}</span>
                {t.aka && t.aka.length > 0 ? (
                  <span className="mt-1 flex flex-wrap gap-1">
                    {t.aka.map((a) => (
                      <Badge key={a} variant="outline" className="font-normal text-muted-foreground">
                        {a}
                      </Badge>
                    ))}
                  </span>
                ) : null}
              </dt>
              <dd className="text-sm leading-relaxed text-foreground/85">{t.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
