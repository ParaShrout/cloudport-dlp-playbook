#!/usr/bin/env node
/**
 * Bulk-import and audit guide screenshots.
 *
 *   npm run screenshots -- status
 *       Show every guide step and which screenshot files it currently has.
 *
 *   npm run screenshots -- import <guide-slug> <folder> [--start N] [--dry-run]
 *       Copy every image in <folder> into public/screenshots/<guide-slug>/,
 *       renamed 01.png, 02.png, ... in natural filename order (the order you
 *       took them in). Use --start to begin at a later step. Existing files
 *       for a step are kept; the new one is added with a letter suffix.
 *
 * Runs on Node 22+ directly (type stripping); no build step needed.
 */
import fs from "node:fs";
import path from "node:path";
import { guides } from "../src/content/guides.ts";
import {
  IMAGE_EXTENSIONS,
  discoverScreenshots,
  listScreenshotFiles,
  naturalCompare,
  numberedSteps,
  screenshotDir,
} from "../src/lib/screenshots.ts";

const [command, ...rest] = process.argv.slice(2);

if (command === "status") {
  status();
} else if (command === "import") {
  importFolder(rest);
} else {
  console.log(`Usage:
  npm run screenshots -- status
  npm run screenshots -- import <guide-slug> <folder> [--start N] [--dry-run]

Guides: ${guides.map((g) => g.slug).join(", ")}`);
  process.exit(command ? 1 : 0);
}

function status() {
  for (const guide of guides) {
    const steps = numberedSteps(guide);
    if (steps.length === 0) continue;
    const found = discoverScreenshots(guide);
    const unmatched = listScreenshotFiles(guide.slug).filter(
      (f) => !Object.values(found).some((list) => list.some((s) => s.src.endsWith(`/${f}`))),
    );
    const have = steps.filter(({ step }) => found[step.id]?.length).length;
    const want = steps.filter(({ step }) => step.wantsScreenshot !== false).length;
    console.log(`\n${guide.title} (${guide.slug}) — ${have}/${want} steps have screenshots`);
    for (const { step, number } of steps) {
      const files = (found[step.id] ?? []).map((s) => path.basename(s.src));
      const n = String(number).padStart(2, "0");
      const marker = files.length ? "✓" : step.wantsScreenshot === false ? "–" : "✗";
      const note = files.length ? files.join(", ") : step.wantsScreenshot === false ? "(no screenshot needed)" : `missing → save as ${n}.png`;
      console.log(`  ${marker} ${n} ${step.title.padEnd(44)} ${note}`);
    }
    if (unmatched.length) {
      console.log(`  ! Files in public/screenshots/${guide.slug}/ that match no step: ${unmatched.join(", ")}`);
    }
  }
  console.log();
}

function importFolder(args: string[]) {
  const dryRun = args.includes("--dry-run");
  const startIdx = args.indexOf("--start");
  const start = startIdx >= 0 ? Number(args[startIdx + 1]) : 1;
  const positional = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--start");
  const [slug, folder] = positional;

  const guide = guides.find((g) => g.slug === slug);
  if (!guide) {
    console.error(`Unknown guide "${slug}". Known: ${guides.map((g) => g.slug).join(", ")}`);
    process.exit(1);
  }
  if (!folder || !fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) {
    console.error(`Folder not found: ${folder}`);
    process.exit(1);
  }
  if (!Number.isInteger(start) || start < 1) {
    console.error("--start must be a positive step number");
    process.exit(1);
  }

  const imageRe = new RegExp(`\\.(${IMAGE_EXTENSIONS.join("|")})$`, "i");
  const sources = fs
    .readdirSync(folder)
    .filter((f) => imageRe.test(f) && !f.startsWith("."))
    .sort(naturalCompare);
  if (sources.length === 0) {
    console.error(`No images (${IMAGE_EXTENSIONS.join(", ")}) found in ${folder}`);
    process.exit(1);
  }

  const steps = numberedSteps(guide).filter(({ step }) => step.wantsScreenshot !== false);
  const targets = steps.filter(({ number }) => number >= start);
  if (sources.length > targets.length) {
    console.warn(
      `Warning: ${sources.length} images but only ${targets.length} steps from step ${start} that take screenshots. Extra images will be skipped.`,
    );
  }

  const dest = screenshotDir(guide.slug);
  if (!dryRun) fs.mkdirSync(dest, { recursive: true });
  const existing = new Set(listScreenshotFiles(guide.slug));

  console.log(`${dryRun ? "[dry run] " : ""}Importing into public/screenshots/${guide.slug}/\n`);
  sources.forEach((file, i) => {
    const target = targets[i];
    if (!target) {
      console.log(`  skip  ${file} (no step left to assign)`);
      return;
    }
    const ext = path.extname(file).toLowerCase().replace("jpeg", "jpg");
    const n = String(target.number).padStart(2, "0");
    const name = nextFreeName(existing, n, ext);
    existing.add(name);
    console.log(`  ${file.padEnd(40)} → ${name.padEnd(10)} step ${target.number}: ${target.step.title}`);
    if (!dryRun) fs.copyFileSync(path.join(folder, file), path.join(dest, name));
  });

  console.log(`\nDone. Run "npm run screenshots -- status" to review, then rebuild/redeploy.`);
}

/** "03.png" if step 03 has no files yet, otherwise "03b.png", "03c.png", ... */
function nextFreeName(existing: Set<string>, n: string, ext: string): string {
  const stepRe = new RegExp(`^${n}([a-z]?)(?:[-_ .].*)?$`, "i");
  const used = [...existing].filter((f) => stepRe.test(f));
  if (used.length === 0) return `${n}${ext}`;
  for (let code = "b".charCodeAt(0); code <= "z".charCodeAt(0); code++) {
    const letter = String.fromCharCode(code);
    if (!used.some((f) => f.toLowerCase().startsWith(`${n}${letter}`))) return `${n}${letter}${ext}`;
  }
  return `${n}-${Date.now()}${ext}`;
}
