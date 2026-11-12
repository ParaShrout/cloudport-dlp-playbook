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
    id: "pre-shift",
    title: "Start of shift",
    description: "Run this before you take responsibility for the channel.",
    items: [
      { id: "ps-1", text: "Read the previous shift log and any open incident threads." },
      { id: "ps-2", text: "In Google Chrome, sign in to Cloudport and open the Playout page for your station." },
      { id: "ps-3", text: "Confirm the channel is on air and the current event matches the schedule." },
      { id: "ps-4", text: "Scroll ahead through the shift's schedule and note planned live cut-ins and show start times." },
      { id: "ps-5", text: "Confirm any live segments already added for the shift have the correct source and duration." },
      { id: "ps-7", text: "Post 'On shift' in your station's troubleshooting channel." },
    ],
  },
  {
    id: "pre-live",
    title: "Before any live cut-in",
    description: "The short version of the Adding Live Segments guide.",
    items: [
      { id: "pl-1", text: "Method chosen: Adding Live Segments (preferred) or Immediate Live if it has to go now.", guide: "live-cut-ins" },
      { id: "pl-2", text: "Playout page open and scrolled to the planned cut-in time.", guide: "live-cut-in-add-live-segment" },
      { id: "pl-3", text: "Prior event identified, with adequate time left before the next event starts.", guide: "live-cut-in-add-live-segment" },
      { id: "pl-4", text: "Live source confirmed with the orange Preview button (Custom if the default is wrong).", guide: "live-cut-in-add-live-segment" },
      { id: "pl-5", text: "Duration set to the estimated cut-in length; event disabled if the start time is unknown.", guide: "live-cut-in-add-live-segment" },
    ],
  },
  {
    id: "handoff",
    title: "End of shift handoff",
    description: "Leave the next DLP with no surprises.",
    items: [
      { id: "ho-1", text: "Channel on air and the next show set to start on time (or timing issue noted)." },
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
    title: "Changes to the schedule",
    text: "After every cut-in, check the following events for conflicting content and adjust so the next show starts on time. Check with the Lead DLP before removing a show.",
  },
];
