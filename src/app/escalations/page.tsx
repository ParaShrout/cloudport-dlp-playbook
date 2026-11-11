import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { CopyButton } from "@/components/copy-button";
import { contacts, incidentTemplate, severities, tiers } from "@/content/escalations";
import type { Severity } from "@/content/types";
import { cn } from "cn";

export const metadata: Metadata = { title: "Escalations & support" };

const sevStyles: Record<Severity["color"], { card: string; badge: string; dot: string }> = {
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
        description="Decide the severity first. The severity tells you who to contact, in what order, and how quickly you should expect a response."
      />

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
                  <CardDescription className="text-foreground/85">{s.definition}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Examples</p>
                    <ul className="flex list-disc flex-col gap-1 pl-4 text-foreground/85">
                      {s.examples.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Response target</p>
                      <p className="mt-1 font-medium">{s.responseTarget}</p>
                    </div>
                    <div className="rounded-lg bg-muted/60 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notify</p>
                      <p className="mt-1">{s.notify.join(", ")}</p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">First action</p>
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
                  <CardDescription className="text-foreground/80">{t.whoTheyAre}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Use when</p>
                    <p className="mt-1 text-foreground/90">{t.useWhen}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">How to reach</p>
                    <ul className="mt-1 flex list-disc flex-col gap-0.5 pl-4 text-foreground/90">
                      {t.howToReach.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Expected response</p>
                    <p className="mt-1 text-foreground/90">{t.expectedResponse}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading id="contacts" title="Contacts" description="Keep this table current. Placeholders read 'Add ...'." />
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
                  <TableCell
                    className={cn("whitespace-normal", c.channel.startsWith("Add ") ? "italic text-muted-foreground" : "")}
                  >
                    {c.channel}
                  </TableCell>
                  <TableCell>{c.hours}</TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">{c.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="template"
          title="Incident post template"
          description="Paste this as the first message in the incident channel and fill in every line."
        />
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Template</CardTitle>
            <CopyButton text={incidentTemplate} label="Copy template" />
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">{incidentTemplate}</pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
