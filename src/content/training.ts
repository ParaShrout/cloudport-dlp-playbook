import type { QuizQuestion, TrainingModule } from "./types";

/**
 * Onboarding path for new DLPs. Progress is stored in the browser so a new
 * hire can work through it over several days.
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
    goal: "Be able to log in to Cloudport and see the station channel.",
    duration: "Depends on provisioning",
    items: [
      { id: "ac-1", text: "Request a Cloudport account with the DLP role for your station (Sev 4 request in the DLP support channel)." },
      { id: "ac-2", text: "Log in and confirm you can see the station channel and that it is marked Production." },
      { id: "ac-3", text: "Bookmark the output monitor / player for the station." },
      { id: "ac-4", text: "Bookmark this playbook." },
    ],
  },
  {
    id: "fundamentals",
    title: "3. Cloudport fundamentals",
    goal: "Navigate the channel dashboard, playlist, live sources and monitors without help.",
    duration: "1-2 hours shadowing",
    items: [
      { id: "fu-1", text: "Shadow a DLP for a full start-of-shift checklist.", href: "/operations#checklists", hrefLabel: "Start of shift checklist" },
      { id: "fu-2", text: "Find today's playlist and identify the current item, the next item and the next hard start." },
      { id: "fu-3", text: "Open Live Sources and explain what Active, preview and audio meters tell you." },
      { id: "fu-4", text: "Explain the difference between Resume and Join in progress.", href: "/glossary", hrefLabel: "Glossary" },
    ],
  },
  {
    id: "live-cut-ins",
    title: "4. Live cut-ins",
    goal: "Take and return a live cut-in on your own, following the guide.",
    duration: "2-3 supervised cut-ins",
    items: [
      { id: "lc-1", text: "Read the Live Cut-Ins guide and the troubleshooting table.", href: "/guides/live-cut-ins", hrefLabel: "Live Cut-Ins guide" },
      { id: "lc-2", text: "Watch an experienced DLP take a cut-in and narrate each step back to them." },
      { id: "lc-3", text: "Take a cut-in on a staging / test channel with a Lead DLP watching." },
      { id: "lc-4", text: "Take a production cut-in with a Lead DLP watching." },
      { id: "lc-5", text: "Pass the knowledge check below." },
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
    question: "Before taking a live cut-in, what must you confirm about the live source?",
    options: [
      "That it exists in the dropdown",
      "That it is Active with a moving preview and audio meters",
      "That it was used yesterday",
      "Nothing, the control room checks it",
    ],
    answerIndex: 1,
    explanation:
      "Status alone is not enough. A source can be Connected but sending black or silence; the preview and meters catch that.",
  },
  {
    id: "q2",
    question: "A hard-start newscast begins in 12 minutes and you are about to take a 10-minute cut-in. Which return behaviour should you choose?",
    options: ["Resume", "Join in progress", "Either, it does not matter", "Ask Amagi"],
    answerIndex: 1,
    explanation:
      "Join in progress keeps the schedule on the clock so the newscast starts on time. Resume would push it late by the cut-in length.",
  },
  {
    id: "q3",
    question: "You clicked Take and nothing changed on the output after 3 seconds. What do you do?",
    options: [
      "Click Take repeatedly until it switches",
      "Wait about 10 seconds, check channel status, then try once more",
      "Refresh the browser",
      "Call Amagi immediately",
    ],
    answerIndex: 1,
    explanation:
      "There is normally a short delay. Clicking repeatedly can queue multiple events. Escalate only if the second attempt fails.",
  },
  {
    id: "q4",
    question: "The stream has been black for 45 seconds. What severity is this?",
    options: ["Sev 4", "Sev 3", "Sev 2", "Sev 1"],
    answerIndex: 3,
    explanation: "Off air for more than 30 seconds is Sev 1: call the Amagi NOC and Stream Ops on-call, then post.",
  },
  {
    id: "q5",
    question: "After returning from a cut-in the schedule is 6 minutes late. What can you do without Lead DLP approval?",
    options: [
      "Remove the next newscast",
      "Skip promos and filler ahead of the next hard start",
      "Nothing",
      "Re-publish the whole day",
    ],
    answerIndex: 1,
    explanation: "Skipping filler is a routine fix. Removing program content needs the Lead DLP.",
  },
  {
    id: "q6",
    question: "Where does the first post about a Sev 2 incident go?",
    options: ["Shift channel", "Incident channel, using the incident template", "Email to Amagi", "Nowhere, just fix it"],
    answerIndex: 1,
    explanation: "The incident channel thread becomes the record. Use the template so Stream Ops has what they need immediately.",
  },
];
