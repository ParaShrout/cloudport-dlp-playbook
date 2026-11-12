import type { Contact, EscalationTier, Severity } from "./types";

/**
 * Escalation paths and support contacts.
 *
 * Contact values marked "Add ..." are placeholders. Replace them with the real
 * Slack channel, phone number, email or ticket queue for your team.
 */

export const severities: Severity[] = [
  {
    level: "Sev 1",
    label: "Off air",
    color: "red",
    definition:
      "A station's stream is black, frozen, silent or showing the wrong content, or a breaking-news cut-in cannot be taken.",
    examples: [
      "Channel output is black or frozen for more than 30 seconds.",
      "Live cut-in fails on the second attempt during breaking news.",
      "Wrong content is airing on the channel.",
    ],
    responseTarget: "Immediate. Phone first, then post.",
    firstAction:
      "Call the Amagi NOC and the on-call Stream Ops lead at the same time. Post in the incident channel with station, time, what you see and what you tried.",
    notify: ["Amagi NOC (phone)", "Stream Ops on-call (phone)", "Your station's Lead DLP", "Incident channel"],
  },
  {
    level: "Sev 2",
    label: "Degraded on air",
    color: "orange",
    definition:
      "The stream is on air but something is wrong for viewers, or an on-air problem is likely within the next 15 minutes.",
    examples: [
      "No audio or wrong audio on a live cut-in.",
      "Live source offline 2 minutes before a planned cut-in.",
      "Schedule running late enough to miss a hard-start newscast.",
    ],
    responseTarget: "Within 15 minutes.",
    firstAction:
      "Try the matching Troubleshooting entry in the guide. If not fixed in 2 minutes, post in the incident channel and page Stream Ops.",
    notify: ["Stream Ops on-call", "Your station's Lead DLP", "Incident channel", "Your station's troubleshooting channel"],
  },
  {
    level: "Sev 3",
    label: "Not yet on air",
    color: "amber",
    definition:
      "A problem that will affect air later today if not fixed, but nothing is wrong for viewers right now.",
    examples: [
      "An asset failed QC and is scheduled for later today.",
      "A scheduling error spotted before publish.",
      "A Cloudport feature is misbehaving but there is a workaround.",
    ],
    responseTarget: "Same shift.",
    firstAction: "Post in your station's troubleshooting channel with the Cloudport channel name, the item and a screenshot. Tag the Lead DLP.",
    notify: ["Your station's troubleshooting channel", "Your station's Lead DLP"],
  },
  {
    level: "Sev 4",
    label: "Question or request",
    color: "slate",
    definition: "Access requests, how-to questions, documentation gaps, feature ideas.",
    examples: [
      "Need a Cloudport login for a new DLP.",
      "A step in a guide does not match what the UI shows.",
      "Request for a new report or template.",
    ],
    responseTarget: "Next business day.",
    firstAction: "Check this playbook first, then post in your station's troubleshooting channel. Access requests and documentation fixes go to the DLP support channel.",
    notify: ["Your station's troubleshooting channel", "DLP support channel"],
  },
];

export const tiers: EscalationTier[] = [
  {
    tier: "Tier 0",
    name: "Self-serve",
    whoTheyAre: "This playbook: step-by-step guides, troubleshooting tables and the glossary.",
    useWhen: "You are unsure of a step or something looks off but is not affecting air.",
    howToReach: ["Search this site (press / or Cmd+K)", "Troubleshooting section at the bottom of each guide"],
    expectedResponse: "Instant.",
  },
  {
    tier: "Tier 1",
    name: "Lead DLP on shift",
    whoTheyAre:
      "The senior DLP covering the shift. Knows the day's schedule and can approve removing content.",
    useWhen:
      "Any decision about what airs, schedule drift that threatens a hard start, or when a guide does not cover your situation.",
    howToReach: ["Your station's troubleshooting channel (see Your station, above)", "Lead DLP contact for your station"],
    expectedResponse: "Minutes.",
  },
  {
    tier: "Tier 2",
    name: "Stream Planning & Ops",
    whoTheyAre:
      "The CBS Digital Stream Planning & Ops team that owns the Cloudport rollout, configuration, accounts and the vendor relationship.",
    useWhen:
      "Cloudport is not behaving as documented, access or configuration problems, anything Sev 2 or higher.",
    howToReach: [
      "Incident channel: Add Slack channel name",
      "On-call phone: Add on-call number",
      "Email: Add team distribution list",
    ],
    expectedResponse: "Sev 1-2: 15 minutes. Sev 3-4: same shift / next business day.",
  },
  {
    tier: "Tier 3",
    name: "Amagi support (NOC)",
    whoTheyAre: "Amagi's 24/7 network operations centre for Cloudport.",
    useWhen:
      "Platform outage, channel off air for platform reasons, live source ingest failures on Amagi's side. DLPs contact Amagi directly only for Sev 1; otherwise go through Stream Ops.",
    howToReach: [
      "NOC phone (Sev 1 only): Add Amagi NOC number",
      "Support portal / email: Add Amagi support address",
    ],
    expectedResponse: "Per vendor SLA (Sev 1 acknowledged within 15 minutes).",
  },
];

/** Contacts shared by every station. Station-specific channels live in operations.ts. */
export const contacts: Contact[] = [
  {
    name: "Incident channel",
    role: "Sev 1 and Sev 2 incidents",
    channel: "Add Slack channel name",
    hours: "24/7",
    notes: "Post here even if you also called. The thread becomes the incident record.",
  },
  {
    name: "DLP support channel",
    role: "Sev 3 and Sev 4 questions, access requests, documentation feedback",
    channel: "Add Slack channel name",
    hours: "Business hours",
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
    notes: "Have the channel name, time of issue and what you observed ready before you call.",
  },
];

export const incidentTemplate = `Station (Baltimore / Sacramento / Miami) and Cloudport channel:
Time noticed (local):
Severity (Sev 1-4):
What viewers see:
What you were doing in Cloudport:
Live source involved (if any):
What you have tried:
Current state (on air / off air / degraded):
Your name and contact:`;
