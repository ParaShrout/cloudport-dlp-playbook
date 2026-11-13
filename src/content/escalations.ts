import type {
  Contact,
  EscalationStep,
  EscalationTier,
  Priority,
} from "./types";
import { site } from "./site";

/**
 * Escalation paths and support contacts.
 *
 * Contact values marked "Add ..." are placeholders. Replace them with the real
 * Slack channel, phone number, email or ticket queue for your team.
 */

/** Priority levels from the "Priority Levels" sheet. Text kept as written. */
export const priorities: Priority[] = [
  {
    level: "P1",
    label: "Outage / on-air impact",
    color: "red",
    definition:
      "The stream is down or degraded now, or a show airing within the next 2 hours is at risk. Channel down or in rescue slate is always P1.",
    examples: [
      "Live stream black/frozen",
      "Recording not appearing during a newscast",
      "Encoder/ingest failure",
      "Playout stuck in looper",
      "Wheel cannot be built for a slot inside 2 hours",
      "Sustained rescue \u2265 5\u20137 min",
    ],
    response: [
      "Acknowledge: immediately, any hour (on-call ping).",
      "Mitigate first (Section 9). If L1 cannot restore within 15 minutes, open a Freshdesk ticket to Amagi (or phone escalation if Freshdesk is not responding) and create/link the internal Jira.",
      "Updates: every 15 minutes in the #i-news-missioncontr thread until mitigated; station channel gets status, ETA and 'back to normal' \u2014 no triage chatter.",
      "Close: closure summary in the station channel + outage duration summary in Mission Control + Airtable incident record the same day.",
    ],
  },
  {
    level: "P2",
    label: "Degraded / airing today",
    color: "orange",
    definition:
      "Real functional impact for something airing today or within 24 hours, but the stream is stable right now and a workaround may exist.",
    examples: [
      "Replay segments arriving late for tonight's replay",
      "Intermittent artifacts",
      "One encoder down with backup active",
      "Captions/graphics issue on a non-live asset",
      "Mini playlist timing wrong for a later show",
    ],
    response: [
      "Acknowledge: within 1 business hour (sooner if the airing is close).",
      "Ticket: Airtable record at intake; Freshdesk if Amagi action is needed; Jira if internal/distribution.",
      "Updates: at each material change and at least once per shift until resolved or until the airing is safely past; resolution posted in the station channel.",
      "Reviewed at the Monday standup.",
    ],
  },
  {
    level: "P3",
    label: "Bug not affecting workflows / feature request",
    color: "slate",
    definition:
      "Cosmetic or non-blocking bugs, questions, access requests, enhancements, known/expected conditions.",
    examples: [
      "UI display bug",
      "Hotkey request",
      "Favorites list",
      "EPG metadata noise",
      "Expected scheduling holes",
      "Documentation questions",
    ],
    response: [
      "Acknowledge: next business day.",
      "Ticket: Airtable (Type = Bug/Enhancement) \u2014 batched into the Tuesday product call with Amagi; Freshdesk/CRP only when Amagi accepts the work.",
      "Updates: via Airtable status; no stakeholder alerting.",
      "Requester is told the Airtable item and target release.",
    ],
  },
];

/**
 * What a DLP needs to know. Shown at the top of the escalations page next
 * to the Report an issue form.
 */
export const dlpSteps: string[] = [
  "Post in your station's troubleshooting channel \u2014 the only place you ever need to go, any hour.",
  "Lead with timing: LIVE NOW, airs within 2 hours, channel down / in rescue, or 'airs tomorrow'. Then: which stream, what you see, what you tried, screenshot if you have one.",
  "Ops acknowledges in your thread and owns it. All updates stay in that thread; you never need to contact engineering or Amagi yourself.",
  "When in doubt, report it. You do not decide severity \u2014 Ops does. A false alarm costs minutes; a missed problem costs air.",
];

