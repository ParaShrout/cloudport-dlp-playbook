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
import { getGuide, guideHref } from "@/content/guides";
import { CbsNewsLogo } from "@/components/cbs-news-logo";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="relative overflow-hidden rounded-2xl bg-cbs-navy p-6 text-white sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cbs-blue/25 to-transparent"
        />
        <div className="relative">
          <CbsNewsLogo onDark className="h-5 sm:h-6" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-white/60">
            {site.program}
          </p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Running the station streams in {site.toolName}
          </h1>
          <div className="mt-4 flex max-w-3xl flex-col gap-3 text-white/75">
            {aboutCloudport.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <SearchTrigger className="h-10 w-full justify-start border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white sm:w-96 [&>span]:text-white/80 [&_kbd]:border-white/20 [&_kbd]:bg-white/10 [&_kbd]:text-white/70" />
            <Button
              size="lg"
              className="bg-white text-cbs-navy hover:bg-white/90"
              render={<Link href="/setup" />}
            >
              <ClipboardCheckIcon data-icon="inline-start" />
              Set-up and shift checks
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              render={
                <a href={site.toolUrl} target="_blank" rel="noreferrer" />
              }
            >
              Open Cloudport
              <ExternalLinkIcon data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              className="bg-cbs-red text-white hover:bg-cbs-red/90"
              render={<Link href="/escalations#report" />}
            >
              <SirenIcon data-icon="inline-start" />
              Something is wrong on air
            </Button>
          </div>
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
                          href={guideHref(guide.slug)}
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
