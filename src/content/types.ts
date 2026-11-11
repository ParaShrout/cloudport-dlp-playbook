export type GuideStatus = "published" | "review" | "coming-soon";

export type CalloutKind = "tip" | "warning" | "critical" | "note";

export type Callout = {
  kind: CalloutKind;
  title?: string;
  text: string;
};

export type Screenshot = {
  /** Path under /public, e.g. "/screenshots/live-cut-ins/03-live-sources.png" */
  src: string;
  alt: string;
  caption?: string;
};

export type Step = {
  id: string;
  title: string;
  /** One or two sentences describing the action. */
  summary: string;
  /** Optional sub-actions, rendered as a bulleted list. */
  details?: string[];
  /** What the DLP should see when the step succeeded. */
  expected?: string;
  screenshot?: Screenshot;
  callout?: Callout;
};

export type StepPhase = {
  id: string;
  title: string;
  description?: string;
  steps: Step[];
};

export type Troubleshooting = {
  symptom: string;
  fix: string;
  escalate?: string;
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  category: "Live Operations" | "Scheduling" | "Content" | "Shift";
  status: GuideStatus;
  /** Shown as a reviewer note while status is "review". */
  reviewNote?: string;
  estimatedMinutes: number;
  whenToUse: string[];
  prerequisites: string[];
  phases: StepPhase[];
  troubleshooting: Troubleshooting[];
  related?: string[];
  lastUpdated: string;
  owner: string;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  aka?: string[];
};

export type Severity = {
  level: "Sev 1" | "Sev 2" | "Sev 3" | "Sev 4";
  label: string;
  color: "red" | "orange" | "amber" | "slate";
  definition: string;
  examples: string[];
  responseTarget: string;
  firstAction: string;
  notify: string[];
};

export type EscalationTier = {
  tier: string;
  name: string;
  whoTheyAre: string;
  useWhen: string;
  howToReach: string[];
  expectedResponse: string;
};

export type Contact = {
  name: string;
  role: string;
  channel: string;
  hours: string;
  notes?: string;
};

export type ChecklistItem = {
  id: string;
  text: string;
  guide?: string;
};

export type Checklist = {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
};

export type Station = {
  callSign: string;
  market: string;
  channelName: string;
  status: "live" | "onboarding" | "planned";
  notes?: string;
};

export type TrainingItem = {
  id: string;
  text: string;
  /** Link to an internal route (e.g. "/guides/live-cut-ins") or external URL. */
  href?: string;
  hrefLabel?: string;
};

export type TrainingModule = {
  id: string;
  title: string;
  goal: string;
  duration: string;
  items: TrainingItem[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};
