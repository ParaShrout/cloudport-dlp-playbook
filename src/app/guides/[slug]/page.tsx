import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuide, guides } from "@/content/guides";
import { GuideView } from "@/components/guide/guide-view";
import { ComingSoonGuide } from "@/components/guide/coming-soon-guide";
import { GuideNav } from "@/components/guide/guide-nav";
import { discoverScreenshots } from "@/lib/screenshots";

export function generateStaticParams() {
  return guides
    .filter((g) => g.kind !== "overview")
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || guide.kind === "overview") return { title: "Guide not found" };
  return { title: guide.title, description: guide.summary };
}

export default function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="no-print -ml-2 mb-4"
        render={<Link href="/guides" />}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        All guides
      </Button>
      <Suspense fallback={<GuideSkeleton />}>
        <GuideContent params={params} />
      </Suspense>
    </div>
  );
}

async function GuideContent({
  params,
}: {
  params: PageProps<"/guides/[slug]">["params"];
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || guide.kind === "overview") notFound();
  const nav = <GuideNav currentSlug={guide.slug} />;
  if (guide.status === "coming-soon") {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <ComingSoonGuide guide={guide} />
        </div>
        <aside className="no-print lg:sticky lg:top-24 lg:self-start">
          {nav}
        </aside>
      </div>
    );
  }
  const screenshots = discoverScreenshots(guide);
  return <GuideView guide={guide} screenshots={screenshots} aside={nav} />;
}

function GuideSkeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading guide">
      <div className="h-5 w-40 rounded bg-muted" />
      <div className="mt-4 h-9 w-2/3 rounded bg-muted" />
      <div className="mt-3 h-4 w-full max-w-2xl rounded bg-muted" />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-40 rounded-xl bg-muted" />
        <div className="h-40 rounded-xl bg-muted" />
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="h-44 rounded-xl bg-muted" />
        <div className="h-44 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
