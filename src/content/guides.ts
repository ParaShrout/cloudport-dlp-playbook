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
const UPDATED = "2026-11-12";

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
          { id: "open-chrome", title: "Open Google Chrome Browser", summary: "Open Google Chrome Browser." },
          {
            id: "navigate",
            title: "Navigate to Cloudport",
            summary: "Navigate to https://cbsnews.east-cloudport.amagi.tv/",
          },
          { id: "sign-in", title: "Sign-in to Cloudport", summary: "Sign-in to Cloudport." },
          {
            id: "playout-page",
            title: "Navigate to Playout page",
            summary: "Navigate to Playout page, scroll to the time for planned cut-in.",
          },
          {
            id: "identify-prior-event",
            title: "Identify the event prior to the cut-in",
            summary:
              "Identify the event prior to where you would like the cut-in to be placed. Confirm there is adequate time left before the start of the next event.",
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
            summary: "If the exact start time of the event is unknown, mark the event as disabled. Move as necessary.",
          },
          {
            id: "take-next",
            title: "Take Next to start the cut-in",
            summary: "When ready to start the cut-in, click the Take Next button in the lower left.",
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
            summary: "When the event completes in the preview window, click Take Next.",
          },
          {
            id: "confirm-transition",
            title: "Confirm the transition",
            summary: "Confirm the playlist and channel output transition to the next event.",
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
      "Cloudport offers an immediate live cut-in feature that will take a live source to air, and offer the user a way to re-join the \"in progress\" programming at the end of the live cut-in.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Steps 1-9 transferred word for word from the Google Site. Add screenshots, read through once, then switch to Published.",
    estimatedMinutes: 5,
    whenToUse: ["The live source needs to go to air now, with little or no set-up time."],
    prerequisites: [],
    phases: [
      {
        id: "steps",
        title: "Steps",
        steps: [
          { id: "open-chrome", title: "Open Google Chrome Browser", summary: "Open Google Chrome Browser." },
          {
            id: "navigate",
            title: "Navigate to Cloudport",
            summary: "Navigate to https://cbsnews.east-cloudport.amagi.tv/",
          },
          { id: "sign-in", title: "Sign-in to Cloudport", summary: "Sign-in to Cloudport." },
          { id: "playout-page", title: "Navigate to Playout page", summary: "Navigate to Playout page." },
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
            summary: "Select a live template. Confirm the correct source is present.",
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
  ...comingSoon("simulcast-hours", "Simulcast Hours", "Programming Hours"),
  ...comingSoon("replay-hours", "Replay Hours", "Programming Hours"),
  ...comingSoon("wheel-hours", "Wheel Hours", "Programming Hours"),
  ...comingSoon("prepare-file-shows-for-live-cut-in", "All File Shows - Prepare for Live Cut-in", "Live Operations"),
  ...comingSoon("enable-live-recording", "All Live Shows - Enable Live Recording", "Live Operations"),
  ...comingSoon("create-new-show-on-the-fly", "Create a New Show on the Fly", "Live Operations"),
  ...comingSoon("troubleshooting-tips", "Troubleshooting Tips", "Troubleshooting"),
];

function comingSoon(slug: string, title: string, category: Guide["category"]): Guide[] {
  return [
    {
      slug,
      title,
      summary: "Page exists in the User Manual on the Google Site. Steps have not been transferred to the playbook yet.",
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
