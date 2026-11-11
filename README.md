# DLP Playbook

A self-hosted user guide and operations dashboard for Digital Line Producers (DLPs) running station streams on Amagi Cloudport. It replaces the Google Site / Confluence approach with a searchable web app that a DLP can use mid-shift to look up one step, and that a new hire can use to self-serve their onboarding.

## What is in it

| Route | Purpose |
| --- | --- |
| `/` | Dashboard: search, on-air emergency panel, guide cards, start-of-shift checklist, training progress, links to the original Google Site and SharePoint playbook |
| `/guides` | All step-by-step procedures grouped by category, with status badges (Published / Needs review / Coming soon) |
| `/guides/[slug]` | A single procedure: when to use it, prerequisites, numbered steps with "You should see" checks, screenshots, callouts, a tick-off checklist saved in the browser, a troubleshooting table and print support |
| `/operations` | Daily rhythm, interactive start-of-shift / pre-live / handoff checklists, stations in scope, communication norms |
| `/escalations` | Severity levels (Sev 1-4), escalation tiers (self-serve to Amagi NOC), contacts table, copyable incident template |
| `/training` | Five-module onboarding path with saved progress and a six-question knowledge check |
| `/glossary` | Filterable definitions of Cloudport and newsroom terms |

Global search is available from the header, or press `/` or `Cmd/Ctrl+K` anywhere. It indexes guides, individual steps, troubleshooting entries, severities, checklists, training modules and glossary terms.

## Editing content

All copy lives in plain TypeScript data files under `src/content/`. No component changes are needed to update the guide.

| File | Contents |
| --- | --- |
| `src/content/guides.ts` | Step-by-step guides. Live Cut-Ins is fully written; the others are summaries with `status: "coming-soon"`. |
| `src/content/operations.ts` | Stations, daily rhythm, checklists, communication norms |
| `src/content/escalations.ts` | Severity definitions, escalation tiers, contacts, incident template |
| `src/content/training.ts` | Training modules and quiz questions |
| `src/content/glossary.ts` | Glossary terms |
| `src/content/site.ts` | Site name, team name, external links |
| `src/content/types.ts` | The shapes of all of the above |

### Adding screenshots

Each step can reference a screenshot:

```ts
screenshot: {
  src: "/screenshots/live-cut-ins/03-live-sources.png",
  alt: "Live Sources panel showing an active input",
  caption: "Confirm status, preview and audio.",
},
```

Drop the image at `public/screenshots/live-cut-ins/03-live-sources.png`. Until the file exists the UI renders a labelled placeholder showing the expected path, so slots are easy to spot. Clicking a loaded screenshot opens it full-size.

### Guide status

- `coming-soon`: only the summary is shown, with a note to ask the Lead DLP.
- `review`: full steps are shown with an amber "Pending review" banner and the `reviewNote` text.
- `published`: full steps, no banner.

Contact placeholders in `escalations.ts` start with `Add ` and render in italics until replaced.

## Running locally

Requires Node 20+.

```bash
npm install
npm run dev
```

Open http://localhost:4817. Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build on port 4817
npm run lint
npm run typecheck
```

## Stack

Next.js (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui on Base UI, lucide-react icons, cmdk for the command palette. There is no backend or database; checklist and training progress are stored in the browser's `localStorage`.
