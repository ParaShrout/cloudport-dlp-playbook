import type { Contact, EscalationTier, Priority } from "./types";
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

export const tiers: EscalationTier[] = [
  {
    tier: "Tier 0",
    name: "Self-serve",
    whoTheyAre:
      "This playbook: step-by-step guides, troubleshooting tables and the glossary.",
    useWhen:
      "You are unsure of a step or something looks off but is not affecting air.",
    howToReach: [
      "Search this site (press / or Cmd+K)",
      "Troubleshooting Tips in the guides list",
      "Ask other DLPs in #amagi-poc-producing-chat",
    ],
    expectedResponse: "Instant.",
  },
  {
    tier: "Tier 1",
    name: "Lead DLP on shift",
    whoTheyAre:
      "The senior DLP covering the shift. Knows the day's schedule and can approve removing content.",
    useWhen:
      "Any decision about what airs, a cut-in that will make the next show start late, or when a guide does not cover your situation.",
    howToReach: [
      "Your station's troubleshooting channel (see Your station, above)",
      "Lead DLP contact for your station",
    ],
    expectedResponse: "Minutes.",
  },
  {
    tier: "Tier 2",
    name: "Stream Planning & Ops",
    whoTheyAre:
      "The CBS Digital Stream Planning & Ops team that owns the Cloudport rollout, configuration, accounts and the vendor relationship.",
    useWhen:
      "Cloudport is not behaving as documented, access or configuration problems, anything P2 or higher.",
    howToReach: [
      "Incident channel: Add Slack channel name",
      "On-call phone: Add on-call number",
      "Email: Add team distribution list",
    ],
    expectedResponse:
      "P1: 15 minutes. P2: within 1 business hour. P3: next business day.",
  },
  {
    tier: "Tier 3",
    name: "Amagi support (NOC)",
    whoTheyAre: "Amagi's 24/7 network operations centre for Cloudport.",
    useWhen:
      "Platform outage, channel off air for platform reasons, live source ingest failures on Amagi's side. DLPs contact Amagi directly only for a P1; otherwise go through Stream Ops.",
    howToReach: [
      "NOC phone (P1 only): Add Amagi NOC number",
      "Support portal / email: Add Amagi support address",
    ],
    expectedResponse: "Per vendor SLA (P1 acknowledged within 15 minutes).",
  },
];

/** Contacts shared by every station. Station-specific channels live in operations.ts. */
export const contacts: Contact[] = [
  {
    name: "Incident channel",
    role: "P1 and P2 incidents",
    channel: "Add Slack channel name",
    hours: "24/7",
    notes:
      "Post here even if you also called. The thread becomes the incident record.",
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
    name: "Stream Ops on-call",
    role: "Tier 2 escalation",
    channel: "Add on-call phone number",
    hours: "24/7",
  },
  {
    name: "Amagi NOC",
    role: "Tier 3 vendor support",
    channel: "Add Amagi NOC phone and support email",
    hours: "24/7",
    notes:
      "Have the channel name, time of issue and what you observed ready before you call.",
  },
];

/**
 * Agreed with the programming manager. The Report an issue form on the
 * escalations page fills this in; keep the three lines in this order.
 */
export const incidentTemplate = `[Timing]: LIVE NOW / airs at 6:00 PM (within 2 hrs) / airs tomorrow
[What's happening]: e.g., assets won't ingest into the 7 PM wheel; error attached
[What you tried]: e.g., re-uploaded twice, same result`;
