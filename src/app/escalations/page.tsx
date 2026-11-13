import type { Metadata } from "next";
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
import { CopyButton } from "@/components/copy-button";
import { YourStationSection } from "@/components/station/station-path";
import { IssueReporter } from "@/components/station/issue-reporter";
import { stationChannelUrl, stations } from "@/content/operations";
import {
  contacts,
  incidentTemplate,
  severities,
  tiers,
} from "@/content/escalations";
import type { Severity } from "@/content/types";
import { cn } from "cn";

export const metadata: Metadata = { title: "Escalations & support" };

const sevStyles: Record<
  Severity["color"],
  { card: string; badge: string; dot: string }
> = {
  red: {
    card: "border-red-200",
    badge: "border-red-200 bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
  orange: {
    card: "border-orange-200",
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    dot: "bg-orange-500",
  },
  amber: {
    card: "border-amber-200",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    dot: "bg-amber-400",
  },
  slate: {
    card: "",
    badge: "text-muted-foreground",
    dot: "bg-slate-400",
  },
};

export default function EscalationsPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Escalations & support"
        title="Who to contact, and how fast"
        description="Report the issue in your station's troubleshooting channel using the template so the ops team can triage and escalate fast. Then decide the severity: it tells you who else to contact, in what order, and how quickly to expect a response. Tier 1 contacts differ by station; everything else is shared."
      />

      <section id="report" className="scroll-mt-24">
        <IssueReporter />
      </section>

      <section id="station" className="scroll-mt-24">
        <YourStationSection />
      </section>

      <section>
        <SectionHeading
          id="severity"
          title="Severity levels"
          description="When in doubt, pick the higher severity. Nobody will be upset that you called about a Sev 1 that turned out to be a Sev 2."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {severities.map((s) => {
            const st = sevStyles[s.color];
            return (
              <Card key={s.level} className={cn(st.card)}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2.5 rounded-full", st.dot)} />
                    <Badge variant="outline" className={st.badge}>
                      {s.level}
                    </Badge>
                    <CardTitle>{s.label}</CardTitle>
                  </div>
                  <CardDescription className="text-foreground/85">
                    {s.definition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Examples
                    </p>
                    <ul className="flex list-disc flex-col gap-1 pl-4 text-foreground/85">
                      {s.examples.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Response target
                      </p>
                      <p className="mt-1 font-medium">{s.responseTarget}</p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Notify
                      </p>
                      <p className="mt-1">{s.notify.join(", ")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      First action
                    </p>
                    <p className="text-foreground/90">{s.firstAction}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading
          id="tiers"
          title="Escalation path"
          description="Work up the tiers. Skip straight to Tier 3 only for a Sev 1."
        />
        <ol className="grid gap-4 lg:grid-cols-2">
          {tiers.map((t) => (
            <li key={t.tier}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>{t.tier}</Badge>
                    <CardTitle>{t.name}</CardTitle>
                  </div>
                  <CardDescription className="text-foreground/80">
                    {t.whoTheyAre}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Use when
                    </p>
                    <p className="mt-1 text-foreground/90">{t.useWhen}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      How to reach
                    </p>
                    <ul className="mt-1 flex list-disc flex-col gap-0.5 pl-4 text-foreground/90">
                      {t.howToReach.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Expected response
                    </p>
                    <p className="mt-1 text-foreground/90">
                      {t.expectedResponse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading
          id="contacts"
          title="Contacts"
          description="Station channels first, then the contacts shared by all stations. Placeholders read 'Add ...'."
        />
        <div className="mb-4 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Station</TableHead>
                <TableHead>Troubleshooting channel</TableHead>
                <TableHead>Lead DLP</TableHead>
                <TableHead>Control room</TableHead>
                <TableHead>Cloudport channel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((s) => (
                <TableRow key={s.id} className="align-top">
                  <TableCell className="font-medium">
                    {s.market}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {s.callSign}
                    </span>
                  </TableCell>
                  <PlaceholderCell
                    value={s.escalation.troubleshootingChannel}
                    href={stationChannelUrl(s)}
                  />
                  <PlaceholderCell value={s.escalation.leadDlp} />
                  <PlaceholderCell value={s.escalation.controlRoom} />
                  <TableCell className="whitespace-normal">
                    {s.channelName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Who</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.name} className="align-top">
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="whitespace-normal">{c.role}</TableCell>
                  <PlaceholderCell value={c.channel} href={c.href} />
                  <TableCell>{c.hours}</TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {c.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="template"
          title="Issue post template"
          description="The agreed format for every post in a station troubleshooting channel. The form at the top of this page fills it in for you; copy it here if you would rather write it by hand."
        />
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Template</CardTitle>
            <CopyButton text={incidentTemplate} label="Copy template" />
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
              {incidentTemplate}
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function PlaceholderCell({ value, href }: { value: string; href?: string }) {
  return (
    <TableCell
      className={cn(
        "whitespace-normal",
        value.startsWith("Add ") ? "italic text-muted-foreground" : "",
      )}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </TableCell>
  );
}
