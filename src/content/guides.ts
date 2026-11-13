import type { Guide } from "./types";

/**
 * Step-by-step guides.
 *
 * Source of truth: the "User Manual" section of the Streaming Google Site.
 * Step text is copied from there as written. When a page is transferred,
 * keep the wording and numbering identical so DLPs can cross-reference.
 *
 * Screenshots are NOT referenced here: drop image files into
 * /public/screenshots/<guide-slug>/ named by step number ("03.png",
 * "03b-anything.png") or by step id ("take-next.png") and they appear on
 * that step automatically. Steps with no image show a labelled slot unless
 * `wantsScreenshot: false`. Use `npm run screenshots -- status` to see
 * which steps still need one.
 *
 * Status values:
 *  - "published"   : matches the Google Site, safe to follow
 *  - "review"      : transferred, awaiting a read-through by the team
 *  - "coming-soon" : page exists on the Google Site, not transferred yet
 */

const OWNER = "CBS Digital Stream Planning & Ops";
const UPDATED = "2026-11-13";

export const guides: Guide[] = [
  {
    slug: "live-cut-ins",
    title: "Live Cut-Ins",
    summary:
      "Two methods for inserting live cut-ins during file playback programming: Adding Live Segments and Immediate Live.",
    category: "Live Operations",
    status: "review",
    kind: "overview",
    reviewNote:
      "Transferred from the Google Site page 'Abnormal Operations - Live Cut-ins'. Read through once against the site, then switch to Published.",
    intro: [
      "We have established two methods of inserting live cut-ins during file playback programming: Adding Live Segments and Immediate Live.",
      "Which method a user selects depends on time available to set up the cut-in, and how much control the user requires over when normal programming is resumed. Under most conditions, a user should select the 'Adding Live Segment' approach because it offers better control over the return to normal programming.",
    ],
    methods: [
      {
        slug: "live-cut-in-add-live-segment",
        note: "Preferred under most conditions. Use when there is time to set up the cut-in and you want control over when normal programming resumes.",
      },
      {
        slug: "live-cut-in-immediate-live",
        note: "Use when the live source needs to go to air now. Cloudport rejoins the in-progress programming when you turn live off.",
      },
    ],
    estimatedMinutes: 0,
    whenToUse: [],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "live-cut-in-add-live-segment",
    title: "Live Cut-In: Adding Live Segments",
    shortTitle: "Adding Live Segments",
    summary:
      "All shows scheduled in Cloudport will allow a user to add a live segment. This is how we will typically add live cut-ins in order to allow the user maximum flexibility when rejoining normal content.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Steps 1-16 transferred word for word from the Google Site. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 10,
    whenToUse: [
      "There is time to set up the cut-in before it needs to start.",
      "You need control over when normal programming resumes.",
    ],
    prerequisites: [],
    phases: [
      {
        id: "steps",
        title: "Steps",
        steps: [
          {
            id: "open-chrome",
            title: "Open Google Chrome Browser",
            summary: "Open Google Chrome Browser.",
          },
          {
            id: "navigate",
            title: "Navigate to Cloudport",
            summary: "Navigate to https://cbsnews.east-cloudport.amagi.tv/",
          },
          {
            id: "sign-in",
            title: "Sign-in to Cloudport",
            summary: "Sign-in to Cloudport.",
            screenshotCaption:
              "The Amagi login screen. Enter your email address and password, then click Continue.",
          },
          {
            id: "playout-page",
            title: "Navigate to Playout page",
            summary:
              "Navigate to Playout page, scroll to the time for planned cut-in.",
            screenshotCaption:
              "Playout is in the top navigation bar. The schedule grid for your channel is on the right.",
          },
          {
            id: "identify-prior-event",
            title: "Identify the event prior to the cut-in",
            summary:
              "Identify the event prior to where you would like the cut-in to be placed. Confirm there is adequate time left before the start of the next event.",
            screenshotCaption:
              "The 'Ends in' countdown on the playing event shows how long is left before the next event starts.",
            callout: {
              kind: "critical",
              title: "Caution",
              text: "The live segment will become active as soon as the prior event duration expires.",
            },
          },
          {
            id: "add-live-segment",
            title: "Add Live Segment",
            summary:
              "Right click on the event prior to where you would like the cut-in to be placed; select Add Live Segment.",
          },
          {
            id: "confirm-source",
            title: "Confirm the live source",
            summary:
              "Click the orange button in the Preview column to confirm the correct live source is selected. If the default source is not correct, move the toggle button to Custom, and select the desired source.",
          },
          {
            id: "set-duration",
            title: "Update the duration",
            summary:
              "Update the duration of the live segment to the estimated duration of the cut-in. By default, the segment will be added with the hold mode enabled.",
          },
          {
            id: "disable-if-unknown",
            title: "Disable the event if the start time is unknown",
            summary:
              "If the exact start time of the event is unknown, mark the event as disabled. Move as necessary.",
          },
          {
            id: "take-next",
            title: "Take Next to start the cut-in",
            summary:
              "When ready to start the cut-in, click the Take Next button in the lower left.",
          },
          {
            id: "confirm-time-and-triggers",
            title: "Confirm show duration and start triggers",
            summary:
              "After the cut-in has started, confirm there is adequate time left in the show duration, and that any start triggers on the following show have been adjusted as necessary.",
          },
          {
            id: "check-following-events",
            title: "Check the events following the cut-in",
            summary:
              "Prior to the end of the cut-in, check the events following the cut-in for conflicting content. Modify the schedule as necessary.",
          },
          {
            id: "monitor-audio",
            title: "Monitor the audio",
            summary: "Monitor the audio from the live source preview window.",
          },
          {
            id: "take-next-to-end",
            title: "Take Next when the event completes",
            summary:
              "When the event completes in the preview window, click Take Next.",
          },
          {
            id: "confirm-transition",
            title: "Confirm the transition",
            summary:
              "Confirm the playlist and channel output transition to the next event.",
          },
          {
            id: "assess-timing",
            title: "Assess timing impact",
            summary:
              "Assess timing impact of the cut-in and adjust schedule so that the next show starts on time.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["live-cut-ins", "live-cut-in-immediate-live"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "live-cut-in-immediate-live",
    title: "Live Cut-In: Immediate Live",
    shortTitle: "Immediate Live",
    summary:
      'Cloudport offers an immediate live cut-in feature that will take a live source to air, and offer the user a way to re-join the "in progress" programming at the end of the live cut-in.',
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Steps 1-9 transferred word for word from the Google Site. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 5,
    whenToUse: [
      "The live source needs to go to air now, with little or no set-up time.",
    ],
    prerequisites: [],
    phases: [
      {
        id: "steps",
        title: "Steps",
        steps: [
          {
            id: "open-chrome",
            title: "Open Google Chrome Browser",
            summary: "Open Google Chrome Browser.",
          },
          {
            id: "navigate",
            title: "Navigate to Cloudport",
            summary: "Navigate to https://cbsnews.east-cloudport.amagi.tv/",
          },
          {
            id: "sign-in",
            title: "Sign-in to Cloudport",
            summary: "Sign-in to Cloudport.",
          },
          {
            id: "playout-page",
            title: "Navigate to Playout page",
            summary: "Navigate to Playout page.",
          },
          {
            id: "take-live",
            title: "Click Take Live",
            summary: "Click the Take Live button (upper right of screen).",
          },
          {
            id: "set-start-time",
            title: "Set the start time",
            summary:
              "Set the start time. To go now, select the 'Next 10 seconds' option. If you know the future time you want the event to start, enter that time.",
          },
          {
            id: "select-template",
            title: "Select a live template",
            summary:
              "Select a live template. Confirm the correct source is present.",
          },
          {
            id: "proceed",
            title: "Click Proceed",
            summary:
              "Click proceed. Cloudport will insert an immediate live show into the schedule below the on-air show (or at the selected time).",
          },
          {
            id: "live-off",
            title: "Click Live Off to end the cut-in",
            summary:
              "At the conclusion of the cut-in, click the Live Off button in the upper right to terminate the live cut-in. Cloudport will join the originally scheduled programming in progress.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["live-cut-ins", "live-cut-in-add-live-segment"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },

  // --- Pages that exist on the Google Site but have not been transferred yet ---
  {
    slug: "create-new-show-on-the-fly",
    title: "Create a New Show on the Fly",
    shortTitle: "New Show on the Fly",
    summary:
      "Situations may exist where users need to alter an existing schedule to add a new show to accommodate breaking news or other unplanned events.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Transferred from the Google Site. The two branches (Live Show vs Show) are shown as separate phases, followed by the steps common to both. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 10,
    whenToUse: [
      "Breaking news or another unplanned event means a new show has to be added to today's schedule.",
      "Create a Live Show when the content is primarily live.",
      "Create a Show when the content is primarily file playback.",
    ],
    prerequisites: [
      "You are in edit mode on the Playout page for the channel.",
    ],
    phases: [
      {
        id: "make-room",
        title: "Make room in the schedule",
        description:
          "Decide first whether this will be a Show (primarily file playback) or a Live Show (primarily live content).",
        steps: [
          {
            id: "navigate-playout",
            title: "Navigate to the Playout page",
            summary:
              "Navigate to Playout page and event where you wish to create show.",
          },
          {
            id: "create-hole",
            title: "Create a hole for the new show",
            summary:
              "Adjust existing event to create a hole where new show is desired.",
          },
        ],
      },
      {
        id: "live-show",
        title: "If adding a Live Show",
        description:
          "Skip to the next phase if you are adding a Show for file playback.",
        steps: [
          {
            id: "drag-live-template",
            title: "Drag the default live template into the hole",
            summary:
              "If adding a Live Show, select the default live template and drag to hole.",
          },
          {
            id: "live-open-property",
            title: "Open the Property Window",
            summary:
              "Right Click on Live Show header and select Open Property Window.",
          },
          {
            id: "live-show-details",
            title: "Set the show details",
            summary:
              "On Show Details tab, set the show name, start mode and duration.",
          },
          {
            id: "live-ingest-point",
            title: "Set the ingest points",
            summary:
              "On the Ingest Point tab, select the input you wish to have available and a default.",
          },
        ],
      },
      {
        id: "file-show",
        title: "If adding a Show for file playback",
        steps: [
          {
            id: "create-show-button",
            title: "Click Create Show",
            summary: "Click the Create Show button in the hole.",
            callout: {
              kind: "warning",
              title: "SCTE triggers",
              text: "When using a Show, SCTE triggers from the control room will not advance the playlist.",
            },
          },
          {
            id: "file-show-details",
            title: "Set the show details and save",
            summary: "Set the show name, start mode and duration. Click Save.",
          },
          {
            id: "file-open-property",
            title: "Open the Property Window if you may need live sources",
            summary:
              "If you expect to need live sources during the show, right click on the show header, select open property window.",
          },
          {
            id: "file-ingest-point",
            title: "Set the ingest points and save",
            summary:
              "Navigate to Ingest Points tab; select desired ingest point and default. Click Save.",
          },
        ],
      },
      {
        id: "finish",
        title: "Finish the show (Live Show or Show)",
        description:
          "From this point, all steps are the same for a Live Show or a Show.",
        steps: [
          {
            id: "add-content",
            title: "Add video clips or live segments",
            summary: "Add video clips or live segment.",
          },
          {
            id: "confirm-start",
            title: "Confirm the start time and mode",
            summary:
              "Confirm start time and mode are properly set in schedule grid.",
          },
          {
            id: "confirm-duration",
            title: "Confirm the show duration and mode",
            summary: "Confirm show duration and mode are properly set.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: [
      "live-cut-ins",
      "prepare-file-shows-for-live-cut-in",
      "enable-live-recording",
    ],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "simulcast-hours",
    title: "Simulcast Hours",
    summary:
      "Simulcast hours represent approx. 6-8 hrs/day on each channel where a local news program is run on both the main broadcast channel and the streaming channel at the same time and is recorded for later re-airing. Each hour is pre-built in a mini playlist that is manually scheduled on a daily basis.",
    category: "Programming Hours",
    status: "review",
    reviewNote:
      "Transferred from the Google Site. The naming format document is not linked yet ('link here' on the site); add it to steps 3 and 11 when available. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 30,
    whenToUse: [
      "Pre-building the mini playlist for a simulcast hour.",
      "Scheduling a pre-built simulcast hour on the day of air.",
      "Monitoring a simulcast hour on air.",
    ],
    prerequisites: [],
    phases: [
      {
        id: "pre-build",
        title: "Pre-build steps",
        description:
          "Build the mini playlist once; it is reused every day the hour airs.",
        steps: [
          {
            id: "mini-playlists",
            title: "Navigate to Mini Playlists",
            summary: "Navigate to Media Library > Mini Playlists.",
          },
          {
            id: "create-new",
            title: "Click 'Create new'",
            summary: "Click 'Create new' button.",
          },
          {
            id: "name-playlist",
            title: "Name the mini playlist",
            summary: "Name the new Mini Playlist per the agreed naming format.",
          },
          {
            id: "live-tab",
            title: "Open the Live tab",
            summary: "Navigate to Media Library Pop-up and Live tab.",
          },
          {
            id: "drag-template",
            title: "Drag the Default Template into the hole",
            summary:
              "Select the Default Template and drag it into the hole. This will create a live show.",
          },
          {
            id: "start-time",
            title: "Set the start time",
            summary:
              "Set the desired start time by single clicking on the start time field.",
          },
          {
            id: "start-mode",
            title: "Set the start mode",
            summary:
              "Set the desired start mode by right clicking, and selecting either Fixed, Flexible or True.",
          },
          {
            id: "duration",
            title: "Set the duration",
            summary:
              "Set the desired duration in the duration column by single clicking on the duration field.",
          },
          {
            id: "duration-mode",
            title: "Confirm the duration mode",
            summary:
              "Confirm the duration mode is set as desired. Generally this will be flexible.",
          },
          {
            id: "open-property",
            title: "Open the Property Window",
            summary:
              "Right click on the show and select 'Open Property Window'.",
          },
          {
            id: "recorded-asset-name",
            title: "Set the recorded asset name",
            summary:
              "Set the desired name of the recorded asset in the show name field per the agreed naming format.",
          },
          {
            id: "remaining-params",
            title: "Confirm the remaining parameters",
            summary: "Confirm the remaining parameters are set as desired.",
          },
          {
            id: "configurations-tab",
            title: "Confirm the Configurations tab",
            summary:
              "Confirm the Configurations tab is set as expected (should be default values).",
          },
          {
            id: "ingest-points-tab",
            title: "Confirm the Ingest Points tab",
            summary:
              "Confirm the Ingest Points tab has the correct inputs set.",
            callout: {
              kind: "warning",
              text: "You may not exceed three items selected here.",
            },
          },
          {
            id: "recordings-tab",
            title: "Confirm the Recordings tab",
            summary:
              "Confirm the recordings tab is enabled, and set the mode to all-record-segmented.",
          },
          { id: "save", title: "Click Save", summary: "Click Save." },
          {
            id: "add-live-segments",
            title: "Add live segments",
            summary:
              "Add Live segments to the mini playlist. There should be one live segment for each program segment in the show rundown.",
          },
          {
            id: "add-breaks",
            title: "Add breaks",
            summary: "Add Breaks to each live segment.",
          },
          {
            id: "add-looper",
            title: "Add a looper to each break",
            summary: "Add Looper to each break; be certain to use the looper.",
          },
          {
            id: "review",
            title: "Review the schedule",
            summary: "Review schedule.",
            wantsScreenshot: false,
          },
          {
            id: "create-new-save",
            title: "Click Create New to save",
            summary: "Click Create New to save.",
          },
        ],
      },
      {
        id: "day-of-air",
        title: "Day of air scheduling steps",
        steps: [
          {
            id: "schedule-page",
            title: "Navigate to the Schedule page",
            summary: "Navigate to Schedule Page.",
          },
          {
            id: "select-date",
            title: "Select the date",
            summary: "Select date.",
          },
          {
            id: "edit-mode",
            title: "Enter Edit Mode",
            summary: "Enter Edit Mode.",
          },
          {
            id: "find-hole",
            title: "Find the hole for the live show",
            summary: "Find hole where you wish to schedule Live show.",
          },
          {
            id: "open-media-library",
            title: "Open the Mini Playlist subtab",
            summary: "Open Media Library Pop-up, Select Mini Playlist Subtab.",
          },
          {
            id: "drag-playlist",
            title: "Drag the mini playlist into the hole",
            summary:
              "Search for desired mini playlist; drag into hole in the schedule.",
          },
          {
            id: "confirm-start-duration",
            title: "Confirm start time and duration",
            summary: "Confirm start time and duration are set as expected.",
          },
          {
            id: "update-show-name",
            title: "Update the show name with today's date",
            summary: "Update show name with current date.",
          },
          {
            id: "review-breaks",
            title: "Review break times against the rundown",
            summary:
              "Review break times against show run down; update as needed.",
          },
          {
            id: "confirm-next-show",
            title: "Confirm the start time of the next show",
            summary: "Confirm start time of next show.",
          },
        ],
      },
      {
        id: "operations",
        title: "Operations and monitoring",
        steps: [
          {
            id: "check-holes",
            title: "Check for holes before and after the show",
            summary:
              "Prior to show start check for any hole before or after show. Adjust the schedule as necessary.",
          },
          {
            id: "check-errors",
            title: "Check for errors or warnings",
            summary: "Prior to show start, check for any error or warnings.",
          },
          {
            id: "verify-av",
            title: "Verify audio and video quality",
            summary: "At start of show, verify audio and video quality.",
          },
          {
            id: "confirm-break",
            title: "Confirm the initial break",
            summary: "Confirm initial break plays as expected.",
          },
          {
            id: "confirm-recordings",
            title: "Confirm segment recordings",
            summary:
              "Confirm segment recordings appear in media library; check and adjust timing details as necessary.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["replay-hours", "enable-live-recording"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "replay-hours",
    title: "Replay Hours",
    summary:
      "Replay hours represent approx. 7 hrs/day on each channel where a local news program recorded earlier in the day is replayed.",
    category: "Programming Hours",
    status: "review",
    reviewNote:
      "Transferred from the Google Site. The naming format document is not linked yet ('link here' on the site); add it to steps 3 and 4 when available. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 30,
    whenToUse: [
      "Pre-building the mini playlist for a replay hour.",
      "Scheduling a replay hour for today or a future day.",
      "Monitoring a replay hour on air.",
    ],
    prerequisites: [],
    phases: [
      {
        id: "pre-build",
        title: "Pre-build steps",
        steps: [
          {
            id: "mini-playlists",
            title: "Navigate to Mini Playlists",
            summary: "Navigate to Media Library > Mini Playlists.",
          },
          {
            id: "create-new",
            title: "Click 'Create new'",
            summary: "Click 'Create new' button.",
          },
          {
            id: "name-playlist",
            title: "Name the mini playlist",
            summary: "Name the new Mini Playlist per the agreed naming format.",
          },
          {
            id: "create-show",
            title: "Create the show",
            summary:
              "Click Create Show, set name per agreed naming format. Enter start time details (if the program airs multiple times, leave this zero). Set the duration. Click Create.",
          },
          {
            id: "add-ingest",
            title: "Add live ingest sources",
            summary: "Add Live Ingest Sources.",
          },
          {
            id: "placeholders",
            title: "Create a placeholder for each segment",
            summary: "Create as many placeholders as you will have segments.",
          },
          {
            id: "placeholder-names",
            title: "Set generic asset names on the placeholders",
            summary:
              "Set the asset name details on the placeholders with generic details, e.g., 12p_WJZ_SIMULCAST_MMDD-02.",
          },
          {
            id: "breaks",
            title: "Create a break for each segment",
            summary: "Create a break for each segment.",
          },
          {
            id: "loopers",
            title: "Add loopers to each break",
            summary: "Add loopers to each break as per the show format.",
          },
          {
            id: "bumpers",
            title: "Add bumpers to fill remaining time",
            summary: "Add bumper outside of each break to fill remaining time.",
          },
          { id: "graphics", title: "Add graphics", summary: "Add Graphics." },
          {
            id: "review",
            title: "Review the schedule",
            summary: "Review schedule.",
            wantsScreenshot: false,
          },
          {
            id: "create-new-save",
            title: "Click Create New to save",
            summary: "Click Create New to save.",
          },
        ],
      },
      {
        id: "day-of-air",
        title: "Day of air scheduling steps",
        steps: [
          {
            id: "today-layout",
            title: "For today, open the Today layout",
            summary:
              "For current day, navigate to Layouts > Single Channel Layouts > Today.",
          },
          {
            id: "future-schedule",
            title: "For future days, open the Schedule page",
            summary:
              "For future days, navigate to Schedule page, select desired Playlist Date. Enter edit mode.",
          },
          {
            id: "scroll-hour",
            title: "Scroll to the replay hour",
            summary: "Scroll to hour when you wish to schedule replay.",
          },
          {
            id: "open-media-library",
            title: "Open the Mini Playlist subtab",
            summary:
              "Click the orange Open Media Library button in the upper left; navigate to Mini Playlist subtab.",
          },
          {
            id: "drag-playlist",
            title: "Drag the mini playlist into the hole",
            summary: "Drag Mini Playlist to hole.",
          },
          {
            id: "confirm-start",
            title: "Confirm start time and mode",
            summary: "Confirm Start time and mode.",
          },
          {
            id: "update-show-dates",
            title: "Update the dates on the show",
            summary: "Update dates on show.",
          },
          {
            id: "update-placeholder-dates",
            title: "Update the dates on each placeholder",
            summary: "Update dates on each individual placeholder.",
          },
        ],
      },
      {
        id: "operations",
        title: "Operations and monitoring",
        steps: [
          {
            id: "check-holes",
            title: "Check for holes before and after the show",
            summary:
              "Prior to show start check for any hole before or after show. Adjust the schedule as necessary.",
          },
          {
            id: "check-segments",
            title: "Check each segment's status, SOM and duration",
            summary:
              "Prior to show start, check schedule for status on each segment, and that SOM and duration values look correct.",
          },
          {
            id: "check-warnings",
            title: "Check for warnings or errors",
            summary: "Check playlist for any warnings or errors.",
          },
          {
            id: "verify-av",
            title: "Verify audio and video quality",
            summary: "At start of show, verify audio and video quality.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["simulcast-hours"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "wheel-hours",
    title: "Wheel Hours",
    summary:
      "On a daily basis, the Baltimore DLP team creates two 1 hr wheel shows. The afternoon wheel is typically built in the morning hours, runs between 1PM and 4PM, and contains stories selected from the morning shows. The evening wheel is built in the early evening, runs between 8PM and 11PM, and contains stories selected from the morning and evening shows.",
    category: "Programming Hours",
    status: "review",
    reviewNote:
      "Transferred from the Google Site. Written for the Baltimore schedule; confirm the wheel times for other stations. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 45,
    whenToUse: [
      "Building the afternoon wheel (airs 1PM-4PM) in the morning.",
      "Building the evening wheel (airs 8PM-11PM) in the early evening.",
    ],
    prerequisites: [
      "The 'Afternoon Wheel Template' and 'Evening Wheel Template' mini playlists are pre-built and contain the typical wheel hour formats and desired break structures.",
    ],
    phases: [
      {
        id: "day-of-air",
        title: "Day of air scheduling steps",
        steps: [
          {
            id: "today-layout",
            title: "For today, open the Today layout",
            summary:
              "For current day, navigate to Layouts > Single Channel Layouts > Today.",
          },
          {
            id: "future-schedule",
            title: "For future days, open the Schedule page",
            summary:
              "For future days, navigate to Schedule page, select desired Playlist Date. Enter edit mode.",
          },
          {
            id: "scroll-hour",
            title: "Scroll to the first wheel hour",
            summary: "Scroll to initial wheel hour.",
          },
          {
            id: "open-media-library",
            title: "Open the Mini Playlist subtab",
            summary:
              "Click the orange Open Media Library button in the upper left; navigate to Mini Playlist subtab.",
          },
          {
            id: "drag-template",
            title: "Drag the wheel template into the hole",
            summary:
              "Drag 'Afternoon Wheel Template' or 'Evening Wheel Template' mini playlist into schedule hole at desired time.",
          },
          {
            id: "check-start",
            title: "Check the start time and mode",
            summary:
              "Check that the desired start time and mode are set. Typically the initial afternoon wheel at 1PM should have a flexible start time, and roughly start at 1300.",
          },
          {
            id: "show-name",
            title: "Update the show name",
            summary: "Update show name per naming rules.",
          },
          {
            id: "duration",
            title: "Set the show duration to 1 hr",
            summary: "Update the show duration to 1hr.",
          },
          {
            id: "expand-show",
            title: "Expand the wheel show",
            summary: "Expand the wheel show such that all events are visible.",
          },
          {
            id: "open-media-tab",
            title: "Open the Media Library",
            summary:
              "Click the orange Open Media Library button in the upper left.",
          },
          {
            id: "drag-content",
            title: "Drag content into the schedule",
            summary:
              "From the Media tab, search for desired content and drag into schedule.",
          },
          {
            id: "descriptions",
            title: "Set the descriptions",
            summary: "Set the short and long descriptions as appropriate.",
          },
          {
            id: "placeholder",
            title: "Use Placeholder Media for content not yet in the library",
            summary:
              "To schedule content that is not yet in media library, drag the 'Placeholder Media' into the schedule on top of the item prior to where you want it positioned.",
          },
          {
            id: "placeholder-asset-id",
            title: "Set the placeholder asset ID",
            summary:
              "Set the placeholder asset ID to match the expected video asset file name.",
          },
          {
            id: "placeholder-details",
            title: "Set the placeholder duration, title and descriptions",
            summary:
              "Set the expected duration of the item, the title, and the short/long descriptions.",
          },
          {
            id: "repeat",
            title: "Repeat for additional content",
            summary: "Repeat steps above to schedule additional content.",
            wantsScreenshot: false,
          },
          {
            id: "over-under",
            title: "Fill the show to 1 hr",
            summary:
              "Observe the show over/under run indicator. Adjust bumper durations as necessary to get show fill to 1hr.",
          },
        ],
      },
      {
        id: "operations",
        title: "Operations and monitoring",
        steps: [
          {
            id: "media-arrived",
            title: "Confirm all media has arrived",
            summary:
              "Prior to show start, confirm all media has arrived and downloaded to players. Update schedule as necessary to address missing items.",
          },
          {
            id: "confirm-start",
            title: "Confirm the show start time and mode",
            summary: "Confirm show start time and mode are correct.",
          },
          {
            id: "confirm-placeholders",
            title: "Confirm placeholder durations",
            summary:
              "Confirm all placeholder durations have been updated as expected.",
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["simulcast-hours", "replay-hours"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "prepare-file-shows-for-live-cut-in",
    title: "All File Shows - Prepare for Live Cut-in",
    shortTitle: "Prepare for Live Cut-in",
    summary:
      "In order to support easy insertion of live segments during file playback programming, we need to perform certain steps on each file playback show so it is ready to support this.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Steps 1-7 transferred word for word from the Google Site page 'All File Shows - Prepare for Live Cutin'. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 3,
    whenToUse: [
      "Every time a new file playback show has been created in the schedule grid.",
    ],
    prerequisites: [
      "The file show has already been created in the schedule grid.",
    ],
    phases: [
      {
        id: "steps",
        title: "Steps",
        steps: [
          {
            id: "right-click-show",
            title: "Right click the show in the schedule grid",
            summary:
              "After initial creation of file show, right click on the show in the schedule grid.",
          },
          {
            id: "open-property-window",
            title: "Select 'Open Property Window'",
            summary: "Select 'Open Property Window'.",
          },
          {
            id: "ingest-point-tab",
            title: "Select the Ingest Point tab",
            summary: "Select the Ingest Point Tab.",
          },
          {
            id: "add-live-sources",
            title: "Add the live sources",
            summary: "Add the following live sources:",
            details: ["cbsn_ingest_001", "cbsn_ingest_002", "cbsn_24x7"],
          },
          {
            id: "add-default-source",
            title: "Add a default source",
            summary:
              "Add a default source. Typically this will be cbsn_24x7. This selection will be the initial source selected when a live segment is inserted.",
          },
          { id: "save", title: "Click Save", summary: "Click Save." },
          {
            id: "done",
            title: "The show is ready for live segments",
            summary:
              "This show will now allow a user to insert a live segment into a file playback show.",
            wantsScreenshot: false,
          },
        ],
      },
    ],
    troubleshooting: [],
    related: ["live-cut-ins", "live-cut-in-add-live-segment"],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  {
    slug: "enable-live-recording",
    title: "All Live Shows - Enable Live Recording",
    shortTitle: "Enable Live Recording",
    summary:
      "In order to have each show available in the media library, the decision has been taken to record each show regardless of whether it is scheduled for replay. Follow these steps on each live show created in order to capture the recording.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Steps 1-5 transferred word for word from the Google Site. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 2,
    whenToUse: ["While creating any new live show."],
    prerequisites: [],
    phases: [
      {
        id: "steps",
        title: "Steps",
        steps: [
          {
            id: "recordings-tab",
            title: "Navigate to the Recordings tab",
            summary:
              "While performing the initial creation of each live show, navigate to the Recordings tab.",
          },
          {
            id: "enable-input-recording",
            title: "Enable the Input Recording switch",
            summary: "Enable the Input Recording switch.",
          },
          {
            id: "record-mode",
            title: "Set the record mode",
            summary:
              "Set the 'Select record mode' drop down to 'All Record Segmented'.",
          },
          { id: "save", title: "Click Save", summary: "Click Save." },
          {
            id: "done",
            title: "Cloudport records the show",
            summary:
              "This will cause Cloudport to record the show and create a hard parted file for each segment of the live show. The show name value from the 'Show Details' tab will be used for the file name for each show.",
            wantsScreenshot: false,
          },
        ],
      },
    ],
    troubleshooting: [],
    lastUpdated: UPDATED,
    owner: OWNER,
  },
  ...comingSoon(
    "troubleshooting-tips",
    "Troubleshooting Tips",
    "Troubleshooting",
  ),
];

function comingSoon(
  slug: string,
  title: string,
  category: Guide["category"],
): Guide[] {
  return [
    {
      slug,
      title,
      summary:
        "Page exists in the User Manual on the Google Site. Steps have not been transferred to the playbook yet.",
      category,
      status: "coming-soon",
      estimatedMinutes: 0,
      whenToUse: [],
      prerequisites: [],
      phases: [],
      troubleshooting: [],
      lastUpdated: UPDATED,
      owner: OWNER,
    },
  ];
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function countSteps(guide: Guide): number {
  return guide.phases.reduce((n, p) => n + p.steps.length, 0);
}

export const CATEGORY_ORDER: Guide["category"][] = [
  "Live Operations",
  "Programming Hours",
  "Troubleshooting",
];

export type GuideRow = { guide: Guide; parent?: Guide };

/**
 * Order guides for display: a guide listed as a method of an overview guide
 * sits directly beneath that parent (indented) instead of as its own row.
 */
export function guideTree(list: Guide[]): GuideRow[] {
  const parentOf = new Map<string, Guide>();
  list.forEach((g) =>
    g.methods?.forEach((m) => {
      if (!parentOf.has(m.slug)) parentOf.set(m.slug, g);
    }),
  );
  const rows: GuideRow[] = [];
  list.forEach((g) => {
    if (parentOf.has(g.slug)) return;
    rows.push({ guide: g });
    g.methods?.forEach((m) => {
      const child = list.find((c) => c.slug === m.slug);
      if (child && parentOf.get(m.slug) === g)
        rows.push({ guide: child, parent: g });
    });
  });
  return rows;
}
