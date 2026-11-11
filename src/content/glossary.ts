import type { GlossaryTerm } from "./types";

export const glossary: GlossaryTerm[] = [
  {
    term: "Cloudport",
    definition:
      "Amagi's cloud playout platform. It holds the channel, the daily playlist, the media library and the live sources, and it produces the stream viewers watch.",
  },
  {
    term: "DLP",
    aka: ["Digital Line Producer"],
    definition:
      "The person responsible for what is on a station's stream during a shift: building and adjusting the schedule, running live cut-ins and escalating problems.",
  },
  {
    term: "Lead DLP",
    definition:
      "Senior DLP on shift. Approves removing program content and is the first escalation point for judgement calls.",
  },
  {
    term: "Channel",
    definition:
      "One station's 24/7 stream inside Cloudport (for example CBS News Baltimore). Each channel has its own playlist, live sources and output.",
  },
  {
    term: "Playlist",
    aka: ["Schedule", "Timeline"],
    definition:
      "The ordered list of items (assets, live blocks, breaks) that Cloudport plays for a channel across the day. Changes to the published playlist take effect on air.",
  },
  {
    term: "Rundown",
    definition:
      "The newsroom's running order for a newscast. In this project the stream's playlist is built from, and kept in sync with, the station rundowns.",
  },
  {
    term: "Asset",
    definition: "A video file in the Cloudport media library that can be placed in a playlist.",
  },
  {
    term: "Live source",
    aka: ["Input", "Live input", "Encoder feed"],
    definition:
      "A live video/audio input into Cloudport, usually the control room program output sent over SRT or RTMP. Must be Active before it can be put on air.",
  },
  {
    term: "Live cut-in",
    aka: ["Cut-in", "Go live"],
    definition:
      "Interrupting the scheduled playlist with a live source, then returning to the schedule. The core live-operations task for DLPs.",
  },
  {
    term: "Take",
    aka: ["Go Live"],
    definition: "The action that puts the selected live source on air.",
  },
  {
    term: "Return to schedule",
    aka: ["End live"],
    definition:
      "Ending a cut-in so the playlist takes over again, using either Resume or Join in progress.",
  },
  {
    term: "Resume",
    definition:
      "Return behaviour: continue the interrupted item where it stopped. The rest of the schedule runs late by the length of the cut-in.",
  },
  {
    term: "Join in progress",
    definition:
      "Return behaviour: jump to whatever the playlist says should be airing at the current clock time. Keeps the schedule on time; interrupted content is skipped.",
  },
  {
    term: "Hard start",
    aka: ["Fixed start", "Must-air"],
    definition:
      "A playlist item that must begin at a fixed clock time, typically a live newscast. Everything else in the schedule flexes around hard starts.",
  },
  {
    term: "Drift",
    definition:
      "The gap between where the playlist should be and where it actually is, usually caused by a cut-in that used Resume or an item that ran long.",
  },
  {
    term: "Filler",
    aka: ["Evergreen", "Promo"],
    definition: "Low-priority content used to pad the schedule. First thing to skip when recovering from drift.",
  },
  {
    term: "Slate",
    definition:
      "A static graphic Cloudport can show when nothing else is available, for example if a live source drops.",
  },
  {
    term: "Output monitor",
    aka: ["Player", "Multiviewer"],
    definition:
      "An external view of what viewers actually receive. Always confirm on-air changes here, not only in the Cloudport UI.",
  },
  {
    term: "Troubleshooting channel",
    aka: ["Station channel"],
    definition:
      "Each station's own Slack channel for its DLPs. Where cut-ins are announced, Sev 3-4 issues are raised and the Lead DLP is reached. Pick your station in the header to see yours.",
  },
  {
    term: "Shift log",
    aka: ["As-run notes"],
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
  {
    term: "SRT / RTMP",
    definition: "Transport protocols used to send the control room's live feed into Cloudport.",
  },
  {
    term: "FAST",
    definition:
      "Free Ad-supported Streaming TV. The 24/7 station streams operated through Cloudport are FAST channels.",
  },
];
