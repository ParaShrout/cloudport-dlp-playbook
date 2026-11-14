import { ExternalLinkIcon, RadioIcon } from "lucide-react";
import { stations } from "@/content/operations";
import { cn } from "cn";

/**
 * Where to watch each channel's output as viewers see it. Uses the public
 * CBS News and CBS.com player pages rather than raw stream URLs, which can
 * change and should not be shared.
 */
export function StationStreams({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border bg-muted/40 p-3.5", className)}>
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <RadioIcon className="size-3.5" /> Watch the channel output
      </p>
      <ul className="mt-2 flex flex-col divide-y">
        {stations.map((s) => {
          if (!s.watchLinks?.length) return null;
          return (
            <li
              key={s.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-sm"
            >
              <span className="w-44 shrink-0 font-medium">{s.channelName}</span>
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
