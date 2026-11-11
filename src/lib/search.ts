import { guides } from "@/content/guides";
import { glossary } from "@/content/glossary";
import { severities, tiers } from "@/content/escalations";
import { checklists, stations } from "@/content/operations";
import { trainingModules } from "@/content/training";

export type SearchItem = {
  id: string;
  group: "Guides" | "Steps" | "Troubleshooting" | "Stations" | "Escalations" | "Operations" | "Training" | "Glossary";
  title: string;
  subtitle?: string;
  href: string;
  keywords?: string;
};

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const g of guides) {
    items.push({
      id: `guide-${g.slug}`,
      group: "Guides",
      title: g.title,
      subtitle: g.summary,
      href: `/guides/${g.slug}`,
      keywords: g.category,
    });
    for (const phase of g.phases) {
      for (const step of phase.steps) {
        items.push({
          id: `step-${g.slug}-${step.id}`,
          group: "Steps",
          title: step.title,
          subtitle: `${g.title} · ${phase.title}`,
          href: `/guides/${g.slug}#${step.id}`,
          keywords: step.summary,
        });
      }
    }
    g.troubleshooting.forEach((t, i) => {
      items.push({
        id: `ts-${g.slug}-${i}`,
        group: "Troubleshooting",
        title: t.symptom,
        subtitle: g.title,
        href: `/guides/${g.slug}#troubleshooting`,
        keywords: t.fix,
      });
    });
  }

  for (const s of stations) {
    items.push({
      id: `station-${s.id}`,
      group: "Stations",
      title: `${s.market} · ${s.callSign}`,
      subtitle: `${s.channelName} · ${s.escalation.troubleshootingChannel}`,
      href: "/escalations#station",
      keywords: `${s.escalation.leadDlp} ${s.escalation.controlRoom} station escalation`,
    });
  }

  for (const s of severities) {
    items.push({
      id: `sev-${s.level}`,
      group: "Escalations",
      title: `${s.level}: ${s.label}`,
      subtitle: s.definition,
      href: "/escalations#severity",
      keywords: s.examples.join(" "),
    });
  }
  for (const t of tiers) {
    items.push({
      id: `tier-${t.tier}`,
      group: "Escalations",
      title: `${t.tier}: ${t.name}`,
      subtitle: t.useWhen,
      href: "/escalations#tiers",
    });
  }

  for (const c of checklists) {
    items.push({
      id: `checklist-${c.id}`,
      group: "Operations",
      title: `${c.title} checklist`,
      subtitle: c.description,
      href: `/operations#${c.id}`,
      keywords: c.items.map((i) => i.text).join(" "),
    });
  }

  for (const m of trainingModules) {
    items.push({
      id: `training-${m.id}`,
      group: "Training",
      title: m.title,
      subtitle: m.goal,
      href: `/training#${m.id}`,
    });
  }

  for (const term of glossary) {
    items.push({
      id: `glossary-${term.term}`,
      group: "Glossary",
      title: term.term,
      subtitle: term.definition,
      href: `/glossary#${slugify(term.term)}`,
      keywords: term.aka?.join(" "),
    });
  }

  return items;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
