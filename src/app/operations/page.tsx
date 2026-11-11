import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader, SectionHeading } from "@/components/page-header";
import { ChecklistCard } from "@/components/checklist-card";
import { checklists, communicationNorms, dailyRhythm, stations } from "@/content/operations";
import type { Station } from "@/content/types";
import { cn } from "cn";

export const metadata: Metadata = { title: "Operations" };

const stationStatus: Record<Station["status"], { label: string; className: string }> = {
  live: { label: "Live on Cloudport", className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  onboarding: { label: "Onboarding", className: "border-amber-200 bg-amber-50 text-amber-800" },
  planned: { label: "Planned", className: "text-muted-foreground" },
};

export default function OperationsPage() {
  return (
    <div className="flex flex-col gap-12">
      <PageHeader
        eyebrow="Operations"
        title="How a shift runs"
        description="The daily rhythm, the stations in scope, interactive checklists for the start and end of shift, and the communication norms everyone follows."
      />

      <section>
        <SectionHeading id="rhythm" title="Daily rhythm" description="What a normal day looks like from handoff to handoff." />
        <ol className="relative flex flex-col gap-6 border-l pl-6">
          {dailyRhythm.map((item, i) => (
            <li key={item.title} className="relative">
              <span className="absolute -left-[31px] flex size-5 items-center justify-center rounded-full border bg-background text-[10px] font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.time}</p>
              <h3 className="mt-0.5 font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading
          id="checklists"
          title="Checklists"
          description="Tick items off as you go. Progress is saved in this browser; reset at the start of each shift."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {checklists.map((c) => (
            <ChecklistCard key={c.id} checklist={c} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          id="stations"
          title="Stations in scope"
          description="Which station channels DLPs operate through Cloudport. Confirm the channel name before you touch anything on air."
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call sign</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Cloudport channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((s) => {
                const st = stationStatus[s.status];
                return (
                  <TableRow key={`${s.callSign}-${s.market}`}>
                    <TableCell className="font-medium">{s.callSign}</TableCell>
                    <TableCell>{s.market}</TableCell>
                    <TableCell>{s.channelName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(st.className)}>
                        {st.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">{s.notes}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading id="norms" title="Communication norms" description="Short, consistent, and written for the next person." />
        <div className="grid gap-4 sm:grid-cols-2">
          {communicationNorms.map((n) => (
            <Card key={n.title}>
              <CardHeader>
                <CardTitle className="text-base">{n.title}</CardTitle>
                <CardDescription className="text-foreground/80">{n.text}</CardDescription>
              </CardHeader>
              <CardContent className="hidden" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
