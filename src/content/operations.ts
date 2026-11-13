import type { Checklist, Station } from "./types";
import { site } from "./site";

/**
 * Day-to-day operations reference. Edit freely; station rows and checklist
 * items are plain data.
 */

/**
 * Stations running Cloudport. Each station has its own troubleshooting
 * channel and Lead DLP, so DLPs pick their station in the header and the
 * dashboard, escalations page and guides show that station's path.
 *
 * Values beginning with "Add " are placeholders. Replace them with the real
 * contact details. Add each station's `slackChannelId` so the Report an issue
 * button opens the channel directly.
 */
export const stations: Station[] = [
  {
    id: "baltimore",
    callSign: "WJZ",
    market: "Baltimore",
    channelName: "CBS News Baltimore",
    watchLinks: [
      { label: "CBS News", href: "https://www.cbsnews.com/baltimore/live/" },
      {
        label: "CBS.com",
        href: "https://www.cbs.com/ks-news/84/live-row-0/LET-189693487/",
      },
    ],
    timeZone: "America/New_York",
    status: "live",
    notes:
      "POC station. The official user guide was written against this channel.",
    escalation: {
      troubleshootingChannel: "#cbsnews-baltimore-trouble-shooting",
      leadDlp: "Add Baltimore Lead DLP contact",
      controlRoom: "Add WJZ control room phone / intercom",
    },
  },
  {
    id: "sacramento",
    callSign: "KOVR",
    market: "Sacramento",
    channelName: "CBS News Sacramento",
    watchLinks: [
      { label: "CBS News", href: "https://www.cbsnews.com/sacramento/live/" },
      {
        label: "CBS.com",
        href: "https://www.cbs.com/ks-news/84/live-row-0/LET-189693533/",
      },
    ],
    timeZone: "America/Los_Angeles",
    status: "live",
    escalation: {
      troubleshootingChannel: "#cbsnews-sac-troubleshooting",
      leadDlp: "Add Sacramento Lead DLP contact",
      controlRoom: "Add KOVR control room phone / intercom",
    },
  },
  {
    id: "miami",
    callSign: "WFOR",
    market: "Miami",
    channelName: "CBS News Miami",
    watchLinks: [
      { label: "CBS News", href: "https://www.cbsnews.com/miami/live/" },
      {
        label: "CBS.com",
        href: "https://www.cbs.com/ks-news/84/live-row-0/LET-189693528/",
      },
    ],
    timeZone: "America/New_York",
    status: "live",
    escalation: {
      troubleshootingChannel: "#cbsnews-miami-trouble-shooting",
      leadDlp: "Add Miami Lead DLP contact",
      controlRoom: "Add WFOR control room phone / intercom",
    },
  },
];

export function getStation(id: string | null | undefined): Station | undefined {
  return stations.find((s) => s.id === id);
}

/** Slack link for a station's troubleshooting channel, or undefined while it is a placeholder. */
export function stationChannelUrl(
  station: Pick<Station, "escalation">,
): string | undefined {
  const { troubleshootingChannel, slackChannelId } = station.escalation;
  if (slackChannelId)
    return `${site.slack.workspaceUrl}/archives/${slackChannelId}`;
  if (troubleshootingChannel.startsWith("Add ")) return undefined;
  return `https://slack.com/app_redirect?channel=${encodeURIComponent(troubleshootingChannel.replace(/^#/, ""))}`;
}

export const dailyRhythm = [
  {
    time: "Start of shift",
    title: "Take the handoff",
    text: "Read the previous shift's log, confirm your station's channel is on air, confirm today's schedule is published and note any planned live hits.",
  },
  {
    time: "Before first newscast",
    title: "Pre-air checks",
    text: "Sign in to Cloudport in Chrome, open the Playout page and confirm the first show of the day is scheduled as expected.",
  },
  {
    time: "Through the day",
    title: "Monitor and adjust",
    text: "Run live cut-ins on request (Adding Live Segments preferred), check the events after each cut-in, and keep your station's troubleshooting channel current.",
  },
  {
    time: "After each live event",
    title: "Reconcile the schedule",
    text: "Confirm the playlist and channel output moved to the next event, then assess the timing impact and adjust the schedule so the next show starts on time.",
  },
  {
    time: "End of shift",
    title: "Hand off",
    text: "Write the shift log: what aired live, issues, open escalations, anything the next DLP needs to watch.",
  },
];

