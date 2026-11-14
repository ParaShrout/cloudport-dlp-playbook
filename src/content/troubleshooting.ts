/**
 * Quick troubleshooting guide.
 *
 * Source: "Amagi News Quick Troubleshooting Guide" (PDF). Where the
 * step-by-step guides cover everything the Cloudport UI can do, this is the
 * short list of situations a DLP actually hits on a normal day, written
 * symptom-first so it can be scanned under pressure. Wording follows the
 * source; each entry links to the full guide where one exists.
 */

export type TroubleshootingOption = {
  title: string;
  recommended?: boolean;
  /** Who normally uses this option, or when it applies. */
  note?: string;
  steps: string[];
  tips?: string[];
};

export type TroubleshootingEntry = {
  id: string;
  /** Symptom or task, as a DLP would say it. */
  title: string;
  /** One line: when this entry applies. */
  when: string;
  group: TroubleshootingGroup;
  /** Background paragraphs shown before the options. */
  overview?: string[];
  /** Plain numbered procedure when there is only one way to do it. */
  steps?: string[];
  options?: TroubleshootingOption[];
  tips?: string[];
  related?: { label: string; href: string }[];
};

export type TroubleshootingGroup =
  | "Schedule and playlists"
  | "Rescue and holes"
  | "Live"
  | "Replays and wheels"
  | "Stuck in a show";

export const TROUBLESHOOTING_GROUPS: TroubleshootingGroup[] = [
  "Live",
  "Stuck in a show",
  "Rescue and holes",
  "Schedule and playlists",
  "Replays and wheels",
];

