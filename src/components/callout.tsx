import { AlertTriangleIcon, InfoIcon, LightbulbIcon, OctagonAlertIcon } from "lucide-react";
import type { Callout as CalloutType, CalloutKind } from "@/content/types";
import { cn } from "cn";

const styles: Record<CalloutKind, { icon: typeof InfoIcon; className: string; defaultTitle: string }> = {
  tip: {
    icon: LightbulbIcon,
    className: "border-sky-200 bg-sky-50 text-sky-900 [&_svg]:text-sky-600",
    defaultTitle: "Tip",
  },
  note: {
    icon: InfoIcon,
    className: "border-border bg-muted/60 text-foreground [&_svg]:text-muted-foreground",
    defaultTitle: "Note",
  },
  warning: {
    icon: AlertTriangleIcon,
    className: "border-amber-200 bg-amber-50 text-amber-950 [&_svg]:text-amber-600",
    defaultTitle: "Watch out",
  },
  critical: {
    icon: OctagonAlertIcon,
    className: "border-red-200 bg-red-50 text-red-950 [&_svg]:text-red-600",
    defaultTitle: "Do not skip",
  },
};

export function Callout({ callout, className }: { callout: CalloutType; className?: string }) {
  const s = styles[callout.kind];
  const Icon = s.icon;
  return (
    <div
      role={callout.kind === "critical" ? "alert" : undefined}
      className={cn("flex gap-3 rounded-lg border px-3.5 py-3 text-sm", s.className, className)}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-medium">{callout.title ?? s.defaultTitle}</p>
        <p className="mt-0.5 leading-relaxed opacity-90">{callout.text}</p>
      </div>
    </div>
  );
}