/** Escalation path, from the "Escalation Path and Timing" sheet. */
export const tiers: EscalationTier[] = [
  {
    tier: "Level 1",
    name: "Video Ops (24/7)",
    who: "Dave Swietkowski's team",
    scope:
      "First response on everything. Classifies; runs the mitigation playbook (Section 9): take national, re-trigger break, re-upload, restart session, swap live source, insert alternate assets.",
    escalatesWhen:
      "P1 not mitigated in 15 minutes, or the fix is outside L1 boundaries (configuration, ingest path, platform fault).",
  },
  {
    tier: "Level 2",
    name: "Internal Engineering",
    who: "Markel (ingest / Cloudport UI / EPG); Dave's team for encoders, cloud encoding, CDN, distribution",
    scope:
      "Deeper diagnosis; owns distribution and encoder changes; decides vendor vs. downstream.",
    escalatesWhen:
      "Root cause sits on the Amagi platform, or Amagi must make the change.",
  },
  {
    tier: "Level 3",
    name: "Amagi",
    who: "Freshdesk \u2192 Evan Thomas \u2192 Paco Lancaster. Business hours 8\u20135 ET domestic team; after hours Bangalore (24/7/365). Phone number in Cloudport UI / escalation matrix.",
    scope:
      "Platform faults, hotfixes, player/pod restarts, resource/config corrections, log pulls for RCA.",
    escalatesWhen:
      "Response not received within 15\u201320 minutes on a P1 \u2192 next contact in the matrix. One CBS escalation owner per incident (avoid many-to-one calls).",
  },
];

/** Who owns each step and who is in the conversation, from the "Who Classifies and Who to Include" sheet. */
export const escalationSteps: EscalationStep[] = [
  {
    step: "Intake in station channel",
    owner: "DLP posts; Video Ops acknowledges within the thread",
    whoIsIn:
      "DLP + Ops. Station engineers are not on Slack \u2014 Ops emails them when the cause is on-prem.",
  },
  {
    step: "Classification (P1/P2/P3)",
    owner: "Video Ops L1 on duty",
    whoIsIn:
      "Ops only. P-levels are for the team's handling, not something stations are asked to set.",
  },
  {
    step: "P1 working thread",
    owner: "Video Ops opens the thread in #i-news-missioncontr",
    whoIsIn:
      "Video Ops, Markel/engineering on-call, Evan (Amagi), Clinton; stakeholders (Sherra, Andrea, Fred) read the opened/resolved posts. DLPs are not members.",
  },
  {
    step: "Vendor engagement",
    owner: "Video Ops (or engineering) opens Freshdesk",
    whoIsIn:
      "Amagi support desk; Evan as single CBS-facing contact; Paco Lancaster if unanswered.",
  },
  {
    step: "Station communication",
    owner: "Video Ops posts status/ETA/closure in the station channel",
    whoIsIn:
      "Station channel members. Andrea approves any standing message templates.",
  },
  {
    step: "Record",
    owner:
      "Video Ops creates the Airtable incident + Vid Ops Incident Report; Clinton reconciles weekly",
    whoIsIn: "Everyone reads the tracker; leadership reads Progress Overview.",
  },
];

/** Contacts shared by every station. Station-specific channels live in operations.ts. */
export const contacts: Contact[] = [
  {
    name: "Video Operations (L1)",
    role: "First response on every issue, any hour. Acknowledges in your station channel thread and owns it from there.",
    channel: "Your station's troubleshooting channel",
    hours: "24/7",
    notes:
      "Dave Swietkowski (lead), Tobias Girazian. You never need to contact engineering or Amagi yourself.",
  },
  {
    name: "DLP producing chat",
    role: "Open office: how-to and programming questions from any station",
    channel: site.slack.producingChat.name,
    href: site.slack.producingChat.url,
    hours: "Business hours",
    notes:
      "Not for on-air issues. Those go to your station's troubleshooting channel using the issue template.",
  },
  {
    name: "Mission Control",
    role: "Ops working thread for P1 incidents",
    channel: "#i-news-missioncontr",
    hours: "24/7",
    notes:
      "Opened by Video Ops. DLPs are not members; status, ETA and closure come back to your station channel.",
  },
];

/**
 * Agreed with the programming manager. The Report an issue form on the
 * escalations page fills this in; keep the three lines in this order.
 */
export const incidentTemplate = `[Timing]: LIVE NOW / airs at 6:00 PM (within 2 hrs) / airs tomorrow
[What's happening]: e.g., assets won't ingest into the 7 PM wheel; error attached
[What you tried]: e.g., re-uploaded twice, same result`;