export const troubleshooting: TroubleshootingEntry[] = [
  // ---------------------------------------------------------------- Live
  {
    id: "break-in-live",
    title: "I need to break in live",
    when: "Breaking news has to go to air, inside or outside a live show.",
    group: "Live",
    overview: [
      "Simulcast and Stream Only hours should have ALL ingest sources available, including 24/7. When the ingest source is available, it can be selected directly from the left-hand side of the Playout page, underneath the Playback section. That is the fastest way to switch the current live show from Local to National or between ingest 1 and ingest 2.",
      "When you need to take live breaking news outside of a live show (a Replay or Wheel hour), use one of the three options below.",
    ],
    options: [
      {
        title: "Add a Live Segment to the show",
        recommended: true,
        note: "Preferred for planned or scheduled coverage. DLPs / Amagi users.",
        steps: [
          "Confirm the desired ingest source (e.g. National 24/7): right-click the show and open the Properties window, go to Ingest Points, confirm the source is available (add it if not), set it as the Default ingest source and save.",
          "Right-click the show container and select the option to add a Live Segment Line. It is added to the bottom of the show.",
          "Adjust the duration if necessary.",
          "Drag the Live Segment Line to the desired location within the rundown.",
        ],
        tips: [
          "If you know the Live Segment Line should follow a specific story, right-click that story and add the Live Segment Line directly. It is placed immediately below the selected story instead of at the bottom of the show.",
        ],
      },
      {
        title: "Use the Immediate Take Live button",
        note: "Preferred for emergencies that need an immediate transition to live, such as when we are in Rescue. VidOps team.",
        steps: [
          "From the Playout page, click the Take Live button in the upper-right corner.",
          "Select the desired Ingest Point (e.g. National 24/7) and adjust the Start Time.",
          "Click Proceed.",
          "At the conclusion of the live event, click the Live Off button in the upper-right corner.",
        ],
      },
      {
        title: "Use a pre-made live template (Mini Playlist)",
        note: "Use when filling an existing programming hole and the other methods do not apply.",
        steps: [
          "Open the Media Library and navigate to the Mini Playlists folder.",
          "Locate the desired Mini Playlist (e.g. CBS 24/7) and drag it into the open programming hole.",
          "Adjust the Start Time and select the desired Ingest Source.",
        ],
      },
    ],
    related: [
      {
        label: "Adding Live Segments (full guide)",
        href: "/guides/live-cut-in-add-live-segment",
      },
      {
        label: "Immediate Live (full guide)",
        href: "/guides/live-cut-in-immediate-live",
      },
    ],
  },
  {
    id: "ingest-sources",
    title: "The live source I need isn't there, or I need to switch sources",
    when: "During a live or VOD show the ingest point you want is missing from the left-hand list, or you need to move from one source to another.",
    group: "Live",
    options: [
      {
        title: "Switch ingest source during a live / VOD show",
        recommended: true,
        note: "You can switch between sources during live events without adding or changing live segment lines.",
        steps: [
          "From the Playout page, select the input source you want to switch to. Available ingest sources are displayed on the far-left side of the page, underneath the Playback and Ingest Source preview screens.",
          "If the desired ingest source is not displayed, add it (next option) and set it as the Default source.",
        ],
      },
      {
        title: "Add an ingest source during a live / VOD show",
        steps: [
          "From the Playout page, open the Properties window for the live event: right-click the event line and select the appropriate option, or click directly on the live event (the selected show name is highlighted in blue).",
          "At the top of the Properties window, select Ingest Points.",
          "From the Select Ingest Points dropdown, select the input source(s) you want to add.",
          "Designate one of the selected sources as the Default ingest source.",
          "Click Save.",
        ],
      },
    ],
  },
  {
    id: "delay-next-show",
    title: "Breaking news is running long and the next show is about to start",
    when: "A live event in progress needs to continue past the next show's scheduled start.",
    group: "Live",
    overview: [
      "The steps depend on whether the next show has a True Start or a Fixed Start.",
    ],
    options: [
      {
        title: "Next show has a True Start: change it before its start time",
        recommended: true,
        note: "A True Start overrides whatever is playing when its time is reached, including an active live segment. If the next show has a 6:00 PM True Start, it will start at 6:00 PM even if breaking news is still active.",
        steps: [
          "Locate the next show.",
          "Right-click the show container.",
          "Change the True Start to a Flexible Start.",
        ],
      },
      {
        title: "Next show has a Fixed Start: change it to Flexible Start",
        recommended: true,
        note: "Primary option. The whole show moves forward based on when the live segment ends, so viewers see the beginning of the scheduled show immediately after breaking news.",
        steps: [
          "Locate the next show and right-click the show container.",
          "Change the Fixed Start to a Flexible Start.",
          "Example: the next show is scheduled for 6:00 PM, breaking news runs to 6:07 PM. With a Flexible Start the next show begins at 6:07 PM and all of its content moves forward from there.",
        ],
      },
      {
        title: "Next show has a Fixed Start: leave it",
        note: "Secondary option. An active live segment takes priority over a Fixed Start and keeps playing until the control room triggers or you hit Take Next. But when the live segment ends, the system continues with whatever is scheduled at that point in the playlist, not the beginning of the show.",
        steps: [
          "Leave the Fixed Start unchanged and continue the live segment.",
          "When the live segment ends, expect to join the next show in progress. Example: a 6:00 PM Fixed Start, breaking news to 6:21 PM; the system continues with whatever is scheduled for 6:21 PM, which could drop viewers into the middle of a segment.",
        ],
      },
    ],
    tips: [
      "Flexible Start gives you more control over what viewers see immediately after live breaking news coverage. When in doubt, Flexible Start is generally the safer option.",
    ],
    related: [
      {
        label: "Start time and duration modes (dashboard)",
        href: "/#timing-modes",
      },
    ],
  },

  // ------------------------------------------------------- Stuck in a show
  {
    id: "stuck-simulcast",
    title: "We're stuck in a simulcast hour and it won't move on",
    when: "The system has stayed on a live segment line past the end of a show instead of advancing to the next one.",
    group: "Stuck in a show",
    overview: [
      "If the system gets stuck during a simulcast hour, it usually means it did not receive one of the three signals it needs to move to the next scheduled live show: (1) Show Duration Lock, a set duration or end time on the live simulcast hour telling it to end; (2) True Start, a true clock start on the next hour that overrides whatever is playing when the time is reached, including live segment lines on hold or extended; (3) SCTE Trigger, sent from the control room by a director, or carried in the break assets when the show ends on a break.",
      "A live segment line typically gets stuck when the SCTE trigger is missing at the end of a show, usually when the live segment line is the last line of the show.",
    ],
    options: [
      {
        title: "Take Next",
        recommended: true,
        steps: [
          "Go to the Playout page.",
          "Locate the Control Panel at the bottom of the stream.",
          "Click Take Next. The system immediately advances to the next queued item (highlighted in yellow).",
        ],
      },
      {
        title: "Unhold",
        note: "Live segment lines are in Hold mode by default. The system stays on the line until the scheduled duration expires, a SCTE trigger is received, or the duration / True Start lock condition is met. Unhold removes the hold.",
        steps: [
          "Check the live segment line's duration first (see tip).",
          "In the Control Panel, click Unhold. If the line's scheduled duration has already expired, the system moves to the next scheduled item.",
        ],
        tips: [
          "Be careful with Unhold if the live segment line has an incorrect duration. A line may still have the default 00:30:00:00 when the actual segment is much shorter; if you Unhold before that duration expires, the system may stay on the line instead of advancing.",
        ],
      },
    ],
    tips: [
      "A Fixed Start will NOT advance you. If a live segment line is on hold, the system honours the hold rather than the Fixed Start. The Fixed Start is honoured for VOD content and commercial breaks.",
      "Avoid it next time: give every live simulcast hour a Duration Lock (duration or end time), or give the next hour a True Start, so the system can advance without a SCTE trigger.",
    ],
    related: [
      {
        label: "Simulcast Hours (full guide)",
        href: "/guides/simulcast-hours",
      },
    ],
  },

  // ------------------------------------------------------ Rescue and holes
  {
    id: "rescue-holes",
    title: "We're in Rescue (or about to be) and there's a hole to fill",
    when: "The playlist has entered Rescue or is at risk of it because of a gap in programming.",
    group: "Rescue and holes",
    overview: [
      "When a playlist enters Rescue or is at risk of entering Rescue, the Schedule page is the preferred way to fill the hole. The Playout/Layout page can also be used, but it needs extra steps and is the secondary option.",
    ],
    options: [
      {
        title: "Schedule page",
        recommended: true,
        steps: [
          "On the Schedule page, add directly into the existing hole: individual VOD content, a Template (Mini Playlist), or a live line/event. Example: drop the CBS News 24/7 (National) template into the hole.",
          "Set the appropriate Start Time.",
          "Publish the schedule.",
        ],
      },
      {
        title: "Playout / Layout page",
        note: "If Rescue is currently playing you cannot drop content straight into the hole here. You must first create a Show with a future start time, then add content to it.",
        steps: [
          "Click the Create Show button on the empty show line. The Show Properties window opens.",
          "Enter Show Name, Start Time and (optionally) Fixed Duration, then click Create.",
          "Drag and drop the desired content into the empty show container: Templates, VOD content or Live Segment Lines.",
        ],
        tips: [
          "If you drag a pre-made Template (Mini Playlist) into the new show, Cloudport asks whether to Replace the show with the template or Append the template's content to the show. Choose Replace: it is simpler and more efficient.",
        ],
      },
    ],
    related: [
      {
        label: "Create a New Show on the Fly (full guide)",
        href: "/guides/create-new-show-on-the-fly",
      },
    ],
  },

  // ------------------------------------------------ Schedule and playlists
  {
    id: "publish-vs-save",
    title: "I made a change but it didn't go to air",
    when: "You edited the Schedule page and clicked Save instead of Publish.",
    group: "Schedule and playlists",
    overview: [
      "Publish is the correct way to save programming changes you want to go to air: your changes are added to the version of the playlist that is intended to be on air. Save only creates a new version of the playlist; it does not publish anything to air. Avoid the Save button.",
    ],
    options: [
      {
        title: "Recover content from a saved playlist",
        note: "Your work is not lost. But if another playlist version is on air, Cloudport may not let you publish the saved version directly.",
        steps: [
          "Open the saved playlist version.",
          "Highlight the content or changes you created and copy them.",
          "Go to the current on-air playlist.",
          "Paste the copied content into the appropriate location.",
          "Review your changes.",
          "Click Publish to send the updated playlist to air.",
        ],
      },
    ],
    tips: ["Publish = changes go to air. Save = creates a new version only."],
  },
  {
    id: "clone-playlist",
    title: "The playlist won't publish, or I need to build a day fast",
    when: "A publishing error you cannot clear, or an empty day that should follow an existing daily structure.",
    group: "Schedule and playlists",
    overview: [
      "Playlist cloning duplicates an entire day playlist onto another day, so you can replicate an existing playlist without rebuilding each item. Once cloned, make any adjustments to the new version before publishing.",
      "Cloning is also an effective fix when an existing playlist has an error that prevents it from publishing: the clone is a fresh version with the same content and structure, so you can remove the problem item and publish the copy.",
    ],
    steps: [
      "From the playlist, click the Clone button in the upper-right corner of the Schedule.",
      "Clone the current playlist to today's date or to a future rundown, depending on the situation.",
      "In the clone, locate the asset or item causing the publishing error and remove it. Make any other adjustments needed, then Publish.",
      "If you cloned to a future date to troubleshoot: open the corrected playlist, clone it back to today's date, review that the content and structure are intact, and click Publish.",
    ],
    related: [
      {
        label: "Simulcast Hours (full guide)",
        href: "/guides/simulcast-hours",
      },
      { label: "Wheel Hours (full guide)", href: "/guides/wheel-hours" },
    ],
  },

  // --------------------------------------------------- Replays and wheels
  {
    id: "placeholders",
    title: "A replay or wheel placeholder has the wrong date or content",
    when: "A placeholder in a replay or wheel hour shows incorrect information, or the wrong recording.",
    group: "Replays and wheels",
    overview: [
      "Placeholders identify replay content before the recording is available or the media is uploaded. The right fix depends on whether the segment has already been recorded.",
    ],
    options: [
      {
        title:
          "Not yet recorded: change the date or information on the placeholder",
        steps: [
          "Select the incorrect placeholder.",
          "Open the placeholder's editable information.",
          "Update the incorrect date or other details.",
          "Save the changes.",
        ],
      },
      {
        title: "Already recorded: replace the placeholder with the recording",
        note: "Use when the correct recording is available in the Media Library.",
        steps: [
          "Open the Media Library.",
          "Locate the correct recorded asset.",
          "Drag and drop the correct recording directly over the incorrect placeholder.",
          "Confirm the correct recording has replaced the original placeholder.",
        ],
      },
    ],
    related: [
      { label: "Replay Hours (full guide)", href: "/guides/replay-hours" },
      { label: "Wheel Hours (full guide)", href: "/guides/wheel-hours" },
    ],
  },
];

export function getTroubleshootingEntry(id: string) {
  return troubleshooting.find((t) => t.id === id);
}
