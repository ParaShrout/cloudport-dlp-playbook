/**
 * Practice scenarios from "Cloudport News Rundown: DLP UAT Scenarios
 * (Station template)". The programming manager has DLPs work through these
 * before launch. Each scenario is a real workflow, not a single button:
 * work through it the way you would on a normal shift, then tick it off
 * once you can do it without help.
 *
 * Part 1 is for Digital Line Producers. Part 2 is the shorter engineering
 * checklist for stream-level and configuration checks that do not need a
 * DLP's hands.
 */

export type UatScenario = {
  id: string;
  /** "Scenario 1" / "E1" */
  number: string;
  title: string;
  /** Framing sentence shown above the bullets. */
  intro?: string;
  items: string[];
  /** Where in the playbook the skill is taught. */
  related?: { label: string; href: string }[];
  /** Shown when the scenario cannot be run yet (e.g. feature not released). */
  skipNote?: string;
};

export type UatGroup = {
  id: string;
  title: string;
  note?: string;
  scenarios: UatScenario[];
};

export const UAT_STORAGE_KEY = "dlp-playbook:uat-scenarios";

export const uatHowTo = {
  intro:
    "This checklist is built around the things you will do in the tool every day: building hours, going live, coming back to the schedule, going to national, and recovering when something goes wrong. Each scenario is a real workflow, not a single button. Work through it the way you would on a normal shift, and tick it off once you can do it without help.",
  notes:
    "Notes matter most when something did not go as expected. Say what you did, what happened, what you expected instead, and the rough date and time or event ID so the vendor can find it in the logs. Also note anything that worked but felt clunky, confusing, or slower than it should be; that feedback shapes training and future fixes. Pass your notes to the programming manager.",
};

