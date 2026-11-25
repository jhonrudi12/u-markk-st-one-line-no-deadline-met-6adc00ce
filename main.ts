// One Line, No Deadline Met — make.fun bounty entry (program/v1, Node 22).
// Writes a single-line joke giving an excuse for a missed deadline to
// /output/entry.txt. Deterministic, standard library only, no network.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry I'm late — I spent the whole week perfecting my excuse for missing the deadline and never got round to the actual work.";

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

if ([...ENTRY].length < 1 || [...ENTRY].length > 200) {
  throw new Error(`entry is ${[...ENTRY].length} characters, gate needs 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), ENTRY, "utf8");

// Read it back and refuse to pass on any mismatch, so a bad write can
// never silently reach the gate.
const written = readFileSync(join(out, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry line");
}
