import type { Checklist, Station } from "./types";

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
 * Slack channel names and phone numbers.
 */
export const stations: Station[] = [
  {
    id: "baltimore",
    callSign: "WJZ",
    market: "Baltimore",
    channelName: "CBS News Baltimore",
    timeZone: "America/New_York",
    status: "live",
    notes: "POC station. The official user guide was written against this channel.",
    escalation: {
      troubleshootingChannel: "Add Baltimore troubleshooting Slack channel",
      leadDlp: "Add Baltimore Lead DLP contact",
      controlRoom: "Add WJZ control room phone / intercom",
    },
  },
  {
    id: "sacramento",
    callSign: "KOVR",
    market: "Sacramento",
    channelName: "CBS News Sacramento",
    timeZone: "America/Los_Angeles",
    status: "live",
    escalation: {
      troubleshootingChannel: "Add Sacramento troubleshooting Slack channel",
      leadDlp: "Add Sacramento Lead DLP contact",
      controlRoom: "Add KOVR control room phone / intercom",
    },
  },
  {
    id: "miami",
    callSign: "WFOR",
    market: "Miami",
    channelName: "CBS News Miami",
    timeZone: "America/New_York",
    status: "live",
    escalation: {
      troubleshootingChannel: "Add Miami troubleshooting Slack channel",
      leadDlp: "Add Miami Lead DLP contact",
      controlRoom: "Add WFOR control room phone / intercom",
    },
  },
];

export function getStation(id: string | null | undefined): Station | undefined {
  return stations.find((s) => s.id === id);
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
    text: "Verify live sources for the station are active, the output monitor is up, and the first hard-start item is on time.",
  },
  {
    time: "Through the day",
    title: "Monitor and adjust",
    text: "Watch for schedule drift after live events, run cut-ins on request, and keep the shift channel current.",
  },
  {
    time: "After each live event",
    title: "Reconcile the schedule",
    text: "Confirm the schedule resumed correctly and fix drift before the next hard start.",
  },
  {
    time: "End of shift",
    title: "Hand off",
    text: "Write the shift log: what aired live, issues, open escalations, anything the next DLP needs to watch.",
  },
];

export const checklists: Checklist[] = [
  {
    id: "pre-shift",
    title: "Start of shift",
    description: "Run this before you take responsibility for the channel.",
    items: [
      { id: "ps-1", text: "Read the previous shift log and any open incident threads." },
      { id: "ps-2", text: "Open Cloudport, select the station channel, confirm status is On Air." },
      { id: "ps-3", text: "Open the output monitor / player for the channel and confirm picture and audio." },
      { id: "ps-4", text: "Confirm today's playlist is published through end of day." },
      { id: "ps-5", text: "Check Live Sources: all station inputs Active." },
      { id: "ps-6", text: "Note planned live hits and hard-start newscasts for the shift." },
      { id: "ps-7", text: "Post 'On shift' in your station's troubleshooting channel." },
    ],
  },
  {
    id: "pre-live",
    title: "Before any live cut-in",
    description: "The short version of the Live Cut-Ins guide.",
    items: [
      { id: "pl-1", text: "Request confirmed: station, source, start, duration, return behaviour.", guide: "live-cut-ins" },
      { id: "pl-2", text: "Correct channel open, Production environment.", guide: "live-cut-ins" },
      { id: "pl-3", text: "Live source Active with moving preview and audio meters.", guide: "live-cut-ins" },
      { id: "pl-4", text: "Next hard start identified.", guide: "live-cut-ins" },
      { id: "pl-5", text: "Previewed before Take.", guide: "live-cut-ins" },
    ],
  },
  {
    id: "handoff",
    title: "End of shift handoff",
    description: "Leave the next DLP with no surprises.",
    items: [
      { id: "ho-1", text: "Channel on air, schedule on time (or drift noted)." },
      { id: "ho-2", text: "Shift log written: live events, issues, resolutions." },
      { id: "ho-3", text: "Open escalations listed with ticket / thread links." },
      { id: "ho-4", text: "Upcoming live hits for the next shift noted." },
      { id: "ho-5", text: "Post 'Off shift, handed to <name>' in your station's troubleshooting channel." },
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
    title: "Changes to the playlist",
    text: "Removing program content needs Lead DLP sign-off. Skipping promos and filler to recover time does not.",
  },
];
