/**
 * Quick troubleshooting guide.
 *
 * Mirrors the programming team's "Amagi News Quick Troubleshooting Guide"
 * (PDF) section for section, in the same order and with the same headings,
 * so a DLP can move between the PDF and this page without translating.
 * Wording follows the source. Screenshots are the ones embedded in the PDF
 * and live in public/screenshots/troubleshooting/. Each section adds a short
 * "when" line and links to the full step-by-step guide where one exists.
 */

export type TroubleshootingImage = {
  /** File name under public/screenshots/troubleshooting/ */
  file: string;
  alt: string;
  caption?: string;
};

/**
 * A sub-procedure within a section. Where the source labels these
 * "Option 1 / Option 2" the `option` number is set; otherwise they render
 * as plain sub-headings.
 */
export type TroubleshootingOption = {
  title: string;
  option?: number;
  recommended?: boolean;
  /** Who normally uses this option, or when it applies. */
  note?: string;
  /** Short paragraphs shown before the steps. */
  text?: string[];
  steps?: string[];
  tips?: string[];
  images?: TroubleshootingImage[];
};

export type TroubleshootingEntry = {
  id: string;
  /** Section heading, exactly as in the source guide. */
  title: string;
  /** One line: when this section applies, in a DLP's words. */
  when: string;
  /** Background paragraphs shown before the procedures. */
  overview?: string[];
  /** Bulleted list shown after the overview. */
  bullets?: string[];
  /** Plain numbered procedure when there is only one way to do it. */
  steps?: string[];
  images?: TroubleshootingImage[];
  options?: TroubleshootingOption[];
  tips?: string[];
  /** Closing reminder, shown last. */
  reminder?: string[];
  related?: { label: string; href: string }[];
};

