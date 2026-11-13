import { Badge } from "@/components/ui/badge";
import type { GuideStatus } from "@/content/types";
import { cn } from "cn";

const config: Record<GuideStatus, { label: string; className: string }> = {
  published: {
    label: "Published",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  review: {
    label: "Needs review",
    className: "border-amber-200 bg-amber-50 text-amber-800",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "border-border bg-muted text-muted-foreground",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: GuideStatus;
  className?: string;
}) {
  const c = config[status];
  return (
    <Badge variant="outline" className={cn(c.className, className)}>
      {c.label}
    </Badge>
  );
}
