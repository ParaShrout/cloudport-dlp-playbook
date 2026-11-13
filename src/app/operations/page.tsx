import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, EyeIcon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { ChecklistCard } from "@/components/checklist-card";
import {
  checklists,
  communicationNorms,
  monitoring,
  opsTeam,
  stations,
} from "@/content/operations";
import type { Station } from "@/content/types";
import { cn } from "cn";

export const metadata: Metadata = { title: "Operations" };

const stationStatus: Record<
  Station["status"],
  { label: string; className: string }
> = {
  live: {
    label: "Live on Cloudport",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  onboarding: {
    label: "Onboarding",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  planned: { label: "Planned", className: "text-muted-foreground" },
};

export default function OperationsPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Operations"
        title="Operations and monitoring"
        description="How the stream is watched and by whom, the 24/7 Operations team behind the DLPs, the live cut-in checklist, the stations in scope, and the communication norms everyone follows. Each station runs its own schedule under its own news director, so there is no single daily rhythm here."
      />

      <section>
        <SectionHeading
          id="what-we-watch"
          title="What we watch"
          description={monitoring.blurb}
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[18%]">Tool</TableHead>
                <TableHead className="w-[40%]">What it shows</TableHead>
                <TableHead className="w-[18%]">Who uses it</TableHead>
                <TableHead>Access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitoring.tools.map((t) => (
                <TableRow key={t.tool} className="align-top">
                  <TableCell className="whitespace-normal font-medium">
                    {t.tool}
                  </TableCell>
                  <TableCell className="whitespace-normal text-foreground/90">
                    {t.whatItShows}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    {t.whoUsesIt}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {t.access}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="ops-team"
          title="The Operations team"
          description="Eyes on glass around the clock. You are not expected to manage an issue alone."
        />
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <EyeIcon className="size-4 text-primary" />
              <CardTitle>{opsTeam.name}</CardTitle>
            </div>
            <CardDescription className="text-foreground/80">
              {opsTeam.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2">
              {opsTeam.contacts.map((c) => (
                <li
                  key={c.name}
                  className="flex items-start gap-3 rounded-lg border bg-muted/40 p-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRoundIcon className="size-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {c.role}
                    </span>
                    <span
                      className={cn(
                        "mt-1 text-xs",
                        c.contact
                          ? "text-foreground/80"
                          : "italic text-muted-foreground",
                      )}
                    >
                      {c.contact ?? "Contact details to be added"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              For anything on air right now, use{" "}
              <Link
                href="/escalations#report"
                className="text-primary underline underline-offset-4"
              >
                Report an issue
              </Link>{" "}
              so it lands in your station&apos;s troubleshooting channel with
              the agreed template.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionHeading
          id="checklists"
          title="Live cut-in checklist"
          description="Tick items off as you go. Progress is saved in this browser. The initial set-up, start of shift and end of shift checks are on the Cloudport set-up page."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {checklists
            .filter((c) => c.id === "pre-live")
            .map((c) => (
              <ChecklistCard key={c.id} checklist={c} />
            ))}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-base">
                Set-up and shift checks
              </CardTitle>
              <CardDescription>
                Initial set-up tasks, start of shift checks and end of shift
                checks have moved to their own page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" render={<Link href="/setup" />}>
                Open Cloudport set-up
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading
          id="stations"
          title="Stations in scope"
          description="Each station's DLPs see only their own schedule, rundown and playout in Cloudport. Pick your station in the header so escalation paths show your channel."
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call sign</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Cloudport channel</TableHead>
                <TableHead>Time zone</TableHead>
                <TableHead>Troubleshooting channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((s) => {
                const st = stationStatus[s.status];
                return (
                  <TableRow key={s.id} className="align-top">
                    <TableCell className="font-medium">{s.callSign}</TableCell>
                    <TableCell>{s.market}</TableCell>
                    <TableCell>{s.channelName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.timeZone.replace("_", " ")}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "whitespace-normal",
                        s.escalation.troubleshootingChannel.startsWith("Add ")
                          ? "italic text-muted-foreground"
                          : "",
                      )}
                    >
                      {s.escalation.troubleshootingChannel}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(st.className)}>
                        {st.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {s.notes}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="norms"
          title="Communication norms"
          description="Short, consistent, and written for the next person."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {communicationNorms.map((n) => (
            <Card key={n.title}>
              <CardHeader>
                <CardTitle className="text-base">{n.title}</CardTitle>
                <CardDescription className="text-foreground/80">
                  {n.text}
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