export const troubleshooting: TroubleshootingEntry[] = [
  {
    id: "clone-playlist",
    title: "Playlist Cleanup: Cloning Playlists",
    when: "You need to build a day fast from an existing one, or a playlist has an error that stops it publishing.",
    overview: [
      "Playlist Cloning allows users to duplicate an entire day playlist and apply it to another day. This provides a quick and efficient way to replicate an existing playlist without manually rebuilding each item.",
      "Once a playlist has been cloned, users can make any necessary adjustments to the new version before publishing.",
    ],
    options: [
      {
        title: "When to Clone a Playlist",
        steps: [
          "Filling an Empty Playlist. Cloning is the fastest way to populate a new playlist when you want to follow an existing daily structure. Instead of manually adding each item, clone a playlist that already contains the desired day template.",
          "Clearing Publishing Errors. Cloning is also an effective troubleshooting method when an existing playlist contains an error that prevents it from being published. Creating a clone gives you a fresh version of the playlist while retaining its intended content and structure, so you can fix the problem items and publish a new copy.",
        ],
      },
      {
        title: "How to Clone a Playlist",
        steps: [
          "From the playlist, click the Clone button located in the upper-right corner of the Schedule.",
          "Clone the current playlist to today's date or a future rundown, depending on the situation. Once cloned: locate the asset or item causing the publishing error, remove it, make any additional adjustments needed, and Publish the updated playlist.",
          "If you cloned the playlist to a future date to troubleshoot the error: open the corrected playlist, clone the updated playlist back to today's date, review the playlist to confirm that the desired content and structure are intact, and click Publish.",
        ],
        images: [
          {
            file: "clone-01-clone-button.png",
            alt: "Schedule header with the Clone button in the upper-right corner",
            caption: "Step 1: the Clone button in the Schedule header.",
          },
          {
            file: "clone-02-pick-date.png",
            alt: "Calendar prompt asking which date to clone the playlist to",
            caption: "Step 2: pick the date to clone to.",
          },
        ],
      },
    ],
    related: [
      {
        label: "Simulcast Hours (full guide)",
        href: "/guides/simulcast-hours",
      },
      { label: "Wheel Hours (full guide)", href: "/guides/wheel-hours" },
    ],
  },
  {
    id: "rescue-holes",
    title: "Best Practices for Filling Rescue Holes: Schedule vs Playout",
    when: "The playlist has entered Rescue, or is at risk of it, because of a hole in programming.",
    tips: [
      "When a playlist enters Rescue or is at risk of entering Rescue, the Schedule page is the preferred method for filling the hole. The Playout/Layout page can also be used, but it requires additional steps and is better suited as a secondary option.",
    ],
    options: [
      {
        title: "Schedule Page",
        option: 1,
        recommended: true,
        text: [
          "The Schedule page allows you to add the following directly into an existing hole: individual VOD content, Templates (Mini Playlists), and live lines/events.",
          "Once the content has been added, simply set the appropriate Start Time and Publish the schedule. Example: drop the CBS News 24/7 (National) Template into the hole and adjust the start time.",
        ],
        images: [
          {
            file: "rescue-schedule-start-time.png",
            alt: "Set Start Time dialog on the Schedule page",
            caption:
              "Set the Start Time on the content you dropped into the hole, then Publish.",
          },
        ],
      },
      {
        title: "Playout/Layout Page",
        option: 2,
        note: "If Rescue is currently playing from the Playout/Layout page there is an important limitation: you cannot drop content straight into the hole. You must first create a Show, assign it a future start time, and then add the desired content to that Show.",
        steps: [
          "Click the Create Show button on the empty Show line. This opens the Show Properties window.",
          "In the Properties window, enter Show Name, Start Time and Fixed Duration (optional), then click Create.",
          "Once the Show has been created, drag and drop the desired content into the empty Show container. You can add Templates, VOD content or Live Segment Lines.",
        ],
        tips: [
          "Using a pre-made Template: if you drag a Template (Mini Playlist) into the newly created Show, the system prompts you with two options, Replace the Show with the Template or Append the Template's content to the Show. Recommended: select option 1, Replace the Show with the Template. It is the simpler and more efficient option.",
        ],
        images: [
          {
            file: "rescue-playout-create-show.png",
            alt: "Create show properties window on the Playout page",
            caption:
              "Steps 1 and 2: Create Show, then name it and give it a start time.",
          },
          {
            file: "rescue-playout-template-prompt.png",
            alt: "Replace or Append prompt shown when dragging a template into a show",
            caption: "Dragging a Template into the new Show: choose Replace.",
          },
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
  {
    id: "ingest-sources",
    title: "How to Add or Change Ingest Sources",
    when: "During a live or VOD show the ingest point you want is missing, or you need to move from one source to another.",
    options: [
      {
        title: "Adding Ingest Source During Live / VOD Show",
        steps: [
          "From the Playout page, open the Properties window for the live event by either right-clicking the event line and selecting the appropriate option, or clicking directly on the live event. The selected Show Name is highlighted in blue.",
          "At the top of the Properties window, select Ingest Points.",
          "From the Select Ingest Points dropdown: select the input source(s) you want to add, designate one of the selected sources as the Default ingest source, and click Save.",
        ],
        images: [
          {
            file: "ingest-add-01-ingest-points.png",
            alt: "Edit live show window with the Ingest Points tab selected",
            caption:
              "Step 2: Ingest Points at the top of the Properties window.",
          },
          {
            file: "ingest-add-02-select-sources.png",
            alt: "Select ingest points dropdown with several sources and a Default marker",
            caption: "Step 3: select the sources, mark one as Default, Save.",
          },
        ],
      },
      {
        title: "Switching Ingest Source During Live / VOD Show",
        note: "Users can switch between sources during live events without having to add or change live segment lines.",
        steps: [
          "From the Playout page, select the input source you want to switch to. Available ingest sources are displayed on the far-left side of the page, underneath the Playback and Ingest Source preview screens.",
          "If the desired ingest source is not displayed: open the Properties window for the live event, navigate to Ingest Points, add the desired ingest source, set it as the Default source, and save the changes.",
        ],
        images: [
          {
            file: "ingest-switch-01-left-panel.png",
            alt: "Playout page with the available ingest sources listed on the left",
            caption:
              "Step 1: the ingest sources on the far-left of the Playout page.",
          },
          {
            file: "ingest-switch-02-add-source.png",
            alt: "Edit live show window used to add a missing ingest source",
            caption:
              "Step 2: add the missing source under Ingest Points and set it as Default.",
          },
        ],
      },
    ],
  },
  {
    id: "break-in-live",
    title: "Best Practices to Break in Live",
    when: "Breaking news has to go to air, inside or outside a live show.",
    options: [
      {
        title: "Simulcast & Stream Only Hours",
        text: [
          "All Simulcast and Stream Only hours should have ALL ingest sources available, including 24/7.",
          "When the ingest source is available, it can be selected directly from the left-hand side of the Playout page, underneath the Playback section. That is the fastest way to switch the current live show from Local to National or to switch between ingest 1 and ingest 2.",
        ],
        images: [
          {
            file: "live-simulcast-select-source.png",
            alt: "Select Ingest Point panel on the left of the Playout page",
            caption:
              "Select the source directly from the left-hand side of the Playout page.",
          },
        ],
      },
      {
        title: "Replay or Wheel Hours",
        text: [
          "When you need to take live breaking news outside of a Live Show, use one of the following options:",
        ],
        steps: [
          "Add Live Segment Line to a Replay or Wheel Hour: preferred method for planned or scheduled coverage. (DLPs / Amagi users)",
          "Use the Immediate Live Button: preferred for emergency situations requiring an immediate transition to live. (VidOps team)",
          "Use a Pre-existing Live Template (Mini Playlist): use when filling an existing programming hole.",
        ],
      },
      {
        title: "Add Live Segment to Show",
        option: 1,
        recommended: true,
        steps: [
          "Confirm the desired ingest source (e.g. National 24/7): right-click the Show and open the Properties window, navigate to the Ingest Points section, confirm the desired source is available (add it if it is not), set it as the Default ingest source, and save.",
          "Add a Live Segment Line: right-click the show container and select the option to add a Live Segment Line. It is added to the bottom of the Show. Adjust the duration if necessary, then drag the Live Segment Line to the desired location within the rundown.",
        ],
        tips: [
          "If you know the Live Segment Line should follow a specific story, right-click that story and add the Live Segment Line directly. The line is placed immediately below the selected story instead of being added to the bottom of the Show.",
        ],
        images: [
          {
            file: "live-opt1-01-ingest-points.png",
            alt: "Edit show details window on the Ingest Points tab",
            caption: "Step 1: confirm the ingest source under Ingest Points.",
          },
          {
            file: "live-opt1-02-live-segment-line.png",
            alt: "Show rundown with a new Live Segment Line added",
            caption:
              "Step 2: the Live Segment Line in the show; adjust its duration and position.",
          },
        ],
      },
      {
        title: "Use the Immediate Take Live Button",
        option: 2,
        note: "Use the Immediate Take Live function to go live immediately, such as during an emergency or other unplanned situations, for example when we are in Rescue.",
        steps: [
          "Take Live: from the Playout page, click the Take Live button in the upper-right corner.",
          "Select the desired Ingest Point (e.g. National 24/7) and adjust the Start Time.",
          "Click Proceed.",
          "At the conclusion of the live event, click the Live Off button in the upper-right corner.",
        ],
        images: [
          {
            file: "live-opt2-01-take-live.png",
            alt: "Playout header with the Take Live button in the upper-right corner",
            caption:
              "Step 1: Take Live in the upper-right corner of the Playout page.",
          },
          {
            file: "live-opt2-02-immediate-live.png",
            alt: "Immediate Live dialog with start time, live template and ingest point",
            caption:
              "Step 2: choose the Ingest Point and Start Time, then Proceed.",
          },
        ],
      },
      {
        title: "Use a Pre-Made Live Template (Mini Playlist)",
        option: 3,
        note: "A pre-made Mini Playlist provides a quick way to fill an existing programming hole when the other methods are not applicable.",
        steps: [
          "Open the Media Library and navigate to the Mini Playlists folder.",
          "Locate the desired Mini Playlist (e.g. CBS 24/7) and drag it into the open programming hole.",
          "Adjust the Start Time and select the desired Ingest Source.",
        ],
        images: [
          {
            file: "live-opt3-mini-playlists.png",
            alt: "Media Library open on the Mini Playlists folder",
            caption:
              "Steps 1 and 2: the Mini Playlists folder in the Media Library.",
          },
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
    id: "placeholders",
    title: "Replays and Wheels (Placeholders)",
    when: "A placeholder in a replay or wheel hour shows incorrect information, or the wrong recording.",
    overview: [
      "Placeholders are used to identify replay content before the corresponding recording is available or media assets are uploaded. When a placeholder contains incorrect information, the appropriate correction depends on whether the segment has already been recorded.",
    ],
    options: [
      {
        title: "How to Change the Date or Information on a Placeholder",
        steps: [
          "Select the incorrect Placeholder.",
          "Open the placeholder's editable information.",
          "Update the incorrect date or other information with the correct details.",
          "Save the changes.",
        ],
        images: [
          {
            file: "placeholder-edit.png",
            alt: "Placeholder with its editable name open, showing a missing date",
            caption:
              "Example: a placeholder with a missing date (MMDD) being corrected.",
          },
        ],
      },
      {
        title: "How to Replace an Incorrect Placeholder",
        note: "Use this method when the segment has already been recorded and the correct recording is available in the Media Library.",
        steps: [
          "Open the Media Library.",
          "Locate the correct recorded placeholder/asset.",
          "Drag and drop the correct recording directly over the incorrect placeholder.",
          "Confirm that the correct recording has replaced the original placeholder.",
        ],
      },
    ],
    related: [
      { label: "Replay Hours (full guide)", href: "/guides/replay-hours" },
      { label: "Wheel Hours (full guide)", href: "/guides/wheel-hours" },
    ],
  },
  {
    id: "avoid-stuck-simulcast",
    title: "How to Avoid Stuck Simulcast: Start Times and Duration Locks",
    when: "You are building or checking a simulcast hour and want to make sure it will advance on its own.",
    overview: [
      "If the system gets stuck during a simulcast hour, it usually means the system did not receive one of three signals it needs to move to the next scheduled live show. Three signals tell the system to advance:",
    ],
    steps: [
      "Show Duration Lock. A set Duration Lock is placed on a live Simulcast Hour telling it to end. You can either set the duration of the show or set the end time of the show.",
      "True Start. A True Start acts as a true clock start for the next hour. When the scheduled time is reached, the system overrides whatever is currently playing and starts the show at the set time. This includes overriding live segment lines that are on hold or have been extended.",
      "SCTE Trigger. SCTE triggers are sent from the Control Room by a Director telling the system to advance. If the show ends on a break, the break assets contain SCTE start and SCTE end signals to advance to the next show.",
    ],
    images: [
      {
        file: "avoid-duration-set-duration.png",
        alt: "Edit show duration dialog with Set Duration selected",
        caption: "Duration Lock: set the duration of the show...",
      },
      {
        file: "avoid-duration-end-time.png",
        alt: "Edit show duration dialog with Set End time selected",
        caption: "...or set its end time.",
      },
      {
        file: "avoid-scte-break.png",
        alt: "Break assets with time_signal_start and time_signal_end SCTE markers",
        caption:
          "SCTE Trigger: the break assets carry the SCTE start and end signals.",
      },
    ],
    related: [
      {
        label: "Start time and duration modes (dashboard)",
        href: "/#timing-modes",
      },
      {
        label: "Simulcast Hours (full guide)",
        href: "/guides/simulcast-hours",
      },
    ],
  },
  {
    id: "stuck-simulcast",
    title: "How to Advance When Stuck in a Simulcast Hour",
    when: "The system has stayed on a live segment line past the end of a show instead of advancing to the next one.",
    overview: [
      "When does this usually happen? A live segment line can get stuck when the SCTE trigger is missing at the end of a show. This typically occurs when a live segment line is the last line of a show.",
      "If the system is stuck on a Live Segment Line and you need to move to the next scheduled show, there are two ways to advance. You can find both buttons in Playout, in the Control Panel located at the bottom of the stream.",
    ],
    images: [
      {
        file: "stuck-live-segment-last-line.png",
        alt: "Show ending on a terminal break followed by a live segment line as the last line, then a hole",
        caption:
          "A terminal break followed by a live segment line as the last line of the show.",
      },
      {
        file: "stuck-needs-signal.png",
        alt: "Live segment line on hold at the end of a show with a hole before the next show",
        caption:
          "This line needs a Duration Lock, True Start or SCTE Trigger from the Control Room to advance to the 7am show.",
      },
    ],
    tips: [
      "A Fixed Start will NOT work. If a live segment line is on hold, the system allows the live segment to continue, honoring that hold rather than overriding it with a Fixed Start. The Fixed Start is honored for VOD content and commercial breaks.",
    ],
    options: [
      {
        title: "Take Next",
        option: 1,
        recommended: true,
        note: "Take Next is the preferred option.",
        steps: [
          "Go to the Playout page.",
          "Locate the Control Panel at the bottom of the stream.",
          "Look for the Take Next button.",
          "Click Take Next. Take Next tells the system to immediately advance to the next queued item. The next queued item is highlighted in yellow.",
        ],
        images: [
          {
            file: "stuck-take-next.png",
            alt: "Control Panel at the bottom of the Playout stream with the Take Next button",
            caption:
              "The Control Panel: Take Next on the left, Unhold on the right.",
          },
          {
            file: "stuck-next-queued-yellow.png",
            alt: "Rundown showing the stuck line and the next queued line highlighted in yellow",
            caption: "The next queued item is highlighted in yellow.",
          },
        ],
      },
      {
        title: "Unhold Button",
        option: 2,
        note: "Live Segment Lines are placed in Hold Mode by default. The system normally remains on the Live Segment Line until the scheduled duration expires, a SCTE trigger is received, or the appropriate duration / True Start lock condition is met. Clicking Unhold removes the HOLD from the Live Segment Line.",
        steps: [
          "Check the Live Segment Line's duration first (see the tip below).",
          "In the Control Panel, click Unhold. If the Live Segment Line's scheduled duration has already expired, the system should move to the next scheduled item.",
        ],
        tips: [
          "Check the duration first. Be careful when using Unhold if the Live Segment Line has an incorrect duration. For example, a Live Segment Line may still have a default duration of 00:30:00:00 when the actual live segment is much shorter. If you click Unhold before the 30-minute duration has expired, the system may remain on the Live Segment Line instead of advancing.",
        ],
        images: [
          {
            file: "stuck-unhold.png",
            alt: "Control Panel with the Unhold button highlighted",
            caption: "Unhold removes the HOLD from the Live Segment Line.",
          },
        ],
      },
    ],
    related: [
      {
        label: "Simulcast Hours (full guide)",
        href: "/guides/simulcast-hours",
      },
    ],
  },
  {
    id: "publish-vs-save",
    title: "Schedule Page: Publish vs Save Button",
    when: "You made a change on the Schedule page and it did not go to air.",
    overview: [
      "When making programming changes on the Schedule Page, it is important to understand the difference between Publish and Save.",
    ],
    options: [
      {
        title: "Publish Button",
        text: [
          "The Publish button is the correct way to save programming changes that you want to go to air. When you publish, your changes are added to the version of the playlist that is intended to be on air.",
        ],
      },
      {
        title: "Save Button",
        text: [
          "The Save button only creates a new version of the playlist. It does not publish the changes to air.",
        ],
        tips: [
          "Avoid using the Save button. If you want your programming changes to go on the air, always use Publish.",
        ],
      },
      {
        title: "How to Recover Content from a Saved Playlist",
        note: "If you accidentally click Save instead of Publish, your work is not lost. However, if another playlist version is currently on air, the system may not allow you to publish the saved version directly. To move your saved work to the on-air playlist:",
        steps: [
          "Open the saved playlist version.",
          "Highlight the content or changes you created.",
          "Copy the selected content.",
          "Go to the current on-air playlist.",
          "Paste the copied content into the appropriate location.",
          "Review your changes.",
          "Click Publish to send the updated playlist to the air.",
        ],
      },
    ],
    reminder: [
      "Publish = changes go to air.",
      "Save = creates a new version only.",
      "If you want your programming changes to go to air, always use Publish.",
    ],
  },
  {
    id: "delay-next-show",
    title: "How to Delay a Live Show (in progress)",
    when: "Breaking news or another live event is running long and the next scheduled show is about to start.",
    overview: [
      "When breaking news or another live event runs longer than expected, you may need to delay the next scheduled show. The steps you take depend on whether the next show has a True Start or Fixed Start.",
    ],
    options: [
      {
        title: "Delay True Start Time",
        text: [
          "If the next show has a True Start, you must change the start-time lock before its scheduled start time. A True Start overrides whatever is currently playing when its scheduled time is reached, including an active live segment.",
          "Example: you are in a live breaking news segment and want to continue coverage past the scheduled start time of the next show. If the next show has a 6:00 PM True Start, the system starts that show at 6:00 PM, even if the breaking news segment is still active. To prevent this:",
        ],
        steps: [
          "Locate the next show.",
          "Right-click on the Show Container.",
          "Change the True Start to a Flexible Start.",
        ],
      },
      {
        title: "Delay Fixed Start Time",
        text: [
          "If the next show has a Fixed Start, you have two options. The best option depends on how long you expect the breaking news coverage to continue and how you want the next show to play out.",
        ],
      },
      {
        title: "Primary Option: Change to Flexible Start",
        recommended: true,
        text: [
          "If you want the next show to maintain its existing show structure, change the Fixed Start to a Flexible Start. With a Flexible Start, the entire show moves forward based on when the live segment ends.",
          "Example: the next show is scheduled to start at 6:00 PM, but the breaking news coverage continues until 6:07 PM. With a Flexible Start, breaking news ends at 6:07 PM and the next show begins at 6:07 PM; the show and all of its scheduled content move forward from that point.",
          "This is the preferred option when you want to ensure viewers see the beginning of the scheduled show immediately after breaking news.",
        ],
      },
      {
        title: "Secondary Option: Leave the Fixed Start",
        text: [
          "You can also leave the Fixed Start unchanged. When an active live segment is playing, the live segment takes priority over the Fixed Start and continues playing past the scheduled time until it is manually triggered by the control room or the Amagi user advances by hitting Take Next.",
          "However, when the live segment ends, the system will not necessarily return to the beginning of the next scheduled show. Instead, it continues with whatever content is scheduled at that point in the playlist.",
          "Example: the next show has a 6:00 PM Fixed Start, but breaking news continues until 6:21 PM. When the live segment ends at 6:21 PM, the system continues with whatever content is scheduled for 6:21 PM. This could mean viewers are dropped into the middle of a segment rather than seeing the beginning of the show.",
        ],
      },
    ],
    tips: [
      "Flexible Start gives you more control over what content viewers see immediately following live breaking news coverage. When in doubt, Flexible Start is generally the safer option.",
    ],
    related: [
      {
        label: "Start time and duration modes (dashboard)",
        href: "/#timing-modes",
      },
    ],
  },
];

export function getTroubleshootingEntry(id: string) {
  return troubleshooting.find((t) => t.id === id);
}
