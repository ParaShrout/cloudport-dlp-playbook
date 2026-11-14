import type { BuildingBlock, Role, TimingMode } from "./types";

/**
 * Dashboard overview content: what Cloudport is, who does what, and the
 * programming building blocks a new DLP should recognise before opening a
 * guide. The two tables come from the "Who Does What" and "Programming
 * Building Blocks" spreadsheets.
 */

export const aboutCloudport = {
  paragraphs: [
    "Cloudport is Amagi's cloud playout platform. It runs the 24/7 streaming channels for CBS News Baltimore, Sacramento and Miami: the daily schedule, file playback, live sources from the control room, recordings and commercial breaks all live in Cloudport.",
    "Digital Line Producers (DLPs) are the people in Cloudport every day. A DLP builds and runs the day's schedule for their station's channel, inserts live cut-ins when news breaks, keeps an eye on recordings, and raises anything that looks wrong in the station channel.",
    "This playbook is the DLP's working reference: set-up and shift checks, step-by-step procedures transferred from the User Manual, who to call, and a training path for new DLPs.",
  ],
};

/** Snapshot of who does what. Update the date when the list is reconfirmed. */
export const rolesAsOf = "Oct 2026";

export const roles: Role[] = [
  {
    role: "Digital Line Producers (DLPs)",
    who: "Station teams, e.g. Eric (BAL); Ali, Holly, Soad, Monica (SAC); Alyssa, Elizabeth (MIA)",
    responsibility:
      "Build and run the daily schedule; start/end-of-shift checks; first eyes on recording status; report issues in the station channel using the template.",
  },
  {
    role: "Programming / News Ops",
    who: "Andrea Oess, Marie Simmons, Desmond",
    responsibility:
      "Own templates, naming, workflow best practices and the DLP-facing documentation; approve any message sent to station channels; UAT sign-off on releases.",
  },
  {
    role: "Video Operations (L1)",
    who: "Dave Swietkowski's 24/7 team (Toby/Tobias, Alex and overnight operators)",
    responsibility:
      "Monitor the three station channels and health dashboards around the clock; acknowledge, classify (P1/P2/P3), mitigate within L1 boundaries; open tickets; post updates and closure summaries; log incidents.",
  },
  {
    role: "Internal Engineering (L2)",
    who: "Markel (asset ingest, Cloudport UI, EPG); Dave's team for encoders, cloud encoding, CDN, distribution",
    responsibility:
      "Deeper troubleshooting when L1 boundaries are exceeded; owns change tickets for ingest/encoder changes.",
  },
  {
    role: "Amagi (L3 / vendor)",
    who: "Evan Thomas, Bruce Jones, Amagi 24/7 Support (Freshdesk)",
    responsibility:
      "Platform faults and changes only Amagi can execute; releases and hotfixes; staging environment; Freshdesk tickets.",
  },
  {
    role: "News Streaming PM",
    who: "Clinton Shrout",
    responsibility:
      "Owns this plan, the Airtable tracker, Monday standup, Tuesday product call facilitation, weekly status and reconciliation.",
  },
  {
    role: "Program lead / stakeholders",
    who: "Sherra Pierre-March (program), Fred Harner, Kyle Sekimoto, Cathy Shallcross, station GMs",
    responsibility:
      "Prioritization, budget, go/no-go decisions, SLT reporting.",
  },
];

export const buildingBlocks: BuildingBlock[] = [
  {
    block: "Simulcast hours",
    whatItIs:
      "Approx. 6-8 hrs/day. The local broadcast newscast airs on the stream at the same time and is recorded for replay.",
    howItIsBuilt:
      "Pre-built mini playlist (live show template + one live segment per rundown segment + breaks with loopers), dragged into the day's schedule, then break times adjusted to the rundown.",
    guide: "simulcast-hours",
  },
  {
    block: "Replay hours",
    whatItIs: "Approx. 7 hrs/day. A newscast recorded earlier is replayed.",
    howItIsBuilt:
      "Mini playlist of placeholders, one per segment, with breaks/loopers/bumpers; placeholders are filled by the recorded segments once processed.",
    guide: "replay-hours",
  },
  {
    block: "Wheel hours",
    whatItIs: "Two 1-hour file-based shows of selected stories.",
    howItIsBuilt:
      "Afternoon / Evening Wheel Template mini playlists, filled from the media library; placeholders used for content still arriving.",
    guide: "wheel-hours",
  },
  {
    block: "National simulcast / fallback",
    whatItIs:
      "CBS News 24/7 (cbsn_24x7) carried when there is no local programming, and used as the 'take national' fallback during incidents.",
    howItIsBuilt:
      "Set as the default live source on file shows so a live segment can be inserted at any time.",
    guide: "prepare-file-shows-for-live-cut-in",
  },
  {
    block: "Live cut-ins (unplanned)",
    whatItIs: "Breaking news inserted into file playback.",
    howItIsBuilt:
      "Preferred: 'Add Live Segment' (more control on rejoin). Fast path: 'Take Live' button. Both documented in the User Manual.",
    guide: "live-cut-ins",
  },
];

/**
 * Start time and duration modes. Every show in the schedule has one of
 * each; together with the time values entered, they decide when a show
 * starts and ends. Table from the "Start Time and Duration Modes - Mode
 * Definitions" sheet.
 */
export const timingModes = {
  background:
    "Each show in the Cloudport schedule has a start time mode and duration mode. These modes, along with the time values entered when the mode is set, determine when a show will start and end.",
  docsIntro:
    "The following pages in the Cloudport reference documentation contain full details on each mode:",
  docs: [
    {
      label: "Start Time Modes",
      href: "https://helpdocs.amagi.tv/docs/cloudport415-start-time-fixed-and-flexible?highlight=true%20start",
    },
    {
      label: "Duration Modes",
      href: "https://helpdocs.amagi.tv/docs/cloudport415-duration-fixed-flexible",
    },
  ],
  modes: [
    {
      mode: "Flexible start",
      behavior: "Waits for the previous show to end before starting.",
      typicalUse:
        "Default for most shows, including the first afternoon wheel (≈ 13:00).",
    },
    {
      mode: "Fixed start",
      behavior:
        "If the current show is live, the next show starts in the background and joins in progress when the live show ends. If the current show is a file show, the next show cuts in at its scheduled time.",
      typicalUse: "Top-of-hour replays and simulcasts that must hit the clock.",
    },
    {
      mode: "True start",
      behavior:
        "Cuts in at the scheduled time and ends the current show immediately.",
      typicalUse:
        "Hard junctions only. Note: 'Fixed True Start' misbehaviour is an open P0 (Section 10).",
    },
    {
      mode: "Locked vs. unlocked duration",
      behavior:
        "Changing a show's duration or start time will re-flow dependent items; check neighbours after any edit.",
      typicalUse: "Always review the show before and after an edit.",
    },
  ] satisfies TimingMode[],
};