export const checklists: Checklist[] = [
  {
    id: "initial-setup",
    title: "Initial set-up tasks",
    description:
      "The following UI set-up tasks should be completed the first time a user signs in to Cloudport to ensure correct UI fields are visible.",
    items: [
      { id: "is-1", text: "Login to Cloudport, navigate to Playout page." },
      {
        id: "is-2",
        text: "Confirm correct columns are visible and positioned per standard screen grab.",
      },
      { id: "is-3", text: "Check same details on Schedule and Layout pages." },
    ],
  },
  {
    id: "pre-shift",
    title: "Start of shift checks",
    description:
      "The following steps should be performed at the start of each DLP's shift.",
    items: [
      { id: "ps-1", text: "Login to Cloudport, navigate to Playout page." },
      { id: "ps-2", text: "Confirm channel output video is present." },
      { id: "ps-3", text: "Confirm playlist is in correct position for time." },
      { id: "ps-4", text: "Check current and next shows for issues." },
      {
        id: "ps-5",
        text: "Review any warnings and errors using the shortcuts under the counters.",
      },
      { id: "ps-6", text: "Check channel output from streaming distribution." },
      { id: "ps-7", text: "Confirm closed captioning is present." },
      {
        id: "ps-8",
        text: "Confirm at least one commercial break airs with ads.",
      },
    ],
  },
  {
    id: "handoff",
    title: "End of shift checks",
    description:
      "The following steps should be performed at the end of each DLP's shift.",
    items: [
      { id: "es-1", text: "Confirm channel output video is present." },
      { id: "es-2", text: "Confirm playlist is in correct position for time." },
      { id: "es-3", text: "Check current and next shows for issues." },
      {
        id: "es-4",
        text: "Ensure any Schedule page tabs opened have been exited from edit mode.",
      },
      { id: "es-5", text: "Logout of Cloudport and Windows." },
    ],
  },
  {
    id: "pre-live",
    title: "Before any live cut-in",
    description: "The short version of the Adding Live Segments guide.",
    items: [
      {
        id: "pl-1",
        text: "Method chosen: Adding Live Segments (preferred) or Immediate Live if it has to go now.",
        guide: "live-cut-ins",
      },
      {
        id: "pl-2",
        text: "Playout page open and scrolled to the planned cut-in time.",
        guide: "live-cut-in-add-live-segment",
      },
      {
        id: "pl-3",
        text: "Prior event identified, with adequate time left before the next event starts.",
        guide: "live-cut-in-add-live-segment",
      },
      {
        id: "pl-4",
        text: "Live source confirmed with the orange Preview button (Custom if the default is wrong).",
        guide: "live-cut-in-add-live-segment",
      },
      {
        id: "pl-5",
        text: "Duration set to the estimated cut-in length; event disabled if the start time is unknown.",
        guide: "live-cut-in-add-live-segment",
      },
    ],
  },
];

export const communicationNorms = [
  {
    title: "Station troubleshooting channel",
    text: "Each station has its own channel. Every live cut-in gets two posts there: 'Live on stream at HH:MM' and 'Back to schedule at HH:MM'. Questions and Sev 3-4 issues go there first. Keep it short; details go in the shift log.",
  },
  {
    title: "Incident channel",
    text: "One thread per incident. First post uses the incident template. Update the thread when the state changes and when it is resolved.",
  },
  {
    title: "Shift log",
    text: "Written in plain language for the next DLP. Times in local station time. Include what you tried, not just what broke.",
  },
  {
    title: "Changes to the schedule",
    text: "After every cut-in, check the following events for conflicting content and adjust so the next show starts on time. Check with the Lead DLP before removing a show.",
  },
];
