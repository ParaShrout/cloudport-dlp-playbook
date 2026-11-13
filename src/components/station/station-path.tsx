"use client";

import Link from "next/link";
import {
  MapPinIcon,
  MessageSquareIcon,
  PhoneIcon,
  RadioIcon,
  UserRoundIcon,
  PlayIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Station } from "@/content/types";
import { isPlaceholder, useStation } from "@/lib/use-station";
import { stationChannelUrl } from "@/content/operations";
import { cn } from "cn";

/** Grid of buttons for choosing a station. Used when none is selected yet. */
export function StationPicker({ compact = false }: { compact?: boolean }) {
  const { stations, select } = useStation();
  return (
    <div
      className={cn(
        "grid gap-2",
        compact ? "sm:grid-cols-3" : "sm:grid-cols-3",
      )}
    >
      {stations.map((s) => (
        <Button
          key={s.id}
          variant="outline"
          className="h-auto flex-col items-start gap-0 py-2.5 text-left"
          onClick={() => select(s.id)}
        >
          <span className="font-medium">
            {s.market}{" "}
            <span className="font-normal text-muted-foreground">
              · {s.callSign}
            </span>
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {s.channelName}
          </span>
        </Button>
      ))}
    </div>
  );
}

function Value({ value, href }: { value: string; href?: string }) {
  if (href && !isPlaceholder(value)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-primary underline underline-offset-4"
      >
        {value}
      </a>
    );
  }
  return (
    <span
      className={cn(
        isPlaceholder(value) ? "italic text-muted-foreground" : "font-medium",
      )}
    >
      {value}
    </span>
  );
}

/** The escalation details for one station. */
export function StationPathDetails({
  station,
  className,
}: {
  station: Station;
  className?: string;
}) {
  const rows: {
    icon: typeof MapPinIcon;
    label: string;
    value: string;
    href?: string;
    links?: { label: string; href: string }[];
    hint: string;
  }[] = [
    {
      icon: MessageSquareIcon,
      label: "Troubleshooting channel",
      value: station.escalation.troubleshootingChannel,
      href: stationChannelUrl(station),
      hint: "Post every issue here using the template. The ops team triages and escalates from this channel.",
    },
    {
      icon: UserRoundIcon,
      label: "Lead DLP on shift",
      value: station.escalation.leadDlp,
      hint: "Approves removing program content. Tier 1 escalation.",
    },
    {
      icon: PhoneIcon,
      label: "Control room",
      value: station.escalation.controlRoom,
      hint: "Live source and cue coordination during cut-ins.",
    },
    {
      icon: RadioIcon,
      label: "Cloudport channel",
      value: station.channelName,
      hint: `Your station's channel in Cloudport. Local time zone: ${station.timeZone.replace("_", " ")}.`,
    },
    ...(station.watchLinks?.length
      ? [
          {
            icon: PlayIcon,
            label: "Watch the channel",
            value: station.watchLinks.map((l) => l.label).join(" / "),
            links: station.watchLinks,
            hint: "The public live stream, exactly as viewers see it.",
          },
        ]
      : []),
  ];
  return (
    <dl className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {rows.map((r) => (
        <div key={r.label} className="rounded-lg border bg-background p-3">
          <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <r.icon className="size-3.5" /> {r.label}
          </dt>
          <dd className="mt-1 text-sm">
            {r.links ? (
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {r.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary underline underline-offset-4"
                  >
                    {l.label}
                  </a>
                ))}
              </span>
            ) : (
              <Value value={r.value} href={r.href} />
            )}
          </dd>
          <dd className="mt-1 text-xs text-muted-foreground">{r.hint}</dd>
        </div>
      ))}
      {station.escalation.notes ? (
        <div className="rounded-lg border bg-muted/40 p-3 text-sm sm:col-span-2">
          {station.escalation.notes}
        </div>
      ) : null}
    </dl>
  );
}

/**
 * "Your station" block for the escalations page: tabs for every station,
 * defaulting to the DLP's selected one. Changing tabs changes the selection.
 */
export function YourStationSection() {
  const { station, stations, select, hydrated } = useStation();
  const value = station?.id ?? stations[0]?.id;

  return (
    <Card className={cn(hydrated && !station ? "border-primary/40" : "")}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-4 text-primary" />
          <CardTitle>Your station&apos;s path</CardTitle>
        </div>
        <CardDescription>
          {hydrated && !station
            ? "Pick your station so the dashboard and guides point you to the right channel and Lead DLP."
            : "Tier 1 is station-specific. Everything below this card is shared by all three stations."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hydrated && !station ? (
          <StationPicker />
        ) : (
          <Tabs value={value} onValueChange={(v) => select(String(v))}>
            <TabsList>
              {stations.map((s) => (
                <TabsTrigger key={s.id} value={s.id}>
                  {s.market}
                </TabsTrigger>
              ))}
            </TabsList>
            {stations.map((s) => (
              <TabsContent key={s.id} value={s.id} className="pt-3">
                <StationPathDetails station={s} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

/** Compact strip used inside the dashboard emergency panel and guides. */
export function StationStrip({ className }: { className?: string }) {
  const { station, hydrated } = useStation();
  if (!hydrated)
    return (
      <div
        className={cn("h-9 animate-pulse rounded-md bg-muted/60", className)}
      />
    );
  if (!station) {
    return (
      <div
        className={cn(
          "rounded-lg border border-primary/30 bg-background p-3",
          className,
        )}
      >
        <p className="mb-2 text-sm font-medium">
          Which station are you operating?
        </p>
        <StationPicker compact />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-1 rounded-lg border bg-background px-3 py-2 text-sm",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-medium">
        <MapPinIcon className="size-3.5 text-primary" /> {station.market} ·{" "}
        {station.callSign}
      </span>
      <span className="text-muted-foreground">
        Channel:{" "}
        <Value
          value={station.escalation.troubleshootingChannel}
          href={stationChannelUrl(station)}
        />
      </span>
      <span className="text-muted-foreground">
        Lead DLP: <Value value={station.escalation.leadDlp} />
      </span>
      <Link
        href="/escalations#report"
        className="ml-auto text-xs text-primary underline underline-offset-4"
      >
        Report an issue
      </Link>
    </div>
  );
}
