"use client";

import { ExternalLinkIcon, RadioIcon } from "lucide-react";
import { useStation } from "@/lib/use-station";
import { cn } from "cn";

/**
 * Where to watch each channel's output as viewers see it. The DLP's own
 * station is listed first and highlighted. Uses the public CBS News and
 * CBS.com player pages rather than raw stream URLs, which can change and
 * should not be shared.
 */
export function StationStreams({ className }: { className?: string }) {
  const { station, stations, hydrated } = useStation();
  const list = [...stations].sort(
    (a, b) => Number(b.id === station?.id) - Number(a.id === station?.id),
  );

  return (
    <div className={cn("rounded-lg border bg-muted/40 p-3.5", className)}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <RadioIcon className="size-3.5" /> Watch the channel output
      </p>
      <ul className="mt-2 flex flex-col divide-y">
        {list.map((s) => {
          const mine = hydrated && s.id === station?.id;
          if (!s.watchLinks?.length) return null;
          return (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-sm"
            >
              <span
                className={cn(
                  "w-44 shrink-0 font-medium",
                  mine ? "text-primary" : "",
                )}
              >
                {s.channelName}
                {mine ? (
                  <span className="ml-1.5 text-xs font-normal text-primary">
                    your station
                  </span>
                ) : null}
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {s.watchLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4"
                  >
                    {l.label} <ExternalLinkIcon className="size-3" />
                  </a>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        These are the public live players, so you see exactly what viewers see.
        Expect a short delay behind the Cloudport preview.
      </p>
    </div>
  );
}
