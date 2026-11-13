"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  MapPinIcon,
  PhoneCallIcon,
  SirenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StationPicker } from "@/components/station/station-path";
import { severities } from "@/content/escalations";
import { isPlaceholder, useStation } from "@/lib/use-station";
import { stationChannelUrl } from "@/content/operations";
import { cn } from "cn";

type Timing = "now" | "soon" | "tomorrow";

const TIMING_OPTIONS: { value: Timing; label: string; hint: string }[] = [
  { value: "now", label: "LIVE NOW", hint: "Viewers are affected right now." },
  {
    value: "soon",
    label: "Airs within 2 hrs",
    hint: "Not on air yet, but soon.",
  },
  { value: "tomorrow", label: "Airs tomorrow", hint: "No rush today." },
];

function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return value;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/**
 * "Something is wrong on air?" panel: pick a station, fill in the agreed
 * three-line template, then copy it and open the station's Slack channel.
 */
export function IssueReporter() {
  const { station, hydrated, select } = useStation();
  const sev1 = severities[0];

  const [timing, setTiming] = React.useState<Timing>("now");
  const [airTime, setAirTime] = React.useState("");
  const [show, setShow] = React.useState("");
  const [happening, setHappening] = React.useState("");
  const [tried, setTried] = React.useState("");
  const [copied, setCopied] = React.useState<"copied" | "failed" | null>(null);

  const timingText =
    timing === "now"
      ? "LIVE NOW"
      : timing === "soon"
        ? `airs at ${airTime ? formatTime(airTime) : "__:__"} (within 2 hrs)`
        : "airs tomorrow";
  const happeningText = [show.trim() ? `${show.trim()}:` : "", happening.trim()]
    .filter(Boolean)
    .join(" ");
  const message = `[Timing]: ${timingText}\n[What's happening]: ${happeningText}\n[What you tried]: ${tried.trim()}`;
  const ready =
    happening.trim().length > 0 &&
    tried.trim().length > 0 &&
    (timing !== "soon" || airTime !== "");

  const channelUrl = station ? stationChannelUrl(station) : undefined;
  const channelName = station?.escalation.troubleshootingChannel;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("copied");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied(null), 2500);
  };

  const copyAndOpen = () => {
    // Start the clipboard write while this document still has focus, then
    // open Slack in the same click so the browser does not block the tab.
    const pending = navigator.clipboard.writeText(message);
    if (channelUrl) window.open(channelUrl, "_blank", "noopener,noreferrer");
    pending.then(() => setCopied("copied")).catch(() => setCopied("failed"));
    setTimeout(() => setCopied(null), 4000);
  };

  return (
    <Card className="border-red-200 bg-red-50/60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <SirenIcon className="size-4 text-red-600" />
          <CardTitle className="text-red-900">
            Something is wrong on air?
          </CardTitle>
        </div>
        <CardDescription className="text-red-900/80">
          {sev1.definition} That is a <strong>{sev1.level}</strong>:{" "}
          {sev1.firstAction}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {!hydrated ? (
          <div className="h-24 animate-pulse rounded-lg bg-background/60" />
        ) : !station ? (
          <div className="rounded-lg border border-primary/30 bg-background p-3">
            <p className="mb-2 text-sm font-medium">
              Which station are you operating?
            </p>
            <StationPicker compact />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 rounded-lg border bg-background px-3 py-2 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPinIcon className="size-3.5 text-primary" />{" "}
                {station.market} · {station.callSign}
              </span>
              <span className="text-muted-foreground">
                Posts to{" "}
                <span
                  className={cn(
                    isPlaceholder(channelName ?? "")
                      ? "italic"
                      : "font-medium text-foreground",
                  )}
                >
                  {channelName}
                </span>
              </span>
              <button
                type="button"
                onClick={() => select(null)}
                className="ml-auto text-xs text-primary underline underline-offset-4"
              >
                Change station
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (ready) copyAndOpen();
                }}
              >
                <fieldset>
                  <legend className="mb-1.5 text-sm font-medium">Timing</legend>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {TIMING_OPTIONS.map((o) => (
                      <label
                        key={o.value}
                        className={cn(
                          "flex cursor-pointer flex-col rounded-lg border bg-background px-3 py-2 text-sm",
                          timing === o.value
                            ? "border-primary ring-2 ring-primary/30"
                            : "hover:bg-muted",
                        )}
                      >
                        <input
                          type="radio"
                          name="timing"
                          value={o.value}
                          checked={timing === o.value}
                          onChange={() => setTiming(o.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{o.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {o.hint}
                        </span>
                      </label>
                    ))}
                  </div>
                  {timing === "soon" ? (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <label
                        htmlFor="issue-airtime"
                        className="text-muted-foreground"
                      >
                        Airs at
                      </label>
                      <Input
                        id="issue-airtime"
                        type="time"
                        value={airTime}
                        onChange={(e) => setAirTime(e.target.value)}
                        className="w-36 bg-background"
                        required
                      />
                      <span className="text-xs text-muted-foreground">
                        local station time
                      </span>
                    </div>
                  ) : null}
                </fieldset>

                <div>
                  <label
                    htmlFor="issue-show"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Show or hour affected{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <Input
                    id="issue-show"
                    value={show}
                    onChange={(e) => setShow(e.target.value)}
                    placeholder="e.g., 7 PM wheel"
                    className="bg-background"
                  />
                </div>

                <div>
                  <label
                    htmlFor="issue-happening"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    What&apos;s happening
                  </label>
                  <Textarea
                    id="issue-happening"
                    value={happening}
                    onChange={(e) => setHappening(e.target.value)}
                    placeholder="e.g., assets won't ingest into the 7 PM wheel; error attached"
                    rows={3}
                    className="bg-background"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="issue-tried"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    What you tried
                  </label>
                  <Textarea
                    id="issue-tried"
                    value={tried}
                    onChange={(e) => setTried(e.target.value)}
                    placeholder="e.g., re-uploaded twice, same result"
                    rows={2}
                    className="bg-background"
                    required
                  />
                </div>
              </form>

              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Your post</p>
                <pre className="min-h-28 flex-1 overflow-x-auto whitespace-pre-wrap rounded-lg border bg-background p-3 font-mono text-xs leading-relaxed">
                  {message}
                </pre>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={!ready || !channelUrl}
                    onClick={copyAndOpen}
                  >
                    {copied === "copied" ? (
                      <CheckIcon data-icon="inline-start" />
                    ) : (
                      <ExternalLinkIcon data-icon="inline-start" />
                    )}
                    {copied === "copied"
                      ? "Copied. Paste it in Slack"
                      : `Copy and open ${channelName}`}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!ready}
                    onClick={copy}
                  >
                    <CopyIcon data-icon="inline-start" />
                    Copy only
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {copied === "failed"
                    ? "Clipboard was blocked. Select the text above and copy it by hand."
                    : !channelUrl
                      ? "Add this station's Slack channel in operations.ts to enable the button."
                      : "Slack opens in a new tab with the message on your clipboard. Paste it, attach a screenshot of the error, and send. For a Sev 1, phone first."}
                </p>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2 border-t border-red-200/70 pt-4">
          <Button
            variant="outline"
            className="bg-background"
            render={<Link href="#severity" />}
          >
            <PhoneCallIcon data-icon="inline-start" />
            Severity levels and who to call
          </Button>
          <Button
            variant="outline"
            className="bg-background"
            render={<Link href="/guides#live-cut-ins" />}
          >
            Live cut-in guides
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
