import type { GlossaryTerm } from "./types";

/**
 * Core Cloudport vocabulary only, as agreed with the programming manager.
 * Definitions use the wording of the user manual and the Cloudport UI.
 */
export const glossary: GlossaryTerm[] = [
  {
    term: "Cloudport",
    definition:
      "Amagi's cloud playout platform used to run the station streams. Accessed in Google Chrome at cbsnews-east.cloudport.amagi.tv.",
  },
  {
    term: "DLP",
    aka: ["Digital Line Producer"],
    definition:
      "The person responsible for what is on a station's stream during a shift: watching the schedule, running live cut-ins and escalating problems.",
  },
  {
    term: "Event",
    definition:
      "One item in the Playout schedule (a show, a segment, a live segment). Live segments are added by right-clicking the event before where you want the cut-in.",
  },
  {
    term: "File playback programming",
    aka: ["File show"],
    definition:
      "Scheduled programming played from files rather than a live source. Live cut-ins interrupt file playback.",
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
    term: "Live template",
    definition:
      "A preset selected during Immediate Live that defines the live source. Confirm the correct source is present before proceeding.",
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
    definition:
      "The newsroom's running order for a newscast. The stream's schedule is built from, and kept in sync with, the station rundown.",
  },
];
