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
  /**
   * Screenshots are discovered automatically from
   * /public/screenshots/<guide-slug>/ by step number (e.g. "03.png",
   * "03b-anything.png") or by step id ("verify-source.png"). Use this field
   * only to add images that live somewhere else.
   */
  screenshots?: Screenshot[];
  /** Caption shown under auto-discovered screenshots for this step. */
  screenshotCaption?: string;
  /** Set false for steps that never need a screenshot (hides the empty slot). */
  wantsScreenshot?: boolean;
  /** Show the list of station stream URLs under this step (for monitoring channel output). */
  showStationStreams?: boolean;
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

export type GuideCategory =
  "Live Operations" | "Programming Hours" | "Troubleshooting";

export type GuideMethod = {
  /** Slug of the guide that documents this method. */
  slug: string;
  /** Short note on when to pick this method, taken from the source material. */
  note: string;
};

export type Guide = {
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  category: GuideCategory;
  status: GuideStatus;
  /**
   * "procedure" (default) renders numbered steps. "overview" renders the
   * intro paragraphs and a chooser between the guides listed in `methods`.
   */
  kind?: "procedure" | "overview";
  /** Paragraphs shown at the top of an overview guide. */
  intro?: string[];
  methods?: GuideMethod[];
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
  /** Link to open the channel, if it is a Slack channel. */
  href?: string;
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

export type StationEscalation = {
  /** Station-specific troubleshooting / support channel. First stop for anything not covered by a guide. */
  troubleshootingChannel: string;
  /**
   * Slack channel id (starts with "C"). Copy it from the channel's link in
   * Slack. When set, the Report an issue button opens the channel directly;
   * otherwise Slack is asked to find it by name.
   */
  slackChannelId?: string;
  /** How to reach the Lead DLP covering this station's shift. */
  leadDlp: string;
  /** Control room / master control contact for live source and cue coordination. */
  controlRoom: string;
  /** Anything specific to this station's path, e.g. who approves content removal. */
  notes?: string;
};

export type Station = {
  /** Stable id used for the station switcher and URLs. */
  id: string;
  callSign: string;
  market: string;
  /** Channel name exactly as it appears in Cloudport. */
  channelName: string;
  /** Viewer-facing places to watch the channel output (same feed viewers see). */
  watchLinks?: { label: string; href: string }[];
  /** Local time zone, used when writing times in the shift log. */
  timeZone: string;
  status: "live" | "onboarding" | "planned";
  notes?: string;
  escalation: StationEscalation;
};

export type TrainingItem = {
  id: string;
  text: string;
  /** Link to an internal route (e.g. "/guides/live-cut-in-add-live-segment") or external URL. */
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

export type Role = {
  role: string;
  /** Named people or teams. Dated in the heading so it is clear when it was last confirmed. */
  who: string;
  responsibility: string;
};

export type MonitoringTool = {
  tool: string;
  whatItShows: string;
  whoUsesIt: string;
  access: string;
};

export type OpsContact = {
  name: string;
  role: string;
  /** Email, Slack handle or phone once confirmed. */
  contact?: string;
};

export type TimingMode = {
  mode: string;
  behavior: string;
  typicalUse: string;
};

export type BuildingBlock = {
  block: string;
  whatItIs: string;
  howItIsBuilt: string;
  /** Slug of the guide that documents this block, if transferred. */
  guide?: string;
};
