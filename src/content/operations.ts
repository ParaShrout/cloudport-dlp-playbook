import type { MonitoringTool, OpsContact, Checklist, Station } from "./types";
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
 * contact details. Add each station's `slackChannelId` so the channel link on
 * the Operations page opens it directly.
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

/**
 * "What we watch": how the stream is monitored and who is responsible.
 * Blurb and table from the "What We Watch - Responsibilities" sheet.
 */
export const monitoring = {
  blurb:
    "Monitoring the stream is a shared responsibility across the workflow. From the moment DLPs build rundowns and initiate their streams, through encoding and automated system checks, to our 24/7 Operations team providing eyes-on-glass monitoring, multiple layers of oversight help ensure stream health and content quality. If an issue arises, DLPs are not expected to manage it alone. Follow the defined escalation process and know that dedicated support teams are actively monitoring and ready to assist.",
  tools: [
    {
      tool: "Cloudport Playout page",
      whatItShows:
        "Channel output preview, playlist position, warnings/errors counters, segment status (red/green), recording state in the media library, redundant player outputs (dashboard).",
      whoUsesIt: "DLPs (their channel), Video Ops (all channels)",
      access:
        "Cloudport account via Evan's team; invitations expire after 7 days.",
    },
    {
      tool: "Grafana all-news dashboard",
      whatItShows:
        "Viewership, A/V health, ad breaks per channel. Open the Starlight group \u2192 station tab (e.g., 'Baltimore Today'). A separate POC dashboard covers test streams.",
      whoUsesIt: "Video Ops; read-only link for stakeholders",
      access:
        "Alex Fernandez administers; request through Video Ops. Link to be pinned in Monitoring folder.",
    },
    {
      tool: "Mux / Conviva",
      whatItShows:
        "Player-side QoE: playback success, exit-before-video-start, failures by device; used for the SLT performance reports.",
      whoUsesIt: "Reporting, Video Ops",
      access: "Existing analytics accounts.",
    },
    {
      tool: "Video Ops detection",
      whatItShows:
        "Silence and missing-ad detection across channels; does not reliably catch rescue loops, so rescue is also audited after the fact.",
      whoUsesIt: "Video Ops",
      access: "Internal.",
    },
    {
      tool: "Live monitoring streams",
      whatItShows:
        "Direct stream monitors per channel (links in Monitoring folder).",
      whoUsesIt: "Everyone",
      access: "Shared site.",
    },
  ] satisfies MonitoringTool[],
};

/** The 24/7 Video Operations team: first line of monitoring and support. */
export const opsTeam = {
  name: "Video Operations (L1)",
  description:
    "Dave Swietkowski's 24/7 team monitors the three station channels and the health dashboards around the clock. They acknowledge, classify (P1/P2/P3) and mitigate issues within L1 boundaries, open tickets, post updates and closure summaries, and log incidents.",
  contacts: [
    { name: "Dave Swietkowski", role: "Video Operations lead" },
    { name: "Tobias Girazian", role: "Video Operations" },
  ] as OpsContact[],
};

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
];
