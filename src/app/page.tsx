import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  GraduationCapIcon,
  ListChecksIcon,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionHeading } from "@/components/page-header";
import { SearchTrigger } from "@/components/search-command";
import { TrainingProgressCard } from "@/components/training-progress-card";
import { site } from "@/content/site";
import {
  aboutCloudport,
  buildingBlocks,
  roles,
  rolesAsOf,
} from "@/content/overview";
import { getGuide } from "@/content/guides";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {site.program}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Running the station streams in {site.toolName}
        </h1>
        <div className="mt-4 flex max-w-3xl flex-col gap-3 text-muted-foreground">
          {aboutCloudport.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchTrigger className="h-10 w-full justify-start sm:w-96" />
          <Button variant="default" size="lg" render={<Link href="/setup" />}>
            <ClipboardCheckIcon data-icon="inline-start" />
            Set-up and shift checks
          </Button>
          <Button
            variant="outline"
            size="lg"
            render={<a href={site.toolUrl} target="_blank" rel="noreferrer" />}
          >
            Open Cloudport
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-red-200 bg-red-50/60 text-red-900 hover:bg-red-100 hover:text-red-900"
            render={<Link href="/escalations#report" />}
          >
            <SirenIcon data-icon="inline-start" />
            Something is wrong on air
          </Button>
        </div>
      </section>

      <section>
        <SectionHeading
          id="who-does-what"
          title="Who does what"
          description={`The teams around Cloudport and what each one owns. Names as of ${rolesAsOf}.`}
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[22%]">Role</TableHead>
                <TableHead className="w-[30%]">Who</TableHead>
                <TableHead>Responsibility in BAU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.role} className="align-top">
                  <TableCell className="whitespace-normal font-medium">
                    {r.role}
                  </TableCell>
                  <TableCell className="whitespace-normal text-foreground/90">
                    {r.who}
                  </TableCell>
                  <TableCell className="whitespace-normal text-muted-foreground">
                    {r.responsibility}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <SectionHeading
          id="building-blocks"
          title="Programming building blocks"
          description="The kinds of hours that make up a day on the stream, and how each one is built in Cloudport. Know these before opening a guide."
        />
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Block</TableHead>
                <TableHead className="w-[32%]">What it is</TableHead>
                <TableHead>How it is built</TableHead>
                <TableHead className="w-[12%]">Guide</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buildingBlocks.map((b) => {
                const guide = b.guide ? getGuide(b.guide) : undefined;
                return (
                  <TableRow key={b.block} className="align-top">
                    <TableCell className="whitespace-normal font-medium">
                      {b.block}
                    </TableCell>
                    <TableCell className="whitespace-normal text-foreground/90">
                      {b.whatItIs}
                    </TableCell>
                    <TableCell className="whitespace-normal text-muted-foreground">
                      {b.howItIsBuilt}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {guide ? (
                        <Link
                          href={`/guides/${guide.slug}`}
                          className="text-primary underline underline-offset-4"
                        >
                          {guide.shortTitle ?? guide.title}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          More terms in the{" "}
          <Link
            href="/glossary"
            className="text-primary underline underline-offset-4"
          >
            glossary
          </Link>
          .
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <TrainingProgressCard />
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick links</CardTitle>
            <CardDescription>
              Everything else you might need during a shift.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <QuickLink
                href="/guides"
                icon={BookOpenIcon}
                label="Step-by-step guides"
              />
              <QuickLink
                href="/operations"
                icon={ListChecksIcon}
                label="Operations: daily rhythm, stations, norms"
              />
              <QuickLink
                href="/escalations"
                icon={SirenIcon}
                label="Escalation tiers and contacts"
              />
              <QuickLink
                href="/training"
                icon={GraduationCapIcon}
                label="New DLP training path"
              />
            </div>
            <div className="flex flex-col gap-1 border-t pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              {site.externalLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <ExternalLinkIcon className="mt-0.5 size-4 shrink-0" />
                  <span>
                    <span className="block text-foreground/90">{l.label}</span>
                    <span className="block text-xs">{l.description}</span>
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  label,
}: {
  href: "/guides" | "/operations" | "/escalations" | "/training";
  icon: typeof ListChecksIcon;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span>{label}</span>
      <ArrowRightIcon className="ml-auto size-3.5 text-muted-foreground" />
    </Link>
  );
}
