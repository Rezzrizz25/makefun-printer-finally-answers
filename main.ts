// SPDX-License-Identifier: MIT
// The Printer Finally Answers — one-line entry writer.
//
// Reasoning v3 — final wording pass: v2's shape is right (error code,
// ledger, dare) but two words are doing less than they could. First,
// "without one thank you" is slightly clumsy; "without a single thank
// you" is the flatter, more formal phrasing a literal machine would
// use, and "a single" sounds like a count — which is the printer's
// native register. Second, v2 dropped the word "on purpose" when it
// swapped "jammed" for "ate": "ate" is the funnier, more vivid verb
// (the machine consuming the work, not merely blocking it), but
// without "on purpose" the eating could read as an accident, and the
// whole joke depends on the jam being deliberate revenge. Restoring
// "on purpose" makes the confession explicit again: the printer is not
// malfunctioning, it is retaliating. The three beats now each do one
// job and nothing else — the code diagnoses the human, the ledger
// states the grievance, the dare answers the thump — and the line
// still lands in a single read at well under the 240-character cap.
// Alternatives rejected at this stage: adding a paper-jam noun ("my
// tray jammed") would restate what "ate your report" already implies
// and cost characters; closing with "You're welcome" again would
// soften the dare into politeness. This is the final line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ERROR 51: human detected. I fed 48,213 sheets without a single thank you, so I ate your report on purpose, five minutes before your deadline. Thump me again. I dare you.";

// Gate checks matching RULES.txt: UTF-8 text, 1-240 chars, not only
// whitespace, single line.
if (!ENTRY || !ENTRY.trim()) throw new Error("entry is blank");
if (ENTRY.length < 1 || ENTRY.length > 240) {
  throw new Error(`entry length ${ENTRY.length} outside 1-240`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
// Read-back verification: confirm the bytes on disk are exactly the
// entry line — no added newline, no stray \r, no encoding surprise.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not exactly equal ENTRY");
}
console.log(ENTRY);
console.log(`Wrote ${ENTRY.length}-char entry to ${join(outDir, "entry.txt")}`);
