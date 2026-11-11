import type { Checklist, Station } from "./types";

/**
 * Day-to-day operations reference. Edit freely; station rows and checklist
 * items are plain data.
 */

export const stations: Station[] = [
  {
    callSign: "WJZ",
    market: "Baltimore",
    channelName: "CBS News Baltimore",
    status: "live",
    notes: "POC station. All guides were written against this channel.",
  },
  {
    callSign: "Add call sign",
    market: "Add market",
    channelName: "Add Cloudport channel name",
    status: "planned",
    notes: "Add one row per station as it onboards.",
  },
];

export const dailyRhythm = [
  {
    time: "Start of shift",
    title: "Take the handoff",
    text: "Read the previous shift's log, confirm the channel is on air, confirm today's schedule is published and note any planned live hits.",
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
      { id: "ps-7", text: "Post 'On shift' in the shift channel." },
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
      { id: "ho-5", text: "Post 'Off shift, handed to <name>' in the shift channel." },
    ],
  },
];

export const communicationNorms = [
  {
    title: "Shift channel",
    text: "Every live cut-in gets two posts: 'Live on stream at HH:MM' and 'Back to schedule at HH:MM'. Keep it short; details go in the shift log.",
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
