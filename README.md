# DLP Playbook

A self-hosted user guide and operations dashboard for Digital Line Producers (DLPs) running station streams on Amagi Cloudport. It replaces the Google Site / Confluence approach with a searchable web app that a DLP can use mid-shift to look up one step, and that a new hire can use to self-serve their onboarding.

## What is in it

| Route | Purpose |
| --- | --- |
| `/` | Dashboard: search, on-air emergency panel, guide cards, start-of-shift checklist, training progress, links to the original Google Site and SharePoint playbook |
| `/guides` | The User Manual procedures from the Streaming Google Site, grouped by category, with status badges (Published / Needs review / Coming soon) |
| `/guides/live-cut-ins` | Overview page: the Note on Usage and a chooser between the two cut-in methods |
| `/guides/[slug]` | A single procedure: numbered steps copied from the site, screenshots, callouts, a tick-off checklist saved in the browser and print support |
| `/operations` | Daily rhythm, interactive start-of-shift / pre-live / handoff checklists, stations table (Baltimore, Sacramento, Miami), communication norms |
| `/escalations` | Your station's path (per-station troubleshooting channel, Lead DLP, control room), severity levels (Sev 1-4), shared escalation tiers, contacts, copyable incident template |
| `/training` | Five-module onboarding path with saved progress and a six-question knowledge check |
| `/glossary` | Filterable definitions of Cloudport and newsroom terms |

Global search is available from the header, or press `/` or `Cmd/Ctrl+K` anywhere. It indexes guides, individual steps, troubleshooting entries, severities, checklists, training modules and glossary terms.

## Editing content

All copy lives in plain TypeScript data files under `src/content/`. No component changes are needed to update the guide.

| File | Contents |
| --- | --- |
| `src/content/guides.ts` | Step-by-step guides. Live Cut-Ins (overview + Adding Live Segments + Immediate Live) are transferred from the Google Site; the other User Manual pages are stubs with `status: "coming-soon"`. |
| `src/content/operations.ts` | Stations and their escalation contacts, daily rhythm, checklists, communication norms |
| `src/content/escalations.ts` | Severity definitions, escalation tiers, contacts, incident template |
| `src/content/training.ts` | Training modules and quiz questions |
| `src/content/glossary.ts` | Glossary terms |
| `src/content/site.ts` | Site name, team name, external links |
| `src/content/types.ts` | The shapes of all of the above |

### Adding screenshots

Screenshots are discovered from the filesystem at build time; no code changes are needed. Put image files (`png`, `jpg`, `gif`, `webp`) in `public/screenshots/<guide-slug>/` and name them by **step number**:

```
public/screenshots/live-cut-in-add-live-segment/
  06.png                 -> step 6 (Add Live Segment)
  07-preview-button.png  -> step 7 (anything after the number is ignored)
  07b.png                -> a second image for step 7 (letter suffix = order)
  take-next.png          -> step 10, matched by step id instead of number
public/screenshots/live-cut-in-immediate-live/
  05.png                 -> step 5 (Take Live)
```

Step numbers are shown on each step card and in `npm run screenshots -- status`. Steps with no image show a "Screenshot slot" line with the exact filename to save; set `wantsScreenshot: false` on a step to hide that slot. Captions come from the step's `screenshotCaption` field. Clicking a loaded screenshot opens it full-size.

#### Bulk import from a folder

If you have exported all the screenshots for a guide (for example by downloading the SharePoint folder or saving them from the Google Site), put them in one folder, make sure their filenames sort in step order (`Screenshot 1.png`, `Screenshot 2.png`, ... is fine), and run:

```bash
npm run screenshots -- import live-cut-in-add-live-segment ~/Downloads/segment-shots --dry-run   # preview the mapping
npm run screenshots -- import live-cut-in-add-live-segment ~/Downloads/segment-shots             # copy and rename
npm run screenshots -- status                                                                    # see what is still missing
```

The import assigns images to consecutive steps, so it suits a folder that has one image per step. If the site only has screenshots for some steps, name the files by step number instead. Use `--start N` if the folder begins partway through the guide. If a step already has an image the new one is added as `NNb.png` rather than overwriting.

#### Bulk upload without a terminal

Open `public/screenshots/live-cut-in-add-live-segment/` (or `.../live-cut-in-immediate-live/`) in the GitHub web UI, choose **Add file → Upload files**, and drag the whole set in. Name them `03.png`, `04.png`, ... first (or by step id). Commit, and the next deploy picks them up.

### Stations

Baltimore (WJZ), Sacramento (KOVR) and Miami (WFOR) are defined in `src/content/operations.ts`. Each station carries its own escalation block: troubleshooting channel, Lead DLP contact and control room contact. DLPs pick their station from the header; the choice is remembered in the browser and drives the dashboard emergency panel, the "Your station's path" card on the Escalations page, and the station reminder inside each guide. To add a station, add one object to the `stations` array.

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
npm run screenshots -- status   # which guide steps still need a screenshot
```

## Stack

Next.js (App Router, Cache Components), TypeScript, Tailwind CSS v4, shadcn/ui on Base UI, lucide-react icons, cmdk for the command palette. There is no backend or database; checklist and training progress are stored in the browser's `localStorage`.
