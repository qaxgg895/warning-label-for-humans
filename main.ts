// Warning Label for Humans: One Line, Big Laugh — make.fun entry
// Writes one funny single-line safety warning label to /output/entry.txt.
//
// The line: a human as a labelled product — 70% water, 20% caffeine,
// and 10% confidently wrong about things it has never googled. The
// composition list is real label wording; the turn lands in the last
// few words ("confidently wrong ... never googled"), and the joke is
// recognition: everyone knows a person like this, most of us are one.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "WARNING: This human is 70% water, 20% caffeine, and 10% confidently wrong about things it has never googled.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 160 characters,
// not only white space, and the brief requires exactly one line.
// Refuse to write anything that does not meet it, so a bad edit can
// never ship a line that is too long, blank, or more than one line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(`line is ${chars.length} characters, must be 1-160`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be exactly one line");
}

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
// No trailing newline: the file holds exactly the line, so its
// character count is the line's character count.
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Write verification: read the file back and confirm its bytes match
// exactly what was written, so a partial or failed write is caught
// instead of silently shipping a broken entry.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the expected line");
}
if ([...written].length !== chars.length) {
  throw new Error("written entry length does not match the expected line");
}

console.log(`wrote ${chars.length}-character line to ${OUTPUT_PATH}`);
