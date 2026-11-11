import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuide, guides } from "@/content/guides";
import { GuideView } from "@/components/guide/guide-view";
import { ComingSoonGuide } from "@/components/guide/coming-soon-guide";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  return { title: guide?.title ?? "Guide", description: guide?.summary };
}

export default function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  return (
    <div>
      <Button variant="ghost" size="sm" className="no-print -ml-2 mb-4" render={<Link href="/guides" />}>
        <ArrowLeftIcon data-icon="inline-start" />
        All guides
      </Button>
      <Suspense fallback={<GuideSkeleton />}>
        <GuideContent params={params} />
      </Suspense>
    </div>
  );
}

async function GuideContent({ params }: { params: PageProps<"/guides/[slug]">["params"] }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return guide.status === "coming-soon" ? <ComingSoonGuide guide={guide} /> : <GuideView guide={guide} />;
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
