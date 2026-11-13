import type { BuildingBlock, Role } from "./types";

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
    who: "Station teams, e.g. Eric, Desmond (BAL); Ali, Holly, Soad, Monica (SAC); Alyssa, Elizabeth (MIA)",
    responsibility:
      "Build and run the daily schedule; start/end-of-shift checks; first eyes on recording status; report issues in the station channel using the template.",
  },
  {
    role: "Programming / News Ops",
    who: "Andrea Oess, Marie Simmons",
    responsibility:
      "Own templates, naming, workflow best practices and the DLP-facing documentation; approve any message sent to station channels; UAT sign-off on releases.",
  },
  {
    role: "Video Operations (L1)",
    who: "Dave Swietkowski's 24/7 team (Toby/Tobias, Marie, Alex and overnight operators)",
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
    who: "Evan Thomas (primary), Imran / Ebin (infrastructure), Francisco 'Paco' Lancaster (escalation); 24/7 support desk (Freshdesk)",
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
