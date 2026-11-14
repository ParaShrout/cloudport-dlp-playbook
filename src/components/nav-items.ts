import {
  BookOpenIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SirenIcon,
  SpellCheckIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href:
    | "/"
    | "/setup"
    | "/guides"
    | "/troubleshooting"
    | "/operations"
    | "/escalations"
    | "/training"
    | "/glossary";
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    description: "Start here",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/setup",
    label: "Cloudport set-up",
    description: "First sign-in and shift checks",
    icon: ClipboardCheckIcon,
  },
  {
    href: "/guides",
    label: "Step-by-step guides",
    description: "Procedures with screenshots",
    icon: BookOpenIcon,
  },
  {
    href: "/troubleshooting",
    label: "Quick troubleshooting",
    description: "Fix the everyday situations fast",
    icon: WrenchIcon,
  },
  {
    href: "/operations",
    label: "Operations",
    description: "What we watch, the ops team, stations",
    icon: ListChecksIcon,
  },
  {
    href: "/escalations",
    label: "Escalations & support",
    description: "Who to call, how fast",
    icon: SirenIcon,
  },
  {
    href: "/training",
    label: "New DLP training",
    description: "Self-serve onboarding path",
    icon: GraduationCapIcon,
  },
  {
    href: "/glossary",
    label: "Glossary",
    description: "Cloudport and newsroom terms",
    icon: SpellCheckIcon,
  },
];
