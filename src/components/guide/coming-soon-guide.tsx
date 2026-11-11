import Link from "next/link";
import { ConstructionIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { getGuide } from "@/content/guides";
import type { Guide } from "@/content/types";

export function ComingSoonGuide({ guide }: { guide: Guide }) {
  const related = (guide.related ?? []).map(getGuide).filter((g): g is Guide => Boolean(g));
  return (
    <div>
      <PageHeader
        eyebrow={guide.category}
        title={guide.title}
        description={guide.summary}
        actions={<StatusBadge status={guide.status} />}
      />
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ConstructionIcon className="size-4 text-muted-foreground" />
            <CardTitle>Steps are being documented</CardTitle>
          </div>
          <CardDescription>
            This procedure is on the list but the step-by-step walkthrough and screenshots are not in the playbook yet.
            Until it is, ask the Lead DLP on shift before attempting it for the first time.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {guide.whenToUse.length > 0 ? (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Use when</p>
              <div className="flex flex-wrap gap-1.5">
                {guide.whenToUse.map((w) => (
                  <Badge key={w} variant="outline" className="h-auto whitespace-normal py-0.5 font-normal">
                    {w}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          {related.length > 0 ? (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Related guides you can use now</p>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Button key={r.slug} variant="outline" size="sm" render={<Link href={`/guides/${r.slug}`} />}>
                    {r.title}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
          <p className="text-xs text-muted-foreground">
            Have the steps already? Add them to <code>src/content/guides.ts</code> under <code>{guide.slug}</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
