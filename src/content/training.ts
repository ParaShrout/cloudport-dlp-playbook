import type { QuizQuestion, TrainingModule } from "./types";

/**
 * Onboarding path for new DLPs. Progress is stored in the browser so a new
 * hire can work through it over several days.
 *
 * Module content references only procedures that exist in the playbook.
 * The Google Site also has a TRAINING MATERIAL section; link items to it
 * (or transfer it) when that content is available.
 */
export const trainingModules: TrainingModule[] = [
  {
    id: "orientation",
    title: "1. Orientation",
    goal: "Understand what Cloudport does for the station streams and what the DLP is responsible for.",
    duration: "30 min",
    items: [
      { id: "or-0", text: "Pick your station (Baltimore, Sacramento or Miami) in the header so escalation paths show your channel and Lead DLP." },
      { id: "or-1", text: "Read the Operations page end to end.", href: "/operations", hrefLabel: "Operations" },
      { id: "or-2", text: "Read the Escalations page and know the four severity levels.", href: "/escalations", hrefLabel: "Escalations" },
      { id: "or-3", text: "Skim the Glossary. You should recognise every term by the end of week one.", href: "/glossary", hrefLabel: "Glossary" },
      { id: "or-4", text: "Join your station's troubleshooting channel, the incident channel and the DLP support channel.", href: "/escalations#contacts", hrefLabel: "Contacts" },
    ],
  },
  {
    id: "access",
    title: "2. Access and setup",
    goal: "Be able to sign in to Cloudport in Chrome and reach your station's Playout page.",
    duration: "Depends on provisioning",
    items: [
      { id: "ac-1", text: "Request a Cloudport account for your station (Sev 4 request in the DLP support channel)." },
      { id: "ac-2", text: "In Google Chrome, sign in at cbsnews.east-cloudport.amagi.tv and open the Playout page.", href: "https://cbsnews.east-cloudport.amagi.tv/", hrefLabel: "Cloudport" },
      { id: "ac-3", text: "Bookmark Cloudport and this playbook." },
    ],
  },
  {
    id: "fundamentals",
    title: "3. Cloudport fundamentals",
    goal: "Navigate the Playout page and read the schedule without help.",
    duration: "1-2 hours shadowing",
    items: [
      { id: "fu-1", text: "Shadow a DLP for a full start-of-shift checklist.", href: "/operations#checklists", hrefLabel: "Start of shift checklist" },
      { id: "fu-2", text: "On the Playout page, scroll to a future time and identify an event and the event that follows it." },
      { id: "fu-3", text: "Find the Take Next button (lower left) and the Take Live / Live Off buttons (upper right)." },
      { id: "fu-4", text: "Explain the difference between Adding Live Segments and Immediate Live, and which one is preferred.", href: "/guides/live-cut-ins", hrefLabel: "Live Cut-Ins" },
    ],
  },
  {
    id: "live-cut-ins",
    title: "4. Live cut-ins",
    goal: "Run both live cut-in methods on your own, following the guides.",
    duration: "2-3 supervised cut-ins",
    items: [
      { id: "lc-1", text: "Read the Adding Live Segments guide (16 steps).", href: "/guides/live-cut-in-add-live-segment", hrefLabel: "Adding Live Segments" },
      { id: "lc-2", text: "Read the Immediate Live guide (9 steps).", href: "/guides/live-cut-in-immediate-live", hrefLabel: "Immediate Live" },
      { id: "lc-3", text: "Watch an experienced DLP add a live segment and narrate each step back to them." },
      { id: "lc-4", text: "Add a live segment yourself with a Lead DLP watching, including Take Next at both ends." },
      { id: "lc-5", text: "Run an Immediate Live cut-in and Live Off with a Lead DLP watching." },
      { id: "lc-6", text: "Pass the knowledge check below." },
    ],
  },
  {
    id: "signoff",
    title: "5. Sign-off",
    goal: "Lead DLP confirms you can run a shift.",
    duration: "End of week two",
    items: [
      { id: "so-1", text: "Run a full shift with a Lead DLP available but not watching." },
      { id: "so-2", text: "Write a shift log that the next DLP rates as clear." },
      { id: "so-3", text: "Lead DLP signs off in the DLP support channel." },
    ],
  },
];

export const quiz: QuizQuestion[] = [
  {
    id: "q1",
    question: "Under most conditions, which live cut-in method should you use?",
    options: ["Immediate Live", "Adding Live Segments", "Either, it does not matter", "Create a New Show on the Fly"],
    answerIndex: 1,
    explanation:
      "Adding Live Segments offers better control over the return to normal programming. Immediate Live is for when you need to go to air now.",
  },
  {
    id: "q2",
    question: "When does a live segment you have added become active?",
    options: [
      "When you click Save",
      "As soon as the prior event's duration expires",
      "Only when you click Take Live",
      "At the top of the next hour",
    ],
    answerIndex: 1,
    explanation:
      "That is the caution on step 5: the live segment becomes active as soon as the prior event duration expires, so confirm there is adequate time before the next event.",
  },
  {
    id: "q3",
    question: "You have added a live segment but do not know the exact start time yet. What do you do?",
    options: [
      "Delete it and re-add it later",
      "Mark the event as disabled and move it as necessary",
      "Set the duration to zero",
      "Click Take Next immediately",
    ],
    answerIndex: 1,
    explanation: "Step 9: if the exact start time is unknown, mark the event as disabled and move it as necessary.",
  },
  {
    id: "q4",
    question: "How do you confirm the correct live source before an added live segment goes to air?",
    options: [
      "Check the channel output monitor",
      "Click the orange button in the Preview column; switch the toggle to Custom if the default is wrong",
      "Ask the control room",
      "Open the live template list",
    ],
    answerIndex: 1,
    explanation:
      "Step 7: the orange Preview button confirms the source. If the default source is not correct, move the toggle to Custom and select the desired source.",
  },
  {
    id: "q5",
    question: "With Immediate Live, which start-time option takes the source to air right away?",
    options: ["'Now'", "'Next 10 seconds'", "'Top of hour'", "Leave it blank"],
    answerIndex: 1,
    explanation: "Step 6 of Immediate Live: to go now, select the 'Next 10 seconds' option.",
  },
  {
    id: "q6",
    question: "How do you end an Immediate Live cut-in, and what does Cloudport do?",
    options: [
      "Click Take Next; Cloudport restarts the interrupted show from the beginning",
      "Click Live Off (upper right); Cloudport joins the originally scheduled programming in progress",
      "Refresh the browser",
      "Delete the live show from the schedule",
    ],
    answerIndex: 1,
    explanation:
      "Step 9 of Immediate Live: click Live Off in the upper right. Cloudport joins the originally scheduled programming in progress.",
  },
  {
    id: "q7",
    question: "The stream has been black for 45 seconds. What severity is this?",
    options: ["Sev 4", "Sev 3", "Sev 2", "Sev 1"],
    answerIndex: 3,
    explanation: "Off air for more than 30 seconds is Sev 1: call the Amagi NOC and Stream Ops on-call, then post in the incident channel.",
  },
];
