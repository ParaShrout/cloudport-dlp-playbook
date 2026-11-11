"use client";

import { ChevronDownIcon, MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStation } from "@/lib/use-station";
import { cn } from "cn";

export function StationSwitcher({ className }: { className?: string }) {
  const { station, stationId, select, stations, hydrated } = useStation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={hydrated && !station ? "default" : "outline"}
            className={cn("justify-start", className)}
            aria-label="Choose your station"
          />
        }
      >
        <MapPinIcon data-icon="inline-start" />
        <span className="truncate">
          {!hydrated ? (
            "Station"
          ) : station ? (
            <>
              {station.market}
              <span className="hidden sm:inline"> · {station.callSign}</span>
            </>
          ) : (
            <>
              <span className="sm:hidden">Station</span>
              <span className="hidden sm:inline">Choose your station</span>
            </>
          )}
        </span>
        <ChevronDownIcon data-icon="inline-end" className="opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuRadioGroup value={stationId ?? ""} onValueChange={(v) => select(v ? String(v) : null)}>
          <DropdownMenuLabel>Your station</DropdownMenuLabel>
          {stations.map((s) => (
            <DropdownMenuRadioItem key={s.id} value={s.id} className="flex-col items-start gap-0 py-1.5">
              <span className="font-medium">
                {s.market} <span className="font-normal text-muted-foreground">· {s.callSign}</span>
              </span>
              <span className="text-xs text-muted-foreground">{s.channelName}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <p className="px-2 py-1.5 text-xs text-muted-foreground">
          Sets which troubleshooting channel and Lead DLP the escalation paths point to.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
