"use client";

import { ExternalLinkIcon, RadioIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useStation } from "@/lib/use-station";
import { cn } from "cn";

/**
 * The public stream URL for every station, with the DLP's own station first
 * and highlighted. Open the link in a player (Safari, VLC, or a browser HLS
 * extension) to watch the channel output as viewers see it.
 */
export function StationStreams({ className }: { className?: string }) {
  const { station, stations, hydrated } = useStation();
  const list = [...stations].sort(
    (a, b) => Number(b.id === station?.id) - Number(a.id === station?.id),
  );

  return (
    <div className={cn("rounded-lg border bg-muted/40 p-3.5", className)}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <RadioIcon className="size-3.5" /> Stream URLs for monitoring channel
        output
      </p>
      <ul className="mt-2 flex flex-col divide-y">
        {list.map((s) => {
          const mine = hydrated && s.id === station?.id;
          if (!s.streamUrl) return null;
          return (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 text-sm"
            >
              <span
                className={cn(
                  "w-40 shrink-0 font-medium",
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
              <a
                href={s.streamUrl}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 truncate font-mono text-xs text-primary underline underline-offset-4"
              >
                {s.streamUrl}
              </a>
              <span className="inline-flex items-center gap-1">
                <CopyButton text={s.streamUrl} label="Copy" />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">
        These are HLS playlists (.m3u8). Open in Safari or VLC, or paste into a
        browser HLS player. <ExternalLinkIcon className="inline size-3" />
      </p>
    </div>
  );
}
