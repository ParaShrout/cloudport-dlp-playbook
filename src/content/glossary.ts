import type { GlossaryTerm } from "./types";

/**
 * Definitions use the vocabulary of the Google Site user manual. Add terms
 * as more pages are transferred (Simulcast / Replay / Wheel Hours, etc.).
 */
export const glossary: GlossaryTerm[] = [
  {
    term: "Cloudport",
    definition:
      "Amagi's cloud playout platform used to run the station streams. Accessed in Google Chrome at cbsnews.east-cloudport.amagi.tv.",
  },
  {
    term: "DLP",
    aka: ["Digital Line Producer"],
    definition:
      "The person responsible for what is on a station's stream during a shift: watching the schedule, running live cut-ins and escalating problems.",
  },
  {
    term: "Lead DLP",
    definition: "Senior DLP on shift for a station. First escalation point for judgement calls.",
  },
  {
    term: "Channel",
    definition:
      "One station's stream inside Cloudport. Each station's DLPs see only their own schedule, rundown and playout.",
  },
  {
    term: "Playout page",
    definition:
      "The Cloudport page showing the schedule of events for your channel. Live cut-ins are added and taken from here; Take Next is in the lower left, Take Live and Live Off in the upper right.",
  },
  {
    term: "Event",
    definition:
      "One item in the Playout schedule (a show, a segment, a live segment). Live segments are added by right-clicking the event before where you want the cut-in.",
  },
  {
    term: "File playback programming",
    aka: ["File show"],
    definition: "Scheduled programming played from files rather than a live source. Live cut-ins interrupt file playback.",
  },
  {
    term: "Live cut-in",
    definition:
      "Inserting a live source into file playback programming. Two methods: Adding Live Segments (preferred) and Immediate Live.",
  },
  {
    term: "Adding Live Segments",
    aka: ["Add Live Segment"],
    definition:
      "The preferred cut-in method. A live segment is added after an existing event, its source and duration are set, and Take Next is used to start and end it. Offers the most control over when normal programming resumes.",
  },
  {
    term: "Immediate Live",
    aka: ["Take Live"],
    definition:
      "The quick cut-in method. Take Live inserts an immediate live show into the schedule (now or at a chosen time); Live Off ends it and Cloudport joins the originally scheduled programming in progress.",
  },
  {
    term: "Live segment",
    definition:
      "An event that plays a live source. Becomes active as soon as the prior event's duration expires, so confirm there is adequate time before the next event.",
  },
  {
    term: "Hold mode",
    definition:
      "The default state of a newly added live segment. The segment holds until you click Take Next to move on.",
  },
  {
    term: "Take Next",
    definition:
      "Button in the lower left of the Playout page. Starts the live segment when you are ready, and moves on to the next event when the cut-in completes.",
  },
  {
    term: "Live Off",
    definition:
      "Button in the upper right of the Playout page. Ends an Immediate Live cut-in; Cloudport joins the originally scheduled programming in progress.",
  },
  {
    term: "Live template",
    definition: "A preset selected during Immediate Live that defines the live source. Confirm the correct source is present before proceeding.",
  },
  {
    term: "Preview column",
    definition:
      "Column on the Playout page with an orange button that previews the live source for a segment. Use it to confirm the correct source, and switch the toggle to Custom to pick a different one.",
  },
  {
    term: "Start trigger",
    definition:
      "A setting on a show that controls when it starts. After a cut-in begins, check that start triggers on the following show are adjusted as necessary.",
  },
  {
    term: "Disabled event",
    definition:
      "An event marked so it does not play. Used for a live segment whose exact start time is unknown; move it as necessary and enable it when ready.",
  },
  {
    term: "Rundown",
    definition: "The newsroom's running order for a newscast. The stream's schedule is built from, and kept in sync with, the station rundown.",
  },
  {
    term: "Troubleshooting channel",
    aka: ["Station channel"],
    definition:
      "Each station's own Slack channel for its DLPs. Where cut-ins are announced, Sev 3-4 issues are raised and the Lead DLP is reached. Pick your station in the header to see yours.",
  },
  {
    term: "Shift log",
    definition:
      "Written record of each shift: live events with times, issues, fixes and open escalations. Read at the start of the next shift.",
  },
  {
    term: "Sev 1-4",
    aka: ["Severity"],
    definition:
      "How urgent an issue is. Sev 1 is off air, Sev 2 degraded on air, Sev 3 not yet on air, Sev 4 a question or request. Drives who you contact and how fast.",
  },
  {
    term: "NOC",
    definition: "Amagi's 24/7 Network Operations Centre. Tier 3 support; DLPs call directly only for Sev 1.",
  },
  {
    term: "Stream Planning & Ops",
    aka: ["Stream Ops"],
    definition:
      "The CBS Digital team that owns the Cloudport rollout, configuration and vendor relationship. Tier 2 support.",
  },
];