export const uatPart1: UatGroup[] = [
  {
    id: "building-hours",
    title: "Building hours",
    scenarios: [
      {
        id: "s1",
        number: "Scenario 1",
        title: "Build a simulcast hour",
        intro:
          "Build a simulcast hour as a LIVE playlist, two ways: once from scratch and once from a template. For each build:",
        items: [
          "Create the live event with the correct start time, end time, and ingest point",
          "Build the breaks and adjust break times at the looper level (not the container level)",
          "Include at least one short break (1 to 2 minutes) and one longer break (4 to 5 minutes)",
          "Turn Live Recording on for one build and off for the other, and note that the setting sticks",
          "Publish and confirm the hour appears correctly on the playout page",
        ],
        related: [
          { label: "Simulcast Hours", href: "/guides/simulcast-hours" },
          {
            label: "Enable Live Recording",
            href: "/guides/enable-live-recording",
          },
        ],
      },
      {
        id: "s2",
        number: "Scenario 2",
        title: "Build a replay hour",
        intro:
          "Build a replay hour as a SHOW playlist, two ways: once from scratch and once from a template. For each build:",
        items: [
          "Find the recorded segments from an earlier live event in the Media Library and note how long after the event they were available",
          "Schedule the recorded segments with breaks between them",
          "Play back at least one recorded segment to confirm it looks and sounds right",
          "Publish and confirm the hour appears correctly on the playout page",
        ],
        related: [{ label: "Replay Hours", href: "/guides/replay-hours" }],
      },
      {
        id: "s3",
        number: "Scenario 3",
        title: "Build a whole wheel hour",
        intro: "Build a complete wheel hour from the ground up:",
        items: [
          "Create placeholder media lines for stories that have not arrived yet",
          "Drag and drop stories into place and add a short title to each",
          "Copy and paste stories to repeat them farther down in the hour",
          "Let an asset arrive for one of the placeholders and confirm the placeholder fills in",
          "Make a few edits directly from the playout page (delete a line, replace an asset, add a note line, edit metadata) and confirm each change auto-publishes without a separate publish step",
        ],
        related: [{ label: "Wheel Hours", href: "/guides/wheel-hours" }],
      },
      {
        id: "s4",
        number: "Scenario 4",
        title: "Clone a full day",
        items: [
          "Clone an entire day's playlist to a new date",
          "Confirm every hour, break, live line, and graphic came across, and that times and locks are preserved",
          "Note anything that had to be fixed by hand after cloning",
        ],
        related: [
          {
            label: "Quick troubleshooting: clone a playlist",
            href: "/troubleshooting#clone-playlist",
          },
        ],
      },
    ],
  },
  {
    id: "graphics-clipping",
    title: "Graphics and clipping",
    scenarios: [
      {
        id: "s5",
        number: "Scenario 5",
        title: "Insert graphics at the segment level and the program level",
        intro:
          "Schedule graphics two ways: on an individual segment, and across a whole program. Then:",
        items: [
          "Confirm each graphic appears on the player when expected and comes off when expected",
          "Use Bug On and Bug Off on a segment and confirm it follows the segment duration",
          "Use the Disable Graphics and Enable Graphics options and confirm each works",
          "Add a graphic and remove a graphic while a live event is on air",
        ],
      },
      {
        id: "s6",
        number: "Scenario 6",
        title: "Clip segments",
        intro: "Practice all three kinds of clipping on recorded content:",
        items: [
          "Trim the start of a segment (SOM)",
          "Trim the end of a segment (EOM)",
          "Soft segment by clipping an entire story out of the middle of a block",
          "Play back each clipped result and confirm the in and out points are where you set them",
        ],
      },
    ],
  },
  {
    id: "timing-locks",
    title: "Timing and locks",
    scenarios: [
      {
        id: "s7",
        number: "Scenario 7",
        title: "True start vs. fixed start, and other locks",
        intro:
          "Build a short run of shows and experiment with timing controls until you are comfortable predicting what will happen:",
        items: [
          "Set one show to true (flexible) start and one to fixed start, then let an earlier show run long and watch how each responds",
          "Lock the start time and duration on a show, then schedule fixed and flexible shows after it and confirm the schedule behaves the way you expect",
          "Note in plain language how you would explain the difference to a new DLP",
        ],
        related: [
          { label: "Start time and duration modes", href: "/#timing-modes" },
          {
            label: "Quick troubleshooting: delay the next show",
            href: "/troubleshooting#delay-next-show",
          },
        ],
      },
    ],
  },
  {
    id: "going-live",
    title: "Going live",
    scenarios: [
      {
        id: "s8",
        number: "Scenario 8",
        title: "Bust in live by adding a live line (preferred method)",
        intro:
          "While a VOD show is playing, bust in live by adding a live line:",
        items: [
          "Right-click in the show, choose Add Live Segment, set a duration, and pick the ingest from the Preview or Play icon",
          "Publish and watch the playout page until the live line starts",
          "Use Hold to keep the live line going past its duration, then Unhold",
          "Use Disable on the live line, then Enable it again, and confirm each responds",
        ],
        related: [
          {
            label: "Adding Live Segments",
            href: "/guides/live-cut-in-add-live-segment",
          },
        ],
      },
      {
        id: "s9",
        number: "Scenario 9",
        title:
          "Bust in live with the Immediate Live button (not the preferred method)",
        items: [
          "Use the Immediate Live / Take Live button to go live right now",
          "Note how long it takes to join (about 10 to 15 seconds is expected) and what happens to the schedule around it",
          "Try it once with no playlist running and once in the middle of a scheduled show",
        ],
        related: [
          {
            label: "Immediate Live",
            href: "/guides/live-cut-in-immediate-live",
          },
        ],
      },
      {
        id: "s10",
        number: "Scenario 10",
        title: "Transition out of live and back to the schedule",
        intro:
          "Come out of live and return to the schedule using both methods, and confirm each is clean:",
        items: [
          "Let the live line reach its scheduled end and watch the schedule resume",
          "End live early using the control (Take Live Off / Turn Live Off) and confirm the rescue slate or next scheduled item covers the gap",
          "Extend a live event once by Auto Extend and once by a set number of minutes, and confirm the duration updates right away",
          "Use Take Next to jump from live into a break, then Take Next again to come back",
          "Note the switch time and whether the break assets and graphics behaved as expected on each transition",
        ],
        related: [
          {
            label: "Quick troubleshooting: stuck in a simulcast hour",
            href: "/troubleshooting#stuck-simulcast",
          },
        ],
      },
    ],
  },
  {
    id: "going-national",
    title: "Going to national",
    scenarios: [
      {
        id: "s11",
        number: "Scenario 11",
        title: "Go to national as an event",
        items: [
          "Switch to the national feed as a breaking-news or troubleshooting measure, on short notice",
          "Confirm the switch to the national input source is clean",
          "Confirm you can hold on national as long as needed",
          "Confirm you can come back to the local schedule cleanly",
        ],
        related: [
          {
            label: "Quick troubleshooting: switch ingest sources",
            href: "/troubleshooting#ingest-sources",
          },
        ],
      },
      {
        id: "s12",
        number: "Scenario 12",
        title: "Schedule national as a full hour",
        items: [
          "Schedule a full hour of national in advance, including the breaks",
          "Confirm it starts on time and breaks fire where you placed them",
          "Confirm the hour hands back to local programming at the end",
        ],
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    scenarios: [
      {
        id: "s13",
        number: "Scenario 13",
        title: "Recover from Stop Live",
        items: [
          "Stop a live event using Stop Live, then recover",
          "Confirm you can get back to a clean schedule",
          "Note what happened to the recording status",
          "Write down the steps that worked so they can go into the troubleshooting guide",
        ],
      },
      {
        id: "s14",
        number: "Scenario 14",
        title: "Clear errors in a rundown",
        items: [
          "Introduce a few common errors on purpose: a missing asset, a line that is too long for its slot, a placeholder that never filled",
          "Clear each one",
          "Confirm the error indicators are easy to find, the fix takes, and the rundown auto-publishes once it is clean",
        ],
        related: [
          {
            label: "Quick troubleshooting: placeholders",
            href: "/troubleshooting#placeholders",
          },
        ],
      },
    ],
  },
  {
    id: "mini-playlists",
    title: "Mini playlists",
    note: "Only once the mini playlist update is live at your station. Until then, skip this section.",
    scenarios: [
      {
        id: "s15",
        number: "Scenario 15",
        title: "Create a mini playlist as a template",
        items: [
          "Build a mini playlist you would reuse as a template and save it",
          "Confirm it shows up as available to schedule",
          "Add it to the daily playlist and confirm its settings (including fixed vs. flexible on each line) come across the way you set them",
        ],
        skipNote: "Requires the mini playlist update.",
      },
      {
        id: "s16",
        number: "Scenario 16",
        title: "Create a mini playlist for an evergreen show",
        items: [
          "Build a mini playlist for an evergreen show and schedule it",
          "Note the difference between the mini playlist's own title and how the title appears once it is in the daily playlist, and whether that is clear enough for the team",
        ],
        skipNote: "Requires the mini playlist update.",
      },
    ],
  },
];

export const uatPart2: UatGroup[] = [
  {
    id: "engineering",
    title: "Engineering checklist",
    note: "These checks sit underneath the DLP workflows and can be run by station engineering independently, on its own schedule. Each block covers one area.",
    scenarios: [
      {
        id: "e1",
        number: "E1",
        title: "Video stream",
        items: [
          "Input and output streams are smooth: no sync drift, glitches, black, mute, or freezes",
          "Input-to-output delay is about 7 to 8 seconds with default configuration",
          "Frame rate matches the channel input spec; aspect ratio is 16:9",
          "Video PID and specs are correct (1080p, 29.97); live input stream meets spec",
          "VOD MXF files play and meet spec (for example 1080i 29.97 and 720p 59.94)",
        ],
      },
      {
        id: "e2",
        number: "E2",
        title: "Audio",
        items: [
          "Audio language name is English",
          "All audio tracks play in both input and output streams (1x stereo on output)",
          "Audio PID and specs are correct; loudness is within spec",
        ],
      },
      {
        id: "e3",
        number: "E3",
        title: "Closed captions",
        items: [
          "Captions play on the output stream and stay in sync",
          "Caption format is EIA-708",
          "Captions play on the live input stream and from embedded captions in assets",
          "Media library caption presence detection works",
        ],
      },
      {
        id: "e4",
        number: "E4",
        title: "SCTE and animated graphics",
        items: [
          "Animated and snipe graphics fire a SCTE-35 with the payload configured in CloudPort, in live and VOD",
          "SCTE type is Splice Insert during file-based playout; SCTE fires as expected during live",
          "Pre-configured SCTE payloads in CloudPort match the SCTE Event IDs in the BXF",
          "SCTE Post Processor: start trigger has correct duration, end trigger has zero duration, UPID is correct, UPID metadata override works",
        ],
      },
      {
        id: "e5",
        number: "E5",
        title: "Transition timing",
        items: [
          "Record the switch time for: live to ad slate with SCTE, ad slate with SCTE to live, live to break asset without SCTE, break asset without SCTE to live",
          "Back-to-back live events and ad-to-ad transitions within a pod are clean",
          "Rescue slate plays when nothing is scheduled and when a live event ends early",
        ],
      },
      {
        id: "e6",
        number: "E6",
        title: "Event modes",
        items: [
          "Live playback and ad breaks behave correctly in Managed mode and in Unmanaged mode",
          "Break asset plays when a SCTE is triggered in the input stream",
          "Switching between Managed and Unmanaged during live playback takes effect cleanly",
        ],
      },
      {
        id: "e7",
        number: "E7",
        title: "Recording details",
        items: [
          "Recording status on the Vision page is correct after a live event ends",
          "Segmented recording profile works; segment durations match the scheduled event including breaks; segments split cleanly",
          "Stopping a recording mid-event works where enabled",
          "Segmented file names follow the configured format ($eventid, $segid padding, $time, $mode)",
        ],
      },
      {
        id: "e8",
        number: "E8",
        title: "Long-run and stability",
        items: [
          "10 live events in one day play without issues",
          "About 4 hours of back-to-back live plays without issues",
          "Player preview in CloudPort shows a scheduled live event; Loop option behaves as expected",
        ],
      },
      {
        id: "e9",
        number: "E9",
        title: "Access and setup",
        items: [
          "CloudPort UI is reachable only through RDP, not the open internet",
          "All use cases work when logged in over RDP",
          "PLEC sync: channel operations work in standalone mode (can end independently) and in synced mode",
        ],
      },
      {
        id: "e10",
        number: "E10",
        title: "Media library housekeeping",
        items: [
          "Renaming assets works for video, audio, graphics, and subtitles, including assets over 5 GB and assets in a failed state",
          "Renaming a scheduled asset updates the schedule; renaming is blocked while the asset is on air",
          "Asset details popup opens from the asset ID, shows the thumbnail with full-screen preview, and shows all tabs (Details, Segments, Availability, Quality Checks, Metadata, Technical Details)",
        ],
      },
    ],
  },
];

export function countScenarios(groups: UatGroup[]): number {
  return groups.reduce((n, g) => n + g.scenarios.length, 0);
}
