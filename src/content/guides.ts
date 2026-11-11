import type { Guide } from "./types";

/**
 * Step-by-step guides.
 *
 * To update a guide, edit the text here. Screenshots live under
 * /public/screenshots/<guide-slug>/ and are referenced by `screenshot.src`.
 * If an image file is missing the UI shows a labelled placeholder with the
 * expected path, so you can drop files in later without touching code.
 *
 * Status values:
 *  - "published"   : verified against the Cloudport playbook, safe to follow
 *  - "review"      : full steps present, pending verification by the team
 *  - "coming-soon" : summary only, steps not yet documented
 */
export const guides: Guide[] = [
  {
    slug: "live-cut-ins",
    title: "Live Cut-Ins",
    shortTitle: "Live Cut-Ins",
    summary:
      "Interrupt the scheduled stream with a live feed from the control room, monitor it on air, then return cleanly to the schedule.",
    category: "Live Operations",
    status: "review",
    reviewNote:
      "Step text was drafted from the Cloudport playbook outline. Compare each step against the SharePoint reference (cloudport_reference.html) and replace the screenshot placeholders before switching this guide to Published.",
    estimatedMinutes: 10,
    whenToUse: [
      "Breaking news or weather coverage that needs to go to the stream now.",
      "A scheduled live hit (press conference, live shot) that is not already built into the day's playlist.",
      "Extending a live newscast past its scheduled end time.",
    ],
    prerequisites: [
      "You are logged in to Cloudport with the DLP role for the station you are operating.",
      "The control room has confirmed which live source (encoder/input) carries the feed.",
      "You know the expected start time and approximate duration of the cut-in.",
      "An output monitor (player or multiviewer) for the channel is open and visible.",
    ],
    phases: [
      {
        id: "prepare",
        title: "Before the cut-in",
        description:
          "Two to five minutes of prep prevents most on-air problems. Do not skip the source check.",
        steps: [
          {
            id: "confirm-request",
            title: "Confirm the request",
            summary:
              "Get the who, what, when and how long from the control room or assignment desk, and post it in the shift channel so everyone on duty sees it.",
            details: [
              "Station / channel the cut-in is for.",
              "Live source name as it appears in Cloudport (e.g. the control room program feed).",
              "Planned start time and expected duration.",
              "How the cut-in should end: return to the scheduled program where it left off, or join the schedule in progress.",
            ],
            expected:
              "A one-line note in the shift channel: station, source, start time, expected end, return behaviour.",
            callout: {
              kind: "tip",
              text: "If the request is vague on duration, assume it will run long and plan around the next hard-start item in the schedule.",
            },
          },
          {
            id: "open-channel",
            title: "Open the correct channel in Cloudport",
            summary:
              "From the Cloudport home screen, open Channels and select the station's channel. Double-check the channel name and environment before you touch anything.",
            details: [
              "Confirm the channel name in the header matches the station you were asked to cut in on.",
              "Confirm you are in the Production environment, not Staging or a test channel.",
            ],
            expected:
              "The channel's playout dashboard is open, the status indicator shows On Air, and the current item is playing.",
            screenshot: {
              src: "/screenshots/live-cut-ins/02-select-channel.png",
              alt: "Cloudport channel list with the station channel highlighted",
              caption: "Channels list. Open the station channel from here.",
            },
            callout: {
              kind: "critical",
              text: "Several stations share one Cloudport account. Cutting in on the wrong channel puts another market's live feed on air.",
            },
          },
          {
            id: "verify-source",
            title: "Verify the live source is healthy",
            summary:
              "Open the Live Sources (inputs) panel and find the source the control room named. Check that it is active, that the thumbnail preview is updating, and that audio meters are moving.",
            details: [
              "Status should read Active / Connected (green).",
              "Preview thumbnail should show the control room output, not a slate or black.",
              "Audio meters should show movement on both channels.",
            ],
            expected:
              "Source shows Active with a live-updating preview and audio. If anything is red or frozen, stop and use the Troubleshooting section below.",
            screenshot: {
              src: "/screenshots/live-cut-ins/03-live-sources.png",
              alt: "Live Sources panel showing an active input with preview and audio meters",
              caption: "Live Sources panel. Confirm status, preview and audio before going any further.",
            },
          },
          {
            id: "review-playlist",
            title: "Review what is on air and what is next",
            summary:
              "In the playlist / timeline, note the item currently playing, the next few items and any hard-start items (top-of-hour newscasts, must-air content) that the cut-in could collide with.",
            details: [
              "Note the time remaining on the current item.",
              "Identify the next hard-start item and its start time.",
              "Note any ad breaks that will be skipped while live.",
            ],
            expected:
              "You can say out loud: what is playing, what will be interrupted, and when the next hard start is.",
            screenshot: {
              src: "/screenshots/live-cut-ins/04-playlist-now-next.png",
              alt: "Playlist timeline showing the current item, upcoming items and a hard-start marker",
              caption: "Playlist timeline with the current item and the next hard start.",
            },
          },
        ],
      },
      {
        id: "execute",
        title: "Take the cut-in",
        description: "Preview first, then take. Never take blind.",
        steps: [
          {
            id: "open-live-control",
            title: "Open the Live Cut-In control",
            summary:
              "From the channel's playout dashboard, open the Live / Cut-In control panel.",
            expected:
              "The cut-in panel is visible with a source selector, a return-behaviour option and a Preview / Take control.",
            screenshot: {
              src: "/screenshots/live-cut-ins/05-open-live-control.png",
              alt: "Playout dashboard with the Live Cut-In control panel open",
              caption: "Live Cut-In panel on the playout dashboard.",
            },
          },
          {
            id: "select-source",
            title: "Select the live source and return behaviour",
            summary:
              "Choose the live source you verified earlier, then set how the channel should behave when the cut-in ends.",
            details: [
              "Resume: continue the interrupted program from where it stopped (schedule will run late by the cut-in length).",
              "Join in progress: jump to whatever the schedule says should be airing now (keeps the schedule on time, skips interrupted content).",
            ],
            expected:
              "The source name in the panel matches the control room's request and the return behaviour matches what was agreed in step 1.",
            screenshot: {
              src: "/screenshots/live-cut-ins/06-select-source.png",
              alt: "Live Cut-In panel with source dropdown and return behaviour options",
              caption: "Source and return-behaviour selection.",
            },
            callout: {
              kind: "warning",
              text: "Default to Join in progress when a hard-start newscast is coming up. Default to Resume for short cut-ins in the middle of long-form content.",
            },
          },
          {
            id: "preview",
            title: "Preview the live feed",
            summary:
              "Use Preview to confirm the live source has picture and audio before it goes to air.",
            expected:
              "Preview window shows the live control room output with audio. If the preview is black, frozen or silent, do not take.",
            screenshot: {
              src: "/screenshots/live-cut-ins/07-preview.png",
              alt: "Preview window showing the live feed before take",
              caption: "Preview before take.",
            },
          },
          {
            id: "take",
            title: "Take the cut-in",
            summary:
              "When the control room gives the cue, click Take / Go Live and confirm the dialog.",
            expected:
              "The channel status changes to LIVE, the timeline shows a live event at the current position and the on-air output switches to the live feed within a few seconds.",
            screenshot: {
              src: "/screenshots/live-cut-ins/08-take.png",
              alt: "Confirmation dialog for taking the live cut-in",
              caption: "Take confirmation.",
            },
            callout: {
              kind: "note",
              text: "Expect a short delay (typically a few seconds) between clicking Take and seeing the change on the output monitor. Do not click Take twice.",
            },
          },
          {
            id: "verify-on-air",
            title: "Verify on air",
            summary:
              "Confirm the live feed is actually on the output, not just in the Cloudport UI.",
            details: [
              "Output monitor / player shows the live feed with audio.",
              "Cloudport channel status reads LIVE.",
              "Tell the control room you are live on the stream.",
            ],
            expected:
              "Live feed confirmed on the external output and acknowledged by the control room. Post 'Live on stream at HH:MM' in the shift channel.",
            screenshot: {
              src: "/screenshots/live-cut-ins/09-on-air.png",
              alt: "Channel status showing LIVE with the output monitor displaying the live feed",
              caption: "LIVE status with external output confirmation.",
            },
          },
        ],
      },
      {
        id: "monitor",
        title: "While live",
        steps: [
          {
            id: "monitor-source",
            title: "Monitor source health and timing",
            summary:
              "Stay on the playout dashboard. Watch the source status, the output monitor and the clock against the next hard start.",
            details: [
              "If the source drops, Cloudport will typically fall back to the schedule or a slate. Be ready to re-take once the source recovers.",
              "Give the control room a heads-up a few minutes before the next hard-start item.",
              "Keep a note of the actual start time and any issues for the shift log.",
            ],
            expected:
              "No surprises: you know when the cut-in will end and what the schedule will do when it does.",
          },
        ],
      },
      {
        id: "return",
        title: "Return to schedule",
        steps: [
          {
            id: "end-live",
            title: "End the cut-in",
            summary:
              "On the control room's cue, click Return to Schedule / End Live and confirm. The channel returns using the behaviour you set earlier.",
            expected:
              "Channel status changes from LIVE back to On Air (scheduled), and the timeline shows the schedule resuming.",
            screenshot: {
              src: "/screenshots/live-cut-ins/11-return-to-schedule.png",
              alt: "Return to Schedule control on the Live Cut-In panel",
              caption: "Return to Schedule.",
            },
          },
          {
            id: "verify-resume",
            title: "Verify the schedule resumed correctly",
            summary:
              "Confirm the right item is playing and that the schedule is where you expect it to be.",
            details: [
              "Output monitor shows scheduled content, not black or a slate.",
              "The item playing matches the playlist's current position.",
              "If you used Resume, check how late the schedule now runs and whether the next hard start is at risk.",
            ],
            expected:
              "Scheduled content is on air and you know whether the schedule is on time or running late.",
            screenshot: {
              src: "/screenshots/live-cut-ins/12-verify-resume.png",
              alt: "Playlist showing scheduled playback resumed after the live cut-in",
              caption: "Schedule resumed after the cut-in.",
            },
          },
          {
            id: "fix-drift",
            title: "Fix any schedule drift",
            summary:
              "If the schedule is running late and a hard-start item is at risk, trim or skip lower-priority items so the hard start hits on time.",
            details: [
              "Prefer skipping promos / filler before trimming program content.",
              "Never remove must-air items without checking with the Lead DLP.",
            ],
            expected:
              "The next hard-start item is scheduled to begin at its correct clock time.",
            callout: {
              kind: "warning",
              text: "Changes to the live playlist take effect immediately. Make one change at a time and re-check the timeline after each.",
            },
          },
          {
            id: "log",
            title: "Log it",
            summary:
              "Record the cut-in in the shift log and close the loop in the shift channel.",
            details: [
              "Actual start and end time, source used, return behaviour.",
              "Any issues (source drops, audio problems, drift) and how you resolved them.",
              "Anything that needs follow-up from Stream Ops or Amagi.",
            ],
            expected:
              "Shift log entry complete; a 'Back to schedule at HH:MM' post in the shift channel.",
          },
        ],
      },
    ],
    troubleshooting: [
      {
        symptom: "Live source shows Offline / red, or the preview is black.",
        fix: "Confirm with the control room that the encoder is sending. Refresh the Live Sources panel. If a second source exists for the station, verify and use it instead.",
        escalate:
          "If the source is still down 2 minutes before the planned start, escalate as Sev 2 (Sev 1 if it is breaking news).",
      },
      {
        symptom: "Picture is live but there is no audio.",
        fix: "Check audio meters on the source in Cloudport. If the meters move, the issue is downstream: check the output monitor's mute and audio track selection. If the meters are flat, the control room is not sending audio on the expected channels.",
        escalate: "Sev 2 if it cannot be fixed within 2 minutes while on air.",
      },
      {
        symptom: "Clicked Take but the output did not change.",
        fix: "Wait 10 seconds and check the channel status. If it still reads On Air (scheduled), confirm the dialog was accepted and try Take once more. Do not spam the button.",
        escalate: "Sev 1 if the cut-in is for breaking news and the second attempt fails.",
      },
      {
        symptom: "After returning, the schedule is running several minutes late.",
        fix: "Follow the 'Fix any schedule drift' step: skip filler and promos ahead of the next hard start.",
        escalate: "Ask the Lead DLP before removing program content.",
      },
      {
        symptom: "Cut-in was taken on the wrong channel.",
        fix: "Immediately Return to Schedule on the wrong channel, then take the cut-in on the correct channel. Post what happened in the shift channel.",
        escalate: "Always report this as a Sev 2 so the team can review.",
      },
    ],
    related: ["breaking-news-extended-coverage", "shift-handoff"],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
  {
    slug: "daily-schedule-build",
    title: "Build and publish the daily schedule",
    summary:
      "Create the day's playlist from the template, place newscasts and live blocks, fill with evergreen content and publish to the channel.",
    category: "Scheduling",
    status: "coming-soon",
    estimatedMinutes: 30,
    whenToUse: ["Start of each broadcast day, before the first scheduled newscast."],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
  {
    slug: "rundown-changes",
    title: "Change the rundown during the day",
    summary:
      "Move, replace or remove items in the live playlist without knocking hard-start items off time.",
    category: "Scheduling",
    status: "coming-soon",
    estimatedMinutes: 10,
    whenToUse: ["A newscast runs long or short.", "Content is pulled or replaced after publish."],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
  {
    slug: "breaking-news-extended-coverage",
    title: "Breaking news and extended coverage",
    summary:
      "Run an open-ended live block, manage the schedule behind it and decide when and how to return to regular programming.",
    category: "Live Operations",
    status: "coming-soon",
    estimatedMinutes: 15,
    whenToUse: ["Live coverage that will run longer than a standard cut-in."],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    related: ["live-cut-ins"],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
  {
    slug: "add-or-replace-asset",
    title: "Add or replace a video asset",
    summary:
      "Upload or locate an asset in the Cloudport library, check it passed QC and place it in the schedule.",
    category: "Content",
    status: "coming-soon",
    estimatedMinutes: 10,
    whenToUse: ["A new package or special needs to air today."],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
  {
    slug: "shift-handoff",
    title: "Shift handoff",
    summary:
      "What to check, record and communicate when handing the channel to the next DLP.",
    category: "Shift",
    status: "coming-soon",
    estimatedMinutes: 5,
    whenToUse: ["End of every shift."],
    prerequisites: [],
    phases: [],
    troubleshooting: [],
    lastUpdated: "2026-11-11",
    owner: "CBS Digital Stream Planning & Ops",
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function countSteps(guide: Guide): number {
  return guide.phases.reduce((n, p) => n + p.steps.length, 0);
}
