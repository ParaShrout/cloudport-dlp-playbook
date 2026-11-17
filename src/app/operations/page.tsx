import type { Metadata } from "next";
import Link from "next/link";
import {
  EyeIcon,
  MailIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from "lucide-react";
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
import {
  monitoring,
  opsTeam,
  stationChannelUrl,
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
        description="How the stream is watched and by whom, the 24/7 Operations team behind the DLPs and the stations in scope. Each station runs its own schedule under its own news director, so there is no single daily rhythm here."
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
            <div className="rounded-lg border bg-muted/40 p-4">
              <h3 className="font-semibold">{opsTeam.contactsTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {opsTeam.contactsNote}
              </p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {opsTeam.contacts.map((c) => (
                  <li key={c.name} className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRoundIcon className="size-4" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-medium">{c.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {c.role}
                      </span>
                      {c.slackHandle ? (
                        <a
                          href={c.slackUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-primary underline underline-offset-4"
                        >
                          <MessageSquareIcon className="size-3.5 shrink-0" />
                          {c.slackHandle}
                        </a>
                      ) : null}
                      {c.email ? (
                        <a
                          href={`mailto:${c.email}`}
                          className="mt-1 inline-flex items-center gap-1.5 break-all text-sm text-primary underline underline-offset-4"
                        >
                          <MailIcon className="size-3.5 shrink-0" />
                          {c.email}
                        </a>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              For anything on air right now, post in your station&apos;s
              troubleshooting channel using the{" "}
              <Link
                href="/escalations#report"
                className="text-primary underline underline-offset-4"
              >
                issue post template
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionHeading
          id="stations"
          title="Stations in scope"
          description="Each station's DLPs see only their own schedule, rundown and playout in Cloudport. Every issue goes to the station's own troubleshooting channel; the 24/7 Operations team acknowledges there. If a post gets no response, phone the station contact."
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call sign</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Time zone</TableHead>
                <TableHead>Troubleshooting channel</TableHead>
                <TableHead>Station contact</TableHead>
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
                    <TableCell className="text-muted-foreground">
                      {s.timeZone.replace("_", " ")}
                    </TableCell>
                    <PlaceholderCell
                      value={s.escalation.troubleshootingChannel}
                      href={stationChannelUrl(s)}
                    />
                    <PlaceholderCell value={s.escalation.stationContact} />
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
    </div>
  );
}

function PlaceholderCell({ value, href }: { value: string; href?: string }) {
  const placeholder = value.trim() === "";
  return (
    <TableCell
      className={cn(
        "whitespace-normal",
        placeholder ? "italic text-muted-foreground" : "",
      )}
    >
      {href && !placeholder ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4"
        >
          {value}
        </a>
      ) : placeholder ? (
        "To be confirmed"
      ) : (
        value
      )}
    </TableCell>
  );
}
