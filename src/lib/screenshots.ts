import fs from "node:fs";
import path from "node:path";
import type { Guide, Screenshot, Step } from "@/content/types";

export const SCREENSHOT_ROOT = path.join(
  process.cwd(),
  "public",
  "screenshots",
);
export const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp"];

const IMAGE_RE = new RegExp(`\\.(${IMAGE_EXTENSIONS.join("|")})$`, "i");
/** "03.png", "03b.png", "03-anything.png", "3_live-sources.webp" */
const NUMBERED_RE = /^(\d{1,3})([a-z]?)(?:[-_ ].*)?$/i;

export type StepScreenshots = Record<string, Screenshot[]>;

/** Flattened steps with their 1-based number across all phases. */
export function numberedSteps(guide: Guide): { step: Step; number: number }[] {
  const out: { step: Step; number: number }[] = [];
  for (const phase of guide.phases) {
    for (const step of phase.steps) out.push({ step, number: out.length + 1 });
  }
  return out;
}

export function screenshotDir(slug: string) {
  return path.join(SCREENSHOT_ROOT, slug);
}

export function listScreenshotFiles(slug: string): string[] {
  const dir = screenshotDir(slug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f) && !f.startsWith("."))
    .sort(naturalCompare);
}

/**
 * Map every step of a guide to the screenshots found on disk for it.
 * Files match a step either by number ("03", "03b-...") or by step id
 * ("verify-source", "verify-source-2").
 */
export function discoverScreenshots(guide: Guide): StepScreenshots {
  const files = listScreenshotFiles(guide.slug);
  const steps = numberedSteps(guide);
  const byNumber = new Map(steps.map((s) => [s.number, s.step]));
  const byId = new Map(steps.map((s) => [s.step.id, s.step]));
  const result: StepScreenshots = {};

  for (const file of files) {
    const base = file.replace(IMAGE_RE, "");
    let step: Step | undefined;
    const numbered = base.match(NUMBERED_RE);
    if (numbered) {
      step = byNumber.get(Number(numbered[1]));
    } else {
      const idMatch = [...byId.keys()].find(
        (id) =>
          base === id || base.startsWith(`${id}-`) || base.startsWith(`${id}_`),
      );
      if (idMatch) step = byId.get(idMatch);
    }
    if (!step) continue;
    const list = (result[step.id] ??= []);
    list.push({
      src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/screenshots/${guide.slug}/${file}`,
      alt: `${step.title} (screenshot ${list.length + 1})`,
      caption: list.length === 0 ? step.screenshotCaption : undefined,
    });
  }

  for (const { step } of steps) {
    if (step.screenshots?.length) {
      const list = (result[step.id] ??= []);
      for (const shot of step.screenshots) {
        if (!list.some((s) => s.src === shot.src)) list.push(shot);
      }
    }
  }

  return result;
}

/** Number of screenshots on disk that match a step of this guide. */
export function countScreenshots(guide: Guide): number {
  return Object.values(discoverScreenshots(guide)).reduce(
    (n, list) => n + list.length,
    0,
  );
}

export function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}
