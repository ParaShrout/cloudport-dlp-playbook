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
import {
  contacts,
  dlpSteps,
  escalationSteps,
  incidentTemplate,
  priorities,
  tiers,
} from "@/content/escalations";
import type { Priority } from "@/content/types";
import { cn } from "cn";

export const metadata: Metadata = { title: "Escalations & support" };

const priorityStyles: Record<
  Priority["color"],
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
        title="Something wrong? Post it in your station channel"
        description="You report; Ops owns everything after that. Lead with timing, say what you see and what you tried, and the 24/7 Video Operations team acknowledges in your thread, classifies the priority and escalates to engineering or Amagi if needed. You never have to."
      />

      <section id="how" className="scroll-mt-24">
        <SectionHeading
          title="Four things every DLP should know"
          description="This is the whole escalation procedure from your side."
        />
        <ol className="grid gap-3 sm:grid-cols-2">
          {dlpSteps.map((text, i) => (
            <li
              key={text}
              className="flex gap-3 rounded-lg border bg-card p-4 text-sm leading-relaxed"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-foreground/90">{text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section id="report" className="scroll-mt-24">
        <SectionHeading
          id="template"
          title="Issue post template"
          description="The agreed format for every post in a station troubleshooting channel. Copy it, replace the examples with what you are seeing, attach a screenshot of the error and post it in your station channel."
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

      <section>
        <SectionHeading
          id="path"
          title="Escalation path"
          description="What happens after you post. Video Ops is first response on everything and decides when to bring in engineering or Amagi. You do not need to work this ladder yourself."
        />
        <ol className="grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <li key={t.tier}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge>{t.tier}</Badge>
                    <CardTitle className="text-base">{t.name}</CardTitle>
                  </div>
                  <CardDescription className="text-foreground/80">
                    {t.who}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Scope
                    </p>
                    <p className="mt-1 text-foreground/90">{t.scope}</p>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Escalates when
                    </p>
                    <p className="mt-1 text-foreground/90">{t.escalatesWhen}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading
          id="who"
          title="Who classifies, and who is in the conversation"
          description="Each step of an incident, who owns it, and who is in the room. DLPs are in the first and fifth rows; the rest is handled for you."
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[22%]">Step</TableHead>
                <TableHead className="w-[33%]">Owner</TableHead>
                <TableHead>Who is in the conversation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalationSteps.map((e) => (
                <TableRow key={e.step} className="align-top">
                  <TableCell className="whitespace-normal font-medium">
                    {e.step}
                  </TableCell>
                  <TableCell className="whitespace-normal text-foreground/90">
                    {e.owner}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {e.whoIsIn}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="priority"
          title="Priority levels"
          description="Ops sets the priority after you post; stations are not asked to pick one. This is how each level is handled, so you know what to expect in your thread."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {priorities.map((p) => {
            const st = priorityStyles[p.color];
            return (
              <Card key={p.level} className={cn(st.card)}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2.5 rounded-full", st.dot)} />
                    <Badge variant="outline" className={st.badge}>
                      {p.level}
                    </Badge>
                    <CardTitle className="text-base">{p.label}</CardTitle>
                  </div>
                  <CardDescription className="text-foreground/85">
                    {p.definition}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 text-sm">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Examples
                    </p>
                    <ul className="flex list-disc flex-col gap-1 pl-4 text-foreground/85">
                      {p.examples.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Response, ticketing and communication
                    </p>
                    <ul className="mt-2 flex flex-col gap-2 text-foreground/90">
                      {p.response.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading
          id="contacts"
          title="Contacts"
          description="Shared across all three stations. Each station's own troubleshooting channel, Lead DLP and control room are listed on the Operations page."
        />
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
                  <TableCell className="whitespace-normal font-medium">
                    {c.name}
                  </TableCell>
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
